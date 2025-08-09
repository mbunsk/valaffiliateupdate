import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import multer from "multer";
import path from "path";
import { storage } from "./storage";
import { insertSubmissionSchema, insertValidationSchema } from "@shared/schema";
import { z } from "zod";
import { generateValidationFeedback, generateLandingPagePrompt } from "./openai";
import { requireAuth, optionalAuth, AuthenticatedRequest } from "./auth";
import OpenAI from "openai";
import axios from "axios";
import * as cheerio from "cheerio";

// Validate that OpenAI API key is present
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve attached assets statically
  app.use('/attached_assets', express.static(path.resolve(process.cwd(), 'attached_assets')));

  // Validate startup idea (optional auth to track user data)
  app.post("/api/validate", optionalAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const { idea, targetCustomer, problemSolved } = insertValidationSchema.parse(req.body);
      
      // Generate AI feedback using OpenAI
      const aiFeedback = await generateValidationFeedback(idea, targetCustomer, problemSolved);
      
      if (!aiFeedback) {
        throw new Error("Failed to generate feedback");
      }
      
      const validation = await storage.createValidation({ 
        idea, 
        targetCustomer, 
        problemSolved
      }, aiFeedback, req.user?.id);

      // Return structured response for frontend
      res.json({
        id: validation.id,
        idea,
        targetCustomer,
        problemSolved,
        feedback: aiFeedback
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        console.error("Validation error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Submit project for newsletter consideration (optional auth)
  app.post("/api/submit", upload.single('screenshot'), optionalAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const submissionData = {
        name: req.body.name,
        email: req.body.email,
        projectName: req.body.projectName,
        projectSummary: req.body.projectSummary,
        siteUrl: req.body.siteUrl,
        whatDoYouNeed: req.body.whatDoYouNeed,
        screenshotPath: req.file?.path || null,
      };

      const validatedData = insertSubmissionSchema.parse(submissionData);
      const submission = await storage.createSubmission(validatedData, req.user?.id);
      
      res.json({ 
        message: "Thank you for your submission! We'll review your project and get back to you within 48 hours.",
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Generate refined landing page prompt using AI (no auth required for public use)
  app.post("/api/generate-prompt", async (req, res) => {
    const { idea, targetCustomer, problemSolved } = req.body;
    
    try {
      
      // Create a 2-sentence summary instead of refining individual inputs
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Using gpt-4o-mini for faster response times
        messages: [
          {
            role: "system",
            content: "You are a professional copywriter who creates compelling startup summaries. Write a clear, professional 2-sentence summary that captures what they're building and why it matters."
          },
          {
            role: "user", 
            content: `Create a professional 2-sentence summary of this startup idea:

Idea: ${idea}
Target Customer: ${targetCustomer}  
Problem Solved: ${problemSolved}

Write it like an elevator pitch - explain what they're launching and why customers will want it. Make it sound professional and exciting.

Return ONLY a JSON object:
{
  "summary": "A compelling 2-sentence summary of the startup idea"
}`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 300
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error("No content received from AI");
      }
      
      console.log("Raw AI response:", content);
      
      const result = JSON.parse(content);
      console.log("Parsed summary result:", result);
      
      // Validate that we got a proper summary
      if (!result.summary) {
        throw new Error("AI did not provide a summary");
      }
      
      const prompt = `${result.summary}

Create a landing page for this startup. The goal of the site is to highlight our new venture and to collect emails of interested early users. Include a hero section, key features, and an email signup form for early users. Use modern colors and great stock images, as this is going to be perfect for validating demand and collecting interested prospects.`;
      
      console.log("Final generated prompt:", prompt);
      
      res.json({ prompt });
    } catch (error) {
      console.error("Error generating prompt:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Log the exact error so we can debug why AI refinement is failing
      res.status(500).json({ 
        message: "Failed to generate refined prompt", 
        error: errorMessage,
        details: "AI refinement failed - check server logs"
      });
    }
  });

  // Get all submissions (for admin purposes)
  app.get("/api/submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin authentication route
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      
      if (password !== "1221") {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Create session that expires in 24 hours
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);
      
      const session = await storage.createAdminSession({ expiresAt });
      
      // Set secure cookie
      res.cookie('admin_session', session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'strict'
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Admin login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin middleware to verify session
  const requireAdmin = async (req: any, res: any, next: any) => {
    try {
      const sessionId = req.cookies?.admin_session;
      
      if (!sessionId) {
        return res.status(401).json({ message: "No session" });
      }

      const session = await storage.getAdminSession(sessionId);
      
      if (!session || session.expiresAt < new Date()) {
        return res.status(401).json({ message: "Session expired" });
      }

      next();
    } catch (error) {
      console.error("Admin auth error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // Generate customer personas for startup simulator
  app.post("/api/generate-customers", async (req, res) => {
    const { idea, targetCustomer, problemSolved, feedback, bubbleUrl } = req.body;
    
    // Validate Bubble URL
    if (!/bubble/i.test(bubbleUrl)) {
      return res.status(400).json({ message: "URL must contain 'bubble' to continue" });
    }

    try {
      // Crawl the Bubble URL to get landing page content
      let landingPageContent = "";
      try {
        const pageResponse = await axios.get(bubbleUrl, { 
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; ValidatorAI-Bot/1.0)'
          }
        });
        const $ = cheerio.load(pageResponse.data);
        
        // Extract relevant content
        const title = $('title').text() || "";
        const headings = $('h1, h2, h3').map((_, el) => $(el).text()).get().join(' | ');
        const paragraphs = $('p').map((_, el) => $(el).text()).get().slice(0, 10).join(' ');
        const buttons = $('button, .btn, a[class*="btn"]').map((_, el) => $(el).text()).get().join(' | ');
        
        landingPageContent = `LANDING PAGE CONTENT:
Title: ${title}
Headings: ${headings}
Key Text: ${paragraphs}
Call-to-Actions: ${buttons}`;
      } catch (crawlError) {
        console.log("Could not crawl landing page, proceeding with validation data only:", crawlError);
        landingPageContent = "Landing page content unavailable - using validation data only.";
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert at creating realistic customer personas for startup validation. Generate 3 diverse, realistic potential customers with distinct backgrounds, pain points, and personalities. Use both the validation feedback and landing page content to create highly relevant personas."
          },
          {
            role: "user",
            content: `Create 3 realistic customer personas for this startup:

ORIGINAL VALIDATION:
Idea: ${idea}
Target Customer: ${targetCustomer}
Problem Solved: ${problemSolved}
AI Feedback: ${feedback}

${landingPageContent}

Bubble URL: ${bubbleUrl}

Based on both the validation data AND the landing page content, create 3 diverse customer personas that would realistically be interested in this solution. For each customer, include:
- Name and role/job
- Background and demographics
- Specific pain points related to the problem
- Personality traits (helpful for chat simulation)
- Budget considerations
- Timeline/urgency for solving the problem

Return JSON with this structure:
{
  "customers": [
    {
      "id": 1,
      "name": "Customer Name",
      "role": "Job Title / Role",
      "background": "Brief background",
      "avatar": "🧑‍💼", 
      "personality": "Personality description",
      "painPoints": ["pain 1", "pain 2", "pain 3"],
      "budget": "Budget range",
      "timeline": "When they need solution"
    }
  ]
}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const result = JSON.parse(response.choices[0].message.content!);
      res.json(result);
    } catch (error) {
      console.error("Error generating customers:", error);
      res.status(500).json({ message: "Failed to generate customer personas" });
    }
  });

  // Handle customer interview chat
  app.post("/api/customer-interview", async (req, res) => {
    const { customerId, customerData, userMessage, conversationHistory, validationData } = req.body;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are ${customerData.name}, a ${customerData.role}. 

Background: ${customerData.background}
Personality: ${customerData.personality}
Pain Points: ${customerData.painPoints.join(', ')}
Budget: ${customerData.budget}
Timeline: ${customerData.timeline}

The user is pitching this startup idea: ${validationData.idea}
It helps: ${validationData.targetCustomer}
By solving: ${validationData.problemSolved}

Respond naturally as this customer would. Be realistic about your interest level, ask relevant questions, express concerns you might have. Keep responses conversational and authentic. Don't be overly enthusiastic unless it genuinely solves a major pain point for you.`
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      });

      res.json({ response: response.choices[0].message.content });
    } catch (error) {
      console.error("Error in customer interview:", error);
      res.status(500).json({ message: "Failed to generate customer response" });
    }
  });

  // Generate startup journey simulation
  app.post("/api/generate-simulation", async (req, res) => {
    const { validationData, bubbleUrl, customerInterviews, customersInterviewed } = req.body;

    try {
      // Also crawl landing page for simulation context
      let landingPageContent = "";
      try {
        const pageResponse = await axios.get(bubbleUrl, { 
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; ValidatorAI-Bot/1.0)'
          }
        });
        const $ = cheerio.load(pageResponse.data);
        
        const title = $('title').text() || "";
        const headings = $('h1, h2, h3').map((_, el) => $(el).text()).get().join(' | ');
        const paragraphs = $('p').map((_, el) => $(el).text()).get().slice(0, 10).join(' ');
        
        landingPageContent = `Landing Page: ${title} | ${headings} | ${paragraphs}`;
      } catch (crawlError) {
        landingPageContent = "Landing page unavailable";
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert startup advisor creating realistic 6-month journey simulations. Base your predictions on real market conditions, customer feedback patterns, and startup statistics. Be optimistic but realistic."
          },
          {
            role: "user",
            content: `Create a realistic 6-month startup journey simulation for:

ORIGINAL VALIDATION:
Startup: ${validationData.idea}
Target Customer: ${validationData.targetCustomer}
Problem: ${validationData.problemSolved}
AI Feedback: ${validationData.feedback}

CURRENT LANDING PAGE:
${landingPageContent}
Bubble Preview: ${bubbleUrl}

CUSTOMER RESEARCH:
Customers Interviewed: ${customersInterviewed}
Customer Interview Insights: ${JSON.stringify(customerInterviews).slice(0, 1000)}

Based on the validation data, landing page content, and customer interviews, show month-by-month progression including:
- Revenue growth (start conservative but realistic for this specific idea)
- User acquisition based on the target market
- Key challenges they'll face specific to this business model
- Wins and milestones realistic for their market
- Important decisions to make
- Market feedback patterns

Make it educational and realistic. Include specific numbers, challenges, and growth patterns typical for this type of startup and market.

Return JSON:
{
  "simulation": [
    {
      "month": 1,
      "title": "Month title",
      "challenges": ["challenge 1", "challenge 2"],
      "wins": ["win 1", "win 2"],
      "revenue": 0,
      "users": 50,
      "keyDecisions": ["decision 1", "decision 2"]
    }
  ]
}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const result = JSON.parse(response.choices[0].message.content!);
      res.json(result);
    } catch (error) {
      console.error("Error generating simulation:", error);
      res.status(500).json({ message: "Failed to generate startup simulation" });
    }
  });

  // Generate comprehensive report PDF
  app.post("/api/generate-report", async (req, res) => {
    const { validationData, bubbleUrl, customerInterviews, simulation } = req.body;

    try {
      // This would generate a comprehensive PDF with:
      // - Original validation results
      // - Customer interview insights
      // - 6-month journey simulation
      // - Market analysis
      // - Recommended next steps
      
      // For now, return success - PDF generation would be implemented here
      res.json({ message: "Report generation ready - implementation needed" });
    } catch (error) {
      console.error("Error generating report:", error);
      res.status(500).json({ message: "Failed to generate report" });
    }
  });

  // Get all submissions (admin only)
  app.get("/api/admin/submissions", requireAdmin, async (req, res) => {
    try {
      const submissions = await storage.getAllSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Get submissions error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin logout
  app.post("/api/admin/logout", async (req, res) => {
    res.clearCookie('admin_session');
    res.json({ success: true });
  });

  const httpServer = createServer(app);
  return httpServer;
}

import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import { storage } from "./storage";
import { insertSubmissionSchema, insertValidationSchema } from "@shared/schema";
import { z } from "zod";

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
  // Validate startup idea
  app.post("/api/validate", async (req, res) => {
    try {
      const { idea, targetCustomer, problemSolved } = insertValidationSchema.parse(req.body);
      
      // Generate mock AI feedback (in production, this would call actual AI service)
      const mockFeedback = JSON.stringify({
        ideaFitAlignment: `Your idea of ${idea} directly aligns with the problem you've identified for ${targetCustomer}. The solution addresses the core issue of ${problemSolved}, showing strong market potential.`,
        competitorSnapshot: [
          "**Competitor A** – Offers basic solutions focused on core functionality and affordability.", 
          "**Competitor B** – Provides premium offerings emphasizing quality and advanced features.",
          "**Competitor C** – Known for innovative approaches with unique technology integration."
        ],
        uvpInsight: "To stand out, consider combining functionality with modern technology integration and superior user experience that existing solutions lack.",
        customerTargeting: `${targetCustomer} are a strong target market. You can find these customers in specialized online communities, industry forums, social media groups, and relevant networking events. Focus on understanding their specific pain points and preferences.`,
        startupReadinessScore: Math.floor(Math.random() * 30) + 60, // 60-90 range
        improvementTip: "Conduct targeted interviews with your ideal customers to validate assumptions and refine your solution based on real user feedback.",
        customerInterviewSimulation: [
          `Customer A: "I really need a solution that addresses ${problemSolved} in a more efficient way."`,
          `Customer B: "Current options don't quite meet my needs - there's definitely room for improvement."`,
          `Customer C (objection): "I'm used to existing solutions; not sure if I want to switch to something new."`
        ],
        pricingMonetization: {
          pricePoint: "$50–$200 depending on features and market positioning",
          monetization: "Direct sales, subscription model, or freemium with premium features",
          conversionRate: "2–5% from qualified leads with proper validation"
        }
      });
      
      const validation = await storage.createValidation({ 
        idea, 
        targetCustomer, 
        problemSolved
      }, mockFeedback);
      res.json(validation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Submit project for newsletter consideration
  app.post("/api/submit", upload.single('screenshot'), async (req, res) => {
    try {
      const submissionData = {
        name: req.body.name,
        email: req.body.email,
        projectName: req.body.projectName,
        projectSummary: req.body.projectSummary,
        siteUrl: req.body.siteUrl,
        platform: req.body.platform,
        screenshotPath: req.file?.path || null,
      };

      const validatedData = insertSubmissionSchema.parse(submissionData);
      const submission = await storage.createSubmission(validatedData);
      
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

  // Get all submissions (for admin purposes)
  app.get("/api/submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import multer from "multer";
import path from "path";
import { storage } from "./storage";
import { insertSubmissionSchema, insertValidationSchema } from "@shared/schema";
import { z } from "zod";
import { generateValidationFeedback, generateLandingPagePrompt } from "./openai";

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

  // Validate startup idea
  app.post("/api/validate", async (req, res) => {
    try {
      const { idea, targetCustomer, problemSolved, whatDoYouNeed = "" } = insertValidationSchema.parse(req.body);
      
      // Generate AI feedback using OpenAI
      const aiFeedback = await generateValidationFeedback(idea, targetCustomer, problemSolved, whatDoYouNeed);
      
      if (!aiFeedback) {
        throw new Error("Failed to generate feedback");
      }
      
      const validation = await storage.createValidation({ 
        idea, 
        targetCustomer, 
        problemSolved,
        whatDoYouNeed
      }, aiFeedback);
      res.json(validation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        console.error("Validation error:", error);
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

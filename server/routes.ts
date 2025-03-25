import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertTestimonySchema, insertDonationSchema, insertSavedContentSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Middleware to check if user is authenticated
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };

  // Testimonies routes
  app.get("/api/testimonies", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const testimonies = await storage.getTestimonies(limit);
      
      // Enrich the testimonies with user data
      const enrichedTestimonies = await Promise.all(
        testimonies.map(async (testimony) => {
          if (testimony.userId) {
            const user = await storage.getUser(testimony.userId);
            return {
              ...testimony,
              user: testimony.isAnonymous ? { displayName: "Anonymous" } : user ? { 
                id: user.id,
                displayName: user.displayName,
                profilePicture: user.profilePicture
              } : null
            };
          }
          return {
            ...testimony,
            user: { displayName: "Anonymous" }
          };
        })
      );
      
      res.json(enrichedTestimonies);
    } catch (error) {
      console.error("Error getting testimonies:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/testimonies", isAuthenticated, async (req, res) => {
    try {
      const testimonyData = insertTestimonySchema.parse({
        ...req.body,
        userId: req.user!.id
      });
      
      const testimony = await storage.createTestimony(testimonyData);
      res.status(201).json(testimony);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error creating testimony:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/testimonies/user", isAuthenticated, async (req, res) => {
    try {
      const testimonies = await storage.getTestimoniesByUserId(req.user!.id);
      res.json(testimonies);
    } catch (error) {
      console.error("Error getting user testimonies:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Donations routes
  app.get("/api/donations", isAuthenticated, async (req, res) => {
    try {
      const donations = await storage.getDonationsByUserId(req.user!.id);
      res.json(donations);
    } catch (error) {
      console.error("Error getting donations:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/donations", isAuthenticated, async (req, res) => {
    try {
      const donationData = insertDonationSchema.parse({
        ...req.body,
        userId: req.user!.id
      });
      
      // Simulate M-Pesa integration
      // In a real scenario, we would call the M-Pesa API here
      const transactionId = `MPESA-${Math.floor(Math.random() * 1000000)}`;
      
      const donation = await storage.createDonation({
        ...donationData,
        transactionId,
        status: "completed"
      });
      
      res.status(201).json(donation);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error creating donation:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Saved content routes
  app.get("/api/saved-contents", isAuthenticated, async (req, res) => {
    try {
      const contents = await storage.getSavedContentsByUserId(req.user!.id);
      res.json(contents);
    } catch (error) {
      console.error("Error getting saved contents:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/saved-contents", isAuthenticated, async (req, res) => {
    try {
      const contentData = insertSavedContentSchema.parse({
        ...req.body,
        userId: req.user!.id
      });
      
      const content = await storage.createSavedContent(contentData);
      res.status(201).json(content);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error saving content:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.delete("/api/saved-contents/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteSavedContent(id);
      
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Content not found" });
      }
    } catch (error) {
      console.error("Error deleting saved content:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

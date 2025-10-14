import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatWithAssistantStream } from "./openai";
import { insertBlogPostSchema, updateBlogPostSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

// Simple admin authentication middleware
const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123"; // Default for development

  if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // ============ BLOG POST ROUTES ============
  
  // Get all blog posts (public)
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      // Transform database rows to match frontend BlogPost interface
      const transformedPosts = posts.map(post => ({
        id: post.id.toString(),
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        readTime: post.readTime,
        publishDate: post.publishDate,
        tags: JSON.parse(post.tags),
        featured: post.featured || false,
        heroImage: post.heroImage || undefined,
      }));
      res.json(transformedPosts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Get single blog post by ID (public)
  app.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPostById(id);
      
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      const transformedPost = {
        id: post.id.toString(),
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        readTime: post.readTime,
        publishDate: post.publishDate,
        tags: JSON.parse(post.tags),
        featured: post.featured || false,
        heroImage: post.heroImage || undefined,
      };

      res.json(transformedPost);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Create blog post (admin only)
  app.post("/api/blog-posts", adminAuth, async (req, res) => {
    try {
      // Validate request body
      const validation = insertBlogPostSchema.safeParse({
        ...req.body,
        tags: JSON.stringify(req.body.tags || []),
      });

      if (!validation.success) {
        const validationError = fromZodError(validation.error);
        return res.status(400).json({ error: validationError.toString() });
      }

      const post = await storage.createBlogPost(validation.data);
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ error: "Failed to create blog post" });
    }
  });

  // Update blog post (admin only)
  app.patch("/api/blog-posts/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // Validate request body
      const validation = updateBlogPostSchema.safeParse({
        ...req.body,
        tags: req.body.tags ? JSON.stringify(req.body.tags) : undefined,
      });

      if (!validation.success) {
        const validationError = fromZodError(validation.error);
        return res.status(400).json({ error: validationError.toString() });
      }

      const post = await storage.updateBlogPost(id, validation.data);
      
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      res.json(post);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  // Delete blog post (admin only)
  app.delete("/api/blog-posts/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteBlogPost(id);
      
      if (!success) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // ============ CHATBOT ROUTE ============
  
  // Chatbot API endpoint with streaming
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      // Set headers for Server-Sent Events
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const stream = await chatWithAssistantStream(message);

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat request" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

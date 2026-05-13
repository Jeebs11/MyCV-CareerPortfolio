import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatWithAssistantStream, generateBlogImage } from "./openai";
import {
  insertBlogPostSchema, updateBlogPostSchema, insertCVContactSchema,
  insertProjectSchema, updateProjectSchema,
  insertBuiltProjectSchema, updateBuiltProjectSchema,
  insertCareerRoleSchema, updateCareerRoleSchema,
  insertFlagshipWinSchema, updateFlagshipWinSchema,
  insertSiteSkillSchema, updateSiteSkillSchema,
  insertSiteCertificationSchema, updateSiteCertificationSchema,
  insertSiteEducationSchema, updateSiteEducationSchema,
  upsertSiteSettingSchema,
  insertProfileVariantSchema, updateProfileVariantSchema,
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { z } from "zod";
import path from "path";
import fs from "fs/promises";
import multer from "multer";

// Configure multer for CV file uploads
const cvStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads', 'cv');
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `CV_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: cvStorage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Configure multer for project image uploads
const projectImageStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads', 'projects');
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `project_${Date.now()}_${Math.round(Math.random() * 1e6)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const projectImageUpload = multer({
  storage: projectImageStorage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WEBP, SVG, GIF) are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Simple admin authentication middleware
const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return res.status(503).json({ error: "Admin auth not configured (ADMIN_PASSWORD missing)" });
  }

  if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // ============ AUTHENTICATION ROUTES ============
  
  // Verify admin password (protected endpoint for login verification)
  app.post("/api/auth/verify", adminAuth, (req, res) => {
    res.json({ success: true });
  });

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

  // ============ CV ROUTES ============
  
  // Download CV and save contact (public)
  app.post("/api/cv/download", async (req, res) => {
    try {
      // Validate contact information
      const validation = insertCVContactSchema.safeParse(req.body);
      
      if (!validation.success) {
        const validationError = fromZodError(validation.error);
        return res.status(400).json({ error: validationError.toString() });
      }

      // Save contact to database
      await storage.createCVContact(validation.data);

      // Get CV file — use variant-specified file if provided, otherwise fall back to latest.
      // If the variant's file has been deleted, also fall back to latest.
      // Accept both number and numeric string (JSONB can return either depending on driver)
      const cvFileIdRaw = req.body.cvFileId;
      const cvFileId = cvFileIdRaw != null ? (parseInt(String(cvFileIdRaw), 10) || null) : null;
      let cvFile = cvFileId ? await storage.getCVFileById(cvFileId) : undefined;
      if (!cvFile) {
        cvFile = await storage.getLatestCVFile();
      }

      if (!cvFile) {
        return res.status(404).json({ error: "CV file not found. Please contact the administrator." });
      }

      const filePath = path.join(process.cwd(), 'uploads', 'cv', cvFile.filename);
      
      // Check if file exists
      try {
        await fs.access(filePath);
      } catch {
        return res.status(404).json({ error: "CV file not found on server. Please contact the administrator." });
      }

      // Send file — use the CV file's label as the download filename if available
      const downloadName = cvFile.label
        ? `${cvFile.label.replace(/[^a-zA-Z0-9_\- ]/g, '').trim()}.pdf`
        : 'Mujeeb_Lawal_CV.pdf';
      res.download(filePath, downloadName);
    } catch (error) {
      console.error("Error processing CV download:", error);
      res.status(500).json({ error: "Failed to process CV download" });
    }
  });

  // Get all CV contacts (admin only)
  app.get("/api/cv/contacts", adminAuth, async (req, res) => {
    try {
      const contacts = await storage.getAllCVContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching CV contacts:", error);
      res.status(500).json({ error: "Failed to fetch CV contacts" });
    }
  });

  // Delete CV contact (admin only)
  app.delete("/api/cv/contacts/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid contact ID" });
      }

      const deleted = await storage.deleteCVContact(id);
      if (!deleted) {
        return res.status(404).json({ error: "Contact not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting CV contact:", error);
      res.status(500).json({ error: "Failed to delete contact" });
    }
  });

  // Upload new CV (admin only)
  app.post("/api/cv/upload", adminAuth, upload.single('cv'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const label = req.body?.label?.trim() || null;
      if (!label) {
        return res.status(400).json({ error: "Label is required for CV uploads" });
      }

      // Save file metadata to database
      const cvFile = await storage.createCVFile({
        filename: req.file.filename,
        label,
      });

      res.status(201).json({ 
        success: true,
        file: cvFile,
      });
    } catch (error) {
      console.error("Error uploading CV:", error);
      res.status(500).json({ error: "Failed to upload CV" });
    }
  });

  // Get latest CV metadata (admin only)
  app.get("/api/cv/latest", adminAuth, async (req, res) => {
    try {
      const cvFile = await storage.getLatestCVFile();
      
      if (!cvFile) {
        return res.status(404).json({ error: "No CV file found" });
      }

      res.json(cvFile);
    } catch (error) {
      console.error("Error fetching latest CV:", error);
      res.status(500).json({ error: "Failed to fetch latest CV" });
    }
  });

  // Get all CV files (admin only)
  app.get("/api/cv/files", adminAuth, async (req, res) => {
    try {
      const files = await storage.getAllCVFiles();
      res.json(files);
    } catch (error) {
      console.error("Error fetching CV files:", error);
      res.status(500).json({ error: "Failed to fetch CV files" });
    }
  });

  // Delete CV file (admin only) — removes DB row and physical file
  app.delete("/api/cv/files/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
      // Fetch metadata before deletion so we have the filename
      const cvFile = await storage.getCVFileById(id);
      if (!cvFile) return res.status(404).json({ error: "File not found" });
      const ok = await storage.deleteCVFile(id);
      if (!ok) return res.status(404).json({ error: "File not found" });
      // Remove physical file if it exists (best-effort, non-fatal)
      try {
        const filePath = path.join(process.cwd(), 'uploads', 'cv', cvFile.filename);
        await fs.unlink(filePath);
      } catch {
        // File may already be missing — safe to ignore
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting CV file:", error);
      res.status(500).json({ error: "Failed to delete CV file" });
    }
  });

  // ============ PROJECT ROUTES (Portfolio) ============

  // Get all projects (public)
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // Get single project by slug (public)
  app.get("/api/projects/by-slug/:slug", async (req, res) => {
    try {
      const project = await storage.getProjectBySlug(req.params.slug);
      if (!project) return res.status(404).json({ error: "Project not found" });
      res.json(project);
    } catch (error) {
      console.error("Error fetching project by slug:", error);
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  // Get single project by id (public)
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
      const project = await storage.getProjectById(id);
      if (!project) return res.status(404).json({ error: "Project not found" });
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  // Create project (admin)
  app.post("/api/projects", adminAuth, async (req, res) => {
    try {
      const validation = insertProjectSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: fromZodError(validation.error).toString() });
      }
      const project = await storage.createProject(validation.data);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  // Update project (admin)
  app.patch("/api/projects/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
      const validation = updateProjectSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: fromZodError(validation.error).toString() });
      }
      const project = await storage.updateProject(id, validation.data);
      if (!project) return res.status(404).json({ error: "Project not found" });
      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  // Delete project (admin)
  app.delete("/api/projects/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
      const success = await storage.deleteProject(id);
      if (!success) return res.status(404).json({ error: "Project not found" });
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Reorder projects (admin)
  app.post("/api/projects/reorder", adminAuth, async (req, res) => {
    try {
      const schema = z.array(z.object({ id: z.number(), sortOrder: z.number() }));
      const parsed = schema.safeParse(req.body?.orders);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid payload" });
      }
      await storage.reorderProjects(parsed.data);
      res.json({ success: true });
    } catch (error) {
      console.error("Error reordering projects:", error);
      res.status(500).json({ error: "Failed to reorder projects" });
    }
  });

  // Upload project image (admin)
  app.post("/api/projects/upload-image", adminAuth, projectImageUpload.single('image'), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      const url = `/uploads/projects/${req.file.filename}`;
      res.status(201).json({ url });
    } catch (error) {
      console.error("Error uploading project image:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  });

  // ============ BUILT PROJECTS ROUTES ============

  // Get all built projects (public)
  app.get("/api/built-projects", async (_req, res) => {
    try { res.json(await storage.getAllBuiltProjects()); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to fetch" }); }
  });

  // Create (admin)
  app.post("/api/built-projects", adminAuth, async (req, res) => {
    try {
      const v = insertBuiltProjectSchema.safeParse(req.body);
      if (!v.success) return res.status(400).json({ error: fromZodError(v.error).toString() });
      res.status(201).json(await storage.createBuiltProject(v.data));
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to create" }); }
  });

  // Update (admin)
  app.patch("/api/built-projects/:id", adminAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    try {
      const v = updateBuiltProjectSchema.safeParse(req.body);
      if (!v.success) return res.status(400).json({ error: fromZodError(v.error).toString() });
      const r = await storage.updateBuiltProject(id, v.data);
      if (!r) return res.status(404).json({ error: "Not found" });
      res.json(r);
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to update" }); }
  });

  // Delete (admin)
  app.delete("/api/built-projects/:id", adminAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    try {
      const ok = await storage.deleteBuiltProject(id);
      if (!ok) return res.status(404).json({ error: "Not found" });
      res.json({ success: true });
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to delete" }); }
  });

  // Upload screenshot image (admin) — reuses projectImageUpload multer
  app.post("/api/built-projects/upload-image", adminAuth, projectImageUpload.single('image'), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      res.status(201).json({ url: `/uploads/projects/${req.file.filename}` });
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to upload" }); }
  });

  // ============ SITE CONTENT ROUTES ============
  const reorderSchema = z.array(z.object({ id: z.number(), sortOrder: z.number() }));

  // ----- Career Roles -----
  app.get("/api/site/career-roles", async (_req, res) => {
    try { res.json(await storage.getAllCareerRoles()); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to fetch career roles" }); }
  });
  app.post("/api/site/career-roles", adminAuth, async (req, res) => {
    const v = insertCareerRoleSchema.safeParse(req.body);
    if (!v.success) return res.status(400).json({ error: fromZodError(v.error).toString() });
    try { res.status(201).json(await storage.createCareerRole(v.data)); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to create" }); }
  });
  app.patch("/api/site/career-roles/:id", adminAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    const v = updateCareerRoleSchema.safeParse(req.body);
    if (!v.success) return res.status(400).json({ error: fromZodError(v.error).toString() });
    try {
      const r = await storage.updateCareerRole(id, v.data);
      if (!r) return res.status(404).json({ error: "Not found" });
      res.json(r);
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to update" }); }
  });
  app.delete("/api/site/career-roles/:id", adminAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    try {
      const ok = await storage.deleteCareerRole(id);
      if (!ok) return res.status(404).json({ error: "Not found" });
      res.json({ success: true });
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to delete" }); }
  });
  app.post("/api/site/career-roles/reorder", adminAuth, async (req, res) => {
    const p = reorderSchema.safeParse(req.body?.orders);
    if (!p.success) return res.status(400).json({ error: "Invalid payload" });
    try { await storage.reorderCareerRoles(p.data); res.json({ success: true }); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to reorder" }); }
  });

  // ----- Flagship Wins -----
  app.get("/api/site/flagship-wins", async (_req, res) => {
    try { res.json(await storage.getAllFlagshipWins()); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to fetch" }); }
  });
  app.post("/api/site/flagship-wins", adminAuth, async (req, res) => {
    const v = insertFlagshipWinSchema.safeParse(req.body);
    if (!v.success) return res.status(400).json({ error: fromZodError(v.error).toString() });
    try { res.status(201).json(await storage.createFlagshipWin(v.data)); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to create" }); }
  });
  app.patch("/api/site/flagship-wins/:id", adminAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    const v = updateFlagshipWinSchema.safeParse(req.body);
    if (!v.success) return res.status(400).json({ error: fromZodError(v.error).toString() });
    try {
      const r = await storage.updateFlagshipWin(id, v.data);
      if (!r) return res.status(404).json({ error: "Not found" });
      res.json(r);
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to update" }); }
  });
  app.delete("/api/site/flagship-wins/:id", adminAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    try {
      const ok = await storage.deleteFlagshipWin(id);
      if (!ok) return res.status(404).json({ error: "Not found" });
      res.json({ success: true });
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to delete" }); }
  });
  app.post("/api/site/flagship-wins/reorder", adminAuth, async (req, res) => {
    const p = reorderSchema.safeParse(req.body?.orders);
    if (!p.success) return res.status(400).json({ error: "Invalid payload" });
    try { await storage.reorderFlagshipWins(p.data); res.json({ success: true }); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to reorder" }); }
  });

  // ----- Site Skills -----
  app.get("/api/site/skills", async (_req, res) => {
    try { res.json(await storage.getAllSiteSkills()); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to fetch" }); }
  });
  app.post("/api/site/skills", adminAuth, async (req, res) => {
    const v = insertSiteSkillSchema.safeParse(req.body);
    if (!v.success) return res.status(400).json({ error: fromZodError(v.error).toString() });
    try { res.status(201).json(await storage.createSiteSkill(v.data)); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to create" }); }
  });
  app.patch("/api/site/skills/:id", adminAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    const v = updateSiteSkillSchema.safeParse(req.body);
    if (!v.success) return res.status(400).json({ error: fromZodError(v.error).toString() });
    try {
      const r = await storage.updateSiteSkill(id, v.data);
      if (!r) return res.status(404).json({ error: "Not found" });
      res.json(r);
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to update" }); }
  });
  app.delete("/api/site/skills/:id", adminAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    try {
      const ok = await storage.deleteSiteSkill(id);
      if (!ok) return res.status(404).json({ error: "Not found" });
      res.json({ success: true });
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to delete" }); }
  });
  app.post("/api/site/skills/reorder", adminAuth, async (req, res) => {
    const p = reorderSchema.safeParse(req.body?.orders);
    if (!p.success) return res.status(400).json({ error: "Invalid payload" });
    try { await storage.reorderSiteSkills(p.data); res.json({ success: true }); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to reorder" }); }
  });

  // ----- Site Certifications -----
  app.get("/api/site/certifications", async (_req, res) => {
    try { res.json(await storage.getAllSiteCertifications()); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to fetch" }); }
  });
  app.post("/api/site/certifications", adminAuth, async (req, res) => {
    const v = insertSiteCertificationSchema.safeParse(req.body);
    if (!v.success) return res.status(400).json({ error: fromZodError(v.error).toString() });
    try { res.status(201).json(await storage.createSiteCertification(v.data)); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to create" }); }
  });
  app.patch("/api/site/certifications/:id", adminAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    const v = updateSiteCertificationSchema.safeParse(req.body);
    if (!v.success) return res.status(400).json({ error: fromZodError(v.error).toString() });
    try {
      const r = await storage.updateSiteCertification(id, v.data);
      if (!r) return res.status(404).json({ error: "Not found" });
      res.json(r);
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to update" }); }
  });
  app.delete("/api/site/certifications/:id", adminAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    try {
      const ok = await storage.deleteSiteCertification(id);
      if (!ok) return res.status(404).json({ error: "Not found" });
      res.json({ success: true });
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to delete" }); }
  });
  app.post("/api/site/certifications/reorder", adminAuth, async (req, res) => {
    const p = reorderSchema.safeParse(req.body?.orders);
    if (!p.success) return res.status(400).json({ error: "Invalid payload" });
    try { await storage.reorderSiteCertifications(p.data); res.json({ success: true }); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to reorder" }); }
  });

  // ----- Site Education -----
  app.get("/api/site/education", async (_req, res) => {
    try { res.json(await storage.getAllSiteEducation()); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to fetch" }); }
  });
  app.post("/api/site/education", adminAuth, async (req, res) => {
    const v = insertSiteEducationSchema.safeParse(req.body);
    if (!v.success) return res.status(400).json({ error: fromZodError(v.error).toString() });
    try { res.status(201).json(await storage.createSiteEducation(v.data)); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to create" }); }
  });
  app.patch("/api/site/education/:id", adminAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    const v = updateSiteEducationSchema.safeParse(req.body);
    if (!v.success) return res.status(400).json({ error: fromZodError(v.error).toString() });
    try {
      const r = await storage.updateSiteEducation(id, v.data);
      if (!r) return res.status(404).json({ error: "Not found" });
      res.json(r);
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to update" }); }
  });
  app.delete("/api/site/education/:id", adminAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    try {
      const ok = await storage.deleteSiteEducation(id);
      if (!ok) return res.status(404).json({ error: "Not found" });
      res.json({ success: true });
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to delete" }); }
  });
  app.post("/api/site/education/reorder", adminAuth, async (req, res) => {
    const p = reorderSchema.safeParse(req.body?.orders);
    if (!p.success) return res.status(400).json({ error: "Invalid payload" });
    try { await storage.reorderSiteEducation(p.data); res.json({ success: true }); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to reorder" }); }
  });

  // ----- Theme CSS (no-FOUC delivery) -----
  const DEFAULT_THEME = {
    'theme.brandPrimary': '190 85% 55%',
    'theme.brandAccent': '220 90% 60%',
    'theme.brandPrimaryDark': '190 85% 55%',
    'theme.brandAccentDark': '220 90% 60%',
    'theme.backgroundLight': '240 5% 96%',
    'theme.backgroundDark': '270 8% 12%',
  };
  const FONT_ALLOWLIST: Record<string, string> = {
    'Inter': 'Inter:wght@400;500;600;700',
    'Space Grotesk': 'Space+Grotesk:wght@400;500;600;700',
    'Roboto': 'Roboto:wght@400;500;700',
    'Open Sans': 'Open+Sans:wght@400;500;600;700',
    'Lato': 'Lato:wght@400;700',
    'Montserrat': 'Montserrat:wght@400;500;600;700',
    'Poppins': 'Poppins:wght@400;500;600;700',
    'Raleway': 'Raleway:wght@400;500;600;700',
    'Playfair Display': 'Playfair+Display:wght@400;700',
    'Merriweather': 'Merriweather:wght@400;700',
    'Source Sans 3': 'Source+Sans+3:wght@400;600;700',
    'IBM Plex Sans': 'IBM+Plex+Sans:wght@400;500;600;700',
    'Work Sans': 'Work+Sans:wght@400;500;600;700',
    'DM Sans': 'DM+Sans:wght@400;500;700',
  };
  const DEFAULT_FONTS = { 'theme.fontHeading': 'Space Grotesk', 'theme.fontBody': 'Inter' };
  const isValidHsl = (v: string): boolean => {
    const m = v.trim().match(/^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/);
    if (!m) return false;
    const h = parseFloat(m[1]), s = parseFloat(m[2]), l = parseFloat(m[3]);
    return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100;
  };
  const isValidFont = (v: string): boolean => Object.prototype.hasOwnProperty.call(FONT_ALLOWLIST, v);
  app.get("/api/theme.css", async (_req, res) => {
    res.setHeader('Content-Type', 'text/css; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const buildCss = (m: Record<string, string>, fonts: Record<string, string>) => {
      const families = Array.from(new Set([fonts['theme.fontHeading'], fonts['theme.fontBody']]))
        .map(f => FONT_ALLOWLIST[f]).filter(Boolean).join('&family=');
      const importLine = families
        ? `@import url('https://fonts.googleapis.com/css2?family=${families}&display=swap');`
        : '';
      return `${importLine}
:root{--brand-primary:${m['theme.brandPrimary']};--brand-accent:${m['theme.brandAccent']};--background:${m['theme.backgroundLight']};--font-sans:${fonts['theme.fontBody']},sans-serif;--font-display:${fonts['theme.fontHeading']},sans-serif;}
.dark{--brand-primary:${m['theme.brandPrimaryDark']};--brand-accent:${m['theme.brandAccentDark']};--background:${m['theme.backgroundDark']};}`;
    };
    try {
      const rows = await storage.getAllSiteSettings();
      const map: Record<string, string> = { ...DEFAULT_THEME };
      const fonts: Record<string, string> = { ...DEFAULT_FONTS };
      rows.forEach(r => {
        if (r.key in DEFAULT_THEME && isValidHsl(r.value)) map[r.key] = r.value;
        else if (r.key in DEFAULT_FONTS && isValidFont(r.value)) fonts[r.key] = r.value;
      });
      res.send(buildCss(map, fonts));
    } catch (e) {
      console.error('theme.css error:', e);
      res.send(buildCss(DEFAULT_THEME, DEFAULT_FONTS));
    }
  });

  // ----- Site Settings (key/value) -----
  app.get("/api/site/settings", async (_req, res) => {
    try {
      const rows = await storage.getAllSiteSettings();
      const map: Record<string, string> = {};
      rows.forEach(r => { map[r.key] = r.value; });
      res.json(map);
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to fetch" }); }
  });
  app.put("/api/site/settings", adminAuth, async (req, res) => {
    const v = z.array(upsertSiteSettingSchema).safeParse(req.body?.entries);
    if (!v.success) return res.status(400).json({ error: fromZodError(v.error).toString() });
    for (const e of v.data) {
      if (e.key in DEFAULT_THEME && !isValidHsl(e.value)) {
        return res.status(400).json({ error: `Invalid HSL value for ${e.key}: expected "H S% L%" (H 0-360, S/L 0-100)` });
      }
      if (e.key in DEFAULT_FONTS && !isValidFont(e.value)) {
        return res.status(400).json({ error: `Invalid font for ${e.key}: must be one of ${Object.keys(FONT_ALLOWLIST).join(', ')}` });
      }
    }
    try { await storage.upsertSiteSettings(v.data); res.json({ success: true }); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to save" }); }
  });

  // ============ PROFILE VARIANTS ROUTES ============

  // List all variants (admin only)
  app.get("/api/variants", adminAuth, async (req, res) => {
    try { res.json(await storage.listVariants()); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to fetch variants" }); }
  });

  // Get variant by slug (public — for home page)
  app.get("/api/variants/:slug", async (req, res) => {
    try {
      const variant = await storage.getVariantBySlug(req.params.slug);
      if (!variant || !variant.isActive) return res.status(404).json({ error: "Variant not found" });
      res.json(variant);
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to fetch variant" }); }
  });

  // Create variant (admin only)
  app.post("/api/variants", adminAuth, async (req, res) => {
    const v = insertProfileVariantSchema.safeParse(req.body);
    if (!v.success) return res.status(400).json({ error: fromZodError(v.error).toString() });
    try { res.status(201).json(await storage.createVariant(v.data)); }
    catch (e) { console.error(e); res.status(500).json({ error: "Failed to create variant" }); }
  });

  // Update variant (admin only)
  app.patch("/api/variants/:id", adminAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    const v = updateProfileVariantSchema.safeParse(req.body);
    if (!v.success) return res.status(400).json({ error: fromZodError(v.error).toString() });
    try {
      const r = await storage.updateVariant(id, v.data);
      if (!r) return res.status(404).json({ error: "Not found" });
      res.json(r);
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to update variant" }); }
  });

  // Delete variant (admin only)
  app.delete("/api/variants/:id", adminAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    try {
      const ok = await storage.deleteVariant(id);
      if (!ok) return res.status(404).json({ error: "Not found" });
      res.json({ success: true });
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to delete variant" }); }
  });

  // Generic site image upload (logos, etc.) — reuses project image multer
  app.post("/api/site/upload-image", adminAuth, projectImageUpload.single('image'), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      res.status(201).json({ url: `/uploads/projects/${req.file.filename}` });
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to upload" }); }
  });

  // AI image generation for blog hero images using gpt-image-1
  app.post("/api/generate-image", adminAuth, async (req, res) => {
    try {
      const { title, category } = req.body;
      if (!title) return res.status(400).json({ error: "title is required" });
      const url = await generateBlogImage(title, category || "Programme Management");
      res.json({ url });
    } catch (e: any) {
      console.error("Image generation error:", e);
      res.status(500).json({ error: e.message || "Failed to generate image" });
    }
  });

  // OG image upload — saves as /uploads/og-image.jpg (fixed filename for meta tag)
  const ogImageStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
      const dir = path.join(process.cwd(), 'uploads');
      await fs.mkdir(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => cb(null, 'og-image.jpg'),
  });
  const ogImageUpload = multer({
    storage: ogImageStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => cb(null, /image\/(jpeg|jpg|png|webp)/.test(file.mimetype)),
  });
  app.post("/api/site/upload-og-image", adminAuth, ogImageUpload.single('image'), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      res.json({ success: true, url: '/uploads/og-image.jpg' });
    } catch (e) { console.error(e); res.status(500).json({ error: "Failed to upload OG image" }); }
  });

  // Sitemap
  app.get('/sitemap.xml', (req, res) => {
    const base = 'https://mujeeb-lawal.replit.app';
    const pages = [
      { path: '/', priority: '1.0', freq: 'weekly' },
      { path: '/case-studies', priority: '0.8', freq: 'monthly' },
      { path: '/portfolio', priority: '0.8', freq: 'weekly' },
      { path: '/insights', priority: '0.8', freq: 'weekly' },
    ];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${base}${p.path}</loc>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
    res.set('Content-Type', 'application/xml');
    res.send(xml);
  });

  // Robots.txt
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *\nAllow: /\nSitemap: https://mujeeb-lawal.replit.app/sitemap.xml\n`);
  });

  // Seed defaults from constants if tables are empty
  try { await storage.seedSiteContentIfEmpty(); }
  catch (e) { console.error("Seed error:", e); }

  const httpServer = createServer(app);

  return httpServer;
}

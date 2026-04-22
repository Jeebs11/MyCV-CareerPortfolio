import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eq, desc, asc, inArray, sql } from 'drizzle-orm';
import { 
  blogPostsTable, 
  type InsertBlogPost, 
  type UpdateBlogPost, 
  type BlogPostRow,
  cvContactsTable,
  type InsertCVContact,
  type CVContactRow,
  cvFileTable,
  type InsertCVFile,
  type CVFileRow,
  projectsTable,
  type InsertProject,
  type UpdateProject,
  type ProjectRow
} from '@shared/schema';

// Initialize database connection using HTTP (better for serverless/Replit environments)
const neonSql = neon(process.env.DATABASE_URL!);
export const db = drizzle(neonSql);

// Storage interface for blog posts and CV management
export interface IStorage {
  // Blog Post methods
  getAllBlogPosts(): Promise<BlogPostRow[]>;
  getBlogPostById(id: number): Promise<BlogPostRow | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPostRow>;
  updateBlogPost(id: number, post: UpdateBlogPost): Promise<BlogPostRow | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // CV Contact methods
  createCVContact(contact: InsertCVContact): Promise<CVContactRow>;
  getAllCVContacts(): Promise<CVContactRow[]>;
  deleteCVContact(id: number): Promise<boolean>;
  
  // CV File methods
  createCVFile(file: InsertCVFile): Promise<CVFileRow>;
  getLatestCVFile(): Promise<CVFileRow | undefined>;

  // Project methods
  getAllProjects(): Promise<ProjectRow[]>;
  getProjectById(id: number): Promise<ProjectRow | undefined>;
  getProjectBySlug(slug: string): Promise<ProjectRow | undefined>;
  createProject(project: InsertProject): Promise<ProjectRow>;
  updateProject(id: number, project: UpdateProject): Promise<ProjectRow | undefined>;
  deleteProject(id: number): Promise<boolean>;
  reorderProjects(orders: { id: number; sortOrder: number }[]): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Blog Post CRUD operations
  async getAllBlogPosts(): Promise<BlogPostRow[]> {
    return await db.select().from(blogPostsTable).orderBy(desc(blogPostsTable.createdAt));
  }

  async getBlogPostById(id: number): Promise<BlogPostRow | undefined> {
    const results = await db.select().from(blogPostsTable).where(eq(blogPostsTable.id, id));
    return results[0];
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPostRow> {
    const results = await db.insert(blogPostsTable).values(post).returning();
    return results[0];
  }

  async updateBlogPost(id: number, post: UpdateBlogPost): Promise<BlogPostRow | undefined> {
    const results = await db
      .update(blogPostsTable)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPostsTable.id, id))
      .returning();
    return results[0];
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const results = await db.delete(blogPostsTable).where(eq(blogPostsTable.id, id)).returning();
    return results.length > 0;
  }
  
  // CV Contact CRUD operations
  async createCVContact(contact: InsertCVContact): Promise<CVContactRow> {
    const results = await db.insert(cvContactsTable).values(contact).returning();
    return results[0];
  }
  
  async getAllCVContacts(): Promise<CVContactRow[]> {
    return await db.select().from(cvContactsTable).orderBy(desc(cvContactsTable.downloadedAt));
  }
  
  async deleteCVContact(id: number): Promise<boolean> {
    const results = await db.delete(cvContactsTable).where(eq(cvContactsTable.id, id)).returning();
    return results.length > 0;
  }
  
  // CV File CRUD operations
  async createCVFile(file: InsertCVFile): Promise<CVFileRow> {
    const results = await db.insert(cvFileTable).values(file).returning();
    return results[0];
  }
  
  async getLatestCVFile(): Promise<CVFileRow | undefined> {
    const results = await db.select().from(cvFileTable).orderBy(desc(cvFileTable.uploadedAt)).limit(1);
    return results[0];
  }

  // Project CRUD operations
  async getAllProjects(): Promise<ProjectRow[]> {
    try {
      const rows = await db.select().from(projectsTable).orderBy(asc(projectsTable.sortOrder), desc(projectsTable.createdAt));
      return rows;
    } catch (err: any) {
      // Neon HTTP driver edge case on empty result sets
      if (err?.message?.includes("Cannot read properties of null")) {
        return [];
      }
      throw err;
    }
  }

  async getProjectById(id: number): Promise<ProjectRow | undefined> {
    const results = await db.select().from(projectsTable).where(eq(projectsTable.id, id));
    return results[0];
  }

  async getProjectBySlug(slug: string): Promise<ProjectRow | undefined> {
    try {
      const results = await db.select().from(projectsTable).where(eq(projectsTable.slug, slug));
      return results[0];
    } catch (err: any) {
      // Neon HTTP driver can throw on empty result sets in some versions
      if (err?.message?.includes("Cannot read properties of null")) return undefined;
      throw err;
    }
  }

  async createProject(project: InsertProject): Promise<ProjectRow> {
    const results = await db.insert(projectsTable).values(project).returning();
    return results[0];
  }

  async updateProject(id: number, project: UpdateProject): Promise<ProjectRow | undefined> {
    const results = await db
      .update(projectsTable)
      .set({ ...project, updatedAt: new Date() })
      .where(eq(projectsTable.id, id))
      .returning();
    return results[0];
  }

  async deleteProject(id: number): Promise<boolean> {
    const results = await db.delete(projectsTable).where(eq(projectsTable.id, id)).returning();
    return results.length > 0;
  }

  async reorderProjects(orders: { id: number; sortOrder: number }[]): Promise<void> {
    if (orders.length === 0) return;
    // Atomic single-statement update using CASE so partial failures cannot
    // leave inconsistent sortOrder values (Neon HTTP driver has no tx support).
    const ids = orders.map(o => o.id);
    const cases = orders
      .map(o => sql`WHEN ${projectsTable.id} = ${o.id} THEN ${o.sortOrder}`);
    const joined = (sql as any).join(cases, sql.raw(' '));
    await db
      .update(projectsTable)
      .set({
        sortOrder: sql`CASE ${joined} END` as any,
        updatedAt: new Date(),
      })
      .where(inArray(projectsTable.id, ids));
  }
}

export const storage = new DatabaseStorage();

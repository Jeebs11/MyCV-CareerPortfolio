import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eq, desc } from 'drizzle-orm';
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
  type CVFileRow
} from '@shared/schema';

// Initialize database connection using HTTP (better for serverless/Replit environments)
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);

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
  
  // CV File methods
  createCVFile(file: InsertCVFile): Promise<CVFileRow>;
  getLatestCVFile(): Promise<CVFileRow | undefined>;
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
  
  // CV File CRUD operations
  async createCVFile(file: InsertCVFile): Promise<CVFileRow> {
    const results = await db.insert(cvFileTable).values(file).returning();
    return results[0];
  }
  
  async getLatestCVFile(): Promise<CVFileRow | undefined> {
    const results = await db.select().from(cvFileTable).orderBy(desc(cvFileTable.uploadedAt)).limit(1);
    return results[0];
  }
}

export const storage = new DatabaseStorage();

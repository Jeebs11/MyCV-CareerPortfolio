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
  profileVariantsTable,
  type InsertProfileVariant,
  type UpdateProfileVariant,
  type ProfileVariantRow,
  projectsTable,
  type InsertProject,
  type UpdateProject,
  type ProjectRow,
  builtProjectsTable,
  type InsertBuiltProject,
  type UpdateBuiltProject,
  type BuiltProjectRow,
  careerRolesTable,
  type InsertCareerRole,
  type UpdateCareerRole,
  type CareerRoleRow,
  flagshipWinsTable,
  type InsertFlagshipWin,
  type UpdateFlagshipWin,
  type FlagshipWinRow,
  siteSkillsTable,
  type InsertSiteSkill,
  type UpdateSiteSkill,
  type SiteSkillRow,
  siteCertificationsTable,
  type InsertSiteCertification,
  type UpdateSiteCertification,
  type SiteCertificationRow,
  siteEducationTable,
  type InsertSiteEducation,
  type UpdateSiteEducation,
  type SiteEducationRow,
  siteSettingsTable,
  type UpsertSiteSetting,
  type SiteSettingRow,
  chatSessionsTable,
  type InsertChatSession,
  type ChatSessionRow,
  timelineProjects,
  detailedCertifications,
  education as educationDefaults,
} from '@shared/schema';

// Initialize database connection using HTTP (better for serverless/Replit environments)
const neonSql = neon(process.env.DATABASE_URL!);
export const db = drizzle(neonSql);

function isNeonEmptyResultError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("Cannot read properties of null");
}

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
  getCVFileById(id: number): Promise<CVFileRow | undefined>;
  getAllCVFiles(): Promise<CVFileRow[]>;
  deleteCVFile(id: number): Promise<boolean>;

  // Profile Variants
  listVariants(): Promise<ProfileVariantRow[]>;
  getVariantBySlug(slug: string): Promise<ProfileVariantRow | undefined>;
  getVariantById(id: number): Promise<ProfileVariantRow | undefined>;
  createVariant(data: InsertProfileVariant): Promise<ProfileVariantRow>;
  updateVariant(id: number, data: UpdateProfileVariant): Promise<ProfileVariantRow | undefined>;
  deleteVariant(id: number): Promise<boolean>;

  // Project methods
  getAllProjects(): Promise<ProjectRow[]>;
  getProjectById(id: number): Promise<ProjectRow | undefined>;
  getProjectBySlug(slug: string): Promise<ProjectRow | undefined>;
  createProject(project: InsertProject): Promise<ProjectRow>;
  updateProject(id: number, project: UpdateProject): Promise<ProjectRow | undefined>;
  deleteProject(id: number): Promise<boolean>;
  reorderProjects(orders: { id: number; sortOrder: number }[]): Promise<void>;

  // Career Roles
  getAllCareerRoles(): Promise<CareerRoleRow[]>;
  createCareerRole(data: InsertCareerRole): Promise<CareerRoleRow>;
  updateCareerRole(id: number, data: UpdateCareerRole): Promise<CareerRoleRow | undefined>;
  deleteCareerRole(id: number): Promise<boolean>;
  reorderCareerRoles(orders: { id: number; sortOrder: number }[]): Promise<void>;

  // Flagship Wins
  getAllFlagshipWins(): Promise<FlagshipWinRow[]>;
  createFlagshipWin(data: InsertFlagshipWin): Promise<FlagshipWinRow>;
  updateFlagshipWin(id: number, data: UpdateFlagshipWin): Promise<FlagshipWinRow | undefined>;
  deleteFlagshipWin(id: number): Promise<boolean>;
  reorderFlagshipWins(orders: { id: number; sortOrder: number }[]): Promise<void>;

  // Site Skills
  getAllSiteSkills(): Promise<SiteSkillRow[]>;
  createSiteSkill(data: InsertSiteSkill): Promise<SiteSkillRow>;
  updateSiteSkill(id: number, data: UpdateSiteSkill): Promise<SiteSkillRow | undefined>;
  deleteSiteSkill(id: number): Promise<boolean>;
  reorderSiteSkills(orders: { id: number; sortOrder: number }[]): Promise<void>;

  // Site Certifications
  getAllSiteCertifications(): Promise<SiteCertificationRow[]>;
  createSiteCertification(data: InsertSiteCertification): Promise<SiteCertificationRow>;
  updateSiteCertification(id: number, data: UpdateSiteCertification): Promise<SiteCertificationRow | undefined>;
  deleteSiteCertification(id: number): Promise<boolean>;
  reorderSiteCertifications(orders: { id: number; sortOrder: number }[]): Promise<void>;

  // Site Education
  getAllSiteEducation(): Promise<SiteEducationRow[]>;
  createSiteEducation(data: InsertSiteEducation): Promise<SiteEducationRow>;
  updateSiteEducation(id: number, data: UpdateSiteEducation): Promise<SiteEducationRow | undefined>;
  deleteSiteEducation(id: number): Promise<boolean>;
  reorderSiteEducation(orders: { id: number; sortOrder: number }[]): Promise<void>;

  // Site Settings
  getAllSiteSettings(): Promise<SiteSettingRow[]>;
  upsertSiteSettings(entries: UpsertSiteSetting[]): Promise<void>;

  // Built Projects
  getAllBuiltProjects(): Promise<BuiltProjectRow[]>;
  createBuiltProject(data: InsertBuiltProject): Promise<BuiltProjectRow>;
  updateBuiltProject(id: number, data: UpdateBuiltProject): Promise<BuiltProjectRow | undefined>;
  deleteBuiltProject(id: number): Promise<boolean>;
  reorderBuiltProjects(orders: { id: number; sortOrder: number }[]): Promise<void>;

  // Chat Sessions
  saveChatSession(data: InsertChatSession): Promise<ChatSessionRow>;
  listChatSessions(): Promise<ChatSessionRow[]>;
  deleteChatSession(id: number): Promise<void>;

  // Seed
  seedSiteContentIfEmpty(): Promise<void>;
}

function reorderCaseUpdate<T extends { id: unknown; sortOrder: unknown }>(
  table: T,
  orders: { id: number; sortOrder: number }[],
) {
  const ids = orders.map(o => o.id);
  const cases = orders.map(
    o => sql`WHEN ${(table as unknown as { id: unknown }).id} = ${o.id} THEN ${o.sortOrder}::integer`
  );
  const joined = sql.join(cases, sql.raw(' '));
  return { ids, joined };
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
  
  async createCVFile(file: InsertCVFile): Promise<CVFileRow> {
    const results = await db.insert(cvFileTable).values(file).returning();
    return results[0];
  }
  
  async getLatestCVFile(): Promise<CVFileRow | undefined> {
    const results = await db.select().from(cvFileTable).orderBy(desc(cvFileTable.uploadedAt)).limit(1);
    return results[0];
  }

  async getCVFileById(id: number): Promise<CVFileRow | undefined> {
    const results = await db.select().from(cvFileTable).where(eq(cvFileTable.id, id)).limit(1);
    return results[0];
  }

  async getAllCVFiles(): Promise<CVFileRow[]> {
    return await db.select().from(cvFileTable).orderBy(desc(cvFileTable.uploadedAt));
  }

  async deleteCVFile(id: number): Promise<boolean> {
    const results = await db.delete(cvFileTable).where(eq(cvFileTable.id, id)).returning();
    return results.length > 0;
  }

  // Profile Variants
  async listVariants(): Promise<ProfileVariantRow[]> {
    try {
      return await db.select().from(profileVariantsTable).orderBy(asc(profileVariantsTable.sortOrder), asc(profileVariantsTable.id));
    } catch (err) {
      if (isNeonEmptyResultError(err)) return [];
      throw err;
    }
  }

  async getVariantBySlug(slug: string): Promise<ProfileVariantRow | undefined> {
    try {
      const results = await db.select().from(profileVariantsTable).where(eq(profileVariantsTable.slug, slug));
      return results[0];
    } catch (err) {
      if (isNeonEmptyResultError(err)) return undefined;
      throw err;
    }
  }

  async getVariantById(id: number): Promise<ProfileVariantRow | undefined> {
    const results = await db.select().from(profileVariantsTable).where(eq(profileVariantsTable.id, id));
    return results[0];
  }

  async createVariant(data: InsertProfileVariant): Promise<ProfileVariantRow> {
    const results = await db.insert(profileVariantsTable).values(data).returning();
    return results[0];
  }

  async updateVariant(id: number, data: UpdateProfileVariant): Promise<ProfileVariantRow | undefined> {
    const results = await db.update(profileVariantsTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(profileVariantsTable.id, id))
      .returning();
    return results[0];
  }

  async deleteVariant(id: number): Promise<boolean> {
    const results = await db.delete(profileVariantsTable).where(eq(profileVariantsTable.id, id)).returning();
    return results.length > 0;
  }

  // Project CRUD operations
  async getAllProjects(): Promise<ProjectRow[]> {
    try {
      const rows = await db.select().from(projectsTable).orderBy(asc(projectsTable.sortOrder), desc(projectsTable.createdAt));
      return rows;
    } catch (err) {
      if (isNeonEmptyResultError(err)) return [];
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
    } catch (err) {
      if (isNeonEmptyResultError(err)) return undefined;
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
    const { ids, joined } = reorderCaseUpdate(projectsTable, orders);
    await db
      .update(projectsTable)
      .set({
        sortOrder: sql<number>`CASE ${joined} END`,
        updatedAt: new Date(),
      })
      .where(inArray(projectsTable.id, ids));
  }

  // Built Projects
  async getAllBuiltProjects(): Promise<BuiltProjectRow[]> {
    try {
      return await db.select().from(builtProjectsTable).orderBy(asc(builtProjectsTable.sortOrder), asc(builtProjectsTable.id));
    } catch (err) {
      if (isNeonEmptyResultError(err)) return [];
      throw err;
    }
  }
  async createBuiltProject(data: InsertBuiltProject): Promise<BuiltProjectRow> {
    const r = await db.insert(builtProjectsTable).values(data).returning();
    return r[0];
  }
  async updateBuiltProject(id: number, data: UpdateBuiltProject): Promise<BuiltProjectRow | undefined> {
    const r = await db.update(builtProjectsTable).set({ ...data, updatedAt: new Date() }).where(eq(builtProjectsTable.id, id)).returning();
    return r[0];
  }
  async deleteBuiltProject(id: number): Promise<boolean> {
    const r = await db.delete(builtProjectsTable).where(eq(builtProjectsTable.id, id)).returning();
    return r.length > 0;
  }
  async reorderBuiltProjects(orders: { id: number; sortOrder: number }[]): Promise<void> {
    if (orders.length === 0) return;
    const { ids, joined } = reorderCaseUpdate(builtProjectsTable, orders);
    await db.update(builtProjectsTable).set({
      sortOrder: sql<number>`CASE ${joined} END`,
      updatedAt: new Date(),
    }).where(inArray(builtProjectsTable.id, ids));
  }

  // Career Roles
  async getAllCareerRoles(): Promise<CareerRoleRow[]> {
    try {
      return await db.select().from(careerRolesTable).orderBy(asc(careerRolesTable.sortOrder), desc(careerRolesTable.id));
    } catch (err) {
      if (isNeonEmptyResultError(err)) return [];
      throw err;
    }
  }
  async createCareerRole(data: InsertCareerRole): Promise<CareerRoleRow> {
    const r = await db.insert(careerRolesTable).values(data).returning();
    return r[0];
  }
  async updateCareerRole(id: number, data: UpdateCareerRole): Promise<CareerRoleRow | undefined> {
    const r = await db.update(careerRolesTable).set({ ...data, updatedAt: new Date() }).where(eq(careerRolesTable.id, id)).returning();
    return r[0];
  }
  async deleteCareerRole(id: number): Promise<boolean> {
    const r = await db.delete(careerRolesTable).where(eq(careerRolesTable.id, id)).returning();
    return r.length > 0;
  }
  async reorderCareerRoles(orders: { id: number; sortOrder: number }[]): Promise<void> {
    if (orders.length === 0) return;
    const { ids, joined } = reorderCaseUpdate(careerRolesTable, orders);
    await db.update(careerRolesTable).set({
      sortOrder: sql<number>`CASE ${joined} END`,
      updatedAt: new Date(),
    }).where(inArray(careerRolesTable.id, ids));
  }

  // Flagship Wins
  async getAllFlagshipWins(): Promise<FlagshipWinRow[]> {
    try {
      return await db.select().from(flagshipWinsTable).orderBy(asc(flagshipWinsTable.sortOrder), asc(flagshipWinsTable.id));
    } catch (err) {
      if (isNeonEmptyResultError(err)) return [];
      throw err;
    }
  }
  async createFlagshipWin(data: InsertFlagshipWin): Promise<FlagshipWinRow> {
    const r = await db.insert(flagshipWinsTable).values(data).returning();
    return r[0];
  }
  async updateFlagshipWin(id: number, data: UpdateFlagshipWin): Promise<FlagshipWinRow | undefined> {
    const r = await db.update(flagshipWinsTable).set({ ...data, updatedAt: new Date() }).where(eq(flagshipWinsTable.id, id)).returning();
    return r[0];
  }
  async deleteFlagshipWin(id: number): Promise<boolean> {
    const r = await db.delete(flagshipWinsTable).where(eq(flagshipWinsTable.id, id)).returning();
    return r.length > 0;
  }
  async reorderFlagshipWins(orders: { id: number; sortOrder: number }[]): Promise<void> {
    if (orders.length === 0) return;
    const { ids, joined } = reorderCaseUpdate(flagshipWinsTable, orders);
    await db.update(flagshipWinsTable).set({
      sortOrder: sql<number>`CASE ${joined} END`,
      updatedAt: new Date(),
    }).where(inArray(flagshipWinsTable.id, ids));
  }

  // Site Skills
  async getAllSiteSkills(): Promise<SiteSkillRow[]> {
    try {
      return await db.select().from(siteSkillsTable).orderBy(asc(siteSkillsTable.category), asc(siteSkillsTable.sortOrder), asc(siteSkillsTable.id));
    } catch (err) {
      if (isNeonEmptyResultError(err)) return [];
      throw err;
    }
  }
  async createSiteSkill(data: InsertSiteSkill): Promise<SiteSkillRow> {
    const r = await db.insert(siteSkillsTable).values(data).returning();
    return r[0];
  }
  async updateSiteSkill(id: number, data: UpdateSiteSkill): Promise<SiteSkillRow | undefined> {
    const r = await db.update(siteSkillsTable).set({ ...data, updatedAt: new Date() }).where(eq(siteSkillsTable.id, id)).returning();
    return r[0];
  }
  async deleteSiteSkill(id: number): Promise<boolean> {
    const r = await db.delete(siteSkillsTable).where(eq(siteSkillsTable.id, id)).returning();
    return r.length > 0;
  }
  async reorderSiteSkills(orders: { id: number; sortOrder: number }[]): Promise<void> {
    if (orders.length === 0) return;
    const { ids, joined } = reorderCaseUpdate(siteSkillsTable, orders);
    await db.update(siteSkillsTable).set({
      sortOrder: sql<number>`CASE ${joined} END`,
      updatedAt: new Date(),
    }).where(inArray(siteSkillsTable.id, ids));
  }

  // Site Certifications
  async getAllSiteCertifications(): Promise<SiteCertificationRow[]> {
    try {
      return await db.select().from(siteCertificationsTable).orderBy(asc(siteCertificationsTable.sortOrder), asc(siteCertificationsTable.id));
    } catch (err) {
      if (isNeonEmptyResultError(err)) return [];
      throw err;
    }
  }
  async createSiteCertification(data: InsertSiteCertification): Promise<SiteCertificationRow> {
    const r = await db.insert(siteCertificationsTable).values(data).returning();
    return r[0];
  }
  async updateSiteCertification(id: number, data: UpdateSiteCertification): Promise<SiteCertificationRow | undefined> {
    const r = await db.update(siteCertificationsTable).set({ ...data, updatedAt: new Date() }).where(eq(siteCertificationsTable.id, id)).returning();
    return r[0];
  }
  async deleteSiteCertification(id: number): Promise<boolean> {
    const r = await db.delete(siteCertificationsTable).where(eq(siteCertificationsTable.id, id)).returning();
    return r.length > 0;
  }
  async reorderSiteCertifications(orders: { id: number; sortOrder: number }[]): Promise<void> {
    if (orders.length === 0) return;
    const { ids, joined } = reorderCaseUpdate(siteCertificationsTable, orders);
    await db.update(siteCertificationsTable).set({
      sortOrder: sql<number>`CASE ${joined} END`,
      updatedAt: new Date(),
    }).where(inArray(siteCertificationsTable.id, ids));
  }

  // Site Education
  async getAllSiteEducation(): Promise<SiteEducationRow[]> {
    try {
      return await db.select().from(siteEducationTable).orderBy(asc(siteEducationTable.sortOrder), asc(siteEducationTable.id));
    } catch (err) {
      if (isNeonEmptyResultError(err)) return [];
      throw err;
    }
  }
  async createSiteEducation(data: InsertSiteEducation): Promise<SiteEducationRow> {
    const r = await db.insert(siteEducationTable).values(data).returning();
    return r[0];
  }
  async updateSiteEducation(id: number, data: UpdateSiteEducation): Promise<SiteEducationRow | undefined> {
    const r = await db.update(siteEducationTable).set({ ...data, updatedAt: new Date() }).where(eq(siteEducationTable.id, id)).returning();
    return r[0];
  }
  async deleteSiteEducation(id: number): Promise<boolean> {
    const r = await db.delete(siteEducationTable).where(eq(siteEducationTable.id, id)).returning();
    return r.length > 0;
  }
  async reorderSiteEducation(orders: { id: number; sortOrder: number }[]): Promise<void> {
    if (orders.length === 0) return;
    const { ids, joined } = reorderCaseUpdate(siteEducationTable, orders);
    await db.update(siteEducationTable).set({
      sortOrder: sql<number>`CASE ${joined} END`,
      updatedAt: new Date(),
    }).where(inArray(siteEducationTable.id, ids));
  }

  // Site Settings
  async getAllSiteSettings(): Promise<SiteSettingRow[]> {
    try {
      return await db.select().from(siteSettingsTable);
    } catch (err) {
      if (isNeonEmptyResultError(err)) return [];
      throw err;
    }
  }
  async upsertSiteSettings(entries: UpsertSiteSetting[]): Promise<void> {
    if (entries.length === 0) return;
    for (const entry of entries) {
      await db.insert(siteSettingsTable)
        .values({ key: entry.key, value: entry.value })
        .onConflictDoUpdate({
          target: siteSettingsTable.key,
          set: { value: entry.value, updatedAt: new Date() },
        });
    }
  }

  // Chat Sessions
  async saveChatSession(data: InsertChatSession): Promise<ChatSessionRow> {
    const [row] = await db.insert(chatSessionsTable).values(data).returning();
    return row;
  }
  async listChatSessions(): Promise<ChatSessionRow[]> {
    try {
      return await db.select().from(chatSessionsTable).orderBy(desc(chatSessionsTable.startedAt));
    } catch (err) {
      if (isNeonEmptyResultError(err)) return [];
      throw err;
    }
  }
  async deleteChatSession(id: number): Promise<void> {
    await db.delete(chatSessionsTable).where(eq(chatSessionsTable.id, id));
  }

  // Seed defaults if tables empty
  async seedSiteContentIfEmpty(): Promise<void> {
    const isEmpty = async (q: Promise<unknown[]>): Promise<boolean> => {
      try {
        const rows = await q;
        return rows.length === 0;
      } catch (err) {
        if (isNeonEmptyResultError(err)) return true;
        throw err;
      }
    };

    try {
      if (await isEmpty(db.select({ id: careerRolesTable.id }).from(careerRolesTable).limit(1))) {
        const seedRoles: InsertCareerRole[] = timelineProjects.map((p, idx) => ({
          role: p.role,
          company: p.company,
          location: p.location,
          period: p.period,
          startDate: p.startDate || null,
          endDate: p.endDate,
          current: p.current,
          industry: p.industry || null,
          projectType: p.projectType || null,
          description: p.description || null,
          keyAchievements: p.keyAchievements,
          budget: p.budget || null,
          teamSize: p.teamSize ?? null,
          technologies: p.technologies || null,
          employmentType: p.employmentType,
          logoUrl: null,
          sortOrder: idx,
        }));
        for (const role of seedRoles) {
          await db.insert(careerRolesTable).values(role);
        }
      }
    } catch (err) {
      if (!isNeonEmptyResultError(err)) console.error('Seed career_roles failed:', err);
    }

    try {
      if (await isEmpty(db.select({ id: flagshipWinsTable.id }).from(flagshipWinsTable).limit(1))) {
        const wins: InsertFlagshipWin[] = [
          {
            title: 'Built PMO from Ground Up',
            company: 'Novocycle Technology',
            period: '2024',
            metrics: ['36% efficiency gain', '15+ team members', 'EU-funded programmes'],
            icon: 'Target',
            colorGradient: 'from-blue-500 to-cyan-500',
            sortOrder: 0,
          },
          {
            title: '34% Project Efficiency Improvement',
            company: 'JLT Specialty (Marsh & McLennan)',
            period: '2018',
            metrics: ['34% efficiency gain', 'Insurance sector', 'Process optimization'],
            icon: 'ShieldCheck',
            colorGradient: 'from-orange-500 to-red-500',
            sortOrder: 1,
          },
          {
            title: '35% Energy Reduction for UN SDGs',
            company: 'GSMA',
            period: '2019-2020',
            metrics: ['35% energy reduction', '8 tech onboardings', 'UN SDG alignment'],
            icon: 'Leaf',
            colorGradient: 'from-green-500 to-emerald-500',
            sortOrder: 2,
          },
        ];
        for (const w of wins) await db.insert(flagshipWinsTable).values(w);
      }
    } catch (err) {
      if (!isNeonEmptyResultError(err)) console.error('Seed flagship_wins failed:', err);
    }

    try {
      if (await isEmpty(db.select({ id: siteSkillsTable.id }).from(siteSkillsTable).limit(1))) {
        const seed: InsertSiteSkill[] = [];
        const methodologies = [
          'Agile (Scrum/Kanban)', 'Waterfall', 'Lean', 'SAFe', 'Prince2',
          'Change Management', 'Rapid Application Development (RAD)', 'Software Development Life Cycle (SDLC)',
        ];
        const tools = ['Jira', 'Confluence', 'MS Project', 'PowerBI', 'Tableau', 'Azure DevOps', 'Smartsheet'];
        const certs: { name: string; status: string }[] = [
          { name: 'Prince2 Agile', status: 'certified' },
          { name: 'Scrum Master', status: 'certified' },
          { name: 'PMP', status: 'pursuing' },
          { name: 'CompTIA Security+', status: 'pursuing' },
        ];
        const industries = [
          'Insurance & Financial Services', 'Telecommunications', 'Healthcare & Life Sciences',
          'Engineering & Technology', 'Public Sector', 'Events & Hospitality', 'Energy & Sustainability',
        ];
        methodologies.forEach((n, i) => seed.push({ category: 'methodology', name: n, status: null, sortOrder: i }));
        tools.forEach((n, i) => seed.push({ category: 'tool', name: n, status: null, sortOrder: i }));
        certs.forEach((c, i) => seed.push({ category: 'certification', name: c.name, status: c.status, sortOrder: i }));
        industries.forEach((n, i) => seed.push({ category: 'industry', name: n, status: null, sortOrder: i }));
        for (const s of seed) await db.insert(siteSkillsTable).values(s);
      }
    } catch (err) {
      if (!isNeonEmptyResultError(err)) console.error('Seed site_skills failed:', err);
    }

    try {
      if (await isEmpty(db.select({ id: siteCertificationsTable.id }).from(siteCertificationsTable).limit(1))) {
        const seed: InsertSiteCertification[] = detailedCertifications.map((c, idx) => ({
          name: c.name,
          issuer: c.issuer,
          dateObtained: c.dateObtained,
          validUntil: c.validUntil || null,
          credentialId: c.credentialId || null,
          verificationUrl: c.verificationUrl || null,
          badgeImage: c.logo || null,
          description: c.description,
          skills: c.skills,
          sortOrder: idx,
        }));
        for (const s of seed) await db.insert(siteCertificationsTable).values(s);
      }
    } catch (err) {
      if (!isNeonEmptyResultError(err)) console.error('Seed site_certifications failed:', err);
    }

    try {
      if (await isEmpty(db.select({ id: siteEducationTable.id }).from(siteEducationTable).limit(1))) {
        const seed: InsertSiteEducation[] = educationDefaults.map((e, idx) => ({
          degree: e.degree,
          institution: e.institution,
          location: e.location || null,
          period: e.period,
          fieldOfStudy: e.fieldOfStudy || null,
          achievements: e.achievements || null,
          sortOrder: idx,
        }));
        for (const s of seed) await db.insert(siteEducationTable).values(s);
      }
    } catch (err) {
      if (!isNeonEmptyResultError(err)) console.error('Seed site_education failed:', err);
    }

    try {
      if (await isEmpty(db.select({ key: siteSettingsTable.key }).from(siteSettingsTable).limit(1))) {
        const defaults: UpsertSiteSetting[] = [
          { key: 'hero.status_badge', value: 'Open to new opportunities' },
          { key: 'hero.headline_main', value: 'Senior Project Manager' },
          { key: 'hero.headline_sub1', value: 'Senior Program Manager' },
          { key: 'hero.headline_sub2', value: 'PMO Lead' },
          { key: 'hero.headline_accent', value: '£50M+ Delivery | 17+ Years' },
          { key: 'flagship.heading', value: 'Three Flagship Achievements' },
          { key: 'flagship.subheading', value: 'Tangible business impact across regulated delivery, PMO leadership, and sustainability initiatives' },
          { key: 'skills.heading', value: 'Skills & Certifications' },
          { key: 'skills.subheading', value: 'Proven methodologies, tools, and credentials for enterprise-level programme delivery' },
          { key: 'career.heading', value: '17-Year Career Journey' },
          { key: 'career.subheading', value: '12 companies • 7 industries • £50M+ delivered across regulated and complex programmes' },
          { key: 'contact.heading', value: "Let's Work Together" },
          { key: 'contact.tagline', value: "Looking for an experienced project manager to deliver your next critical programme? Let's discuss how I can help drive your success." },
          { key: 'contact.email', value: 'odmlawal@gmail.com' },
          { key: 'contact.phone_uk', value: '+44 (0) 7908226038' },
          { key: 'contact.phone_uae', value: '+971 (0) 509082234' },
          { key: 'contact.whatsapp', value: '971509082234' },
          { key: 'contact.linkedin_url', value: 'https://www.linkedin.com/in/mujeeb-lawal-experienced-project-manager/' },
          { key: 'footer.copyright', value: '© 2025 Mujeeb Lawal. All rights reserved.' },
        ];
        await this.upsertSiteSettings(defaults);
      }
    } catch (err) {
      if (!isNeonEmptyResultError(err)) console.error('Seed site_settings failed:', err);
    }
  }
}

export const storage = new DatabaseStorage();

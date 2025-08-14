import { users, validations, submissions, adminSessions, linkClicks, type User, type InsertUser, type Validation, type InsertValidation, type Submission, type InsertSubmission, type AdminSession, type InsertAdminSession, type LinkClick, type InsertLinkClick } from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  createValidation(insertValidation: InsertValidation, feedback: string, userId?: string): Promise<Validation>;
  getUserValidations(userId: string): Promise<Validation[]>;
  createSubmission(insertSubmission: InsertSubmission, userId?: string): Promise<Submission>;
  getUserSubmissions(userId: string): Promise<Submission[]>;
  getAllSubmissions(): Promise<Submission[]>;
  createAdminSession(insertSession: InsertAdminSession): Promise<AdminSession>;
  getAdminSession(id: string): Promise<AdminSession | undefined>;
  deleteExpiredAdminSessions(): Promise<void>;
  trackLinkClick(company: string, linkType: string, url: string): Promise<void>;
  getLinkClickStats(): Promise<LinkClick[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.googleId, googleId));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createValidation(insertValidation: InsertValidation, feedback: string, userId?: string): Promise<Validation> {
    const [validation] = await db
      .insert(validations)
      .values({ ...insertValidation, feedback, userId })
      .returning();
    return validation;
  }

  async getUserValidations(userId: string): Promise<Validation[]> {
    return await db.select().from(validations).where(eq(validations.userId, userId)).orderBy(desc(validations.createdAt));
  }

  async createSubmission(insertSubmission: InsertSubmission, userId?: string): Promise<Submission> {
    const [submission] = await db
      .insert(submissions)
      .values({ ...insertSubmission, userId })
      .returning();
    return submission;
  }

  async getUserSubmissions(userId: string): Promise<Submission[]> {
    return await db.select().from(submissions).where(eq(submissions.userId, userId)).orderBy(desc(submissions.createdAt));
  }

  async getAllSubmissions(): Promise<Submission[]> {
    return await db.select().from(submissions).orderBy(desc(submissions.createdAt));
  }

  async createAdminSession(insertSession: InsertAdminSession): Promise<AdminSession> {
    const [session] = await db
      .insert(adminSessions)
      .values(insertSession)
      .returning();
    return session;
  }

  async getAdminSession(id: string): Promise<AdminSession | undefined> {
    const [session] = await db.select().from(adminSessions).where(eq(adminSessions.id, id));
    return session || undefined;
  }

  async deleteExpiredAdminSessions(): Promise<void> {
    const now = new Date();
    await db.delete(adminSessions).where(eq(adminSessions.expiresAt, now));
  }

  async trackLinkClick(company: string, linkType: string, url: string): Promise<void> {
    // Try to find existing record
    const [existing] = await db
      .select()
      .from(linkClicks)
      .where(and(
        eq(linkClicks.company, company),
        eq(linkClicks.linkType, linkType)
      ));

    if (existing) {
      // Update existing record
      await db
        .update(linkClicks)
        .set({ 
          clickCount: sql`${linkClicks.clickCount} + 1`,
          lastClicked: new Date()
        })
        .where(eq(linkClicks.id, existing.id));
    } else {
      // Create new record
      await db
        .insert(linkClicks)
        .values({
          company,
          linkType,
          url,
          clickCount: 1,
          lastClicked: new Date()
        });
    }
  }

  async getLinkClickStats(): Promise<LinkClick[]> {
    return await db.select().from(linkClicks).orderBy(linkClicks.company, linkClicks.linkType);
  }
}

export const storage = new DatabaseStorage();
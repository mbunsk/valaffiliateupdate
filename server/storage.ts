import { type User, type InsertUser, type Submission, type InsertSubmission, type Validation, type InsertValidation } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  getAllSubmissions(): Promise<Submission[]>;
  createValidation(validation: InsertValidation, feedback: string): Promise<Validation>;
  getValidationsByIdea(idea: string): Promise<Validation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private submissions: Map<string, Submission>;
  private validations: Map<string, Validation>;

  constructor() {
    this.users = new Map();
    this.submissions = new Map();
    this.validations = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createSubmission(insertSubmission: InsertSubmission): Promise<Submission> {
    const id = randomUUID();
    const submission: Submission = {
      ...insertSubmission,
      id,
      createdAt: new Date(),
      screenshotPath: insertSubmission.screenshotPath || null,
    };
    this.submissions.set(id, submission);
    return submission;
  }

  async getAllSubmissions(): Promise<Submission[]> {
    return Array.from(this.submissions.values());
  }

  async createValidation(insertValidation: InsertValidation, feedback: string): Promise<Validation> {
    const id = randomUUID();
    const validation: Validation = {
      ...insertValidation,
      id,
      feedback,
      createdAt: new Date(),
    };
    this.validations.set(id, validation);
    return validation;
  }

  async getValidationsByIdea(idea: string): Promise<Validation[]> {
    return Array.from(this.validations.values()).filter(
      (validation) => validation.idea.toLowerCase().includes(idea.toLowerCase())
    );
  }

  private generateValidationFeedback(idea: string): string {
    // Simple feedback generation based on keywords
    const feedback = {
      marketFit: "The market shows strong potential with growing demand in this sector.",
      strengths: "Clear value proposition, addresses real user pain points, scalable concept.",
      nextSteps: [
        "Research existing competitors and identify differentiation opportunities",
        "Create a minimal viable product (MVP) focusing on core features",
        "Test with 10-20 potential users for initial feedback",
        "Develop a go-to-market strategy for your target audience"
      ],
      concerns: "Consider user acquisition costs, competition level, and technical complexity.",
      tip: "Start with a specific niche to validate your concept before expanding to broader markets."
    };

    return JSON.stringify(feedback);
  }
}

export const storage = new MemStorage();

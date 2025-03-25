import { users, testimonies, donations, savedContents } from "@shared/schema";
import type { User, InsertUser, Testimony, InsertTestimony, Donation, InsertDonation, SavedContent, InsertSavedContent } from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";

// Create a memory store for session storage
const MemoryStore = createMemoryStore(session);
// Define the type for the session store instance
// Use the actual type from the express-session or a more generic type
type MemoryStoreInstance = ReturnType<typeof createMemoryStore>;

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Testimony methods
  getTestimonies(limit?: number): Promise<Testimony[]>;
  getTestimonyById(id: number): Promise<Testimony | undefined>;
  getTestimoniesByUserId(userId: number): Promise<Testimony[]>;
  createTestimony(testimony: InsertTestimony): Promise<Testimony>;
  
  // Donation methods
  getDonationsByUserId(userId: number): Promise<Donation[]>;
  createDonation(donation: InsertDonation): Promise<Donation>;
  
  // Saved content methods
  getSavedContentsByUserId(userId: number): Promise<SavedContent[]>;
  createSavedContent(content: InsertSavedContent): Promise<SavedContent>;
  deleteSavedContent(id: number): Promise<boolean>;

  // Session store
  sessionStore: MemoryStoreInstance;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private testimonies: Map<number, Testimony>;
  private donations: Map<number, Donation>;
  private savedContents: Map<number, SavedContent>;
  sessionStore: MemoryStoreInstance;
  userCurrentId: number;
  testimonyCurrentId: number;
  donationCurrentId: number;
  savedContentCurrentId: number;

  constructor() {
    this.users = new Map();
    this.testimonies = new Map();
    this.donations = new Map();
    this.savedContents = new Map();
    this.userCurrentId = 1;
    this.testimonyCurrentId = 1;
    this.donationCurrentId = 1;
    this.savedContentCurrentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const createdAt = new Date();
    // Ensure profilePicture is properly handled (null instead of undefined)
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt,
      profilePicture: insertUser.profilePicture || null 
    };
    this.users.set(id, user);
    return user;
  }

  // Testimony methods
  async getTestimonies(limit = 10): Promise<Testimony[]> {
    const testimoniesList = Array.from(this.testimonies.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return limit ? testimoniesList.slice(0, limit) : testimoniesList;
  }

  async getTestimonyById(id: number): Promise<Testimony | undefined> {
    return this.testimonies.get(id);
  }

  async getTestimoniesByUserId(userId: number): Promise<Testimony[]> {
    return Array.from(this.testimonies.values())
      .filter(testimony => testimony.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createTestimony(insertTestimony: InsertTestimony): Promise<Testimony> {
    const id = this.testimonyCurrentId++;
    const createdAt = new Date();
    const testimony: Testimony = { 
      ...insertTestimony, 
      id, 
      createdAt,
      userId: insertTestimony.userId || null,
      isAnonymous: insertTestimony.isAnonymous || null,
      imageUrl: insertTestimony.imageUrl || null
    };
    this.testimonies.set(id, testimony);
    return testimony;
  }

  // Donation methods
  async getDonationsByUserId(userId: number): Promise<Donation[]> {
    return Array.from(this.donations.values())
      .filter(donation => donation.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const id = this.donationCurrentId++;
    const createdAt = new Date();
    const donation: Donation = { 
      ...insertDonation, 
      id, 
      createdAt,
      userId: insertDonation.userId || null,
      transactionId: insertDonation.transactionId || null
    };
    this.donations.set(id, donation);
    return donation;
  }

  // Saved content methods
  async getSavedContentsByUserId(userId: number): Promise<SavedContent[]> {
    return Array.from(this.savedContents.values())
      .filter(content => content.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createSavedContent(insertContent: InsertSavedContent): Promise<SavedContent> {
    const id = this.savedContentCurrentId++;
    const createdAt = new Date();
    const content: SavedContent = { 
      ...insertContent, 
      id, 
      createdAt,
      userId: insertContent.userId || null,
      thumbnail: insertContent.thumbnail || null
    };
    this.savedContents.set(id, content);
    return content;
  }

  async deleteSavedContent(id: number): Promise<boolean> {
    return this.savedContents.delete(id);
  }
}

export const storage = new MemStorage();

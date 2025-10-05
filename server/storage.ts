// Storage interface for portfolio website
// Currently not used as all content is static
export interface IStorage {
  // Add storage methods here if needed in the future
}

export class MemStorage implements IStorage {
  constructor() {
    // In-memory storage for potential future features
  }
}

export const storage = new MemStorage();

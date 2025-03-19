
// Simulating a database service for now
// In a real application, this would connect to a backend database

interface User {
  id: string;
  email: string;
  password: string; // In a real app, this would be hashed
  fullName: string;
  address: string;
  role: 'startup' | 'official' | 'regulator';
  createdAt: Date;
}

interface Application {
  id: string;
  userId: string;
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected';
  type: 'ayurveda' | 'yoga' | 'unani' | 'siddha' | 'homeopathy';
  companyName: string;
  documents: string[];
  createdAt: Date;
  updatedAt: Date;
  // Additional fields that can be stored from the form
  registrationNumber?: string;
  foundingDate?: string;
  address?: string;
  website?: string;
  description?: string;
  founderName?: string;
  founderEmail?: string;
  founderPhone?: string;
}

// This is a mock database - in a real app, you'd use a proper database
class MockDatabase {
  private users: User[] = [];
  private applications: Application[] = [];

  // User methods
  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`,
      createdAt: new Date()
    };
    
    this.users.push(newUser);
    
    // Store in localStorage for persistence between refreshes
    localStorage.setItem('ayush_users', JSON.stringify(this.users));
    
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  // Application methods
  async createApplication(applicationData: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>): Promise<Application> {
    const newApplication: Application = {
      ...applicationData,
      id: `app_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.applications.push(newApplication);
    
    // Store in localStorage for persistence between refreshes
    localStorage.setItem('ayush_applications', JSON.stringify(this.applications));
    
    return newApplication;
  }

  async getApplicationsByUserId(userId: string): Promise<Application[]> {
    return this.applications.filter(app => app.userId === userId);
  }

  async getApplicationById(id: string): Promise<Application | undefined> {
    return this.applications.find(app => app.id === id);
  }

  async updateApplication(id: string, updates: Partial<Omit<Application, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Application | undefined> {
    const index = this.applications.findIndex(app => app.id === id);
    
    if (index === -1) return undefined;
    
    const updatedApplication = {
      ...this.applications[index],
      ...updates,
      updatedAt: new Date()
    };
    
    this.applications[index] = updatedApplication;
    
    // Update localStorage
    localStorage.setItem('ayush_applications', JSON.stringify(this.applications));
    
    return updatedApplication;
  }

  async deleteApplication(id: string): Promise<boolean> {
    const index = this.applications.findIndex(app => app.id === id);
    
    if (index === -1) return false;
    
    this.applications.splice(index, 1);
    
    // Update localStorage
    localStorage.setItem('ayush_applications', JSON.stringify(this.applications));
    
    return true;
  }

  // Load data from localStorage on initialization
  constructor() {
    const storedUsers = localStorage.getItem('ayush_users');
    const storedApplications = localStorage.getItem('ayush_applications');
    
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
    
    if (storedApplications) {
      this.applications = JSON.parse(storedApplications);
    }
  }
}

// Export a singleton instance
export const db = new MockDatabase();

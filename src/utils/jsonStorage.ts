
/**
 * Utility functions for managing JSON data storage for the portfolio
 */

import { toast } from "sonner";

// Types for our data models
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  year: number;
  client: string;
  description?: string;
  featured?: boolean;
}

// Mock database using localStorage
class JsonStorage {
  private getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error retrieving ${key} from storage:`, error);
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
      toast.error(`Failed to save data`);
    }
  }

  // Contact Messages
  getMessages(): ContactMessage[] {
    return this.getItem<ContactMessage[]>('contact_messages', []);
  }

  saveMessage(message: Omit<ContactMessage, 'id' | 'date' | 'read'>): void {
    const messages = this.getMessages();
    const newMessage: ContactMessage = {
      ...message,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      read: false
    };
    
    this.setItem('contact_messages', [newMessage, ...messages]);
  }

  updateMessage(id: string, updates: Partial<ContactMessage>): void {
    const messages = this.getMessages();
    const updatedMessages = messages.map(message => 
      message.id === id ? { ...message, ...updates } : message
    );
    
    this.setItem('contact_messages', updatedMessages);
  }

  deleteMessage(id: string): void {
    const messages = this.getMessages();
    const filteredMessages = messages.filter(message => message.id !== id);
    
    this.setItem('contact_messages', filteredMessages);
  }

  // Portfolio Items
  getPortfolioItems(): PortfolioItem[] {
    return this.getItem<PortfolioItem[]>('portfolio_items', [
      {
        id: 1,
        title: "Lagos Nights",
        category: "Short Films",
        thumbnail: "https://images.unsplash.com/photo-1543536448-1e76fc2795bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        year: 2023,
        client: "Independent Production"
      },
      {
        id: 2,
        title: "Rhythms of Yoruba",
        category: "Documentaries",
        thumbnail: "https://images.unsplash.com/photo-1568168172820-83c587783f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        year: 2022,
        client: "Cultural Heritage Foundation"
      },
      {
        id: 3,
        title: "Harmony",
        category: "Music Videos",
        thumbnail: "https://images.unsplash.com/photo-1559762705-2123aa9b467f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        year: 2023,
        client: "AfroBeats Records",
        featured: true
      },
      {
        id: 4,
        title: "Urban Echoes",
        category: "Commercials",
        thumbnail: "https://images.unsplash.com/photo-1518130772768-f31b4902c12b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        year: 2021,
        client: "Lagos Tourism Board",
        featured: true
      },
      {
        id: 5,
        title: "The Last Fisherman",
        category: "Feature Films",
        thumbnail: "https://images.unsplash.com/photo-1493804714600-6edb1cd93080?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        year: 2022,
        client: "Nollywood Productions"
      },
      {
        id: 6,
        title: "Market Day",
        category: "Documentaries",
        thumbnail: "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        year: 2023,
        client: "African Cultures Institute"
      },
      {
        id: 7,
        title: "Whispers",
        category: "Short Films",
        thumbnail: "https://images.unsplash.com/photo-1482859454941-1929825988b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        year: 2021,
        client: "Film Festival Entry",
        featured: true
      },
      {
        id: 8,
        title: "Beyond Tomorrow",
        category: "Commercials",
        thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        year: 2023,
        client: "Tech Innovations Inc.",
        featured: true
      }
    ]);
  }

  savePortfolioItem(item: Omit<PortfolioItem, 'id'>): void {
    const items = this.getPortfolioItems();
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    
    const newItem: PortfolioItem = {
      ...item,
      id: newId
    };
    
    this.setItem('portfolio_items', [...items, newItem]);
  }

  updatePortfolioItem(id: number, updates: Partial<PortfolioItem>): void {
    const items = this.getPortfolioItems();
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    
    this.setItem('portfolio_items', updatedItems);
  }

  deletePortfolioItem(id: number): void {
    const items = this.getPortfolioItems();
    const filteredItems = items.filter(item => item.id !== id);
    
    this.setItem('portfolio_items', filteredItems);
  }

  // Categories
  getCategories(): string[] {
    const defaultCategories = ["Feature Films", "Documentaries", "Music Videos", "Commercials", "Short Films"];
    return this.getItem<string[]>('categories', defaultCategories);
  }

  saveCategory(category: string): void {
    const categories = this.getCategories();
    if (!categories.includes(category)) {
      this.setItem('categories', [...categories, category]);
    }
  }

  deleteCategory(category: string): void {
    const categories = this.getCategories();
    const filteredCategories = categories.filter(c => c !== category);
    
    this.setItem('categories', filteredCategories);
  }
}

export const jsonStorage = new JsonStorage();

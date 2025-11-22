export interface SeoData {
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
}

export interface PostDraft {
  id: string;
  title: string;
  slug: string;
  content: string;
  seo: SeoData;
  createdAt: string;
  scheduledFor?: string | null;
  status: 'draft' | 'scheduled' | 'published';
  author?: string;
}

export interface ItineraryItem {
  id: string;
  title: string;
  date?: string;
  location?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'viewer' | 'editor' | 'admin';
  twoFAEnabled?: boolean;
}

export interface MonetizationSlot {
  id: string;
  type: 'affiliate' | 'ad';
  name: string;
  url?: string;
  revenue?: number;
}

// components/actor-page/types.ts

export type Tier = 'free' | 'standard' | 'premium';

export type TemplateId =
  | 'mini-portfolio'       // Free default
  | 'standard-showcase'    // Standard
  | 'premium-cinematic';   // Premium

export type SocialPlatform = 'instagram' | 'youtube' | 'tiktok' | 'imdb' | 'email' | 'website';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface RepInfo {
  label: string;       // "Talent Agent", "Manager"
  company: string;
  contactName?: string;
  email?: string;
  phone?: string;
}

export interface HeroConfig {
  name: string;
  headshotUrl: string;
  ageRange?: string;
  location?: string;
  brandLine?: string;          // "Single-Cam Comedy • Teen Drama"
  castingType?: string;        // "Funny, sharp, a little oddball"
  unionStatus?: string;        // "SAG-AFTRA Eligible"
  recentCredits?: string[];    // e.g. ["Hulu – Family Binds", "NBC – Found"]
  socialLinks: SocialLink[];
  reps?: RepInfo[];
}

export interface ImageItem {
  id: string;
  url: string;
  alt?: string;
}

export interface HeadshotGallery {
  id: string;
  label: string;        // "Commercial", "Theatrical"
  images: ImageItem[];
}

export type ResumeMode = 'external_link' | 'pdf_embed' | 'structured';

export interface ResumeConfig {
  mode: ResumeMode;
  externalUrl?: string;       // Free
  pdfUrl?: string;            // Standard/above
  // Premium structured resume view:
  filmTvCredits?: string[];
  theatreCredits?: string[];
  training?: string[];
  skills?: string[];
}

export interface ReelItem {
  id: string;
  title: string;
  vimeoUrl: string;
  projectLabel?: string; // "Hulu", "Short Film", etc.
}

export interface Album {
  id: string;
  label: string;        // "Film", "TV", "On Set"
  images: ImageItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  year?: string;
  medium: 'film' | 'tv' | 'theatre' | 'commercial' | 'other';
  platformOrCompany?: string;
  posterUrl?: string;
  description?: string;
}

export interface ContactConfig {
  parentEmail: string;
  showReps: boolean;
}

export interface ActorPageConfig {
  tier: Tier;
  templateId: TemplateId;
  hero: HeroConfig;
  headshots: {
    galleries: HeadshotGallery[];
  };
  reels: {
    items: ReelItem[];
  };
  bts: {
    albums: Album[];
  };
  projects: {
    items: ProjectItem[];
  };
  resume: ResumeConfig;
  contact: ContactConfig;
}

// components/actor-page/types.ts

export type Tier = 'free' | 'standard' | 'premium';

export type TemplateId =
  | 'mini-portfolio'       // Free default
  | 'standard-showcase'    // Standard
  | 'premium-cinematic';   // Premium

export type SocialPlatform = 'instagram' | 'youtube' | 'tiktok' | 'imdb' | 'email' | 'website' | 'other';

export type FontPreset = 'classic' | 'rounded' | 'serif' | 'condensed';

export type ThemeId =
  | 'hollywood_night'
  | 'soft_lilac'
  | 'warm_slate'
  | 'teal_stage';

export type IconStyle = 'hex' | 'circle' | 'rounded_square';

export type ExtraElement =
  | 'press_section'
  | 'project_gallery'
  | 'bts_albums'
  | 'custom_cta';

export interface ThemeConfig {
  themeId: ThemeId;
  headingFont: FontPreset;
  bodyFont: FontPreset;
  iconStyle: IconStyle;
  accentColorHex?: string;      // optional "advanced" override
  extrasEnabled: ExtraElement[]; // what "extra" blocks are on
}

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label?: string;        // for "other"
  iconName?: string;     // 'link', 'star', 'camera', 'clapperboard', etc.
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
  theme?: ThemeConfig;     // Optional for backward compatibility
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

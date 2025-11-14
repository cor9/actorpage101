// types/db.ts

export type SubscriptionTier = 'free' | 'standard' | 'premium';

export type FeatureFlags = {
  audition_tracker: boolean;
  resume101: boolean;
};

export interface Profile {
  id: string;
  role: 'user' | 'admin';
  subscription_tier: SubscriptionTier;
  feature_flags: FeatureFlags;
  display_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface Site {
  id: string;
  user_id: string;
  site_slug: string;
  custom_domain: string | null;
  template_id: string;
  color_preset: string;
  typography_preset: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Bio {
  user_id: string;
  headline: string | null;
  bio_text: string | null;
  location: string | null;
  age_range: string | null;
  union_status: string | null;
  fun_facts: string[] | null;
  updated_at: string;
}

export interface Photo {
  id: string;
  user_id: string;
  file_path: string;
  alt_text: string | null;
  is_primary_headshot: boolean;
  sort_order: number;
  created_at: string;
}

export type VideoType = 'vimeo' | 'embed';

export interface Video {
  id: string;
  user_id: string;
  title: string | null;
  description: string | null;
  video_type: VideoType;
  embed_url: string | null;
  vimeo_id: string | null;
  is_reel: boolean;
  sort_order: number;
  created_at: string;
}

export interface Credit {
  id: string;
  user_id: string;
  category: string;
  project: string;
  role: string | null;
  director: string | null;
  year: number | null;
  notes: string | null;
  sort_order: number;
  created_at: string;
}

// Feature-flagged

export interface Audition {
  id: string;
  user_id: string;
  date: string;
  project: string;
  role: string | null;
  medium: string | null;
  casting_office: string | null;
  rep: string | null;
  outcome: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ResumeData {
  user_id: string;
  raw_json: any;
  imported_at: string;
}

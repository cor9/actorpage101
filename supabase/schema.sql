-- Actor Page 101 Database Schema
-- This file contains the complete database schema for the application

--------------------------------------------------------------------
-- EXTENSIONS
--------------------------------------------------------------------

create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

--------------------------------------------------------------------
-- CORE TABLES
--------------------------------------------------------------------

-- 1) PROFILES
-- App-specific info + feature flags.
-- Subscription tiers: 'free' | 'standard' | 'premium'.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text default 'user',                         -- 'user', 'admin'
  subscription_tier text default 'free',           -- 'free', 'standard', 'premium'
  feature_flags jsonb default '{
    "audition_tracker": false,
    "resume101": false
  }'::jsonb,
  display_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists profiles_subscription_tier_idx
  on public.profiles (subscription_tier);

-- 2) SITES
-- One primary site per user for MVP.

create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  site_slug text not null unique,                 -- "ava-johnson" → avajohnson.actorpage101.site
  custom_domain text,                             -- optional custom domain later
  template_id text not null default 'classic-1',
  color_preset text default 'default',
  typography_preset text default 'default',
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists sites_user_id_idx
  on public.sites (user_id);

-- 3) BIO
-- Primary bio block for a user.

create table if not exists public.bio (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  headline text,
  bio_text text,
  location text,
  age_range text,
  union_status text,
  fun_facts jsonb,
  updated_at timestamptz default now()
);

-- 4) PHOTOS
-- Headshots and gallery images (stored in Supabase storage).

create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  file_path text not null,        -- Supabase storage path
  alt_text text,
  is_primary_headshot boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

create index if not exists photos_user_id_idx
  on public.photos (user_id);

-- 5) VIDEOS
-- Vimeo is part of the base product. Videos can be embedded or Vimeo-hosted.

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text,
  description text,
  video_type text not null default 'vimeo',   -- 'vimeo' or 'embed'
  embed_url text,                             -- used when type = 'embed'
  vimeo_id text,                              -- used when type = 'vimeo'
  is_reel boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

create index if not exists videos_user_id_idx
  on public.videos (user_id);

-- 6) CREDITS
-- For on-site credits (and can be synced with Resume101 later).

create table if not exists public.credits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  category text not null,              -- 'TV', 'FILM', 'COMMERCIAL', 'THEATRE', etc.
  project text not null,
  role text,
  director text,
  year int,
  notes text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create index if not exists credits_user_id_idx
  on public.credits (user_id);

--------------------------------------------------------------------
-- OPTIONAL FEATURE-FLAGGED TABLES (audition_tracker, resume101)
--------------------------------------------------------------------

-- 7) AUDITIONS (feature flag: audition_tracker)

create table if not exists public.auditions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  project text not null,
  role text,
  medium text,                   -- 'TV', 'FILM', 'COMMERCIAL', etc.
  casting_office text,
  rep text,                      -- agent/manager
  outcome text,                  -- 'requested', 'callback', 'pin', 'avail', 'booked', 'passed', 'ghosted'
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists auditions_user_id_idx
  on public.auditions (user_id);

-- 8) RESUME DATA (feature flag: resume101)
-- Stores imported JSON from Resume101.

create table if not exists public.resume_data (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  raw_json jsonb not null,
  imported_at timestamptz default now()
);

--------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
--------------------------------------------------------------------

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.sites enable row level security;
alter table public.bio enable row level security;
alter table public.photos enable row level security;
alter table public.videos enable row level security;
alter table public.credits enable row level security;
alter table public.auditions enable row level security;
alter table public.resume_data enable row level security;

--------------------------------------------------------------------
-- RLS POLICIES: PROFILES
--------------------------------------------------------------------

create policy "Users can view their own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

--------------------------------------------------------------------
-- RLS POLICIES: SITES
--------------------------------------------------------------------

create policy "Users can view their own sites"
  on public.sites
  for select
  using (auth.uid() = user_id);

create policy "Users can create their own sites"
  on public.sites
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own sites"
  on public.sites
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own sites"
  on public.sites
  for delete
  using (auth.uid() = user_id);

-- Public access to published sites
create policy "Anyone can view published sites"
  on public.sites
  for select
  using (is_published = true);

--------------------------------------------------------------------
-- RLS POLICIES: BIO
--------------------------------------------------------------------

create policy "Users can view their own bio"
  on public.bio
  for select
  using (auth.uid() = user_id);

create policy "Users can create their own bio"
  on public.bio
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own bio"
  on public.bio
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own bio"
  on public.bio
  for delete
  using (auth.uid() = user_id);

--------------------------------------------------------------------
-- RLS POLICIES: PHOTOS
--------------------------------------------------------------------

create policy "Users can view their own photos"
  on public.photos
  for select
  using (auth.uid() = user_id);

create policy "Users can create their own photos"
  on public.photos
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own photos"
  on public.photos
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own photos"
  on public.photos
  for delete
  using (auth.uid() = user_id);

--------------------------------------------------------------------
-- RLS POLICIES: VIDEOS
--------------------------------------------------------------------

create policy "Users can view their own videos"
  on public.videos
  for select
  using (auth.uid() = user_id);

create policy "Users can create their own videos"
  on public.videos
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own videos"
  on public.videos
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own videos"
  on public.videos
  for delete
  using (auth.uid() = user_id);

--------------------------------------------------------------------
-- RLS POLICIES: CREDITS
--------------------------------------------------------------------

create policy "Users can view their own credits"
  on public.credits
  for select
  using (auth.uid() = user_id);

create policy "Users can create their own credits"
  on public.credits
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own credits"
  on public.credits
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own credits"
  on public.credits
  for delete
  using (auth.uid() = user_id);

--------------------------------------------------------------------
-- RLS POLICIES: AUDITIONS
--------------------------------------------------------------------

create policy "Users can view their own auditions"
  on public.auditions
  for select
  using (auth.uid() = user_id);

create policy "Users can create their own auditions"
  on public.auditions
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own auditions"
  on public.auditions
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own auditions"
  on public.auditions
  for delete
  using (auth.uid() = user_id);

--------------------------------------------------------------------
-- RLS POLICIES: RESUME_DATA
--------------------------------------------------------------------

create policy "Users can view their own resume data"
  on public.resume_data
  for select
  using (auth.uid() = user_id);

create policy "Users can create their own resume data"
  on public.resume_data
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own resume data"
  on public.resume_data
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own resume data"
  on public.resume_data
  for delete
  using (auth.uid() = user_id);

--------------------------------------------------------------------
-- FUNCTIONS & TRIGGERS
--------------------------------------------------------------------

-- Function to automatically update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply updated_at trigger to relevant tables
create trigger update_profiles_updated_at before update on public.profiles
  for each row execute function update_updated_at_column();

create trigger update_sites_updated_at before update on public.sites
  for each row execute function update_updated_at_column();

create trigger update_bio_updated_at before update on public.bio
  for each row execute function update_updated_at_column();

create trigger update_auditions_updated_at before update on public.auditions
  for each row execute function update_updated_at_column();

--------------------------------------------------------------------
-- STORAGE BUCKETS (for Supabase Storage)
--------------------------------------------------------------------

-- Create storage bucket for actor photos
insert into storage.buckets (id, name, public)
values ('actor-photos', 'actor-photos', true)
on conflict do nothing;

-- Create storage bucket for actor videos (if self-hosted)
insert into storage.buckets (id, name, public)
values ('actor-videos', 'actor-videos', true)
on conflict do nothing;

-- Storage policies for photos
create policy "Users can upload their own photos"
  on storage.objects for insert
  with check (bucket_id = 'actor-photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can update their own photos"
  on storage.objects for update
  using (bucket_id = 'actor-photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can delete their own photos"
  on storage.objects for delete
  using (bucket_id = 'actor-photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Anyone can view photos"
  on storage.objects for select
  using (bucket_id = 'actor-photos');

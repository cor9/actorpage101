-- ============================================================================
-- Actor Page 101 - Database Migrations
-- ============================================================================
--
-- INSTRUCTIONS:
-- 1. Go to Supabase Dashboard → SQL Editor
-- 2. Create a new query
-- 3. Copy this ENTIRE file
-- 4. Paste and click "Run"
-- 5. You should see "Success. No rows returned"
--
-- This will create:
-- - profiles table (users with roles)
-- - actor_pages table (portfolio data)
-- - All RLS policies
-- - Auto-create profile trigger
-- - Auto-update timestamps
--
-- ============================================================================

-- ============================================================================
-- STEP 1: PROFILES TABLE
-- ============================================================================

-- Create profiles table with role support
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Users can view their own profile
create policy "users_can_view_own_profile"
  on public.profiles
  for select
  using (auth.uid() = id);

-- Users can update their own profile (but not role)
create policy "users_can_update_own_profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id and role = (select role from public.profiles where id = auth.uid()));

-- Admins can view all profiles
create policy "admins_can_view_all_profiles"
  on public.profiles
  for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Admins can update any profile
create policy "admins_can_update_any_profile"
  on public.profiles
  for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Trigger to automatically create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();


-- ============================================================================
-- STEP 2: ACTOR PAGES TABLE
-- ============================================================================

create table if not exists public.actor_pages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  slug text unique not null,
  tier text not null check (tier in ('free', 'standard', 'premium')),
  template_id text not null check (template_id in ('mini-portfolio', 'standard-showcase', 'premium-cinematic')),
  config jsonb not null,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes
create index if not exists actor_pages_user_id_idx on public.actor_pages (user_id);
create index if not exists actor_pages_slug_idx on public.actor_pages (slug);
create index if not exists actor_pages_published_idx on public.actor_pages (is_published);

-- RLS Policies
alter table public.actor_pages enable row level security;

-- Anyone can view published actor pages
create policy "public_can_view_published_actor_pages"
  on public.actor_pages
  for select
  using (is_published = true);

-- Users can view their own actor pages (published or not)
create policy "users_can_view_own_actor_pages"
  on public.actor_pages
  for select
  using (auth.uid() = user_id);

-- Users can insert their own actor pages
create policy "users_can_insert_own_actor_pages"
  on public.actor_pages
  for insert
  with check (auth.uid() = user_id);

-- Users can update their own actor pages
create policy "users_can_update_own_actor_pages"
  on public.actor_pages
  for update
  using (auth.uid() = user_id);

-- Users can delete their own actor pages
create policy "users_can_delete_own_actor_pages"
  on public.actor_pages
  for delete
  using (auth.uid() = user_id);

-- Admins can do anything with actor pages
create policy "admins_can_manage_all_actor_pages"
  on public.actor_pages
  for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Function to update updated_at timestamp
create or replace function public.update_actor_pages_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to automatically update updated_at
create trigger actor_pages_updated_at
  before update on public.actor_pages
  for each row
  execute function public.update_actor_pages_updated_at();

-- Comments for documentation
comment on table public.actor_pages is 'Stores complete actor page configurations as JSONB';
comment on column public.actor_pages.config is 'Complete ActorPageConfig JSON object matching the TypeScript interface';
comment on column public.actor_pages.tier is 'Subscription tier: free, standard, or premium';
comment on column public.actor_pages.template_id is 'Selected template: mini-portfolio, standard-showcase, or premium-cinematic';
comment on column public.actor_pages.slug is 'URL-safe unique identifier for the actor page (e.g., jordan-avery)';
comment on column public.actor_pages.is_published is 'Whether the page is publicly visible';


-- ============================================================================
-- VERIFICATION QUERIES (Run these after to confirm success)
-- ============================================================================

-- Uncomment and run these one at a time to verify:

-- Check both tables exist:
-- select table_name from information_schema.tables
-- where table_schema = 'public' and table_name in ('profiles', 'actor_pages');

-- Check RLS is enabled:
-- select tablename, rowsecurity from pg_tables
-- where schemaname = 'public' and tablename in ('profiles', 'actor_pages');

-- Count policies:
-- select tablename, count(*) as policy_count from pg_policies
-- where schemaname = 'public' and tablename in ('profiles', 'actor_pages')
-- group by tablename;

-- ============================================================================
-- DONE!
-- Next: Make yourself an admin by running:
--
-- update public.profiles
-- set role = 'admin'
-- where email = 'your-email@example.com';
-- ============================================================================

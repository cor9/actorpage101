-- ============================================================================
-- Actor Page 101 - Safe Migrations (Idempotent)
-- ============================================================================
--
-- This version is safe to run multiple times - it won't fail if things exist
--
-- INSTRUCTIONS:
-- 1. Go to Supabase Dashboard → SQL Editor
-- 2. Create a new query
-- 3. Copy this ENTIRE file
-- 4. Paste and click "Run"
-- 5. You should see "Success. No rows returned"
--
-- ============================================================================

-- ============================================================================
-- STEP 1: PROFILES TABLE
-- ============================================================================

-- Create profiles table (if not exists)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Drop existing policies if they exist, then recreate
drop policy if exists "users_can_view_own_profile" on public.profiles;
create policy "users_can_view_own_profile"
  on public.profiles
  for select
  using (auth.uid() = id);

drop policy if exists "users_can_update_own_profile" on public.profiles;
create policy "users_can_update_own_profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id and role = (select role from public.profiles where id = auth.uid()));

drop policy if exists "admins_can_view_all_profiles" on public.profiles;
create policy "admins_can_view_all_profiles"
  on public.profiles
  for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "admins_can_update_any_profile" on public.profiles;
create policy "admins_can_update_any_profile"
  on public.profiles
  for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Create or replace functions and triggers
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists handle_profiles_updated_at on public.profiles;
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

-- Indexes (safe to run multiple times)
create index if not exists actor_pages_user_id_idx on public.actor_pages (user_id);
create index if not exists actor_pages_slug_idx on public.actor_pages (slug);
create index if not exists actor_pages_published_idx on public.actor_pages (is_published);

-- Enable RLS
alter table public.actor_pages enable row level security;

-- Drop existing policies if they exist, then recreate
drop policy if exists "public_can_view_published_actor_pages" on public.actor_pages;
create policy "public_can_view_published_actor_pages"
  on public.actor_pages
  for select
  using (is_published = true);

drop policy if exists "users_can_view_own_actor_pages" on public.actor_pages;
create policy "users_can_view_own_actor_pages"
  on public.actor_pages
  for select
  using (auth.uid() = user_id);

drop policy if exists "users_can_insert_own_actor_pages" on public.actor_pages;
create policy "users_can_insert_own_actor_pages"
  on public.actor_pages
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "users_can_update_own_actor_pages" on public.actor_pages;
create policy "users_can_update_own_actor_pages"
  on public.actor_pages
  for update
  using (auth.uid() = user_id);

drop policy if exists "users_can_delete_own_actor_pages" on public.actor_pages;
create policy "users_can_delete_own_actor_pages"
  on public.actor_pages
  for delete
  using (auth.uid() = user_id);

drop policy if exists "admins_can_manage_all_actor_pages" on public.actor_pages;
create policy "admins_can_manage_all_actor_pages"
  on public.actor_pages
  for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Create or replace functions and triggers
create or replace function public.update_actor_pages_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists actor_pages_updated_at on public.actor_pages;
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
-- STEP 3: BACKFILL PROFILES FOR EXISTING USERS (if any)
-- ============================================================================

-- This will create profiles for any auth.users that don't have one yet
insert into public.profiles (id, email)
select au.id, au.email
from auth.users au
left join public.profiles p on p.id = au.id
where p.id is null
on conflict (id) do nothing;


-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Check both tables exist
do $$
declare
  profiles_count int;
  actor_pages_count int;
begin
  select count(*) into profiles_count
  from information_schema.tables
  where table_schema = 'public' and table_name = 'profiles';

  select count(*) into actor_pages_count
  from information_schema.tables
  where table_schema = 'public' and table_name = 'actor_pages';

  if profiles_count = 1 and actor_pages_count = 1 then
    raise notice '✅ SUCCESS: Both tables created!';
  else
    raise exception '❌ ERROR: Tables not created properly';
  end if;
end $$;


-- ============================================================================
-- DONE! ✅
--
-- Next step: Make yourself an admin
--
-- Run this query (replace with your email):
--
-- update public.profiles
-- set role = 'admin'
-- where email = 'your-email@example.com';
--
-- ============================================================================

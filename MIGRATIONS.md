# Migration Guide - Actor Page 101

This guide walks you through applying the database migrations to your Supabase project.

## ⚠️ Important: Run in Order

**Migration Order:**
1. ✅ First: `004_profiles_and_auth.sql` (creates profiles table)
2. ✅ Second: `003_actor_pages.sql` (creates actor_pages table - depends on profiles)

## 📋 Pre-Migration Checklist

- [ ] You have access to your Supabase project dashboard
- [ ] You're logged into Supabase at https://supabase.com/dashboard
- [ ] You have the correct project selected
- [ ] You have a backup (optional but recommended for production)

---

## 🚀 Step 1: Create Profiles Table

### Navigate to SQL Editor
1. Go to your Supabase dashboard
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New Query"**

### Run Migration 004
Copy and paste the following SQL:

```sql
-- Migration 004: Profiles and Auth
-- Creates profiles table with role support (user/admin)

-- Create profiles table with role support
create table public.profiles (
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
```

### Execute
1. Click **"Run"** (or press Cmd/Ctrl + Enter)
2. You should see: **"Success. No rows returned"**

### Verify
Run this query to confirm the table was created:
```sql
select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name = 'profiles';
```

You should see 1 row with `profiles`.

---

## 🚀 Step 2: Create Actor Pages Table

### Run Migration 003
In a **new SQL query**, copy and paste:

```sql
-- Migration 003: Actor Pages Table
-- Stores complete actor page configurations as JSONB

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
```

### Execute
1. Click **"Run"**
2. You should see: **"Success. No rows returned"**

### Verify
Run this query:
```sql
select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name = 'actor_pages';
```

You should see 1 row with `actor_pages`.

---

## ✅ Step 3: Verify Both Tables

Run this comprehensive check:

```sql
-- Check both tables exist
select table_name,
       (select count(*) from information_schema.columns where table_name = t.table_name) as column_count
from information_schema.tables t
where table_schema = 'public'
  and table_name in ('profiles', 'actor_pages')
order by table_name;
```

**Expected Result:**
```
table_name    | column_count
--------------+-------------
actor_pages   | 9
profiles      | 5
```

---

## 🔐 Step 4: Create Your First Admin User

### Option A: Make Existing User an Admin
If you already have a user account:

```sql
-- Replace 'your-email@example.com' with your actual email
update public.profiles
set role = 'admin'
where email = 'your-email@example.com';
```

### Option B: Check Auth Users First
```sql
-- List all users
select id, email, created_at
from auth.users
order by created_at desc;
```

Then update by ID:
```sql
-- Replace 'user-id-here' with actual UUID
update public.profiles
set role = 'admin'
where id = 'user-id-here';
```

### Verify Admin Status
```sql
select id, email, role, created_at
from public.profiles
where role = 'admin';
```

---

## 🧪 Step 5: Test the Setup

### Test 1: Profiles Trigger
This should automatically create a profile when you sign up a new user. Test by:
1. Going to your app's signup page
2. Creating a new test account
3. Running:
```sql
select * from public.profiles order by created_at desc limit 5;
```

You should see the new profile with `role = 'user'`.

### Test 2: RLS Policies
```sql
-- This should show RLS is enabled
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in ('profiles', 'actor_pages');
```

Expected: Both should show `rowsecurity = true`.

### Test 3: Policy Count
```sql
-- Count RLS policies
select schemaname, tablename, count(*) as policy_count
from pg_policies
where schemaname = 'public'
  and tablename in ('profiles', 'actor_pages')
group by schemaname, tablename;
```

Expected:
- `profiles`: 4 policies
- `actor_pages`: 6 policies

---

## 🎉 Success Checklist

After running all migrations, you should have:

- [x] `profiles` table created with 5 columns
- [x] `actor_pages` table created with 9 columns
- [x] RLS enabled on both tables
- [x] 4 RLS policies on `profiles`
- [x] 6 RLS policies on `actor_pages`
- [x] Auto-create profile trigger on signup
- [x] Updated_at triggers on both tables
- [x] At least one admin user created
- [x] Indexes on user_id, slug, and is_published

---

## 🔧 Troubleshooting

### Error: relation "public.profiles" does not exist
**Solution:** You tried to run migration 003 before 004. Run 004 first.

### Error: trigger "on_auth_user_created" already exists
**Solution:** The migration already ran. Check if the table exists:
```sql
select * from public.profiles limit 1;
```

### Error: permission denied for schema public
**Solution:** Make sure you're using the service role key or have proper permissions in Supabase.

### No profiles created after signup
**Solution:** Check if the trigger exists:
```sql
select trigger_name, event_manipulation, event_object_table
from information_schema.triggers
where trigger_name = 'on_auth_user_created';
```

---

## 📚 What Each Migration Does

### Migration 004 (Profiles)
- Creates `profiles` table linked to `auth.users`
- Adds `role` field (user/admin) with default 'user'
- Sets up RLS so users can only see/edit their own profile
- Admins can see/edit all profiles
- Auto-creates profile when user signs up
- Updates `updated_at` timestamp automatically

### Migration 003 (Actor Pages)
- Creates `actor_pages` table for storing portfolio data
- Stores entire config as JSONB (flexible schema)
- Links to `profiles` via `user_id`
- RLS: Users own their pages, admins see all
- Public can view published pages
- Enforces tier constraints (free/standard/premium)
- Auto-updates `updated_at` timestamp

---

## 🚀 Next Steps

After migrations are complete:

1. **Sign up** at your app's signup page
2. **Make yourself admin** (see Step 4)
3. **Test user flow**:
   - Create actor page at `/dashboard/pages/new`
   - Edit with builder at `/dashboard/pages/[id]/edit`
   - Publish and view at `/actor/[slug]`
4. **Test admin flow**:
   - Visit `/admin` dashboard
   - View all pages at `/admin/pages`
   - View all users at `/admin/users`

---

**Questions?** Check the main `PROGRESS.md` file for more details on the system architecture.

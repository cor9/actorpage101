-- Actor Pages Table for storing complete actor page configurations
-- This table stores the entire ActorPageConfig as JSONB for flexibility

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

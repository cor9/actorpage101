-- Add custom domain fields to actor_pages table
-- Run this in Supabase SQL Editor

alter table public.actor_pages
  add column if not exists custom_domain text,
  add column if not exists domain_status text
    check (domain_status in ('unverified', 'pending', 'verified', 'error'))
    default 'unverified';

-- Create index for faster lookups
create index if not exists idx_actor_pages_custom_domain on public.actor_pages(custom_domain);

comment on column public.actor_pages.custom_domain is 'Custom domain like jordankidsactor.com (no protocol)';
comment on column public.actor_pages.domain_status is 'DNS verification status: unverified, pending, verified, or error';

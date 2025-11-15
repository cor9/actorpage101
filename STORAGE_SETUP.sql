-- ============================================================================
-- Supabase Storage Setup for Actor Page 101
-- ============================================================================
-- Run this in Supabase SQL Editor after running the main migrations

-- Create storage bucket for actor media
insert into storage.buckets (id, name, public)
values ('actor-media', 'actor-media', true)
on conflict (id) do nothing;

-- Allow authenticated users to upload to their own folder
create policy "Users can upload to their own folder"
on storage.objects for insert
with check (
  bucket_id = 'actor-media'
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to update their own files
create policy "Users can update their own files"
on storage.objects for update
using (
  bucket_id = 'actor-media'
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to delete their own files
create policy "Users can delete their own files"
on storage.objects for delete
using (
  bucket_id = 'actor-media'
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow public read access to all files
create policy "Public can view all files"
on storage.objects for select
using (bucket_id = 'actor-media');

-- Admins can do anything
create policy "Admins can manage all files"
on storage.objects for all
using (
  bucket_id = 'actor-media'
  and exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);

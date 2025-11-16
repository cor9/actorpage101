# Supabase Storage Setup for Photo Uploads

## Quick Setup (Option 1 - UI Method)

1. Go to your Supabase Dashboard → Storage
2. Click "New bucket"
3. Name it: `photos`
4. Make it **Public** (check the box)
5. Click Create

## SQL Method (Option 2)

Run the SQL in `supabase-storage-setup.sql` in your Supabase SQL Editor.

## Verify Setup

After creating the bucket, the photo uploads should work. If you still get errors:

1. Check the browser console for the specific error message
2. Verify the bucket is public
3. Ensure you're logged in (authenticated users only can upload)

## Troubleshooting

If uploads fail with permission errors, you may need to adjust the Storage policies in Supabase:
- Storage → Policies → photos bucket
- Ensure INSERT policy allows authenticated users
- Ensure SELECT policy allows public access

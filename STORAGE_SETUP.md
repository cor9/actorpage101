# Supabase Storage Setup for Photo Uploads

## Quick Setup (Option 1 - UI Method) ⭐ RECOMMENDED

1. Go to your Supabase Dashboard → Storage
2. If "photos" bucket doesn't exist:
   - Click "New bucket"
   - Name: `photos`
   - **Check "Public bucket"**
   - Click Create
3. Go to Storage → Policies
4. Select the "photos" bucket
5. Click "New Policy" → "For full customization"
6. Create 4 policies:
   - **INSERT**: Allow authenticated users (Target roles: authenticated)
   - **SELECT**: Allow public (Target roles: public)
   - **UPDATE**: Allow authenticated users (Target roles: authenticated)
   - **DELETE**: Allow authenticated users (Target roles: authenticated)

## SQL Method (Option 2)

**If you get "policy already exists" errors, use the simple version:**
```bash
# Run this in Supabase SQL Editor
cat supabase-storage-simple.sql
```

## Troubleshooting Upload Failures

### Step 1: Check Browser Console
Open your browser's Developer Tools (F12) and check the Console tab when you try to upload. You should see the actual error message.

### Common Errors & Fixes:

**"Bucket not found"**
- Create the `photos` bucket in Supabase Dashboard → Storage

**"new row violates row-level security policy"**
- Run the simple SQL setup: `supabase-storage-simple.sql`
- Or disable RLS on storage.objects table (not recommended for production)

**"The resource already exists"**
- The file was already uploaded (each upload generates a unique filename, so this is rare)
- Try uploading a different file

**"Invalid file type"**
- Only JPEG, PNG, WebP, and HEIC files are allowed
- Check the file extension matches the content type

**"File too large"**
- Max file size is 10MB
- Compress your image before uploading

### Step 2: Verify Authentication
Make sure you're logged into the dashboard. The upload requires authentication.

### Step 3: Check Bucket Settings
1. Go to Supabase Dashboard → Storage → photos
2. Verify the bucket is **Public**
3. Click on "Policies" and ensure policies exist for INSERT, SELECT, UPDATE, DELETE

### Step 4: Test with Simple Policy
If still not working, run `supabase-storage-simple.sql` which uses more permissive policies.

// Quick diagnostic script to check Supabase Storage setup
// Run with: node check-storage.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Read .env.local
let supabaseUrl, supabaseKey;
try {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/);
  const keyMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)/);
  supabaseUrl = urlMatch ? urlMatch[1].trim() : null;
  supabaseKey = keyMatch ? keyMatch[1].trim() : null;
} catch (err) {
  console.error('❌ Could not read .env.local file');
}

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Need: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStorage() {
  console.log('🔍 Checking Supabase Storage...\n');

  try {
    // List all buckets
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
      console.error('❌ Error listing buckets:', error.message);
      return;
    }

    console.log('📦 Available buckets:');
    if (buckets.length === 0) {
      console.log('   (none found)');
    } else {
      buckets.forEach(bucket => {
        console.log(`   - ${bucket.name} (${bucket.public ? 'public' : 'private'})`);
      });
    }

    console.log('');

    // Check for 'photos' bucket specifically
    const photoBucket = buckets.find(b => b.name === 'photos');
    if (photoBucket) {
      console.log('✅ "photos" bucket exists!');
      console.log(`   Public: ${photoBucket.public ? 'Yes ✓' : 'No ✗'}`);

      if (!photoBucket.public) {
        console.log('\n⚠️  WARNING: Bucket should be public for photo uploads to work');
      }
    } else {
      console.log('❌ "photos" bucket NOT FOUND');
      console.log('\n📝 To fix:');
      console.log('   1. Go to: ' + supabaseUrl.replace('//', '//app.') + '/project/_/storage/buckets');
      console.log('   2. Click "New bucket"');
      console.log('   3. Name: photos');
      console.log('   4. Check "Public bucket"');
      console.log('   5. Click "Create bucket"');
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

checkStorage();

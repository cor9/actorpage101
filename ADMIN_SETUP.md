# Admin Setup Guide

This guide explains how to set up admin permissions and manage user subscriptions.

## Step 1: Run Admin Policies SQL

Run the admin policies SQL script to enable admin functionality:

1. Go to your Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `supabase/admin-policies.sql`
3. Click "Run"

This creates:
- Policies allowing admins to view all profiles
- Policies allowing admins to update user subscriptions
- A helper function `is_admin()` for checking admin status

## Step 2: Make Yourself an Admin

You need to manually set your user account to admin role:

### Method 1: Using SQL (Recommended)

1. Go to Supabase Dashboard → SQL Editor
2. Find your user ID:
   ```sql
   SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';
   ```
3. Make yourself admin:
   ```sql
   UPDATE public.profiles
   SET role = 'admin'
   WHERE id = 'YOUR_USER_ID_FROM_STEP_2';
   ```

### Method 2: Using the Table Editor

1. Go to Supabase Dashboard → Table Editor → profiles
2. Find your profile row
3. Edit the `role` column from `user` to `admin`
4. Save

## Step 3: Access the Admin Dashboard

Once you're an admin:

1. Log into your account
2. You'll see a "⚡ Admin" link in the dashboard navigation
3. Click it to access `/admin`

## Using the Admin Dashboard

The admin dashboard allows you to:

- **View all users** in the system
- **See user details**: display name, role, current subscription tier, join date
- **Upgrade users** to Standard or Premium plans
- **Downgrade users** to Free plan
- **View statistics**: Total users, plan distribution

### Upgrading a User

1. Go to `/admin`
2. Find the user in the list
3. Click the appropriate button:
   - **→ Free** - Downgrade to free plan
   - **→ Standard** - Upgrade to standard plan
   - **→ Premium** - Upgrade to premium plan

The change takes effect immediately and the user will have access to plan-specific features.

## API Endpoint

The admin API is also available for programmatic access:

**Endpoint:** `POST /api/admin/update-subscription`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_SUPABASE_TOKEN
```

**Body:**
```json
{
  "userId": "user-uuid",
  "subscriptionTier": "standard"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User subscription updated to standard",
  "data": { ... }
}
```

## Security Notes

- Only users with `role = 'admin'` can access the admin dashboard
- Regular users trying to access `/admin` are redirected to `/dashboard`
- The API endpoint validates admin status before allowing updates
- All subscription changes are logged in Supabase

## Plan Features

Each subscription tier unlocks different features:

### Free Plan
- 3 photos (1 primary + 2 gallery)
- 1 video reel
- 5 credits
- Basic profile

### Standard Plan
- 6 photos (1 primary + 5 gallery)
- 4 video reels
- 20 credits
- Vimeo integration
- Resume101 integration

### Premium Plan
- 11 photos (1 primary + 10 gallery)
- Unlimited video reels
- Unlimited credits
- All Standard features
- Audition tracker
- Advanced analytics

## Troubleshooting

**"Forbidden: Admin access required" error:**
- Verify your user role is set to 'admin' in the profiles table
- Log out and log back in
- Check that admin policies were created successfully

**Can't see Admin link in navigation:**
- Clear your browser cache
- Make sure you're logged in
- Verify your role is 'admin' in the database

**Subscription update fails:**
- Check browser console for error details
- Verify the user ID is correct
- Ensure admin policies are applied in Supabase

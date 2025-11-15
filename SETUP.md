# Quick Setup Guide - Actor Page 101

## 🚀 Get Started in 3 Steps

### Step 1: Run Database Migrations

**Option A - Quick (Recommended):**
1. Open [Supabase Dashboard](https://supabase.com/dashboard) → SQL Editor
2. Open `RUN_MIGRATIONS.sql` (in this repo)
3. Copy entire file → Paste → Run
4. Done! ✅

**Option B - Detailed:**
Follow the complete guide in `MIGRATIONS.md`

### Step 2: Create Your First Admin

After migrations run, make yourself an admin:

```sql
-- In Supabase SQL Editor:
update public.profiles
set role = 'admin'
where email = 'your-email@example.com';
```

### Step 3: Test the System

1. **Sign up** at `/signup`
2. **Create page** at `/dashboard/pages/new`
3. **Edit page** at `/dashboard/pages/[id]/edit`
4. **Publish** and view at `/actor/[slug]`
5. **Admin panel** at `/admin`

---

## 📁 Key Files

- **`RUN_MIGRATIONS.sql`** - Single file to run all migrations
- **`MIGRATIONS.md`** - Detailed migration guide with troubleshooting
- **`PROGRESS.md`** - Complete development log and feature list
- **`.env.local`** - Environment variables (create from `.env.example`)

---

## 🔑 Environment Variables

Make sure you have these in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these from: Supabase Dashboard → Settings → API

---

## 🎯 What You Get

### User Dashboard (`/dashboard`)
- List all actor pages
- Create new pages (choose tier: Free/Standard/Premium)
- Edit with visual builder (no code required)
- Publish/unpublish toggle
- Preview live pages

### Builder Form
- **4 Color Themes**: Hollywood Night, Soft Lilac, Warm Slate, Teal Stage
- **4 Font Presets**: Classic, Rounded, Serif, Condensed
- **3 Icon Styles**: Hex, Circle, Rounded Square
- Full content editing: Hero, Socials, Headshots, Reels, Resume, Contact

### Admin Panel (`/admin`)
- KPI dashboard (pages, users, growth)
- View all pages across all users
- User management
- Recent activity tracking

### Public Pages (`/actor/[slug]`)
- Beautiful portfolio pages
- Tier-based features
- SEO-friendly (server-rendered with ISR)
- Mobile-responsive

---

## 🗂️ Project Structure

```
app/
├── (dashboard)/dashboard/       # User dashboard
│   ├── page.tsx                # List pages
│   └── pages/
│       ├── new/                # Create page
│       └── [id]/edit/          # Edit page
├── admin/                      # Admin panel
│   ├── page.tsx               # Overview
│   ├── pages/                 # All pages
│   └── users/                 # All users
├── actor/[slug]/              # Public actor pages
├── demo/                      # Demo & builder
└── (auth)/                    # Login/signup

components/actor-page/
├── ActorPageForm.tsx          # Visual builder form
├── ActorPageLayout.tsx        # Main layout
├── types.ts                   # TypeScript types
└── [11 display components]

supabase/migrations/
├── 003_actor_pages.sql
└── 004_profiles_and_auth.sql
```

---

## 🎨 Tier Features

### Free
- ✅ 3 headshots
- ✅ 1 reel
- ✅ External resume link
- ✅ Basic theme customization

### Standard ($12/mo)
- ✅ 12 headshots
- ✅ 4 reels
- ✅ PDF resume embed
- ✅ BTS preview (6 images)
- ✅ Advanced theme options

### Premium ($20/mo)
- ✅ Unlimited headshots
- ✅ Unlimited reels
- ✅ Structured resume
- ✅ Full BTS albums
- ✅ Project gallery
- ✅ All customization options

---

## 🔒 Security

- **Row Level Security (RLS)** - Database-level access control
- **Server-side auth** - No auth flicker
- **Admin role** - Bypass RLS for management
- **Ownership checks** - Users only see/edit their own pages
- **Public pages** - Only published pages visible

---

## 🐛 Troubleshooting

### Migration Errors
See `MIGRATIONS.md` → Troubleshooting section

### Build Errors
```bash
npm install
npm run build
```

### Auth Issues
Check `.env.local` has correct Supabase credentials

### Can't Access Admin Panel
Make sure your user has `role = 'admin'` in profiles table

---

## 📚 Documentation

- **Full Development Log**: `PROGRESS.md`
- **Migration Guide**: `MIGRATIONS.md`
- **Migration SQL**: `RUN_MIGRATIONS.sql`
- **Component Docs**: `components/actor-page/README.md`

---

## 🚢 Deploy

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Set environment variables
4. Deploy

### Environment Variables for Vercel
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## ✅ Post-Setup Checklist

- [ ] Migrations run successfully
- [ ] Admin user created
- [ ] Environment variables set
- [ ] Can sign up new users
- [ ] Can create actor pages
- [ ] Builder form works
- [ ] Pages publish correctly
- [ ] Admin panel accessible

---

## 🎉 You're Ready!

**Current Status:**
- ✅ Database schema ready
- ✅ User authentication working
- ✅ Builder form complete
- ✅ Admin panel ready
- ✅ 24 routes deployed

**Next Steps:**
- Add Stripe integration for billing
- Add image upload to Supabase Storage
- Connect Vimeo API
- Add analytics

---

**Questions?** Check `PROGRESS.md` for complete feature list and development timeline.

**Need Help?** All code is documented in comments throughout the codebase.

**Live Demo:** Visit `/demo/free`, `/demo/standard`, `/demo/premium` to see templates in action.

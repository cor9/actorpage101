# Product Requirements Document (PRD)
# Actor Page 101

**Version:** 1.0
**Date:** November 17, 2025
**Status:** MVP Complete - Ready for Beta
**Product Owner:** Development Team

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Vision](#product-vision)
3. [Target Users](#target-users)
4. [Problem Statement](#problem-statement)
5. [Solution Overview](#solution-overview)
6. [Technical Stack](#technical-stack)
7. [Core Features](#core-features)
8. [Subscription Tiers](#subscription-tiers)
9. [User Journeys](#user-journeys)
10. [System Architecture](#system-architecture)
11. [Database Schema](#database-schema)
12. [Security & Access Control](#security--access-control)
13. [Design Philosophy](#design-philosophy)
14. [Current Implementation Status](#current-implementation-status)
15. [Roadmap](#roadmap)
16. [Success Metrics](#success-metrics)
17. [Known Constraints & Guardrails](#known-constraints--guardrails)
18. [Appendix](#appendix)

---

## Executive Summary

**Actor Page 101** is a SaaS platform that empowers child actors and their parents to create professional, casting-friendly portfolio websites in minutes—no technical knowledge required. The platform features a visual builder, tier-based subscription model, and beautiful Carrd-style templates that showcase headshots, reels, resumes, and credits.

**Current Status:** MVP complete and deployed at `actorpage101.site` with 24 functional routes, complete user and admin dashboards, and a production-ready database.

**Key Differentiators:**
- Parent-friendly visual builder (zero code/JSON editing)
- Mobile-first design (parents use phones)
- Tier-based feature gating (Free, Standard, Premium)
- Instant publishing with SEO-optimized public pages
- Integrated admin panel for platform management

---

## Product Vision

**Mission Statement:**
Democratize professional actor portfolios by providing an affordable, easy-to-use platform that helps young actors stand out in auditions and land more roles.

**Long-term Vision:**
Become the industry-standard portfolio platform for actors of all ages, integrated with casting platforms, offering AI-powered enhancements, and providing analytics to help actors track their career growth.

**3-Year Goals:**
- 10,000+ active actor portfolios
- Integration with major casting platforms (Backstage, Actors Access)
- Mobile app for on-the-go updates
- AI-powered headshot enhancement and resume parsing

---

## Target Users

### Primary Users

#### 1. **Parents of Child Actors** (Primary Decision Maker)
- **Demographics:** Ages 30-50, limited technical skills
- **Pain Points:**
  - Expensive custom websites or designer fees
  - Complex website builders too technical
  - Time-consuming to update portfolios
  - Lack of mobile-friendly options
- **Goals:**
  - Quick, professional portfolio creation
  - Easy updates before auditions
  - Affordable monthly cost
  - Showcase child's work to casting directors

#### 2. **Young Actors (Ages 8-18)**
- **Demographics:** Active in film, TV, theatre, commercials
- **Pain Points:**
  - Need to share portfolio quickly via link
  - Want professional presentation
  - Competing with actors who have better portfolios
- **Goals:**
  - Stand out in auditions
  - Easy sharing via QR code or link
  - Showcase reels and headshots effectively

### Secondary Users

#### 3. **Acting Agents & Managers**
- **Use Case:** Recommend Actor Page 101 to clients
- **Goals:** Efficient client portfolio management, professional representation

#### 4. **Casting Directors**
- **Use Case:** View actor portfolios quickly
- **Goals:** Fast-loading pages, easy navigation, clear credits

---

## Problem Statement

### The Problem

Child actors and their parents face significant barriers to creating professional online portfolios:

1. **High Cost:** Custom websites cost $500-2,000+ with ongoing hosting fees
2. **Technical Complexity:** Traditional website builders (Wix, Squarespace) require design skills
3. **Time-Consuming:** Updates take hours; parents are busy
4. **Mobile Unfriendly:** Many solutions aren't optimized for mobile editing
5. **Lack of Industry Standards:** No clear template for what casting directors want

### Market Gap

Existing solutions fall short:
- **Custom Websites:** Too expensive, slow to update
- **Generic Builders:** Not actor-specific, overwhelming options
- **Social Media:** Unprofessional, scattered content
- **PDFs/Docs:** Static, not shareable via simple link

### Opportunity

There's a clear market need for an **actor-specific, affordable, easy-to-use portfolio builder** with industry-standard templates and instant publishing.

---

## Solution Overview

Actor Page 101 provides a complete SaaS solution:

### Core Value Propositions

1. **Speed:** Create a professional portfolio in under 10 minutes
2. **Simplicity:** Visual builder with no code or technical knowledge required
3. **Affordability:** Starting at FREE, paid tiers at $12/month (vs. $500+ for custom sites)
4. **Mobile-First:** Edit and view portfolios perfectly on any device
5. **Professional:** Carrd-style design optimized for casting directors
6. **Flexible:** Three tiers scale with actor's career stage

### How It Works

```
Sign Up → Choose Tier → Build Portfolio → Publish → Share Link
```

1. **Sign Up:** Email/password authentication via Supabase
2. **Create Actor Page:** Choose tier (Free/Standard/Premium)
3. **Visual Builder:** Add content using intuitive form (no JSON editing)
4. **Customize Theme:** Select colors, fonts, icon styles
5. **Publish:** Toggle to make page live
6. **Share:** Unique URL at `/actor/[slug]`

---

## Technical Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **UI Library:** React 18
- **Styling:** Tailwind CSS 3.4
- **Architecture:** Hybrid SSR + Client Components

### Backend
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage (planned)
- **API:** Next.js API Routes + Supabase RPC

### Third-Party Integrations
- **Payments:** Stripe (Checkout + Webhooks)
- **Video Hosting:** Vimeo (embed only, no uploads)
- **Hosting:** Vercel
- **Domain:** Namecheap (actorpage101.site)

### Key Dependencies
```json
{
  "@supabase/supabase-js": "^2.39.0",
  "@supabase/ssr": "^0.1.0",
  "@stripe/stripe-js": "^2.4.0",
  "next": "^15.0.3",
  "react": "^18.3.1",
  "stripe": "^14.10.0"
}
```

---

## Core Features

### 1. Visual Page Builder

**Component:** `/components/actor-page/ActorPageForm.tsx` (1,150 lines)

**Capabilities:**
- **Style & Layout Section:**
  - 4 color themes (Hollywood Night, Soft Lilac, Warm Slate, Teal Stage)
  - 4 font presets (Classic, Rounded, Serif, Condensed)
  - 3 icon styles (Hex, Circle, Rounded Square)
  - Advanced accent color override

- **Content Editing:**
  - Hero section (name, headshot, bio, tagline)
  - Social media links (9 platforms + custom)
  - Headshot gallery (tier-limited)
  - Video reels (tier-limited)
  - Resume (3 formats: link, PDF, structured)
  - Contact information

- **Tier Enforcement:**
  - Free: 3 headshots, 1 reel, external resume link
  - Standard: 12 headshots, 4 reels, PDF resume, BTS preview
  - Premium: Unlimited headshots/reels, structured resume, projects, full BTS

**User Experience:**
- Real-time validation
- Auto-save functionality (planned)
- Preview before publish
- Duplicate slug detection
- Tier-based feature visibility

### 2. Public Actor Pages

**Route:** `/actor/[slug]`

**Components:** 11 display components in `/components/actor-page/`

**Features:**
- **Server-Side Rendered:** Fast initial load
- **ISR Caching:** 1-hour cache for performance
- **SEO Optimized:** Meta tags, Open Graph (planned)
- **Mobile Responsive:** Perfect on all screen sizes
- **Carrd-Style Design:** Dark gradient backgrounds, rounded cards

**Sections:**
1. Hero (name, headshot, bio, socials, reps)
2. Headshots gallery
3. Video reels (Vimeo embeds)
4. Behind-the-scenes albums (Standard/Premium)
5. Project gallery (Premium only)
6. Resume (tier-dependent format)
7. Contact information
8. Locked feature upsell cards

### 3. User Dashboard

**Route:** `/dashboard`

**Pages:**
- **Dashboard Home** (`/dashboard/page.tsx`)
  - List all user's actor pages
  - Quick stats: Total pages, published count, current plan
  - Table view: Name, Slug, Tier, Status, Last Updated
  - Create new page button
  - Preview/Edit actions

- **Create Page** (`/dashboard/pages/new/page.tsx`)
  - Actor name input (auto-generates slug)
  - Tier selection
  - Creates default config based on tier
  - Duplicate slug detection
  - Redirects to edit page

- **Edit Page** (`/dashboard/pages/[id]/edit/`)
  - Full builder form integration
  - Publish/Unpublish toggle
  - Preview public page button
  - Draft mode banner
  - Real-time save to Supabase
  - Auth + ownership verification

**Security:**
- Server-side auth check (no flicker)
- RLS enforces ownership
- Client component for interactivity

### 4. Admin Dashboard

**Route:** `/admin` (role-gated: requires `role = 'admin'`)

**Pages:**
- **Overview** (`/admin/page.tsx`)
  - KPI tiles: Total Pages, Total Users, Published Pages, Last 7 Days Growth
  - Pages by tier breakdown (Free/Standard/Premium)
  - Recent activity table (10 most recent updates)

- **All Pages** (`/admin/pages/page.tsx`)
  - Every actor page in system
  - Columns: Actor Name, Slug, Owner Email, Tier, Status, Created, Updated
  - View/Edit actions
  - Joins with profiles for owner info

- **Users** (`/admin/users/page.tsx`)
  - All users with role badges
  - Page counts per user (aggregated)
  - View details action
  - Created dates

**Access Control:**
- Admin role check in layout
- Redirects non-admins to `/dashboard`
- Admin bypass of RLS policies
- "Back to User View" navigation

### 5. Authentication System

**Routes:** `/login`, `/signup`

**Provider:** Supabase Auth

**Features:**
- Email/password authentication
- Auto-create profile on signup (via trigger)
- Server-side session management
- Protected routes via middleware
- Role-based access control (user/admin)

**User Profile (`profiles` table):**
```typescript
{
  id: uuid,
  email: string,
  role: 'user' | 'admin',
  created_at: timestamp,
  updated_at: timestamp
}
```

### 6. Subscription Management (Planned)

**Provider:** Stripe

**Tiers:**
- **Free:** $0/month
- **Standard:** $12/month or $101/year
- **Premium:** $20/month or $199/year

**Features:**
- Stripe Checkout for subscriptions
- Webhook handler for tier updates
- Server-side price ID validation
- Grace period handling
- Upgrade/downgrade flows

---

## Subscription Tiers

### Tier Comparison Matrix

| Feature | Free | Standard | Premium |
|---------|------|----------|---------|
| **Price** | $0 | $12/mo or $101/yr | $20/mo or $199/yr |
| **Headshots** | 3 | 12 | Unlimited |
| **Video Reels** | 1 | 4 | Unlimited |
| **Resume Format** | External Link | PDF Embed | Structured + PDF |
| **Behind-the-Scenes** | ❌ | Preview (6 images) | Full Albums |
| **Project Gallery** | ❌ | ❌ | ✅ Film/TV/Theatre |
| **Theme Customization** | Basic | Advanced | Full |
| **Icon Styles** | 1 | 3 | 3 |
| **Font Presets** | 2 | 4 | 4 |
| **Color Themes** | 2 | 4 | 4 |
| **Accent Color Override** | ❌ | ✅ | ✅ |
| **Social Links** | ✅ | ✅ | ✅ |
| **Contact Info** | Parent Email | Reps + Parent | Reps + Parent |
| **Analytics** | ❌ | ❌ | ✅ (planned) |
| **Custom Domain** | ❌ | ❌ | ✅ (planned) |
| **Priority Support** | ❌ | ❌ | ✅ (planned) |

### Tier Enforcement Strategy

**Client-Side (UX):**
- Builder form disables features beyond tier
- Shows "Upgrade to unlock" messages
- Limits input fields (e.g., max 3 headshots for Free)

**Server-Side (Security):**
- Database constraints (future)
- API validation on save
- RLS policies (future enhancement)

**Upsell Mechanism:**
- Locked feature cards on public pages
- "Upgrade Your Plan" CTAs
- Feature comparison modal

---

## User Journeys

### Journey 1: First-Time Parent User

**Goal:** Create first actor page for child

1. **Discovery:** Finds Actor Page 101 via Google/referral
2. **Signup:** Creates account at `/signup`
3. **Welcome:** Lands on empty dashboard
4. **Create:** Clicks "Create New Page"
5. **Configure:** Enters child's name, selects tier (Free to start)
6. **Build:** Fills in builder form
   - Uploads headshot URL
   - Adds bio and tagline
   - Pastes Vimeo reel link
   - Adds 3 headshots
   - Links to external resume
7. **Preview:** Previews page before publishing
8. **Publish:** Toggles "Published" switch
9. **Share:** Copies `/actor/[slug]` link
10. **Success:** Shares link with agent/casting director

**Pain Points Addressed:**
- ✅ No technical knowledge needed
- ✅ Completed in under 10 minutes
- ✅ Immediate publishing
- ✅ Professional result

### Journey 2: Upgrading User

**Goal:** Upgrade from Free to Standard

1. **Limitation:** Realizes Free tier only allows 3 headshots
2. **Discover:** Sees "Upgrade" message in builder
3. **Compare:** Views tier comparison table
4. **Decision:** Chooses Standard ($12/month)
5. **Checkout:** Clicks "Upgrade" → Stripe Checkout
6. **Payment:** Completes payment
7. **Webhook:** Stripe webhook updates user tier in database
8. **Confirmation:** Redirected to dashboard with new tier active
9. **Build:** Can now add up to 12 headshots, 4 reels, BTS photos
10. **Publish:** Updates page with new content

**Pain Points Addressed:**
- ✅ Seamless upgrade flow
- ✅ Immediate feature unlock
- ✅ Value clearly communicated

### Journey 3: Admin Management

**Goal:** Monitor platform usage and support user

1. **Login:** Admin logs in with admin role
2. **Dashboard:** Views `/admin` overview
   - Sees 150 total pages, 75 users, 90 published
   - Growth chart shows +12 pages last 7 days
3. **User Issue:** Receives support email from user
4. **Lookup:** Goes to `/admin/users`, searches for user email
5. **View Pages:** Sees user has 2 actor pages
6. **Review:** Clicks to view one of their pages
7. **Edit:** Makes correction on user's behalf (if needed)
8. **Support:** Responds to user with solution

**Admin Capabilities:**
- ✅ Full system visibility
- ✅ Edit any user's page
- ✅ View aggregated metrics
- ✅ User management

---

## System Architecture

### Application Structure

```
actorpage101/
├── app/
│   ├── (marketing)/           # Public marketing pages
│   │   └── page.tsx          # Homepage
│   ├── (auth)/                # Authentication
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/           # User Dashboard
│   │   └── dashboard/
│   │       ├── page.tsx       # Dashboard home
│   │       └── pages/
│   │           ├── new/       # Create page
│   │           └── [id]/edit/ # Edit page
│   ├── admin/                 # Admin Dashboard (role-gated)
│   │   ├── layout.tsx        # Admin layout + auth
│   │   ├── page.tsx          # Overview
│   │   ├── pages/            # All pages management
│   │   └── users/            # User management
│   ├── actor/[slug]/          # Public actor pages
│   └── demo/                  # Demo pages
│       ├── [tier]/           # Tier demos
│       └── builder/          # Builder demo
├── components/
│   └── actor-page/
│       ├── ActorPageLayout.tsx      # Main orchestrator
│       ├── ActorPageForm.tsx        # Builder form (1,150 lines)
│       ├── HeroSection.tsx
│       ├── HeadshotsSection.tsx
│       ├── ReelsSection.tsx
│       ├── BTSSection.tsx
│       ├── ProjectsSection.tsx
│       ├── ResumeSections.tsx
│       ├── ContactSection.tsx
│       ├── LockedCards.tsx
│       ├── SectionDivider.tsx
│       ├── SocialIconRow.tsx
│       └── types.ts                 # TypeScript definitions
├── lib/
│   ├── supabaseClient.ts    # Client-side Supabase
│   └── supabaseServer.ts    # Server-side Supabase (SSR)
├── supabase/
│   └── migrations/
│       ├── 003_actor_pages.sql
│       └── 004_profiles_and_auth.sql
└── middleware.ts             # Auth + routing (currently pass-through)
```

### Data Flow

#### Public Page Rendering
```
User Request → Next.js Server → Supabase (SSR client) →
Fetch actor_pages row → Extract JSONB config →
ActorPageLayout → 11 Display Components → HTML Response
```

#### Builder Save Flow
```
User Edits Form → Client Component State →
Validate Data → Supabase Client (browser) →
Update actor_pages.config (JSONB) →
RLS Check (user owns page) → Success Response
```

#### Admin Access
```
Admin Login → Server Auth Check →
Load profile → Check role = 'admin' →
Allow access to /admin → Query all pages/users →
Admin RLS policies bypass ownership checks
```

### Rendering Strategy

**Server Components (Default):**
- All dashboard pages load data server-side
- Auth checks before render (no flicker)
- SEO-friendly public pages

**Client Components (Interactive):**
- Builder form (`ActorPageForm.tsx`)
- Edit page (`EditPageClient.tsx`)
- Any component with `useState`, `useEffect`, event handlers

**Static Generation:**
- Demo pages (`/demo/[tier]`)
- Marketing pages

**ISR (Incremental Static Regeneration):**
- Public actor pages (`/actor/[slug]`)
- Revalidate: 1 hour

---

## Database Schema

### Tables

#### 1. `profiles`
```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

**Indexes:**
- Primary key on `id`

**Triggers:**
- `on_auth_user_created`: Auto-creates profile on signup
- `handle_profiles_updated_at`: Updates `updated_at` timestamp

**RLS Policies:**
- Users can view/update own profile (can't change role)
- Admins can view/update all profiles

---

#### 2. `actor_pages`
```sql
create table public.actor_pages (
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
```

**Indexes:**
- Primary key on `id`
- `actor_pages_user_id_idx` on `user_id`
- `actor_pages_slug_idx` on `slug` (unique)
- `actor_pages_published_idx` on `is_published`

**Constraints:**
- `tier` must be 'free', 'standard', or 'premium'
- `template_id` must be valid template
- `slug` must be unique
- Foreign key to `profiles(id)` with cascade delete

**JSONB Structure (`config`):**
```typescript
interface ActorPageConfig {
  tier: 'free' | 'standard' | 'premium';
  templateId: string;
  theme: ThemeConfig;
  hero: HeroConfig;
  socials: SocialLink[];
  headshots: Headshot[];
  reels: Reel[];
  resume: ResumeConfig;
  contact: ContactConfig;
  bts?: BTSAlbum[];         // Standard/Premium only
  projects?: Project[];     // Premium only
}
```

**Triggers:**
- `actor_pages_updated_at`: Updates `updated_at` timestamp

**RLS Policies:**
- Public can view published pages (`is_published = true`)
- Users can view/insert/update/delete own pages
- Admins can manage all pages

---

### Data Model Strategy

**JSONB-Backed Approach:**
- **Rationale:** Fast iteration, flexible schema, easier tier-based gating
- **Trade-off:** Harder to query nested data, larger row size
- **Decision:** Accepted trade-off for MVP speed

**Alternative Considered:**
- Normalized tables (profiles, headshots, reels, credits, etc.)
- **Why Rejected:** Too many joins, slower queries, complex tier enforcement

**Migration Path:**
- Keep `actor_pages` JSONB as single source of truth
- Add normalized tables only if specific query needs emerge
- Document in `Guardrails.md`

---

## Security & Access Control

### Row Level Security (RLS)

**Philosophy:** Database-level security is more reliable than application-level checks.

#### Profiles Table Policies

1. **users_can_view_own_profile**
   - `SELECT` where `auth.uid() = id`

2. **users_can_update_own_profile**
   - `UPDATE` where `auth.uid() = id`
   - Cannot change own role (checked in WITH CHECK)

3. **admins_can_view_all_profiles**
   - `SELECT` where user's role = 'admin'

4. **admins_can_update_any_profile**
   - `UPDATE` where user's role = 'admin'

#### Actor Pages Table Policies

1. **public_can_view_published_actor_pages**
   - `SELECT` where `is_published = true`
   - No auth required

2. **users_can_view_own_actor_pages**
   - `SELECT` where `auth.uid() = user_id`
   - Sees both published and unpublished

3. **users_can_insert_own_actor_pages**
   - `INSERT` with check `auth.uid() = user_id`

4. **users_can_update_own_actor_pages**
   - `UPDATE` where `auth.uid() = user_id`

5. **users_can_delete_own_actor_pages**
   - `DELETE` where `auth.uid() = user_id`

6. **admins_can_manage_all_actor_pages**
   - `ALL` operations where user's role = 'admin'

### Authentication Flow

```
1. User signs up → Supabase Auth creates auth.users row
2. Trigger fires → Creates public.profiles row with role='user'
3. User logs in → Supabase sets session cookie
4. Server components → Read cookie via Supabase SSR client
5. Client components → Use Supabase browser client
6. All queries → Filtered by RLS policies
```

### Admin Access

**Requirements:**
- User must have `profiles.role = 'admin'`
- Set manually in database (SQL update)
- No self-service admin creation

**Admin Powers:**
- Bypass all RLS policies
- View/edit all pages
- View/manage all users
- Access admin dashboard at `/admin`

**Implementation:**
```typescript
// In /app/admin/layout.tsx
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single();

if (profile.role !== 'admin') {
  redirect('/dashboard');
}
```

### Security Best Practices

✅ **Implemented:**
- RLS enabled on all tables
- Server-side auth checks
- CSRF protection (Next.js built-in)
- SQL injection prevention (Supabase parameterized queries)
- XSS prevention (React auto-escaping)

⏳ **Planned:**
- Rate limiting (prevent abuse)
- Input sanitization (URL validation)
- File upload scanning (when Storage added)
- HTTPS enforcement (Vercel default)
- Security headers (CSP, X-Frame-Options)

---

## Design Philosophy

### Core Principles

1. **Parent-Friendly First**
   - No JSON editing, no code, no technical jargon
   - Curated presets over free-form chaos
   - Clear labels, helpful tooltips
   - Visual pickers for themes/fonts/colors

2. **Mobile-First Design**
   - Parents use phones to update portfolios
   - Touch-friendly tap targets
   - Responsive forms
   - Fast mobile load times

3. **Casting Director Optimized**
   - Big name, big face, obvious reel
   - Clear credits table
   - Fast page load (under 2 seconds)
   - Professional presentation

4. **Guardrails Over Freedom**
   - Limit color choices to curated palette
   - Prevent layout-breaking changes
   - Enforce character limits
   - Maintain visual consistency

5. **Speed Over Perfection**
   - Get portfolio live in 10 minutes
   - Iterate later
   - Publish → Share → Get feedback

### Visual Design Language

**Inspiration:** Carrd.co (clean, modern, gradient-heavy)

**Color Themes:**
1. **Hollywood Night** - Dark purple/blue gradient
2. **Soft Lilac** - Purple/pink gradient
3. **Warm Slate** - Gray/brown gradient
4. **Teal Stage** - Teal/blue gradient

**Typography:**
- **Headings:** Bold, large (2xl-5xl)
- **Body:** Readable (base-lg)
- **Presets:** Classic (Inter), Rounded (Quicksand), Serif (Playfair), Condensed (Bebas Neue)

**Components:**
- Rounded cards (`rounded-2xl`, `rounded-3xl`)
- Soft shadows (`shadow-lg`, `shadow-xl`)
- Glass morphism effects (backdrop blur)
- Gradient backgrounds

**Responsive Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## Current Implementation Status

### ✅ Completed (MVP)

**Phase 1: Component Library**
- 11 actor page display components
- TypeScript type definitions
- Carrd-style design system
- Tier-based feature gating
- Demo pages (`/demo/free`, `/demo/standard`, `/demo/premium`)
- Production route (`/actor/[slug]`)

**Phase 2: Builder Form**
- 1,150-line visual builder form
- Theme customization (colors, fonts, icons)
- Content editing (all sections)
- Tier enforcement
- Real-time validation
- Builder demo page

**Phase 3: Dashboard System**
- User dashboard (`/dashboard`)
  - List all pages
  - Create new page
  - Edit with builder
  - Publish/unpublish toggle
- Admin dashboard (`/admin`)
  - KPI overview
  - All pages management
  - User management
  - Recent activity tracking

**Phase 4: Database & Auth**
- Supabase integration
- `profiles` table with role support
- `actor_pages` table with JSONB config
- RLS policies (user + admin)
- Auto-profile creation trigger
- Auth middleware

**Infrastructure:**
- Next.js 15 app router
- TypeScript strict mode
- Tailwind CSS
- Deployed to Vercel
- Production database (Supabase)
- Live at `actorpage101.site`

### ⏳ In Progress

None (MVP complete, awaiting feature requests)

### 📋 Backlog (Near-Term)

**High Priority:**
1. **Stripe Integration**
   - Checkout flow
   - Subscription management
   - Webhook handler for tier updates
   - Grace period handling

2. **Image Upload**
   - Supabase Storage integration
   - Direct upload from builder
   - Image optimization
   - CDN delivery

3. **Vimeo Integration**
   - Browse user's Vimeo library
   - Auto-embed normalization
   - Thumbnail extraction

4. **Email Notifications**
   - Publish confirmation
   - Tier upgrade notification
   - Welcome email

**Medium Priority:**
5. SEO optimization (meta tags, Open Graph, Twitter Cards)
6. Analytics dashboard (page views, link clicks)
7. Custom domain support
8. PDF export of actor pages
9. QR code generation

### 🚀 Future Roadmap

**Q1 2026:**
- Stripe billing fully integrated
- Image upload to Supabase Storage
- Email notification system
- SEO meta tags
- Beta testing with 50 users

**Q2 2026:**
- Analytics dashboard
- Custom domain support
- Mobile app (React Native) v1
- Integration with Casting Networks API

**Q3 2026:**
- AI headshot enhancement
- Automated resume parsing
- Template marketplace (5+ new designs)
- Team/agency accounts

**Q4 2026:**
- Integration with Backstage/Actors Access
- Advanced analytics (conversion tracking)
- Referral program
- Multi-language support

---

## Success Metrics

### North Star Metric
**Published Actor Pages** - The primary indicator of value delivery

### Key Performance Indicators (KPIs)

#### Product Metrics
- **Total Actor Pages Created:** Target 500 by Q1 2026
- **Published Pages:** Target 80% publish rate
- **Pages Per User:** Target 1.5 average
- **Time to First Publish:** Target < 15 minutes median

#### Business Metrics
- **Monthly Recurring Revenue (MRR):** Target $5,000 by Q2 2026
- **Conversion Rate (Free → Paid):** Target 15%
- **Churn Rate:** Target < 5% monthly
- **Customer Acquisition Cost (CAC):** Target < $50
- **Lifetime Value (LTV):** Target $500+

#### Engagement Metrics
- **Weekly Active Users (WAU):** Target 60% of total users
- **Builder Form Completion Rate:** Target 70%
- **Average Updates Per Page:** Target 2 per month
- **Page Views Per Actor Page:** Track median

#### Technical Metrics
- **Page Load Time:** Target < 2 seconds (75th percentile)
- **Build Success Rate:** Target 100%
- **Uptime:** Target 99.9%
- **Error Rate:** Target < 0.1%

### Analytics Implementation (Planned)
- PostHog or Mixpanel for product analytics
- Google Analytics for traffic
- Stripe Dashboard for revenue
- Supabase logs for technical metrics

---

## Known Constraints & Guardrails

### Data Model Guardrails

**Constraint:** Do not introduce new normalized tables for public page rendering without formal migration plan.

**Rationale:**
- JSONB in `actor_pages` is single source of truth
- Adding normalized tables creates sync complexity
- Faster to iterate with JSONB schema

**Impact:**
- All new features store data in `config` JSONB
- Query complexity remains low
- May revisit if performance issues emerge

---

### Routing Guardrails

**Constraint:** Use path-based routing (`/actor/[slug]`) until middleware is fully enabled.

**Rationale:**
- Middleware currently pass-through
- Subdomain routing (`{slug}.actorpage101.site`) planned but not ready
- Avoid documenting unimplemented features

**Impact:**
- All product copy uses `/actor/[slug]` format
- Subdomain routing is future work
- No user-facing promises about subdomains

---

### Billing Guardrails

**Constraint:** Never trust client-supplied Stripe price IDs.

**Rationale:**
- Prevent price tampering
- Ensure correct subscription tier mapping
- Security best practice

**Implementation:**
- Server maintains allowlist of valid price IDs
- Checkout endpoint validates against allowlist
- Webhooks update tier, not client redirects

**Environment Variables:**
```env
NEXT_PUBLIC_STRIPE_STANDARD_MONTHLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_STANDARD_YEARLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID=price_...
```

---

### Vimeo Guardrails

**Constraint:** No direct uploads to Vimeo.

**Rationale:**
- Avoid OAuth complexity
- Simpler UX (paste link vs. upload)
- Actors already have Vimeo accounts

**Implementation:**
- Accept pasteable Vimeo links
- Normalize to embed URLs
- Extract video ID
- Store as URL in config

**Impact:**
- No Vimeo API integration for uploads
- No video file handling
- Users must upload to Vimeo separately

---

## Appendix

### A. Route Map (24 Total Routes)

**Public Routes (8):**
- `/` - Marketing homepage
- `/login` - Authentication
- `/signup` - Registration
- `/actor/[slug]` - Public actor pages (published only)
- `/demo/free` - Free tier demo
- `/demo/standard` - Standard tier demo
- `/demo/premium` - Premium tier demo
- `/demo/builder` - Builder form demo

**User Dashboard Routes (12):**
- `/dashboard` - My actor pages list
- `/dashboard/pages/new` - Create new page
- `/dashboard/pages/[id]/edit` - Edit page with builder
- `/dashboard/auditions` - Audition tracker (feature-flagged, future)
- `/dashboard/billing` - Billing management (planned)
- `/dashboard/bio` - Bio editor (placeholder)
- `/dashboard/site` - Site settings (placeholder)
- `/dashboard/media` - Media management (planned)
- `/dashboard/credits` - Credits management (planned)
- `/dashboard/settings` - Account settings (planned)
- `/dashboard/auditions` - Audition tracker (planned)
- `/dashboard/resume` - Resume editor (planned)

**Admin Routes (4):**
- `/admin` - KPI dashboard
- `/admin/pages` - All pages management
- `/admin/users` - User management
- `/admin/layout.tsx` - Admin layout with role check

---

### B. Component Inventory

**Actor Page Components (11):**
1. `ActorPageLayout.tsx` - Main orchestrator (320 lines)
2. `HeroSection.tsx` - Hero section (180 lines)
3. `HeadshotsSection.tsx` - Gallery (120 lines)
4. `ReelsSection.tsx` - Video embeds (140 lines)
5. `BTSSection.tsx` - Behind-the-scenes (100 lines)
6. `ProjectsSection.tsx` - Project gallery (110 lines)
7. `ResumeSections.tsx` - 3 resume variants (250 lines)
8. `ContactSection.tsx` - Contact info (90 lines)
9. `LockedCards.tsx` - Upsell cards (80 lines)
10. `SectionDivider.tsx` - Hashtag dividers (30 lines)
11. `SocialIconRow.tsx` - Social links (60 lines)

**Builder Component:**
- `ActorPageForm.tsx` - Visual builder (1,150 lines)

**Total Lines:** ~2,630 lines of React components

---

### C. Database Migrations

**Migration 003:** `actor_pages` table
- File: `/supabase/migrations/003_actor_pages.sql`
- Creates: Table, indexes, RLS policies, triggers
- Dependencies: Requires `profiles` table (migration 004)

**Migration 004:** `profiles` table and auth
- File: `/supabase/migrations/004_profiles_and_auth.sql`
- Creates: Table, RLS policies, auth trigger, updated_at trigger
- Dependencies: None (must run first)

**Migration Order:**
1. First: 004_profiles_and_auth.sql
2. Second: 003_actor_pages.sql

---

### D. Environment Variables

**Required:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Optional (Stripe - not yet implemented):**
```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_STANDARD_MONTHLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_STANDARD_YEARLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Optional (Vimeo - embed only, no API):**
```env
# Not currently used (paste links only)
VIMEO_ACCESS_TOKEN=...
VIMEO_CLIENT_ID=...
VIMEO_CLIENT_SECRET=...
```

---

### E. Known Issues

**Minor (Non-Blocking):**
- ESLint warnings about `<img>` tags (should use `<Image>`)
- React Hook exhaustive-deps warnings
- MODULE_TYPELESS_PACKAGE_JSON warning

**Status:** All builds passing, no runtime errors

---

### F. Team & Stakeholders

**Development Team:**
- Full-stack developer (Claude AI-assisted)

**Target Stakeholders:**
- Parents of child actors (primary users)
- Acting agents/managers (referral partners)
- Casting directors (end viewers)

---

### G. Competitive Analysis

| Feature | Actor Page 101 | Custom Website | Wix/Squarespace | IMDb | Backstage |
|---------|---------------|----------------|-----------------|------|-----------|
| **Price** | $0-20/mo | $500-2000 one-time | $16-45/mo | Free (limited) | $12/mo |
| **Setup Time** | 10 min | Weeks | Hours | N/A | N/A |
| **Actor-Specific** | ✅ Yes | ❌ Generic | ❌ Generic | ✅ Yes | ✅ Yes |
| **Headshot Gallery** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No | ✅ Limited |
| **Video Reels** | ✅ Vimeo embed | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Resume** | ✅ 3 formats | ✅ Custom | ✅ PDF | ✅ Text | ✅ Yes |
| **Mobile Builder** | ✅ Yes | ❌ No | ⚠️ Partial | N/A | N/A |
| **Custom Domain** | ⏳ Planned | ✅ Yes | ✅ Yes | ❌ No | ❌ No |
| **Parent-Friendly** | ✅ Yes | ❌ No | ⚠️ Partial | ✅ Yes | ⚠️ Partial |

**Competitive Advantage:**
- Lowest cost for paid tiers
- Fastest setup time
- Only solution with parent-friendly mobile builder
- Actor-specific templates and features

---

### H. Technical Debt & Future Refactoring

**Current Technical Debt:**
1. **Image URLs as strings** - Should use Supabase Storage
2. **No input sanitization** - URLs not validated
3. **No rate limiting** - API endpoints unprotected
4. **Placeholder routes** - Empty dashboard pages
5. **No error boundaries** - Could crash on bad data
6. **No loading states** - Forms feel unresponsive

**Refactoring Priorities:**
1. Add Supabase Storage for images (High)
2. Implement input validation (High)
3. Add error boundaries (Medium)
4. Add loading states (Medium)
5. Implement rate limiting (Low)
6. Optimize bundle size (Low)

---

### I. Documentation Links

**Internal Docs:**
- `README.md` - General overview
- `PROGRESS.md` - Detailed development log
- `MIGRATIONS.md` - Database migration guide
- `SETUP.md` - Quick setup guide
- `Guardrails.md` - Development constraints
- `context_Decisions.md` - Architectural decisions
- `/components/actor-page/README.md` - Component library docs
- `/components/actor/README.md` - Legacy component docs

**External Resources:**
- [Supabase Docs](https://supabase.com/docs)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Vimeo API Docs](https://developer.vimeo.com)

---

### J. Release History

**v0.1.0 - MVP Release (November 15, 2025)**
- Initial release with complete component library
- User and admin dashboards
- Database schema with RLS
- Deployed to production at actorpage101.site

**Commits:**
- `7971dfb` - Actor page component library
- `d844c6a` - Builder form with themes
- `bf3980f` - User + Admin dashboards

**Branch:** `claude/actor-page-101-setup-01PSYz9SLdoB5tjktqYnBr7M`

---

## Conclusion

Actor Page 101 is a production-ready MVP SaaS platform that successfully solves the problem of expensive, time-consuming actor portfolio creation. With a parent-friendly visual builder, tier-based pricing, and professional Carrd-style templates, the platform is ready for beta testing and user onboarding.

**Next Immediate Steps:**
1. Run database migrations in production
2. Create first admin user
3. Test full user flow (signup → create → publish)
4. Onboard first 10 beta users
5. Gather feedback and iterate

**Long-term Success Factors:**
- Maintain simplicity and parent-friendliness
- Keep pricing affordable ($0-20/mo)
- Add value through integrations (Stripe, Storage, Analytics)
- Build community of actor families
- Listen to user feedback and iterate rapidly

---

**Document Version:** 1.0
**Last Updated:** November 17, 2025
**Next Review:** December 17, 2025
**Status:** Approved for Beta Testing

# Actor Page 101

A SaaS platform that lets actors (and parents of young actors) quickly create professional actor websites.

## Stack

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Authentication, Database, Storage)
- **Payments**: Stripe
- **Video**: Vimeo API
- **Hosting**: Vercel

## Features

### Core Features (MVP)
- Actor Website Builder with customizable templates
- Bio and profile management
- Photo gallery (headshots)
- Video hosting with Vimeo integration
- Credits management
- Subdomain-based actor sites (`{slug}.actorpage101.site`)

### Subscription Tiers

1. **Free**
   - Basic site template
   - Limited media storage
   - `yourname.actorpage101.site` subdomain

2. **Standard** ($12/mo or $101/year)
   - All templates
   - Vimeo integration
   - Unlimited media
   - Resume import (if Resume101 enabled)

3. **Premium** ($20/mo or $199/year)
   - Everything in Standard
   - Audition tracker (if enabled)
   - Resume101 integration (if enabled)
   - Advanced analytics
   - Priority support

### Optional Feature Flags

Feature flags are controlled per user in their profile:
- `audition_tracker`: Track auditions and callbacks
- `resume101`: Import and sync with Resume101

## Project Structure

```
actorpage101/
├── app/
│   ├── (marketing)/           # Marketing pages (actorpage101.site)
│   ├── (auth)/                # Auth pages (login, signup)
│   ├── (dashboard)/           # Dashboard (app.actorpage101.site)
│   │   └── dashboard/
│   │       ├── page.tsx       # Main dashboard
│   │       ├── site/          # Site settings
│   │       ├── bio/           # Bio editor
│   │       ├── media/         # Photo & video upload
│   │       ├── credits/       # Credits management
│   │       ├── billing/       # Stripe billing
│   │       ├── settings/      # Profile settings
│   │       ├── auditions/     # Audition tracker (feature-flagged)
│   │       └── resume/        # Resume101 integration (feature-flagged)
│   └── (public)/
│       └── site/[slug]/       # Public actor sites
├── components/
│   ├── layout/
│   ├── forms/
│   ├── wizard/
│   ├── template-previews/
│   └── site-builder/
├── lib/
│   ├── supabaseClient.ts      # Supabase client
│   ├── supabaseServer.ts      # Server-side Supabase
│   ├── stripe.ts              # Stripe integration
│   ├── vimeo.ts               # Vimeo API
│   └── featureFlags.ts        # Feature flag utilities
├── types/
│   └── db.ts                  # TypeScript database types
├── supabase/
│   └── schema.sql             # Database schema with RLS
└── middleware.ts              # Subdomain routing
```

## Routing

- **Root domain** (`actorpage101.site`): Marketing site
- **Dashboard** (`app.actorpage101.site`): User dashboard
- **Actor sites** (`{slug}.actorpage101.site`): Public actor websites

The middleware handles subdomain routing automatically.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account
- Vimeo account (optional, for video hosting)

### 1. Clone and Install

```bash
git clone <repository-url>
cd actorpage101
npm install
```

### 2. Environment Variables

Copy the environment template:

```bash
cp .env.local.template .env.local
```

Fill in your environment variables in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
# Allowlisted price IDs used by the server (must match your Stripe dashboard)
NEXT_PUBLIC_STRIPE_STANDARD_MONTHLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_STANDARD_YEARLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Vimeo (optional)
VIMEO_ACCESS_TOKEN=...
VIMEO_CLIENT_ID=...
VIMEO_CLIENT_SECRET=...

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DASHBOARD_URL=http://localhost:3000
```

### 3. Set Up Supabase

1. Create a new Supabase project
2. Run the schema in the SQL editor:

```bash
cat supabase/schema.sql
```

Copy the contents and paste into Supabase SQL Editor, then execute.

3. Configure Supabase Authentication:
   - Enable Email/Password authentication
   - Set up email templates
   - Configure redirect URLs

### 4. Set Up Stripe

1. Create products and prices in Stripe Dashboard:
   - Standard Plan: $12/month or $101/year
   - Premium Plan: $20/month or $199/year

2. Copy the price IDs to your `.env.local`

3. Set up webhooks for subscription events

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the marketing site.

### 6. Testing Subdomains Locally

To test subdomain routing locally, you'll need to modify your `/etc/hosts` file:

```
127.0.0.1 actorpage101.site
127.0.0.1 app.actorpage101.site
127.0.0.1 test.actorpage101.site
```

Then visit:
- `http://actorpage101.site:3000` - Marketing
- `http://app.actorpage101.site:3000` - Dashboard
- `http://test.actorpage101.site:3000` - Test actor site

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Configure custom domain: `actorpage101.site`
5. Enable wildcard subdomain support in Vercel DNS

### Domain Configuration

In your DNS provider:
- Add A record for `actorpage101.site` pointing to Vercel
- Add CNAME for `*.actorpage101.site` pointing to Vercel

## Database Schema

The complete database schema is in `supabase/schema.sql` and includes:

**Core Tables**:
- `profiles`: User profiles with subscription tier and feature flags
- `sites`: Actor site settings (slug, template, colors)
- `bio`: Actor bio information
- `photos`: Headshots and gallery images
- `videos`: Video embeds and Vimeo IDs
- `credits`: Acting credits

**Feature-Flagged Tables**:
- `auditions`: Audition tracking (requires `audition_tracker` flag)
- `resume_data`: Resume101 imports (requires `resume101` flag)

All tables have Row Level Security (RLS) enabled to ensure users can only access their own data.

## Key Concepts

### Feature Flags

Feature flags are stored in `profiles.feature_flags` as a JSONB field:

```json
{
  "audition_tracker": false,
  "resume101": false
}
```

Use the `featureFlags.ts` utilities to check feature access:

```typescript
import { hasFeatureAccess } from '@/lib/featureFlags';

if (hasFeatureAccess(profile, 'audition_tracker')) {
  // Show audition tracker
}
```

### Subscription Tiers

Subscription tiers are managed through Stripe and synced to `profiles.subscription_tier`:
- `free`: Default tier
- `standard`: $12/mo or $101/year
- `premium`: $20/mo or $199/year

### Actor Sites

Current production routing uses path-based pages at `/actor/[slug]`. Subdomain routing (`{slug}.actorpage101.site`) is planned for a future update once middleware is enabled.

## Next Steps

1. **Implement Authentication Flow**
   - Connect Supabase Auth to login/signup pages
   - Add protected routes middleware
   - Create onboarding wizard

2. **Build Site Templates**
   - Create 3-5 actor site templates
   - Add template preview component
   - Implement template switching

3. **Media Upload**
   - Connect Supabase Storage
   - Add image upload component
   - Integrate Vimeo API

4. **Stripe Integration**
   - Add checkout flow
   - Implement subscription management
   - Set up webhook handlers

5. **Feature Development**
   - Complete all dashboard pages
   - Add feature-flagged functionality
   - Build public site rendering

## Contributing

This is a private SaaS project. Contributions are managed internally.

## License

Proprietary - All rights reserved

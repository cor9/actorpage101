# Actor Page Component Library

Complete Carrd-style actor portfolio system with tier-based features (Free, Standard, Premium).

## Components

All components are located in `/components/actor-page/`:

- **`ActorPageLayout.tsx`** - Main layout component that orchestrates all sections
- **`HeroSection.tsx`** - Hero section with headshot, name, bio, socials, and reps
- **`HeadshotsSection.tsx`** - Headshot gallery with tier-based limits
- **`ReelsSection.tsx`** - Vimeo video reels/clips with tier-based limits
- **`BTSSection.tsx`** - Behind-the-scenes photo albums (Standard/Premium only)
- **`ProjectsSection.tsx`** - Project gallery with posters (Premium only)
- **`ResumeSections.tsx`** - Three resume components (Free/Standard/Premium)
- **`ContactSection.tsx`** - Contact info and rep display
- **`LockedCards.tsx`** - Upsell cards showing locked features
- **`SectionDivider.tsx`** - Hashtag-style section dividers
- **`SocialIconRow.tsx`** - Social media links with icons
- **`types.ts`** - Complete TypeScript definitions

## Tier Features

### Free
- Simple hero (name, headshot, basic info)
- Up to 3 headshots
- 1 reel
- External resume link only
- Parent email contact
- Upsell cards for premium features

### Standard
- Full hero with brand line, casting type, union, reps
- Up to 12 headshots (flat grid)
- Up to 4 reels
- BTS preview (6 images)
- PDF resume viewer
- Rep contact info
- Upsell cards for Premium

### Premium
- Cinematic hero layout
- Unlimited headshots with gallery tabs
- Unlimited reels
- Full BTS albums
- Project gallery (Film/TV/Theatre)
- Structured resume + PDF download
- No locked cards (full experience)

## Demo Pages

Visit these URLs to see the tiers in action:

- `/demo/free` - Free tier demo
- `/demo/standard` - Standard tier demo
- `/demo/premium` - Premium tier demo

## Production Usage with Supabase

### Database Schema

Run the migration in `/supabase/migrations/003_actor_pages.sql`:

\`\`\`sql
create table public.actor_pages (
  id uuid primary key,
  user_id uuid references profiles(id),
  slug text unique not null,
  tier text check (tier in ('free', 'standard', 'premium')),
  template_id text,
  config jsonb not null,
  is_published boolean default false,
  created_at timestamptz,
  updated_at timestamptz
);
\`\`\`

### Saving a Page

\`\`\`typescript
const config: ActorPageConfig = {
  tier: 'standard',
  templateId: 'standard-showcase',
  hero: {
    name: 'Jordan Avery',
    headshotUrl: 'https://...',
    // ... rest of config
  },
  // ... all other sections
};

await supabase
  .from('actor_pages')
  .insert({
    user_id: userId,
    slug: 'jordan-avery',
    tier: 'standard',
    template_id: 'standard-showcase',
    config: config,
    is_published: true,
  });
\`\`\`

### Loading a Page

See `/app/actor/[slug]/page.tsx` for the complete implementation:

\`\`\`typescript
const { data } = await supabase
  .from('actor_pages')
  .select('tier, template_id, config')
  .eq('slug', slug)
  .eq('is_published', true)
  .single();

const config = data.config as ActorPageConfig;
config.tier = data.tier;

return <ActorPageLayout config={config} />;
\`\`\`

## Builder Integration

Your builder UI should:

1. Load the user's current `ActorPageConfig` from Supabase
2. Provide form inputs for each section (hero, headshots, reels, etc.)
3. Enforce tier limits (e.g., max 3 headshots for Free)
4. Save the complete config object back to the `config` JSONB column
5. Set `is_published` when the actor publishes their site

## URL Structure

- **Demo**: `/demo/[tier]` - Hardcoded examples
- **Production**: `/actor/[slug]` - Real Supabase-backed pages
- **Or use**: `/{slug}` - Direct slug routing (requires middleware)

## Styling

All components use Tailwind CSS with:
- Dark gradient backgrounds (`from-slate-900 via-indigo-900 to-slate-950`)
- Rounded cards (`rounded-2xl`, `rounded-3xl`)
- Slate color palette for cards and borders
- Indigo accents for CTAs and highlights
- Responsive grid layouts

## Development

\`\`\`bash
# View demos locally
npm run dev

# Visit:
http://localhost:3000/demo/free
http://localhost:3000/demo/standard
http://localhost:3000/demo/premium
\`\`\`

## Next Steps

1. Run the Supabase migration to create the `actor_pages` table
2. Build your dashboard UI to let actors edit their `ActorPageConfig`
3. Implement tier enforcement in your builder (e.g., disable uploads beyond tier limits)
4. Add image upload to Supabase Storage
5. Integrate Vimeo API for video management
6. Set up Stripe webhooks to update user tier on subscription changes

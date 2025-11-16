# Unified Actor Page System

A clean, casting-friendly actor portfolio layout with three plan tiers: Free, Standard, and Premium.

## Overview

This is a **single unified component system** that adapts based on plan tier. Not three separate codebases.

- **Free**: Minimal, clean portfolio (Astrofy-inspired)
- **Standard**: Full portfolio with enhanced styling (Realstoman-inspired)
- **Premium**: Cinematic presentation with highlights (Lume-inspired)

## Usage

### Basic Implementation

```tsx
import { ActorPageLayout } from '@/components/actor';

export default function ActorPage() {
  return (
    <ActorPageLayout
      plan="standard"
      profile={{
        displayName: 'Alex Morgan',
        tagline: 'Young Actor | Singer | Dancer',
        bio: '...',
        location: 'Los Angeles, CA',
        ageRange: '10-12',
        unionStatus: 'SAG-AFTRA',
      }}
      photos={[...]}
      reels={[...]}
      credits={[...]}
      links={[...]}
      theme="classic-dark"
    />
  );
}
```

### With Supabase (Future)

```tsx
import { mapDbToActorPageLayout } from '@/lib/actorPageMapper';

export default async function ActorPage({ params }: { params: { slug: string } }) {
  // TODO: Fetch from Supabase
  const data = await getActorSiteBySlug(params.slug);

  if (!data) return <NotFound />;

  return <ActorPageLayout {...data} />;
}
```

## Plan Features

### Free Plan
- **Hero**: Flat background, basic styling
- **Photos**: 1 primary + 2 gallery (3 total)
- **Reels**: 1 reel max
- **Credits**: 5 credits max
- **Bio**: Hidden (just tagline)

### Standard Plan
- **Hero**: Soft gradient background, larger name, bio visible
- **Photos**: 1 primary + 5 gallery (6 total)
- **Reels**: 4 reels max
- **Credits**: 20 credits max
- **Bio**: Visible

### Premium Plan
- **Hero**: Cinematic gradient with ring effect on headshot
- **Photos**: 1 primary + 10 gallery (11 total)
- **Reels**: Unlimited (within reason)
- **Credits**: Unlimited, categorized by Film/TV/Theatre/Voiceover
- **Highlights**: Special section showcasing top 3 credits
- **Bio**: Visible

## Components

All components are in `components/actor/`:

- `ActorPageLayout.tsx` - Main orchestrator
- `HeroSection.tsx` - Name, headshot, tagline, chips
- `LinksRow.tsx` - Horizontal scrolling links
- `ReelsSection.tsx` - Vimeo/YouTube embeds
- `CreditsSection.tsx` - Credits table (categorized for Premium)
- `PhotoGallery.tsx` - Responsive photo grid
- `HighlightsSection.tsx` - Premium-only feature highlights
- `ActorFooter.tsx` - Copyright + branding

## Themes

Two themes supported:
- `classic-light` - Light mode (slate grays on white)
- `classic-dark` - Dark mode (whites on slate-950)

Theme is applied consistently across all sections.

## Demo Pages

Visit `/demo-plans` to compare all three tiers:
- `/demo-plans/free` - Free plan demo
- `/[slug]` - Standard plan demo (default)
- `/demo-plans/premium` - Premium plan demo

## Data Mapping

Use `lib/actorPageMapper.ts` to convert Supabase rows to component props.

### Plan Limits Enforcement

Photo limits are enforced in the mapper. Reel and credit limits are enforced in their respective components (allows passing more data than will be shown, useful for upgrade prompts).

## Styling Philosophy

- **Mobile-first**: Works great on phones (where parents use it)
- **Casting-friendly**: Big name, big face, obvious reel, clear credits
- **Clean typography**: No dashboard vibes, no form aesthetics
- **Accessible**: Semantic HTML, proper alt text, keyboard navigation

## Next Steps

1. ✅ Components built
2. ✅ Demo pages created
3. ✅ Mapper scaffolded
4. ⏳ Wire up Supabase queries
5. ⏳ Add image upload to Supabase Storage
6. ⏳ Build form for editing actor data
7. ⏳ Connect to billing for plan enforcement

---

Built with Next.js 15, TypeScript, and Tailwind CSS.

import type {
  ActorPageLayoutProps,
  Plan,
  ActorProfile,
  ActorPhoto,
  ActorReel,
  ActorCredit,
  ActorLink,
} from '@/components/actor/ActorPageLayout';

// Placeholder types for Supabase database rows
// TODO: Update these to match your actual Supabase schema

export interface DbActorSite {
  id: string;
  user_id: string;
  slug: string;
  plan: Plan;
  theme?: 'classic-light' | 'classic-dark';
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbActorProfile {
  id: string;
  site_id: string;
  display_name: string;
  tagline?: string | null;
  bio?: string | null;
  location?: string | null;
  age_range?: string | null;
  union_status?: string | null;
}

export interface DbActorPhoto {
  id: string;
  site_id: string;
  url: string;
  alt?: string | null;
  is_primary: boolean;
  sort_order: number;
}

export interface DbActorReel {
  id: string;
  site_id: string;
  title?: string | null;
  platform: 'vimeo' | 'youtube' | 'other';
  video_id?: string | null;
  embed_url?: string | null;
  sort_order: number;
}

export interface DbActorCredit {
  id: string;
  site_id: string;
  category: 'Film' | 'TV' | 'Theatre' | 'Voiceover' | 'Other';
  project: string;
  role?: string | null;
  director?: string | null;
  year?: number | null;
  sort_order: number;
}

export interface DbActorLink {
  id: string;
  site_id: string;
  label: string;
  url: string;
  type?: 'casting' | 'social' | 'rep' | 'website' | 'other';
  sort_order: number;
}

/**
 * Maps database rows to ActorPageLayout props
 * Enforces plan-based limits at the data layer
 */
export function mapDbToActorPageLayout(
  site: DbActorSite,
  profileRow: DbActorProfile,
  photos: DbActorPhoto[],
  reels: DbActorReel[],
  credits: DbActorCredit[],
  links: DbActorLink[]
): ActorPageLayoutProps {
  const plan = site.plan;

  // Map profile
  const profile: ActorProfile = {
    displayName: profileRow.display_name,
    tagline: profileRow.tagline || undefined,
    bio: profileRow.bio || undefined,
    location: profileRow.location || undefined,
    ageRange: profileRow.age_range || undefined,
    unionStatus: profileRow.union_status || undefined,
  };

  // Map photos (sorted by sort_order)
  const mappedPhotos: ActorPhoto[] = photos
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(p => ({
      id: p.id,
      url: p.url,
      alt: p.alt || undefined,
      isPrimary: p.is_primary,
    }));

  // Enforce photo limits based on plan
  // Free: 1 primary + 2 gallery = 3 total
  // Standard: 1 primary + 5 gallery = 6 total
  // Premium: 1 primary + 10 gallery = 11 total
  const maxTotalPhotos = getMaxTotalPhotos(plan);
  const limitedPhotos = enforcePrimaryPhoto(mappedPhotos).slice(0, maxTotalPhotos);

  // Map reels (sorted by sort_order)
  const mappedReels: ActorReel[] = reels
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(r => ({
      id: r.id,
      title: r.title || undefined,
      platform: r.platform,
      videoId: r.video_id || undefined,
      embedUrl: r.embed_url || undefined,
    }));

  // Note: Reel limits are enforced in ReelsSection component
  // Free: 1, Standard: 4, Premium: unlimited

  // Map credits (sorted by sort_order)
  const mappedCredits: ActorCredit[] = credits
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(c => ({
      id: c.id,
      category: c.category,
      project: c.project,
      role: c.role || undefined,
      director: c.director || undefined,
      year: c.year || undefined,
    }));

  // Note: Credit limits are enforced in CreditsSection component
  // Free: 5, Standard: 20, Premium: unlimited

  // Map links (sorted by sort_order)
  const mappedLinks: ActorLink[] = links
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(l => ({
      label: l.label,
      url: l.url,
      type: l.type,
    }));

  return {
    plan,
    profile,
    photos: limitedPhotos,
    reels: mappedReels,
    credits: mappedCredits,
    links: mappedLinks,
    theme: site.theme || 'classic-dark',
  };
}

/**
 * Get maximum total photos allowed per plan
 */
function getMaxTotalPhotos(plan: Plan): number {
  if (plan === 'free') return 3; // 1 primary + 2 gallery
  if (plan === 'standard') return 6; // 1 primary + 5 gallery
  return 11; // premium: 1 primary + 10 gallery
}

/**
 * Ensures exactly one photo is marked as primary
 * If multiple are marked primary, keeps the first one
 * If none are marked primary, marks the first photo as primary
 */
function enforcePrimaryPhoto(photos: ActorPhoto[]): ActorPhoto[] {
  if (photos.length === 0) return photos;

  const primaryCount = photos.filter(p => p.isPrimary).length;

  if (primaryCount === 0) {
    // No primary set - make first photo primary
    return photos.map((p, idx) => ({
      ...p,
      isPrimary: idx === 0,
    }));
  } else if (primaryCount === 1) {
    // Exactly one primary - perfect
    return photos;
  } else {
    // Multiple primaries - keep only the first one
    let foundPrimary = false;
    return photos.map(p => {
      if (p.isPrimary && !foundPrimary) {
        foundPrimary = true;
        return p;
      }
      return { ...p, isPrimary: false };
    });
  }
}

/**
 * TODO: Add Supabase query functions when ready
 *
 * Example:
 *
 * export async function getActorSiteBySlug(slug: string) {
 *   const { data, error } = await supabase
 *     .from('actor_sites')
 *     .select(`
 *       *,
 *       profile:actor_profiles(*),
 *       photos:actor_photos(*),
 *       reels:actor_reels(*),
 *       credits:actor_credits(*),
 *       links:actor_links(*)
 *     `)
 *     .eq('slug', slug)
 *     .eq('is_published', true)
 *     .single();
 *
 *   if (error || !data) return null;
 *
 *   return mapDbToActorPageLayout(
 *     data,
 *     data.profile,
 *     data.photos,
 *     data.reels,
 *     data.credits,
 *     data.links
 *   );
 * }
 */

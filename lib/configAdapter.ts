/**
 * Adapter to convert old ActorPageConfig (JSONB) to new ActorPageLayoutProps
 * This allows us to use the new unified layout with existing data
 */

import type { ActorPageConfig } from '@/components/actor-page/types';
import type {
  ActorPageLayoutProps,
  Plan,
  ActorProfile,
  ActorPhoto,
  ActorReel,
  ActorCredit,
  ActorLink,
} from '@/components/actor/ActorPageLayout';

export function adaptOldConfigToNew(config: ActorPageConfig): ActorPageLayoutProps {
  // Map tier to plan
  const plan: Plan = config.tier;

  // Map hero to profile
  const profile: ActorProfile = {
    displayName: config.hero.name,
    tagline: config.hero.brandLine || undefined,
    bio: config.hero.castingType || undefined,
    location: config.hero.location || undefined,
    ageRange: config.hero.ageRange || undefined,
    unionStatus: config.hero.unionStatus || undefined,
  };

  // Map headshots to photos
  const photos: ActorPhoto[] = [];

  // Add hero headshot as primary
  if (config.hero.headshotUrl) {
    photos.push({
      id: 'hero-headshot',
      url: config.hero.headshotUrl,
      alt: `${config.hero.name} headshot`,
      isPrimary: true,
    });
  }

  // Add gallery images
  if (config.headshots?.galleries) {
    config.headshots.galleries.forEach((gallery, galleryIdx) => {
      gallery.images.forEach((img, imgIdx) => {
        photos.push({
          id: `gallery-${galleryIdx}-${imgIdx}`,
          url: img.url,
          alt: img.alt || `${gallery.label} photo`,
          isPrimary: false,
        });
      });
    });
  }

  // Map reels
  const reels: ActorReel[] = (config.reels?.items || []).map((reel, idx) => ({
    id: reel.id || `reel-${idx}`,
    title: reel.title || undefined,
    platform: 'vimeo',
    videoId: extractVimeoId(reel.vimeoUrl),
    embedUrl: undefined,
  }));

  // Map projects to credits
  const credits: ActorCredit[] = (config.projects?.items || []).map((project, idx) => ({
    id: project.id || `credit-${idx}`,
    category: mapMediumToCategory(project.medium),
    project: project.title,
    role: project.role || undefined,
    director: undefined,
    year: project.year ? parseInt(project.year) : undefined,
  }));

  // Map social links and reps to links
  const links: ActorLink[] = [];

  // Add social links
  if (config.hero.socialLinks) {
    config.hero.socialLinks.forEach((social) => {
      links.push({
        label: social.platform === 'other' ? (social.label || 'Link') : capitalizeFirst(social.platform),
        url: social.url,
        type: social.platform === 'imdb' ? 'casting' : 'social',
      });
    });
  }

  // Add rep links
  if (config.hero.reps) {
    config.hero.reps.forEach((rep) => {
      links.push({
        label: `${rep.label}: ${rep.company}`,
        url: rep.email ? `mailto:${rep.email}` : '#',
        type: 'rep',
      });
    });
  }

  // Determine theme based on old theme config
  const theme = config.theme?.themeId === 'soft_lilac' || config.theme?.themeId === 'warm_slate'
    ? 'classic-light'
    : 'classic-dark';

  return {
    plan,
    profile,
    photos,
    reels,
    credits,
    links,
    theme,
  };
}

// Helper: Extract Vimeo ID from URL
function extractVimeoId(url: string): string | undefined {
  if (!url) return undefined;

  const patterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  // If it's just digits, treat as ID
  if (/^\d+$/.test(url.trim())) {
    return url.trim();
  }

  return undefined;
}

// Helper: Map old medium types to new categories
function mapMediumToCategory(
  medium: 'film' | 'tv' | 'theatre' | 'commercial' | 'other'
): 'Film' | 'TV' | 'Theatre' | 'Voiceover' | 'Other' {
  switch (medium) {
    case 'film':
      return 'Film';
    case 'tv':
      return 'TV';
    case 'theatre':
      return 'Theatre';
    case 'commercial':
      return 'Other';
    default:
      return 'Other';
  }
}

// Helper: Capitalize first letter
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert new ActorPageLayoutProps back to old ActorPageConfig for database storage
 */
export function adaptNewConfigToOld(
  props: ActorPageLayoutProps
): Partial<ActorPageConfig> {
  // Find primary photo
  const primaryPhoto = props.photos.find(p => p.isPrimary) || props.photos[0];

  // Separate non-primary photos into galleries
  const galleryPhotos = props.photos.filter(p => !p.isPrimary);

  // Convert reels
  const reels = props.reels.map(reel => ({
    id: reel.id,
    title: reel.title || '',
    vimeoUrl: reel.videoId ? `https://vimeo.com/${reel.videoId}` : (reel.embedUrl || ''),
    projectLabel: undefined,
  }));

  // Convert credits to projects
  const projects = props.credits.map(credit => ({
    id: credit.id,
    title: credit.project,
    role: credit.role || '',
    year: credit.year?.toString(),
    medium: mapCategoryToMedium(credit.category),
    platformOrCompany: undefined,
    posterUrl: undefined,
    description: undefined,
  }));

  // Convert links to social links and reps
  const socialLinks: any[] = [];
  const reps: any[] = [];

  props.links.forEach(link => {
    if (link.type === 'rep') {
      reps.push({
        label: link.label.split(':')[0] || 'Representative',
        company: link.label.split(':')[1]?.trim() || link.label,
        email: link.url.startsWith('mailto:') ? link.url.replace('mailto:', '') : undefined,
      });
    } else {
      socialLinks.push({
        platform: mapLinkTypeToSocialPlatform(link),
        url: link.url,
        label: link.label,
      });
    }
  });

  return {
    tier: props.plan,
    theme: {
      themeId: props.theme === 'classic-light' ? 'soft_lilac' : 'hollywood_night',
      headingFont: 'classic',
      bodyFont: 'classic',
      iconStyle: 'circle',
      extrasEnabled: [],
    },
    hero: {
      name: props.profile.displayName,
      headshotUrl: primaryPhoto?.url || '',
      ageRange: props.profile.ageRange,
      location: props.profile.location,
      brandLine: props.profile.tagline,
      castingType: props.profile.bio,
      unionStatus: props.profile.unionStatus,
      recentCredits: undefined,
      socialLinks,
      reps: reps.length > 0 ? reps : undefined,
    },
    headshots: {
      galleries: galleryPhotos.length > 0 ? [{
        id: 'main',
        label: 'Gallery',
        images: galleryPhotos.map(p => ({
          id: p.id,
          url: p.url,
          alt: p.alt,
        })),
      }] : [],
    },
    reels: {
      items: reels,
    },
    projects: {
      items: projects,
    },
    resume: {
      mode: 'external_link',
    },
    contact: {
      parentEmail: '',
      showReps: reps.length > 0,
    },
  };
}

// Helper: Map new category back to old medium
function mapCategoryToMedium(
  category: 'Film' | 'TV' | 'Theatre' | 'Voiceover' | 'Other'
): 'film' | 'tv' | 'theatre' | 'commercial' | 'other' {
  switch (category) {
    case 'Film':
      return 'film';
    case 'TV':
      return 'tv';
    case 'Theatre':
      return 'theatre';
    case 'Voiceover':
      return 'commercial';
    default:
      return 'other';
  }
}

// Helper: Map link type to social platform
function mapLinkTypeToSocialPlatform(link: ActorLink): SocialPlatform {
  const labelLower = link.label.toLowerCase();

  if (labelLower.includes('imdb')) return 'imdb';
  if (labelLower.includes('instagram')) return 'instagram';
  if (labelLower.includes('youtube')) return 'youtube';
  if (labelLower.includes('tiktok')) return 'tiktok';
  if (labelLower.includes('email') || link.url.startsWith('mailto:')) return 'email';
  if (link.type === 'website') return 'website';

  return 'other';
}

// Import social platform type
type SocialPlatform = 'instagram' | 'youtube' | 'tiktok' | 'imdb' | 'email' | 'website' | 'other';

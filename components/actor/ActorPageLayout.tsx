import React from 'react';
import { HeroSection } from './HeroSection';
import { LinksRow } from './LinksRow';
import { ReelsSection } from './ReelsSection';
import { CreditsSection } from './CreditsSection';
import { PhotoGallery } from './PhotoGallery';
import { HighlightsSection } from './HighlightsSection';
import { ActorFooter } from './ActorFooter';

export type Plan = 'free' | 'standard' | 'premium';

export interface ActorLink {
  label: string;
  url: string;
  type?: 'casting' | 'social' | 'rep' | 'website' | 'other';
}

export interface ActorReel {
  id: string;
  title?: string | null;
  platform: 'vimeo' | 'youtube' | 'other';
  videoId?: string | null;  // for vimeo/youtube
  embedUrl?: string | null; // fallback for other
}

export interface ActorCredit {
  id: string;
  category: 'Film' | 'TV' | 'Theatre' | 'Voiceover' | 'Other';
  project: string;
  role?: string | null;
  director?: string | null;
  year?: number | null;
}

export interface ActorPhoto {
  id: string;
  url: string;
  alt?: string | null;
  isPrimary?: boolean;
}

export interface ActorProfile {
  displayName: string;
  tagline?: string | null;
  bio?: string | null;
  location?: string | null;
  ageRange?: string | null;
  unionStatus?: string | null;
}

export interface ActorPageLayoutProps {
  plan: Plan;
  profile: ActorProfile;
  photos: ActorPhoto[];
  reels: ActorReel[];
  credits: ActorCredit[];
  links: ActorLink[];
  theme?: 'classic-light' | 'classic-dark';
}

export const ActorPageLayout: React.FC<ActorPageLayoutProps> = ({
  plan,
  profile,
  photos,
  reels,
  credits,
  links,
  theme = 'classic-dark',
}) => {
  // Base theme classes
  const themeClasses = theme === 'classic-light'
    ? 'bg-slate-50 text-slate-900'
    : 'bg-slate-950 text-slate-50';

  return (
    <div className={`min-h-screen ${themeClasses}`}>
      <HeroSection plan={plan} profile={profile} photos={photos} theme={theme} />

      {links.length > 0 && (
        <LinksRow links={links} theme={theme} />
      )}

      {reels.length > 0 && (
        <ReelsSection plan={plan} reels={reels} theme={theme} />
      )}

      {credits.length > 0 && (
        <CreditsSection plan={plan} credits={credits} theme={theme} />
      )}

      {photos.filter(p => !p.isPrimary).length > 0 && (
        <PhotoGallery plan={plan} photos={photos} profile={profile} theme={theme} />
      )}

      {plan === 'premium' && credits.length > 0 && (
        <HighlightsSection credits={credits} theme={theme} />
      )}

      <ActorFooter profile={profile} theme={theme} />
    </div>
  );
};

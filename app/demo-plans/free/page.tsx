import React from 'react';
import { ActorPageLayout, type ActorPageLayoutProps } from '@/components/actor/ActorPageLayout';

const freeDemo: ActorPageLayoutProps = {
  plan: 'free',
  theme: 'classic-dark',
  profile: {
    displayName: 'Jamie Chen',
    tagline: 'Young Actor',
    location: 'New York, NY',
    ageRange: '8-10',
  },
  photos: [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1000&fit=crop',
      isPrimary: true,
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=1000&fit=crop',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
    },
  ],
  reels: [
    {
      id: 'reel1',
      title: 'Demo Reel 2024',
      platform: 'vimeo',
      videoId: '76979871',
    },
    {
      id: 'reel2',
      title: 'This will not show (Free plan: 1 reel max)',
      platform: 'vimeo',
      videoId: '148751763',
    },
  ],
  credits: [
    {
      id: 'c1',
      category: 'TV',
      project: 'Kids Show',
      role: 'Guest Star',
      year: 2024,
    },
    {
      id: 'c2',
      category: 'Theatre',
      project: 'School Musical',
      role: 'Ensemble',
      year: 2023,
    },
    {
      id: 'c3',
      category: 'Film',
      project: 'Student Film',
      role: 'Supporting',
      year: 2023,
    },
    {
      id: 'c4',
      category: 'Other',
      project: 'National Commercial',
      role: 'Principal',
      year: 2022,
    },
    {
      id: 'c5',
      category: 'Theatre',
      project: 'Community Theatre',
      role: 'Ensemble',
      year: 2022,
    },
    {
      id: 'c6',
      category: 'Film',
      project: 'This will not show (Free: 5 credits max)',
      year: 2021,
    },
  ],
  links: [
    {
      label: 'IMDb',
      url: 'https://www.imdb.com',
      type: 'casting',
    },
  ],
};

export default function FreePlanDemo() {
  return <ActorPageLayout {...freeDemo} />;
}

export const metadata = {
  title: 'Free Plan Demo - Actor Page 101',
  description: 'See what the Free plan looks like',
};

import React from 'react';
import { ActorPageLayout, type ActorPageLayoutProps } from '@/components/actor/ActorPageLayout';

const premiumDemo: ActorPageLayoutProps = {
  plan: 'premium',
  theme: 'classic-light',
  profile: {
    displayName: 'Sofia Rodriguez',
    tagline: 'Award-Winning Young Performer',
    bio: 'Sofia is an accomplished young actor with credits spanning film, television, and Broadway. With training from the renowned Young Actors Studio and representation by top talent agencies, Sofia brings depth, authenticity, and professionalism to every project.',
    location: 'Los Angeles, CA',
    ageRange: '12-14',
    unionStatus: 'SAG-AFTRA, AEA',
  },
  photos: [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop',
      isPrimary: true,
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1000&fit=crop',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=1000&fit=crop',
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1000&fit=crop',
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=1000&fit=crop',
    },
    {
      id: '7',
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=1000&fit=crop',
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
      title: 'Drama Scenes',
      platform: 'vimeo',
      videoId: '148751763',
    },
    {
      id: 'reel3',
      title: 'Comedy Reel',
      platform: 'vimeo',
      videoId: '148751763',
    },
    {
      id: 'reel4',
      title: 'Theatre Highlights',
      platform: 'vimeo',
      videoId: '76979871',
    },
    {
      id: 'reel5',
      title: 'Commercial Work',
      platform: 'vimeo',
      videoId: '148751763',
    },
  ],
  credits: [
    {
      id: 'c1',
      category: 'Film',
      project: 'The Last Summer',
      role: 'Leading - Emma',
      director: 'Jennifer Martinez',
      year: 2024,
    },
    {
      id: 'c2',
      category: 'TV',
      project: 'City Hospital',
      role: 'Recurring - Young Patient',
      director: 'Michael Brown',
      year: 2024,
    },
    {
      id: 'c3',
      category: 'Film',
      project: 'Brave Hearts',
      role: 'Supporting - Lily',
      director: 'Sarah Johnson',
      year: 2023,
    },
    {
      id: 'c4',
      category: 'Theatre',
      project: 'Hamilton (Broadway)',
      role: 'Young Company',
      director: 'Thomas Kail',
      year: 2023,
    },
    {
      id: 'c5',
      category: 'TV',
      project: 'The Family',
      role: 'Series Regular - Daughter',
      year: 2022,
    },
    {
      id: 'c6',
      category: 'Film',
      project: 'Wonder Kids',
      role: 'Co-Star',
      director: 'David Lee',
      year: 2022,
    },
    {
      id: 'c7',
      category: 'Theatre',
      project: 'Matilda the Musical',
      role: 'Matilda',
      year: 2021,
    },
    {
      id: 'c8',
      category: 'Voiceover',
      project: 'Animated Adventures',
      role: 'Lead Voice',
      year: 2023,
    },
    {
      id: 'c9',
      category: 'TV',
      project: 'Young Genius',
      role: 'Guest Star',
      year: 2021,
    },
    {
      id: 'c10',
      category: 'Film',
      project: 'School Days',
      role: 'Supporting',
      director: 'Amy Chen',
      year: 2020,
    },
  ],
  links: [
    {
      label: 'IMDb',
      url: 'https://www.imdb.com',
      type: 'casting',
    },
    {
      label: 'Actors Access',
      url: 'https://www.actorsaccess.com',
      type: 'casting',
    },
    {
      label: 'Instagram',
      url: 'https://www.instagram.com',
      type: 'social',
    },
    {
      label: 'TikTok',
      url: 'https://www.tiktok.com',
      type: 'social',
    },
    {
      label: 'Represented by Elite Talent Agency',
      url: 'https://example.com',
      type: 'rep',
    },
    {
      label: 'Personal Website',
      url: 'https://example.com',
      type: 'website',
    },
  ],
};

export default function PremiumPlanDemo() {
  return <ActorPageLayout {...premiumDemo} />;
}

export const metadata = {
  title: 'Premium Plan Demo - Actor Page 101',
  description: 'See what the Premium plan looks like with all features',
};

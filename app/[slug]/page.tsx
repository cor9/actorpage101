import React from 'react';
import { ActorPageLayout, type ActorPageLayoutProps } from '@/components/actor/ActorPageLayout';

// Mock data for demonstration
const mockActorData: ActorPageLayoutProps = {
  plan: 'standard',
  theme: 'classic-dark',
  profile: {
    displayName: 'Alex Morgan',
    tagline: 'Young Actor | Singer | Dancer',
    bio: 'Alex is a talented young performer with experience in film, television, and theatre. Known for bringing authenticity and energy to every role, Alex has worked with renowned directors and starred in multiple award-winning productions.',
    location: 'Los Angeles, CA',
    ageRange: '10-12',
    unionStatus: 'SAG-AFTRA',
  },
  photos: [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1000&fit=crop',
      alt: 'Professional headshot',
      isPrimary: true,
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=1000&fit=crop',
      alt: 'Character shot',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
      alt: 'Action shot',
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop',
      alt: 'Candid shot',
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
      title: 'Comedy Scenes',
      platform: 'vimeo',
      videoId: '148751763',
    },
    {
      id: 'reel3',
      title: 'Dramatic Monologue',
      platform: 'vimeo',
      videoId: '148751763',
    },
  ],
  credits: [
    {
      id: 'c1',
      category: 'Film',
      project: 'Summer Dreams',
      role: 'Leading Role - Jamie',
      director: 'Sarah Johnson',
      year: 2024,
    },
    {
      id: 'c2',
      category: 'TV',
      project: 'The Family Next Door',
      role: 'Recurring - Chris Parker',
      director: 'Michael Chen',
      year: 2023,
    },
    {
      id: 'c3',
      category: 'Film',
      project: 'Mystery at Midnight',
      role: 'Supporting - Alex',
      director: 'David Williams',
      year: 2023,
    },
    {
      id: 'c4',
      category: 'Theatre',
      project: 'Peter Pan',
      role: 'Peter Pan',
      director: 'Lisa Anderson',
      year: 2022,
    },
    {
      id: 'c5',
      category: 'TV',
      project: 'Young Detectives',
      role: 'Guest Star - Riley',
      year: 2022,
    },
    {
      id: 'c6',
      category: 'Film',
      project: 'The Lost Treasure',
      role: 'Co-Star',
      director: 'James Martinez',
      year: 2021,
    },
    {
      id: 'c7',
      category: 'Theatre',
      project: 'Annie',
      role: 'Ensemble',
      year: 2021,
    },
    {
      id: 'c8',
      category: 'Voiceover',
      project: 'Adventure Time Audiobook',
      role: 'Young Hero',
      year: 2023,
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
      label: 'Represented by Acme Talent',
      url: 'https://example.com',
      type: 'rep',
    },
  ],
};

export default function ActorPage() {
  return <ActorPageLayout {...mockActorData} />;
}

export const metadata = {
  title: 'Alex Morgan - Actor',
  description: 'Professional actor portfolio for Alex Morgan',
};

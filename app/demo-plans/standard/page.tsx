import React from 'react';
import { ActorPageLayout, type ActorPageLayoutProps } from '@/components/actor/ActorPageLayout';

const standardDemo: ActorPageLayoutProps = {
  plan: 'standard',
  theme: 'classic-dark',
  profile: {
    displayName: 'Alex Rivera',
    tagline: 'Rising Talent | Comedy & Drama',
    bio: 'Versatile young performer with training in improv, scene study, and on-camera technique. Natural comedic timing with strong dramatic range.',
    location: 'Los Angeles, CA',
    ageRange: '12-14',
    unionStatus: 'SAG-AFTRA Eligible',
  },
  photos: [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1000&fit=crop',
      alt: 'Primary Headshot',
      isPrimary: true,
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=1000&fit=crop',
      alt: 'Commercial Look',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
      alt: 'Dramatic Look',
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1000&fit=crop',
      alt: 'Comedic Look',
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1000&fit=crop',
      alt: 'Character Shot',
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=1000&fit=crop',
      alt: 'Theatrical Look',
    },
  ],
  reels: [
    {
      id: 'reel1',
      title: 'Theatrical Reel 2024',
      platform: 'vimeo',
      videoId: '76979871',
    },
    {
      id: 'reel2',
      title: 'Comedic Reel',
      platform: 'vimeo',
      videoId: '148751763',
    },
    {
      id: 'reel3',
      title: 'Commercial Reel',
      platform: 'vimeo',
      videoId: '76979871',
    },
    {
      id: 'reel4',
      title: 'Scene Study Montage',
      platform: 'vimeo',
      videoId: '148751763',
    },
  ],
  credits: [
    {
      id: 'c1',
      category: 'TV',
      project: 'Law & Order: SVU',
      role: 'Co-Star',
      director: 'Jane Director',
      year: 2024,
    },
    {
      id: 'c2',
      category: 'Film',
      project: 'Summer in Brooklyn',
      role: 'Supporting',
      director: 'Alex Filmmaker',
      year: 2024,
    },
    {
      id: 'c3',
      category: 'Other',
      project: 'Target Holiday Campaign',
      role: 'Principal',
      year: 2023,
    },
    {
      id: 'c4',
      category: 'TV',
      project: 'The Equalizer',
      role: 'Guest Star',
      director: 'Chris Director',
      year: 2023,
    },
    {
      id: 'c5',
      category: 'Theatre',
      project: 'Annie',
      role: 'Orphan',
      director: 'Stage Director',
      year: 2023,
    },
    {
      id: 'c6',
      category: 'Film',
      project: 'Independent Short',
      role: 'Lead',
      director: 'Student Filmmaker',
      year: 2022,
    },
    {
      id: 'c7',
      category: 'Other',
      project: 'Apple Back to School',
      role: 'Featured',
      year: 2022,
    },
    {
      id: 'c8',
      category: 'TV',
      project: 'Blue Bloods',
      role: 'Co-Star',
      year: 2022,
    },
    {
      id: 'c9',
      category: 'Theatre',
      project: 'The Music Man',
      role: 'Ensemble',
      year: 2021,
    },
    {
      id: 'c10',
      category: 'Film',
      project: 'Student Film Festival Winner',
      role: 'Supporting',
      year: 2021,
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
  ],
};

export default function StandardPlanDemo() {
  return <ActorPageLayout {...standardDemo} />;
}

export const metadata = {
  title: 'Standard Plan Demo - Actor Page 101',
  description: 'See what the Standard plan looks like with 6 photos, 4 reels, and 20 credits',
};

// app/demo/builder/page.tsx
'use client';

import { ActorPageForm } from '@/components/actor-page/ActorPageForm';
import { ActorPageConfig } from '@/components/actor-page/types';

const mockConfig: ActorPageConfig = {
  tier: 'standard',
  templateId: 'standard-showcase',
  theme: {
    themeId: 'hollywood_night',
    headingFont: 'classic',
    bodyFont: 'classic',
    iconStyle: 'hex',
    extrasEnabled: [],
  },
  hero: {
    name: 'Jordan Avery',
    headshotUrl:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    ageRange: '13–16',
    location: 'Los Angeles, CA',
    brandLine: 'Single-Cam Comedy • Teen Drama',
    castingType: 'Funny, sharp, a little oddball',
    unionStatus: 'SAG-AFTRA Eligible',
    recentCredits: ['NBC – Found', 'Hulu – Family Binds'],
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com/example' },
      { platform: 'imdb', url: 'https://imdb.com' },
      { platform: 'email', url: 'mailto:parent@example.com' },
    ],
    reps: [
      {
        label: 'Talent Agent',
        company: 'Coast to Coast Talent Group',
        contactName: 'Agent Name',
      },
      {
        label: 'Manager',
        company: 'Bohemia Group',
      },
    ],
  },
  headshots: {
    galleries: [
      {
        id: 'main',
        label: 'Main',
        images: [
          {
            id: 'hs-1',
            url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
            alt: 'Headshot 1',
          },
          {
            id: 'hs-2',
            url: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
            alt: 'Headshot 2',
          },
        ],
      },
    ],
  },
  reels: {
    items: [
      {
        id: 'r1',
        title: 'Theatrical Reel',
        vimeoUrl: 'https://player.vimeo.com/video/76979871',
        projectLabel: 'Drama',
      },
    ],
  },
  bts: {
    albums: [],
  },
  projects: {
    items: [],
  },
  resume: {
    mode: 'pdf_embed',
    pdfUrl: '/mock/jordan-avery-resume.pdf',
  },
  contact: {
    parentEmail: 'parent@example.com',
    showReps: true,
  },
};

export default function BuilderDemoPage() {
  const handleSubmit = async (config: ActorPageConfig) => {
    // For now, just log. Later: send to Supabase.
    console.log('ActorPageConfig to save:', config);
    // Example Supabase pseudo-code:
    // const { data, error } = await supabase
    //   .from('actor_pages')
    //   .update({ tier: config.tier, config })
    //   .eq('id', actorPageId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
        <h1 className="text-2xl font-semibold">Actor Page 101 – Builder Demo</h1>
        <p className="text-xs text-slate-400 max-w-xl">
          This page shows the builder form for editing an actor page. Replace the mock
          config with data from Supabase and replace the submit handler with a real
          update call.
        </p>
        <ActorPageForm initialConfig={mockConfig} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

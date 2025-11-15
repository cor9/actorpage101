import { notFound } from 'next/navigation';
import { ActorPageLayout } from '@/components/actor-page/ActorPageLayout';
import { ActorPageConfig, Tier } from '@/components/actor-page/types';

interface PageProps {
  params: Promise<{ tier: string }>;
}

const makeMockConfig = (tier: Tier): ActorPageConfig => {
  const base: Omit<ActorPageConfig, 'tier'> = {
    templateId:
      tier === 'free'
        ? 'mini-portfolio'
        : tier === 'standard'
        ? 'standard-showcase'
        : 'premium-cinematic',
    hero: {
      name: 'Jordan Avery',
      headshotUrl:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop',
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
      reps:
        tier === 'free'
          ? []
          : [
              {
                label: 'Talent Agent',
                company: 'Coast to Coast Talent Group',
                contactName: 'Agent Name',
                email: 'agent@example.com',
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
          label: 'Commercial',
          images: Array.from({ length: 8 }).map((_, i) => ({
            id: `hs-${i}`,
            url: `https://images.unsplash.com/photo-${1534528741775 + i}?w=400&h=600&fit=crop`,
            alt: `Headshot ${i + 1}`,
          })),
        },
        {
          id: 'theatrical',
          label: 'Theatrical',
          images: Array.from({ length: 6 }).map((_, i) => ({
            id: `hs-th-${i}`,
            url: `https://images.unsplash.com/photo-${1517841905240 + i}?w=400&h=600&fit=crop`,
            alt: `Theatrical ${i + 1}`,
          })),
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
        {
          id: 'r2',
          title: 'Comedic Reel',
          vimeoUrl: 'https://player.vimeo.com/video/76979871',
          projectLabel: 'Comedy',
        },
        {
          id: 'r3',
          title: 'Clip – Hulu Family Binds',
          vimeoUrl: 'https://player.vimeo.com/video/76979871',
          projectLabel: 'Hulu',
        },
        {
          id: 'r4',
          title: 'Clip – NBC Found',
          vimeoUrl: 'https://player.vimeo.com/video/76979871',
          projectLabel: 'NBC',
        },
        {
          id: 'r5',
          title: 'Extra Clip (Premium)',
          vimeoUrl: 'https://player.vimeo.com/video/76979871',
          projectLabel: 'Short Film',
        },
      ],
    },
    bts: {
      albums: [
        {
          id: 'film',
          label: 'Film',
          images: Array.from({ length: 12 }).map((_, i) => ({
            id: `bts-film-${i}`,
            url: `https://images.unsplash.com/photo-${1536440136628 + i}?w=400&h=400&fit=crop`,
            alt: `On set ${i + 1}`,
          })),
        },
        {
          id: 'tv',
          label: 'TV',
          images: Array.from({ length: 6 }).map((_, i) => ({
            id: `bts-tv-${i}`,
            url: `https://images.unsplash.com/photo-${1485846234645 + i}?w=400&h=400&fit=crop`,
            alt: `On set TV ${i + 1}`,
          })),
        },
      ],
    },
    projects: {
      items: [
        {
          id: 'p1',
          title: 'Summer on Maple Lane',
          role: 'Supporting',
          year: '2024',
          medium: 'film',
          platformOrCompany: 'Hulu',
          posterUrl:
            'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=200&h=300&fit=crop',
          description: 'Family drama feature with comedic moments.',
        },
        {
          id: 'p2',
          title: 'The Last First Day',
          role: 'Lead',
          year: '2023',
          medium: 'tv',
          platformOrCompany: 'NBC',
          posterUrl:
            'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&h=300&fit=crop',
          description: 'Network pilot about a teen starting over.',
        },
        {
          id: 'p3',
          title: 'Family Binds',
          role: 'Recurring',
          year: '2023',
          medium: 'tv',
          platformOrCompany: 'Hulu',
          description: 'Recurring role in family drama series.',
        },
      ],
    },
    resume:
      tier === 'free'
        ? {
            mode: 'external_link',
            externalUrl:
              'https://drive.google.com/file/d/EXAMPLE_RESUME/view?usp=sharing',
          }
        : tier === 'standard'
        ? {
            mode: 'pdf_embed',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          }
        : {
            mode: 'structured',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            filmTvCredits: [
              'Family Binds – Recurring – Hulu',
              'Found – Guest Star – NBC',
              'Summer on Maple Lane – Supporting – Feature Film',
            ],
            theatreCredits: [
              'Annie – Annie – Local Theatre Co.',
              'The Wizard of Oz – Dorothy – Regional Theatre',
            ],
            training: [
              'On-Camera Youth Class – Child Actor 101',
              'Improv – UCB Youth Program',
              'Scene Study – Acting Studio LA',
            ],
            skills: ['Dialects (British RP)', 'Guitar', 'Intermediate Spanish', 'Dance (Jazz, Tap)', 'Singing (Soprano)'],
          },
    contact: {
      parentEmail: 'parent@example.com',
      showReps: tier !== 'free',
    },
  };

  return { tier, ...base };
};

export default async function DemoTierPage({ params }: PageProps) {
  const { tier } = await params;

  if (!['free', 'standard', 'premium'].includes(tier)) {
    return notFound();
  }

  const config = makeMockConfig(tier as Tier);

  return <ActorPageLayout config={config} />;
}

export async function generateStaticParams() {
  return ['free', 'standard', 'premium'].map((tier) => ({ tier }));
}

import { notFound } from 'next/navigation';
import { ActorPageLayout } from '@/components/actor-page/ActorPageLayout';
import { ActorPageConfig, TemplateId, Tier } from '@/components/actor-page/types';

interface PageProps {
  params: Promise<{ templateId: TemplateId }>;
}

const templateToTier = (templateId: TemplateId): Tier => {
  switch (templateId) {
    case 'mini-portfolio':
      return 'free';
    case 'standard-showcase':
      return 'standard';
    case 'premium-cinematic':
      return 'premium';
    default:
      return 'free';
  }
};

function makeMockConfigForTemplate(templateId: TemplateId): ActorPageConfig {
  const tier = templateToTier(templateId);
  const base: Omit<ActorPageConfig, 'tier'> = {
    templateId,
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
      ],
    },
    reels: {
      items:
        tier === 'free'
          ? [
              {
                id: 'r1',
                title: 'Theatrical Reel',
                vimeoUrl: 'https://player.vimeo.com/video/76979871',
                projectLabel: 'Drama',
              },
            ]
          : [
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
            ],
    },
    bts: {
      albums: [
        {
          id: 'film',
          label: 'Film',
          images: Array.from({ length: tier === 'premium' ? 9 : 6 }).map((_, i) => ({
            id: `bts-film-${i}`,
            url: `https://images.unsplash.com/photo-${1536440136628 + i}?w=400&h=400&fit=crop`,
            alt: `On set ${i + 1}`,
          })),
        },
      ],
    },
    projects: {
      items:
        tier === 'premium'
          ? [
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
            ]
          : [],
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
            pdfUrl:
              'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          }
        : {
            mode: 'structured',
            pdfUrl:
              'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            filmTvCredits: [
              'Family Binds – Recurring – Hulu',
              'Found – Guest Star – NBC',
            ],
            theatreCredits: ['Annie – Annie – Local Theatre Co.'],
            training: ['Improv – UCB Youth Program'],
            skills: ['Dialects (British RP)', 'Guitar', 'Spanish'],
          },
    contact: {
      parentEmail: 'parent@example.com',
      showReps: tier !== 'free',
    },
  };

  return { tier, ...base };
}

export default async function DemoTemplatePage({ params }: PageProps) {
  const { templateId } = await params;
  const allowed: TemplateId[] = [
    'mini-portfolio',
    'standard-showcase',
    'premium-cinematic',
  ];
  if (!allowed.includes(templateId)) {
    return notFound();
  }

  const config = makeMockConfigForTemplate(templateId);
  return <ActorPageLayout config={config} />;
}

export async function generateStaticParams() {
  return ['mini-portfolio', 'standard-showcase', 'premium-cinematic'].map(
    (templateId) => ({ templateId })
  );
}



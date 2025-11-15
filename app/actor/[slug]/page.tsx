import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { ActorPageLayout } from '@/components/actor-page/ActorPageLayout';
import { ActorPageConfig } from '@/components/actor-page/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // Revalidate every hour

async function getActorPage(slug: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('actor_pages')
    .select('tier, template_id, config, is_published')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function ActorPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getActorPage(slug);

  if (!data) {
    return notFound();
  }

  // Parse the config from JSONB
  const config = data.config as ActorPageConfig;

  // Ensure tier is set from the column (in case it's not in the JSON)
  config.tier = data.tier;
  config.templateId = data.template_id;

  return <ActorPageLayout config={config} />;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = await getActorPage(slug);

  if (!data) {
    return {
      title: 'Actor Not Found',
    };
  }

  const config = data.config as ActorPageConfig;
  const name = config.hero.name || 'Actor';
  const brandLine = config.hero.brandLine || 'Actor Portfolio';

  return {
    title: `${name} - ${brandLine}`,
    description: `Professional portfolio of ${name}`,
  };
}

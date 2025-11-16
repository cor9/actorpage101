import { notFound, redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { ActorPageConfig } from '@/components/actor-page/types';
import { adaptOldConfigToNew } from '@/lib/configAdapter';
import { EditPageClient } from './EditPageClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

async function getActorPage(id: string, userId: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('actor_pages')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function EditPageV2({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get the actor page
  const page = await getActorPage(id, user.id);

  if (!page) {
    return notFound();
  }

  // Convert old config to new format
  const config = page.config as ActorPageConfig;
  config.tier = page.tier;
  config.templateId = page.template_id;

  const layoutProps = adaptOldConfigToNew(config);

  return (
    <EditPageClient
      pageId={id}
      slug={page.slug}
      tier={page.tier}
      isPublished={page.is_published}
      initialData={layoutProps}
    />
  );
}

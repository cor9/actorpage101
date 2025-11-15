import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { redirect, notFound } from 'next/navigation';
import { EditPageClient } from './EditPageClient';

export const dynamic = 'force-dynamic';

export default async function EditActorPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Load actor page
  const { data: page, error } = await supabase
    .from('actor_pages')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !page) {
    notFound();
  }

  // Ensure user owns this page (RLS should handle this, but double check)
  if (page.user_id !== user.id) {
    redirect('/dashboard');
  }

  return <EditPageClient page={page} />;
}

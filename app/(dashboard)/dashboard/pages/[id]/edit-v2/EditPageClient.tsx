'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserSupabaseClient } from '@/lib/supabaseBrowser';
import { EditForm, EditFormData } from '@/components/actor/EditForm';
import { adaptNewConfigToOld } from '@/lib/configAdapter';
import type { ActorPageLayoutProps } from '@/components/actor/ActorPageLayout';

interface Props {
  pageId: string;
  slug: string;
  tier: string;
  isPublished: boolean;
  initialData: ActorPageLayoutProps;
}

export function EditPageClient({ pageId, slug, tier, isPublished: initialPublishState, initialData }: Props) {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [isSaving, setIsSaving] = useState(false);
  const [isPublished, setIsPublished] = useState(initialPublishState);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const formData: EditFormData = {
    plan: initialData.plan,
    profile: initialData.profile,
    photos: initialData.photos,
    reels: initialData.reels,
    credits: initialData.credits,
    links: initialData.links,
    theme: initialData.theme || 'classic-dark',
  };

  const handleSave = async (data: EditFormData) => {
    try {
      setIsSaving(true);
      setMessage(null);

      // Convert new format back to old JSONB structure
      const oldConfig = adaptNewConfigToOld(data);

      // Update the database
      const { error } = await supabase
        .from('actor_pages')
        .update({
          config: oldConfig,
          tier: data.plan,
          updated_at: new Date().toISOString(),
        })
        .eq('id', pageId);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Changes saved successfully!' });

      // Refresh the page data
      router.refresh();
    } catch (error) {
      console.error('Error saving:', error);
      setMessage({ type: 'error', text: 'Failed to save changes. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const togglePublish = async () => {
    try {
      const newState = !isPublished;

      const { error } = await supabase
        .from('actor_pages')
        .update({ is_published: newState })
        .eq('id', pageId);

      if (error) throw error;

      setIsPublished(newState);
      setMessage({
        type: 'success',
        text: newState ? 'Page published!' : 'Page unpublished',
      });
    } catch (error) {
      console.error('Error toggling publish:', error);
      setMessage({ type: 'error', text: 'Failed to update publish status' });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ textShadow: '0 0 15px rgba(255, 73, 219, 0.5)' }}>
              Edit Actor Page
            </h1>
            <p className="text-gray-300">
              {initialData.profile.displayName}
              <span className="ml-2 text-sm text-gray-400">
                ({tier.toUpperCase()} Plan)
              </span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            {isPublished && (
              <Link
                href={`/actor/${slug}`}
                target="_blank"
                className="px-4 py-2 border-2 border-neon-cyan text-neon-cyan rounded-lg hover:bg-neon-cyan/10 transition-colors"
              >
                View Live Page
              </Link>
            )}

            <button
              onClick={togglePublish}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isPublished
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              {isPublished ? '✓ Published' : 'Publish'}
            </button>

            <Link
              href="/dashboard"
              className="px-4 py-2 border-2 border-gray-500 text-gray-300 rounded-lg hover:bg-gray-500/10 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Message Banner */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-900/30 text-green-300 border border-green-600/30'
              : 'bg-red-900/30 text-red-300 border border-red-600/30'
          }`}
        >
          {message.text}
        </div>
      )}

      {!isPublished && (
        <div className="mb-6 p-4 rounded-lg bg-amber-900/30 text-amber-300 border border-amber-600/30">
          This page is currently <strong>unpublished</strong>. Click "Publish" above to make it live.
        </div>
      )}

      {/* Edit Form */}
      <EditForm
        initialData={formData}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
}

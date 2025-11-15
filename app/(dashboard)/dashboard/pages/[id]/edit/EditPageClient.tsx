'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ActorPageForm } from '@/components/actor-page/ActorPageForm';
import { ActorPageConfig } from '@/components/actor-page/types';
import { createBrowserSupabaseClient } from '@/lib/supabaseBrowser';

interface EditPageClientProps {
  page: {
    id: string;
    slug: string;
    tier: string;
    config: any;
    is_published: boolean;
  };
}

export function EditPageClient({ page }: EditPageClientProps) {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  const handleSubmit = async (config: ActorPageConfig) => {
    const supabase = createBrowserSupabaseClient();

    const { error } = await supabase
      .from('actor_pages')
      .update({
        config,
        tier: config.tier,
        template_id: config.templateId,
      })
      .eq('id', page.id);

    if (error) {
      throw new Error(error.message);
    }

    // Refresh the page data
    router.refresh();
  };

  const togglePublish = async () => {
    setIsPublishing(true);
    setPublishError(null);

    try {
      const supabase = createBrowserSupabaseClient();

      const { error } = await supabase
        .from('actor_pages')
        .update({
          is_published: !page.is_published,
        })
        .eq('id', page.id);

      if (error) {
        throw error;
      }

      // Refresh the page
      router.refresh();
    } catch (err: any) {
      console.error('Error toggling publish status:', err);
      setPublishError(err.message || 'Failed to update publish status');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div>
      {/* Header with Actions */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Link
            href="/dashboard"
            className="text-sm text-indigo-600 hover:text-indigo-700 mb-2 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Actor Page</h1>
          <p className="text-sm text-gray-600 mt-1">
            Slug: <span className="font-mono">{page.slug}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {page.is_published && (
            <a
              href={`/actor/${page.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              View Public Page
            </a>
          )}
          <button
            onClick={togglePublish}
            disabled={isPublishing}
            className={`px-4 py-2 rounded-lg font-medium ${
              page.is_published
                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                : 'bg-green-600 text-white hover:bg-green-700'
            } disabled:opacity-50`}
          >
            {isPublishing
              ? 'Processing...'
              : page.is_published
              ? 'Unpublish'
              : 'Publish Page'}
          </button>
        </div>
      </div>

      {publishError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{publishError}</p>
        </div>
      )}

      {/* Publish Status Banner */}
      {!page.is_published && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Draft Mode:</strong> This page is not publicly visible yet. Click
            &quot;Publish Page&quot; when you&apos;re ready to make it live.
          </p>
        </div>
      )}

      {/* Actor Page Form */}
      <ActorPageForm initialConfig={page.config as ActorPageConfig} onSubmit={handleSubmit} />
    </div>
  );
}

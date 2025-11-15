'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabaseBrowser';
import { Tier, ActorPageConfig, TemplateId } from '@/components/actor-page/types';

export default function NewActorPagePage() {
  const router = useRouter();
  const [tier, setTier] = useState<Tier>('free');
  const [actorName, setActorName] = useState('');
  const [slug, setSlug] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleNameChange = (name: string) => {
    setActorName(name);
    // Auto-generate slug if it hasn't been manually edited
    const generatedSlug = generateSlug(name);
    setSlug(generatedSlug);
  };

  const getTemplateIdForTier = (tier: Tier): TemplateId => {
    switch (tier) {
      case 'free':
        return 'mini-portfolio';
      case 'standard':
        return 'standard-showcase';
      case 'premium':
        return 'premium-cinematic';
    }
  };

  const createDefaultConfig = (name: string, tier: Tier): ActorPageConfig => {
    // Create empty headshot slots based on tier
    const headshotCount = tier === 'free' ? 3 : tier === 'standard' ? 8 : 10;
    const emptyHeadshots = Array.from({ length: headshotCount }, (_, i) => ({
      id: `hs-${i}-${Date.now()}`,
      url: '',
      alt: '',
    }));

    return {
      tier,
      templateId: getTemplateIdForTier(tier),
      theme: {
        themeId: 'hollywood_night',
        headingFont: 'classic',
        bodyFont: 'classic',
        iconStyle: 'hex',
        extrasEnabled: [],
      },
      hero: {
        name,
        headshotUrl: '',
        socialLinks: [],
        reps: [],
      },
      headshots: {
        galleries: [
          {
            id: 'main',
            label: 'Main',
            images: emptyHeadshots,
          },
        ],
      },
      reels: {
        items: [],
      },
      bts: {
        albums: [],
      },
      projects: {
        items: [],
      },
      resume: {
        mode: tier === 'free' ? 'external_link' : 'pdf_embed',
      },
      contact: {
        parentEmail: '',
        showReps: false,
      },
    };
  };

  const handleCreate = async () => {
    if (!actorName.trim()) {
      setError('Actor name is required');
      return;
    }

    if (!slug.trim()) {
      setError('Slug is required');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const supabase = createBrowserSupabaseClient();

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError('You must be logged in to create a page');
        setIsCreating(false);
        return;
      }

      // Create default config
      const config = createDefaultConfig(actorName, tier);

      // Insert into database
      const { data, error: insertError } = await supabase
        .from('actor_pages')
        .insert({
          user_id: user.id,
          slug,
          tier,
          template_id: getTemplateIdForTier(tier),
          config,
          is_published: false,
        })
        .select()
        .single();

      if (insertError) {
        if (insertError.code === '23505') {
          // Unique violation
          setError('This slug is already taken. Please choose a different one.');
        } else {
          setError(insertError.message);
        }
        setIsCreating(false);
        return;
      }

      // Redirect to edit page
      router.push(`/dashboard/pages/${data.id}/edit`);
    } catch (err) {
      console.error('Error creating actor page:', err);
      setError('An unexpected error occurred');
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Create New Actor Page</h1>

      <div className="bg-dark-purple/50 backdrop-blur-sm border border-neon-pink/30 shadow-xl rounded-lg p-6 space-y-6">
        {/* Actor Name */}
        <div>
          <label htmlFor="actorName" className="block text-sm font-medium text-gray-300 mb-2">
            Actor Name
          </label>
          <input
            type="text"
            id="actorName"
            value={actorName}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-4 py-2 border border-neon-cyan/30 rounded-lg focus:ring-2 focus:ring-neon-pink focus:border-neon-pink"
            placeholder="Jordan Avery"
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-2">
            Page Slug
          </label>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">actorpage101.site/actor/</span>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="flex-1 px-4 py-2 border border-neon-cyan/30 rounded-lg focus:ring-2 focus:ring-neon-pink focus:border-neon-pink"
              placeholder="jordan-avery"
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">
            This will be your actor page&apos;s URL. Use lowercase letters, numbers, and hyphens only.
          </p>
        </div>

        {/* Tier Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Choose a Plan
          </label>
          <div className="grid md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setTier('free')}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                tier === 'free'
                  ? 'border-neon-pink bg-neon-pink/20'
                  : 'border-neon-pink/20 hover:border-neon-cyan/30'
              }`}
            >
              <div className="font-semibold text-white mb-1">Free</div>
              <div className="text-xs text-gray-400">
                3 headshots, 1 reel, external resume link
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTier('standard')}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                tier === 'standard'
                  ? 'border-neon-pink bg-neon-pink/20'
                  : 'border-neon-pink/20 hover:border-neon-cyan/30'
              }`}
            >
              <div className="font-semibold text-white mb-1">Standard</div>
              <div className="text-xs text-gray-400">
                12 headshots, 4 reels, PDF resume, BTS preview
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTier('premium')}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                tier === 'premium'
                  ? 'border-neon-pink bg-neon-pink/20'
                  : 'border-neon-pink/20 hover:border-neon-cyan/30'
              }`}
            >
              <div className="font-semibold text-white mb-1">Premium</div>
              <div className="text-xs text-gray-400">
                Unlimited headshots/reels, structured resume, projects
              </div>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-neon-orange/10 border border-neon-orange/30 rounded-lg">
            <p className="text-sm text-neon-orange">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreate}
            disabled={isCreating}
            className="px-6 py-2 bg-gradient-to-r from-neon-pink to-neon-cyan text-white rounded-lg hover:opacity-90 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? 'Creating...' : 'Create Actor Page'}
          </button>
        </div>
      </div>
    </div>
  );
}

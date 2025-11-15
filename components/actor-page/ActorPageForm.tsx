// components/actor-page/ActorPageForm.tsx
'use client';

import React, { useState } from 'react';
import {
  ActorPageConfig,
  Tier,
  SocialPlatform,
  ResumeMode,
  ThemeConfig,
  ThemeId,
  FontPreset,
  IconStyle,
} from './types';

type Props = {
  initialConfig: ActorPageConfig;
  onSubmit: (config: ActorPageConfig) => void | Promise<void>;
};

const tierOptions: Tier[] = ['free', 'standard', 'premium'];

const socialPlatforms: SocialPlatform[] = [
  'instagram',
  'youtube',
  'tiktok',
  'imdb',
  'email',
  'website',
  'other',
];

const resumeModes: ResumeMode[] = ['external_link', 'pdf_embed', 'structured'];

const themeOptions: { id: ThemeId; label: string; previewClass: string }[] = [
  {
    id: 'hollywood_night',
    label: 'Hollywood Night',
    previewClass: 'bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900',
  },
  {
    id: 'soft_lilac',
    label: 'Soft Lilac',
    previewClass: 'bg-gradient-to-r from-purple-900 via-violet-800 to-slate-900',
  },
  {
    id: 'warm_slate',
    label: 'Warm Slate',
    previewClass: 'bg-gradient-to-r from-slate-900 via-slate-800 to-amber-900',
  },
  {
    id: 'teal_stage',
    label: 'Teal Stage',
    previewClass: 'bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900',
  },
];

const fontOptions: { id: FontPreset; label: string }[] = [
  { id: 'classic',   label: 'Classic (Clean Sans)' },
  { id: 'rounded',   label: 'Rounded (Friendly)' },
  { id: 'serif',     label: 'Serif (Serious)' },
  { id: 'condensed', label: 'Condensed (Edgy)' },
];

const iconStyleOptions: { id: IconStyle; label: string }[] = [
  { id: 'hex',            label: 'Hex' },
  { id: 'circle',         label: 'Circle' },
  { id: 'rounded_square', label: 'Rounded Square' },
];

const defaultThemeConfig: ThemeConfig = {
  themeId: 'hollywood_night',
  headingFont: 'classic',
  bodyFont: 'classic',
  iconStyle: 'hex',
  accentColorHex: undefined,
  extrasEnabled: [],
};

const withDefaultTheme = (config: ActorPageConfig): ActorPageConfig => {
  if (config.theme) return config;
  return {
    ...config,
    theme: defaultThemeConfig,
  };
};

export const ActorPageForm: React.FC<Props> = ({ initialConfig, onSubmit }) => {
  const [config, setConfig] = useState<ActorPageConfig>(() =>
    withDefaultTheme(initialConfig)
  );
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const updateHero = <K extends keyof ActorPageConfig['hero']>(
    key: K,
    value: ActorPageConfig['hero'][K]
  ) => {
    setConfig((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [key]: value,
      },
    }));
  };

  const updateResume = <K extends keyof ActorPageConfig['resume']>(
    key: K,
    value: ActorPageConfig['resume'][K]
  ) => {
    setConfig((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        [key]: value,
      },
    }));
  };

  const updateContact = <K extends keyof ActorPageConfig['contact']>(
    key: K,
    value: ActorPageConfig['contact'][K]
  ) => {
    setConfig((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [key]: value,
      },
    }));
  };

  const updateTheme = <K extends keyof ThemeConfig>(
    key: K,
    value: ThemeConfig[K]
  ) => {
    setConfig((prev) => ({
      ...prev,
      theme: {
        ...(prev.theme || defaultThemeConfig),
        [key]: value,
      },
    }));
  };

  const toggleExtra = (extra: ThemeConfig['extrasEnabled'][number]) => {
    setConfig((prev) => {
      const current = prev.theme?.extrasEnabled || [];
      const exists = current.includes(extra);
      const updated = exists
        ? current.filter((e) => e !== extra)
        : [...current, extra];
      return {
        ...prev,
        theme: {
          ...(prev.theme || defaultThemeConfig),
          extrasEnabled: updated,
        },
      };
    });
  };

  const handleTierChange = (tier: Tier) => {
    setConfig((prev) => ({
      ...prev,
      tier,
    }));

    setConfig((prev) => {
      let resume = { ...prev.resume };
      if (tier === 'free') {
        resume.mode = 'external_link';
      } else if (tier === 'standard') {
        if (resume.mode === 'structured' || resume.mode === 'external_link') {
          resume.mode = 'pdf_embed';
        }
      } else if (tier === 'premium') {
        if (resume.mode === 'external_link') {
          resume.mode = 'pdf_embed';
        }
      }
      return { ...prev, resume };
    });
  };

  const handleAddHeadshot = () => {
    setConfig((prev) => {
      const galleries = [...prev.headshots.galleries];
      if (galleries.length === 0) {
        galleries.push({ id: 'main', label: 'Main', images: [] });
      }
      const main = galleries[0];
      const newId = `hs-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const updatedMain = {
        ...main,
        images: [
          ...main.images,
          {
            id: newId,
            url: '',
            alt: '',
          },
        ],
      };
      galleries[0] = updatedMain;
      return {
        ...prev,
        headshots: { galleries },
      };
    });
  };

  const handleHeadshotChange = (
    index: number,
    field: 'url' | 'alt',
    value: string
  ) => {
    setConfig((prev) => {
      const galleries = [...prev.headshots.galleries];
      if (galleries.length === 0) return prev;
      const main = galleries[0];
      const images = [...main.images];
      if (!images[index]) return prev;
      images[index] = {
        ...images[index],
        [field]: value,
      };
      galleries[0] = { ...main, images };
      return { ...prev, headshots: { galleries } };
    });
  };

  const handleRemoveHeadshot = (index: number) => {
    setConfig((prev) => {
      const galleries = [...prev.headshots.galleries];
      if (galleries.length === 0) return prev;
      const main = galleries[0];
      const images = main.images.filter((_, i) => i !== index);
      galleries[0] = { ...main, images };
      return { ...prev, headshots: { galleries } };
    });
  };

  const handleAddReel = () => {
    setConfig((prev) => {
      const newId = `reel-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      return {
        ...prev,
        reels: {
          items: [
            ...prev.reels.items,
            {
              id: newId,
              title: '',
              vimeoUrl: '',
              projectLabel: '',
            },
          ],
        },
      };
    });
  };

  const handleReelChange = (
    index: number,
    field: 'title' | 'vimeoUrl' | 'projectLabel',
    value: string
  ) => {
    setConfig((prev) => {
      const items = [...prev.reels.items];
      if (!items[index]) return prev;
      items[index] = { ...items[index], [field]: value };
      return { ...prev, reels: { items } };
    });
  };

  const handleRemoveReel = (index: number) => {
    setConfig((prev) => {
      const items = prev.reels.items.filter((_, i) => i !== index);
      return { ...prev, reels: { items } };
    });
  };

  const handleSocialChange = (
    index: number,
    field: 'platform' | 'url' | 'label' | 'iconName',
    value: string
  ) => {
    setConfig((prev) => {
      const socialLinks = [...prev.hero.socialLinks];
      if (!socialLinks[index]) return prev;

      if (field === 'platform') {
        socialLinks[index] = {
          ...socialLinks[index],
          platform: value as SocialPlatform,
        };
      } else {
        socialLinks[index] = {
          ...socialLinks[index],
          [field]: value,
        } as any;
      }

      return {
        ...prev,
        hero: {
          ...prev.hero,
          socialLinks,
        },
      };
    });
  };

  const handleAddSocial = () => {
    setConfig((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        socialLinks: [
          ...prev.hero.socialLinks,
          {
            platform: 'instagram',
            url: '',
          },
        ],
      },
    }));
  };

  const handleRemoveSocial = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        socialLinks: prev.hero.socialLinks.filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      await onSubmit(config);
      setMessage('Saved successfully.');
    } catch (err) {
      console.error(err);
      setMessage('Error saving. Check console for details.');
    } finally {
      setIsSaving(false);
    }
  };

  const currentResumeMode = config.resume.mode;
  const theme = config.theme || defaultThemeConfig;
  const extras = theme.extrasEnabled || [];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10 rounded-3xl bg-slate-950/70 p-6 md:p-8 border border-slate-800 shadow-2xl shadow-slate-950/70"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">Actor Page Builder</h1>
          <p className="text-xs text-slate-400">
            Edit the core info and style for this actor&apos;s page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-300">Tier</label>
          <select
            value={config.tier}
            onChange={(e) => handleTierChange(e.target.value as Tier)}
            className="rounded-full bg-slate-900 border border-slate-700 px-3 py-1 text-xs"
          >
            {tierOptions.map((tier) => (
              <option key={tier} value={tier}>
                {tier.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* STYLE & LAYOUT */}
      <section className="space-y-4 rounded-2xl bg-slate-900/70 border border-slate-800 p-4 md:p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
          Style & Layout
        </h2>

        {/* Color Theme */}
        <div className="space-y-2">
          <p className="text-xs text-slate-300">Color Theme</p>
          <div className="grid gap-3 md:grid-cols-4">
            {themeOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => updateTheme('themeId', opt.id)}
                className={`flex flex-col items-stretch rounded-2xl border px-2 py-2 text-left text-[11px] ${
                  theme.themeId === opt.id
                    ? 'border-indigo-400 shadow-md shadow-indigo-900/70'
                    : 'border-slate-700'
                }`}
              >
                <div className={`h-10 w-full rounded-xl ${opt.previewClass}`} />
                <span className="mt-2 text-[11px] text-slate-200">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Fonts */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="block text-xs text-slate-300">Heading Font</label>
            <select
              value={theme.headingFont}
              onChange={(e) =>
                updateTheme('headingFont', e.target.value as FontPreset)
              }
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs"
            >
              {fontOptions.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-xs text-slate-300">Body Font</label>
            <select
              value={theme.bodyFont}
              onChange={(e) =>
                updateTheme('bodyFont', e.target.value as FontPreset)
              }
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs"
            >
              {fontOptions.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Icon Style */}
        <div className="space-y-1">
          <p className="text-xs text-slate-300">Icon Style</p>
          <div className="flex flex-wrap gap-2">
            {iconStyleOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => updateTheme('iconStyle', opt.id)}
                className={`rounded-full border px-3 py-1 text-[11px] ${
                  theme.iconStyle === opt.id
                    ? 'border-indigo-400 bg-slate-900/80'
                    : 'border-slate-700 bg-slate-950'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accent Color (Advanced) */}
        <details className="mt-1 space-y-2">
          <summary className="cursor-pointer text-[11px] text-slate-400">
            Advanced: Accent Color Override
          </summary>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="color"
              value={theme.accentColorHex || '#6366f1'}
              onChange={(e) => updateTheme('accentColorHex', e.target.value)}
              className="h-6 w-10 rounded border border-slate-700 bg-slate-900"
            />
            <input
              type="text"
              value={theme.accentColorHex || ''}
              onChange={(e) => updateTheme('accentColorHex', e.target.value)}
              className="flex-1 rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs"
              placeholder="#6366f1"
            />
          </div>
          <p className="text-[11px] text-slate-500">
            If set, this color can be used for buttons and highlights instead of the
            default theme accent.
          </p>
        </details>

        {/* Extras */}
        {config.tier !== 'free' && (
          <div className="space-y-1">
            <p className="text-xs text-slate-300">Optional Sections</p>
            <div className="flex flex-wrap gap-3 text-[11px] text-slate-300">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={extras.includes('press_section')}
                  onChange={() => toggleExtra('press_section')}
                  className="h-3 w-3 rounded border-slate-600 bg-slate-900"
                />
                Press / Awards
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={extras.includes('project_gallery')}
                  onChange={() => toggleExtra('project_gallery')}
                  className="h-3 w-3 rounded border-slate-600 bg-slate-900"
                />
                Project Gallery
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={extras.includes('bts_albums')}
                  onChange={() => toggleExtra('bts_albums')}
                  className="h-3 w-3 rounded border-slate-600 bg-slate-900"
                />
                BTS Albums
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={extras.includes('custom_cta')}
                  onChange={() => toggleExtra('custom_cta')}
                  className="h-3 w-3 rounded border-slate-600 bg-slate-900"
                />
                Custom CTA Button
              </label>
            </div>
          </div>
        )}
      </section>

      {/* HERO */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
          Hero
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-xs text-slate-300">Actor Name</label>
            <input
              type="text"
              value={config.hero.name}
              onChange={(e) => updateHero('name', e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
            />
            <label className="block mt-3 text-xs text-slate-300">Headshot URL</label>
            <input
              type="text"
              value={config.hero.headshotUrl}
              onChange={(e) => updateHero('headshotUrl', e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
            />
            <label className="block mt-3 text-xs text-slate-300">
              Location (Local Hire)
            </label>
            <input
              type="text"
              value={config.hero.location ?? ''}
              onChange={(e) => updateHero('location', e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
            />
            <label className="block mt-3 text-xs text-slate-300">Age Range</label>
            <input
              type="text"
              value={config.hero.ageRange ?? ''}
              onChange={(e) => updateHero('ageRange', e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs text-slate-300">Brand Line</label>
            <input
              type="text"
              value={config.hero.brandLine ?? ''}
              onChange={(e) => updateHero('brandLine', e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
              placeholder="Single-Cam Comedy • Teen Drama"
            />
            <label className="block mt-3 text-xs text-slate-300">Casting Type</label>
            <input
              type="text"
              value={config.hero.castingType ?? ''}
              onChange={(e) => updateHero('castingType', e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
              placeholder="Funny, sharp, a little oddball"
            />
            <label className="block mt-3 text-xs text-slate-300">Union Status</label>
            <input
              type="text"
              value={config.hero.unionStatus ?? ''}
              onChange={(e) => updateHero('unionStatus', e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
              placeholder="SAG-AFTRA Eligible"
            />
            <label className="block mt-3 text-xs text-slate-300">
              Recent Credits (comma-separated)
            </label>
            <input
              type="text"
              value={(config.hero.recentCredits || []).join(', ')}
              onChange={(e) =>
                updateHero(
                  'recentCredits',
                  e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </section>

      {/* SOCIAL LINKS */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
          Social Links
        </h2>
        <div className="space-y-2">
          {config.hero.socialLinks.map((link, index) => {
            const isOther = link.platform === 'other';
            return (
              <div
                key={index}
                className="flex flex-col gap-2 rounded-xl bg-slate-900/80 border border-slate-700 p-3"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <select
                    value={link.platform}
                    onChange={(e) =>
                      handleSocialChange(index, 'platform', e.target.value)
                    }
                    className="rounded-lg bg-slate-950 border border-slate-700 px-2 py-2 text-xs md:w-40"
                  >
                    {socialPlatforms.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) =>
                      handleSocialChange(index, 'url', e.target.value)
                    }
                    className="flex-1 rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs"
                    placeholder="https://..."
                  />
                </div>

                {isOther && (
                  <div className="flex flex-col md:flex-row gap-2">
                    <input
                      type="text"
                      value={link.label || ''}
                      onChange={(e) =>
                        handleSocialChange(index, 'label', e.target.value)
                      }
                      className="flex-1 rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs"
                      placeholder="Link label (e.g., Casting Networks)"
                    />
                    <input
                      type="text"
                      value={link.iconName || ''}
                      onChange={(e) =>
                        handleSocialChange(index, 'iconName', e.target.value)
                      }
                      className="flex-1 rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs"
                      placeholder="Icon name (link, star, camera, clapperboard...)"
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleRemoveSocial(index)}
                  className="text-[11px] text-red-400 hover:text-red-300 self-start"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={handleAddSocial}
          className="rounded-full border border-slate-600 px-3 py-1 text-xs hover:bg-slate-900/60"
        >
          + Add Social Link
        </button>
      </section>

      {/* HEADSHOTS */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
          Headshots (Main Gallery)
        </h2>
        <p className="text-[11px] text-slate-400">
          Free: first 3 used • Standard: up to 8–12 • Premium: all.
        </p>
        <div className="space-y-2">
          {config.headshots.galleries[0]?.images.map((img, index) => (
            <div
              key={img.id}
              className="flex flex-col gap-2 rounded-xl bg-slate-900/80 border border-slate-700 p-3 md:flex-row md:items-center"
            >
              <input
                type="text"
                value={img.url}
                onChange={(e) =>
                  handleHeadshotChange(index, 'url', e.target.value)
                }
                className="flex-1 rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs"
                placeholder="Image URL"
              />
              <input
                type="text"
                value={img.alt || ''}
                onChange={(e) =>
                  handleHeadshotChange(index, 'alt', e.target.value)
                }
                className="flex-1 rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs"
                placeholder="Alt text (optional)"
              />
              <button
                type="button"
                onClick={() => handleRemoveHeadshot(index)}
                className="text-[11px] text-red-400 hover:text-red-300 mt-1 md:mt-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddHeadshot}
          className="rounded-full border border-slate-600 px-3 py-1 text-xs hover:bg-slate-900/60"
        >
          + Add Headshot
        </button>
      </section>

      {/* REELS */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
          Reels & Clips
        </h2>
        <p className="text-[11px] text-slate-400">
          Free: 1 • Standard: up to 4 • Premium: unlimited.
        </p>
        <div className="space-y-2">
          {config.reels.items.map((reel, index) => (
            <div
              key={reel.id}
              className="flex flex-col gap-2 rounded-xl bg-slate-900/80 border border-slate-700 p-3"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <input
                  type="text"
                  value={reel.title}
                  onChange={(e) =>
                    handleReelChange(index, 'title', e.target.value)
                  }
                  className="flex-1 rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs"
                  placeholder="Title (e.g., Theatrical Reel)"
                />
                <input
                  type="text"
                  value={reel.projectLabel || ''}
                  onChange={(e) =>
                    handleReelChange(index, 'projectLabel', e.target.value)
                  }
                  className="flex-1 rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs"
                  placeholder="Project label (e.g., Hulu, NBC)"
                />
              </div>
              <input
                type="text"
                value={reel.vimeoUrl}
                onChange={(e) =>
                  handleReelChange(index, 'vimeoUrl', e.target.value)
                }
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs"
                placeholder="Vimeo embed URL"
              />
              <button
                type="button"
                onClick={() => handleRemoveReel(index)}
                className="text-[11px] text-red-400 hover:text-red-300 self-start"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddReel}
          className="rounded-full border border-slate-600 px-3 py-1 text-xs hover:bg-slate-900/60"
        >
          + Add Reel
        </button>
      </section>

      {/* RESUME */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
          Resume
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-xs text-slate-300">Mode</label>
          <select
            value={currentResumeMode}
            onChange={(e) =>
              updateResume('mode', e.target.value as ResumeMode)
            }
            className="rounded-full bg-slate-900 border border-slate-700 px-3 py-1 text-xs"
          >
            {resumeModes.map((mode) => (
              <option
                key={mode}
                value={mode}
                disabled={
                  (config.tier === 'free' && mode !== 'external_link') ||
                  (config.tier === 'standard' && mode === 'structured')
                }
              >
                {mode}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400">
            Free → external_link only • Standard → pdf_embed • Premium → pdf_embed or structured.
          </p>
        </div>

        {currentResumeMode === 'external_link' && (
          <div className="space-y-2">
            <label className="block text-xs text-slate-300">Resume URL</label>
            <input
              type="text"
              value={config.resume.externalUrl ?? ''}
              onChange={(e) => updateResume('externalUrl', e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs"
              placeholder="https://drive.google.com/..."
            />
          </div>
        )}

        {currentResumeMode === 'pdf_embed' && (
          <div className="space-y-2">
            <label className="block text-xs text-slate-300">PDF URL</label>
            <input
              type="text"
              value={config.resume.pdfUrl ?? ''}
              onChange={(e) => updateResume('pdfUrl', e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs"
              placeholder="/path/to/resume.pdf or https://..."
            />
          </div>
        )}

        {currentResumeMode === 'structured' && (
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-xs text-slate-300">
                Film / TV Credits (one per line)
              </label>
              <textarea
                value={(config.resume.filmTvCredits || []).join('\n')}
                onChange={(e) =>
                  updateResume(
                    'filmTvCredits',
                    e.target.value
                      .split('\n')
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
                className="w-full min-h-[100px] rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs"
              />
              <label className="block text-xs text-slate-300">
                Theatre Credits (one per line)
              </label>
              <textarea
                value={(config.resume.theatreCredits || []).join('\n')}
                onChange={(e) =>
                  updateResume(
                    'theatreCredits',
                    e.target.value
                      .split('\n')
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
                className="w-full min-h-[100px] rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs text-slate-300">
                Training (one per line)
              </label>
              <textarea
                value={(config.resume.training || []).join('\n')}
                onChange={(e) =>
                  updateResume(
                    'training',
                    e.target.value
                      .split('\n')
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
                className="w-full min-h-[100px] rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs"
              />
              <label className="block text-xs text-slate-300">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                value={(config.resume.skills || []).join(', ')}
                onChange={(e) =>
                  updateResume(
                    'skills',
                    e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs"
              />
            </div>
          </div>
        )}
      </section>

      {/* CONTACT */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
          Contact
        </h2>
        <div className="space-y-2">
          <label className="block text-xs text-slate-300">Parent Email</label>
          <input
            type="email"
            value={config.contact.parentEmail}
            onChange={(e) => updateContact('parentEmail', e.target.value)}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs"
          />
          <label className="inline-flex items-center gap-2 text-xs text-slate-300 mt-2">
            <input
              type="checkbox"
              checked={config.contact.showReps}
              onChange={(e) => updateContact('showReps', e.target.checked)}
              className="h-3 w-3 rounded border-slate-600 bg-slate-900"
            />
            Show representation details on page (Standard/Premium only)
          </label>
        </div>
      </section>

      {/* SUBMIT */}
      <div className="flex items-center justify-between gap-3">
        <div className="text-[11px] text-slate-400 max-w-xs">
          On submit, this form returns a complete <code>ActorPageConfig</code> object
          including theme, fonts, colors, and content. Wire that to Supabase as JSON.
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-full bg-indigo-600/90 px-5 py-2 text-xs font-semibold hover:bg-indigo-500 disabled:opacity-60"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <p className="text-[11px] text-slate-300">
          {message}
        </p>
      )}
    </form>
  );
};

'use client';

import { useState, useEffect } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabaseBrowser';
import {
  TEMPLATES,
  COLOR_PRESETS,
  TYPOGRAPHY_PRESETS,
  getTemplate,
  getColorPreset,
  getTypographyPreset,
  generateColorCSS,
  generateTypographyCSS,
  type Template,
  type ColorPreset,
  type TypographyPreset,
} from '@/lib/templates';

interface SiteSettings {
  id: string;
  site_slug: string;
  template_id: string;
  color_preset: string;
  typography_preset: string;
  is_published: boolean;
}

export default function SitePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [site, setSite] = useState<SiteSettings | null>(null);
  const [siteSlug, setSiteSlug] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('classic-1');
  const [selectedColor, setSelectedColor] = useState('default');
  const [selectedTypography, setSelectedTypography] = useState('default');
  const [isPublished, setIsPublished] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const supabase = createBrowserSupabaseClient();

  // Load site settings
  useEffect(() => {
    loadSite();
  }, []);

  async function loadSite() {
    try {
      setLoading(true);

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMessage({ type: 'error', text: 'Please log in to manage your site' });
        return;
      }

      // Get site settings
      const { data, error } = await supabase
        .from('sites')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // Not found is ok
        throw error;
      }

      if (data) {
        setSite(data);
        setSiteSlug(data.site_slug);
        setSelectedTemplate(data.template_id);
        setSelectedColor(data.color_preset);
        setSelectedTypography(data.typography_preset);
        setIsPublished(data.is_published);
      }
    } catch (error) {
      console.error('Error loading site:', error);
      setMessage({ type: 'error', text: 'Failed to load site settings' });
    } finally {
      setLoading(false);
    }
  }

  async function saveSite() {
    try {
      setSaving(true);
      setMessage(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMessage({ type: 'error', text: 'Please log in' });
        return;
      }

      // Validate slug
      if (!siteSlug || !/^[a-z0-9-]+$/.test(siteSlug)) {
        setMessage({
          type: 'error',
          text: 'Slug must contain only lowercase letters, numbers, and hyphens'
        });
        return;
      }

      const siteData = {
        user_id: user.id,
        site_slug: siteSlug,
        template_id: selectedTemplate,
        color_preset: selectedColor,
        typography_preset: selectedTypography,
        is_published: isPublished,
        updated_at: new Date().toISOString(),
      };

      if (site) {
        // Update existing site
        const { error } = await supabase
          .from('sites')
          .update(siteData)
          .eq('id', site.id);

        if (error) throw error;
      } else {
        // Create new site
        const { data, error } = await supabase
          .from('sites')
          .insert([siteData])
          .select()
          .single();

        if (error) throw error;
        setSite(data);
      }

      setMessage({ type: 'success', text: 'Site settings saved successfully!' });
    } catch (error: any) {
      console.error('Error saving site:', error);
      if (error.code === '23505') {
        setMessage({ type: 'error', text: 'This slug is already taken' });
      } else {
        setMessage({ type: 'error', text: 'Failed to save settings' });
      }
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish() {
    const newPublishState = !isPublished;
    setIsPublished(newPublishState);

    // Auto-save when toggling publish
    try {
      setSaving(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !site) return;

      const { error } = await supabase
        .from('sites')
        .update({ is_published: newPublishState })
        .eq('id', site.id);

      if (error) throw error;

      setMessage({
        type: 'success',
        text: newPublishState ? 'Site published!' : 'Site unpublished'
      });
    } catch (error) {
      console.error('Error toggling publish:', error);
      setIsPublished(!newPublishState); // Revert on error
      setMessage({ type: 'error', text: 'Failed to update publish status' });
    } finally {
      setSaving(false);
    }
  }

  function openPreview() {
    if (!siteSlug) {
      setMessage({ type: 'error', text: 'Please set a site slug first' });
      return;
    }
    window.open(`https://${siteSlug}.actorpage101.site`, '_blank');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading site settings...</p>
        </div>
      </div>
    );
  }

  const currentTemplate = getTemplate(selectedTemplate);
  const currentColor = getColorPreset(selectedColor);
  const currentTypography = getTypographyPreset(selectedTypography);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Site Builder</h1>
        <p className="text-gray-600">Customize your actor portfolio</p>
      </div>

      {/* Message Banner */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Site URL */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Site URL</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Site Slug
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={siteSlug}
              onChange={(e) => setSiteSlug(e.target.value.toLowerCase())}
              placeholder="yourname"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="flex items-center text-gray-500 whitespace-nowrap">
              .actorpage101.site
            </span>
          </div>
          {siteSlug && (
            <p className="mt-2 text-sm text-gray-500">
              Your site will be available at:{' '}
              <span className="font-medium text-blue-600">
                {siteSlug}.actorpage101.site
              </span>
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Use lowercase letters, numbers, and hyphens only
          </p>
        </div>
      </div>

      {/* Template Selection */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Template</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {TEMPLATES.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-400'
              }`}
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded mb-2 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">
                  {template.name[0]}
                </span>
              </div>
              <p className="font-medium text-sm">{template.name}</p>
              <p className="text-xs text-gray-500 mt-1">{template.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Color Preset */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Color Theme</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {COLOR_PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => setSelectedColor(preset.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedColor === preset.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-400'
              }`}
            >
              <div className="flex gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: preset.primary }}
                ></div>
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: preset.secondary }}
                ></div>
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: preset.accent }}
                ></div>
              </div>
              <p className="font-medium text-sm">{preset.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Preset */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Typography</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TYPOGRAPHY_PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => setSelectedTypography(preset.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedTypography === preset.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-400'
              }`}
            >
              <p
                className="text-xl font-bold mb-2"
                style={{ fontFamily: preset.headingFont, fontWeight: preset.headingWeight }}
              >
                {preset.name}
              </p>
              <p
                className="text-sm text-gray-600"
                style={{ fontFamily: preset.bodyFont }}
              >
                The quick brown fox jumps over the lazy dog
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {preset.headingFont.split(',')[0]} / {preset.bodyFont.split(',')[0]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Box */}
      {currentTemplate && currentColor && currentTypography && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div
            className="border-2 border-gray-200 rounded-lg p-8"
            style={{
              backgroundColor: currentColor.background,
              color: currentColor.text,
            }}
          >
            <h1
              className="text-4xl mb-4"
              style={{
                fontFamily: currentTypography.headingFont,
                fontWeight: currentTypography.headingWeight,
                color: currentColor.primary,
              }}
            >
              Your Name
            </h1>
            <p
              className="text-lg mb-4"
              style={{
                fontFamily: currentTypography.bodyFont,
                color: currentColor.textLight,
              }}
            >
              Actor · Singer · Performer
            </p>
            <div className="flex gap-4 mt-6">
              <button
                className="px-6 py-2 rounded-lg text-white"
                style={{ backgroundColor: currentColor.primary }}
              >
                View Reel
              </button>
              <button
                className="px-6 py-2 rounded-lg border-2"
                style={{
                  borderColor: currentColor.primary,
                  color: currentColor.primary,
                }}
              >
                Contact
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Template: {currentTemplate.name} · Colors: {currentColor.name} · Typography:{' '}
            {currentTypography.name}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={saveSite}
              disabled={saving || !siteSlug}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={openPreview}
              disabled={!siteSlug}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              Preview Site
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {isPublished ? 'Site is live' : 'Site is private'}
            </span>
            <button
              onClick={togglePublish}
              disabled={!site || saving}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isPublished ? 'bg-green-600' : 'bg-gray-300'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isPublished ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {!site && (
          <p className="text-sm text-amber-600 mt-4">
            Save your site settings first before publishing
          </p>
        )}
      </div>
    </div>
  );
}

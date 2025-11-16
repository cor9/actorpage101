'use client';

import React, { useState } from 'react';
import type {
  Plan,
  ActorProfile,
  ActorPhoto,
  ActorReel,
  ActorCredit,
  ActorLink,
} from './ActorPageLayout';

export interface EditFormData {
  plan: Plan;
  profile: ActorProfile;
  photos: ActorPhoto[];
  reels: ActorReel[];
  credits: ActorCredit[];
  links: ActorLink[];
  theme: 'classic-light' | 'classic-dark';
}

interface Props {
  initialData: EditFormData;
  onSave: (data: EditFormData) => Promise<void>;
  isSaving?: boolean;
}

export const EditForm: React.FC<Props> = ({ initialData, onSave, isSaving }) => {
  const [formData, setFormData] = useState<EditFormData>(initialData);

  const updateProfile = (field: keyof ActorProfile, value: string) => {
    setFormData({
      ...formData,
      profile: {
        ...formData.profile,
        [field]: value || undefined,
      },
    });
  };

  const addPhoto = () => {
    setFormData({
      ...formData,
      photos: [
        ...formData.photos,
        {
          id: `photo-${Date.now()}`,
          url: '',
          alt: '',
          isPrimary: formData.photos.length === 0, // First photo is primary by default
        },
      ],
    });
  };

  const updatePhoto = (index: number, field: keyof ActorPhoto, value: string | boolean) => {
    const newPhotos = [...formData.photos];
    newPhotos[index] = { ...newPhotos[index], [field]: value };
    setFormData({ ...formData, photos: newPhotos });
  };

  const setPrimaryPhoto = (index: number) => {
    const newPhotos = formData.photos.map((photo, idx) => ({
      ...photo,
      isPrimary: idx === index,
    }));
    setFormData({ ...formData, photos: newPhotos });
  };

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    // If we removed the primary photo, make the first one primary
    if (newPhotos.length > 0 && !newPhotos.some(p => p.isPrimary)) {
      newPhotos[0].isPrimary = true;
    }
    setFormData({ ...formData, photos: newPhotos });
  };

  const addReel = () => {
    setFormData({
      ...formData,
      reels: [
        ...formData.reels,
        {
          id: `reel-${Date.now()}`,
          title: '',
          platform: 'vimeo',
          videoId: '',
        },
      ],
    });
  };

  const updateReel = (index: number, field: keyof ActorReel, value: string) => {
    const newReels = [...formData.reels];
    newReels[index] = { ...newReels[index], [field]: value || undefined };
    setFormData({ ...formData, reels: newReels });
  };

  const removeReel = (index: number) => {
    setFormData({
      ...formData,
      reels: formData.reels.filter((_, i) => i !== index),
    });
  };

  const addCredit = () => {
    setFormData({
      ...formData,
      credits: [
        ...formData.credits,
        {
          id: `credit-${Date.now()}`,
          category: 'Film',
          project: '',
          role: '',
        },
      ],
    });
  };

  const updateCredit = (index: number, field: keyof ActorCredit, value: string | number) => {
    const newCredits = [...formData.credits];
    newCredits[index] = { ...newCredits[index], [field]: value || undefined };
    setFormData({ ...formData, credits: newCredits });
  };

  const removeCredit = (index: number) => {
    setFormData({
      ...formData,
      credits: formData.credits.filter((_, i) => i !== index),
    });
  };

  const addLink = () => {
    setFormData({
      ...formData,
      links: [
        ...formData.links,
        {
          label: '',
          url: '',
          type: 'website',
        },
      ],
    });
  };

  const updateLink = (index: number, field: keyof ActorLink, value: string) => {
    const newLinks = [...formData.links];
    newLinks[index] = { ...newLinks[index], [field]: value || undefined };
    setFormData({ ...formData, links: newLinks });
  };

  const removeLink = (index: number) => {
    setFormData({
      ...formData,
      links: formData.links.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  const inputClasses = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-transparent bg-dark-purple/50 text-white';
  const labelClasses = 'block text-sm font-medium text-gray-300 mb-2';
  const buttonClasses = 'px-4 py-2 bg-gradient-to-r from-neon-pink to-neon-cyan text-white rounded-lg font-medium hover:opacity-90 transition-opacity';
  const sectionClasses = 'bg-dark-purple/50 backdrop-blur-sm border border-neon-pink/30 rounded-lg p-6 mb-6';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Section */}
      <div className={sectionClasses}>
        <h2 className="text-2xl font-bold text-white mb-4">Profile</h2>

        <div className="space-y-4">
          <div>
            <label className={labelClasses}>Display Name *</label>
            <input
              type="text"
              value={formData.profile.displayName}
              onChange={(e) => updateProfile('displayName', e.target.value)}
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>Tagline</label>
            <input
              type="text"
              value={formData.profile.tagline || ''}
              onChange={(e) => updateProfile('tagline', e.target.value)}
              placeholder="e.g., Young Actor | Singer | Dancer"
              className={inputClasses}
            />
          </div>

          <div>
            <label className={labelClasses}>Bio</label>
            <textarea
              value={formData.profile.bio || ''}
              onChange={(e) => updateProfile('bio', e.target.value)}
              rows={4}
              className={inputClasses}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className={labelClasses}>Location</label>
              <input
                type="text"
                value={formData.profile.location || ''}
                onChange={(e) => updateProfile('location', e.target.value)}
                placeholder="Los Angeles, CA"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Age Range</label>
              <input
                type="text"
                value={formData.profile.ageRange || ''}
                onChange={(e) => updateProfile('ageRange', e.target.value)}
                placeholder="10-12"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Union Status</label>
              <input
                type="text"
                value={formData.profile.unionStatus || ''}
                onChange={(e) => updateProfile('unionStatus', e.target.value)}
                placeholder="SAG-AFTRA"
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label className={labelClasses}>Theme</label>
            <select
              value={formData.theme}
              onChange={(e) => setFormData({ ...formData, theme: e.target.value as 'classic-light' | 'classic-dark' })}
              className={inputClasses}
            >
              <option value="classic-dark">Classic Dark</option>
              <option value="classic-light">Classic Light</option>
            </select>
          </div>
        </div>
      </div>

      {/* Photos Section */}
      <div className={sectionClasses}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Photos & Headshots</h2>
          <button type="button" onClick={addPhoto} className={buttonClasses}>
            + Add Photo
          </button>
        </div>

        <div className="space-y-4">
          {formData.photos.map((photo, idx) => (
            <div key={photo.id} className="border border-neon-cyan/30 rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClasses}>Photo URL</label>
                  <input
                    type="url"
                    value={photo.url}
                    onChange={(e) => updatePhoto(idx, 'url', e.target.value)}
                    placeholder="https://..."
                    className={inputClasses}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Upload your photo to a service like Imgur or use a direct image URL
                  </p>
                </div>

                <div>
                  <label className={labelClasses}>Alt Text (optional)</label>
                  <input
                    type="text"
                    value={photo.alt || ''}
                    onChange={(e) => updatePhoto(idx, 'alt', e.target.value)}
                    placeholder="Description of photo"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setPrimaryPhoto(idx)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      photo.isPrimary
                        ? 'bg-neon-pink text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {photo.isPrimary ? '★ Primary Headshot' : 'Set as Primary'}
                  </button>
                  {photo.url && (
                    <a
                      href={photo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neon-cyan hover:text-neon-pink text-sm"
                    >
                      Preview Image →
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removePhoto(idx)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Remove Photo
                </button>
              </div>
            </div>
          ))}

          {formData.photos.length === 0 && (
            <p className="text-gray-400 text-sm">No photos added yet. Click "+ Add Photo" to get started.</p>
          )}
        </div>

        <div className="mt-4 p-4 bg-dark-purple/30 border border-neon-cyan/20 rounded-lg">
          <p className="text-sm text-gray-300">
            <strong>Plan Limits:</strong>{' '}
            {formData.plan === 'free' && 'Free plan: 3 photos total (1 primary + 2 gallery)'}
            {formData.plan === 'standard' && 'Standard plan: 6 photos total (1 primary + 5 gallery)'}
            {formData.plan === 'premium' && 'Premium plan: 11 photos total (1 primary + 10 gallery)'}
          </p>
        </div>
      </div>

      {/* Reels Section */}
      <div className={sectionClasses}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Reels & Videos</h2>
          <button type="button" onClick={addReel} className={buttonClasses}>
            + Add Reel
          </button>
        </div>

        <div className="space-y-4">
          {formData.reels.map((reel, idx) => (
            <div key={reel.id} className="border border-neon-cyan/30 rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClasses}>Title</label>
                  <input
                    type="text"
                    value={reel.title || ''}
                    onChange={(e) => updateReel(idx, 'title', e.target.value)}
                    placeholder="Demo Reel 2024"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Vimeo Video ID</label>
                  <input
                    type="text"
                    value={reel.videoId || ''}
                    onChange={(e) => updateReel(idx, 'videoId', e.target.value)}
                    placeholder="123456789"
                    className={inputClasses}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeReel(idx)}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Remove Reel
              </button>
            </div>
          ))}

          {formData.reels.length === 0 && (
            <p className="text-gray-400 text-sm">No reels added yet. Click "+ Add Reel" to get started.</p>
          )}
        </div>
      </div>

      {/* Credits Section */}
      <div className={sectionClasses}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Credits</h2>
          <button type="button" onClick={addCredit} className={buttonClasses}>
            + Add Credit
          </button>
        </div>

        <div className="space-y-4">
          {formData.credits.map((credit, idx) => (
            <div key={credit.id} className="border border-neon-cyan/30 rounded-lg p-4">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className={labelClasses}>Category</label>
                  <select
                    value={credit.category}
                    onChange={(e) => updateCredit(idx, 'category', e.target.value)}
                    className={inputClasses}
                  >
                    <option value="Film">Film</option>
                    <option value="TV">TV</option>
                    <option value="Theatre">Theatre</option>
                    <option value="Voiceover">Voiceover</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Project</label>
                  <input
                    type="text"
                    value={credit.project}
                    onChange={(e) => updateCredit(idx, 'project', e.target.value)}
                    placeholder="Movie/Show Name"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Year</label>
                  <input
                    type="number"
                    value={credit.year || ''}
                    onChange={(e) => updateCredit(idx, 'year', parseInt(e.target.value))}
                    placeholder="2024"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClasses}>Role</label>
                  <input
                    type="text"
                    value={credit.role || ''}
                    onChange={(e) => updateCredit(idx, 'role', e.target.value)}
                    placeholder="Lead, Supporting, Guest Star, etc."
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Director</label>
                  <input
                    type="text"
                    value={credit.director || ''}
                    onChange={(e) => updateCredit(idx, 'director', e.target.value)}
                    placeholder="Director Name"
                    className={inputClasses}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeCredit(idx)}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Remove Credit
              </button>
            </div>
          ))}

          {formData.credits.length === 0 && (
            <p className="text-gray-400 text-sm">No credits added yet. Click "+ Add Credit" to get started.</p>
          )}
        </div>
      </div>

      {/* Links Section */}
      <div className={sectionClasses}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Links</h2>
          <button type="button" onClick={addLink} className={buttonClasses}>
            + Add Link
          </button>
        </div>

        <div className="space-y-4">
          {formData.links.map((link, idx) => (
            <div key={idx} className="border border-neon-cyan/30 rounded-lg p-4">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className={labelClasses}>Type</label>
                  <select
                    value={link.type || 'website'}
                    onChange={(e) => updateLink(idx, 'type', e.target.value)}
                    className={inputClasses}
                  >
                    <option value="casting">Casting (IMDb, Actors Access)</option>
                    <option value="social">Social Media</option>
                    <option value="rep">Representation</option>
                    <option value="website">Website</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Label</label>
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => updateLink(idx, 'label', e.target.value)}
                    placeholder="IMDb, Instagram, etc."
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>URL</label>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => updateLink(idx, 'url', e.target.value)}
                    placeholder="https://..."
                    className={inputClasses}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeLink(idx)}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Remove Link
              </button>
            </div>
          ))}

          {formData.links.length === 0 && (
            <p className="text-gray-400 text-sm">No links added yet. Click "+ Add Link" to get started.</p>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSaving}
          className={`${buttonClasses} px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

'use client';

import { useState, useId } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabaseBrowser';

type Props = {
  currentUrl?: string;
  onUploadComplete: (url: string) => void;
  label?: string;
  accept?: string;
};

export function ImageUpload({ currentUrl, onUploadComplete, label = 'Upload Image', accept = 'image/*' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const uniqueId = useId();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const supabase = createBrowserSupabaseClient();

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError('You must be logged in to upload files');
        setUploading(false);
        return;
      }

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload file
      const { data, error: uploadError } = await supabase.storage
        .from('actor-media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('actor-media').getPublicUrl(data.path);

      onUploadComplete(publicUrl);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>

      {currentUrl && (
        <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-neon-cyan/30">
          <img src={currentUrl} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-center gap-3">
        <label
          htmlFor={uniqueId}
          className="cursor-pointer px-4 py-2 bg-gradient-to-r from-neon-pink to-neon-cyan text-white text-sm rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ boxShadow: '0 0 15px rgba(255, 73, 219, 0.4)' }}
        >
          {uploading ? 'Uploading...' : currentUrl ? 'Change Image' : 'Choose File'}
        </label>
        <input
          id={uniqueId}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
        {uploading && <span className="text-sm text-neon-cyan">Uploading...</span>}
      </div>

      {error && (
        <p className="text-sm text-neon-orange">{error}</p>
      )}

      <p className="text-xs text-gray-400">Max file size: 5MB. Supported formats: JPG, PNG, WebP</p>
    </div>
  );
}

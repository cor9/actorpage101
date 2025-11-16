// lib/vimeo.ts

/**
 * Vimeo API integration utilities
 * Used for video hosting and embedding actor reels
 */

export interface VimeoConfig {
  accessToken: string;
  clientId: string;
  clientSecret: string;
}

export function getVimeoConfig(): VimeoConfig {
  return {
    accessToken: process.env.VIMEO_ACCESS_TOKEN || '',
    clientId: process.env.VIMEO_CLIENT_ID || '',
    clientSecret: process.env.VIMEO_CLIENT_SECRET || '',
  };
}

// Note: We currently embed user-provided Vimeo links only. No upload API is used.

/**
 * Get Vimeo embed URL from video ID
 */
export function getVimeoEmbedUrl(vimeoId: string): string {
  return `https://player.vimeo.com/video/${vimeoId}`;
}

/**
 * Extract Vimeo ID from various URL formats
 */
export function extractVimeoId(url: string): string | null {
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

/**
 * Normalize any Vimeo URL or ID into an embeddable URL.
 * If input is already an embed URL, returns it as-is.
 */
export function normalizeVimeoEmbed(input: string): string {
  if (!input) return '';
  // If already an embed URL, keep it
  if (/^https?:\/\/player\.vimeo\.com\/video\/\d+/.test(input)) {
    return input;
  }
  // If it's a plain vimeo URL, extract and convert
  const id = extractVimeoId(input);
  if (id) {
    return getVimeoEmbedUrl(id);
  }
  // If it looks like a numeric ID, treat as ID
  if (/^\d+$/.test(input.trim())) {
    return getVimeoEmbedUrl(input.trim());
  }
  // Fallback: return original (consumer can decide to reject/validate)
  return input;
}

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
 * Includes query parameters for better embedding
 */
export function getVimeoEmbedUrl(vimeoId: string): string {
  return `https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`;
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
 * If input is already an embed URL, ensures proper query parameters.
 */
export function normalizeVimeoEmbed(input: string): string {
  if (!input) return '';

  // If already an embed URL, preserve it but ensure it has the base params
  if (/^https?:\/\/player\.vimeo\.com\/video\/\d+/.test(input)) {
    const id = extractVimeoId(input);
    if (id) {
      // Extract existing query params and merge with defaults
      const url = new URL(input);
      if (!url.searchParams.has('badge')) url.searchParams.set('badge', '0');
      if (!url.searchParams.has('autopause')) url.searchParams.set('autopause', '0');
      if (!url.searchParams.has('player_id')) url.searchParams.set('player_id', '0');
      if (!url.searchParams.has('app_id')) url.searchParams.set('app_id', '58479');
      return url.toString();
    }
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

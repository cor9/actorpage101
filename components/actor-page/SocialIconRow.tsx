import React from 'react';
import { SocialLink } from './types';

interface Props {
  links: SocialLink[];
}

export const SocialIconRow: React.FC<Props> = ({ links }) => {
  const getIcon = (platform: string) => {
    const iconMap: Record<string, string> = {
      instagram: '📷',
      youtube: '▶️',
      tiktok: '🎵',
      imdb: '🎬',
      email: '✉️',
      website: '🌐',
    };
    return iconMap[platform] || '🔗';
  };

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs hover:bg-slate-800/80 transition-colors"
        >
          <span>{getIcon(link.platform)}</span>
          <span className="capitalize">{link.platform}</span>
        </a>
      ))}
    </div>
  );
};

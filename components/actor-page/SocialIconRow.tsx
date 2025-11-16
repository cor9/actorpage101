import React from 'react';
import { SocialLink } from './types';
import { InstagramIcon, YoutubeIcon, TiktokIcon, ImdbIcon, MailIcon, LinkIcon } from '@/lib/icons';

interface Props {
  links: SocialLink[];
}

export const SocialIconRow: React.FC<Props> = ({ links }) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <InstagramIcon className="h-4 w-4" />;
      case 'youtube':
        return <YoutubeIcon className="h-4 w-4" />;
      case 'tiktok':
        return <TiktokIcon className="h-4 w-4" />;
      case 'imdb':
        return <ImdbIcon className="h-4 w-8" />;
      case 'email':
        return <MailIcon className="h-4 w-4" />;
      case 'website':
      default:
        return <LinkIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-300/40 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10 transition-colors"
        >
          <span className="text-current">{getIcon(link.platform)}</span>
          <span className="capitalize">{link.platform}</span>
        </a>
      ))}
    </div>
  );
};

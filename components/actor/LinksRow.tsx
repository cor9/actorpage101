import React from 'react';
import type { ActorLink } from './ActorPageLayout';

interface LinksRowProps {
  links: ActorLink[];
  theme: 'classic-light' | 'classic-dark';
}

export const LinksRow: React.FC<LinksRowProps> = ({ links, theme }) => {
  const getLinkIcon = (link: ActorLink): string | null => {
    // Check for IMDb
    if (link.type === 'casting' && link.label.toLowerCase().includes('imdb')) {
      return 'IMDb';
    }

    // For social links, use first 2 letters as icon
    if (link.type === 'social') {
      return link.label.substring(0, 2).toUpperCase();
    }

    return null;
  };

  const getLinkClasses = () => {
    if (theme === 'classic-light') {
      return 'inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-medium transition-all hover:scale-105 hover:shadow-md';
    } else {
      return 'inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-100 font-medium transition-all hover:scale-105 hover:shadow-lg';
    }
  };

  const containerClasses = theme === 'classic-light'
    ? 'bg-white border-y border-slate-200'
    : 'bg-slate-950 border-y border-slate-900';

  return (
    <section className={`${containerClasses} py-6`}>
      <div className="container mx-auto px-4">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center lg:justify-start flex-wrap">
          {links.map((link, idx) => {
            const icon = getLinkIcon(link);

            return (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={getLinkClasses()}
              >
                {icon && (
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                    theme === 'classic-light'
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {icon === 'IMDb' ? '★' : icon}
                  </span>
                )}
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

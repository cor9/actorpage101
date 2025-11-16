import React from 'react';
import type { ActorCredit } from './ActorPageLayout';

interface HighlightsSectionProps {
  credits: ActorCredit[];
  theme: 'classic-light' | 'classic-dark';
}

export const HighlightsSection: React.FC<HighlightsSectionProps> = ({
  credits,
  theme,
}) => {
  // Pick up to 3 highlights (most recent Film/TV first)
  const getHighlights = (): ActorCredit[] => {
    // Prioritize Film and TV
    const filmTvCredits = credits.filter(
      c => c.category === 'Film' || c.category === 'TV'
    );

    // Sort by year (most recent first), handling null years
    const sorted = [...filmTvCredits].sort((a, b) => {
      if (!a.year && !b.year) return 0;
      if (!a.year) return 1;
      if (!b.year) return -1;
      return b.year - a.year;
    });

    // If we don't have enough Film/TV, add other categories
    if (sorted.length < 3) {
      const otherCredits = credits.filter(
        c => c.category !== 'Film' && c.category !== 'TV'
      );
      sorted.push(...otherCredits);
    }

    return sorted.slice(0, 3);
  };

  const highlights = getHighlights();

  if (highlights.length === 0) return null;

  const cardClasses = theme === 'classic-light'
    ? 'bg-white shadow-lg border-2 border-slate-300 rounded-xl p-6 hover:shadow-xl transition-shadow'
    : 'bg-slate-900 shadow-lg border-2 border-slate-700 rounded-xl p-6 hover:shadow-2xl transition-shadow';

  const textClasses = theme === 'classic-light'
    ? 'text-slate-900'
    : 'text-slate-100';

  const mutedClasses = theme === 'classic-light'
    ? 'text-slate-600'
    : 'text-slate-400';

  const badgeClasses = theme === 'classic-light'
    ? 'inline-block px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-700'
    : 'inline-block px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300';

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${textClasses}`}>
          Highlights
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((credit) => (
            <div key={credit.id} className={cardClasses}>
              <div className="mb-3">
                <span className={badgeClasses}>
                  {credit.category}
                  {credit.year && ` • ${credit.year}`}
                </span>
              </div>

              <h3 className={`text-2xl font-bold mb-2 ${textClasses}`}>
                {credit.project}
              </h3>

              {credit.role && (
                <p className={`text-lg mb-3 ${mutedClasses}`}>
                  {credit.role}
                </p>
              )}

              <p className={`text-sm ${mutedClasses}`}>
                {credit.role
                  ? `${credit.role} role in ${credit.project}`
                  : `Featured in ${credit.project}`}
              </p>

              {credit.director && (
                <p className={`text-sm mt-2 ${mutedClasses}`}>
                  Directed by {credit.director}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

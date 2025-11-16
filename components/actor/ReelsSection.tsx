import React from 'react';
import type { Plan, ActorReel } from './ActorPageLayout';

interface ReelsSectionProps {
  plan: Plan;
  reels: ActorReel[];
  theme: 'classic-light' | 'classic-dark';
}

export const ReelsSection: React.FC<ReelsSectionProps> = ({
  plan,
  reels,
  theme,
}) => {
  // Apply plan-based limits
  const getMaxReels = (plan: Plan): number => {
    if (plan === 'free') return 1;
    if (plan === 'standard') return 4;
    return reels.length; // premium: all
  };

  const maxReels = getMaxReels(plan);
  const visibleReels = reels.slice(0, maxReels);

  const getEmbedUrl = (reel: ActorReel): string | null => {
    if (reel.platform === 'vimeo' && reel.videoId) {
      return `https://player.vimeo.com/video/${reel.videoId}?badge=0&autopause=0&player_id=0&app_id=58479`;
    }
    if (reel.platform === 'youtube' && reel.videoId) {
      return `https://www.youtube.com/embed/${reel.videoId}`;
    }
    if (reel.embedUrl) {
      return reel.embedUrl;
    }
    return null;
  };

  const cardClasses = theme === 'classic-light'
    ? 'bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden'
    : 'bg-slate-900 border border-slate-800 rounded-xl overflow-hidden';

  const textClasses = theme === 'classic-light'
    ? 'text-slate-900'
    : 'text-slate-100';

  const subtextClasses = theme === 'classic-light'
    ? 'text-slate-600'
    : 'text-slate-400';

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${textClasses}`}>
          {visibleReels.length === 1 ? 'Reel' : 'Reels & Clips'}
        </h2>

        <div className={`grid gap-6 ${
          plan === 'premium'
            ? 'md:grid-cols-2 lg:grid-cols-3'
            : visibleReels.length > 1
            ? 'md:grid-cols-2'
            : 'md:grid-cols-1 max-w-3xl'
        }`}>
          {visibleReels.map((reel) => {
            const embedUrl = getEmbedUrl(reel);

            return (
              <div key={reel.id} className={cardClasses}>
                {reel.title && (
                  <div className="p-4 pb-2">
                    <h3 className={`font-semibold text-lg ${textClasses}`}>
                      {reel.title}
                    </h3>
                  </div>
                )}

                <div className="aspect-video bg-black">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={reel.title || 'Actor reel'}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                      allowFullScreen
                      frameBorder="0"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800">
                      <p className="text-slate-400 text-sm">Video unavailable</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {reels.length > maxReels && (
          <p className={`mt-4 text-sm ${subtextClasses}`}>
            Showing {maxReels} of {reels.length} reels.
            {plan === 'free' && ' Upgrade to Standard to show up to 4 reels.'}
            {plan === 'standard' && ' Upgrade to Premium to show all your reels.'}
          </p>
        )}
      </div>
    </section>
  );
};

import React from 'react';
import { Tier, ReelItem } from './types';

interface Props {
  tier: Tier;
  reels: { items: ReelItem[] };
}

export const ReelsSection: React.FC<Props> = ({ tier, reels }) => {
  const { items } = reels;

  const maxFree = 1;
  const maxStandard = 4;
  const visible =
    tier === 'free'
      ? items.slice(0, maxFree)
      : tier === 'standard'
      ? items.slice(0, maxStandard)
      : items;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Reel & Clips</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((reel) => (
          <div
            key={reel.id}
            className="rounded-2xl bg-slate-950/70 p-3 shadow-lg shadow-slate-900/80 border border-slate-800"
          >
            {reel.title && (
              <p className="mb-2 text-xs font-semibold text-slate-200">
                {reel.title}
                {reel.projectLabel && (
                  <span className="ml-1 text-[11px] text-indigo-300">
                    • {reel.projectLabel}
                  </span>
                )}
              </p>
            )}
            <div className="aspect-video overflow-hidden rounded-xl border border-slate-800/80 bg-black">
              <iframe
                src={reel.vimeoUrl}
                title={reel.title}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
              />
            </div>
          </div>
        ))}
      </div>

      {tier === 'free' && (
        <p className="text-[11px] text-slate-400">
          Free plan includes one reel. Add more clips with Standard or Premium.
        </p>
      )}
      {tier === 'standard' && (
        <p className="text-[11px] text-slate-400">
          Unlimited clips and project categories are available with Premium.
        </p>
      )}
    </section>
  );
};

import React from 'react';
import { Tier, ReelItem } from './types';
import { normalizeVimeoEmbed } from '@/lib/vimeo';

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
            className="rounded-2xl bg-dark-purple/70 p-3 shadow-lg border border-neon-pink/30"
          >
            {reel.title && (
              <p className="mb-2 text-xs font-semibold text-white">
                {reel.title}
                {reel.projectLabel && (
                  <span className="ml-1 text-[11px] text-neon-cyan">
                    • {reel.projectLabel}
                  </span>
                )}
              </p>
            )}
            <div className="aspect-video overflow-hidden rounded-xl border border-neon-pink/20 bg-black">
              <iframe
                src={normalizeVimeoEmbed(reel.vimeoUrl)}
                title={reel.title}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
              />
            </div>
          </div>
        ))}
      </div>

      {tier === 'free' && (
        <p className="text-[11px] text-gray-400">
          Free plan includes one reel. Add more clips with Standard or Premium.
        </p>
      )}
      {tier === 'standard' && (
        <p className="text-[11px] text-gray-400">
          Unlimited clips and project categories are available with Premium.
        </p>
      )}
    </section>
  );
};

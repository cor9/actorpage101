import React from 'react';
import { ActorPageConfig, Tier } from './types';

interface Props {
  tier: Tier;
  headshots: ActorPageConfig['headshots'];
}

export const HeadshotsSection: React.FC<Props> = ({ tier, headshots }) => {
  const galleries = headshots.galleries;

  const maxFree = 3;
  const maxStandard = 12;

  const effectiveImages =
    tier === 'free'
      ? galleries[0]?.images.slice(0, maxFree) || []
      : tier === 'standard'
      ? galleries.flatMap((g) => g.images).slice(0, maxStandard)
      : galleries.flatMap((g) => g.images);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Headshots</h2>

      {tier === 'premium' && galleries.length > 1 && (
        <div className="flex flex-wrap gap-2 text-xs">
          {galleries.map((g) => (
            <span
              key={g.id}
              className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1"
            >
              {g.label}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {effectiveImages.map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt={img.alt || ''}
            className="aspect-[3/4] w-full rounded-2xl object-cover shadow-md shadow-slate-900/60 border border-slate-700/70"
          />
        ))}
      </div>

      {tier === 'free' && (
        <p className="text-[11px] text-slate-400">
          Add unlimited headshots with a Standard or Premium plan.
        </p>
      )}
      {tier === 'standard' && (
        <p className="text-[11px] text-slate-400">
          Multiple galleries and full portfolios are available with Premium.
        </p>
      )}
    </section>
  );
};

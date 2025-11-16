import React from 'react';
import { Tier, Album } from './types';

interface Props {
  tier: Tier;
  bts: { albums: Album[] };
}

export const BTSSection: React.FC<Props> = ({ tier, bts }) => {
  const { albums } = bts;

  const allImages = albums.flatMap((album) => album.images);
  const maxStandard = 6;

  const visible =
    tier === 'standard'
      ? allImages.slice(0, maxStandard)
      : allImages;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Behind the Scenes</h2>

      {tier === 'premium' && albums.length > 1 && (
        <div className="flex flex-wrap gap-2 text-xs">
          {albums.map((album) => (
            <span
              key={album.id}
              className="rounded-full border border-neon-pink/30 bg-dark-purple/70 px-3 py-1 text-neon-cyan"
            >
              {album.label}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {visible.map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt={img.alt || 'BTS'}
            className="aspect-square w-full rounded-2xl object-cover shadow-md border border-neon-pink/30"
          />
        ))}
      </div>

      {tier === 'standard' && (
        <p className="text-[11px] text-gray-400">
          Upgrade to Premium for unlimited BTS albums and images.
        </p>
      )}
    </section>
  );
};

import React from 'react';
import { HeroConfig, Tier } from './types';
import { SocialIconRow } from './SocialIconRow';

interface Props {
  config: HeroConfig;
  tier: Tier;
}

export const HeroSection: React.FC<Props> = ({ config, tier }) => {
  const {
    name,
    headshotUrl,
    ageRange,
    location,
    brandLine,
    castingType,
    unionStatus,
    recentCredits,
    socialLinks,
    reps,
  } = config;

  const showExtendedInfo = tier !== 'free';
  const showReps = tier !== 'free' && reps && reps.length > 0;

  return (
    <section className="grid gap-8 md:grid-cols-2 items-center">
      <div className="flex justify-center">
        <img
          src={headshotUrl}
          alt={name}
          className="h-64 w-48 rounded-2xl object-cover shadow-2xl shadow-indigo-900/60 border border-slate-700"
        />
      </div>

      <div className="rounded-3xl bg-slate-950/70 p-6 shadow-2xl shadow-indigo-900/60 border border-slate-800">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-wide">
          {name}
        </h1>

        {brandLine && (
          <p className="mt-2 text-sm md:text-base text-indigo-200">
            {brandLine}
          </p>
        )}

        <div className="mt-3 space-y-1 text-xs md:text-sm text-slate-200/80">
          {ageRange && <p>Age Range: {ageRange}</p>}
          {location && <p>Local Hire: {location}</p>}
          {unionStatus && showExtendedInfo && <p>Union: {unionStatus}</p>}
          {castingType && showExtendedInfo && (
            <p>Casting Type: {castingType}</p>
          )}
          {recentCredits && recentCredits.length > 0 && showExtendedInfo && (
            <p>Recent: {recentCredits.join(' • ')}</p>
          )}
        </div>

        <div className="mt-4">
          <SocialIconRow links={socialLinks} />
        </div>

        {showReps && (
          <div className="mt-4 border-t border-slate-800 pt-3 space-y-2 text-xs md:text-sm">
            {reps!.map((rep, idx) => (
              <div key={idx}>
                <p className="font-semibold text-slate-100">{rep.label}</p>
                <p>{rep.company}</p>
                {rep.contactName && <p>{rep.contactName}</p>}
                {rep.email && (
                  <p className="text-indigo-300">{rep.email}</p>
                )}
                {rep.phone && <p>{rep.phone}</p>}
              </div>
            ))}
          </div>
        )}

        {tier === 'free' && (
          <p className="mt-3 text-[11px] text-slate-400">
            Want a full bio, union details, and rep info? Upgrade to Standard.
          </p>
        )}
      </div>
    </section>
  );
};

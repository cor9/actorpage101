import React from 'react';
import Image from 'next/image';
import type { Plan, ActorProfile, ActorPhoto } from './ActorPageLayout';

interface HeroSectionProps {
  plan: Plan;
  profile: ActorProfile;
  photos: ActorPhoto[];
  theme: 'classic-light' | 'classic-dark';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  plan,
  profile,
  photos,
  theme,
}) => {
  // Find primary photo or use first photo
  const primaryPhoto = photos.find(p => p.isPrimary) || photos[0];

  // Plan-specific styling
  const getHeroStyles = () => {
    const baseClasses = "relative w-full overflow-hidden";

    if (plan === 'premium') {
      // Cinematic look with gradient overlay
      return {
        wrapper: `${baseClasses} bg-gradient-to-br ${
          theme === 'classic-light'
            ? 'from-slate-100 via-slate-50 to-white'
            : 'from-slate-900 via-slate-950 to-black'
        }`,
        inner: 'container mx-auto px-4 py-16 md:py-24',
        nameSize: 'text-5xl md:text-7xl lg:text-8xl',
      };
    } else if (plan === 'standard') {
      // Soft gradient
      return {
        wrapper: `${baseClasses} bg-gradient-to-b ${
          theme === 'classic-light'
            ? 'from-slate-50 to-white'
            : 'from-slate-900 to-slate-950'
        }`,
        inner: 'container mx-auto px-4 py-12 md:py-20',
        nameSize: 'text-4xl md:text-6xl lg:text-7xl',
      };
    } else {
      // Free: flat background
      return {
        wrapper: `${baseClasses} ${
          theme === 'classic-light' ? 'bg-slate-50' : 'bg-slate-950'
        }`,
        inner: 'container mx-auto px-4 py-10 md:py-16',
        nameSize: 'text-3xl md:text-5xl lg:text-6xl',
      };
    }
  };

  const styles = getHeroStyles();

  // Chip classes
  const chipClasses = theme === 'classic-light'
    ? 'inline-block px-3 py-1 rounded-full text-sm bg-slate-200 text-slate-700 border border-slate-300'
    : 'inline-block px-3 py-1 rounded-full text-sm bg-slate-800 text-slate-200 border border-slate-700';

  return (
    <section className={styles.wrapper}>
      <div className={styles.inner}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column: Name, tagline, details */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1 className={`font-bold leading-tight mb-4 ${styles.nameSize}`}>
              {profile.displayName}
            </h1>

            {profile.tagline && (
              <p className={`text-lg md:text-xl lg:text-2xl mb-6 ${
                theme === 'classic-light' ? 'text-slate-600' : 'text-slate-400'
              }`}>
                {profile.tagline}
              </p>
            )}

            {/* Chips row */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {profile.location && (
                <span className={chipClasses}>{profile.location}</span>
              )}
              {profile.ageRange && (
                <span className={chipClasses}>{profile.ageRange}</span>
              )}
              {profile.unionStatus && (
                <span className={chipClasses}>{profile.unionStatus}</span>
              )}
            </div>

            {profile.bio && plan !== 'free' && (
              <p className={`mt-6 text-base md:text-lg leading-relaxed max-w-2xl ${
                theme === 'classic-light' ? 'text-slate-700' : 'text-slate-300'
              }`}>
                {profile.bio}
              </p>
            )}
          </div>

          {/* Right column: Headshot */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className={`relative w-full max-w-md ${
              plan === 'premium' ? 'lg:max-w-lg' : 'lg:max-w-md'
            }`}>
              {primaryPhoto ? (
                <div className={`relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ${
                  plan === 'premium'
                    ? 'ring-2 ring-offset-4 ring-slate-300 dark:ring-slate-700 dark:ring-offset-slate-950'
                    : ''
                }`}>
                  <Image
                    src={primaryPhoto.url}
                    alt={primaryPhoto.alt || `${profile.displayName} headshot`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className={`aspect-[3/4] rounded-2xl flex items-center justify-center ${
                  theme === 'classic-light'
                    ? 'bg-slate-200 border-2 border-slate-300'
                    : 'bg-slate-900 border-2 border-slate-800'
                }`}>
                  <p className={`text-center px-4 ${
                    theme === 'classic-light' ? 'text-slate-500' : 'text-slate-500'
                  }`}>
                    Headshot coming soon
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

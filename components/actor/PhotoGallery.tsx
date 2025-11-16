import React from 'react';
import Image from 'next/image';
import type { Plan, ActorPhoto, ActorProfile } from './ActorPageLayout';

interface PhotoGalleryProps {
  plan: Plan;
  photos: ActorPhoto[];
  profile: ActorProfile;
  theme: 'classic-light' | 'classic-dark';
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  plan,
  photos,
  profile,
  theme,
}) => {
  // Filter out primary photo
  const galleryPhotos = photos.filter(p => !p.isPrimary);

  // Apply plan-based limits
  const getMaxGalleryPhotos = (plan: Plan): number => {
    if (plan === 'free') return 2;
    if (plan === 'standard') return 5;
    return 10; // premium: up to 10
  };

  const maxPhotos = getMaxGalleryPhotos(plan);
  const visiblePhotos = galleryPhotos.slice(0, maxPhotos);

  if (visiblePhotos.length === 0) return null;

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
          Gallery
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visiblePhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-[3/4] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <Image
                src={photo.url}
                alt={photo.alt || `${profile.displayName} photo`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>

        {galleryPhotos.length > maxPhotos && (
          <p className={`mt-4 text-sm ${subtextClasses}`}>
            Showing {maxPhotos} of {galleryPhotos.length} photos.
            {plan === 'free' && ' Upgrade to Standard to show up to 5 gallery photos.'}
            {plan === 'standard' && ' Upgrade to Premium to show up to 10 gallery photos.'}
          </p>
        )}
      </div>
    </section>
  );
};

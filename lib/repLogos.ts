export type RepSlug =
  | 'coast-to-coast'
  | 'bohemia-group'
  | 'osbrink'
  | 'a3'
  | 'uta'
  | 'wme'
  | 'gersh';

export interface RepLogo {
  slug: RepSlug;
  name: string;
  logoPath: string; // path under /public/reps
}

// Placeholder entries; swap logoPath to real assets when library is ready
export const REP_LOGOS: RepLogo[] = [
  { slug: 'coast-to-coast', name: 'Coast to Coast', logoPath: '/reps/coast-to-coast.svg' },
  { slug: 'bohemia-group', name: 'Bohemia Group', logoPath: '/reps/bohemia-group.svg' },
];

export function getRepLogo(slug: RepSlug): RepLogo | undefined {
  return REP_LOGOS.find((r) => r.slug === slug);
}



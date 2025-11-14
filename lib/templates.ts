// Template System for Actor Sites

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  layout: 'classic' | 'modern' | 'minimal' | 'bold' | 'editorial';
}

export interface ColorPreset {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textLight: string;
}

export interface TypographyPreset {
  id: string;
  name: string;
  headingFont: string;
  bodyFont: string;
  headingWeight: string;
  bodyWeight: string;
}

export const TEMPLATES: Template[] = [
  {
    id: 'classic-1',
    name: 'Classic',
    description: 'Traditional actor portfolio with clean layout',
    thumbnail: '/templates/classic.jpg',
    layout: 'classic',
  },
  {
    id: 'modern-1',
    name: 'Modern',
    description: 'Contemporary design with bold typography',
    thumbnail: '/templates/modern.jpg',
    layout: 'modern',
  },
  {
    id: 'minimal-1',
    name: 'Minimal',
    description: 'Simple and elegant with focus on content',
    thumbnail: '/templates/minimal.jpg',
    layout: 'minimal',
  },
  {
    id: 'bold-1',
    name: 'Bold',
    description: 'Eye-catching design for standout performers',
    thumbnail: '/templates/bold.jpg',
    layout: 'bold',
  },
  {
    id: 'editorial-1',
    name: 'Editorial',
    description: 'Magazine-style layout for storytelling',
    thumbnail: '/templates/editorial.jpg',
    layout: 'editorial',
  },
];

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'default',
    name: 'Classic Blue',
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#3b82f6',
    background: '#ffffff',
    text: '#1f2937',
    textLight: '#6b7280',
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    primary: '#7c3aed',
    secondary: '#6d28d9',
    accent: '#8b5cf6',
    background: '#ffffff',
    text: '#1f2937',
    textLight: '#6b7280',
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    primary: '#059669',
    secondary: '#047857',
    accent: '#10b981',
    background: '#ffffff',
    text: '#1f2937',
    textLight: '#6b7280',
  },
  {
    id: 'crimson',
    name: 'Crimson Red',
    primary: '#dc2626',
    secondary: '#b91c1c',
    accent: '#ef4444',
    background: '#ffffff',
    text: '#1f2937',
    textLight: '#6b7280',
  },
  {
    id: 'noir',
    name: 'Noir Black',
    primary: '#111827',
    secondary: '#000000',
    accent: '#374151',
    background: '#ffffff',
    text: '#1f2937',
    textLight: '#6b7280',
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    primary: '#ea580c',
    secondary: '#c2410c',
    accent: '#f97316',
    background: '#ffffff',
    text: '#1f2937',
    textLight: '#6b7280',
  },
];

export const TYPOGRAPHY_PRESETS: TypographyPreset[] = [
  {
    id: 'default',
    name: 'Classic Serif',
    headingFont: 'Georgia, serif',
    bodyFont: 'system-ui, -apple-system, sans-serif',
    headingWeight: '700',
    bodyWeight: '400',
  },
  {
    id: 'modern',
    name: 'Modern Sans',
    headingFont: 'Inter, system-ui, sans-serif',
    bodyFont: 'Inter, system-ui, sans-serif',
    headingWeight: '800',
    bodyWeight: '400',
  },
  {
    id: 'editorial',
    name: 'Editorial',
    headingFont: 'Playfair Display, Georgia, serif',
    bodyFont: 'Source Sans Pro, sans-serif',
    headingWeight: '700',
    bodyWeight: '400',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    headingFont: 'Cormorant Garamond, Georgia, serif',
    bodyFont: 'Lato, sans-serif',
    headingWeight: '600',
    bodyWeight: '400',
  },
  {
    id: 'bold',
    name: 'Bold Impact',
    headingFont: 'Montserrat, sans-serif',
    bodyFont: 'Open Sans, sans-serif',
    headingWeight: '900',
    bodyWeight: '400',
  },
];

// Helper functions
export function getTemplate(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function getColorPreset(id: string): ColorPreset | undefined {
  return COLOR_PRESETS.find((c) => c.id === id);
}

export function getTypographyPreset(id: string): TypographyPreset | undefined {
  return TYPOGRAPHY_PRESETS.find((t) => t.id === id);
}

// Generate CSS custom properties from presets
export function generateColorCSS(preset: ColorPreset): string {
  return `
    --color-primary: ${preset.primary};
    --color-secondary: ${preset.secondary};
    --color-accent: ${preset.accent};
    --color-background: ${preset.background};
    --color-text: ${preset.text};
    --color-text-light: ${preset.textLight};
  `.trim();
}

export function generateTypographyCSS(preset: TypographyPreset): string {
  return `
    --font-heading: ${preset.headingFont};
    --font-body: ${preset.bodyFont};
    --weight-heading: ${preset.headingWeight};
    --weight-body: ${preset.bodyWeight};
  `.trim();
}

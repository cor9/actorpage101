import React from 'react';
import { ActorPageConfig, SectionKey, DEFAULT_SECTION_ORDER } from './types';
import { generateColorCSS, generateTypographyCSS, getColorPreset, getTypographyPreset } from '@/lib/templates';
import { HeroSection } from './HeroSection';
import { SectionDivider } from './SectionDivider';
import { HeadshotsSection } from './HeadshotsSection';
import { ReelsSection } from './ReelsSection';
import { BTSSection } from './BTSSection';
import { ProjectsSection } from './ProjectsSection';
import {
  ResumeSectionFree,
  ResumeSectionStandard,
  ResumeSectionPremium,
} from './ResumeSections';
import { ContactSection } from './ContactSection';
import { LockedCards } from './LockedCards';

interface Props {
  config: ActorPageConfig;
}

// Default section order (fallback for pages without custom order)
const DEFAULT_ORDER: SectionKey[] = DEFAULT_SECTION_ORDER.filter(key => key !== 'hero');

export const ActorPageLayout: React.FC<Props> = ({ config }) => {
  const { tier } = config;
  // Resolve theme (basic customization via presets or inline values)
  const colorVars = getColorPreset('default');
  const typeVars = getTypographyPreset('modern');

  // Get section order: use custom order if available, otherwise use default
  const sectionOrder = config.section_order
    ? config.section_order.filter(key => key !== 'hero') // Remove hero from custom order (always first)
    : DEFAULT_ORDER;

  // Helper function to render a section based on its key
  const renderSection = (sectionKey: SectionKey) => {
    switch (sectionKey) {
      case 'hero':
        // Hero is always rendered first, not in the loop
        return null;

      case 'headshots':
        return (
          <React.Fragment key="headshots">
            <SectionDivider label="#headshots" />
            <HeadshotsSection tier={tier} headshots={config.headshots} />
          </React.Fragment>
        );

      case 'reels':
        return (
          <React.Fragment key="reels">
            <SectionDivider label="#reels" />
            <ReelsSection tier={tier} reels={config.reels} />
          </React.Fragment>
        );

      case 'bts':
        // Only render BTS for Standard/Premium tiers
        if (tier === 'free') return null;
        return (
          <React.Fragment key="bts">
            <SectionDivider label="#behind-the-scenes" />
            <BTSSection tier={tier} bts={config.bts} />
          </React.Fragment>
        );

      case 'projects':
        // Only render Projects for Premium tier
        if (tier !== 'premium') return null;
        return (
          <React.Fragment key="projects">
            <SectionDivider label="#projects" />
            <ProjectsSection projects={config.projects} />
          </React.Fragment>
        );

      case 'resume':
        return (
          <React.Fragment key="resume">
            <SectionDivider label="#resume" />
            {tier === 'free' && <ResumeSectionFree resume={config.resume} />}
            {tier === 'standard' && <ResumeSectionStandard resume={config.resume} />}
            {tier === 'premium' && <ResumeSectionPremium resume={config.resume} />}
          </React.Fragment>
        );

      case 'contact':
        return (
          <React.Fragment key="contact">
            <SectionDivider label="#contact" />
            <ContactSection
              contact={config.contact}
              reps={config.hero.reps}
              tier={tier}
            />
          </React.Fragment>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen text-white"
      style={
        {
          ...(colorVars ? ({} as any) : {}),
          // Apply CSS variables
          cssText: `${colorVars ? generateColorCSS(colorVars) : ''};${typeVars ? generateTypographyCSS(typeVars) : ''}`,
          background:
            'linear-gradient(180deg, var(--color-background) 0%, rgba(0,0,0,0.02) 100%)',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-body)',
        } as any
      }
    >
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-16">
        {/* Hero is always first */}
        <HeroSection config={config.hero} tier={tier} />

        {/* Render sections in custom or default order */}
        {sectionOrder.map((sectionKey) => renderSection(sectionKey))}

        {/* Locked cards always at the end */}
        <LockedCards tier={tier} />
      </div>
    </div>
  );
};

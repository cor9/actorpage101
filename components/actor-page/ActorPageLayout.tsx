import React from 'react';
import { ActorPageConfig } from './types';
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

export const ActorPageLayout: React.FC<Props> = ({ config }) => {
  const { tier } = config;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-purple via-deep-purple to-dark-purple text-white">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-16">
        <HeroSection config={config.hero} tier={tier} />

        <SectionDivider label="#headshots" />
        <HeadshotsSection tier={tier} headshots={config.headshots} />

        <SectionDivider label="#reels" />
        <ReelsSection tier={tier} reels={config.reels} />

        {tier !== 'free' && (
          <>
            <SectionDivider label="#behind-the-scenes" />
            <BTSSection tier={tier} bts={config.bts} />
          </>
        )}

        {tier === 'premium' && (
          <>
            <SectionDivider label="#projects" />
            <ProjectsSection projects={config.projects} />
          </>
        )}

        <SectionDivider label="#resume" />
        {tier === 'free' && <ResumeSectionFree resume={config.resume} />}
        {tier === 'standard' && <ResumeSectionStandard resume={config.resume} />}
        {tier === 'premium' && <ResumeSectionPremium resume={config.resume} />}

        <SectionDivider label="#contact" />
        <ContactSection
          contact={config.contact}
          reps={config.hero.reps}
          tier={tier}
        />

        <LockedCards tier={tier} />
      </div>
    </div>
  );
};

import React from 'react';

interface Props {
  label: string;
}

export const SectionDivider: React.FC<Props> = ({ label }) => (
  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-neon-cyan">
    <div className="h-px flex-1 bg-neon-pink/40" />
    <span>{label}</span>
    <div className="h-px flex-1 bg-neon-pink/40" />
  </div>
);

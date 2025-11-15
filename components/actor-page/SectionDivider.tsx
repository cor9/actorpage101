import React from 'react';

interface Props {
  label: string;
}

export const SectionDivider: React.FC<Props> = ({ label }) => (
  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-slate-400/70">
    <div className="h-px flex-1 bg-slate-700/70" />
    <span>{label}</span>
    <div className="h-px flex-1 bg-slate-700/70" />
  </div>
);

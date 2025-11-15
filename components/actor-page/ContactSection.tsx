import React from 'react';
import { ContactConfig, RepInfo, Tier } from './types';

interface Props {
  contact: ContactConfig;
  reps?: RepInfo[];
  tier: Tier;
}

export const ContactSection: React.FC<Props> = ({ contact, reps, tier }) => {
  const showReps = contact.showReps && tier !== 'free' && reps && reps.length > 0;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Contact</h2>

      <div className="rounded-2xl bg-slate-950/70 p-5 border border-slate-800 shadow-lg shadow-slate-900/80">
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-xs text-slate-400 mb-1">Parent/Guardian Email</p>
            <a
              href={`mailto:${contact.parentEmail}`}
              className="text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              {contact.parentEmail}
            </a>
          </div>

          {showReps && (
            <div className="border-t border-slate-800 pt-3 space-y-2">
              <p className="text-xs text-slate-400 mb-2">Representation</p>
              {reps!.map((rep, idx) => (
                <div key={idx} className="text-xs">
                  <p className="font-semibold text-slate-100">{rep.label}</p>
                  <p className="text-slate-300">{rep.company}</p>
                  {rep.contactName && (
                    <p className="text-slate-300">{rep.contactName}</p>
                  )}
                  {rep.email && (
                    <a
                      href={`mailto:${rep.email}`}
                      className="text-indigo-300 hover:text-indigo-200"
                    >
                      {rep.email}
                    </a>
                  )}
                  {rep.phone && <p className="text-slate-300">{rep.phone}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

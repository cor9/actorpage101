import React from 'react';
import { ResumeConfig } from './types';

export const ResumeSectionFree: React.FC<{ resume: ResumeConfig }> = ({
  resume,
}) => {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">Resume</h2>
      {resume.externalUrl ? (
        <a
          href={resume.externalUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full border border-neon-pink/40 px-4 py-2 text-xs font-medium hover:bg-dark-purple/60 transition-colors text-neon-cyan"
        >
          View Resume
        </a>
      ) : (
        <p className="text-xs text-gray-400">
          Add an external resume link (Google Drive, Dropbox, Actors Access,
          etc.).
        </p>
      )}
      <p className="text-[11px] text-gray-400">
        Built-in resume viewer and structured resume are available on Standard
        and Premium plans.
      </p>
    </section>
  );
};

export const ResumeSectionStandard: React.FC<{ resume: ResumeConfig }> = ({
  resume,
}) => {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">Resume</h2>
      {resume.pdfUrl ? (
        <div className="rounded-2xl bg-dark-purple/70 p-4 border border-neon-pink/30 shadow-lg">
          <p className="mb-2 text-xs text-gray-300">PDF Resume</p>
          <iframe
            src={resume.pdfUrl}
            className="h-80 w-full rounded-xl border border-neon-pink/20 bg-black"
          />
        </div>
      ) : (
        <p className="text-xs text-gray-400">
          Upload a PDF resume in your dashboard to show it here.
        </p>
      )}
      <p className="text-[11px] text-gray-400">
        Fully structured resumes with film/TV, theatre, training, and skills
        are available with Premium.
      </p>
    </section>
  );
};

export const ResumeSectionPremium: React.FC<{ resume: ResumeConfig }> = ({
  resume,
}) => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Resume</h2>

      {resume.pdfUrl && (
        <a
          href={resume.pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan px-4 py-2 text-xs font-semibold transition-all"
          style={{ boxShadow: '0 0 12px rgba(255, 73, 219, 0.4)' }}
        >
          Download PDF Resume
        </a>
      )}

      <div className="rounded-2xl bg-dark-purple/70 p-5 border border-neon-pink/30 shadow-lg text-xs md:text-sm space-y-4">
        {resume.filmTvCredits && resume.filmTvCredits.length > 0 && (
          <div>
            <h3 className="font-semibold text-white mb-1">Film / TV</h3>
            <ul className="space-y-1 text-gray-200/90">
              {resume.filmTvCredits.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        )}
        {resume.theatreCredits && resume.theatreCredits.length > 0 && (
          <div>
            <h3 className="font-semibold text-white mb-1">Theatre</h3>
            <ul className="space-y-1 text-gray-200/90">
              {resume.theatreCredits.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        )}
        {resume.training && resume.training.length > 0 && (
          <div>
            <h3 className="font-semibold text-white mb-1">Training</h3>
            <ul className="space-y-1 text-gray-200/90">
              {resume.training.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        )}
        {resume.skills && resume.skills.length > 0 && (
          <div>
            <h3 className="font-semibold text-white mb-1">Skills</h3>
            <p className="text-gray-200/90">{resume.skills.join(' • ')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

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
          className="inline-flex items-center rounded-full border border-slate-600 px-4 py-2 text-xs font-medium hover:bg-slate-900/60 transition-colors"
        >
          View Resume
        </a>
      ) : (
        <p className="text-xs text-slate-400">
          Add an external resume link (Google Drive, Dropbox, Actors Access,
          etc.).
        </p>
      )}
      <p className="text-[11px] text-slate-500">
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
        <div className="rounded-2xl bg-slate-950/70 p-4 border border-slate-800 shadow-lg shadow-slate-900/80">
          <p className="mb-2 text-xs text-slate-300">PDF Resume</p>
          <iframe
            src={resume.pdfUrl}
            className="h-80 w-full rounded-xl border border-slate-800 bg-black"
          />
        </div>
      ) : (
        <p className="text-xs text-slate-400">
          Upload a PDF resume in your dashboard to show it here.
        </p>
      )}
      <p className="text-[11px] text-slate-500">
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
          className="inline-flex items-center rounded-full bg-indigo-600/90 px-4 py-2 text-xs font-semibold hover:bg-indigo-500 transition-colors"
        >
          Download PDF Resume
        </a>
      )}

      <div className="rounded-2xl bg-slate-950/70 p-5 border border-slate-800 shadow-lg shadow-slate-900/80 text-xs md:text-sm space-y-4">
        {resume.filmTvCredits && resume.filmTvCredits.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-100 mb-1">Film / TV</h3>
            <ul className="space-y-1 text-slate-200/90">
              {resume.filmTvCredits.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        )}
        {resume.theatreCredits && resume.theatreCredits.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-100 mb-1">Theatre</h3>
            <ul className="space-y-1 text-slate-200/90">
              {resume.theatreCredits.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        )}
        {resume.training && resume.training.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-100 mb-1">Training</h3>
            <ul className="space-y-1 text-slate-200/90">
              {resume.training.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        )}
        {resume.skills && resume.skills.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-100 mb-1">Skills</h3>
            <p className="text-slate-200/90">{resume.skills.join(' • ')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

import React from 'react';
import type { ActorProfile } from './ActorPageLayout';

interface ActorFooterProps {
  profile: ActorProfile;
  theme: 'classic-light' | 'classic-dark';
}

export const ActorFooter: React.FC<ActorFooterProps> = ({ profile, theme }) => {
  const currentYear = new Date().getFullYear();

  const borderClasses = theme === 'classic-light'
    ? 'border-t border-slate-200'
    : 'border-t border-slate-900';

  const textClasses = theme === 'classic-light'
    ? 'text-slate-700'
    : 'text-slate-300';

  const mutedClasses = theme === 'classic-light'
    ? 'text-slate-500'
    : 'text-slate-500';

  return (
    <footer className={`${borderClasses} py-8 mt-12`}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className={`text-sm ${textClasses} mb-2`}>
            © {currentYear} {profile.displayName}
          </p>

          <div className={`mt-6 text-xs ${mutedClasses}`}>
            Actor Page 101 is a service of{' '}
            <a
              href="https://childactor101.com"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              Child Actor 101
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  );
};

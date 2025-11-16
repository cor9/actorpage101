import React from 'react';
import { Tier } from './types';

interface Props {
  tier: Tier;
}

export const LockedCards: React.FC<Props> = ({ tier }) => {
  if (tier === 'premium') {
    return null;
  }

  const freeCards = [
    {
      title: 'Unlimited Headshots',
      description: 'Showcase your full range with unlimited professional headshots.',
    },
    {
      title: 'Multiple Reels & Clips',
      description: 'Upload multiple clips from different projects.',
    },
    {
      title: 'Behind-the-Scenes Albums',
      description: 'Share your creative process with BTS photo albums.',
    },
    {
      title: 'PDF Resume Viewer',
      description: 'Embed your resume directly on your site.',
    },
    {
      title: 'Rep Contact Info',
      description: 'Display your agent and manager information.',
    },
  ];

  const standardCards = [
    {
      title: 'Project Gallery',
      description: 'Showcase all your film, TV, and theatre work with posters and details.',
    },
    {
      title: 'Structured Resume',
      description: 'Full inline resume with credits, training, and skills beautifully formatted.',
    },
    {
      title: 'Unlimited BTS Albums',
      description: 'Create multiple behind-the-scenes photo albums organized by project.',
    },
    {
      title: 'Unlimited Clips',
      description: 'No limits on how many reels and clips you can showcase.',
    },
  ];

  const cards = tier === 'free' ? freeCards : standardCards;
  const upgradeText = tier === 'free' ? 'Upgrade to Standard or Premium' : 'Upgrade to Premium';

  return (
    <section className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">Unlock More Features</h2>
        <p className="text-sm text-gray-400">{upgradeText} to access these features</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-2xl bg-dark-purple/60 p-5 border border-neon-pink/30 shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 to-transparent" />
            <div className="relative space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-neon-pink/30 flex items-center justify-center text-xs">
                  🔒
                </div>
                <h3 className="font-semibold text-white">{card.title}</h3>
              </div>
              <p className="text-xs text-gray-300">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <button className="rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan px-6 py-3 text-sm font-semibold transition-all" style={{ boxShadow: '0 0 15px rgba(255, 73, 219, 0.4)' }}>
          {upgradeText}
        </button>
      </div>
    </section>
  );
};

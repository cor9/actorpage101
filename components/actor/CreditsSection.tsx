import React from 'react';
import type { Plan, ActorCredit } from './ActorPageLayout';

interface CreditsSectionProps {
  plan: Plan;
  credits: ActorCredit[];
  theme: 'classic-light' | 'classic-dark';
}

export const CreditsSection: React.FC<CreditsSectionProps> = ({
  plan,
  credits,
  theme,
}) => {
  // Apply plan-based limits
  const getMaxCredits = (plan: Plan): number => {
    if (plan === 'free') return 5;
    if (plan === 'standard') return 20;
    return credits.length; // premium: all
  };

  const maxCredits = getMaxCredits(plan);

  // For premium, categorize credits
  const renderPremiumCredits = () => {
    const categories = ['Film', 'TV', 'Theatre', 'Voiceover', 'Other'] as const;
    const categorizedCredits: Record<string, ActorCredit[]> = {};

    credits.forEach(credit => {
      if (!categorizedCredits[credit.category]) {
        categorizedCredits[credit.category] = [];
      }
      categorizedCredits[credit.category].push(credit);
    });

    return (
      <div className="space-y-10">
        {categories.map(category => {
          const categoryCredits = categorizedCredits[category];
          if (!categoryCredits || categoryCredits.length === 0) return null;

          return (
            <div key={category}>
              <h3 className={`text-2xl font-semibold mb-4 ${
                theme === 'classic-light' ? 'text-slate-800' : 'text-slate-200'
              }`}>
                {category}
              </h3>
              <CreditTable credits={categoryCredits} theme={theme} />
            </div>
          );
        })}
      </div>
    );
  };

  const visibleCredits = credits.slice(0, maxCredits);

  const textClasses = theme === 'classic-light'
    ? 'text-slate-900'
    : 'text-slate-100';

  const subtextClasses = theme === 'classic-light'
    ? 'text-slate-600'
    : 'text-slate-400';

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${textClasses}`}>
          Selected Credits
        </h2>

        {plan === 'premium' ? (
          renderPremiumCredits()
        ) : (
          <CreditTable credits={visibleCredits} theme={theme} />
        )}

        {plan !== 'premium' && credits.length > maxCredits && (
          <p className={`mt-4 text-sm ${subtextClasses}`}>
            Showing {maxCredits} of {credits.length} credits.
            {plan === 'free' && ' Upgrade to Standard to show up to 20 credits.'}
            {plan === 'standard' && ' Upgrade to Premium to show all credits with categorization.'}
          </p>
        )}
      </div>
    </section>
  );
};

// Credit table component
const CreditTable: React.FC<{
  credits: ActorCredit[];
  theme: 'classic-light' | 'classic-dark';
}> = ({ credits, theme }) => {
  const tableClasses = theme === 'classic-light'
    ? 'bg-white border border-slate-200 rounded-lg overflow-hidden'
    : 'bg-slate-900 border border-slate-800 rounded-lg overflow-hidden';

  const headerClasses = theme === 'classic-light'
    ? 'bg-slate-100 text-slate-900 font-semibold'
    : 'bg-slate-800 text-slate-100 font-semibold';

  const rowClasses = theme === 'classic-light'
    ? 'border-b border-slate-200 hover:bg-slate-50'
    : 'border-b border-slate-800 hover:bg-slate-850';

  const textClasses = theme === 'classic-light'
    ? 'text-slate-900'
    : 'text-slate-100';

  const mutedClasses = theme === 'classic-light'
    ? 'text-slate-600 text-sm'
    : 'text-slate-400 text-sm';

  return (
    <div className={tableClasses}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={headerClasses}>
              <th className="px-4 py-3 text-left">Project</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Category</th>
              <th className="px-4 py-3 text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            {credits.map((credit) => (
              <tr key={credit.id} className={rowClasses}>
                <td className={`px-4 py-3 ${textClasses}`}>
                  {credit.project}
                  {credit.director && (
                    <div className={mutedClasses}>
                      Dir. {credit.director}
                    </div>
                  )}
                </td>
                <td className={`px-4 py-3 ${textClasses}`}>
                  {credit.role || '—'}
                </td>
                <td className={`px-4 py-3 ${textClasses} hidden md:table-cell`}>
                  {credit.category}
                </td>
                <td className={`px-4 py-3 ${textClasses}`}>
                  {credit.year || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

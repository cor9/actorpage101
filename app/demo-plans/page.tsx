import React from 'react';
import Link from 'next/link';

export default function DemoPlansIndex() {
  const plans = [
    {
      name: 'Free',
      href: '/demo-plans/free',
      description: 'Basic actor portfolio with essential features',
      features: [
        '1 reel',
        '3 photos (1 primary + 2 gallery)',
        '5 credits',
        'Basic links',
        'Simple hero design',
      ],
    },
    {
      name: 'Standard',
      href: '/[slug]',
      description: 'Full-featured portfolio for working actors',
      features: [
        '4 reels',
        '6 photos (1 primary + 5 gallery)',
        '20 credits',
        'Multiple links',
        'Enhanced hero with bio',
        'Soft gradient styling',
      ],
    },
    {
      name: 'Premium',
      href: '/demo-plans/premium',
      description: 'Professional portfolio with cinematic presentation',
      features: [
        'Unlimited reels',
        '11 photos (1 primary + 10 gallery)',
        'Unlimited credits with categorization',
        'Highlights section',
        'Cinematic hero design',
        'Light/dark theme options',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-center">
            Actor Page 101 Plans
          </h1>
          <p className="text-xl text-slate-400 mb-12 text-center">
            Compare our three plan tiers to find the perfect fit
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Link
                key={plan.name}
                href={plan.href}
                className="block bg-slate-900 border-2 border-slate-800 rounded-xl p-6 hover:border-slate-600 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-slate-400 text-sm mb-4">{plan.description}</p>

                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 text-center">
                  <span className="inline-block px-4 py-2 bg-slate-800 rounded-full text-sm font-semibold hover:bg-slate-700 transition-colors">
                    View Demo →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-400">
              All demos use mock data to showcase features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Plan Demos - Actor Page 101',
  description: 'Compare Free, Standard, and Premium plan features',
};

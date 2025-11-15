'use client';

import { useState } from 'react';

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpgrade = async (tier: 'standard' | 'premium', interval: 'monthly' | 'yearly') => {
    setLoading(`${tier}-${interval}`);
    setError(null);

    try {
      // Get the appropriate price ID from env
      const priceIds = {
        'standard-monthly': process.env.NEXT_PUBLIC_STRIPE_STANDARD_MONTHLY_PRICE_ID,
        'standard-yearly': process.env.NEXT_PUBLIC_STRIPE_STANDARD_YEARLY_PRICE_ID,
        'premium-monthly': process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID,
        'premium-yearly': process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID,
      };

      const priceId = priceIds[`${tier}-${interval}` as keyof typeof priceIds];

      if (!priceId) {
        throw new Error('Price ID not configured');
      }

      // Call checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, tier, interval }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      console.error('Upgrade error:', err);
      setError(err.message || 'An error occurred');
      setLoading(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6" style={{ textShadow: '0 0 15px rgba(255, 73, 219, 0.5)' }}>
        Billing & Subscription
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-neon-orange/10 border border-neon-orange/30 rounded-lg">
          <p className="text-sm text-neon-orange">{error}</p>
        </div>
      )}

      <div className="bg-dark-purple/50 backdrop-blur-sm border border-neon-pink/30 shadow-xl rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Current Plan</h2>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-bold text-neon-pink">Free Plan</p>
            <p className="text-gray-300">2 headshots, 1 reel</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Standard Plan */}
        <div className="bg-dark-purple/50 backdrop-blur-sm border border-neon-cyan/30 shadow-xl rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Standard Plan</h3>
          <div className="mb-4">
            <p className="text-3xl font-bold text-neon-cyan">$12/month</p>
            <p className="text-sm text-gray-400">or $101/year (save $43)</p>
          </div>
          <ul className="space-y-2 text-gray-300 mb-4">
            <li>✓ 5 headshots, 4 reels</li>
            <li>✓ All templates</li>
            <li>✓ Vimeo integration</li>
            <li>✓ PDF resume embed</li>
          </ul>
          <button
            onClick={() => handleUpgrade('standard', 'monthly')}
            disabled={loading === 'standard-monthly'}
            className="w-full px-4 py-2 bg-gradient-to-r from-neon-cyan to-neon-pink text-white rounded-lg font-medium mb-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ boxShadow: '0 0 15px rgba(50, 240, 255, 0.4)' }}
          >
            {loading === 'standard-monthly' ? 'Loading...' : 'Select Monthly'}
          </button>
          <button
            onClick={() => handleUpgrade('standard', 'yearly')}
            disabled={loading === 'standard-yearly'}
            className="w-full px-4 py-2 border border-neon-cyan text-neon-cyan rounded-lg hover:bg-neon-cyan/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === 'standard-yearly' ? 'Loading...' : 'Select Yearly'}
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-dark-purple/50 backdrop-blur-sm border-2 border-neon-orange shadow-xl rounded-lg p-6 relative" style={{ boxShadow: '0 0 20px rgba(255, 129, 50, 0.3)' }}>
          <div className="text-center mb-2">
            <span className="bg-gradient-to-r from-neon-pink to-neon-orange text-white px-3 py-1 rounded-full text-xs font-semibold">
              MOST POPULAR
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-4">Premium Plan</h3>
          <div className="mb-4">
            <p className="text-3xl font-bold text-neon-orange">$20/month</p>
            <p className="text-sm text-gray-400">or $199/year (save $41)</p>
          </div>
          <ul className="space-y-2 text-gray-300 mb-4">
            <li>✓ 10 headshots, unlimited reels</li>
            <li>✓ Structured resume builder</li>
            <li>✓ Projects showcase</li>
            <li>✓ Priority support</li>
          </ul>
          <button
            onClick={() => handleUpgrade('premium', 'monthly')}
            disabled={loading === 'premium-monthly'}
            className="w-full px-4 py-2 bg-gradient-to-r from-neon-orange to-neon-pink text-white rounded-lg font-medium mb-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ boxShadow: '0 0 15px rgba(255, 129, 50, 0.4)' }}
          >
            {loading === 'premium-monthly' ? 'Loading...' : 'Select Monthly'}
          </button>
          <button
            onClick={() => handleUpgrade('premium', 'yearly')}
            disabled={loading === 'premium-yearly'}
            className="w-full px-4 py-2 border border-neon-orange text-neon-orange rounded-lg hover:bg-neon-orange/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === 'premium-yearly' ? 'Loading...' : 'Select Yearly'}
          </button>
        </div>
      </div>

      <div className="bg-dark-purple/50 backdrop-blur-sm border border-neon-pink/30 shadow-xl rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Payment Method</h2>
        <p className="text-gray-300 mb-4">Manage your subscription through Stripe</p>
        <p className="text-sm text-gray-400">After upgrading, you can manage your subscription and payment methods in the Stripe customer portal.</p>
      </div>

      <div className="mt-6 bg-dark-purple/30 border border-neon-cyan/20 rounded-lg p-6">
        <h3 className="font-semibold text-white mb-2">Billing History</h3>
        <p className="text-gray-400 text-sm">View invoices and payment history in the Stripe customer portal after subscribing.</p>
      </div>
    </div>
  );
}

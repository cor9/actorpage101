// lib/stripe.ts
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

export const STRIPE_PRICE_IDS = {
  standard: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_STANDARD_MONTHLY_PRICE_ID!,
    yearly: process.env.NEXT_PUBLIC_STRIPE_STANDARD_YEARLY_PRICE_ID!,
  },
  premium: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID!,
    yearly: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID!,
  },
};

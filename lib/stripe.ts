// lib/stripe.ts
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

export const STRIPE_PRICE_IDS = {
  standard: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID!,
  premium: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID!,
};

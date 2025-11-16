import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { STRIPE_PRICE_IDS } from '@/lib/stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { priceId, tier, interval } = await req.json();

    if (!priceId || !tier || !interval) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate and normalize price against server allowlist
    const normalizedInterval = String(interval).toLowerCase() as 'monthly' | 'yearly';
    const normalizedTier = String(tier).toLowerCase() as 'standard' | 'premium';

    if (!['standard', 'premium'].includes(normalizedTier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }
    if (!['monthly', 'yearly'].includes(normalizedInterval)) {
      return NextResponse.json({ error: 'Invalid interval' }, { status: 400 });
    }

    const allowedPriceId =
      STRIPE_PRICE_IDS[normalizedTier as 'standard' | 'premium'][normalizedInterval];

    if (!allowedPriceId) {
      return NextResponse.json({ error: 'Price not configured on server' }, { status: 500 });
    }

    // If client provided priceId doesn't match allowlist, ignore client value
    const finalPriceId = priceId === allowedPriceId ? priceId : allowedPriceId;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      client_reference_id: user.id,
      line_items: [
        {
          price: finalPriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/billing?canceled=true`,
      metadata: {
        user_id: user.id,
        tier,
        interval,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

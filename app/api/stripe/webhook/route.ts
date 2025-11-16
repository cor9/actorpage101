import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerSupabaseClient } from '@/lib/supabaseServer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    const supabase = await createServerSupabaseClient();

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = (session.metadata && session.metadata['user_id']) || '';
        const tier = (session.metadata && session.metadata['tier']) || '';

        if (userId && tier) {
          await supabase
            .from('profiles')
            .update({ subscription_tier: tier })
            .eq('id', userId);
        }
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        // Optional: map Stripe price/product to our tiers if not using metadata
        break;
      }
      case 'customer.subscription.deleted': {
        // Downgrade to free on cancel
        const subscription = event.data.object as Stripe.Subscription;
        const userId = (subscription.metadata && subscription.metadata['user_id']) || '';
        if (userId) {
          await supabase
            .from('profiles')
            .update({ subscription_tier: 'free' })
            .eq('id', userId);
        }
        break;
      }
      default:
        // Ignore other events
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



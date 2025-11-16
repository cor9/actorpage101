import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabaseServer';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if current user is admin
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Parse request body
    const body = await request.json();
    const { userId, subscriptionTier } = body;

    if (!userId || !subscriptionTier) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, subscriptionTier' },
        { status: 400 }
      );
    }

    // Validate subscription tier
    const validTiers = ['free', 'standard', 'premium'];
    if (!validTiers.includes(subscriptionTier)) {
      return NextResponse.json(
        { error: 'Invalid subscription tier. Must be: free, standard, or premium' },
        { status: 400 }
      );
    }

    // Update user's subscription tier
    const { data, error } = await supabase
      .from('profiles')
      .update({ subscription_tier: subscriptionTier })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating subscription:', error);
      return NextResponse.json(
        { error: 'Failed to update subscription: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `User subscription updated to ${subscriptionTier}`,
      data,
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

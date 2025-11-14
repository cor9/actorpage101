// lib/featureFlags.ts
import { Profile, FeatureFlags } from '@/types/db';

/**
 * Check if a user has access to a specific feature
 */
export function hasFeatureAccess(
  profile: Profile,
  featureKey: keyof FeatureFlags
): boolean {
  return profile.feature_flags[featureKey] === true;
}

/**
 * Check if feature is available for the user's subscription tier
 */
export function isFeatureAvailableForTier(
  tier: Profile['subscription_tier'],
  feature: string
): boolean {
  const tierFeatures = {
    free: [] as string[],
    standard: ['vimeo_integration', 'resume101'],
    premium: ['vimeo_integration', 'resume101', 'audition_tracker', 'advanced_analytics'],
  };

  return tierFeatures[tier]?.includes(feature) || false;
}

/**
 * Get all enabled features for a user
 */
export function getEnabledFeatures(profile: Profile): string[] {
  const enabled: string[] = [];

  Object.entries(profile.feature_flags).forEach(([key, value]) => {
    if (value === true) {
      enabled.push(key);
    }
  });

  return enabled;
}

/**
 * Determine if user can access premium features
 */
export function canAccessPremiumFeatures(profile: Profile): boolean {
  return profile.subscription_tier === 'premium';
}

/**
 * Determine if user can access standard features
 */
export function canAccessStandardFeatures(profile: Profile): boolean {
  return ['standard', 'premium'].includes(profile.subscription_tier);
}

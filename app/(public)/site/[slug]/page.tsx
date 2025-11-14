import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { getColorPreset, getTypographyPreset } from '@/lib/templates';
import ClassicTemplate from '@/components/templates/ClassicTemplate';

export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getActorSite(slug: string) {
  const supabase = await createServerSupabaseClient();

  // Get site by slug
  const { data: siteData, error: siteError } = await supabase
    .from('sites')
    .select('*')
    .eq('site_slug', slug)
    .eq('is_published', true)
    .single();

  if (siteError || !siteData) {
    return null;
  }

  // Get actor profile and bio
  const { data: profileData } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', siteData.user_id)
    .single();

  const { data: bioData } = await supabase
    .from('bio')
    .select('*')
    .eq('user_id', siteData.user_id)
    .single();

  // Get photos
  const { data: photosData } = await supabase
    .from('photos')
    .select('*')
    .eq('user_id', siteData.user_id)
    .order('sort_order', { ascending: true });

  // Get videos
  const { data: videosData } = await supabase
    .from('videos')
    .select('*')
    .eq('user_id', siteData.user_id)
    .order('sort_order', { ascending: true });

  // Get credits
  const { data: creditsData } = await supabase
    .from('credits')
    .select('*')
    .eq('user_id', siteData.user_id)
    .order('year', { ascending: false });

  return {
    site: siteData,
    profile: profileData,
    bio: bioData,
    photos: photosData || [],
    videos: videosData || [],
    credits: creditsData || [],
  };
}

export default async function ActorSitePage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getActorSite(slug);

  if (!data) {
    notFound();
  }

  const { site, profile, bio, photos, videos, credits } = data;

  // Get color and typography presets
  const colorPreset = getColorPreset(site.color_preset) || getColorPreset('default')!;
  const typographyPreset =
    getTypographyPreset(site.typography_preset) || getTypographyPreset('default')!;

  // Find primary headshot
  const primaryHeadshot = photos.find((p) => p.is_primary_headshot);

  // Prepare actor data
  const actorData = {
    name: profile?.display_name || 'Actor Name',
    headline: bio?.headline || 'Actor · Performer',
    bio:
      bio?.bio_text ||
      'Passionate performer with a love for storytelling. Available for film, television, and theater productions.',
    headshot: primaryHeadshot?.file_path,
    photos: photos.map((p) => ({
      url: p.file_path,
      alt: p.alt_text || 'Photo',
    })),
    videos: videos.map((v) => ({
      title: v.title || 'Video',
      url: v.embed_url || '',
    })),
    credits: credits.map((c) => ({
      production: c.production_title || '',
      role: c.role || '',
      year: c.year || '',
    })),
  };

  // Render template based on template_id
  // For now, all templates use the Classic layout
  // You can extend this with switch/case for different templates
  return (
    <ClassicTemplate
      actorData={actorData}
      colorPreset={colorPreset}
      typographyPreset={typographyPreset}
    />
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = await getActorSite(slug);

  if (!data) {
    return {
      title: 'Actor Not Found',
    };
  }

  const name = data.profile?.display_name || 'Actor';
  const headline = data.bio?.headline || 'Actor Portfolio';

  return {
    title: `${name} - ${headline}`,
    description: data.bio?.bio_text || `Professional portfolio of ${name}`,
  };
}

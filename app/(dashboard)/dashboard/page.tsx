import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get user's actor pages
  const { data: pages, error } = await supabase
    .from('actor_pages')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error loading actor pages:', error);
  }

  const actorPages = pages || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 15px rgba(255, 73, 219, 0.5)' }}>My Actor Pages</h1>
        <Link
          href="/dashboard/pages/new"
          className="px-4 py-2 bg-gradient-to-r from-neon-pink to-neon-cyan text-white rounded-lg font-medium transition-all"
          style={{ boxShadow: '0 0 15px rgba(255, 73, 219, 0.4)' }}
        >
          + New Actor Page
        </Link>
      </div>

      {actorPages.length === 0 ? (
        <div className="bg-dark-purple/50 backdrop-blur-sm border border-neon-pink/30 shadow-xl rounded-lg p-12 text-center" style={{ boxShadow: '0 0 30px rgba(255, 73, 219, 0.2)' }}>
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-white mb-3">
              No actor pages yet
            </h2>
            <p className="text-gray-300 mb-6">
              Create your first actor page to showcase headshots, reels, resume, and more.
            </p>
            <Link
              href="/dashboard/pages/new"
              className="inline-block px-6 py-3 bg-gradient-to-r from-neon-pink to-neon-cyan text-white rounded-lg font-medium transition-all"
              style={{ boxShadow: '0 0 20px rgba(255, 73, 219, 0.5)' }}
            >
              Create Your First Page
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-dark-purple/50 backdrop-blur-sm border border-neon-cyan/30 shadow-xl rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-neon-cyan/20">
            <thead className="bg-deep-purple/70">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actor Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Tier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neon-cyan/10">
              {actorPages.map((page) => {
                const config = page.config as any;
                const actorName = config?.hero?.name || 'Untitled';
                return (
                  <tr key={page.id} className="hover:bg-deep-purple/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {actorName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">{page.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          page.tier === 'premium'
                            ? 'bg-neon-orange/20 text-neon-orange border border-neon-orange/30'
                            : page.tier === 'standard'
                            ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                            : 'bg-gray-600/20 text-gray-300 border border-gray-600/30'
                        }`}
                      >
                        {page.tier.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          page.is_published
                            ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                            : 'bg-neon-orange/20 text-neon-orange border border-neon-orange/30'
                        }`}
                      >
                        {page.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {new Date(page.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      {page.is_published && (
                        <a
                          href={`/actor/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neon-cyan hover:text-neon-pink transition-colors"
                        >
                          Preview
                        </a>
                      )}
                      <Link
                        href={`/dashboard/pages/${page.id}/edit`}
                        className="text-neon-pink hover:text-neon-cyan transition-colors"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <div className="bg-dark-purple/50 backdrop-blur-sm border border-neon-pink/30 shadow-xl rounded-lg p-6" style={{ boxShadow: '0 0 15px rgba(255, 73, 219, 0.2)' }}>
          <h3 className="text-sm font-medium text-gray-300 mb-1">Total Pages</h3>
          <p className="text-3xl font-bold text-neon-pink" style={{ textShadow: '0 0 10px rgba(255, 73, 219, 0.5)' }}>{actorPages.length}</p>
        </div>

        <div className="bg-dark-purple/50 backdrop-blur-sm border border-neon-cyan/30 shadow-xl rounded-lg p-6" style={{ boxShadow: '0 0 15px rgba(50, 240, 255, 0.2)' }}>
          <h3 className="text-sm font-medium text-gray-300 mb-1">Published</h3>
          <p className="text-3xl font-bold text-neon-cyan" style={{ textShadow: '0 0 10px rgba(50, 240, 255, 0.5)' }}>
            {actorPages.filter((p) => p.is_published).length}
          </p>
        </div>

        <div className="bg-dark-purple/50 backdrop-blur-sm border border-neon-orange/30 shadow-xl rounded-lg p-6" style={{ boxShadow: '0 0 15px rgba(255, 129, 50, 0.2)' }}>
          <h3 className="text-sm font-medium text-gray-300 mb-1">Your Plan</h3>
          <p className="text-lg font-semibold text-white mb-2">Free</p>
          <Link
            href="/dashboard/billing"
            className="text-sm text-neon-orange hover:text-neon-pink transition-colors"
          >
            Upgrade Plan →
          </Link>
        </div>
      </div>
    </div>
  );
}

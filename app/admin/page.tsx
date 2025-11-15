import { createServerSupabaseClient } from '@/lib/supabaseServer';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient();

  // Get total pages
  const { count: totalPages } = await supabase
    .from('actor_pages')
    .select('*', { count: 'exact', head: true });

  // Get pages by tier
  const { data: pagesByTier } = await supabase
    .from('actor_pages')
    .select('tier')
    .then((res) => {
      const counts = { free: 0, standard: 0, premium: 0 };
      res.data?.forEach((page) => {
        counts[page.tier as keyof typeof counts]++;
      });
      return { data: counts };
    });

  // Get published vs draft
  const { count: publishedPages } = await supabase
    .from('actor_pages')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true);

  // Get total users
  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  // Get pages created in last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { count: recentPages } = await supabase
    .from('actor_pages')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo.toISOString());

  // Get recent activity
  const { data: recentActivity } = await supabase
    .from('actor_pages')
    .select(`
      id,
      slug,
      tier,
      is_published,
      created_at,
      updated_at,
      config
    `)
    .order('updated_at', { ascending: false })
    .limit(10);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      {/* KPI Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Pages</h3>
          <p className="text-3xl font-bold text-gray-900">{totalPages || 0}</p>
          <Link
            href="/admin/pages"
            className="text-sm text-indigo-600 hover:text-indigo-700 mt-2 inline-block"
          >
            View all →
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900">{totalUsers || 0}</p>
          <Link
            href="/admin/users"
            className="text-sm text-indigo-600 hover:text-indigo-700 mt-2 inline-block"
          >
            View all →
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Published</h3>
          <p className="text-3xl font-bold text-gray-900">{publishedPages || 0}</p>
          <p className="text-xs text-gray-500 mt-1">
            {((publishedPages || 0) / (totalPages || 1) * 100).toFixed(0)}% of total
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Last 7 Days</h3>
          <p className="text-3xl font-bold text-gray-900">{recentPages || 0}</p>
          <p className="text-xs text-gray-500 mt-1">New pages created</p>
        </div>
      </div>

      {/* Pages by Tier */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Free Tier</h3>
          <p className="text-3xl font-bold text-gray-900">{pagesByTier?.free || 0}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Standard Tier</h3>
          <p className="text-3xl font-bold text-gray-900">{pagesByTier?.standard || 0}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Premium Tier</h3>
          <p className="text-3xl font-bold text-gray-900">{pagesByTier?.premium || 0}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actor Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentActivity?.map((page) => {
              const config = page.config as any;
              const actorName = config?.hero?.name || 'Untitled';
              return (
                <tr key={page.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{actorName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{page.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        page.tier === 'premium'
                          ? 'bg-purple-100 text-purple-800'
                          : page.tier === 'standard'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {page.tier.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        page.is_published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {page.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(page.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    {page.is_published && (
                      <a
                        href={`/actor/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </a>
                    )}
                    <Link
                      href={`/admin/pages`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

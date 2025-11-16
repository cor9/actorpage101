import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabaseServer';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();

  // Check if user is admin
  let isAdmin = false;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      isAdmin = profile?.role === 'admin';
    }
  } catch (error) {
    console.error('Error checking admin status:', error);
  }

  return (
    <div className="min-h-screen bg-dark-purple">
      <nav className="bg-dark-purple/80 backdrop-blur-sm border-b border-neon-pink/30" style={{ boxShadow: '0 0 20px rgba(255, 73, 219, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="flex items-center px-2 py-2 text-white font-semibold" style={{ textShadow: '0 0 10px rgba(255, 73, 219, 0.5)' }}>
                <img src="/logotransparent.png" alt="Actor Page 101" className="h-8 w-8 rounded" />
                <span className="ml-2">Actor Page 101</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white border-b-2 border-neon-pink"
                >
                  My Pages
                </Link>
                <Link
                  href="/dashboard/pages/new"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors"
                >
                  + New Page
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                  >
                    ⚡ Admin
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/billing"
                className="text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors"
              >
                Billing
              </Link>
              <Link
                href="/dashboard/settings"
                className="text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

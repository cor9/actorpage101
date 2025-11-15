import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-deep-purple">
      {/* Admin Header */}
      <div className="bg-dark-purple border-b border-neon-orange/30 text-white" style={{ boxShadow: '0 0 20px rgba(255, 129, 50, 0.2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-xl font-bold text-neon-orange" style={{ textShadow: '0 0 15px rgba(255, 129, 50, 0.6)' }}>
                Actor Page 101 Admin
              </Link>
              <nav className="flex gap-4">
                <Link
                  href="/admin"
                  className="text-gray-300 hover:text-neon-orange px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/pages"
                  className="text-gray-300 hover:text-neon-orange px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  All Pages
                </Link>
                <Link
                  href="/admin/users"
                  className="text-gray-300 hover:text-neon-orange px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Users
                </Link>
              </nav>
            </div>
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-neon-cyan text-sm transition-colors"
            >
              Back to User View
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
    </div>
  );
}

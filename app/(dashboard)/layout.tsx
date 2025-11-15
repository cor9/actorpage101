import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-dark-purple">
      <nav className="bg-dark-purple/80 backdrop-blur-sm border-b border-neon-pink/30" style={{ boxShadow: '0 0 20px rgba(255, 73, 219, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/dashboard" className="flex items-center px-2 py-2 text-white font-semibold" style={{ textShadow: '0 0 10px rgba(255, 73, 219, 0.5)' }}>
                Actor Page 101
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white border-b-2 border-neon-pink"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/site"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors"
                >
                  Site
                </Link>
                <Link
                  href="/dashboard/bio"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors"
                >
                  Bio
                </Link>
                <Link
                  href="/dashboard/media"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors"
                >
                  Media
                </Link>
                <Link
                  href="/dashboard/credits"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors"
                >
                  Credits
                </Link>
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

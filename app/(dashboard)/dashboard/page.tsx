import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Welcome to Actor Page 101</h2>
        <p className="text-gray-600 mb-4">
          Get started by setting up your actor website. Complete your profile, add your media, and publish your site.
        </p>
        <div className="flex gap-4">
          <Link
            href="/dashboard/bio"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Complete Your Bio
          </Link>
          <Link
            href="/dashboard/site"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Customize Site
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Site Status</h3>
          <p className="text-gray-600 mb-4">Your site is not published yet</p>
          <Link href="/dashboard/site" className="text-blue-600 hover:text-blue-700">
            Publish Site →
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Media</h3>
          <p className="text-gray-600 mb-4">0 photos, 0 videos</p>
          <Link href="/dashboard/media" className="text-blue-600 hover:text-blue-700">
            Upload Media →
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Subscription</h3>
          <p className="text-gray-600 mb-4">Free Plan</p>
          <Link href="/dashboard/billing" className="text-blue-600 hover:text-blue-700">
            Upgrade →
          </Link>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Start Guide</h3>
        <ul className="space-y-2 text-blue-800">
          <li>✓ Account created</li>
          <li>○ Complete your bio</li>
          <li>○ Upload headshot and reel</li>
          <li>○ Add your credits</li>
          <li>○ Choose a template</li>
          <li>○ Publish your site</li>
        </ul>
      </div>
    </div>
  );
}

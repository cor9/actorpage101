import Link from 'next/link';
import Image from 'next/image';

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Image
                src="/actorpage101logo.png"
                alt="Actor Page 101"
                width={40}
                height={40}
                className="rounded"
              />
              <span className="font-bold text-xl">Actor Page 101</span>
            </div>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Professional Actor Website
            <br />
            <span className="text-blue-600">In Minutes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create a stunning portfolio site to showcase your headshots, reels,
            and credits. Perfect for actors at any stage of their career.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Get Started Free
          </Link>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Beautiful Templates</h3>
            <p className="text-gray-600">
              Choose from professionally designed templates optimized for actors
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Vimeo Integration</h3>
            <p className="text-gray-600">
              Seamlessly host and showcase your reels with Vimeo
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Custom Domain</h3>
            <p className="text-gray-600">
              Get your personalized subdomain: yourname.actorpage101.site
            </p>
          </div>
        </div>

        <div className="mt-20 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-3xl font-bold mb-4">$0</p>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Basic site template</li>
                <li>✓ Limited media storage</li>
                <li>✓ yourname.actorpage101.site</li>
              </ul>
            </div>
            <div className="border-2 border-blue-600 rounded-lg p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Standard</h3>
              <div className="mb-4">
                <p className="text-3xl font-bold">$12/mo</p>
                <p className="text-sm text-gray-500">or $101/year</p>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>✓ All templates</li>
                <li>✓ Vimeo integration</li>
                <li>✓ Unlimited media</li>
                <li>✓ Resume import</li>
              </ul>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <div className="mb-4">
                <p className="text-3xl font-bold">$20/mo</p>
                <p className="text-sm text-gray-500">or $199/year</p>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Everything in Standard</li>
                <li>✓ Audition tracker</li>
                <li>✓ Resume101 integration</li>
                <li>✓ Priority support</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

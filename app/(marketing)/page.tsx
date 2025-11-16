'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-purple via-deep-purple to-dark-purple">
      <nav className="border-b border-neon-pink/20 bg-dark-purple/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Image
                src="/logotransparent.png"
                alt="Actor Page 101"
                width={40}
                height={40}
                className="rounded"
              />
              <span className="font-bold text-xl text-white" style={{ textShadow: '0 0 10px rgba(255, 73, 219, 0.5)' }}>Actor Page 101</span>
            </div>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="px-4 py-2 text-gray-300 hover:text-neon-cyan transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-gradient-to-r from-neon-pink to-neon-cyan text-white rounded-lg font-medium transition-all"
                style={{ boxShadow: '0 0 15px rgba(255, 73, 219, 0.4)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 73, 219, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 73, 219, 0.4)';
                }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16 flex justify-center">
          <Image
            src="/logotransparent.png"
            alt="Actor Page 101"
            width={900}
            height={900}
            className="max-h-[520px] w-auto rounded-2xl shadow-xl"
            priority
          />
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6" style={{ textShadow: '0 0 20px rgba(255, 73, 219, 0.5)' }}>
            Your Professional Actor Website
            <br />
            <span className="text-neon-cyan" style={{ textShadow: '0 0 20px rgba(50, 240, 255, 0.6)' }}>In Minutes</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Create a stunning portfolio site to showcase your headshots, reels,
            and credits. Perfect for actors at any stage of their career.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-neon-pink to-neon-cyan text-white text-lg font-semibold rounded-lg transition-all"
            style={{ boxShadow: '0 0 20px rgba(255, 73, 219, 0.5)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 73, 219, 0.7)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 73, 219, 0.5)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Get Started Free
          </Link>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-dark-purple/50 backdrop-blur-sm p-6 rounded-lg border border-neon-pink/30" style={{ boxShadow: '0 0 15px rgba(255, 73, 219, 0.2)' }}>
            <h3 className="text-xl font-semibold mb-3 text-neon-pink">Beautiful Templates</h3>
            <p className="text-gray-300">
              Choose from professionally designed templates optimized for actors
            </p>
          </div>
          <div className="bg-dark-purple/50 backdrop-blur-sm p-6 rounded-lg border border-neon-cyan/30" style={{ boxShadow: '0 0 15px rgba(50, 240, 255, 0.2)' }}>
            <h3 className="text-xl font-semibold mb-3 text-neon-cyan">Vimeo Integration</h3>
            <p className="text-gray-300">
              Seamlessly host and showcase your reels with Vimeo
            </p>
          </div>
          <div className="bg-dark-purple/50 backdrop-blur-sm p-6 rounded-lg border border-neon-orange/30" style={{ boxShadow: '0 0 15px rgba(255, 129, 50, 0.2)' }}>
            <h3 className="text-xl font-semibold mb-3 text-neon-orange">Custom Domain</h3>
            <p className="text-gray-300">
              Get your personalized subdomain: yourname.actorpage101.site
            </p>
          </div>
        </div>

        <section className="mt-20">
          <h2 className="text-3xl font-bold text-white mb-10 text-center" style={{ textShadow: '0 0 12px rgba(255, 73, 219, 0.4)' }}>
            Live Demos
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Link href="/demo/free" className="group rounded-2xl overflow-hidden border border-neon-pink/30 bg-gradient-to-b from-deep-purple/60 to-dark-purple/80 hover:from-deep-purple/70 transition-all">
              <div className="relative h-40 overflow-hidden">
                <Image src="/hero.jpg" alt="Free Demo" width={800} height={400} className="h-full w-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-purple/90 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">Free Demo</h3>
                <p className="text-sm text-gray-300 mt-1">Mini Portfolio – clean, focused starter.</p>
                <div className="mt-4 inline-flex items-center gap-2 text-neon-cyan">
                  View demo
                  <span>→</span>
                </div>
              </div>
            </Link>
            <Link href="/demo/standard" className="group rounded-2xl overflow-hidden border border-neon-pink/30 bg-gradient-to-b from-deep-purple/60 to-dark-purple/80 hover:from-deep-purple/70 transition-all">
              <div className="relative h-40 overflow-hidden">
                <Image src="/hero.jpg" alt="Standard Demo" width={800} height={400} className="h-full w-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-purple/90 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">Standard Demo</h3>
                <p className="text-sm text-gray-300 mt-1">Standard Showcase – more sections, more polish.</p>
                <div className="mt-4 inline-flex items-center gap-2 text-neon-cyan">
                  View demo
                  <span>→</span>
                </div>
              </div>
            </Link>
            <Link href="/demo/premium" className="group rounded-2xl overflow-hidden border border-neon-pink/30 bg-gradient-to-b from-deep-purple/60 to-dark-purple/80 hover:from-deep-purple/70 transition-all">
              <div className="relative h-40 overflow-hidden">
                <Image src="/hero.jpg" alt="Premium Demo" width={800} height={400} className="h-full w-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-purple/90 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">Premium Demo</h3>
                <p className="text-sm text-gray-300 mt-1">Premium Cinematic – hero + projects + BTS.</p>
                <div className="mt-4 inline-flex items-center gap-2 text-neon-cyan">
                  View demo
                  <span>→</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <Link href="/demo/templates/mini-portfolio" className="group rounded-2xl overflow-hidden border border-neon-pink/30 bg-gradient-to-b from-deep-purple/60 to-dark-purple/80 hover:from-deep-purple/70 transition-all">
              <div className="relative h-40 overflow-hidden flex items-center justify-center bg-dark-purple">
                <Image src="/logotransparent.png" alt="Mini Portfolio" width={260} height={260} className="opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">Mini Portfolio</h3>
                <p className="text-sm text-gray-300 mt-1">Simple and fast, great for getting started.</p>
                <div className="mt-4 inline-flex items-center gap-2 text-neon-cyan">
                  View template
                  <span>→</span>
                </div>
              </div>
            </Link>
            <Link href="/demo/templates/standard-showcase" className="group rounded-2xl overflow-hidden border border-neon-pink/30 bg-gradient-to-b from-deep-purple/60 to-dark-purple/80 hover:from-deep-purple/70 transition-all">
              <div className="relative h-40 overflow-hidden flex items-center justify-center bg-dark-purple">
                <Image src="/logotransparent.png" alt="Standard Showcase" width={260} height={260} className="opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">Standard Showcase</h3>
                <p className="text-sm text-gray-300 mt-1">Balanced layout for growing portfolios.</p>
                <div className="mt-4 inline-flex items-center gap-2 text-neon-cyan">
                  View template
                  <span>→</span>
                </div>
              </div>
            </Link>
            <Link href="/demo/templates/premium-cinematic" className="group rounded-2xl overflow-hidden border border-neon-pink/30 bg-gradient-to-b from-deep-purple/60 to-dark-purple/80 hover:from-deep-purple/70 transition-all">
              <div className="relative h-40 overflow-hidden flex items-center justify-center bg-dark-purple">
                <Image src="/logotransparent.png" alt="Premium Cinematic" width={260} height={260} className="opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">Premium Cinematic</h3>
                <p className="text-sm text-gray-300 mt-1">Cinematic hero, projects, full BTS albums.</p>
                <div className="mt-4 inline-flex items-center gap-2 text-neon-cyan">
                  View template
                  <span>→</span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <div className="mt-20 bg-dark-purple/60 backdrop-blur-sm p-8 rounded-lg border border-neon-pink/30" style={{ boxShadow: '0 0 30px rgba(255, 73, 219, 0.2)' }}>
          <h2 className="text-3xl font-bold text-center mb-8 text-white" style={{ textShadow: '0 0 15px rgba(255, 73, 219, 0.5)' }}>Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-600 rounded-lg p-6 bg-deep-purple/50">
              <h3 className="text-2xl font-bold mb-2 text-white">Free</h3>
              <p className="text-3xl font-bold mb-4 text-gray-300">$0</p>
              <ul className="space-y-2 text-gray-400">
                <li>✓ 2 headshots, 1 reel</li>
                <li>✓ Basic site template</li>
                <li>✓ yourname.actorpage101.site</li>
              </ul>
            </div>
            <div className="border-2 border-neon-pink rounded-lg p-6 relative bg-deep-purple/70" style={{ boxShadow: '0 0 20px rgba(255, 73, 219, 0.3)' }}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-neon-pink to-neon-cyan text-white px-4 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Standard</h3>
              <div className="mb-4">
                <p className="text-3xl font-bold text-neon-cyan">$12/mo</p>
                <p className="text-sm text-gray-400">or $101/year</p>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li>✓ 5 headshots, 4 reels</li>
                <li>✓ All templates</li>
                <li>✓ Vimeo integration</li>
                <li>✓ PDF resume embed</li>
              </ul>
            </div>
            <div className="border border-gray-600 rounded-lg p-6 bg-deep-purple/50">
              <h3 className="text-2xl font-bold mb-2 text-white">Premium</h3>
              <div className="mb-4">
                <p className="text-3xl font-bold text-neon-orange">$20/mo</p>
                <p className="text-sm text-gray-400">or $199/year</p>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li>✓ 10 headshots, unlimited reels</li>
                <li>✓ Structured resume builder</li>
                <li>✓ Projects showcase</li>
                <li>✓ Priority support</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

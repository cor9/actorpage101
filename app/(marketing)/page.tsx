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
              <div className="flex flex-col leading-tight">
                <span
                  className="font-bold text-xl text-white"
                  style={{ textShadow: '0 0 10px rgba(255, 73, 219, 0.5)' }}
                >
                  Actor Page 101
                </span>
                <span className="text-xs text-gray-300/80">
                  All your actor materials. One smart link.
                </span>
              </div>
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
                  e.currentTarget.style.boxShadow =
                    '0 0 25px rgba(255, 73, 219, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 0 15px rgba(255, 73, 219, 0.4)';
                }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
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
          <h1
            className="text-5xl font-bold text-white mb-6"
            style={{ textShadow: '0 0 20px rgba(255, 73, 219, 0.5)' }}
          >
            All Your Actor Materials
            <br />
            <span
              className="text-neon-cyan"
              style={{ textShadow: '0 0 20px rgba(50, 240, 255, 0.6)' }}
            >
              In One Simple Page
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Stop sending a mess of links, PDFs, reels, and screenshots. Actor
            Page 101 turns everything casting needs into one clean, professional
            page you can share with a single link.
          </p>
          <p className="text-base text-gray-400 mb-8 max-w-2xl mx-auto">
            No web designer. No tech skills. If you can upload a headshot, you
            can build this. Perfect for busy parents of child actors, teens,
            young adults, and working pros who want to look prepared and
            professional online.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-neon-pink to-neon-cyan text-white text-lg font-semibold rounded-lg transition-all"
            style={{ boxShadow: '0 0 20px rgba(255, 73, 219, 0.5)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                '0 0 30px rgba(255, 73, 219, 0.7)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                '0 0 20px rgba(255, 73, 219, 0.5)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Get Started Free
          </Link>
          <p className="mt-3 text-sm text-gray-400">
            Live in minutes. Update anytime. One link for every casting email.
          </p>
        </div>

        {/* Problem / Solution Feature Row */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div
            className="bg-dark-purple/50 backdrop-blur-sm p-6 rounded-lg border border-neon-pink/30"
            style={{ boxShadow: '0 0 15px rgba(255, 73, 219, 0.2)' }}
          >
            <h3 className="text-xl font-semibold mb-3 text-neon-pink">
              Everything in One Place
            </h3>
            <p className="text-gray-300">
              Headshots, reel, credits, resume, reps, contact info, social
              links, casting profiles – all on one page instead of scattered
              across emails, notes, and apps.
            </p>
          </div>
          <div
            className="bg-dark-purple/50 backdrop-blur-sm p-6 rounded-lg border border-neon-cyan/30"
            style={{ boxShadow: '0 0 15px rgba(50, 240, 255, 0.2)' }}
          >
            <h3 className="text-xl font-semibold mb-3 text-neon-cyan">
              No Tech Experience Needed
            </h3>
            <p className="text-gray-300">
              Guided setup built for non-techy parents and busy actors. Fill in
              simple fields, upload your materials, pick a template, and your
              page is live. No plugins, no coding, no drama.
            </p>
          </div>
          <div
            className="bg-dark-purple/50 backdrop-blur-sm p-6 rounded-lg border border-neon-orange/30"
            style={{ boxShadow: '0 0 15px rgba(255, 129, 50, 0.2)' }}
          >
            <h3 className="text-xl font-semibold mb-3 text-neon-orange">
              Built for Actors, Not Influencers
            </h3>
            <p className="text-gray-300">
              Clean, casting-friendly layouts. Vimeo-powered reels, proper
              credits, and a professional URL:{' '}
              <span className="text-neon-cyan font-medium">
                yourname.actorpage101.site
              </span>
              .
            </p>
          </div>
        </div>

        {/* How it Works */}
        <section className="mt-20">
          <h2
            className="text-3xl font-bold text-white mb-10 text-center"
            style={{ textShadow: '0 0 12px rgba(255, 73, 219, 0.4)' }}
          >
            How Actor Page 101 Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-dark-purple/60 border border-neon-pink/20 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">
                1. Add Your Materials
              </h3>
              <p className="text-gray-300 text-sm">
                Upload headshots, paste your credits, link or upload your reel,
                and drop in any casting profile links or social handles you want
                on the page.
              </p>
            </div>
            <div className="bg-dark-purple/60 border border-neon-cyan/20 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">
                2. Pick a Template
              </h3>
              <p className="text-gray-300 text-sm">
                Choose from simple, modern templates designed specifically for
                child and teen actors, with room for everything casting expects
                to see.
              </p>
            </div>
            <div className="bg-dark-purple/60 border border-neon-orange/20 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">
                3. Share One Smart Link
              </h3>
              <p className="text-gray-300 text-sm">
                Send your custom link in every email, submission, or bio. Update
                the page once and it’s instantly current everywhere you’ve ever
                shared it.
              </p>
            </div>
          </div>
        </section>

        {/* Live Demos / Templates */}
        <section className="mt-20">
          <h2
            className="text-3xl font-bold text-white mb-10 text-center"
            style={{ textShadow: '0 0 12px rgba(255, 73, 219, 0.4)' }}
          >
            See Actor Pages in Action
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Link
              href="/demo/free"
              className="group rounded-2xl overflow-hidden border border-neon-pink/30 bg-gradient-to-b from-deep-purple/60 to-dark-purple/80 hover:from-deep-purple/70 transition-all"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/hero.jpg"
                  alt="Free Demo"
                  width={800}
                  height={400}
                  className="h-full w-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-purple/90 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">Free Demo</h3>
                <p className="text-sm text-gray-300 mt-1">
                  A clean mini-portfolio page with the essentials for
                  beginners.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-neon-cyan">
                  View demo
                  <span>→</span>
                </div>
              </div>
            </Link>
            <Link
              href="/demo/standard"
              className="group rounded-2xl overflow-hidden border border-neon-pink/30 bg-gradient-to-b from-deep-purple/60 to-dark-purple/80 hover:from-deep-purple/70 transition-all"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/hero.jpg"
                  alt="Standard Demo"
                  width={800}
                  height={400}
                  className="h-full w-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-purple/90 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">
                  Standard Demo
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  For working kids and teens who need more sections and a
                  polished, casting-ready layout.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-neon-cyan">
                  View demo
                  <span>→</span>
                </div>
              </div>
            </Link>
            <Link
              href="/demo/premium"
              className="group rounded-2xl overflow-hidden border border-neon-pink/30 bg-gradient-to-b from-deep-purple/60 to-dark-purple/80 hover:from-deep-purple/70 transition-all"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/hero.jpg"
                  alt="Premium Demo"
                  width={800}
                  height={400}
                  className="h-full w-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-purple/90 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">
                  Premium Demo
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  Full cinematic layout with hero, multiple reels, projects, and
                  behind-the-scenes galleries.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-neon-cyan">
                  View demo
                  <span>→</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <Link
              href="/demo/templates/mini-portfolio"
              className="group rounded-2xl overflow-hidden border border-neon-pink/30 bg-gradient-to-b from-deep-purple/60 to-dark-purple/80 hover:from-deep-purple/70 transition-all"
            >
              <div className="relative h-40 overflow-hidden flex items-center justify-center bg-dark-purple">
                <Image
                  src="/logotransparent.png"
                  alt="Mini Portfolio"
                  width={260}
                  height={260}
                  className="opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">
                  Mini Portfolio
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  Fast, simple, and perfect for getting your first professional
                  link online.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-neon-cyan">
                  View template
                  <span>→</span>
                </div>
              </div>
            </Link>
            <Link
              href="/demo/templates/standard-showcase"
              className="group rounded-2xl overflow-hidden border border-neon-pink/30 bg-gradient-to-b from-deep-purple/60 to-dark-purple/80 hover:from-deep-purple/70 transition-all"
            >
              <div className="relative h-40 overflow-hidden flex items-center justify-center bg-dark-purple">
                <Image
                  src="/logotransparent.png"
                  alt="Standard Showcase"
                  width={260}
                  height={260}
                  className="opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">
                  Standard Showcase
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  Balanced layout for actors with multiple credits, reels, and
                  training to highlight.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-neon-cyan">
                  View template
                  <span>→</span>
                </div>
              </div>
            </Link>
            <Link
              href="/demo/templates/premium-cinematic"
              className="group rounded-2xl overflow-hidden border border-neon-pink/30 bg-gradient-to-b from-deep-purple/60 to-dark-purple/80 hover:from-deep-purple/70 transition-all"
            >
              <div className="relative h-40 overflow-hidden flex items-center justify-center bg-dark-purple">
                <Image
                  src="/logotransparent.png"
                  alt="Premium Cinematic"
                  width={260}
                  height={260}
                  className="opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">
                  Premium Cinematic
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  For serious career traction: hero video, multiple sections,
                  and space for press, festivals, and BTS.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-neon-cyan">
                  View template
                  <span>→</span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Pricing */}
        <div
          className="mt-20 bg-dark-purple/60 backdrop-blur-sm p-8 rounded-lg border border-neon-pink/30"
          style={{ boxShadow: '0 0 30px rgba(255, 73, 219, 0.2)' }}
        >
          <h2
            className="text-3xl font-bold text-center mb-4 text-white"
            style={{ textShadow: '0 0 15px rgba(255, 73, 219, 0.5)' }}
          >
            Simple Pricing for Real Actor Life
          </h2>
          <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto text-sm">
            Start free, upgrade only if and when you need more space, more
            reels, and more tools. No contracts. Cancel anytime.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-600 rounded-lg p-6 bg-deep-purple/50">
              <h3 className="text-2xl font-bold mb-2 text-white">Free</h3>
              <p className="text-3xl font-bold mb-4 text-gray-300">$0</p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>✓ 2 headshots, 1 reel</li>
                <li>✓ Basic actor page template</li>
                <li>✓ yourname.actorpage101.site</li>
                <li>✓ Perfect for testing the waters</li>
              </ul>
            </div>
            <div
              className="border-2 border-neon-pink rounded-lg p-6 relative bg-deep-purple/70"
              style={{ boxShadow: '0 0 20px rgba(255, 73, 219, 0.3)' }}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-neon-pink to-neon-cyan text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Standard</h3>
              <div className="mb-4">
                <p className="text-3xl font-bold text-neon-cyan">$12/mo</p>
                <p className="text-sm text-gray-400">or $101/year</p>
              </div>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✓ 5 headshots, 4 reels</li>
                <li>✓ All templates unlocked</li>
                <li>✓ Vimeo integration built in</li>
                <li>✓ Resume tools when enabled</li>
                <li>✓ Great for actively auditioning kids & teens</li>
              </ul>
            </div>
            <div className="border border-gray-600 rounded-lg p-6 bg-deep-purple/50">
              <h3 className="text-2xl font-bold mb-2 text-white">Premium</h3>
              <div className="mb-4">
                <p className="text-3xl font-bold text-neon-orange">$20/mo</p>
                <p className="text-sm text-gray-400">or $199/year</p>
              </div>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✓ 10 headshots, unlimited reels</li>
                <li>✓ Custom domain support</li>
                <li>✓ Structured resume builder access</li>
                <li>✓ Room for press, festivals, and projects</li>
                <li>✓ Priority support for busy working families</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/signup"
              className="inline-block px-8 py-3 bg-gradient-to-r from-neon-pink to-neon-cyan text-white text-md font-semibold rounded-lg transition-all"
              style={{ boxShadow: '0 0 18px rgba(255, 73, 219, 0.5)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  '0 0 26px rgba(255, 73, 219, 0.7)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  '0 0 18px rgba(255, 73, 219, 0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Create Your Actor Page
            </Link>
            <p className="mt-3 text-xs text-gray-400">
              No setup fees. Upgrade, downgrade, or cancel whenever you need.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

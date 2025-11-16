import Link from 'next/link';

export default function TemplatesGallery() {
  const templates = [
    {
      id: 'classic-dark',
      name: 'Classic Dark',
      description: 'Modern dark theme with neon accents. Perfect for headshots and reels.',
      tier: 'All Plans',
      previewUrl: '/demo-plans/free',
      features: ['Dark background', 'Neon pink/cyan accents', 'Photo gallery', 'Video reels', 'Credits table'],
    },
    {
      id: 'classic-light',
      name: 'Classic Light',
      description: 'Clean light theme with professional styling.',
      tier: 'All Plans',
      previewUrl: '/demo-plans/premium?theme=classic-light',
      features: ['Light background', 'Professional styling', 'Photo gallery', 'Video reels', 'Credits table'],
    },
    {
      id: 'mini-portfolio',
      name: 'Mini Portfolio',
      description: 'Compact single-page portfolio for young actors. Great for starting out.',
      tier: 'Free',
      previewUrl: '/demo/templates/mini-portfolio',
      features: ['Single reel', 'Basic headshots', 'Social links', 'Resume link'],
    },
    {
      id: 'standard-showcase',
      name: 'Standard Showcase',
      description: 'Professional multi-section layout with embedded resume.',
      tier: 'Standard',
      previewUrl: '/demo/templates/standard-showcase',
      features: ['Multiple reels', 'Gallery albums', 'PDF resume embed', 'Rep information'],
    },
    {
      id: 'premium-cinematic',
      name: 'Premium Cinematic',
      description: 'Full-featured cinematic presentation with project showcases.',
      tier: 'Premium',
      previewUrl: '/demo/templates/premium-cinematic',
      features: ['Unlimited reels', 'Project cards', 'Structured resume', 'BTS galleries', 'Rep section'],
    },
  ];

  const planDemos = [
    {
      plan: 'Free',
      url: '/demo-plans/free',
      limits: '3 photos, 1 reel, 5 credits',
    },
    {
      plan: 'Standard',
      url: '/demo-plans/standard',
      limits: '6 photos, 4 reels, 20 credits',
    },
    {
      plan: 'Premium',
      url: '/demo-plans/premium',
      limits: '11 photos, unlimited reels & credits',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-purple">
      <nav className="bg-dark-purple/80 backdrop-blur-sm border-b border-neon-pink/30 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-white font-semibold hover:text-neon-pink transition-colors">
                ← Back to Dashboard
              </Link>
            </div>
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Template Gallery</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Plan Demos Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Quick Plan Comparison</h2>
          <p className="text-gray-400 mb-6">See how each subscription tier looks with the unified layout</p>

          <div className="grid md:grid-cols-3 gap-6">
            {planDemos.map((demo) => (
              <Link
                key={demo.plan}
                href={demo.url}
                className="block bg-dark-purple/50 backdrop-blur-sm border-2 border-neon-pink/30 rounded-lg p-6 hover:border-neon-cyan transition-all hover:shadow-lg hover:shadow-neon-pink/20"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{demo.plan}</h3>
                  <p className="text-sm text-gray-400 mb-4">{demo.limits}</p>
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-neon-pink to-neon-cyan text-white rounded-lg font-medium">
                    View Live Demo →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Templates Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">All Template Styles</h2>
          <p className="text-gray-400 mb-8">Browse all available page builder templates</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-dark-purple/50 backdrop-blur-sm border border-neon-pink/30 rounded-lg overflow-hidden hover:border-neon-cyan transition-all hover:shadow-lg hover:shadow-neon-pink/20"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white">{template.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                      template.tier === 'Free' ? 'bg-gray-600 text-white' :
                      template.tier === 'Standard' ? 'bg-blue-600 text-white' :
                      template.tier === 'Premium' ? 'bg-gradient-to-r from-neon-pink to-neon-cyan text-white' :
                      'bg-green-600 text-white'
                    }`}>
                      {template.tier}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">{template.description}</p>

                  <ul className="space-y-1 mb-4">
                    {template.features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-gray-500 flex items-center">
                        <span className="text-neon-cyan mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={template.previewUrl}
                    target="_blank"
                    className="block w-full text-center px-4 py-2 bg-gradient-to-r from-neon-pink to-neon-cyan text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    View Template →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-dark-purple/30 border border-neon-cyan/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-2">Need Help Choosing?</h3>
          <p className="text-gray-400 mb-4">
            Click any template above to see a live preview. Each template supports different features based on your subscription plan.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="text-neon-pink font-semibold mb-1">Classic Themes</h4>
              <p className="text-gray-500">Modern unified design system with dark/light variants</p>
            </div>
            <div>
              <h4 className="text-blue-400 font-semibold mb-1">Legacy Templates</h4>
              <p className="text-gray-500">Original template designs (mini, standard, premium)</p>
            </div>
            <div>
              <h4 className="text-neon-cyan font-semibold mb-1">Custom Builds</h4>
              <p className="text-gray-500">Contact us for fully custom page designs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

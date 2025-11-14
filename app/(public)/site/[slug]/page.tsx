import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ActorSitePage({ params }: PageProps) {
  const { slug } = await params;

  // TODO: Fetch site data from Supabase using the slug
  // For now, this is a placeholder

  if (!slug) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{slug.replace('-', ' ').toUpperCase()}</h1>
          <p className="text-xl text-gray-300">Actor • Performer • Artist</p>
        </div>
      </header>

      {/* Bio Section */}
      <section className="py-16 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">About</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            This is a placeholder actor site. When published, this page will display the actor&apos;s
            full bio, headshots, reels, and credits based on their chosen template and settings.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Location:</span> New York, NY
            </div>
            <div>
              <span className="font-semibold">Union:</span> SAG-AFTRA
            </div>
            <div>
              <span className="font-semibold">Age Range:</span> 25-35
            </div>
          </div>
        </div>
      </section>

      {/* Reel Section */}
      <section className="py-16 bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Reel</h2>
          <div className="aspect-video bg-gray-300 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">Video player will appear here</p>
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section className="py-16 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Photos</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Credits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Credits</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Television</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Sample TV Show</span>
                  <span className="text-gray-600">Guest Star - 2024</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Film</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Sample Film</span>
                  <span className="text-gray-600">Supporting - 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            Powered by{' '}
            <a href="https://actorpage101.site" className="text-blue-400 hover:text-blue-300">
              Actor Page 101
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

// Enable ISR with revalidation
export const revalidate = 3600; // Revalidate every hour

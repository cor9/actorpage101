import Link from 'next/link';

export default function TemplatesIndexPage() {
  const items = [
    { id: 'mini-portfolio', label: 'Mini Portfolio (Free)' },
    { id: 'standard-showcase', label: 'Standard Showcase' },
    { id: 'premium-cinematic', label: 'Premium Cinematic' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold mb-6">Template Samples</h1>
      <p className="text-gray-300 mb-8">
        Preview each template with mock data:
      </p>
      <ul className="space-y-3">
        {items.map((t) => (
          <li key={t.id}>
            <Link
              className="inline-flex items-center gap-2 rounded-lg border border-neon-pink/30 px-4 py-2 hover:bg-dark-purple/60 transition-colors"
              href={`/demo/templates/${t.id}`}
            >
              <span className="text-white">{t.label}</span>
              <span className="text-neon-cyan text-sm">/demo/templates/{t.id}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}



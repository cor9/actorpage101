import type { ColorPreset, TypographyPreset } from '@/lib/templates';

interface ActorData {
  name: string;
  headline: string;
  bio: string;
  headshot?: string;
  photos: Array<{ url: string; alt: string }>;
  videos: Array<{ title: string; url: string }>;
  credits: Array<{ production: string; role: string; year: string }>;
}

interface ClassicTemplateProps {
  actorData: ActorData;
  colorPreset: ColorPreset;
  typographyPreset: TypographyPreset;
}

export default function ClassicTemplate({
  actorData,
  colorPreset,
  typographyPreset,
}: ClassicTemplateProps) {
  return (
    <div
      style={{
        backgroundColor: colorPreset.background,
        color: colorPreset.text,
        fontFamily: typographyPreset.bodyFont,
      }}
    >
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {actorData.headshot && (
            <img
              src={actorData.headshot}
              alt={actorData.name}
              className="w-48 h-48 rounded-full mx-auto mb-8 object-cover border-4"
              style={{ borderColor: colorPreset.primary }}
            />
          )}
          <h1
            className="text-5xl md:text-6xl mb-4"
            style={{
              fontFamily: typographyPreset.headingFont,
              fontWeight: typographyPreset.headingWeight,
              color: colorPreset.primary,
            }}
          >
            {actorData.name}
          </h1>
          <p
            className="text-xl md:text-2xl mb-8"
            style={{ color: colorPreset.textLight }}
          >
            {actorData.headline}
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#reel"
              className="px-8 py-3 rounded-lg text-white font-medium transition-transform hover:scale-105"
              style={{ backgroundColor: colorPreset.primary }}
            >
              View Reel
            </a>
            <a
              href="#contact"
              className="px-8 py-3 rounded-lg border-2 font-medium transition-transform hover:scale-105"
              style={{
                borderColor: colorPreset.primary,
                color: colorPreset.primary,
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 px-4" style={{ backgroundColor: colorPreset.background }}>
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl md:text-4xl mb-8 text-center"
            style={{
              fontFamily: typographyPreset.headingFont,
              fontWeight: typographyPreset.headingWeight,
              color: colorPreset.primary,
            }}
          >
            About
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: colorPreset.text }}>
            {actorData.bio}
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      {actorData.photos.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl mb-12 text-center"
              style={{
                fontFamily: typographyPreset.headingFont,
                fontWeight: typographyPreset.headingWeight,
                color: colorPreset.primary,
              }}
            >
              Gallery
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {actorData.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-80 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Credits Section */}
      {actorData.credits.length > 0 && (
        <section
          className="py-20 px-4"
          style={{ backgroundColor: `${colorPreset.primary}08` }}
        >
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl mb-12 text-center"
              style={{
                fontFamily: typographyPreset.headingFont,
                fontWeight: typographyPreset.headingWeight,
                color: colorPreset.primary,
              }}
            >
              Credits
            </h2>
            <div className="space-y-4">
              {actorData.credits.map((credit, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-4 rounded-lg bg-white"
                >
                  <div>
                    <h3
                      className="font-semibold text-lg"
                      style={{ color: colorPreset.text }}
                    >
                      {credit.production}
                    </h3>
                    <p style={{ color: colorPreset.textLight }}>{credit.role}</p>
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: colorPreset.primary }}
                  >
                    {credit.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl mb-8"
            style={{
              fontFamily: typographyPreset.headingFont,
              fontWeight: typographyPreset.headingWeight,
              color: colorPreset.primary,
            }}
          >
            Get In Touch
          </h2>
          <p className="text-lg mb-8" style={{ color: colorPreset.textLight }}>
            Available for work opportunities and collaborations
          </p>
          <a
            href="mailto:contact@example.com"
            className="px-8 py-3 rounded-lg text-white font-medium inline-block transition-transform hover:scale-105"
            style={{ backgroundColor: colorPreset.primary }}
          >
            Send Message
          </a>
        </div>
      </section>
    </div>
  );
}

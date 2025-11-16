'use client';

import Link from 'next/link';
import { footerConfig } from '@/config/footer';

export function Footer() {
  return (
    <footer
      className="border-t border-neon-pink/20 bg-dark-purple/80 backdrop-blur-sm mt-20"
      style={{ boxShadow: '0 -5px 30px rgba(255, 73, 219, 0.1)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {footerConfig.links.map((section) => (
            <div key={section.title}>
              <h3
                className="text-sm font-semibold text-neon-pink mb-4"
                style={{ textShadow: '0 0 10px rgba(255, 73, 219, 0.5)' }}
              >
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((link) => (
                  <li key={link.title}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-neon-cyan transition-colors text-sm"
                      >
                        {link.title}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-neon-cyan transition-colors text-sm"
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-neon-pink/10 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Actor Page 101. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

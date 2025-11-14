import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Actor Page 101 - Professional Actor Websites',
  description: 'Create your professional actor website in minutes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

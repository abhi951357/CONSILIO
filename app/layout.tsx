import type { Metadata, Viewport } from 'next';
import './globals.css';
import { getSettings } from '@/lib/db';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return {
    title: settings.siteTitle || 'Consilio — Executive Consulting & Strategic Advisory',
    description: settings.description || 'A clean, modern consulting & business platform for ambitious teams, high-growth startups, and established enterprises.',
    keywords: ['business consulting', 'strategic advisory', 'operational excellence', 'growth consulting', 'executive advisory'],
    authors: [{ name: 'Consilio Strategy' }],
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fragment+Mono&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

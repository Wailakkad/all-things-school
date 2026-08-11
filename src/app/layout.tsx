import type { Metadata } from 'next';
import './globals.css';
import { SITE_URL } from '../lib/site';
import RootLayoutClient from './RootLayoutClient';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'All Things School | Classroom Decor, Organization & Teacher Guides 2026',
    template: '%s | All Things School',
  },
  description:
    'Classroom decor, teacher organization hacks, and back-to-school inspiration powered by the Vibrant Palette theme. Long-form guides with budget planners and step-by-step tutorials.',
  openGraph: {
    siteName: 'All Things School',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}

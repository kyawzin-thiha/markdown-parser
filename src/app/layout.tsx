import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

export const metadata: Metadata = {
    title: 'Markdown Parser',
    description: 'a powerful Markdown editor and parser built using Next.js, leveraging SCSS for styling and the Monaco Editor for an enhanced editing experience.',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
      <html lang="en">
      <body className={inter.className}>{children}</body>
      </html>
    );
}

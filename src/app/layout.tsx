import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import RootLayoutClient from './components/RootLayoutClient'; // Client-side component for conditional sidebar
import './globals.css'; // Importing global styles

// Initialize fonts
const geistSans = Geist({
  variable: '--font-geist-sans', // CSS variable for Geist font
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono', // CSS variable for Geist Mono font
  subsets: ['latin'],
});

// Export metadata for the server-side context
export const metadata: Metadata = {
  title: 'Expense System',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <title>{metadata.title}</title> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // Apply fonts here
      >
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}

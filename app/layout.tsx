import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Amandeep Aman | Full Stack Developer',
  description: 'Advanced portfolio of Amandeep Aman - Computer Science Student building secure and scalable software systems',
  keywords: 'Java, Web Development, Full Stack, React, Node.js, System Design',
  openGraph: {
    title: 'Amandeep Aman | Full Stack Developer',
    description: 'Advanced portfolio showcasing projects, skills, and achievements',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-primary text-white overflow-x-hidden`}>
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import CustomCursor from './components/CustomCursor';

export const metadata: Metadata = {
  title: "JaaniStudio",
  description: "Jaani Studio is a video editing and web dev services agency, based in Pakistan.",
};

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="bg-[#283845] font-sans">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

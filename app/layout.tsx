import type { Metadata } from "next";
import "./globals.css";
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import CustomCursor from './components/CustomCursor';


const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jaanistudio.com/"),
  title: "Jaani Studio",
  description: "Websites and video, on one timeline. Jaani Studio builds sites and cuts footage for brands who'd rather be remembered than ignored.",

  keywords: [
    "web design",
    "web development",
    "video editing",
    "brand video",
    "motion graphics",
    "social content",
    "branding studio",
    "creative agency",
    "Jaani Studio",
  ],

  openGraph: {
    title: "Jaani Studio",
    description:
      "Websites and video, on one timeline.",
    url: "https://www.jaanistudio.com/",
    siteName: "Jaani Studio",
    images: [
      {
        url: "/logo.png",
        width: 1097,
        height: 1097,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jaani Studio",
    description:
      "Websites and video, on one timeline. Jaani Studio builds sites and cuts footage for brands who'd rather be remembered than ignored.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <body className="bg-[#080808] font-sans">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

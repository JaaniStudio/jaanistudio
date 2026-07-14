import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import CustomCursor from './components/CustomCursor';


const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jaanistudio.com/"),
  title: "Jaani Studio",
  description: "JaaniStudio is a creative digital agency offering full-stack web development, AI-powered solutions, video editing, and graphic design to help businesses build, grow, and stand out online.",

  keywords: [
    "personal branding",
    "personal brand development",
    "digital branding agency",
    "web design",
    "web development",
    "conversion copywriting",
    "copywriting services",
    "SEO for personal brands",
    "SEO optimization",
    "branding and SEO services",
    "branding studio",
    "Vistazo Studio",
    "seo",
    "designing",
    "UI/UX",
    "hire personal branding agency",
    "all in one branding and web agency",
    "build a personal brand that stands out",
    "video editing",
    "graphic designing",
    "videography",
    "ad shoot",
    "videos",
    "video",
    "reel making",
    "reel editing",
    'long-form videos',
    "short-form videos",
    "animation"
  ],

  openGraph: {
    title: "Jaani Studio",
    description:
      "Helping you !",
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
      "JaaniStudio is a creative digital agency offering full-stack web development, AI-powered solutions, video editing, and graphic design to help businesses build, grow, and stand out online.",
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

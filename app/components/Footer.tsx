'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useScrollReveal } from '../hooks/useScrollReveal';

const SITEMAP = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
  { label: 'Vimeo', href: '#' },
];

export default function Footer() {
  const sectionRef = useScrollReveal<HTMLElement>(['.footer-heading', '.footer-cta', '.footer-grid', '.footer-bottom']);

  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { animate } = await import('animejs');
      if (cancelled || !marqueeRef.current) return;
      const items = marqueeRef.current.querySelectorAll<HTMLElement>('.marquee-star');
      animate(items, {
        rotate: [0, 360],
        duration: 4000,
        loop: true,
        ease: 'linear',
      });
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <footer className="relative overflow-hidden bg-[#283845] px-6 pb-8 pt-20 md:pt-28" ref={sectionRef}>
      <div className="mb-16 overflow-hidden border-y border-[#FFA649]/10 py-4">
        <div className="flex w-max animate-[marquee_18s_linear_infinite] gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-8 font-[--font-display] text-2xl font-semibold text-[#F3ECE0]/30 transition-all duration-300 hover:text-[#F3ECE0]/50 sm:text-3xl"
            >
              Say jaani, let&rsquo;s make something
              <span ref={marqueeRef} className="marquee-star inline-block text-[#FFA649]/50 transition-all duration-300 group-hover:text-[#FFA649]">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="footer-heading flex flex-col justify-between gap-10 border-b border-[#FFA649]/10 pb-16 md:flex-row md:items-end">
          <h2 className="max-w-xl font-[--font-display] text-4xl leading-[1.05] text-[#F3ECE0] sm:text-5xl md:text-6xl">
            Let&rsquo;s cut something <span className="text-[#FFA649]">worth watching.</span>
          </h2>
          <Link
            href="#contact"
            className="footer-cta group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#FFA649] px-7 py-3.5 text-sm font-semibold text-[#1B262E] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.05] hover:shadow-[0_10px_30px_-6px_rgba(255,166,73,0.65)] active:scale-[0.95]"
          >
            Start a project
            <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="footer-grid grid gap-10 py-14 sm:grid-cols-3">
          <div>
            <span className="font-[--font-display] text-lg font-bold text-[#F3ECE0]">
              JAANI<span className="text-[#FFA649]">.studio</span>
            </span>
            <p className="mt-3 max-w-[24ch] text-sm text-[#8FA1AD]">
              Web design and video editing, cut on one timeline. Say jaani.
            </p>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-[#8FA1AD]">Sitemap</span>
            <ul className="mt-4 space-y-3">
              {SITEMAP.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-[#C9D3D9] transition-all duration-300 hover:text-[#FFA649]"
                  >
                    <span className="h-0 w-0 rounded-full bg-[#FFA649] transition-all duration-300 group-hover:h-1 group-hover:w-1" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-[#8FA1AD]">Social</span>
            <ul className="mt-4 space-y-3">
              {SOCIALS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-[#C9D3D9] transition-all duration-300 hover:text-[#FFA649]"
                  >
                    <span className="h-0 w-0 rounded-full bg-[#FFA649] transition-all duration-300 group-hover:h-1 group-hover:w-1" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom flex flex-col items-center justify-between gap-4 pt-8 font-mono text-xs text-[#8FA1AD] sm:flex-row">
          <span>© {new Date().getFullYear()} Jaani Studio. All rights reserved.</span>
          <Link
            href="#top"
            className="group flex items-center gap-2 transition-colors duration-300 hover:text-[#FFA649]"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1 group-hover:border-[#FFA649] group-hover:shadow-[0_0_10px_rgba(255,166,73,0.2)]">
              <span className="h-1.5 w-1.5 rounded-full bg-current transition-all duration-300 group-hover:bg-[#FFA649]" />
            </span>
            Jump to 00:00
          </Link>
        </div>
      </div>
    </footer>
  );
}

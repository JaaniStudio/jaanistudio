'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const SPRING = 'cubic-bezier(0.34,1.56,0.64,1)';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
      setScrolled(scrollTop > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'border-b border-[#FFA649]/10 bg-[#283845]/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      {/* timeline scroll progress */}
      <div className="h-[2px] w-full bg-[#FFA649]/10">
        <div
          className="h-full bg-[#FFA649] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
        <Link href="#top" className="group flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFA649] opacity-40" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FFA649] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[360deg]" />
          </span>
          <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[#F3ECE0]">
            JAANI
            <span className="text-[#FFA649]">.studio</span>
          </span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link, i) => (
            <Link key={link.href} href={link.href} className="group flex items-center gap-2 text-sm text-[#C9D3D9]">
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[#FFA649]/50">0{i + 1}</span>
              <span className="relative">
                <span className="transition-colors duration-300 group-hover:text-[#FFA649]">{link.label}</span>
                <span
                  className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#FFA649] transition-all duration-300 group-hover:w-full"
                  style={{ transitionTimingFunction: SPRING }}
                />
              </span>
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="#contact"
            className="group relative overflow-hidden rounded-full bg-[#FFA649] px-5 py-2.5 text-sm font-semibold text-[#1B262E] transition-all duration-300 hover:scale-[1.06] hover:shadow-[0_8px_24px_-6px_rgba(255,166,73,0.65)] active:scale-[0.95]"
            style={{ transitionTimingFunction: SPRING }}
          >
            Start a project
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className="h-[1.5px] w-6 bg-[#F3ECE0] transition-transform duration-300"
            style={{
              transitionTimingFunction: SPRING,
              transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className={`h-[1.5px] w-6 bg-[#F3ECE0] transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className="h-[1.5px] w-6 bg-[#F3ECE0] transition-transform duration-300"
            style={{
              transitionTimingFunction: SPRING,
              transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* smooth height transition using the grid-rows trick, no layout jump */}
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden"
        style={{ gridTemplateRows: menuOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[#FFA649]/10 bg-[#283845] px-6 pb-6 pt-4">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-base text-[#C9D3D9] transition-colors hover:text-[#FFA649]"
                >
                  <span className="font-[family-name:var(--font-mono)] text-xs text-[#FFA649]/60">0{i + 1}</span>
                  {link.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full bg-[#FFA649] px-5 py-3 text-center text-sm font-semibold text-[#1B262E] transition-transform duration-300 active:scale-[0.96]"
              >
                Start a project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
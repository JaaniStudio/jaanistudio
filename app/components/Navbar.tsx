'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

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
      className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-300 ${
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
        <Link href="#top" className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFA649] opacity-40" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FFA649]" />
          </span>
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[#F3ECE0]">
            CUTLINE
          </span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 text-sm text-[#C9D3D9] transition-colors hover:text-[#FFA649]"
            >
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[#FFA649]/50">
                0{i + 1}
              </span>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="#contact"
            className="rounded-full bg-[#FFA649] px-5 py-2.5 text-sm font-semibold text-[#1B262E] transition-transform hover:scale-[1.03] active:scale-[0.98]"
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
            className={`h-[1.5px] w-6 bg-[#F3ECE0] transition-transform ${
              menuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span className={`h-[1.5px] w-6 bg-[#F3ECE0] transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span
            className={`h-[1.5px] w-6 bg-[#F3ECE0] transition-transform ${
              menuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-[#FFA649]/10 bg-[#283845] px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-base text-[#C9D3D9]"
              >
                <span className="font-[family-name:var(--font-mono)] text-xs text-[#FFA649]/60">
                  0{i + 1}
                </span>
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-[#FFA649] px-5 py-3 text-center text-sm font-semibold text-[#1B262E]"
            >
              Start a project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
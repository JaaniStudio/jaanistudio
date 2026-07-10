'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'border-b border-[#FFA649]/10 bg-[#283845]/90 backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ isolation: 'isolate' }}
    >
      <div className="h-0.5 w-full bg-[#FFA649]/10">
        <motion.div
          className="h-full bg-[#FFA649]"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        />
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
        <Link href="#top" className="group flex items-center gap-2">
          <motion.span
            className="relative flex h-2.5 w-2.5"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFA649] opacity-40" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FFA649]" />
          </motion.span>
          <span className="font-[--font-display] text-lg font-bold tracking-tight text-[#F3ECE0]">
            JAANI
            <span className="text-[#FFA649]">.studio</span>
          </span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link, i) => (
            <Link key={link.href} href={link.href} className="group flex items-center gap-2 text-sm text-[#C9D3D9]">
              <motion.span
                className="font-mono text-[11px] text-[#FFA649]/50"
                whileHover={{ color: 'rgba(255,166,73,1)' }}
              >
                0{i + 1}
              </motion.span>
              <span className="relative">
                <span className="transition-colors duration-300 group-hover:text-[#FFA649]">{link.label}</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[1.5px] bg-[#FFA649]"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </span>
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="#contact"
            className="group relative overflow-hidden rounded-full bg-[#FFA649] px-5 py-2.5 text-sm font-semibold text-[#1B262E] transition-all duration-300 hover:shadow-[0_8px_24px_-6px_rgba(255,166,73,0.65)] active:scale-[0.95]"
            data-cursor
          >
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                background:
                  'radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.2), transparent 50%)',
              }}
            />
            <span className="relative z-10">Start a project which?</span>
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <motion.span
            className="h-[1.5px] w-6 bg-[#F3ECE0]"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          />
          <motion.span
            className="h-[1.5px] w-6 bg-[#F3ECE0]"
            animate={{ opacity: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="h-[1.5px] w-6 bg-[#F3ECE0]"
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ gridTemplateRows: '0fr' }}
            animate={{ gridTemplateRows: '1fr' }}
            exit={{ gridTemplateRows: '0fr' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:hidden"
          >
            <div className="overflow-hidden">
              <div className="border-t border-[#FFA649]/10 bg-[#283845] px-6 pb-6 pt-4">
                <motion.div
                  className="flex flex-col gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.06 } },
                  }}
                >
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 text-base text-[#C9D3D9] transition-colors hover:text-[#FFA649]"
                      >
                        <span className="font-mono text-xs text-[#FFA649]/60">
                          0{i + 1}
                        </span>
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      href="#contact"
                      onClick={() => setMenuOpen(false)}
                      className="mt-2 block rounded-full bg-[#FFA649] px-5 py-3 text-center text-sm font-semibold text-[#1B262E] active:scale-[0.96]"
                    >
                      Start a project
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

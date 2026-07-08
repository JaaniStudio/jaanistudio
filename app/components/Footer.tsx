'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import MagneticButton from './MagneticButton';

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

const staggers = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.08 },
  }),
};

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

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
        <motion.div
          className="flex w-max gap-8"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
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
        </motion.div>
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          className="flex flex-col justify-between gap-10 border-b border-[#FFA649]/10 pb-16 md:flex-row md:items-end"
          custom={0}
          variants={staggers}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="max-w-xl font-[--font-display] text-4xl leading-[1.05] text-[#F3ECE0] sm:text-5xl md:text-6xl">
            Let&rsquo;s cut something <span className="text-[#FFA649]">worth watching.</span>
          </h2>
          <MagneticButton href="#contact" variant="primary" arrow>
            Start a project
          </MagneticButton>
        </motion.div>

        <motion.div
          className="grid gap-10 py-14 sm:grid-cols-3"
          custom={1}
          variants={staggers}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div custom={0} variants={staggers}>
            <span className="font-[--font-display] text-lg font-bold text-[#F3ECE0]">
              JAANI<span className="text-[#FFA649]">.studio</span>
            </span>
            <p className="mt-3 max-w-[24ch] text-sm text-[#8FA1AD]">
              Web design and video editing, cut on one timeline. Say jaani.
            </p>
          </motion.div>

          <motion.div custom={1} variants={staggers}>
            <span className="text-xs uppercase tracking-widest text-[#8FA1AD]">Sitemap</span>
            <ul className="mt-4 space-y-3">
              {SITEMAP.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-[#C9D3D9] transition-all duration-300 hover:text-[#FFA649]"
                  >
                    <motion.span
                      className="h-0 w-0 rounded-full bg-[#FFA649]"
                      whileHover={{ width: 6, height: 6 }}
                      transition={{ duration: 0.2 }}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div custom={2} variants={staggers}>
            <span className="text-xs uppercase tracking-widest text-[#8FA1AD]">Social</span>
            <ul className="mt-4 space-y-3">
              {SOCIALS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-[#C9D3D9] transition-all duration-300 hover:text-[#FFA649]"
                  >
                    <motion.span
                      className="h-0 w-0 rounded-full bg-[#FFA649]"
                      whileHover={{ width: 6, height: 6 }}
                      transition={{ duration: 0.2 }}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-between gap-4 pt-8 font-mono text-xs text-[#8FA1AD] sm:flex-row"
          custom={2}
          variants={staggers}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span>© {new Date().getFullYear()} Jaani Studio. All rights reserved.</span>
          <Link
            href="#top"
            className="group flex items-center gap-2 transition-colors duration-300 hover:text-[#FFA649]"
          >
            <motion.span
              className="flex h-5 w-5 items-center justify-center rounded-full border border-current transition-all duration-300 group-hover:border-[#FFA649] group-hover:shadow-[0_0_10px_rgba(255,166,73,0.2)]"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current transition-all duration-300 group-hover:bg-[#FFA649]" />
            </motion.span>
            Jump to 00:00
          </Link>
        </motion.div>
      </div>
    </footer>
  );
}

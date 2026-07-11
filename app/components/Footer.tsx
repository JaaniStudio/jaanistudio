'use client';

import { useRef, useEffect, useState } from 'react';
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

const EASE = [0.22, 1, 0.36, 1] as const;

const staggers = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: EASE, delay: i * 0.08 },
  }),
};

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 text-sm text-[#C9D3D9] transition-all duration-300 hover:text-[#FFA649]"
    >
      <motion.span
        className="h-0 w-0 rounded-full bg-[#FFA649]"
        whileHover={{ width: 6, height: 6 }}
        transition={{ duration: 0.2 }}
      />
      <span className="relative">
        {label}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#FFA649] transition-all duration-300 group-hover:w-full" />
      </span>
      <span className="inline-block -translate-x-1 text-[#FFA649] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        ↗
      </span>
    </Link>
  );
}

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  const marqueeWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [marqueeHover, setMarqueeHover] = useState(false);
  const marqueeHoverRef = useRef(false);

  useEffect(() => {
    marqueeHoverRef.current = marqueeHover;
  }, [marqueeHover]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { animate } = await import('animejs');
      if (cancelled || !marqueeWrapRef.current) return;
      const items = marqueeWrapRef.current.querySelectorAll<HTMLElement>('.marquee-star');
      animate(items, {
        rotate: [0, 360],
        duration: 4000,
        loop: true,
        ease: 'linear',
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let rafId: number;
    let start: number | null = null;
    let pausedAt = 0;
    const duration = 26000;

    const tick = (ts: number) => {
      if (!start) start = ts;
      if (marqueeHoverRef.current) {
        start = ts - pausedAt;
        rafId = requestAnimationFrame(tick);
        return;
      }
      pausedAt = ts - start;
      const progress = (pausedAt % duration) / duration;
      el.style.transform = `translateX(${-progress * 50}%)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  function handleJumpToTop(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="relative overflow-hidden bg-[#283845] px-6 pb-8 pt-20 md:pt-28" ref={sectionRef}>
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(255,166,73,0.45) 0%, transparent 70%)',
            filter: 'blur(35px)',
          }}
          animate={{ scale: [1, 1.14, 1], opacity: [0.5, 0.65, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(143,161,173,0.35) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
          animate={{ scale: [1, 1.16, 1], opacity: [0.4, 0.55, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        />
      </div>

      <div
        ref={marqueeWrapRef}
        onMouseEnter={() => setMarqueeHover(true)}
        onMouseLeave={() => setMarqueeHover(false)}
        className="relative mb-16 overflow-hidden border-y border-[#FFA649]/10 py-4"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        }}
      >
        <div ref={trackRef} className="flex w-max gap-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="group flex items-center gap-8 font-[--font-display] text-2xl font-semibold text-[#F3ECE0]/30 transition-all duration-300 hover:text-[#F3ECE0]/50 sm:text-3xl"
            >
              Say jaani, let&rsquo;s make something
              <span className="marquee-star inline-block text-[#FFA649]/50 transition-all duration-300 group-hover:text-[#FFA649]">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="relative flex flex-col justify-between gap-10 overflow-hidden border-b border-[#FFA649]/10 pb-16 md:flex-row md:items-end"
          custom={0}
          variants={staggers}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="relative">
            <motion.div
              className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#FFA649]"
              initial={{ y: 12, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span>00:05</span>
              <motion.span
                className="h-px w-10 origin-left bg-[#FFA649]/20"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              />
              <span className="text-[#8FA1AD]">Outro</span>
            </motion.div>
            <h2 className="max-w-xl font-[--font-display] text-4xl leading-[1.05] text-[#F3ECE0] sm:text-5xl md:text-6xl">
              Let&rsquo;s cut something <span className="text-[#FFA649]">worth watching.</span>
            </h2>
          </div>

          <div className="relative">
            <MagneticButton href="#contact" variant="primary" arrow>
              Start a project
            </MagneticButton>
          </div>
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
                  <FooterLink label={item.label} href={item.href} />
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div custom={2} variants={staggers}>
            <span className="text-xs uppercase tracking-widest text-[#8FA1AD]">Social</span>
            <ul className="mt-4 space-y-3">
              {SOCIALS.map((item) => (
                <li key={item.label}>
                  <FooterLink label={item.label} href={item.href} />
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
            onClick={handleJumpToTop}
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
'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const META = [
  { label: 'Founded', value: '2021' },
  { label: 'Focus', value: 'Web & Motion' },
  { label: 'Based', value: 'Remote-first' },
  { label: 'Booking', value: 'Q3 2026' },
];

const TOOLS = [
  'Next.js',
  'React',
  'Figma',
  'Tailwind',
  'After Effects',
  'DaVinci Resolve',
  'Premiere Pro',
  'Cinema 4D',
];

const staggerItem = {
  hidden: { y: 30, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.1 },
  }),
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const metaRef = useRef<HTMLDListElement>(null);
  const metaInView = useInView(metaRef, { once: true, margin: '-60px' });

  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { animate, stagger } = await import('animejs');
      if (cancelled || !marqueeRef.current) return;
      const items = marqueeRef.current.querySelectorAll<HTMLElement>('.marquee-item');
      animate(items, {
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 500,
        delay: stagger(60),
        ease: 'outExpo',
      });
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let rafId: number;
    let start: number | null = null;
    const duration = 28000;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const progress = ((ts - start) % duration) / duration;
      el.style.transform = `translateX(${-progress * 50}%)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section id="about" className="relative overflow-hidden bg-[#283845] px-6 py-24 md:py-32" ref={sectionRef}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-60" style={{ background: 'radial-gradient(circle, rgba(255,166,73,0.45) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full opacity-50" style={{ background: 'radial-gradient(circle, rgba(143,161,173,0.35) 0%, transparent 70%)', filter: 'blur(35px)' }} />
      </div>
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-14 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[#FFA649]"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>00:01</span>
          <span className="h-px flex-1 bg-[#FFA649]/20" />
          <span className="text-[#8FA1AD]">About</span>
        </motion.div>

        <div className="grid gap-16 md:grid-cols-[1.3fr_1fr]">
          <div>
            <motion.h2
              className="font-[--font-display] text-3xl leading-tight text-[#F3ECE0] sm:text-4xl md:text-5xl"
              initial={{ y: 40, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              We started as two freelancers arguing over the same export settings, three energy
              drinks deep.
            </motion.h2>
            <motion.p
              className="mt-6 max-w-lg text-[#C9D3D9]"
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              Now Jaani Studio builds the site and cuts the footage for the same brands, on the
              same timeline. No handoff between &ldquo;the web team&rdquo; and &ldquo;the video
              team&rdquo; — one crew, one brief, one deadline. That&rsquo;s the whole pitch.
            </motion.p>
            <motion.p
              className="mt-4 max-w-lg text-[#C9D3D9]"
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              We keep the client roster small on purpose. Fewer projects, more frames reviewed,
              fewer things that ship half-finished — and yes, we will tell you if your idea needs
              work before your competitors do.
            </motion.p>
          </div>

          <motion.dl
            ref={metaRef}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#FFA649]/10 bg-[#FFA649]/5 sm:grid-cols-1"
            initial="hidden"
            animate={metaInView ? 'visible' : 'hidden'}
          >
            {META.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                variants={staggerItem}
                className="group bg-[#283845] px-6 py-5 transition-all duration-300 hover:bg-[#2f4150] hover:shadow-[inset_0_0_20px_rgba(255,166,73,0.06)]"
              >
                <dt className="font-mono text-[11px] uppercase tracking-widest text-[#8FA1AD]">
                  {item.label}
                </dt>
                <dd className="mt-1 text-lg font-semibold text-[#F3ECE0] transition-all duration-300 group-hover:text-[#FFA649] group-hover:translate-x-1">
                  {item.value}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>

      <div ref={marqueeRef} className="group relative mt-20 overflow-hidden border-y border-[#FFA649]/10 py-5">
        <div
          ref={trackRef}
          className="flex w-max gap-12"
        >
          {[...TOOLS, ...TOOLS].map((tool, i) => (
            <span
              key={i}
              className="marquee-item font-mono text-sm uppercase tracking-wide text-[#8FA1AD]/70 transition-all duration-300 hover:text-[#FFA649] hover:scale-110"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

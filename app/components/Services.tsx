'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Clapperboard, Sparkles, Scissors } from 'lucide-react';
import TiltCard from './TiltCard';

const SERVICES = [
  {
    track: 'V1',
    icon: Code2,
    title: 'Web design & development',
    description:
      'Fast, responsive sites built in Next.js — from landing pages to full product sites, wired for conversion from the first scroll.',
    items: ['UX & wireframes', 'Next.js build', 'CMS + analytics', 'Launch support'],
  },
  {
    track: 'V2',
    icon: Clapperboard,
    title: 'Brand & product video',
    description:
      'Founder stories, product demos, and launch films shot and cut to hold attention past the first three seconds.',
    items: ['Concept & script', 'Shoot direction', 'Colour grade', 'Sound design'],
  },
  {
    track: 'V3',
    icon: Sparkles,
    title: 'Motion graphics & animation',
    description:
      'Logo stings, UI walkthroughs, and explainer animation that make a static brand feel alive on screen.',
    items: ['Style frames', '2D/3D animation', 'Micro-interactions', 'Export presets'],
  },
  {
    track: 'A1',
    icon: Scissors,
    title: 'Social & content editing',
    description:
      'Long-form content cut down into a week of scroll-stopping clips, captioned and formatted per platform.',
    items: ['Batch editing', 'Captions & subs', 'Platform sizing', 'Posting calendar'],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.1 },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: EASE, delay: 0.1 + i * 0.05 },
  }),
};

/** Deterministic pseudo-random tick heights so the server/client render match. */
function tickHeight(seed: number, i: number) {
  return ((i * 37 + seed * 53) % 60) + 18;
}

function TrackStrip({ seed }: { seed: number }) {
  const ticks = Array.from({ length: 36 });
  return (
    <div className="relative mt-8 h-6 overflow-hidden">
      <div className="flex h-full items-end gap-[3px]">
        {ticks.map((_, i) => (
          <span
            key={i}
            className="w-full flex-1 rounded-full bg-[#8FA1AD]/15 transition-colors duration-500 group-hover:bg-[#FFA649]/30"
            style={{ height: `${tickHeight(seed, i)}%` }}
          />
        ))}
      </div>
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-[#FFA649]/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        initial={{ x: '-120%' }}
        whileHover={{ x: '420%' }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

  return (
    <section id="services" className="relative overflow-hidden bg-[#1B262E] px-6 py-24 md:py-32" ref={sectionRef}>
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -right-32 top-1/3 h-80 w-80 rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(143,161,173,0.35) 0%, transparent 70%)',
            filter: 'blur(35px)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.55, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -left-32 -bottom-16 h-96 w-96 rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(255,166,73,0.45) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.65, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-14 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[#FFA649]"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span>00:02</span>
          <motion.span
            className="h-px flex-1 origin-left bg-[#FFA649]/20"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          />
          <span className="text-[#8FA1AD]">Services</span>
        </motion.div>

        <motion.h2
          className="max-w-2xl font-[--font-display] text-3xl leading-tight text-[#F3ECE0] sm:text-4xl md:text-5xl"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          Everything runs on <span className="text-[#FFA649]">one timeline.</span>
        </motion.h2>

        <div ref={gridRef} className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#FFA649]/10 bg-[#FFA649]/5 md:grid-cols-2">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.track}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={gridInView ? 'visible' : 'hidden'}
              >
                <TiltCard tiltDegree={4} glare={true} className="h-full">
                  <div className="group relative overflow-hidden bg-[#1B262E] p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#283845] hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] md:p-10">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-6 -right-2 select-none font-[--font-display] text-8xl font-bold text-[#F3ECE0] opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.06]"
                    >
                      {service.track}
                    </span>

                    <div className="relative mb-6 flex items-center justify-between">
                      <span className="rounded border border-[#FFA649]/30 px-2 py-1 font-mono text-[11px] text-[#FFA649]">
                        TRACK / {service.track}
                      </span>
                      <motion.div
                        className="relative"
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                      >
                        <span className="pointer-events-none absolute inset-0 -m-2 rounded-full bg-[#FFA649]/0 blur-md transition-colors duration-300 group-hover:bg-[#FFA649]/20" />
                        <Icon
                          className="relative h-5 w-5 text-[#FFA649]/50 transition-colors duration-300 group-hover:text-[#FFA649]"
                          strokeWidth={1.75}
                        />
                      </motion.div>
                    </div>
                    <h3 className="relative font-[--font-display] text-xl font-semibold text-[#F3ECE0] sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="relative mt-3 text-[#C9D3D9]">{service.description}</p>
                    <ul className="relative mt-6 flex flex-wrap gap-x-6 gap-y-2">
                      {service.items.map((item, itemIndex) => (
                        <motion.li
                          key={item}
                          custom={itemIndex}
                          variants={itemVariants}
                          initial="hidden"
                          animate={gridInView ? 'visible' : 'hidden'}
                          className="flex items-center gap-2 text-sm text-[#8FA1AD]"
                        >
                          <span className="h-1 w-1 rounded-full bg-[#FFA649]" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>

                    <TrackStrip seed={i} />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
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

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.1 },
  }),
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

  return (
    <section id="services" className="relative bg-[#1B262E] px-6 py-24 md:py-32" ref={sectionRef}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-14 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[#FFA649]"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>00:02</span>
          <span className="h-px flex-1 bg-[#FFA649]/20" />
          <span className="text-[#8FA1AD]">Services</span>
        </motion.div>

        <motion.h2
          className="max-w-2xl font-[--font-display] text-3xl leading-tight text-[#F3ECE0] sm:text-4xl md:text-5xl"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          Everything runs on one timeline.
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
                  <div className="group relative bg-[#1B262E] p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#283845] hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] md:p-10">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="rounded border border-[#FFA649]/30 px-2 py-1 font-mono text-[11px] text-[#FFA649]">
                        TRACK / {service.track}
                      </span>
                      <motion.div
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                      >
                        <Icon
                          className="h-5 w-5 text-[#FFA649]/50 transition-colors duration-300 group-hover:text-[#FFA649]"
                          strokeWidth={1.75}
                        />
                      </motion.div>
                    </div>
                    <h3 className="font-[--font-display] text-xl font-semibold text-[#F3ECE0] sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[#C9D3D9]">{service.description}</p>
                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-[#8FA1AD]">
                          <span className="h-1 w-1 rounded-full bg-[#FFA649]" />
                          {item}
                        </li>
                      ))}
                    </ul>
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

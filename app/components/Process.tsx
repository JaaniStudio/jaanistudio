'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import NetworkBackground from './NetworkBackground';

const STEPS = [
  {
    num: '01',
    title: 'Brief',
    description:
      'You send the idea, the deadline, and the reference you secretly want to beat. We come back with a plan within one business day.',
    meta: 'Reply in 1 business day',
  },
  {
    num: '02',
    title: 'Build & cut',
    description:
      'One crew moves on both lanes at once — code and footage land on the same timeline and get reviewed together, not in silos.',
    meta: 'Weekly no-nonsense check-ins',
  },
  {
    num: '03',
    title: 'Ship',
    description:
      'Site launches, reels post, and nothing ships half-finished. You keep the files, the credentials, and the next move.',
    meta: 'Revisions baked in',
  },
];

const STATS = [
  { value: '2', label: 'lanes, one crew' },
  { value: '14', label: 'day avg. turnaround' },
  { value: '3', label: 'people, no handoffs' },
  { value: '100%', label: 'ships finished' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const stepVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.12 },
  }),
};

const statVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: EASE, delay: i * 0.08 },
  }),
};

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[#090704] px-6 py-24 md:py-32"
      ref={sectionRef}
    >
      <NetworkBackground className="z-1" opacity={0.5} />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-[#080808] to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mb-14 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[#FFA649]"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="text-[#B7C4A6]">✦</span>
          <motion.span
            className="h-px flex-1 origin-left bg-[#FFA649]/20"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          />
          <span className="text-[#8FA1AD]">Process</span>
        </motion.div>

        <motion.div
          className="max-w-2xl"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          <h2 className="h-font text-3xl font-light leading-tight text-[#F3ECE0] sm:text-3xl md:text-4xl">
            One brief. <span className="text-[#FFA649]">One timeline.</span> Done.
          </h2>
          <p className="mt-6 max-w-lg text-[#C9D3D9]">
            Three steps, no agencies-in-the-middle, no &ldquo;we&rsquo;ll circle back.&rdquo; This
            is the whole job, end to end.
          </p>
        </motion.div>

        <div ref={gridRef} className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#FFA649]/10 bg-[#FFA649]/5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              custom={i}
              variants={stepVariants}
              initial="hidden"
              animate={gridInView ? 'visible' : 'hidden'}
              className="group relative overflow-hidden bg-[#080808] p-8 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 md:p-10"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-5 select-none h-font text-8xl font-bold text-[#F3ECE0] opacity-[0.05] transition-opacity duration-500 group-hover:opacity-[0.09]"
              >
                {step.num}
              </span>

              <span className="relative font-mono text-[11px] uppercase tracking-widest text-[#B7C4A6]">
                Step {step.num}
              </span>
              <h3 className="relative mt-4 h-font text-2xl font-semibold text-[#F3ECE0]">
                {step.title}
              </h3>
              <p className="relative mt-3 text-[#C9D3D9]">{step.description}</p>

              <div className="relative mt-8 flex items-center gap-2 font-mono text-xs text-[#8FA1AD]">
                <span className="h-1 w-1 rounded-full bg-[#FFA649]" />
                {step.meta}
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-linear-to-r from-transparent via-[#FFA649]/60 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#FFA649]/10 bg-[#FFA649]/5 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={statVariants}
              initial="hidden"
              animate={gridInView ? 'visible' : 'hidden'}
              className="bg-[#080808] px-6 py-7 text-center"
            >
              <div className="h-font text-4xl font-light text-[#F3ECE0]">
                {stat.value}
                <span className="text-[#B7C4A6]">.</span>
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-[#8FA1AD]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from 'framer-motion';
import { Play, ArrowUpRight } from 'lucide-react';
import TiltCard from './TiltCard';
import NetworkBackground from './NetworkBackground';

type ProjectType = 'web' | 'video';

interface Project {
  id: string;
  type: ProjectType;
  reel: string;
  name: string;
  category: string;
  meta: string;
  gradient: string;
}

const PROJECTS: Project[] = [
  {
    id: 'p1',
    type: 'web',
    reel: 'SITE 01',
    name: 'Northbound Coffee',
    category: 'Brand site + launch page',
    meta: 'Live site',
    gradient: 'from-[#FFA649]/25 via-[#080808] to-[#080808]',
  },
  {
    id: 'p2',
    type: 'video',
    reel: 'REEL 01',
    name: 'Fielder Outdoor',
    category: 'Product launch film',
    meta: '1:24',
    gradient: 'from-[#8FA1AD]/25 via-[#080808] to-[#080808]',
  },
  {
    id: 'p3',
    type: 'web',
    reel: 'SITE 02',
    name: 'Havenly',
    category: 'E-commerce build',
    meta: 'Live site',
    gradient: 'from-[#FFA649]/20 via-[#080808] to-[#080808]',
  },
  {
    id: 'p4',
    type: 'video',
    reel: 'REEL 02',
    name: 'Marlow & Co',
    category: 'Founder story',
    meta: '2:10',
    gradient: 'from-[#8FA1AD]/20 via-[#080808] to-[#080808]',
  },
  {
    id: 'p5',
    type: 'video',
    reel: 'REEL 03',
    name: 'Ridgeline Media',
    category: 'Social content, 40 clips',
    meta: '0:38',
    gradient: 'from-[#FFA649]/25 via-[#080808] to-[#080808]',
  },
  {
    id: 'p6',
    type: 'web',
    reel: 'SITE 03',
    name: 'Northline Dental',
    category: 'Booking site + dashboard',
    meta: 'Live site',
    gradient: 'from-[#8FA1AD]/25 via-[#080808] to-[#080808]',
  },
];

const FILTERS: { label: string; value: 'all' | ProjectType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Video', value: 'video' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function ProjectCard({
  project,
  index,
  total,
  scrollYProgress,
}: {
  project: Project;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const center = total > 1 ? index / (total - 1) : 0.5;
  const lo = Math.max(0, center - 0.22);
  const hi = Math.min(1, center + 0.22);
  const focusScale = useTransform(scrollYProgress, [lo, center, hi], [0.92, 1, 0.92]);
  const focusOpacity = useTransform(scrollYProgress, [lo, center, hi], [0.62, 1, 0.62]);

  return (
    <motion.div
      layout
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="aspect-4/3 w-[78vw] shrink-0 snap-start sm:w-[42vw] md:w-[30vw] lg:w-[26vw]"
    >
      <motion.div style={{ scale: focusScale, opacity: focusOpacity }} className="h-full">
        <TiltCard tiltDegree={3} glare className="h-full">
          <a
            href="#contact"
            className="group relative block h-full overflow-hidden rounded-xl border border-[#FFA649]/10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#FFA649]/30 hover:shadow-[0_20px_50px_-16px_rgba(255,166,73,0.25)]"
            data-cursor
          >
            {project.type === 'web' ? (
              <div className="absolute inset-0 flex flex-col bg-[#080808]">
                <div className="flex items-center gap-1.5 border-b border-white/5 bg-[#080808] px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-[#8FA1AD]/40" />
                  <span className="h-2 w-2 rounded-full bg-[#8FA1AD]/40" />
                  <span className="h-2 w-2 rounded-full bg-[#8FA1AD]/40" />
                </div>
                <div
                  className={`relative flex-1 bg-linear-to-br ${project.gradient} transition-all duration-700 group-hover:scale-105`}
                />
              </div>
            ) : (
              <div
                className={`absolute inset-0 bg-linear-to-br ${project.gradient} transition-all duration-700 group-hover:scale-105`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-[#080808]/70 backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:bg-[#FFA649]/20 group-hover:shadow-[0_0_30px_rgba(255,166,73,0.3)]"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Play className="ml-0.5 h-5 w-5 fill-[#FFA649] text-[#FFA649]" />
                  </motion.span>
                </div>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <span className="w-fit rounded bg-[#080808]/70 px-2 py-1 font-mono text-[11px] text-[#FFA649] backdrop-blur transition-all duration-300 group-hover:bg-[#FFA649]/20">
                  {project.reel}
                </span>
                <span className="rounded bg-[#080808]/70 px-2 py-1 font-mono text-[11px] text-[#8FA1AD] backdrop-blur transition-all duration-300 group-hover:bg-[#FFA649]/10 group-hover:text-[#FFA649]">
                  {project.meta}
                </span>
              </div>
              <div>
                <motion.h3 className="flex items-center gap-1.5 h-font text-xl font-semibold text-[#F3ECE0] transition-all duration-300 group-hover:translate-x-1">
                  {project.name}
                  {project.type === 'web' && (
                    <ArrowUpRight className="h-4 w-4 text-[#FFA649] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </motion.h3>
                <p className="mt-1 text-sm text-[#C9D3D9] transition-all duration-300 group-hover:text-[#F3ECE0]">
                  {project.category}
                </p>
              </div>
            </div>
          </a>
        </TiltCard>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState<'all' | ProjectType>('all');

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const trackRef = useRef<HTMLDivElement>(null);

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.type === filter);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const rawX = useTransform(scrollYProgress, (value) => {
    const track = trackRef.current;
    if (!track) return '0px';
    const parent = track.parentElement;
    if (!parent) return '0px';
    const maxScroll = Math.max(0, track.scrollWidth - parent.clientWidth);
    return `-${value * maxScroll}px`;
  });
  const x = useSpring(rawX, { stiffness: 380, damping: 46, mass: 0.6 });

  const progressScaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40 });

  const counterLabel = useTransform(scrollYProgress, (value) => {
    const total = filtered.length;
    if (total === 0) return '00 — 00';
    const current = Math.min(total, Math.round(value * (total - 1)) + 1);
    return `${String(current).padStart(2, '0')} — ${String(total).padStart(2, '0')}`;
  });

  return (
    <section id="work" className="relative" ref={sectionRef}>
      <div style={{ height: `${filtered.length * 100}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-[#080808]">
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-40"
              style={{
                background: 'radial-gradient(circle, rgba(255,166,73,0.4) 0%, transparent 70%)',
                filter: 'blur(45px)',
              }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.45, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(143,161,173,0.3) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </div>
          
          {/* animated particle network — premium ambient background */}
          <NetworkBackground className="z-1" />

          <div className="relative z-10 mx-auto w-full max-w-6xl shrink-0 px-6 pt-24 md:pt-28">
            <motion.div
              className="mb-14 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[#FFA649]"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span>00:03</span>
              <motion.span
                className="h-px flex-1 origin-left bg-[#FFA649]/20"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
              />
              <motion.span className="text-[#8FA1AD]">{counterLabel}</motion.span>
            </motion.div>

            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <motion.h2
                className="max-w-lg h-font text-3xl leading-tight text-[#F3ECE0] sm:text-3xl md:text-4xl"
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              >
                Sites people visit. Reels people rewatch.
              </motion.h2>

              <motion.div
                className="flex gap-2"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
              >
                {FILTERS.map((f) => {
                  const active = filter === f.value;
                  return (
                    <motion.button
                      key={f.value}
                      onClick={() => setFilter(f.value)}
                      whileTap={{ scale: 0.96 }}
                      className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                        active
                          ? 'border-transparent text-[#1B262E]'
                          : 'border-[#8FA1AD]/20 text-[#8FA1AD] hover:border-[#FFA649]/40 hover:text-[#FFA649]'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="portfolioFilterPill"
                          className="absolute inset-0 rounded-full bg-[#FFA649] shadow-[0_4px_12px_rgba(255,166,73,0.3)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{f.label}</span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </div>

          <div className="relative mt-6 flex min-h-0 flex-1">
            <div className="flex w-full items-center border-y border-[#FFA649]/15 bg-[#080808]/40 py-2">
              <motion.div ref={trackRef} style={{ x }} className="flex gap-4 px-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={i}
                      total={filtered.length}
                      scrollYProgress={scrollYProgress}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#FFA649]/10">
              <motion.div
                className="h-full origin-left bg-[#FFA649]"
                style={{ scaleX: progressScaleX }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
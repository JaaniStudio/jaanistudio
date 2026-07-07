'use client';

import { useEffect, useRef, useState, startTransition } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { PointerEvent as ReactPointerEvent, MouseEvent as ReactMouseEvent } from 'react';
import { Play, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import TiltCard from './TiltCard';

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
    gradient: 'from-[#FFA649]/25 via-[#283845] to-[#1B262E]',
  },
  {
    id: 'p2',
    type: 'video',
    reel: 'REEL 01',
    name: 'Fielder Outdoor',
    category: 'Product launch film',
    meta: '1:24',
    gradient: 'from-[#8FA1AD]/25 via-[#283845] to-[#1B262E]',
  },
  {
    id: 'p3',
    type: 'web',
    reel: 'SITE 02',
    name: 'Havenly',
    category: 'E-commerce build',
    meta: 'Live site',
    gradient: 'from-[#FFA649]/20 via-[#1B262E] to-[#283845]',
  },
  {
    id: 'p4',
    type: 'video',
    reel: 'REEL 02',
    name: 'Marlow & Co',
    category: 'Founder story',
    meta: '2:10',
    gradient: 'from-[#8FA1AD]/20 via-[#1B262E] to-[#283845]',
  },
  {
    id: 'p5',
    type: 'video',
    reel: 'REEL 03',
    name: 'Ridgeline Media',
    category: 'Social content, 40 clips',
    meta: '0:38',
    gradient: 'from-[#FFA649]/25 via-[#283845] to-[#1B262E]',
  },
  {
    id: 'p6',
    type: 'web',
    reel: 'SITE 03',
    name: 'Northline Dental',
    category: 'Booking site + dashboard',
    meta: 'Live site',
    gradient: 'from-[#8FA1AD]/25 via-[#1B262E] to-[#283845]',
  },
];

const FILTERS: { label: string; value: 'all' | ProjectType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Video', value: 'video' },
];

export default function Portfolio() {
  const [filter, setFilter] = useState<'all' | ProjectType>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDragging: false, startX: 0, startScroll: 0, moved: false });
  const prevFilterRef = useRef(filter);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.type === filter);

  useEffect(() => {
    if (prevFilterRef.current !== filter) {
      prevFilterRef.current = filter;
      startTransition(() => setActiveIndex(0));
      containerRef.current?.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [filter]);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(index, filtered.length - 1));
    const card = container.children[clamped] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    setActiveIndex(clamped);
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(container.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft - container.scrollLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    dragState.current = { isDragging: true, startX: e.clientX, startScroll: container.scrollLeft, moved: false };
    container.setPointerCapture(e.pointerId);
    container.style.cursor = 'grabbing';
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container || !dragState.current.isDragging) return;
    const delta = e.clientX - dragState.current.startX;
    if (Math.abs(delta) > 4) dragState.current.moved = true;
    container.scrollLeft = dragState.current.startScroll - delta;
  };

  const endDrag = () => {
    const container = containerRef.current;
    if (!container) return;
    dragState.current.isDragging = false;
    container.style.cursor = 'grab';
  };

  const onCardClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (dragState.current.moved) {
      e.preventDefault();
    }
  };

  return (
    <section id="work" className="relative bg-[#283845] py-24 md:py-32" ref={sectionRef}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-14 flex items-center gap-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[#FFA649]"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>00:03</span>
          <span className="h-px flex-1 bg-[#FFA649]/20" />
          <span className="text-[#8FA1AD]">Selected work</span>
        </motion.div>

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <motion.h2
            className="max-w-lg font-[family-name:var(--font-display)] text-3xl leading-tight text-[#F3ECE0] sm:text-4xl md:text-5xl"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            Sites people visit. Reels people rewatch.
          </motion.h2>

          <motion.div
            className="flex gap-2"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            {FILTERS.map((f) => (
              <motion.button
                key={f.value}
                onClick={() => setFilter(f.value)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  filter === f.value
                    ? 'border-[#FFA649] bg-[#FFA649] text-[#1B262E] shadow-[0_4px_12px_rgba(255,166,73,0.3)]'
                    : 'border-[#8FA1AD]/20 text-[#8FA1AD] hover:border-[#FFA649]/40 hover:text-[#FFA649] hover:shadow-[0_0_20px_rgba(255,166,73,0.06)]'
                }`}
              >
                {f.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative mt-14">
        <div className="border-y border-[#FFA649]/15 bg-[#1B262E]/40 py-2">
          <div
            ref={containerRef}
            onScroll={handleScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            className="flex cursor-grab snap-x snap-proximity gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="aspect-[4/3] w-[78vw] shrink-0 snap-start sm:w-[42vw] md:w-[30vw] lg:w-[26vw]"
                >
                  <TiltCard tiltDegree={3} glare={true} className="h-full">
                    <a
                      href="#contact"
                      onClick={onCardClick}
                      className="group relative block h-full overflow-hidden rounded-xl border border-[#FFA649]/10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#FFA649]/30 hover:shadow-[0_20px_50px_-16px_rgba(255,166,73,0.25)]"
                      data-cursor
                    >
                      {project.type === 'web' ? (
                        <div className="absolute inset-0 flex flex-col bg-[#1B262E]">
                          <div className="flex items-center gap-1.5 border-b border-white/5 bg-[#151f26] px-3 py-2">
                            <span className="h-2 w-2 rounded-full bg-[#8FA1AD]/40" />
                            <span className="h-2 w-2 rounded-full bg-[#8FA1AD]/40" />
                            <span className="h-2 w-2 rounded-full bg-[#8FA1AD]/40" />
                          </div>
                          <div
                            className={`relative flex-1 bg-gradient-to-br ${project.gradient} transition-all duration-700 group-hover:scale-105`}
                          />
                        </div>
                      ) : (
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-all duration-700 group-hover:scale-105`}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.span
                              className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1B262E]/70 backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:bg-[#FFA649]/20 group-hover:shadow-[0_0_30px_rgba(255,166,73,0.3)]"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Play className="ml-0.5 h-5 w-5 fill-[#FFA649] text-[#FFA649]" />
                            </motion.span>
                          </div>
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6">
                        <div className="flex items-center justify-between">
                          <span className="w-fit rounded bg-[#1B262E]/70 px-2 py-1 font-[family-name:var(--font-mono)] text-[11px] text-[#FFA649] backdrop-blur transition-all duration-300 group-hover:bg-[#FFA649]/20">
                            {project.reel}
                          </span>
                          <span className="rounded bg-[#1B262E]/70 px-2 py-1 font-[family-name:var(--font-mono)] text-[11px] text-[#8FA1AD] backdrop-blur transition-all duration-300 group-hover:bg-[#FFA649]/10 group-hover:text-[#FFA649]">
                            {project.meta}
                          </span>
                        </div>
                        <div>
                          <motion.h3 className="flex items-center gap-1.5 font-[family-name:var(--font-display)] text-xl font-semibold text-[#F3ECE0] transition-all duration-300 group-hover:translate-x-1">
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
              ))}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          className="mx-auto mt-6 flex max-w-6xl items-center justify-between px-6"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <div className="flex gap-2">
            <motion.button
              aria-label="Previous project"
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFA649]/20 text-[#F3ECE0] transition-colors duration-300 hover:border-[#FFA649] hover:text-[#FFA649] hover:shadow-[0_0_20px_rgba(255,166,73,0.15)] disabled:pointer-events-none disabled:opacity-25"
            >
              <ArrowLeft className="h-4 w-4" />
            </motion.button>
            <motion.button
              aria-label="Next project"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === filtered.length - 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFA649]/20 text-[#F3ECE0] transition-colors duration-300 hover:border-[#FFA649] hover:text-[#FFA649] hover:shadow-[0_0_20px_rgba(255,166,73,0.15)] disabled:pointer-events-none disabled:opacity-25"
            >
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>

          <div className="flex gap-2">
            {filtered.map((project, i) => (
              <motion.button
                key={project.id}
                aria-label={`Go to ${project.name}`}
                onClick={() => scrollToIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  i === activeIndex
                    ? 'w-6 bg-[#FFA649] shadow-[0_0_8px_rgba(255,166,73,0.4)]'
                    : 'w-1.5 bg-[#8FA1AD]/30 hover:bg-[#8FA1AD]/60'
                }`}
                whileHover={i !== activeIndex ? { scale: 1.5 } : {}}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

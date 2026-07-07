'use client';

import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent, MouseEvent as ReactMouseEvent } from 'react';
import { Play, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';

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

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.type === filter);

  // reset to the start whenever the filter changes, so dots/arrows stay in sync
  useEffect(() => {
    setActiveIndex(0);
    containerRef.current?.scrollTo({ left: 0, behavior: 'auto' });
  }, [filter]);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(index, filtered.length - 1));
    const card = container.children[clamped] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    setActiveIndex(clamped);
  };

  // keep the active dot synced while the user scrolls or drags manually
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
    <section id="work" className="relative bg-[#283845] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex items-center gap-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[#FFA649]">
          <span>00:03</span>
          <span className="h-px flex-1 bg-[#FFA649]/20" />
          <span className="text-[#8FA1AD]">Selected work</span>
        </div>

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="max-w-lg font-[family-name:var(--font-display)] text-3xl leading-tight text-[#F3ECE0] sm:text-4xl md:text-5xl">
            Sites people visit. Reels people rewatch.
          </h2>

          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  filter === f.value
                    ? 'border-[#FFA649] bg-[#FFA649] text-[#1B262E]'
                    : 'border-[#8FA1AD]/20 text-[#8FA1AD] hover:border-[#FFA649]/40 hover:text-[#FFA649]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* filmstrip slider — drag with your mouse/finger, or use the arrows below */}
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
            {filtered.map((project) => (
              <a
                key={project.id}
                href="#contact"
                onClick={onCardClick}
                className="group relative aspect-[4/3] w-[78vw] shrink-0 snap-start overflow-hidden rounded-xl border border-[#FFA649]/10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 sm:w-[42vw] md:w-[30vw] lg:w-[26vw]"
              >
                {project.type === 'web' ? (
                  <div className="absolute inset-0 flex flex-col bg-[#1B262E]">
                    {/* browser chrome mockup — signals "this is a website" at a glance */}
                    <div className="flex items-center gap-1.5 border-b border-white/5 bg-[#151f26] px-3 py-2">
                      <span className="h-2 w-2 rounded-full bg-[#8FA1AD]/40" />
                      <span className="h-2 w-2 rounded-full bg-[#8FA1AD]/40" />
                      <span className="h-2 w-2 rounded-full bg-[#8FA1AD]/40" />
                    </div>
                    <div
                      className={`relative flex-1 bg-gradient-to-br ${project.gradient} transition-transform duration-500 group-hover:scale-105`}
                    />
                  </div>
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-500 group-hover:scale-105`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1B262E]/70 backdrop-blur transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110">
                        <Play className="ml-0.5 h-5 w-5 fill-[#FFA649] text-[#FFA649]" />
                      </span>
                    </div>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6">
                  <div className="flex items-center justify-between">
                    <span className="w-fit rounded bg-[#1B262E]/70 px-2 py-1 font-[family-name:var(--font-mono)] text-[11px] text-[#FFA649] backdrop-blur">
                      {project.reel}
                    </span>
                    <span className="rounded bg-[#1B262E]/70 px-2 py-1 font-[family-name:var(--font-mono)] text-[11px] text-[#8FA1AD] backdrop-blur">
                      {project.meta}
                    </span>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-1.5 font-[family-name:var(--font-display)] text-xl font-semibold text-[#F3ECE0]">
                      {project.name}
                      {project.type === 'web' && (
                        <ArrowUpRight className="h-4 w-4 text-[#FFA649] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      )}
                    </h3>
                    <p className="mt-1 text-sm text-[#C9D3D9]">{project.category}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* controls: arrows + dots, actually wired to the scroll position */}
        <div className="mx-auto mt-6 flex max-w-6xl items-center justify-between px-6">
          <div className="flex gap-2">
            <button
              aria-label="Previous project"
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFA649]/20 text-[#F3ECE0] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 hover:border-[#FFA649] hover:text-[#FFA649] disabled:pointer-events-none disabled:opacity-25"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next project"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === filtered.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFA649]/20 text-[#F3ECE0] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 hover:border-[#FFA649] hover:text-[#FFA649] disabled:pointer-events-none disabled:opacity-25"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex gap-2">
            {filtered.map((project, i) => (
              <button
                key={project.id}
                aria-label={`Go to ${project.name}`}
                onClick={() => scrollToIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  i === activeIndex ? 'w-6 bg-[#FFA649]' : 'w-1.5 bg-[#8FA1AD]/30 hover:bg-[#8FA1AD]/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
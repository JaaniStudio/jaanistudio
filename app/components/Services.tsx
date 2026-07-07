'use client';

import { useEffect, useRef } from 'react';
import { Code2, Clapperboard, Sparkles, Scissors } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

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

export default function Services() {
  const headerRef = useScrollReveal<HTMLElement>(['.services-header', '.services-heading']);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { animate, stagger } = await import('animejs');
      if (cancelled || !gridRef.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const cards = gridRef.current?.querySelectorAll<HTMLElement>('.service-card');
            if (!cards?.length) return;
            animate(cards, {
              translateY: [40, 0],
              opacity: [0, 1],
              duration: 700,
              ease: 'outExpo',
              delay: stagger(100),
            });
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(gridRef.current);
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="services" className="relative bg-[#1B262E] px-6 py-24 md:py-32" ref={headerRef}>
      <div className="mx-auto max-w-6xl">
        <div className="services-header mb-14 flex items-center gap-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[#FFA649]">
          <span>00:02</span>
          <span className="h-px flex-1 bg-[#FFA649]/20" />
          <span className="text-[#8FA1AD]">Services</span>
        </div>

        <h2 className="services-heading max-w-2xl font-[family-name:var(--font-display)] text-3xl leading-tight text-[#F3ECE0] sm:text-4xl md:text-5xl">
          Everything runs on one timeline.
        </h2>

        <div ref={gridRef} className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#FFA649]/10 bg-[#FFA649]/5 md:grid-cols-2">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.track}
                className="service-card relative bg-[#1B262E] p-8 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:-translate-y-1 hover:bg-[#283845] hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] md:p-10"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 hover:opacity-100"
                  style={{
                    background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,166,73,0.04), transparent 60%)',
                  }}
                />
                <div className="relative">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="rounded border border-[#FFA649]/30 px-2 py-1 font-[family-name:var(--font-mono)] text-[11px] text-[#FFA649]">
                      TRACK / {service.track}
                    </span>
                    <Icon
                      className="h-5 w-5 text-[#FFA649]/50 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:rotate-12 group-hover:text-[#FFA649]"
                      strokeWidth={1.75}
                    />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#F3ECE0] sm:text-2xl">
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

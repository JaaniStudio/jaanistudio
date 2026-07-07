'use client';

import { useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

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

export default function About() {
  const sectionRef = useScrollReveal<HTMLElement>([
    '.about-header',
    '.about-heading',
    '.about-text',
    '.about-text-2',
  ]);

  const metaRef = useScrollReveal<HTMLDListElement>(['.meta-item'], undefined, { threshold: 0.1 });

  const marqueeRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="about" className="relative bg-[#283845] px-6 py-24 md:py-32" ref={sectionRef}>
      <div className="mx-auto max-w-6xl">
        <div className="about-header mb-14 flex items-center gap-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[#FFA649]">
          <span>00:01</span>
          <span className="h-px flex-1 bg-[#FFA649]/20" />
          <span className="text-[#8FA1AD]">About</span>
        </div>

        <div className="grid gap-16 md:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="about-heading font-[family-name:var(--font-display)] text-3xl leading-tight text-[#F3ECE0] sm:text-4xl md:text-5xl">
              We started as two freelancers arguing over the same export settings, three energy
              drinks deep.
            </h2>
            <p className="about-text mt-6 max-w-lg text-[#C9D3D9]">
              Now Jaani Studio builds the site and cuts the footage for the same brands, on the
              same timeline. No handoff between &ldquo;the web team&rdquo; and &ldquo;the video
              team&rdquo; — one crew, one brief, one deadline. That&rsquo;s the whole pitch.
            </p>
            <p className="about-text-2 mt-4 max-w-lg text-[#C9D3D9]">
              We keep the client roster small on purpose. Fewer projects, more frames reviewed,
              fewer things that ship half-finished — and yes, we will tell you if your idea needs
              work before your competitors do.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#FFA649]/10 bg-[#FFA649]/5 sm:grid-cols-1" ref={metaRef}>
            {META.map((item) => (
              <div
                key={item.label}
                className="meta-item group bg-[#283845] px-6 py-5 transition-all duration-300 hover:bg-[#2f4150] hover:shadow-[inset_0_0_20px_rgba(255,166,73,0.06)]"
              >
                <dt className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest text-[#8FA1AD]">
                  {item.label}
                </dt>
                <dd className="mt-1 text-lg font-semibold text-[#F3ECE0] transition-all duration-300 group-hover:text-[#FFA649] group-hover:translate-x-1">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div ref={marqueeRef} className="group relative mt-20 overflow-hidden border-y border-[#FFA649]/10 py-5">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-12 group-hover:[animation-play-state:paused]">
          {[...TOOLS, ...TOOLS].map((tool, i) => (
            <span
              key={i}
              className="marquee-item font-[family-name:var(--font-mono)] text-sm uppercase tracking-wide text-[#8FA1AD]/70 transition-all duration-300 hover:text-[#FFA649] hover:scale-110"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

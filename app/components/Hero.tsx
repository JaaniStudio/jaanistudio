'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const TAGS = ['Web Design', 'Brand Video', 'Motion Graphics', 'Social Cuts'];

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // animejs v4 uses named exports, no default export
      const { createTimeline, stagger, animate } = await import('animejs');
      if (cancelled || !rootRef.current) return;

      const root = rootRef.current;
      const ticks = root.querySelectorAll<HTMLElement>('.tl-tick');
      const words = root.querySelectorAll<HTMLElement>('.tl-word');
      const tags = root.querySelectorAll<HTMLElement>('.tl-tag');
      const playhead = root.querySelector<HTMLElement>('.tl-playhead');
      const track = root.querySelector<HTMLElement>('.tl-track-fill');

      const tl = createTimeline({ defaults: { ease: 'outExpo' } });

      tl.add(ticks, {
        scaleY: [0, 1],
        opacity: [0, 1],
        duration: 500,
        delay: stagger(18),
      })
        .add(track ? [track] : [], { width: ['0%', '38%'], duration: 900 }, '-=300')
        .add(
          playhead ? [playhead] : [],
          { translateX: ['0vw', '38vw'], duration: 900, ease: 'outQuint' },
          '-=900'
        )
        .add(
          words,
          { translateY: [36, 0], opacity: [0, 1], duration: 800, delay: stagger(80) },
          '-=700'
        )
        .add(
          tags,
          { translateY: [12, 0], opacity: [0, 1], duration: 500, delay: stagger(90) },
          '-=400'
        );

      // frame-accurate timecode counter, ticking up like an export progress readout
      if (timecodeRef.current) {
        const el = timecodeRef.current;
        const counter = { frame: 0 };
        animate(counter, {
          frame: 240,
          duration: 2200,
          ease: 'outExpo',
          onUpdate: () => {
            const totalFrames = Math.round(counter.frame);
            const ff = totalFrames % 30;
            const ss = Math.floor(totalFrames / 30) % 60;
            const mm = Math.floor(totalFrames / 30 / 60);
            el.textContent = `00:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}:${String(
              ff
            ).padStart(2, '0')}`;
          },
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative overflow-hidden bg-[#283845] px-6 pb-24 pt-40 md:pb-32 md:pt-48"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full bg-[#FFA649]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between font-[family-name:var(--font-mono)] text-xs text-[#8FA1AD]">
          <span>REEL_001 / LAUNCH</span>
          <span ref={timecodeRef} className="text-[#FFA649]">
            00:00:00:00
          </span>
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-5xl leading-[0.95] tracking-tight text-[#F3ECE0] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <span className="block overflow-hidden pb-1">
            <span className="tl-word inline-block">Websites and video</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="tl-word inline-block text-[#FFA649]">that hit their mark.</span>
          </span>
        </h1>

        <p className="tl-word mt-8 max-w-xl text-lg text-[#C9D3D9]">
          Cutline is a design and motion studio for brands who need a site that converts and
          footage that stops the scroll — cut on the same timeline, shipped on one deadline.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="#contact"
            className="tl-word rounded-full bg-[#FFA649] px-7 py-3.5 text-sm font-semibold text-[#1B262E] transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Start your project
          </Link>
          <Link
            href="#work"
            className="tl-word rounded-full border border-[#FFA649]/30 px-7 py-3.5 text-sm font-semibold text-[#F3ECE0] transition-colors hover:border-[#FFA649] hover:text-[#FFA649]"
          >
            See our work
          </Link>
        </div>

        {/* timeline scrubber */}
        <div className="relative mt-20">
          <div className="relative h-px w-full bg-[#FFA649]/15">
            <div className="tl-track-fill absolute left-0 top-0 h-px w-0 bg-[#FFA649]" />
            <div className="tl-playhead absolute -top-[7px] left-0 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[#FFA649] bg-[#283845]" />
          </div>
          <div className="mt-3 flex justify-between">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className={`tl-tick w-px origin-bottom bg-[#FFA649]/25 ${i % 6 === 0 ? 'h-3' : 'h-1.5'}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="tl-tag rounded-full border border-[#8FA1AD]/20 px-4 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wide text-[#8FA1AD]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
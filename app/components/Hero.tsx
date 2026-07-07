'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const ROTATING_WORDS = ['their mark.', 'different.', 'the scroll.', 'your inbox.'];
const TAGS = ['Web Design', 'Brand Video', 'Motion Graphics', 'Social Cuts'];
const LOGOS = ['Northbound', 'Fielder', 'Havenly', 'Marlow & Co', 'Ridgeline'];

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  // rotating word — flips to the next word on a timer, animated with anime.js
  useEffect(() => {
    let cancelled = false;
    let interval: ReturnType<typeof setInterval>;

    (async () => {
      const { animate } = await import('animejs');
      if (cancelled) return;

      interval = setInterval(() => {
        if (!wordRef.current) return;
        animate(wordRef.current, {
          translateY: [0, -14],
          opacity: [1, 0],
          duration: 260,
          ease: 'inQuad',
          onComplete: () => {
            setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
            if (!wordRef.current) return;
            animate(wordRef.current, {
              translateY: [14, 0],
              opacity: [0, 1],
              duration: 420,
              ease: 'outBack',
            });
          },
        });
      }, 2600);
    })();

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // main entrance timeline
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { createTimeline, stagger, animate } = await import('animejs');
      if (cancelled || !rootRef.current) return;

      const root = rootRef.current;
      const ticks = root.querySelectorAll<HTMLElement>('.tl-tick');
      const words = root.querySelectorAll<HTMLElement>('.tl-word');
      const tags = root.querySelectorAll<HTMLElement>('.tl-tag');
      const badge = root.querySelector<HTMLElement>('.tl-badge');
      const logos = root.querySelectorAll<HTMLElement>('.tl-logo');
      const playhead = root.querySelector<HTMLElement>('.tl-playhead');
      const track = root.querySelector<HTMLElement>('.tl-track-fill');

      const tl = createTimeline({ defaults: { ease: 'outExpo' } });

      tl.add(badge ? [badge] : [], { translateY: [-16, 0], opacity: [0, 1], duration: 500 })
        .add(ticks, { scaleY: [0, 1], opacity: [0, 1], duration: 500, delay: stagger(16) }, '-=200')
        .add(track ? [track] : [], { width: ['0%', '38%'], duration: 900 }, '-=300')
        .add(
          playhead ? [playhead] : [],
          { translateX: ['0vw', '38vw'], duration: 1000, ease: 'outElastic(1, .6)' },
          '-=900'
        )
        .add(
          words,
          { translateY: [40, 0], opacity: [0, 1], rotate: [2, 0], duration: 800, delay: stagger(90) },
          '-=750'
        )
        .add(tags, { translateY: [14, 0], opacity: [0, 1], duration: 500, delay: stagger(80) }, '-=400')
        .add(logos, { opacity: [0, 1], duration: 600, delay: stagger(70) }, '-=250');

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

      // gentle perpetual float on the tag chips — keeps the hero feeling alive, not static
      animate('.tl-tag', {
        translateY: [0, -6, 0],
        duration: 2600,
        delay: stagger(300, { start: 1400 }),
        loop: true,
        ease: 'inOutSine',
      });
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
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#FFA649]/5 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between font-[family-name:var(--font-mono)] text-xs text-[#8FA1AD]">
          <span>JAANI_REEL — 001</span>
          <span ref={timecodeRef} className="text-[#FFA649]">
            00:00:00:00
          </span>
        </div>

        {/* playful availability badge */}
        <div className="tl-badge mb-6 opacity-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FFA649]/25 bg-[#FFA649]/5 px-4 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wide text-[#FFA649]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFA649] opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FFA649]" />
            </span>
            Say jaani — now booking Q3
          </span>
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-5xl leading-[0.95] tracking-tight text-[#F3ECE0] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <span className="block overflow-hidden pb-1">
            <span className="tl-word inline-block">Websites and video</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="tl-word inline-block">
              that hit{' '}
              <span className="relative inline-block align-top text-[#FFA649]">
                <span ref={wordRef} className="inline-block">
                  {ROTATING_WORDS[wordIndex]}
                </span>
              </span>
            </span>
          </span>
        </h1>

        <p className="tl-word mt-8 max-w-xl text-lg text-[#C9D3D9]">
          Jaani Studio designs sites and cuts video for brands who&rsquo;d rather be remembered
          than ignored. One crew, one timeline, zero boring PDFs of &ldquo;brand guidelines.&rdquo;
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="#contact"
            className="tl-word group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#FFA649] px-7 py-3.5 text-sm font-semibold text-[#1B262E] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.05] hover:shadow-[0_10px_30px_-6px_rgba(255,166,73,0.65)] active:scale-[0.95]"
          >
            Start your project
            <span className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="#work"
            className="tl-word group inline-flex items-center gap-2 rounded-full border border-[#FFA649]/30 px-7 py-3.5 text-sm font-semibold text-[#F3ECE0] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.05] hover:border-[#FFA649] hover:text-[#FFA649] active:scale-[0.95]"
          >
            See our work
            <span className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1">
              ↳
            </span>
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

        {/* trust strip */}
        <div className="mt-16 border-t border-[#FFA649]/10 pt-8">
          <p className="mb-4 text-xs text-[#8FA1AD]">
            Trusted by teams who used to have fourteen unread Slack messages from their old agency
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {LOGOS.map((logo) => (
              <span
                key={logo}
                className="tl-logo font-[family-name:var(--font-display)] text-sm font-semibold text-[#F3ECE0]/40 opacity-0 transition-colors duration-300 hover:text-[#F3ECE0]/80"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
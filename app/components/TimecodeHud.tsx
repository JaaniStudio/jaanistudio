'use client';

import { useEffect, useState } from 'react';

const CHAPTERS: { id: string; label: string }[] = [
  { id: 'top', label: '00:00' },
  { id: 'services', label: '00:01' },
  { id: 'work', label: '00:02' },
  { id: 'about', label: '00:03' },
  { id: 'team', label: '00:04' },
  { id: 'contact', label: '00:05' },
  { id: 'outro', label: '00:06' },
];

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function TimecodeHud() {
  const [label, setLabel] = useState('00:00');
  const [sec, setSec] = useState(0);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(min-width: 768px)').matches) return;

    const probe = window.innerHeight * 0.4;
    let activeLabel = CHAPTERS[0].label;
    let chapterStart = performance.now();
    let rafId = 0;

    const pickChapter = () => {
      let current = CHAPTERS[0].label;
      for (const chapter of CHAPTERS) {
        const el = document.getElementById(chapter.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= probe) current = chapter.label;
      }
      return current;
    };

    const onScroll = () => {
      const next = pickChapter();
      if (next !== activeLabel) {
        activeLabel = next;
        chapterStart = performance.now();
        setLabel(next);
      }
    };

    const tick = (now: number) => {
      const elapsed = now - chapterStart;
      setSec(Math.floor(elapsed / 1000) % 60);
      setFrame(Math.floor(elapsed / 33.366) % 30);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-5 right-5 z-40 hidden items-center gap-2.5 rounded-full border border-[#FFA649]/15 bg-[#080808]/70 px-4 py-1.5 font-mono text-[11px] tracking-widest text-[#8FA1AD] backdrop-blur-md md:flex"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFA649] opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FFA649]" />
      </span>
      <span className="text-[#FFA649]">REC</span>
      <span className="text-[#F3ECE0]">
        {label}
        <span className="text-[#8FA1AD]">:{pad(sec)}:{pad(frame)}</span>
      </span>
    </div>
  );
}

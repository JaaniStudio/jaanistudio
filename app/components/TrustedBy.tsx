'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const LOGOS = ['Northbound', 'Fielder', 'Havenly', 'Marlow & Co', 'Ridgeline'];

export default function TrustedBy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-40px' });
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const hoverRef = useRef(false);

  useEffect(() => {
    hoverRef.current = hover;
  }, [hover]);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.transform = 'translateX(0)';
      return;
    }
    let rafId: number;
    let start: number | null = null;
    let pausedAt = 0;
    const duration = 24000;

    const tick = (ts: number) => {
      if (!start) start = ts;
      if (hoverRef.current) {
        start = ts - pausedAt;
        rafId = requestAnimationFrame(tick);
        return;
      }
      pausedAt = ts - start;
      const progress = (pausedAt % duration) / duration;
      el.style.transform = `translateX(${-progress * 50}%)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080808] px-6 pb-16 pt-20 md:pb-20 md:pt-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden border-t border-[#FFA649]/10 pt-8"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <p className="mb-4 text-xs text-[#8FA1AD]">
            Trusted by teams who used to have fourteen unread Slack messages from their old agency
          </p>
          <div
            ref={marqueeRef}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="flex w-max items-center gap-12"
          >
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <span key={`${logo}-${i}`} className="flex items-center gap-12">
                <span
                  className={`whitespace-nowrap transition-all duration-300 hover:text-[#FFA649] ${
                    i % 2 === 0
                      ? 'h-font text-base font-semibold text-[#F3ECE0]/45 hover:scale-105'
                      : 'font-script text-2xl text-[#FFA649]/70 hover:scale-110'
                  }`}
                >
                  {logo}
                </span>
                <span
                  className="inline-block select-none text-[#FFA649]/40 transition-all duration-300 hover:rotate-180 hover:text-[#FFA649]"
                  style={{ transitionProperty: 'color, transform' }}
                >
                  ✦
                </span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

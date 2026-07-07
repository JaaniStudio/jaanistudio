'use client';

import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  selectors: readonly string[],
  animeParams?: Record<string, unknown>,
  options?: ScrollRevealOptions
) {
  const ref = useRef<T>(null);
  const { threshold = 0.15, rootMargin = '0px', once = true } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;

    (async () => {
      const { animate, stagger } = await import('animejs');
      if (cancelled || !el) return;

      const els = selectors
        .flatMap((sel) => Array.from(el.querySelectorAll<HTMLElement>(sel)))
        .filter(Boolean) as HTMLElement[];

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            animate(els, {
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 700,
              ease: 'outExpo',
              delay: stagger(80),
              ...animeParams,
            });
            if (once) observer.unobserve(el);
          }
        },
        { threshold, rootMargin }
      );
      observer.observe(el);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...selectors, animeParams, threshold, rootMargin, once]);

  return ref;
}

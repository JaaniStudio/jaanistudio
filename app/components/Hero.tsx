'use client';

import { useEffect, useRef, useState, startTransition } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence, useAnimationControls } from 'framer-motion';
import MagneticButton from './MagneticButton';
import Image from 'next/image';

const ROTATING_WORDS = ['their mark.', 'different.', 'the scroll.', 'your inbox.'];
const TAGS = ['Web Design', 'Brand Video', 'Motion Graphics', 'Social Cuts'];
const LOGOS = ['Northbound', 'Fielder', 'Havenly', 'Marlow & Co', 'Ridgeline'];
const HEADLINE_LINE_1 = 'Websites and video';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.55,
    },
  },
};

const childVariants = {
  hidden: { y: 28, opacity: 0, filter: 'blur(6px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const wordVariants = {
  hidden: { y: 40, opacity: 0, rotate: 2, filter: 'blur(10px)' },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.55 + i * 0.1 },
  }),
};

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [logoMarqueeHover, setLogoMarqueeHover] = useState(false);
  const logoMarqueeHoverRef = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [charInteracted, setCharInteracted] = useState(false);
  const charControls = useAnimationControls();

  // mouse parallax — drives the spotlight drift and the character's subtle tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.6 });
  const glowX = useTransform(springX, [-1, 1], [-24, 24]);
  const glowY = useTransform(springY, [-1, 1], [-12, 12]);
  const charRotateY = useTransform(springX, [-1, 1], [-7, 7]);
  const charRotateX = useTransform(springY, [-1, 1], [6, -6]);
  const charPullX = useTransform(springX, [-1, 1], [-16, 16]);

  const { scrollY } = useScroll();
  const scrollCueOpacity = useTransform(scrollY, [0, 220], [1, 0]);

  const handlePointerMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    startTransition(() => setMounted(true));
  }, []);

  // character entrance — same reveal as before, just driven through controls so
  // it can share the same transform pipeline as the drag/tap reactions
  useEffect(() => {
    if (!mounted) return;
    charControls.start({
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.9 },
    });
  }, [mounted, charControls]);

  async function handleCharacterTap() {
    setCharInteracted(true);
    await charControls.start({
      scale: [1, 0.85, 1.1, 0.96, 1],
      rotate: [0, -8, 6, -3, 0],
      transition: { duration: 0.6, ease: 'easeInOut' },
    });
  }

  // rotating last word
  useEffect(() => {
    if (!mounted) return;
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
  }, [mounted]);

  // floating tags
  useEffect(() => {
    if (!mounted || !rootRef.current) return;
    let cancelled = false;

    (async () => {
      const { animate, stagger } = await import('animejs');
      if (cancelled || !rootRef.current) return;

      animate('.tl-tag', {
        translateY: [0, -6, 0],
        duration: 2600,
        delay: stagger(300, { start: 1400 }),
        loop: true,
        ease: 'inOutSine',
      });
    })();

    return () => { cancelled = true; };
  }, [mounted]);

  // timecode counter
  useEffect(() => {
    if (!mounted || !timecodeRef.current) return;
    let cancelled = false;

    (async () => {
      const { animate } = await import('animejs');
      if (cancelled || !timecodeRef.current) return;

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
    })();

    return () => { cancelled = true; };
  }, [mounted]);

  // cinematic letter-by-letter reveal for the first headline line
  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;

    (async () => {
      const { animate, stagger } = await import('animejs');
      if (cancelled) return;

      animate('.hl-letter', {
        opacity: [0, 1],
        translateY: [22, 0],
        filter: ['blur(10px)', 'blur(0px)'],
        duration: 700,
        delay: stagger(16, { start: 650 }),
        ease: 'outExpo',
      });
    })();

    return () => { cancelled = true; };
  }, [mounted]);

  useEffect(() => {
    logoMarqueeHoverRef.current = logoMarqueeHover;
  }, [logoMarqueeHover]);

  // logo marquee — rAF loop, pauses on hover
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    let rafId: number;
    let start: number | null = null;
    let pausedAt = 0;
    const duration = 24000;

    const tick = (ts: number) => {
      if (!start) start = ts;
      if (logoMarqueeHoverRef.current) {
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
    <section
      id="top"
      ref={rootRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative overflow-hidden bg-[#283845] px-6 pb-24 pt-24 md:pb-32 md:pt-24"
    >
      {/* ambient top wash for depth */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,166,73,0.10) 0%, transparent 60%)',
        }}
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 40%, transparent 55%, rgba(10,14,18,0.35) 100%)',
        }}
      />

      {/* fine film-grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* cinematic curtain reveal */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-30 bg-[#1b252e]"
        initial={{ height: '52%' }}
        animate={{ height: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 bg-[#1b252e]"
        initial={{ height: '52%' }}
        animate={{ height: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={childVariants} className="mb-8 flex items-center justify-between font-mono text-xs text-[#8FA1AD]">
          <span>JAANI_REEL — 001</span>
          <span ref={timecodeRef} className="text-[#FFA649]">
            00:00:00:00
          </span>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-y-10 lg:grid-cols-2 lg:items-center lg:gap-x-14">
        <div>
        <motion.div variants={childVariants} className="mb-4">
          <span className="group inline-flex items-center gap-2 rounded-full border border-[#FFA649]/25 bg-[#FFA649]/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wide text-[#FFA649] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFA649]/45 hover:bg-[#FFA649]/10 hover:shadow-[0_8px_24px_-10px_rgba(255,166,73,0.5)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFA649] opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FFA649]" />
            </span>
            Say jaani — now booking Q3
          </span>
        </motion.div>

        <h1 className="font-[--font-display] text-5xl leading-[0.95] tracking-tight text-[#F3ECE0] sm:text-6xl md:text-7xl lg:text-[4.5rem]">
          <span className="block overflow-hidden pb-1">
            <span className="inline-block">
              {HEADLINE_LINE_1.split('').map((ch, i) => (
                <span key={i} className="hl-letter inline-block" style={{ opacity: 0 }}>
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))}
            </span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="inline-block"
              custom={1}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
            >
              that hit{' '}
              <span className="relative inline-block align-top text-[#FFA649]">
                <span ref={wordRef} className="inline-block">
                  {ROTATING_WORDS[wordIndex]}
                </span>
              </span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={childVariants}
          className="mt-6 max-w-xl text-md text-[#C9D3D9]"
        >
          Jaani Studio designs sites and cuts video for brands who&rsquo;d rather be remembered
          than ignored. One crew, one timeline, zero boring PDFs of &ldquo;brand guidelines.&rdquo;
        </motion.p>

        <motion.div variants={childVariants} className="mt-6 flex flex-wrap items-center gap-4">
          <MagneticButton href="#contact" variant="primary" arrow>
            Start your project
          </MagneticButton>
          <MagneticButton href="#work" variant="outline" arrow>
            See our work
          </MagneticButton>
        </motion.div>
        </div>

        <motion.div
          ref={stageRef}
          variants={childVariants}
          className="relative mx-auto h-65 w-full max-w-2xl [perspective:1200px]] md:h-75"
        >
          {/* theatrical beam falling onto the character */}
          <div
            className="pointer-events-none absolute left-1/2 -top-10 h-55 w-42.5 -translate-x-1/2"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,166,73,0.30), rgba(255,166,73,0))',
              clipPath: 'polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%)',
              filter: 'blur(8px)',
            }}
          />

          {/* soft radial glow, brightest at the base, fading upward — drifts gently with the cursor */}
          <motion.div
            className="pointer-events-none absolute left-1/2 bottom-0 h-57.5 w-full max-w-2xl -translate-x-1/2"
            style={{
              background:
                'radial-gradient(ellipse 55% 70% at 50% 85%, rgba(255,166,73,0.38) 0%, rgba(255,166,73,0.16) 40%, transparent 72%)',
              filter: 'blur(26px)',
              x: glowX,
              y: glowY,
            }}
          />

          {/* brighter core */}
          <motion.div
            className="pointer-events-none absolute left-1/2 bottom-0 h-57.5 w-full max-w-2xl -translate-x-1/2"
            style={{
              background:
                'radial-gradient(ellipse 22% 30% at 50% 92%, rgba(255,166,73,0.55) 0%, transparent 70%)',
              filter: 'blur(10px)',
              x: glowX,
              y: glowY,
            }}
          />

          {/* grounding shadow beneath the character — breathes opposite the float */}
          <motion.div
            className="pointer-events-none absolute left-1/2 bottom-3 h-6 w-40 -translate-x-1/2 rounded-full"
            style={{
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, transparent 75%)',
              filter: 'blur(4px)',
            }}
            animate={{ scaleX: [1, 0.82, 1], opacity: [0.9, 0.6, 0.9] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />

          {/* discoverability hint — fades once the person drags or taps the character */}
          <AnimatePresence>
            {!charInteracted && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4, transition: { duration: 0.3 } }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 2.4 }}
                className="pointer-events-none absolute right-2 top-0 z-10 whitespace-nowrap rounded-full border border-[#FFA649]/20 bg-[#1B262E]/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#8FA1AD] backdrop-blur"
              >
                ↔ drag me
              </motion.span>
            )}
          </AnimatePresence>

          {/* character — idle float, cursor magnetism/tilt, and a draggable, tappable reaction layer */}
          <div className="relative flex h-full items-end justify-center pb-6">
            <motion.div
              style={{ rotateX: charRotateX, rotateY: charRotateY, x: charPullX }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.2,
              }}
              className="flex items-center justify-center rounded-2xl"
            >
              <motion.div
                drag
                dragConstraints={stageRef}
                dragElastic={0.15}
                dragSnapToOrigin
                dragTransition={{ bounceStiffness: 320, bounceDamping: 22 }}
                onDragStart={() => setCharInteracted(true)}
                onTap={handleCharacterTap}
                whileHover={{ scale: 1.03 }}
                whileDrag={{ scale: 1.08, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.88, filter: 'blur(14px)' }}
                animate={charControls}
                className="cursor-grab touch-none active:cursor-grabbing"
              >
                <Image
                  src={'/char.png'}
                  className='grab'
                  alt="Main character — drag or tap to say hi"
                  width={350}
                  height={350}
                  priority
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        </div>

        <div className="relative mt-20">
          <div className="relative h-px w-full bg-[#FFA649]/15">
            <motion.div
              className="absolute left-0 top-0 h-px bg-[#FFA649]"
              initial={{ width: '0%' }}
              animate={{ width: '38%' }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 1.2 }}
            />
            <motion.div
              className="absolute -top-1.75 left-0 h-4 w-4 -translate-x-1/2"
              initial={{ x: '0vw' }}
              animate={{ x: '38vw' }}
              transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1], delay: 1.2 }}
            >
              <motion.span
                className="pointer-events-none absolute inset-0 rounded-full bg-[#FFA649]"
                animate={{ scale: [1, 2.1, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
              />
              <span className="relative block h-4 w-4 rounded-full border-2 border-[#FFA649] bg-[#283845]" />
            </motion.div>
          </div>
          <div className="mt-3 flex justify-between">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.span
                key={i}
                className={`w-px origin-bottom bg-[#FFA649]/25 ${i % 6 === 0 ? 'h-3' : 'h-1.5'}`}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 + i * 0.015, ease: 'easeOut' }}
              />
            ))}
          </div>
        </div>

        <motion.div
          variants={childVariants}
          className="mt-8 flex flex-wrap gap-3"
        >
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="tl-tag cursor-default rounded-full border border-[#8FA1AD]/20 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wide text-[#8FA1AD] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFA649]/40 hover:text-[#FFA649] hover:shadow-[0_8px_20px_-10px_rgba(255,166,73,0.4)]"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={childVariants}
          className="relative mt-16 overflow-hidden border-t border-[#FFA649]/10 pt-8"
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
            onMouseEnter={() => setLogoMarqueeHover(true)}
            onMouseLeave={() => setLogoMarqueeHover(false)}
            className="flex w-max items-center gap-12"
          >
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="whitespace-nowrap font-[--font-display] text-sm font-semibold text-[#F3ECE0]/40 transition-colors duration-300 hover:text-[#F3ECE0]/80"
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* scroll cue — visible on load, fades once the person actually scrolls */}
      <motion.div
        className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center"
        style={{ opacity: scrollCueOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 2.6 }}
          className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#8FA1AD]"
        >
          <span>Scroll</span>
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="m6 9 6 6 6-6" />
          </motion.svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
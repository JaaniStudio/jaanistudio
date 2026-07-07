'use client';

import { useEffect, useRef, useState, startTransition } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';

const ROTATING_WORDS = ['their mark.', 'different.', 'the scroll.', 'your inbox.'];
const TAGS = ['Web Design', 'Brand Video', 'Motion Graphics', 'Social Cuts'];
const LOGOS = ['Northbound', 'Fielder', 'Havenly', 'Marlow & Co', 'Ridgeline'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const wordVariants = {
  hidden: { y: 40, opacity: 0, rotate: 2 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.08 },
  }),
};

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const glowX = useTransform(springMouseX, [0, 1], ['-20%', '120%']);
  const glowY = useTransform(springMouseY, [0, 1], ['-20%', '120%']);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  useEffect(() => {
    startTransition(() => setMounted(true));
  }, []);

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

  return (
    <section
      id="top"
      ref={rootRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-[#283845] px-6 pb-24 pt-40 md:pb-32 md:pt-48"
    >
      <motion.div
        className="pointer-events-none absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full bg-[#FFA649]/10 blur-[120px]"
        style={{ x: glowX, y: glowY }}
      />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#FFA649]/5 blur-[100px]" />

      <motion.div
        className="relative mx-auto max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={childVariants} className="mb-8 flex items-center justify-between font-[family-name:var(--font-mono)] text-xs text-[#8FA1AD]">
          <span>JAANI_REEL — 001</span>
          <span ref={timecodeRef} className="text-[#FFA649]">
            00:00:00:00
          </span>
        </motion.div>

        <motion.div variants={childVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FFA649]/25 bg-[#FFA649]/5 px-4 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wide text-[#FFA649]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFA649] opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FFA649]" />
            </span>
            Say jaani — now booking Q3
          </span>
        </motion.div>

        <h1 className="font-[family-name:var(--font-display)] text-5xl leading-[0.95] tracking-tight text-[#F3ECE0] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="inline-block"
              custom={0}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
            >
              Websites and video
            </motion.span>
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
          className="mt-8 max-w-xl text-lg text-[#C9D3D9]"
        >
          Jaani Studio designs sites and cuts video for brands who&rsquo;d rather be remembered
          than ignored. One crew, one timeline, zero boring PDFs of &ldquo;brand guidelines.&rdquo;
        </motion.p>

        <motion.div variants={childVariants} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton href="#contact" variant="primary" arrow>
            Start your project
          </MagneticButton>
          <MagneticButton href="#work" variant="outline" arrow>
            See our work
          </MagneticButton>
        </motion.div>

        <div className="relative mt-20">
          <div className="relative h-px w-full bg-[#FFA649]/15">
            <motion.div
              className="absolute left-0 top-0 h-px bg-[#FFA649]"
              initial={{ width: '0%' }}
              animate={{ width: '38%' }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
            />
            <motion.div
              className="absolute -top-[7px] left-0 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[#FFA649] bg-[#283845]"
              initial={{ x: '0vw' }}
              animate={{ x: '38vw' }}
              transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
            />
          </div>
          <div className="mt-3 flex justify-between">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.span
                key={i}
                className={`w-px origin-bottom bg-[#FFA649]/25 ${i % 6 === 0 ? 'h-3' : 'h-1.5'}`}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.015, ease: 'easeOut' }}
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
              className="tl-tag rounded-full border border-[#8FA1AD]/20 px-4 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wide text-[#8FA1AD]"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={childVariants}
          className="mt-16 border-t border-[#FFA649]/10 pt-8"
        >
          <p className="mb-4 text-xs text-[#8FA1AD]">
            Trusted by teams who used to have fourteen unread Slack messages from their old agency
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {LOGOS.map((logo) => (
              <motion.span
                key={logo}
                className="tl-logo font-[family-name:var(--font-display)] text-sm font-semibold text-[#F3ECE0]/40 transition-colors duration-300 hover:text-[#F3ECE0]/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {logo}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

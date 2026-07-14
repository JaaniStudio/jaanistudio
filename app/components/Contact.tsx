'use client';

import { useState, type FormEvent, type MouseEvent as ReactMouseEvent, useRef } from 'react';
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import NetworkBackground from './NetworkBackground';

const PROJECT_TYPES = ['Website', 'Brand video', 'Motion graphics', 'Ongoing content', 'Not sure yet'];

const EASE = [0.22, 1, 0.36, 1] as const;

const fieldVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: EASE, delay: i * 0.07 },
  }),
};

const SPARKS = [
  { x: -40, y: -18, delay: 0.05 },
  { x: 38, y: -24, delay: 0.1 },
  { x: -30, y: 22, delay: 0.15 },
  { x: 42, y: 20, delay: 0.08 },
  { x: 0, y: -34, delay: 0.18 },
  { x: 0, y: 30, delay: 0.12 },
];

function UserIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Magnetic, spring-driven button — nudges toward the cursor and sweeps a light on hover. */
function SendButton({ custom }: { custom: number }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 200, damping: 14, mass: 0.4 });
  const springY = useSpring(mvY, { stiffness: 200, damping: 14, mass: 0.4 });

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(220px circle at ${x}% ${y}%, rgba(255,255,255,0.22), transparent 55%)`
  );

  function handleMove(e: ReactMouseEvent<HTMLButtonElement>) {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    mvX.set((relX - rect.width / 2) * 0.15);
    mvY.set((relY - rect.height / 2) * 0.35);
    glowX.set((relX / rect.width) * 100);
    glowY.set((relY / rect.height) * 100);
  }

  function handleLeave() {
    mvX.set(0);
    mvY.set(0);
  }

  return (
    <motion.button
      ref={btnRef}
      custom={custom}
      variants={fieldVariants}
      type="submit"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className="group relative w-full overflow-hidden rounded-lg bg-[#FFA649] py-3.5 text-sm font-semibold text-[#1B262E] shadow-[0_10px_30px_-12px_rgba(255,166,73,0.5)] transition-shadow duration-300 hover:shadow-[0_14px_36px_-10px_rgba(255,166,73,0.65)]"
      data-cursor
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{ background: glowBackground }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        Send brief
        <motion.span
          className="inline-block"
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ type: 'spring', stiffness: 320, damping: 18 }}
        >
          →
        </motion.span>
      </span>
    </motion.button>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: '-40px' });

  const cardRef = useRef<HTMLDivElement>(null);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const springGlowX = useSpring(glowX, { stiffness: 120, damping: 20 });
  const springGlowY = useSpring(glowY, { stiffness: 120, damping: 20 });
  const glowBackground = useTransform(
    [springGlowX, springGlowY],
    ([x, y]) => `radial-gradient(420px circle at ${x}% ${y}%, rgba(255,166,73,0.10), transparent 60%)`
  );

  function handleCardMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText('hello@jaanistudio.co');
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — fail silently
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#080808] px-6 py-24 md:py-32"
      ref={sectionRef}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(255,166,73,0.45) 0%, transparent 70%)',
            filter: 'blur(35px)',
          }}
          animate={{ scale: [1, 1.14, 1], opacity: [0.5, 0.65, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-32 -bottom-32 h-80 w-80 rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(143,161,173,0.35) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
          animate={{ scale: [1, 1.16, 1], opacity: [0.4, 0.55, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        />
      </div>
      
      {/* animated particle network — premium ambient background */}
      <NetworkBackground className="z-1" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-14 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[#FFA649]"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span>00:04</span>
          <motion.span
            className="h-px flex-1 origin-left bg-[#FFA649]/20"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          />
          <span className="text-[#8FA1AD]">Start a project</span>
        </motion.div>

        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr]">
          <div>
            <motion.h2
              className="h-font text-3xl leading-tight text-[#F3ECE0] sm:text-3xl md:text-4xl"
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            >
              Tell us the brief. We&rsquo;ll tell you the timeline.
            </motion.h2>
            <motion.p
              className="mt-6 max-w-md text-[#C9D3D9]"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            >
              Send a few lines about what you need. We reply within one business day with next
              steps, or a straight &ldquo;not a fit&rdquo; if that&rsquo;s the truth — no
              three-week &ldquo;we&rsquo;ll circle back.&rdquo;
            </motion.p>

            <motion.div
              className="mt-10 space-y-4 font-mono text-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
            >
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group relative inline-flex items-center gap-3 text-[#8FA1AD] transition-all duration-300 hover:text-[#FFA649]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFA649] transition-transform duration-300 group-hover:scale-125" />
                <span className="text-[#F3ECE0] transition-colors duration-300 group-hover:text-[#FFA649]">
                  hello@jaanistudio.co
                </span>
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 4, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.9 }}
                      transition={{ duration: 0.2, ease: EASE }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#FFA649] px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#1B262E]"
                    >
                      Copied
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <div className="group flex items-center gap-3 text-[#8FA1AD] transition-all duration-300 hover:text-[#FFA649]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFA649] opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FFA649]" />
                </span>
                <span>Currently booking for Q3 2026</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            ref={formRef}
            initial={{ x: 30, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              className="relative overflow-hidden rounded-2xl border border-[#FFA649]/10 bg-[#080808] p-6 transition-colors duration-500 hover:border-[#FFA649]/25 sm:p-8"
            >
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: glowBackground }}
              />
              <div className="relative">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="relative flex h-full min-h-80 flex-col items-center justify-center text-center"
                    >
                      <div className="relative flex h-14 w-14 items-center justify-center">
                        {SPARKS.map((s, i) => (
                          <motion.span
                            key={i}
                            className="absolute h-1.5 w-1.5 rounded-full bg-[#FFA649]"
                            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                            animate={{ x: s.x, y: s.y, opacity: [0, 1, 0], scale: [0, 1, 0.6] }}
                            transition={{ duration: 0.7, ease: EASE, delay: s.delay }}
                          />
                        ))}
                        <motion.div
                          className="flex h-14 w-14 items-center justify-center rounded-full border border-[#FFA649]/40 bg-[#FFA649]/10"
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.05 }}
                        >
                          <motion.svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#FFA649"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <motion.path
                              d="M4 12.5l5 5.5L20 6"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
                            />
                          </motion.svg>
                        </motion.div>
                      </div>
                      <motion.h3
                        className="mt-5 h-font text-2xl text-[#F3ECE0]"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, ease: EASE, delay: 0.3 }}
                      >
                        Say less, jaani.
                      </motion.h3>
                      <motion.p
                        className="mt-2 max-w-xs text-sm text-[#C9D3D9]"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, ease: EASE, delay: 0.4 }}
                      >
                        Brief received — we&rsquo;ll reply within one business day, coffee in hand.
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial="hidden"
                      animate={formInView ? 'visible' : 'hidden'}
                    >
                      <motion.div custom={0} variants={fieldVariants} className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-widest text-[#8FA1AD]">
                            Name
                          </label>
                          <div className="relative">
                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8FA1AD]/60 transition-colors duration-300 peer-focus:text-[#FFA649]">
                              <UserIcon />
                            </span>
                            <input
                              id="name"
                              name="name"
                              type="text"
                              required
                              className="peer w-full rounded-lg border border-[#8FA1AD]/20 bg-[#080808] py-3 pl-11 pr-4 text-[#F3ECE0] outline-none transition-all duration-300 focus:border-[#FFA649] focus:shadow-[0_0_0_4px_rgba(255,166,73,0.12)]"
                              placeholder="Jordan Kane"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-widest text-[#8FA1AD]">
                            Email
                          </label>
                          <div className="relative">
                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8FA1AD]/60 transition-colors duration-300 peer-focus:text-[#FFA649]">
                              <MailIcon />
                            </span>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              className="peer w-full rounded-lg border border-[#8FA1AD]/20 bg-[#080808] py-3 pl-11 pr-4 text-[#F3ECE0] outline-none transition-all duration-300 focus:border-[#FFA649] focus:shadow-[0_0_0_4px_rgba(255,166,73,0.12)]"
                              placeholder="jordan@brand.com"
                            />
                          </div>
                        </div>
                      </motion.div>

                      <motion.div custom={1} variants={fieldVariants}>
                        <label htmlFor="type" className="mb-2 block text-xs uppercase tracking-widest text-[#8FA1AD]">
                          Project type
                        </label>
                        <div className="relative">
                          <select
                            id="type"
                            name="type"
                            defaultValue={PROJECT_TYPES[0]}
                            className="w-full appearance-none rounded-lg border border-[#8FA1AD]/20 bg-[#080808] px-4 py-3 pr-10 text-[#F3ECE0] outline-none transition-all duration-300 focus:border-[#FFA649] focus:shadow-[0_0_0_4px_rgba(255,166,73,0.12)]"
                          >
                            {PROJECT_TYPES.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8FA1AD]/60">
                            <ChevronIcon />
                          </span>
                        </div>
                      </motion.div>

                      <motion.div custom={2} variants={fieldVariants}>
                        <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-widest text-[#8FA1AD]">
                          Brief
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          required
                          className="w-full resize-none rounded-lg border border-[#8FA1AD]/20 bg-[#080808] px-4 py-3 text-[#F3ECE0] outline-none transition-all duration-300 focus:border-[#FFA649] focus:shadow-[0_0_0_4px_rgba(255,166,73,0.12)]"
                          placeholder="What are you building, and by when?"
                        />
                      </motion.div>

                      <SendButton custom={3} />
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
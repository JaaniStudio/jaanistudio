'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

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

const TEAM = [
  {
    code: '01',
    name: 'Hussain',
    role: 'Editor & Designer',
    tag: 'Design / Edit',
    image: '/designer.png',
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
  },
  {
    code: '02',
    name: 'Huzaifa',
    role: 'Developer',
    tag: 'Engineering',
    image: '/dev.png',
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
  },
  {
    code: '03',
    name: 'Muneeb',
    role: 'Marketer',
    tag: 'Growth',
    image: '/coo.png',
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const staggerItem = {
  hidden: { y: 30, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.1 },
  }),
};

const teamCard = {
  hidden: { y: 50, opacity: 0, scale: 0.94 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.14 },
  }),
};

function TeamCard({ member, index }: { member: (typeof TEAM)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(springY, [0, 1], [8, -8]);
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);
  const glowX = useTransform(springX, [0, 1], ['10%', '90%']);
  const glowY = useTransform(springY, [0, 1], ['10%', '90%']);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div custom={index} variants={teamCard} style={{ perspective: 1000 }} className="relative">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative overflow-hidden rounded-3xl border border-[#FFA649]/12 bg-[#1a1a1a] px-7 pb-7 pt-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:border-[#FFA649]/35"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(255,166,73,0.16) 0%, transparent 60%)`,
          }}
        />

        <div
          className="pointer-events-none absolute left-6 top-6 font-mono text-[11px] uppercase tracking-widest text-[#8FA1AD]/50"
          style={{ transform: 'translateZ(30px)' }}
        >
          {member.code}
        </div>

        <div
          className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] uppercase tracking-widest text-[#FFA649]/70"
          style={{ transform: 'translateZ(30px)' }}
        >
          {member.tag}
        </div>

        <motion.div
          className="relative mx-auto flex h-44 w-44 items-center justify-center"
          style={{ transform: 'translateZ(50px)' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
        >
          <div
            className="absolute inset-0 rounded-full opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: 'radial-gradient(circle, rgba(255,166,73,0.28) 0%, transparent 70%)' }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={member.image}
            alt={`${member.name} — ${member.role}`}
            className="relative h-44 w-44 object-cover drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-105"
            draggable={false}
          />
        </motion.div>

        <div className="relative mt-6 text-center" style={{ transform: 'translateZ(40px)' }}>
          <h3 className="h-font text-2xl text-[#F3ECE0]">{member.name}</h3>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[#8FA1AD]">
            {member.role}
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on Instagram`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFA649]/15 text-[#8FA1AD] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFA649]/50 hover:text-[#FFA649]"
            >
              <InstagramIcon size={15} />
            </a>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFA649]/15 text-[#8FA1AD] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFA649]/50 hover:text-[#FFA649]"
            >
              <LinkedinIcon size={15} />
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-7 bottom-5 h-px scale-x-0 bg-linear-to-r from-transparent via-[#FFA649]/60 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const metaRef = useRef<HTMLDListElement>(null);
  const metaInView = useInView(metaRef, { once: true, margin: '-60px' });

  const teamRef = useRef<HTMLElement>(null);
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });

  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [marqueeHover, setMarqueeHover] = useState(false);
  const marqueeHoverRef = useRef(false);

  useEffect(() => {
    marqueeHoverRef.current = marqueeHover;
  }, [marqueeHover]);

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
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let rafId: number;
    let start: number | null = null;
    let pausedAt = 0;
    const duration = 28000;

    const tick = (ts: number) => {
      if (!start) start = ts;
      if (marqueeHoverRef.current) {
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
    <>
      <section
        id="about"
        className="relative overflow-hidden bg-[#080808] px-6 py-24 md:py-32"
        ref={sectionRef}
      >
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-60"
            style={{
              background: 'radial-gradient(circle, rgba(255,166,73,0.45) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.65, 0.5] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full opacity-50"
            style={{
              background: 'radial-gradient(circle, rgba(143,161,173,0.35) 0%, transparent 70%)',
              filter: 'blur(35px)',
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.55, 0.4] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-14 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[#FFA649]"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span>00:01</span>
            <motion.span
              className="h-px flex-1 bg-[#FFA649]/20 origin-left"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            />
            <span className="text-[#8FA1AD]">About</span>
          </motion.div>

          <div className="grid gap-16 md:grid-cols-[1.3fr_1fr]">
            <div>
              <motion.h2
                className="h-font text-2xl leading-tight text-[#F3ECE0] sm:text-2xl md:text-4xl"
                initial={{ y: 40, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              >
                Started with an export settings argument. Powered by energy drinks.
              </motion.h2>
              <motion.p
                className="mt-6 max-w-lg text-[#C9D3D9]"
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              >
                Now Jaani Studio builds the site and cuts the footage for the same brands, on the
                same timeline. No handoff between &ldquo;the web team&rdquo; and &ldquo;the video
                team&rdquo; — one crew, one brief, one deadline. That&rsquo;s the whole pitch.
              </motion.p>
              <motion.p
                className="mt-4 max-w-lg text-[#C9D3D9]"
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              >
                We keep the client roster small on purpose. Fewer projects, more frames reviewed,
                fewer things that ship half-finished — and yes, we will tell you if your idea
                needs work before your competitors do.
              </motion.p>
            </div>

            <motion.dl
              ref={metaRef}
              className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#FFA649]/10 bg-[#FFA649]/5 sm:grid-cols-1"
              initial="hidden"
              animate={metaInView ? 'visible' : 'hidden'}
            >
              {META.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  variants={staggerItem}
                  whileHover={{ x: 4 }}
                  className="group bg-[#080808] px-6 py-5 transition-colors duration-300 hover:bg-[#1a1a1a] hover:shadow-[inset_0_0_20px_rgba(255,166,73,0.06)]"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-[#8FA1AD]">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-[#F3ECE0] transition-colors duration-300 group-hover:text-[#FFA649]">
                    {item.value}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </div>

        <div
          ref={marqueeRef}
          onMouseEnter={() => setMarqueeHover(true)}
          onMouseLeave={() => setMarqueeHover(false)}
          className="relative mt-20 overflow-hidden border-y border-[#FFA649]/10 py-5"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-[#080808] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-[#080808] to-transparent" />
          <div ref={trackRef} className="flex w-max gap-12">
            {[...TOOLS, ...TOOLS].map((tool, i) => (
              <span
                key={i}
                className="marquee-item font-mono text-sm uppercase tracking-wide text-[#8FA1AD]/70 transition-all duration-300 hover:text-[#FFA649] hover:scale-110"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        id="team"
        className="relative overflow-hidden bg-[#1a1a1a] px-6 py-24 md:py-32"
        ref={teamRef}
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-24 top-1/3 h-72 w-72 rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(255,166,73,0.3) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            className="mb-14 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[#FFA649]"
            initial={{ y: 20, opacity: 0 }}
            animate={teamInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span>00:02</span>
            <motion.span
              className="h-px flex-1 bg-[#FFA649]/20 origin-left"
              initial={{ scaleX: 0 }}
              animate={teamInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            />
            <span className="text-[#8FA1AD]">Crew</span>
          </motion.div>

          <div className="max-w-2xl">
            <motion.h2
              className="h-font text-3xl leading-tight text-[#F3ECE0] sm:text-3xl md:text-4xl"
              initial={{ y: 40, opacity: 0 }}
              animate={teamInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              No headshots. Just the crew that ships it.
            </motion.h2>
            <motion.p
              className="mt-6 max-w-lg text-[#C9D3D9]"
              initial={{ y: 30, opacity: 0 }}
              animate={teamInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            >
              Three people, three lanes, one deadline. We&rsquo;d rather you remember the work
              than a LinkedIn photo.
            </motion.p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
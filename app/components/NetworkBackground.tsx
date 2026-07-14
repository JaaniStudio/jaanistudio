'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

type NetworkBackgroundProps = {
  /** Dot + line color as an "r,g,b" string. Defaults to the site's accent orange. */
  color?: string;
  /** Roughly how many px² of screen area per particle. Lower = denser. */
  density?: number;
  /** Max distance (px) at which two particles are linked by a line. */
  linkDistance?: number;
  /** Overall opacity of the whole effect (0–1). Turn this down for an even more subtle look. */
  opacity?: number;
  /** Extra className passed to the wrapping div. */
  className?: string;
};

export default function NetworkBackground({
  color = '255,166,73', // #FFA649
  density = 16000,
  linkDistance = 130,
  opacity = 0.85,
  className = '',
}: NetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let rafId = 0;
    let running = true;

    const mouse = { x: -9999, y: -9999, active: false };

    function makeParticles() {
      const area = width * height;
      const count = Math.max(18, Math.min(55, Math.round(area / density)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
      }));
    }

    function resize() {
      const parent = canvas!.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeParticles();
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }

    function onPointerLeave() {
      mouse.active = false;
    }

    function step() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);

      // move + draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        // gentle drift away from the cursor
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist2 = dx * dx + dy * dy;
          const influence = 130 * 130;
          if (dist2 < influence && dist2 > 0.01) {
            const dist = Math.sqrt(dist2);
            const force = (1 - dist / 130) * 0.6;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${color}, 0.28)`;
        ctx!.fill();
      }

      // links between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance) {
            const opacity = (1 - dist / linkDistance) * 0.16;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${color}, ${opacity})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      // links from particles to the cursor itself, for a "reaching toward you" feel
      if (mouse.active) {
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance * 1.1) {
            const opacity = (1 - dist / (linkDistance * 1.1)) * 0.22;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(mouse.x, mouse.y);
            ctx!.strokeStyle = `rgba(${color}, ${opacity})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(step);
    }

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);

    if (prefersReducedMotion) {
      // draw a single static frame instead of animating
      step();
      running = false;
    } else {
      step();
    }

    const onVisibility = () => {
      running = document.visibilityState === 'visible' && !prefersReducedMotion;
      if (running) step();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [color, density, linkDistance]);

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} style={{ opacity }}>
      <canvas ref={canvasRef} className="pointer-events-auto h-full w-full" />
    </div>
  );
}
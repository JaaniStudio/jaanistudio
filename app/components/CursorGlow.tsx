'use client';

import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    let frameId: number;
    let mouseX = -200;
    let mouseY = -200;
    let currentX = -200;
    let currentY = -200;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      setPos({ x: currentX, y: currentY });
      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{
        background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(255,166,73,0.035), transparent 60%)`,
      }}
    />
  );
}

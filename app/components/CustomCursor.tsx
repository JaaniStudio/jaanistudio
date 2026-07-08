'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 300, damping: 25 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 25 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onEnterInteractive = () => setIsHovering(true);
    const onLeaveInteractive = () => setIsHovering(false);

    window.addEventListener('mousemove', onMove, { passive: true });

    const interactives = document.querySelectorAll(
      'a, button, input, textarea, select, [data-cursor]'
    );
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-9999 hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-[#FFA649]"
          style={{
            width: isHovering ? 12 : 6,
            height: isHovering ? 12 : 6,
          }}
          animate={{
            scale: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-9998 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border border-[#FFA649]/40"
          animate={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            backgroundColor: isHovering ? 'rgba(255,166,73,0.06)' : 'transparent',
            scale: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
      </motion.div>
    </>
  );
}

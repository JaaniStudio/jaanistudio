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

  const trail1X = useSpring(cursorX, { stiffness: 180, damping: 18 });
  const trail1Y = useSpring(cursorY, { stiffness: 180, damping: 18 });
  const trail2X = useSpring(cursorX, { stiffness: 110, damping: 14 });
  const trail2Y = useSpring(cursorY, { stiffness: 110, damping: 14 });

  useEffect(() => {
    const HOVERABLE = 'a, button, input, textarea, select, [data-cursor]';
    let elements: Element[] = [];

    const onEnterInteractive = () => setIsHovering(true);
    const onLeaveInteractive = () => setIsHovering(false);

    function attach(el: Element) {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    }

    function detach(el: Element) {
      el.removeEventListener('mouseenter', onEnterInteractive);
      el.removeEventListener('mouseleave', onLeaveInteractive);
    }

    function attachAll() {
      detachAll();
      elements = Array.from(document.querySelectorAll(HOVERABLE));
      elements.forEach(attach);
    }

    function detachAll() {
      elements.forEach(detach);
      elements = [];
    }

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    attachAll();

    const observer = new MutationObserver(attachAll);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      detachAll();
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

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

      <motion.div
        className="pointer-events-none fixed z-9997 hidden md:block"
        style={{
          x: trail1X,
          y: trail1Y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-[#FFA649]"
          animate={{
            width: isHovering ? 6 : 3,
            height: isHovering ? 6 : 3,
            opacity: isVisible ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-9996 hidden md:block"
        style={{
          x: trail2X,
          y: trail2Y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-[#FFA649]"
          animate={{
            width: isHovering ? 4 : 2,
            height: isHovering ? 4 : 2,
            opacity: isVisible ? 0.15 : 0,
          }}
          transition={{ duration: 0.35 }}
        />
      </motion.div>
    </>
  );
}

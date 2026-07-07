'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  arrow?: boolean;
}

export default function MagneticButton({
  href,
  children,
  variant = 'primary',
  className = '',
  arrow = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    if (ref.current) {
      ref.current.style.transform = `translate(${deltaX * 4}px, ${deltaY * 4}px)`;
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (ref.current) {
      ref.current.style.transform = 'translate(0px, 0px)';
    }
  };

  const baseClasses = 'relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold transition-transform duration-200 ease-out active:scale-[0.97]';

  const variantClasses = {
    primary:
      'bg-[#FFA649] text-[#1B262E]',
    outline:
      'border border-[#FFA649]/30 text-[#F3ECE0] hover:border-[#FFA649]',
    ghost:
      'text-[#C9D3D9] hover:text-[#FFA649]',
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      data-cursor
    >
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            variant === 'primary'
              ? `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.2), transparent 50%)`
              : `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,166,73,0.12), transparent 50%)`,
          opacity: isHovered ? 1 : 0,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {arrow && (
          <motion.span
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            →
          </motion.span>
        )}
      </span>
    </Link>
  );
}

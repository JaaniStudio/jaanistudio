type SectionGlowProps = {
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
};

export default function SectionGlow({
  className = '',
  color = '255,166,73',
  size = 620,
  opacity = 0.12,
}: SectionGlowProps) {
  return (
    <div
      aria-hidden
      className={`aurora pointer-events-none absolute rounded-full blur-[130px] ${className}`}
      style={
        {
          width: size,
          height: size,
          background: `radial-gradient(circle, rgba(${color}, 1) 0%, rgba(${color}, 0.55) 40%, transparent 72%)`,
          opacity,
          '--glow-o': opacity,
        } as React.CSSProperties
      }
    />
  );
}

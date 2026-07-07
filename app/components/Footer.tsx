import Link from 'next/link';

const SITEMAP = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
  { label: 'Vimeo', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#283845] px-6 pb-8 pt-20 md:pt-28">
      {/* marquee CTA — big, playful, impossible to miss */}
      <div className="mb-16 overflow-hidden border-y border-[#FFA649]/10 py-4">
        <div className="flex w-max animate-[marquee_18s_linear_infinite] gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-8 font-[--font-display] text-2xl font-semibold text-[#F3ECE0]/30 sm:text-3xl"
            >
              Say jaani, let&rsquo;s make something
              <span className="text-[#FFA649]/50">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-10 border-b border-[#FFA649]/10 pb-16 md:flex-row md:items-end">
          <h2 className="max-w-xl font-[--font-display] text-4xl leading-[1.05] text-[#F3ECE0] sm:text-5xl md:text-6xl">
            Let&rsquo;s cut something <span className="text-[#FFA649]">worth watching.</span>
          </h2>
          <Link
            href="#contact"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#FFA649] px-7 py-3.5 text-sm font-semibold text-[#1B262E] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.05] hover:shadow-[0_10px_30px_-6px_rgba(255,166,73,0.65)] active:scale-[0.95]"
          >
            Start a project
            <span className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-3">
          <div>
            <span className="font-[--font-display] text-lg font-bold text-[#F3ECE0]">
              JAANI<span className="text-[#FFA649]">.studio</span>
            </span>
            <p className="mt-3 max-w-[24ch] text-sm text-[#8FA1AD]">
              Web design and video editing, cut on one timeline. Say jaani.
            </p>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-[#8FA1AD]">Sitemap</span>
            <ul className="mt-4 space-y-3">
              {SITEMAP.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#C9D3D9] transition-colors duration-300 hover:text-[#FFA649]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-[#8FA1AD]">Social</span>
            <ul className="mt-4 space-y-3">
              {SOCIALS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#C9D3D9] transition-colors duration-300 hover:text-[#FFA649]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 font-mono text-xs text-[#8FA1AD] sm:flex-row">
          <span>© {new Date().getFullYear()} Jaani Studio. All rights reserved.</span>
          <Link
            href="#top"
            className="group flex items-center gap-2 transition-colors duration-300 hover:text-[#FFA649]"
          >
            <span className="h-1.5 w-1.5 rounded-full border border-current transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1" />
            Jump to 00:00
          </Link>
        </div>
      </div>
    </footer>
  );
}
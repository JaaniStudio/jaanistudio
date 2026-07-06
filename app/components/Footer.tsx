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
    <footer className="relative bg-[#283845] px-6 pb-8 pt-20 md:pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-10 border-b border-[#FFA649]/10 pb-16 md:flex-row md:items-end">
          <h2 className="max-w-xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] text-[#F3ECE0] sm:text-5xl md:text-6xl">
            Let&rsquo;s cut something <span className="text-[#FFA649]">worth watching.</span>
          </h2>
          <Link
            href="#contact"
            className="w-fit shrink-0 rounded-full bg-[#FFA649] px-7 py-3.5 text-sm font-semibold text-[#1B262E] transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Start a project
          </Link>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-3">
          <div>
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#F3ECE0]">
              CUTLINE
            </span>
            <p className="mt-3 max-w-[22ch] text-sm text-[#8FA1AD]">
              Web design and video editing, cut on one timeline.
            </p>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-[#8FA1AD]">Sitemap</span>
            <ul className="mt-4 space-y-3">
              {SITEMAP.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#C9D3D9] transition-colors hover:text-[#FFA649]">
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
                  <Link href={item.href} className="text-sm text-[#C9D3D9] transition-colors hover:text-[#FFA649]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 font-[family-name:var(--font-mono)] text-xs text-[#8FA1AD] sm:flex-row">
          <span>© {new Date().getFullYear()} Cutline Studio. All rights reserved.</span>
          <Link href="#top" className="flex items-center gap-2 transition-colors hover:text-[#FFA649]">
            <span className="h-1.5 w-1.5 rounded-full border border-current" />
            Jump to 00:00
          </Link>
        </div>
      </div>
    </footer>
  );
}
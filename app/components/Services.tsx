const SERVICES = [
  {
    track: 'V1',
    title: 'Web design & development',
    description:
      'Fast, responsive sites built in Next.js — from landing pages to full product sites, wired for conversion from the first scroll.',
    items: ['UX & wireframes', 'Next.js build', 'CMS + analytics', 'Launch support'],
  },
  {
    track: 'V2',
    title: 'Brand & product video',
    description:
      'Founder stories, product demos, and launch films shot and cut to hold attention past the first three seconds.',
    items: ['Concept & script', 'Shoot direction', 'Colour grade', 'Sound design'],
  },
  {
    track: 'V3',
    title: 'Motion graphics & animation',
    description:
      'Logo stings, UI walkthroughs, and explainer animation that make a static brand feel alive on screen.',
    items: ['Style frames', '2D/3D animation', 'Micro-interactions', 'Export presets'],
  },
  {
    track: 'A1',
    title: 'Social & content editing',
    description:
      'Long-form content cut down into a week of scroll-stopping clips, captioned and formatted per platform.',
    items: ['Batch editing', 'Captions & subs', 'Platform sizing', 'Posting calendar'],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-[#1B262E] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex items-center gap-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[#FFA649]">
          <span>00:02</span>
          <span className="h-px flex-1 bg-[#FFA649]/20" />
          <span className="text-[#8FA1AD]">Services</span>
        </div>

        <h2 className="max-w-2xl font-[family-name:var(--font-display)] text-3xl leading-tight text-[#F3ECE0] sm:text-4xl md:text-5xl">
          Everything runs on one timeline.
        </h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#FFA649]/10 bg-[#FFA649]/5 md:grid-cols-2">
          {SERVICES.map((service) => (
            <div
              key={service.track}
              className="group relative bg-[#1B262E] p-8 transition-colors hover:bg-[#283845] md:p-10"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="rounded border border-[#FFA649]/30 px-2 py-1 font-[family-name:var(--font-mono)] text-[11px] text-[#FFA649]">
                  TRACK / {service.track}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#F3ECE0] sm:text-2xl">
                {service.title}
              </h3>
              <p className="mt-3 text-[#C9D3D9]">{service.description}</p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#8FA1AD]">
                    <span className="h-1 w-1 rounded-full bg-[#FFA649]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
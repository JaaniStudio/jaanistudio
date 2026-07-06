const PROJECTS = [
  {
    reel: 'REEL 01',
    name: 'Northbound Coffee',
    category: 'Brand site + launch film',
    gradient: 'from-[#FFA649]/30 via-[#283845] to-[#1B262E]',
  },
  {
    reel: 'REEL 02',
    name: 'Fielder Outdoor',
    category: 'E-commerce build',
    gradient: 'from-[#8FA1AD]/30 via-[#283845] to-[#1B262E]',
  },
  {
    reel: 'REEL 03',
    name: 'Havenly',
    category: 'Product demo series',
    gradient: 'from-[#FFA649]/20 via-[#1B262E] to-[#283845]',
  },
  {
    reel: 'REEL 04',
    name: 'Marlow & Co',
    category: 'Web app dashboard',
    gradient: 'from-[#8FA1AD]/20 via-[#1B262E] to-[#283845]',
  },
  {
    reel: 'REEL 05',
    name: 'Ridgeline Media',
    category: 'Social content, 40 clips',
    gradient: 'from-[#FFA649]/25 via-[#283845] to-[#1B262E]',
  },
];

export default function Portfolio() {
  return (
    <section id="work" className="relative bg-[#283845] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex items-center gap-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[#FFA649]">
          <span>00:03</span>
          <span className="h-px flex-1 bg-[#FFA649]/20" />
          <span className="text-[#8FA1AD]">Selected work</span>
        </div>

        <div className="flex items-end justify-between gap-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-[#F3ECE0] sm:text-4xl md:text-5xl">
            Five reels, five different problems.
          </h2>
          <p className="hidden max-w-xs text-sm text-[#8FA1AD] md:block">
            Scroll the strip. Every frame linked to the brief it was cut for.
          </p>
        </div>
      </div>

      {/* filmstrip */}
      <div className="relative mt-14">
        <div className="border-y border-[#FFA649]/15 bg-[#1B262E]/40 py-2">
          <div className="flex gap-1 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PROJECTS.map((project) => (
              <a
                key={project.reel}
                href="#contact"
                className="group relative aspect-[4/3] w-[78vw] shrink-0 overflow-hidden rounded-xl border border-[#FFA649]/10 sm:w-[42vw] md:w-[30vw] lg:w-[26vw]"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-500 group-hover:scale-105`}
                />
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <span className="w-fit rounded bg-[#1B262E]/70 px-2 py-1 font-[family-name:var(--font-mono)] text-[11px] text-[#FFA649] backdrop-blur">
                    {project.reel}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#F3ECE0]">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#C9D3D9]">{project.category}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
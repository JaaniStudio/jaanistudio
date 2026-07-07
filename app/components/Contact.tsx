'use client';

import { useState, type FormEvent } from 'react';

const PROJECT_TYPES = ['Website', 'Brand video', 'Motion graphics', 'Ongoing content', 'Not sure yet'];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this up to your form handler / email service of choice.
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative bg-[#1B262E] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex items-center gap-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[#FFA649]">
          <span>00:04</span>
          <span className="h-px flex-1 bg-[#FFA649]/20" />
          <span className="text-[#8FA1AD]">Start a project</span>
        </div>

        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-[#F3ECE0] sm:text-4xl md:text-5xl">
              Tell us the brief. We&rsquo;ll tell you the timeline.
            </h2>
            <p className="mt-6 max-w-md text-[#C9D3D9]">
              Send a few lines about what you need. We reply within one business day with next
              steps, or a straight &ldquo;not a fit&rdquo; if that&rsquo;s the truth — no
              three-week &ldquo;we&rsquo;ll circle back.&rdquo;
            </p>

            <div className="mt-10 space-y-4 font-[family-name:var(--font-mono)] text-sm">
              <div className="flex items-center gap-3 text-[#8FA1AD]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFA649]" />
                <span className="text-[#F3ECE0]">hello@jaanistudio.co</span>
              </div>
              <div className="flex items-center gap-3 text-[#8FA1AD]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFA649] opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FFA649]" />
                </span>
                <span>Currently booking for Q3 2026</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#FFA649]/10 bg-[#283845] p-6 transition-all duration-500 sm:p-8">
            {submitted ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                <span className="animate-[pop_0.5s_cubic-bezier(0.34,1.56,0.64,1)] font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[#FFA649]">
                  Sent ✓
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-[#F3ECE0]">
                  Say less, jaani.
                </h3>
                <p className="mt-2 max-w-xs text-sm text-[#C9D3D9]">
                  Brief received — we&rsquo;ll reply within one business day, coffee in hand.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-widest text-[#8FA1AD]">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-lg border border-[#8FA1AD]/20 bg-[#1B262E] px-4 py-3 text-[#F3ECE0] outline-none transition-all duration-300 focus:scale-[1.01] focus:border-[#FFA649] focus:shadow-[0_0_0_4px_rgba(255,166,73,0.12)]"
                      placeholder="Jordan Kane"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-widest text-[#8FA1AD]">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-[#8FA1AD]/20 bg-[#1B262E] px-4 py-3 text-[#F3ECE0] outline-none transition-all duration-300 focus:scale-[1.01] focus:border-[#FFA649] focus:shadow-[0_0_0_4px_rgba(255,166,73,0.12)]"
                      placeholder="jordan@brand.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="type" className="mb-2 block text-xs uppercase tracking-widest text-[#8FA1AD]">
                    Project type
                  </label>
                  <select
                    id="type"
                    name="type"
                    defaultValue={PROJECT_TYPES[0]}
                    className="w-full rounded-lg border border-[#8FA1AD]/20 bg-[#1B262E] px-4 py-3 text-[#F3ECE0] outline-none transition-all duration-300 focus:scale-[1.01] focus:border-[#FFA649] focus:shadow-[0_0_0_4px_rgba(255,166,73,0.12)]"
                  >
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-widest text-[#8FA1AD]">
                    Brief
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full resize-none rounded-lg border border-[#8FA1AD]/20 bg-[#1B262E] px-4 py-3 text-[#F3ECE0] outline-none transition-all duration-300 focus:scale-[1.01] focus:border-[#FFA649] focus:shadow-[0_0_0_4px_rgba(255,166,73,0.12)]"
                    placeholder="What are you building, and by when?"
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-lg bg-[#FFA649] py-3.5 text-sm font-semibold text-[#1B262E] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] hover:shadow-[0_10px_30px_-8px_rgba(255,166,73,0.6)] active:scale-[0.97]"
                >
                  Send brief
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
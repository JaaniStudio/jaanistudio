"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, stagger } from "animejs";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        animate(navRef.current, {
            translateY: [-40, 0],
            opacity: [0, 1],
            duration: 900,
            ease: "outExpo",
        });

        animate(
            [
                logoRef.current,
                ...linksRef.current,
                buttonRef.current,
            ],
            {
                opacity: [0, 1],
                translateY: [-20, 0],
                delay: stagger(80),
                duration: 900,
                ease: "outExpo",
            }
        );
    }, []);

    return (
        <>
            <header
                ref={navRef}
                className="fixed top-0 left-0 z-50 w-full px-5 pt-5"
            >
                <nav
                    className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          rounded-2xl
          border
          border-[#FFA649]/20
          bg-[#283845]/70
          px-6
          py-4
          backdrop-blur-xl
          shadow-[0_0_50px_rgba(255,166,73,0.06)]
        "
                >
                    {/* Logo */}

                    <Link
                        href="/"
                        ref={logoRef}
                        className="group flex items-center gap-2"
                    >
                        <div
                            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-[#FFA649]/30
              bg-[#FFA649]/10
              text-lg
              font-bold
              text-[#FFA649]
              transition
              duration-300
              group-hover:rotate-6
              group-hover:scale-105
            "
                        >
                            A
                        </div>

                        <div>
                            <p className="text-lg font-bold text-[#FFA649] tracking-wide">
                                Agency
                            </p>

                            <p className="text-xs text-white/50">
                                Web & Video Studio
                            </p>
                        </div>
                    </Link>

                    {/* Desktop */}

                    <div className="hidden items-center gap-10 md:flex">
                        {links.map((link, i) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                ref={(el) => {
                                    linksRef.current[i] = el;
                                }}
                                className="
                group
                relative
                text-sm
                uppercase
                tracking-[0.25em]
                text-white/70
                transition
                duration-300
                hover:text-[#FFA649]
              "
                            >
                                {link.name}

                                <span
                                    className="
                  absolute
                  -bottom-2
                  left-0
                  h-[2px]
                  w-0
                  bg-[#FFA649]
                  transition-all
                  duration-300
                  group-hover:w-full
                "
                                />
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}

                    <div className="hidden md:block">
                        <Link
                            ref={buttonRef}
                            href="#contact"
                            className="
              group
              flex
              items-center
              gap-2
              rounded-full
              border
              border-[#FFA649]
              bg-[#FFA649]
              px-5
              py-3
              text-sm
              font-semibold
              text-[#283845]
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-[0_0_30px_rgba(255,166,73,.35)]
            "
                        >
                            Start Project

                            <ArrowUpRight
                                className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:-translate-y-1
                group-hover:translate-x-1
              "
                            />
                        </Link>
                    </div>

                    {/* Mobile */}

                    <button
                        onClick={() => setOpen(!open)}
                        className="text-[#FFA649] md:hidden"
                    >
                        {open ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </nav>

                {/* Mobile Menu */}

                <div
                    className={`
          overflow-hidden
          transition-all
          duration-500
          md:hidden
          ${open
                            ? "mt-3 max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                        }
        `}
                >
                    <div
                        className="
            rounded-2xl
            border
            border-[#FFA649]/20
            bg-[#283845]/90
            p-6
            backdrop-blur-xl
          "
                    >
                        <div className="flex flex-col gap-6">
                            {links.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="
                  text-lg
                  text-white/80
                  transition
                  hover:text-[#FFA649]
                "
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <Link
                                href="#contact"
                                onClick={() => setOpen(false)}
                                className="
                mt-3
                rounded-xl
                bg-[#FFA649]
                px-5
                py-3
                text-center
                font-semibold
                text-[#283845]
              "
                            >
                                Start Project
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Background Glow */}

            <div
                className="
        pointer-events-none
        fixed
        left-1/2
        top-0
        -z-10
        h-72
        w-[700px]
        -translate-x-1/2
        rounded-full
        bg-[#FFA649]
        opacity-[0.08]
        blur-[140px]
      "
            />
        </>
    );
}
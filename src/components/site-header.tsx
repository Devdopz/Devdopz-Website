"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DevdopzLogo } from "@/components/devdopz-logo";

const TOP_OFFSET = 24;
const SCROLL_THRESHOLD = 6;

export function SiteHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollRef = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;

    const updateHeader = () => {
      const currentScroll = Math.max(window.scrollY, 0);
      const previousScroll = lastScrollRef.current;
      const delta = currentScroll - previousScroll;

      if (currentScroll <= TOP_OFFSET) {
        setIsVisible(true);
        lastScrollRef.current = currentScroll;
        return;
      }

      if (Math.abs(delta) < SCROLL_THRESHOLD) {
        lastScrollRef.current = currentScroll;
        return;
      }

      if (currentScroll > previousScroll) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollRef.current = currentScroll;
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateHeader);
    };

    lastScrollRef.current = window.scrollY;
    updateHeader();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 border-b border-accent/10 bg-white/96 backdrop-blur-xl transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 font-medium tracking-[-0.02em] text-foreground"
        >
          <span className="overflow-hidden rounded-[1rem] border border-accent/10 bg-white shadow-[var(--card-shadow)]">
            <DevdopzLogo size={36} />
          </span>
          <span className="truncate text-[0.95rem]">Devdopz</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/#journey"
            className="text-sm font-medium text-foreground/68 transition-opacity duration-200 hover:opacity-100"
          >
            Journey
          </Link>
          <Link
            href="/#programs"
            className="text-sm font-medium text-foreground/68 transition-opacity duration-200 hover:opacity-100"
          >
            Programs
          </Link>
          <Link
            href="/people"
            className={`text-sm font-medium transition-opacity duration-200 hover:opacity-100 ${
              pathname === "/people" ? "text-accent" : "text-foreground/68"
            }`}
          >
            Peoples
          </Link>
          <Link
            href="/#values"
            className="text-sm font-medium text-foreground/68 transition-opacity duration-200 hover:opacity-100"
          >
            Values
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/projects"
            className={`hidden rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 sm:inline-flex ${
              pathname === "/projects"
                ? "border-accent/18 bg-accent/[0.06] text-accent"
                : "border-accent/12 bg-white text-foreground/72 hover:bg-accent/5"
            }`}
          >
            Explore Projects
          </Link>
          <Link
            href="/#journey"
            className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-medium !text-white shadow-[0_14px_30px_rgba(47,102,255,0.18)] transition-all duration-200 hover:opacity-90"
          >
            Join
          </Link>
        </div>
      </div>
    </header>
  );
}

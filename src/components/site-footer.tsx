import Link from "next/link";
import { DevdopzLogo } from "@/components/devdopz-logo";
import { GitHubIcon } from "@/components/github-icon";

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-accent/10 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-3 font-medium tracking-[-0.02em] text-foreground"
            >
              <span className="overflow-hidden rounded-[0.95rem] border border-accent/10 bg-white shadow-[var(--card-shadow)]">
                <DevdopzLogo size={34} />
              </span>
              <span className="text-[0.95rem]">Devdopz</span>
            </Link>

            <p className="mt-2 text-sm leading-6 text-foreground/58">
              Built for better collaboration and real progress.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:justify-center">
            <Link
              href="/journey"
              className="text-sm font-medium text-foreground/64 transition-opacity duration-200 hover:opacity-100"
            >
              Journey
            </Link>
            <Link
              href="/#programs"
              className="text-sm font-medium text-foreground/64 transition-opacity duration-200 hover:opacity-100"
            >
              Programs
            </Link>
            <Link
              href="/people"
              className="text-sm font-medium text-foreground/64 transition-opacity duration-200 hover:opacity-100"
            >
              People
            </Link>
            <Link
              href="/projects"
              className="text-sm font-medium text-foreground/64 transition-opacity duration-200 hover:opacity-100"
            >
              Projects
            </Link>
          </nav>

          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <Link
              href="/hire"
              className="inline-flex items-center justify-center rounded-full border border-accent/15 bg-white px-4 py-2 text-sm font-medium text-foreground/74 transition-colors duration-200 hover:bg-accent/5"
            >
              Hire
            </Link>
            <a
              href="https://github.com/Devdopz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium !text-white shadow-[0_14px_30px_rgba(47,102,255,0.18)] transition-all duration-200 hover:opacity-90"
            >
              <GitHubIcon className="shrink-0 text-white" />
              <span>Join</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

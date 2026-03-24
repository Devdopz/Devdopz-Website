import type { ReactNode } from "react";
import Link from "next/link";
import { DevdopzLogo } from "@/components/devdopz-logo";

type AuthShellProps = {
  children: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
};

export function AuthShell({
  children,
  description,
  eyebrow,
  title,
}: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(47,102,255,0.08),_transparent_36%),linear-gradient(180deg,_#ffffff_0%,_#f8fbff_100%)] px-5 py-6 sm:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col">
        <Link
          href="/"
          className="inline-flex items-center gap-3 self-start font-medium tracking-[-0.02em] text-foreground"
        >
          <span className="overflow-hidden rounded-[1rem] border border-accent/10 bg-white shadow-[var(--card-shadow)]">
            <DevdopzLogo size={36} />
          </span>
          <span className="text-[0.95rem]">Devdopz</span>
        </Link>

        <div className="flex flex-1 items-center justify-center py-10 sm:py-12">
          <div className="grid w-full gap-6 lg:grid-cols-[0.94fr_1.06fr]">
            <section className="relative overflow-hidden rounded-[2.4rem] border border-accent/10 bg-white px-6 py-8 shadow-[var(--hero-shadow)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

              <div className="relative">
                <div className="eyebrow-chip inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
                  {eyebrow}
                </div>
                <h1 className="mt-6 max-w-[12ch] text-4xl font-medium leading-[1.02] tracking-[-0.05em] text-foreground sm:text-5xl lg:text-[3.6rem]">
                  {title}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-8 text-foreground/68 sm:text-lg">
                  {description}
                </p>
              </div>
            </section>

            <div className="flex items-stretch">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

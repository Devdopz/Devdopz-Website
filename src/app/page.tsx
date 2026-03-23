import Link from "next/link";
import { ContributorAvatar } from "@/components/contributor-avatar";
import { HeroParticleBackground } from "@/components/hero-particle-background";
import { HeroPhraseCycle } from "@/components/hero-phrase-cycle";
import { ProgramsSection } from "@/components/programs-section";
import { SiteHeader } from "@/components/site-header";
import { TelegramIcon } from "@/components/telegram-icon";
import { heroContributors } from "@/data/github-contributors";

type ValueCard = {
  heading: string;
  copy: string;
};

const values: ValueCard[] = [
  {
    heading: "Build in public",
    copy:
      "Ideas get sharper when they are shared early, reviewed often, and shaped by other builders.",
  },
  {
    heading: "Learn by shipping",
    copy:
      "Devdopz is designed around practical progress, not passive inspiration or endless planning.",
  },
  {
    heading: "Grow together",
    copy:
      "The community works best when experienced developers and rising talent push each other forward.",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36">
        <div
          id="top"
          className="relative z-10 flex min-h-[calc(100svh-8rem)] items-center justify-center pb-10 pt-4 lg:pb-14 lg:pt-8"
        >
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[calc(100%+8rem)] w-screen -translate-x-1/2 -translate-y-1/2">
              <HeroParticleBackground />
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <div className="absolute left-1/2 top-1/2 -z-10 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-3xl sm:h-[28rem] sm:w-[28rem]" />

            <h1 className="text-5xl font-medium leading-[0.9] tracking-[-0.075em] text-foreground sm:text-6xl lg:text-[7rem]">
              <span className="block">
                <span className="text-accent">Devdopz</span>{" "}
                <span className="text-foreground">for</span>
              </span>
              <HeroPhraseCycle />
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-foreground/68 sm:text-lg">
              Started in 2024 and shaped into an organization in 2026, Devdopz
              is a focused space for developers who want stronger collaboration
              and real progress.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://t.me/devdopz"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-3 text-sm font-medium !text-white shadow-[0_18px_40px_rgba(47,102,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                <TelegramIcon className="shrink-0" />
                <span>Join Telegram</span>
              </a>
              <Link
                href="/journey"
                className="inline-flex items-center justify-center rounded-full border border-accent/15 bg-white px-6 py-3 text-sm font-medium text-foreground/76 transition-colors duration-300 hover:bg-accent/5"
              >
                Our journey
              </Link>
            </div>

            <div className="mx-auto mt-12 max-w-4xl">
              <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
                <p className="code-pill text-xs uppercase tracking-[0.24em] text-foreground/44">
                  Top contributors
                </p>
                <Link
                  href="/people"
                  className="text-sm font-medium text-foreground/58 transition-colors duration-300 hover:text-accent"
                >
                  View all people
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {heroContributors.map((person) => (
                  <Link
                    key={person.username}
                    href="/people"
                    className="soft-panel flex w-full max-w-[18rem] items-center gap-3 rounded-[1.4rem] px-4 py-3 text-left transition-transform duration-300 hover:-translate-y-0.5 sm:w-[17rem]"
                  >
                    <ContributorAvatar
                      name={person.displayName}
                      photo={person.avatarUrl}
                      size={48}
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium tracking-[-0.03em] text-foreground">
                        {person.displayName}
                      </p>
                      <p className="mt-1 truncate text-xs uppercase tracking-[0.16em] text-foreground/42">
                        {person.orgRole}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <ProgramsSection />

      <section
        id="values"
        className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10"
      >
        <div className="rounded-[2.5rem] border border-accent/10 bg-white px-6 py-8 shadow-[var(--card-shadow)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
            <div className="lg:pr-6">
              <div className="eyebrow-chip inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
                Core values
              </div>
              <h2 className="mt-6 text-3xl font-medium leading-[1.04] tracking-[-0.05em] sm:text-4xl lg:text-[2.8rem]">
                A clear culture for developers who want to keep moving.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-foreground/68 sm:text-lg">
                Devdopz is built to feel practical, ambitious, and welcoming at
                the same time. The values below shape how people collaborate,
                learn, and ship inside the community.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-[1.3rem] border border-accent/10 px-4 py-4">
                  <p className="code-pill text-[0.68rem] uppercase tracking-[0.18em] text-foreground/40">
                    Public
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground/62">
                    Share early, improve faster.
                  </p>
                </div>
                <div className="rounded-[1.3rem] border border-accent/10 px-4 py-4">
                  <p className="code-pill text-[0.68rem] uppercase tracking-[0.18em] text-foreground/40">
                    Practical
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground/62">
                    Progress matters more than noise.
                  </p>
                </div>
                <div className="rounded-[1.3rem] border border-accent/10 px-4 py-4">
                  <p className="code-pill text-[0.68rem] uppercase tracking-[0.18em] text-foreground/40">
                    Shared
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground/62">
                    Growth happens better together.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {values.map((value, index) => (
                <article
                  key={value.heading}
                  className="rounded-[1.75rem] border border-accent/10 px-5 py-5 sm:px-6 sm:py-6"
                >
                  <div className="flex gap-4 sm:gap-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/6 ring-1 ring-accent/10">
                      <span className="code-pill text-xs uppercase tracking-[0.18em] text-accent/70">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-2xl font-medium tracking-[-0.04em] text-foreground">
                        {value.heading}
                      </h3>
                      <p className="mt-3 max-w-2xl text-base leading-7 text-foreground/66">
                        {value.copy}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

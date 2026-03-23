import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

const timeline: TimelineItem[] = [
  {
    year: "2024",
    title: "Devdopz begins",
    description:
      "Devdopz started as a developer-first circle for people who wanted to learn, build, and support each other.",
  },
  {
    year: "2026",
    title: "It becomes an organization",
    description:
      "The community grew into an organization with stronger structure, a clearer mission, and more room for real builder collaboration.",
  },
  {
    year: "Next",
    title: "The mission keeps expanding",
    description:
      "The goal now is to create a better place for developers to collaborate, grow, and turn ideas into real output.",
  },
];

export const metadata: Metadata = {
  title: "Journey | Devdopz",
  description:
    "Read the Devdopz journey from its 2024 beginnings to its growth into an organization in 2026.",
};

export default function JourneyPage() {
  return (
    <main className="relative overflow-hidden">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-5 pb-8 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="relative overflow-hidden rounded-[2.8rem] border border-accent/10 bg-white px-6 py-10 shadow-[var(--hero-shadow)] sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative z-10 max-w-4xl">
            <div className="eyebrow-chip inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
              Devdopz journey
            </div>
            <h1 className="mt-6 max-w-[12ch] text-4xl font-medium leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Two brothers&apos; vision, now a mission.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/68 sm:text-lg">
              Devdopz began in 2024 as a developer-first circle and grew into
              an organization in 2026. This page tells that story in one place.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="https://t.me/devdopz"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium !text-white shadow-[0_18px_40px_rgba(47,102,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                Join Telegram
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-accent/15 bg-white px-6 py-3 text-sm font-medium text-foreground/76 transition-colors duration-300 hover:bg-accent/5"
              >
                Back home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="glass-panel journey-panel relative overflow-hidden rounded-[2.75rem] p-6 sm:p-8 lg:p-12">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

          <div className="relative grid gap-10 xl:grid-cols-[0.82fr_1.18fr] xl:gap-14">
            <div className="flex flex-col justify-between">
              <div>
                <div className="eyebrow-chip inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
                  Our story
                </div>
                <h2 className="mt-6 max-w-[11ch] text-4xl font-medium leading-[1.02] tracking-[-0.05em] sm:text-5xl">
                  Building something developers want to belong to.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-foreground/68 sm:text-lg">
                  Devdopz was founded by Abdul Ahad S and Muhammed Aslam Shah,
                  brothers from Kerala, India. It started in 2024 as a small
                  developer circle shaped by curiosity, shared learning, and a
                  simple belief that developers grow faster when they build
                  together instead of learning alone.
                </p>
                <p className="mt-4 max-w-xl text-base leading-8 text-foreground/68 sm:text-lg">
                  What began as conversations, guidance, and small collaborative
                  efforts slowly turned into something more meaningful. Devdopz
                  became a space where ideas could be shared openly, feedback
                  could be practical, and developers could support each other
                  with real momentum.
                </p>
                <p className="mt-4 max-w-xl text-base leading-8 text-foreground/68 sm:text-lg">
                  In 2026, that early community grew into an organization with
                  a clearer mission and stronger direction. The goal became
                  bigger than just bringing people together. It became about
                  building a better place for developers to collaborate, grow,
                  launch ideas, and move forward with purpose.
                </p>
              </div>
            </div>

            <div className="journey-track relative space-y-5 pl-0 sm:pl-6 lg:space-y-6">
              {timeline.map((item) => (
                <article
                  key={item.year}
                  className="journey-card soft-panel relative rounded-[1.9rem] p-5 sm:ml-8 sm:p-6"
                >
                  <div className="absolute -left-[2.25rem] top-8 hidden h-4 w-4 rounded-full border border-accent/18 bg-white shadow-[0_0_0_8px_rgba(47,102,255,0.08)] sm:block" />

                  <div className="flex flex-wrap items-center gap-4">
                    <p className="code-pill rounded-full border border-accent/10 bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-accent">
                      {item.year}
                    </p>
                  </div>

                  <h3 className="mt-5 max-w-[16ch] text-[1.75rem] font-medium leading-[1.06] tracking-[-0.05em] text-foreground sm:text-[2rem]">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-7 text-foreground/68">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

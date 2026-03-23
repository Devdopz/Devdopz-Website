import Image from "next/image";
import Link from "next/link";
import { HeroPhraseCycle } from "@/components/hero-phrase-cycle";
import { SiteHeader } from "@/components/site-header";
import { TelegramIcon } from "@/components/telegram-icon";
import { contributors } from "@/data/contributors";

type StoryPillar = {
  title: string;
  description: string;
  tag: string;
};

type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

type ValueCard = {
  heading: string;
  copy: string;
};

const storyPillars: StoryPillar[] = [
  {
    title: "Builder Circles",
    description:
      "Small crews for web, AI, open source, and product ideas that move from concept to prototype together.",
    tag: "collaborate",
  },
  {
    title: "Launch Labs",
    description:
      "Hands-on sessions where members test ideas, review code, and ship polished experiments instead of half-finished drafts.",
    tag: "ship",
  },
  {
    title: "Mentor Momentum",
    description:
      "Peer reviews, guidance, and practical feedback that help newer developers grow with confidence.",
    tag: "grow",
  },
  {
    title: "Creative Tech Culture",
    description:
      "A space where design, motion, code, and storytelling belong in the same room.",
    tag: "create",
  },
];

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

const topContributors = contributors.slice(0, 4);

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36">
        <div
          id="top"
          className="relative z-10 flex min-h-[calc(100svh-8rem)] items-center justify-center pb-10 pt-4 lg:pb-14 lg:pt-8"
        >
          <div className="relative mx-auto max-w-5xl text-center">
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
              <a
                href="#journey"
                className="inline-flex items-center justify-center rounded-full border border-accent/15 bg-white px-6 py-3 text-sm font-medium text-foreground/76 transition-colors duration-300 hover:bg-accent/5"
              >
                Our journey
              </a>
            </div>

            <div className="mx-auto mt-12 max-w-4xl">
              <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between">
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

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {topContributors.map((person) => (
                  <Link
                    key={person.name}
                    href="/people"
                    className="soft-panel flex items-center gap-3 rounded-[1.4rem] px-4 py-3 text-left transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <div className="overflow-hidden rounded-[1rem] border border-accent/12 bg-white shadow-[var(--card-shadow)]">
                      <Image
                        src={person.photo}
                        alt={person.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium tracking-[-0.03em] text-foreground">
                        {person.name}
                      </p>
                      <p className="mt-1 truncate text-xs uppercase tracking-[0.16em] text-foreground/42">
                        {person.focus}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section
        id="journey"
        className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10"
      >
        <div className="glass-panel journey-panel relative overflow-hidden rounded-[2.75rem] p-6 sm:p-8 lg:p-12">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

          <div className="relative grid gap-10 xl:grid-cols-[0.82fr_1.18fr] xl:gap-14">
            <div className="flex flex-col justify-between">
              <div>
                <div className="eyebrow-chip inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
                  Our journey
                </div>
                <h2 className="mt-6 max-w-[11ch] text-4xl font-medium leading-[1.02] tracking-[-0.05em] sm:text-5xl">
                  Two brothers&apos; vision, now a mission.
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

      <section
        id="programs"
        className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10"
      >
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="eyebrow-chip inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
              What Devdopz does
            </div>
            <h2 className="mt-5 max-w-[12ch] text-4xl font-medium leading-[1.02] tracking-[-0.05em] sm:text-5xl">
              A developer organization designed for momentum.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-foreground/68 sm:text-lg">
            The experience is built around action: shared learning, clean
            feedback, live collaboration, and visible progress.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {storyPillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className={`soft-panel rounded-[2rem] p-6 ${
                index === 0 ? "md:col-span-2 xl:col-span-2" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="eyebrow-chip code-pill rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/52">
                  {pillar.tag}
                </span>
                <span className="text-sm font-medium text-foreground/34">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-10 max-w-[12ch] text-3xl font-medium leading-[1.05] tracking-[-0.05em]">
                {pillar.title}
              </h3>
              <p className="mt-4 max-w-lg text-base leading-7 text-foreground/68">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="values"
        className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10"
      >
        <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="glass-panel rounded-[2.25rem] p-6 sm:p-8 lg:p-10">
            <div className="eyebrow-chip inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
              Core values
            </div>
            <h2 className="mt-6 text-4xl font-medium leading-[1.03] tracking-[-0.05em] sm:text-5xl">
              Not just more noise. More signal for people who build.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-foreground/68 sm:text-lg">
              Devdopz is meant to feel ambitious, welcoming, and practical all
              at once. The culture is serious about craft without losing the joy
              of making things together.
            </p>
            <div className="mt-8 rounded-[1.75rem] border border-accent/10 bg-accent px-5 py-6 text-white shadow-[0_24px_50px_rgba(47,102,255,0.2)]">
              <p className="code-pill text-xs uppercase tracking-[0.22em] text-white/62">
                devdopz.exe
              </p>
              <p className="mt-4 text-lg leading-8 text-white/90">
                create community
                <br />
                launch ideas
                <br />
                keep developers moving
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.heading}
                className="soft-panel flex h-full flex-col rounded-[2rem] p-6"
              >
                <div className="h-12 w-12 rounded-2xl bg-accent/10 ring-1 ring-accent/10" />
                <h3 className="mt-10 text-2xl font-medium tracking-[-0.04em] text-foreground">
                  {value.heading}
                </h3>
                <p className="mt-4 text-base leading-7 text-foreground/68">
                  {value.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 lg:px-10 lg:pb-24">
        <div className="glass-panel relative overflow-hidden rounded-[2.5rem] px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <div className="absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative z-10 max-w-4xl">
            <div className="eyebrow-chip inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
              Next chapter
            </div>
            <h2 className="mt-6 max-w-[12ch] text-4xl font-medium leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Devdopz is building the kind of place developers want to stay in.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/68 sm:text-lg">
              A sharp community, a clear mission, and a better environment for
              shipping ideas together. Started in 2024. Organized in 2026.
              Still accelerating.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#top"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(47,102,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                Back to top
              </a>
              <a
                href="#programs"
                className="inline-flex items-center justify-center rounded-full border border-accent/15 bg-white px-6 py-3 text-sm font-medium text-foreground/76 transition-colors duration-300 hover:bg-accent/5"
              >
                Revisit the programs
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

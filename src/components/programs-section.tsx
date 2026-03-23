import Link from "next/link";

type ProgramPillar = {
  title: string;
  description: string;
  tag: string;
};

const programPillars: ProgramPillar[] = [
  {
    title: "Builder Circles",
    description:
      "Small crews for web, AI, open source, and product ideas that move from concept to prototype together.",
    tag: "collaborate",
  },
  {
    title: "Launch Labs",
    description:
      "Hands-on sessions where members review code, test ideas, and ship stronger work with more confidence.",
    tag: "ship",
  },
  {
    title: "Mentor Momentum",
    description:
      "Practical guidance and peer feedback that help newer developers grow with clarity and consistency.",
    tag: "grow",
  },
  {
    title: "Hire Ready Talent",
    description:
      "Devdopz helps developers grow into stronger builders and gives teams a place to discover people they can hire with more confidence.",
    tag: "hire",
  },
];

export function ProgramsSection() {
  return (
    <section
      id="programs"
      className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10"
    >
      <div className="mb-8">
        <div>
          <div className="eyebrow-chip inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
            What Devdopz does
          </div>
          <h2 className="mt-5 text-[clamp(1.3rem,3vw,2.25rem)] font-medium leading-none tracking-[-0.04em] whitespace-nowrap">
            A developer organization designed for momentum.
          </h2>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {programPillars.map((pillar, index) => (
          <article
            key={pillar.title}
            className="soft-panel rounded-[2rem] p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="eyebrow-chip code-pill rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/52">
                {pillar.tag}
              </span>
              <span className="text-sm font-medium text-foreground/34">
                0{index + 1}
              </span>
            </div>

            <h3 className="mt-8 text-3xl font-medium leading-[1.05] tracking-[-0.05em] text-foreground">
              {pillar.title}
            </h3>
            <p className="mt-4 max-w-lg text-base leading-7 text-foreground/68">
              {pillar.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/projects"
          className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium !text-white shadow-[0_18px_40px_rgba(47,102,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
        >
          Explore projects
        </Link>
        <Link
          href="/journey"
          className="inline-flex items-center justify-center rounded-full border border-accent/15 bg-white px-6 py-3 text-sm font-medium text-foreground/76 transition-colors duration-300 hover:bg-accent/5"
        >
          Read our journey
        </Link>
      </div>
    </section>
  );
}

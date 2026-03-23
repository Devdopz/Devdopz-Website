import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { contributors } from "@/data/contributors";

export default function PeoplePage() {
  return (
    <main className="relative overflow-hidden">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-5 pb-10 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="relative overflow-hidden rounded-[2.75rem] border border-accent/10 bg-white px-6 py-10 shadow-[var(--hero-shadow)] sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <div className="absolute left-1/2 top-1/2 -z-10 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-3xl sm:h-[28rem] sm:w-[28rem]" />

          <div className="relative max-w-4xl">
            <div className="eyebrow-chip inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
              Peoples
            </div>
            <h1 className="mt-6 max-w-[10ch] text-5xl font-medium leading-[0.92] tracking-[-0.07em] text-foreground sm:text-6xl lg:text-[6rem]">
              People who contributed to Devdopz.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/68 sm:text-lg">
              A dedicated page for people who helped shape Devdopz. The names
              below are currently dummy data and can be replaced with real
              contributors whenever you are ready.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {contributors.map((person) => (
            <article
              key={person.name}
              className="soft-panel flex h-full flex-col rounded-[2rem] p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="overflow-hidden rounded-[1.2rem] border border-accent/12 bg-white shadow-[var(--card-shadow)]">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 object-cover"
                  />
                </div>
                <p className="code-pill rounded-full border border-accent/10 bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-accent">
                  {person.focus}
                </p>
              </div>

              <h2 className="mt-8 text-3xl font-medium leading-[1.05] tracking-[-0.05em] text-foreground">
                {person.name}
              </h2>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-foreground/42">
                {person.role}
              </p>
              <p className="mt-5 text-base leading-7 text-foreground/68">
                {person.contribution}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ContributorAvatar } from "@/components/contributor-avatar";
import { SiteHeader } from "@/components/site-header";
import { githubContributors } from "@/data/github-contributors";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "People",
  path: "/people",
  description:
    "Meet the verified Devdopz GitHub contributors, including founder profiles, GitHub usernames, and contribution totals from the Kerala-based developer organization.",
  keywords: [
    "Devdopz people",
    "GitHub contributors Kerala",
    "open source contributors Devdopz",
  ],
});

export default function PeoplePage() {
  return (
    <main className="relative overflow-hidden">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-5 pb-10 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="relative overflow-hidden rounded-[2.75rem] border border-accent/10 bg-white px-6 py-10 shadow-[var(--hero-shadow)] sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <div className="absolute left-1/2 top-1/2 -z-10 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-3xl sm:h-[28rem] sm:w-[28rem]" />

          <div className="relative max-w-4xl">
            <div className="eyebrow-chip inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
              GitHub contributors
            </div>
            <h1 className="mt-6 max-w-[10ch] text-5xl font-medium leading-[0.92] tracking-[-0.07em] text-foreground sm:text-6xl lg:text-[6rem]">
              Verified GitHub contributors.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/68 sm:text-lg">
              Only GitHub profile photo, username, and total commits are shown
              here.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {githubContributors.map((person) => (
            <Link
              key={person.username}
              href={person.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="soft-panel flex h-full flex-col rounded-[2rem] p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <ContributorAvatar
                name={person.displayName}
                photo={person.avatarUrl}
                size={72}
              />

              <p className="mt-8 text-sm font-medium uppercase tracking-[0.18em] text-foreground/42">
                GitHub username
              </p>
              <h2 className="mt-3 text-3xl font-medium leading-[1.05] tracking-[-0.05em] text-foreground">
                @{person.username}
              </h2>

              <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-foreground/42">
                Role in Devdopz
              </p>
              <p className="mt-3 text-2xl font-medium leading-[1.08] tracking-[-0.05em] text-foreground">
                {person.orgRole}
              </p>

              <p className="mt-8 text-sm font-medium uppercase tracking-[0.18em] text-foreground/42">
                Total commits
              </p>
              <p className="mt-3 text-5xl font-medium tracking-[-0.07em] text-foreground">
                {person.totalCommits}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

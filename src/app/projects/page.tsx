import type { Metadata } from "next";
import { ContributorAvatar } from "@/components/contributor-avatar";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/seo";

const repoUrl = "https://github.com/Devdopz/WevoaOS";
const repoApiUrl = "https://api.github.com/repos/Devdopz/WevoaOS";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  path: "/projects",
  description:
    "Explore Devdopz open source projects with live repository information from WevoaOS, including contributors, topics, README highlights, and current project status.",
  keywords: [
    "Devdopz projects",
    "WevoaOS",
    "open source projects Kerala",
  ],
});

type GitHubRepo = {
  defaultBranch: string;
  description: string | null;
  forks: number;
  fullName: string;
  homepage: string | null;
  htmlUrl: string;
  language: string | null;
  license: string | null;
  name: string;
  openIssues: number;
  pushedAt: string;
  stars: number;
  topics: string[];
  updatedAt: string;
  visibility: string;
};

type GitHubRepoResponse = {
  default_branch: string;
  description: string | null;
  forks_count: number;
  full_name: string;
  homepage: string | null;
  html_url: string;
  language: string | null;
  license: {
    name: string;
  } | null;
  name: string;
  open_issues_count: number;
  pushed_at: string;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
  visibility: string;
};

type GitHubContributor = {
  avatar_url: string;
  contributions: number;
  html_url: string;
  login: string;
};

type GitHubReadmeResponse = {
  download_url: string | null;
  html_url: string;
};

type RepoPageData = {
  contributors: GitHubContributor[];
  readmeHtmlUrl: string;
  readmeText: string | null;
  repo: GitHubRepo | null;
};

async function fetchJson<T>(url: string) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}

async function getRepoPageData(): Promise<RepoPageData> {
  const [repoData, contributorsData, readmeData] = await Promise.all([
    fetchJson<GitHubRepoResponse>(repoApiUrl),
    fetchJson<GitHubContributor[]>(`${repoApiUrl}/contributors`),
    fetchJson<GitHubReadmeResponse>(`${repoApiUrl}/readme`),
  ]);

  let readmeText: string | null = null;

  if (readmeData?.download_url) {
    const readmeResponse = await fetch(readmeData.download_url, {
      next: { revalidate: 3600 },
    });

    if (readmeResponse.ok) {
      readmeText = await readmeResponse.text();
    }
  }

  return {
    contributors: contributorsData ?? [],
    readmeHtmlUrl: readmeData?.html_url ?? `${repoUrl}#readme`,
    readmeText,
    repo: repoData
      ? {
          defaultBranch: repoData.default_branch,
          description: repoData.description,
          forks: repoData.forks_count,
          fullName: repoData.full_name,
          homepage: repoData.homepage,
          htmlUrl: repoData.html_url,
          language: repoData.language,
          license: repoData.license?.name ?? null,
          name: repoData.name,
          openIssues: repoData.open_issues_count,
          pushedAt: repoData.pushed_at,
          stars: repoData.stargazers_count,
          topics: repoData.topics,
          updatedAt: repoData.updated_at,
          visibility: repoData.visibility,
        }
      : null,
  };
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractReadmeSummary(markdown: string) {
  const match = markdown.match(
    /^#\s+.+?\n\n([\s\S]*?)\n\nCurrent implemented baseline:/m,
  );

  return match?.[1].replace(/\s+/g, " ").trim() ?? null;
}

function extractSectionList(markdown: string, sectionTitle: string) {
  const match = markdown.match(
    new RegExp(`${escapeRegex(sectionTitle)}\\n([\\s\\S]*?)(?:\\n##\\s|$)`),
  );

  if (!match) {
    return [];
  }

  return match[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).replaceAll("`", ""));
}

function extractStatus(markdown: string) {
  const match = markdown.match(/## Status\s+Current baseline:\s+`([^`]+)`/m);
  return match?.[1] ?? null;
}

export default async function ProjectsPage() {
  const { contributors, readmeHtmlUrl, readmeText, repo } =
    await getRepoPageData();
  const topContributors = contributors.slice(0, 5);

  const readmeSummary = readmeText ? extractReadmeSummary(readmeText) : null;
  const baselineItems = readmeText
    ? extractSectionList(readmeText, "Current implemented baseline:")
    : [];
  const principleItems = readmeText
    ? extractSectionList(readmeText, "## Project Principles")
    : [];
  const repoStatus = readmeText ? extractStatus(readmeText) : null;

  return (
    <main className="relative overflow-hidden">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-5 pb-10 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36">
        <div
          id="top"
          className="relative overflow-hidden rounded-[2.75rem] border border-accent/10 bg-white px-6 py-10 shadow-[var(--hero-shadow)] sm:px-8 sm:py-12 lg:px-12 lg:py-16"
        >
          <div className="absolute left-1/2 top-1/2 -z-10 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-3xl sm:h-[28rem] sm:w-[28rem]" />

          <div className="relative max-w-4xl">
            <div className="eyebrow-chip inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
              Projects
            </div>
            <h1 className="mt-6 max-w-[10ch] text-5xl font-medium leading-[0.92] tracking-[-0.07em] text-foreground sm:text-6xl lg:text-[6rem]">
              What Devdopz is building.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/68 sm:text-lg">
              This page now shows only live repository information from
              Devdopz/WevoaOS and the current content of that repository&apos;s
              README.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        {repo ? (
          <article className="rounded-[2.35rem] border border-accent/10 bg-white px-6 py-6 shadow-[var(--card-shadow)] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <div className="flex flex-col gap-8">
              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="code-pill text-xs tracking-[0.12em] text-accent">
                    {repo.fullName}
                  </span>
                  <span className="text-xs uppercase tracking-[0.18em] text-foreground/42">
                    {repo.visibility}
                  </span>
                  {repoStatus ? (
                    <span className="text-xs uppercase tracking-[0.18em] text-foreground/42">
                      {repoStatus}
                    </span>
                  ) : null}
                </div>

                <h2 className="mt-5 text-4xl font-medium leading-[0.98] tracking-[-0.05em] text-foreground sm:text-5xl">
                  {repo.name}
                </h2>

                <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/68 sm:text-lg">
                  {readmeSummary ?? repo.description}
                </p>
              </div>

              <div className="grid gap-8 border-t border-accent/10 pt-8 lg:grid-cols-[1.3fr_0.7fr]">
                {baselineItems.length > 0 ? (
                  <div>
                    <p className="code-pill text-xs uppercase tracking-[0.22em] text-foreground/42">
                      Current baseline
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-foreground/68 sm:text-base">
                      {baselineItems.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent/80" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div />
                )}

                <div className="space-y-8">
                  {topContributors.length > 0 ? (
                    <div>
                      <p className="code-pill text-xs uppercase tracking-[0.22em] text-foreground/42">
                        Top contributors
                      </p>
                      <div className="mt-4 flex items-center">
                        {topContributors.map((contributor, index) => (
                          <a
                            key={contributor.login}
                            href={contributor.html_url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`@${contributor.login}`}
                            title={`@${contributor.login}`}
                            className={`relative block rounded-full border-2 border-white bg-white shadow-[var(--card-shadow)] transition-transform duration-300 hover:z-10 hover:-translate-y-0.5 ${
                              index === 0 ? "" : "-ml-3 sm:-ml-4"
                            }`}
                          >
                            <ContributorAvatar
                              name={contributor.login}
                              photo={contributor.avatar_url}
                              size={46}
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {principleItems.length > 0 ? (
                    <div>
                      <p className="code-pill text-xs uppercase tracking-[0.22em] text-foreground/42">
                        Project principles
                      </p>
                      <ul className="mt-4 space-y-2.5 text-sm leading-6 text-foreground/60">
                        {principleItems.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {repo.topics.length > 0 ? (
                    <div>
                      <p className="code-pill text-xs uppercase tracking-[0.22em] text-foreground/42">
                        Topics
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {repo.topics.map((topic) => (
                          <span
                            key={topic}
                            className="code-pill rounded-full border border-accent/10 px-3 py-1.5 text-[0.76rem] tracking-[0.02em] text-foreground/58"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="border-t border-accent/10 pt-8">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium !text-white shadow-[0_18px_40px_rgba(47,102,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
                  >
                    View repository
                  </a>
                  <a
                    href={readmeHtmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-accent/15 bg-white px-6 py-3 text-sm font-medium text-foreground/76 transition-colors duration-300 hover:bg-accent/5"
                  >
                    Open README
                  </a>
                </div>
              </div>
            </div>
          </article>
        ) : (
          <article className="glass-panel rounded-[2.6rem] px-6 py-8 sm:px-8 lg:px-10">
            <p className="text-base leading-8 text-foreground/68 sm:text-lg">
              Live repository data is unavailable right now, so the page is not
              showing any fallback content.
            </p>
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium !text-white shadow-[0_18px_40px_rgba(47,102,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
            >
              Open WevoaOS on GitHub
            </a>
          </article>
        )}
      </section>
    </main>
  );
}

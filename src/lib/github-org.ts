const githubApiBase = "https://api.github.com";
const orgName = "Devdopz";

type GitHubRepoResponse = {
  name: string;
};

type GitHubContributorResponse = {
  avatar_url: string;
  contributions: number;
  html_url: string;
  login: string;
  type: string;
};

export type OrgContributor = {
  avatarUrl: string;
  profileUrl: string;
  totalCommits: number;
  username: string;
};

async function fetchGitHubJson<T>(path: string) {
  const response = await fetch(`${githubApiBase}${path}`, {
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

export async function getOrgContributors(): Promise<OrgContributor[]> {
  const repos =
    (await fetchGitHubJson<GitHubRepoResponse[]>(
      `/orgs/${orgName}/repos?per_page=100&type=public`,
    )) ?? [];

  const contributorsByUsername = new Map<string, OrgContributor>();

  const contributorLists = await Promise.all(
    repos.map(async (repo) => {
      return (
        (await fetchGitHubJson<GitHubContributorResponse[]>(
          `/repos/${orgName}/${repo.name}/contributors?per_page=100`,
        )) ?? []
      );
    }),
  );

  for (const contributorList of contributorLists) {
    for (const contributor of contributorList) {
      if (!contributor.login || contributor.type !== "User") {
        continue;
      }

      const current = contributorsByUsername.get(contributor.login);

      if (current) {
        current.totalCommits += contributor.contributions;
        continue;
      }

      contributorsByUsername.set(contributor.login, {
        avatarUrl: contributor.avatar_url,
        profileUrl: contributor.html_url,
        totalCommits: contributor.contributions,
        username: contributor.login,
      });
    }
  }

  return [...contributorsByUsername.values()].sort((left, right) => {
    if (right.totalCommits !== left.totalCommits) {
      return right.totalCommits - left.totalCommits;
    }

    return left.username.localeCompare(right.username);
  });
}

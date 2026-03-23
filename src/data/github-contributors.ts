export type GitHubContributor = {
  avatarUrl: string;
  displayName: string;
  featuredOrder?: number;
  orgRole: string;
  profileUrl: string;
  totalCommits: number;
  username: string;
};

export const githubContributors: GitHubContributor[] = [
  {
    avatarUrl: "https://avatars.githubusercontent.com/u/139561652?v=4",
    displayName: "Abdul Ahad",
    featuredOrder: 1,
    orgRole: "Founder & Engineer",
    profileUrl: "https://github.com/AHADBAVA",
    totalCommits: 20,
    username: "AHADBAVA",
  },
  {
    avatarUrl: "https://avatars.githubusercontent.com/u/119589957?v=4",
    displayName: "Muhammed Aslam Shah",
    featuredOrder: 2,
    orgRole: "Founder & Engineer",
    profileUrl: "https://github.com/muhammedaslamshah",
    totalCommits: 16,
    username: "muhammedaslamshah",
  },
  {
    avatarUrl: "https://avatars.githubusercontent.com/u/156568942?v=4",
    displayName: "Hiba Mariyam",
    orgRole: "Contributor",
    profileUrl: "https://github.com/HibaMariyam",
    totalCommits: 7,
    username: "HibaMariyam",
  },
  {
    avatarUrl: "https://avatars.githubusercontent.com/u/119198804?v=4",
    displayName: "Rifan K",
    orgRole: "Contributor",
    profileUrl: "https://github.com/Rifanaks",
    totalCommits: 5,
    username: "Rifanaks",
  },
];

export const heroContributors = [
  ...githubContributors
    .filter((person) => typeof person.featuredOrder === "number")
    .sort((left, right) => {
      return (left.featuredOrder ?? 0) - (right.featuredOrder ?? 0);
    }),
];

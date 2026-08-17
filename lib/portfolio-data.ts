export const CGPA = 7.94;
export const GITHUB_USERNAME = "SABARISH0014";

export type PortfolioSignals = {
  githubStars: number;
  latestRepoName: string;
  latestRepoDescription: string;
  latestRepoUrl: string;
  publicRepoCount: number;
  lastPushedAt: string;
};

function formatRepoName(name: string) {
  return name.replace(/[-_]/g, " ");
}

export async function getPortfolioSignals(): Promise<PortfolioSignals> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&direction=desc`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "portfolio-next-og"
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API request failed with ${response.status}`);
    }

    const repos = (await response.json()) as Array<{
      stargazers_count: number;
      name: string;
      description: string | null;
      html_url: string;
      pushed_at: string;
    }>;

    const latestRepo = repos[0];
    const githubStars = repos.reduce((total, repo) => total + (repo.stargazers_count ?? 0), 0);

    return {
      githubStars,
      latestRepoName: latestRepo ? formatRepoName(latestRepo.name) : "Portfolio Next",
      latestRepoDescription: latestRepo?.description ?? "Recent project activity from the portfolio owner.",
      latestRepoUrl: latestRepo?.html_url ?? `https://github.com/${GITHUB_USERNAME}`,
      publicRepoCount: repos.length,
      lastPushedAt: latestRepo?.pushed_at ?? new Date().toISOString()
    };
  } catch {
    return {
      githubStars: 0,
      latestRepoName: "Portfolio Next",
      latestRepoDescription: "GitHub data is unavailable right now.",
      latestRepoUrl: `https://github.com/${GITHUB_USERNAME}`,
      publicRepoCount: 0,
      lastPushedAt: new Date().toISOString()
    };
  }
}

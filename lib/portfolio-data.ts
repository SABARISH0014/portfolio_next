export const CGPA = 7.87;
export const GITHUB_USERNAME = "SABARISH0014";

export type PortfolioSignals = {
  githubStars: number;
  latestRepoName: string;
  latestRepoDescription: string;
  latestRepoUrl: string;
  publicRepoCount: number;
  lastPushedAt: string;
};

type GitHubRepo = {
  stargazers_count: number;
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
};

type GitHubEvent = {
  type: string;
  repo: { name: string; url: string };
  created_at: string;
};

function getGitHubHeaders(): Record<string, string> {
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "sabarish-portfolio-next",
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {})
  };
}

function formatRepoName(name: string) {
  return name.replace(/[-_]/g, " ");
}

export async function getPortfolioSignals(): Promise<PortfolioSignals> {
  const FALLBACK: PortfolioSignals = {
    githubStars: 0,
    latestRepoName: "CipherSpend-v1",
    latestRepoDescription:
      "Offline-first Android finance tracker with NER-based SMS parsing.",
    latestRepoUrl: "https://github.com/SABARISH0014/CipherSpend-v1",
    publicRepoCount: 10,
    lastPushedAt: new Date().toISOString()
  };

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&direction=desc`,
      {
        next: { revalidate: 300 },
        headers: getGitHubHeaders()
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API failed: ${response.status}`);
    }

    const repos = (await response.json()) as GitHubRepo[];

    // Explicit JS sort — guarantees most-recently-pushed is at index 0
    repos.sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    );

    const githubStars = repos.reduce(
      (total, repo) => total + (repo.stargazers_count ?? 0),
      0
    );

    let latestRepo = repos[0];

    // Non-blocking: check public events for a potentially newer PushEvent
    try {
      const eventsRes = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`,
        { next: { revalidate: 300 }, headers: getGitHubHeaders() }
      );
      if (eventsRes.ok) {
        const events = (await eventsRes.json()) as GitHubEvent[];
        const latestPush = events.find((e) => e.type === "PushEvent");
        if (
          latestPush &&
          latestRepo &&
          new Date(latestPush.created_at).getTime() >
            new Date(latestRepo.pushed_at).getTime()
        ) {
          const pushRepoName = latestPush.repo.name.split("/")[1] ?? latestPush.repo.name;
          const matchedRepo = repos.find((r) => r.name === pushRepoName);
          if (matchedRepo) latestRepo = matchedRepo;
        }
      }
    } catch {
      // Events fetch is non-critical — silently continue with repo data
    }

    return {
      githubStars,
      latestRepoName: latestRepo ? formatRepoName(latestRepo.name) : FALLBACK.latestRepoName,
      latestRepoDescription: latestRepo?.description ?? FALLBACK.latestRepoDescription,
      latestRepoUrl: latestRepo?.html_url ?? FALLBACK.latestRepoUrl,
      publicRepoCount: repos.length,
      lastPushedAt: latestRepo?.pushed_at ?? new Date().toISOString()
    };
  } catch {
    return FALLBACK;
  }
}

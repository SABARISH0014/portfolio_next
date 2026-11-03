import { BentoCard } from "@/components/ui/bento-card";
import { Star } from "lucide-react";
import { resumeData } from "@/lib/data/resume";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  topics: string[];
  pushed_at: string;
};

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function getGitHubHeaders(): Record<string, string> {
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "sabarish-portfolio-next",
    ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {})
  };
}

export async function RecentActivity() {
  let repos: Repo[] = [];
  let error = false;

  try {
    const res = await fetch(
      "https://api.github.com/users/SABARISH0014/repos?sort=pushed&direction=desc&per_page=4",
      {
        next: { revalidate: 600 },
        headers: getGitHubHeaders()
      }
    );

    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const raw = (await res.json()) as Repo[];
    // Explicit sort by pushed_at descending
    repos = raw.sort(
      (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    );
  } catch (err) {
    console.error("Error fetching GitHub repos:", err);
    error = true;
  }

  // Fallback: render flagship projects from resumeData so the section never looks broken
  if (error || repos.length === 0) {
    return (
      <section id="recent-activity" className="scroll-mt-28 pt-10 lg:pt-16">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/70">Live Feed</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            Latest GitHub Activity
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {resumeData.projects.map((project) => (
            <BentoCard key={project.id} href={project.githubUrl} className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white text-lg">{project.title}</h3>
                </div>
                <p className="text-sm text-neutral-400 mb-6 line-clamp-2">{project.subtitle}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-wider text-neutral-200">
                    {t}
                  </span>
                ))}
              </div>
            </BentoCard>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="recent-activity" className="scroll-mt-28 pt-10 lg:pt-16">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/70">Live Feed</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
          Latest GitHub Activity
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {repos.map((repo) => (
          <BentoCard key={repo.id} href={repo.html_url} className="h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white text-lg">{repo.name}</h3>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Star className="h-4 w-4 text-cyan-300/50" />
                  <span className="text-xs">{repo.stargazers_count}</span>
                </div>
              </div>
              <p className="text-sm text-neutral-400 mb-6 line-clamp-2">
                {repo.description || "No description provided."}
              </p>
            </div>
            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {repo.topics.slice(0, 3).map((topic) => (
                  <span key={topic} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-wider text-neutral-200">
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </BentoCard>
        ))}
      </div>
    </section>
  );
}

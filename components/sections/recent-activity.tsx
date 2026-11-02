import { BentoCard } from "@/components/ui/bento-card";
import { Star } from "lucide-react";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  topics: string[];
};

export async function RecentActivity() {
  let repos: Repo[] = [];
  let error = false;

  try {
    // Fetches your latest 4 repositories directly from GitHub
    // ISR caching ensures the server only re-runs this fetch once per hour
    const res = await fetch("https://api.github.com/users/SABARISH0014/repos?sort=updated&per_page=4", {
      next: { revalidate: 3600 }
    });

    if (!res.ok) throw new Error("Failed to fetch");
    repos = await res.json();
  } catch (err) {
    console.error("Error fetching GitHub repos:", err);
    error = true; // Triggers the graceful fallback UI
  }

  return (
    <section id="recent-activity" className="scroll-mt-28 pt-10 lg:pt-16">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/70">Live Feed</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">Latest GitHub Activity</h2>
      </div>

      {error ? (
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-neutral-400">
          Activity feed syncing...
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {repos.map((repo) => (
            // Pass href directly to BentoCard — it renders as motion.a when href is provided,
            // avoiding the invalid nested <a> hydration error from wrapping with an external <a>.
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
      )}
    </section>
  );
}

import { NextResponse } from "next/server";
import { getPortfolioSignals } from "@/lib/portfolio-data";

export async function GET() {
  const signals = await getPortfolioSignals();

  return NextResponse.json(
    {
      githubStars: signals.githubStars,
      latestRepoName: signals.latestRepoName,
      latestRepoUrl: signals.latestRepoUrl,
      latestRepoDescription: signals.latestRepoDescription,
      publicRepoCount: signals.publicRepoCount,
      lastPushedAt: signals.lastPushedAt
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
      }
    }
  );
}

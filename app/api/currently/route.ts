import { NextResponse } from "next/server";
import { getPortfolioSignals } from "@/lib/portfolio-data";

export async function GET() {
  const signals = await getPortfolioSignals();

  return NextResponse.json({
    githubStars: signals.githubStars,
    latestRepoName: signals.latestRepoName
  });
}
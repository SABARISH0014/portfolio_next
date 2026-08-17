import { Suspense } from "react";
import { headers } from "next/headers";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Currently } from "@/components/sections/currently";
import { CurrentlySkeleton } from "@/components/sections/currently-skeleton";
import { TechnicalArsenal } from "@/components/sections/technical-arsenal";
import { Journey } from "@/components/sections/journey";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

export const experimental_ppr = true;

export default async function Home() {
  const headersList = await headers();
  const location = headersList.get("x-vercel-ip-city");

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-12 px-6 pb-24 pt-10 lg:px-10 lg:pb-32">
        <Hero location={location} />
        <TechnicalArsenal />
        <Suspense fallback={<CurrentlySkeleton />}>
          <Currently />
        </Suspense>
        <Journey />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
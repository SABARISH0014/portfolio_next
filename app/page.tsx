import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Currently } from "@/components/sections/currently";
import { TechnicalArsenal } from "@/components/sections/technical-arsenal";
import { Journey } from "@/components/sections/journey";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-12 px-6 pb-24 pt-10 lg:px-10 lg:pb-32">
        <Hero />
        <Currently />
        <TechnicalArsenal />
        <Journey />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
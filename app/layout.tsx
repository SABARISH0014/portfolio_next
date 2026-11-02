import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { CommandPalette } from "@/components/ui/command-palette";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sabarishp.me";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  title: "Sabarish P | Aspiring Software & Product Developer",
  description: "Premium personal portfolio for Sabarish P, Aspiring Software & Product Developer in Coimbatore, Tamil Nadu.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Sabarish P | Aspiring Software & Product Developer",
    description: "Premium personal portfolio for Sabarish P in Coimbatore, Tamil Nadu.",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Sabarish P portfolio OG image"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    images: ["/api/og"]
  }
};

import { TerminalProvider } from "@/components/ui/terminal-provider";
import { TerminalMode } from "@/components/ui/terminal-mode";
import { KonamiListener } from "@/components/ui/konami-listener";
import { AITwinWidget } from "@/components/ui/ai-twin-widget";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-neutral-950 antialiased`}>
        <TerminalProvider>
          <CustomCursor />
          <CommandPalette />
          <TerminalMode />
          <KonamiListener />
          <AITwinWidget />
          <div data-view-transition-shell>{children}</div>
        </TerminalProvider>
      </body>
    </html>
  );
}
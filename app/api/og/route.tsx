import { ImageResponse } from "@vercel/og";
import { CGPA, GITHUB_USERNAME, getPortfolioSignals } from "@/lib/portfolio-data";

export const runtime = "edge";

const titleStyle = {
  fontSize: 56,
  fontWeight: 700,
  letterSpacing: "-0.04em",
  color: "#ffffff",
  lineHeight: 1.05
};

const labelStyle = {
  fontSize: 18,
  letterSpacing: "0.28em",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.55)"
};

const metricStyle = {
  fontSize: 28,
  fontWeight: 600,
  color: "#e2e8f0"
};

export async function GET() {
  const signals = await getPortfolioSignals();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          background: "#09090b",
          color: "#fff",
          fontFamily: "Inter, sans-serif",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            opacity: 0.32
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(34,211,238,0.22), transparent 28%), radial-gradient(circle at bottom right, rgba(59,130,246,0.14), transparent 28%)"
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: 64
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={labelStyle}>Sabarish P</div>
            <div style={{ ...labelStyle, color: "rgba(103,232,249,0.9)" }}>Software, AI &amp; Product Developer</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 760 }}>
            <div style={titleStyle}>Portfolio signal, tuned for the dark.</div>
            <div style={{ fontSize: 24, lineHeight: 1.5, color: "rgba(226,232,240,0.82)" }}>
              MCA @ PSG College of Technology · Coimbatore, Tamil Nadu
            </div>
          </div>

          <div style={{ display: "flex", gap: 20, alignItems: "stretch" }}>
            <div
              style={{
                flex: 1,
                borderRadius: 28,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                padding: 28,
                backdropFilter: "blur(16px)"
              }}
            >
              <div style={labelStyle}>CGPA</div>
              <div style={{ ...metricStyle, marginTop: 12 }}>{CGPA.toFixed(2)}</div>
              <div style={{ marginTop: 12, color: "rgba(148,163,184,0.9)", fontSize: 18 }}>
                Current academic signal.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                borderRadius: 28,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                padding: 28,
                backdropFilter: "blur(16px)"
              }}
            >
              <div style={labelStyle}>GitHub Stars</div>
              <div style={{ ...metricStyle, marginTop: 12 }}>{signals.githubStars.toLocaleString()}</div>
              <div style={{ marginTop: 12, color: "rgba(148,163,184,0.9)", fontSize: 18 }}>
                Across {signals.publicRepoCount.toLocaleString()} public repositories.
              </div>
            </div>

            <div
              style={{
                flex: 1.1,
                borderRadius: 28,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                padding: 28,
                backdropFilter: "blur(16px)"
              }}
            >
              <div style={labelStyle}>Latest Push</div>
              <div style={{ ...metricStyle, marginTop: 12 }}>{signals.latestRepoName}</div>
              <div style={{ marginTop: 12, color: "rgba(148,163,184,0.9)", fontSize: 18, lineHeight: 1.5 }}>
                {signals.latestRepoDescription}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ color: "rgba(148,163,184,0.9)", fontSize: 16 }}>
              github.com/{GITHUB_USERNAME}
            </div>
            <div style={{ color: "rgba(103,232,249,0.9)", fontSize: 16 }}>
              {new Date(signals.lastPushedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}

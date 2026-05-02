import { useState } from "react";

export default function ContrastSplitPortfolio() {
  const [filter, setFilter] = useState("All");

  const ink = "hsl(220,25%,14%)";
  const paper = "hsl(40,20%,97%)";
  const brass = "hsl(35,45%,45%)";
  const brassLight = "hsl(35,55%,62%)";
  const hairline = "hsl(40,15%,87%)";
  const muted = "hsl(220,12%,52%)";

  const filters = ["All", "Web App", "Automation", "Dashboard", "Tool"];

  const projects = [
    {
      type: "Web App",
      title: "PM Portfolio — This Site",
      stack: ["React", "TypeScript", "Drizzle ORM", "PostgreSQL"],
      description: "Full-stack portfolio website with admin CMS, blog engine, CV download gate, and AI chatbot. Built end-to-end on Replit.",
      status: "Live",
      url: "#",
      highlight: true,
      lines: ["Contact capture & lead export", "Admin blog editor (ReactQuill)", "AI chatbot for recruiter Q&A", "Theme/brand customisation panel"],
    },
    {
      type: "Dashboard",
      title: "Programme Health Dashboard",
      stack: ["React", "Recharts", "Express", "PostgreSQL"],
      description: "Real-time portfolio health dashboard modelled on the Power BI boards built for Mercer. RAG status, risk register, and milestone tracker.",
      status: "Live",
      url: "#",
      highlight: false,
      lines: ["RAG status per workstream", "Risk escalation timeline", "Budget burn vs. forecast", "Exportable board pack PDF"],
    },
    {
      type: "Automation",
      title: "Meeting Notes → Action Tracker",
      stack: ["Node.js", "OpenAI API", "Google Sheets API"],
      description: "Paste meeting transcript → GPT extracts actions, owners, and deadlines → pushes to a shared Google Sheet. Used across three client teams.",
      status: "Live",
      url: "#",
      highlight: false,
      lines: ["Owner detection from transcript", "Deadline extraction", "Google Sheets push", "Slack summary notification"],
    },
    {
      type: "Tool",
      title: "Risk Register Builder",
      stack: ["React", "TypeScript", "CSV Export"],
      description: "Structured risk register tool with probability/impact matrix, owner assignment, and mitigation tracking. Exportable to CSV for board packs.",
      status: "Live",
      url: "#",
      highlight: false,
      lines: ["P×I heat map visualisation", "Owner & due date tracking", "Mitigation log per risk", "CSV / Excel export"],
    },
    {
      type: "Web App",
      title: "Stakeholder Engagement Planner",
      stack: ["React", "Express", "PostgreSQL"],
      description: "Maps stakeholders by influence/interest quadrant, tracks engagement history, and generates a comms calendar. Built for complex multi-stakeholder programmes.",
      status: "Live",
      url: "#",
      highlight: false,
      lines: ["Influence / interest matrix", "Engagement log per stakeholder", "Auto-generated comms calendar", "Export to PowerPoint outline"],
    },
    {
      type: "Automation",
      title: "Weekly Status Report Generator",
      stack: ["Node.js", "OpenAI API", "Express"],
      description: "Pulls Jira sprint data, combines with a brief text input, and generates a board-ready weekly status report in under 30 seconds.",
      status: "Beta",
      url: "#",
      highlight: false,
      lines: ["Jira sprint data ingestion", "GPT narrative generation", "RAG status auto-assigned", "Docx / PDF output"],
    },
  ];

  const filtered = filter === "All" ? projects : projects.filter(p => p.type === filter);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", display: "flex", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
      `}</style>

      {/* ── LEFT PANEL ── */}
      <aside style={{ width: 340, background: ink, color: paper, position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", padding: "52px 44px", flexShrink: 0, overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 52 }}>
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="2" fill={brass} />
            <text x="20" y="28" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="22" fill={paper}>M</text>
          </svg>
          <span style={{ fontSize: 11, color: `hsl(220,15%,50%)`, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}>Mujeeb Lawal</span>
        </div>

        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 32, fontWeight: 400, lineHeight: 1.1, color: paper, marginBottom: 8 }}>Projects</div>
          <div style={{ fontSize: 13, color: `hsl(220,15%,50%)`, lineHeight: 1.65 }}>
            Things I've built — web apps, tools, automations, and dashboards. All live on Replit.
          </div>
        </div>

        {/* Count */}
        <div style={{ padding: "16px 0", borderTop: `1px solid hsl(220,20%,22%)`, borderBottom: `1px solid hsl(220,20%,22%)`, marginBottom: 32 }}>
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, fontWeight: 400, color: brassLight }}>{filtered.length}</span>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: `hsl(220,15%,42%)`, marginLeft: 12 }}>
            {filter === "All" ? "projects" : filter.toLowerCase() + "s"}
          </span>
        </div>

        {/* Filter */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: `hsl(220,15%,38%)`, marginBottom: 14 }}>Filter by type</div>
          {filters.map((f, i) => (
            <button key={i} onClick={() => setFilter(f)} style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "9px 0 9px 12px", background: "none", border: "none", cursor: "pointer",
              fontSize: 12, fontWeight: filter === f ? 600 : 400,
              color: filter === f ? brassLight : `hsl(220,15%,50%)`,
              borderLeft: filter === f ? `2px solid ${brassLight}` : "2px solid hsl(220,20%,22%)",
              letterSpacing: "0.04em",
            }}>{f}</button>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ borderTop: `1px solid hsl(220,20%,22%)`, paddingTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
          <a href="#" style={{ fontSize: 12, color: `hsl(220,15%,50%)` }}>← Back to Profile</a>
          <a href="#" style={{ fontSize: 12, color: `hsl(220,15%,50%)` }}>Case Studies</a>
          <a href="#" style={{ fontSize: 12, color: `hsl(220,15%,50%)` }}>Insights</a>
        </div>
      </aside>

      {/* ── RIGHT PANEL ── */}
      <main style={{ flex: 1, background: paper }}>

        {/* Page header */}
        <div style={{ padding: "52px 64px 40px", borderBottom: `1px solid ${hairline}` }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: brass, marginBottom: 12 }}>
            Built on Replit
          </div>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 48, fontWeight: 400, color: ink, lineHeight: 1.1, marginBottom: 12 }}>
            Technical Projects
          </h1>
          <p style={{ fontSize: 14, color: muted, maxWidth: 560 }}>
            I don't just manage delivery — I build. These are working tools and applications, each solving a real problem I encountered in programme work.
          </p>
        </div>

        {/* Project grid */}
        <div style={{ padding: "48px 64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {filtered.map((p, i) => (
            <a key={i} href={p.url} style={{
              background: p.highlight ? ink : "transparent",
              border: `1px solid ${p.highlight ? "transparent" : hairline}`,
              padding: "36px 32px",
              display: "flex", flexDirection: "column", gap: 0,
              color: p.highlight ? paper : ink,
              cursor: "pointer",
              transition: "background 0.15s",
              margin: i < 2 ? "0 0 2px 0" : "0",
            }}>
              {/* Top row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: p.highlight ? brassLight : brass,
                  border: `1px solid ${p.highlight ? "hsl(220,20%,28%)" : "hsl(35,45%,72%)"}`,
                  padding: "4px 10px",
                }}>{p.type}</span>
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
                  color: p.status === "Live" ? "hsl(145,45%,48%)" : "hsl(35,65%,58%)",
                }}>{p.status}</span>
              </div>

              {/* Title */}
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, fontWeight: 500, lineHeight: 1.15, marginBottom: 12, color: p.highlight ? paper : ink }}>{p.title}</div>

              {/* Description */}
              <p style={{ fontSize: 13, lineHeight: 1.7, color: p.highlight ? `hsl(220,15%,68%)` : `hsl(220,15%,42%)`, marginBottom: 20, flex: 1 }}>{p.description}</p>

              {/* Feature bullets */}
              <div style={{ marginBottom: 20 }}>
                {p.lines.map((l, j) => (
                  <div key={j} style={{ fontSize: 12, color: p.highlight ? `hsl(220,15%,55%)` : muted, padding: "5px 0", borderBottom: `1px solid ${p.highlight ? "hsl(220,20%,22%)" : hairline}`, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: brassLight, fontSize: 10 }}>—</span>
                    {l}
                  </div>
                ))}
              </div>

              {/* Stack tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {p.stack.map((s, j) => (
                  <span key={j} style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 10, fontWeight: 400,
                    color: p.highlight ? `hsl(220,15%,55%)` : muted,
                    background: p.highlight ? "hsl(220,20%,20%)" : "hsl(40,15%,92%)",
                    padding: "4px 10px",
                  }}>{s}</span>
                ))}
              </div>

              {/* CTA */}
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: brassLight }}>
                View project →
              </div>
            </a>
          ))}
        </div>

      </main>
    </div>
  );
}

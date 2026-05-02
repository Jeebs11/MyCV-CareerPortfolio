import { useState } from "react";

export default function ContrastSplitProjects() {
  const [active, setActive] = useState(0);

  const ink = "hsl(220,25%,14%)";
  const paper = "hsl(40,20%,97%)";
  const brass = "hsl(35,45%,45%)";
  const brassLight = "hsl(35,55%,62%)";
  const hairline = "hsl(40,15%,87%)";
  const muted = "hsl(220,12%,52%)";

  const projects = [
    {
      id: "mercer-pmo",
      title: "PMO Build — Mercer",
      sector: "Financial Services",
      year: "2022–24",
      type: "Permanent",
      metric: "+36%",
      metricLabel: "Delivery efficiency",
      challenge: "Mercer's project portfolio had grown organically across three business units with no central governance, no shared tooling, and no consolidated view for the ExCo. Programmes were being run in isolation, risks were siloed, and the CTO had no reliable view of portfolio health.",
      approach: "Designed and built a fit-for-purpose PMO over six months. Established a governance framework with clear RACI, introduced Jira and Confluence as the single source of truth, built a Power BI board pack for monthly ExCo reporting, and ran an Agile transformation programme for the 34-person delivery team.",
      outcome: "36% improvement in delivery predictability in the first full year. Risk escalation time reduced from 14 days to 48 hours. ExCo confidence in portfolio visibility rated 'high' for the first time in three annual surveys.",
      tags: ["PMO", "Governance", "Agile Transformation", "Power BI", "PRINCE2"],
    },
    {
      id: "simplybusiness-fca",
      title: "FCA Regulatory Programme — Simply Business",
      sector: "Insurance / FinTech",
      year: "2020–22",
      type: "Permanent",
      metric: "£1.2M",
      metricLabel: "Programme delivered",
      challenge: "Following an FCA supervisory review, Simply Business required a structured change programme to address findings across underwriting, claims, and customer communications. The programme had a hard regulatory deadline, a 12-person delivery team across two time-zones, and zero tolerance for compliance deviation.",
      approach: "Stood up a dedicated programme office, established weekly steering with Legal, Compliance and the FCA liaison team. Introduced a risk-first delivery cadence — every sprint began with a compliance risk review before any feature work. Maintained a full audit trail from design decision to production deployment.",
      outcome: "All FCA findings remediated on schedule. Zero compliance breaches across the programme lifecycle. Programme closed with a formal 'no further action' letter from the FCA. Approach adopted as the standard model for future regulatory change at Simply Business.",
      tags: ["FCA", "Regulatory", "Risk Management", "Agile", "Financial Services"],
    },
    {
      id: "sixconnex-sdg",
      title: "UN SDG Energy Mandate — 6Connex",
      sector: "SaaS / Sustainability",
      year: "2018–20",
      type: "Contract",
      metric: "−35%",
      metricLabel: "Energy consumption",
      challenge: "6Connex committed to the UN Global Compact and needed to demonstrate measurable progress against SDG 7 (Affordable and Clean Energy) and SDG 13 (Climate Action). Infrastructure was distributed across three data centres with no baseline measurement, no reduction plan, and no board reporting mechanism.",
      approach: "Established a baseline energy measurement framework, identified the highest-consumption infrastructure components, and built a phased rationalisation roadmap. Introduced quarterly board reporting aligned to UN SDG indicators. Engaged the supply chain on energy certification.",
      outcome: "35% reduction in total energy consumption over 18 months. Recognised by the UN Global Compact Progress Report. Programme approach cited as a case study in the industry body's sustainable tech guidelines.",
      tags: ["Sustainability", "UN SDG", "Infrastructure", "Board Reporting", "ESG"],
    },
    {
      id: "gsma-mobile",
      title: "Mobile Industry Programme — GSMA",
      sector: "Telecoms",
      year: "2018–20",
      type: "Contract",
      metric: "12",
      metricLabel: "Markets delivered",
      challenge: "GSMA required a cross-geography programme to deliver a mobile money interoperability standard across 12 markets in Sub-Saharan Africa and Asia. Each market had different regulatory environments, different technology partners, and different operator relationships.",
      approach: "Designed a federated programme model — central governance and standards, local delivery authority. Built a programme-level risk register with market-by-market dependencies. Established a stakeholder engagement calendar that covered 40+ operator and regulator relationships across the 12 markets.",
      outcome: "All 12 markets delivered within the programme window. Interoperability framework adopted by three additional markets post-programme. Programme recognised in the GSMA's annual Connected Society report.",
      tags: ["Telecoms", "Stakeholder Management", "International", "Standards", "Mobile"],
    },
  ];

  const p = projects[active];

  return (
    <div style={{ fontFamily: "Inter, sans-serif", display: "flex", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
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
          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 32, fontWeight: 400, lineHeight: 1.1, color: paper, marginBottom: 8 }}>Case Studies</div>
          <div style={{ fontSize: 13, color: `hsl(220,15%,50%)`, lineHeight: 1.6 }}>Four mandates in detail — challenge, approach, and measurable outcome.</div>
        </div>

        {/* Project list */}
        <nav style={{ flex: 1 }}>
          {projects.map((proj, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "14px 0 14px 14px",
              background: "none", border: "none", cursor: "pointer",
              borderLeft: active === i ? `2px solid ${brassLight}` : "2px solid hsl(220,20%,22%)",
              marginBottom: 2,
            }}>
              <div style={{ fontSize: 11, fontWeight: active === i ? 600 : 400, color: active === i ? brassLight : `hsl(220,15%,52%)`, marginBottom: 3, letterSpacing: "0.02em" }}>{proj.title}</div>
              <div style={{ fontSize: 10, color: `hsl(220,15%,38%)`, letterSpacing: "0.08em" }}>{proj.sector} · {proj.year}</div>
            </button>
          ))}
        </nav>

        <div style={{ borderTop: `1px solid hsl(220,20%,22%)`, paddingTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
          <a href="#" style={{ fontSize: 12, color: `hsl(220,15%,50%)` }}>← Back to Profile</a>
          <a href="#" style={{ fontSize: 12, color: `hsl(220,15%,50%)` }}>Insights</a>
        </div>
      </aside>

      {/* ── RIGHT PANEL ── */}
      <main style={{ flex: 1, background: paper }}>

        {/* Project header */}
        <div style={{ padding: "52px 64px 44px", borderBottom: `1px solid ${hairline}` }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: brass, border: `1px solid hsl(35,45%,72%)`, padding: "4px 10px" }}>{p.sector}</span>
            <span style={{ fontSize: 11, color: muted }}>{p.year}</span>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: p.type === "Permanent" ? brass : `hsl(200,45%,48%)` }}>{p.type}</span>
          </div>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 44, fontWeight: 400, color: ink, lineHeight: 1.1, marginBottom: 24 }}>{p.title}</h1>
          <div style={{ display: "flex", gap: 48 }}>
            <div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 56, fontWeight: 400, color: brass, lineHeight: 1 }}>{p.metric}</div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: muted, marginTop: 6 }}>{p.metricLabel}</div>
            </div>
          </div>
        </div>

        {/* Three acts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", padding: "52px 64px", gap: 0 }}>
          {[
            { label: "The Challenge", body: p.challenge },
            { label: "The Approach", body: p.approach },
            { label: "The Outcome", body: p.outcome },
          ].map((act, i) => (
            <div key={i} style={{ paddingTop: 36, paddingBottom: 36, borderTop: `1px solid ${hairline}`, display: "grid", gridTemplateColumns: "160px 1fr", gap: 40 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: brass, paddingTop: 4 }}>{act.label}</div>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: `hsl(220,15%,35%)` }}>{act.body}</p>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${hairline}`, paddingTop: 36, display: "grid", gridTemplateColumns: "160px 1fr", gap: 40 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: brass, paddingTop: 4 }}>Technologies</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {p.tags.map((tag, j) => (
                <span key={j} style={{ fontSize: 11, fontWeight: 500, color: ink, border: `1px solid ${hairline}`, padding: "6px 14px", letterSpacing: "0.04em" }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation between projects */}
        <div style={{ padding: "0 64px 60px", display: "flex", justifyContent: "space-between" }}>
          {active > 0
            ? <button onClick={() => setActive(active - 1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: brass }}>← Previous mandate</button>
            : <span />}
          {active < projects.length - 1
            ? <button onClick={() => setActive(active + 1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: brass }}>Next mandate →</button>
            : <span />}
        </div>

      </main>
    </div>
  );
}

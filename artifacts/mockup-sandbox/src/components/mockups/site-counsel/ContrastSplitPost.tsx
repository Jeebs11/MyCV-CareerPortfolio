export default function ContrastSplitPost() {
  const ink = "hsl(220,25%,14%)";
  const paper = "hsl(40,20%,97%)";
  const brass = "hsl(35,45%,45%)";
  const brassLight = "hsl(35,55%,62%)";
  const hairline = "hsl(40,15%,87%)";
  const muted = "hsl(220,12%,52%)";

  return (
    <div style={{ fontFamily: "Inter, sans-serif", display: "flex", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Source+Serif+4:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
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

        {/* Article meta */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: brassLight, marginBottom: 16 }}>Governance</div>
          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 400, lineHeight: 1.3, color: paper, marginBottom: 16 }}>
            Why Most PMOs Fail in Year Two
          </div>
          <div style={{ fontSize: 11, color: `hsl(220,15%,45%)`, marginBottom: 6 }}>12 April 2026</div>
          <div style={{ fontSize: 11, color: `hsl(220,15%,45%)` }}>6 min read</div>
        </div>

        {/* Reading progress / sections */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: `hsl(220,15%,35%)`, marginBottom: 16 }}>In this article</div>
          {["The Year-One Honeymoon", "The Politics of Visibility", "Budget Cycle Survival", "What Good PMOs Do Differently", "Closing Thought"].map((s, i) => (
            <div key={i} style={{ padding: "8px 0 8px 12px", borderLeft: i === 0 ? `2px solid ${brassLight}` : "2px solid hsl(220,20%,22%)", marginBottom: 2, fontSize: 12, color: i === 0 ? brassLight : `hsl(220,15%,48%)`, cursor: "pointer" }}>{s}</div>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ borderTop: `1px solid hsl(220,20%,22%)`, paddingTop: 24 }}>
          <a href="#" style={{ display: "block", fontSize: 12, color: `hsl(220,15%,50%)`, marginBottom: 10 }}>← All Insights</a>
          <a href="#" style={{ display: "block", fontSize: 12, color: `hsl(220,15%,50%)` }}>← Profile</a>
        </div>
      </aside>

      {/* ── RIGHT PANEL ── */}
      <main style={{ flex: 1, background: paper }}>

        {/* Hero */}
        <div style={{ padding: "64px 72px 48px", borderBottom: `1px solid ${hairline}` }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: brass, border: `1px solid hsl(35,45%,72%)`, padding: "4px 10px" }}>Governance</span>
            <span style={{ fontSize: 12, color: muted }}>12 Apr 2026 · 6 min read</span>
          </div>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 52, fontWeight: 400, lineHeight: 1.1, color: ink, marginBottom: 24, maxWidth: 580 }}>
            Why Most PMOs Fail<br />in Year Two
          </h1>
          <p style={{ fontFamily: "Source Serif 4, Georgia, serif", fontSize: 19, fontWeight: 300, fontStyle: "italic", lineHeight: 1.6, color: muted, maxWidth: 560 }}>
            Building a PMO is the easy part. Surviving the second year is where the real programme management happens.
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: "52px 72px", maxWidth: 680 }}>

          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 500, color: ink, marginBottom: 16, marginTop: 0 }}>The Year-One Honeymoon</h2>
          <p style={{ fontFamily: "Source Serif 4, Georgia, serif", fontSize: 16, lineHeight: 1.85, color: `hsl(220,15%,32%)`, marginBottom: 28 }}>
            The first year of any new PMO looks like success. There is visible activity: governance frameworks being built, templates being distributed, dashboards going live. Executives feel reassured. RAG statuses turn green. Everyone is pleased with the investment.
          </p>
          <p style={{ fontFamily: "Source Serif 4, Georgia, serif", fontSize: 16, lineHeight: 1.85, color: `hsl(220,15%,32%)`, marginBottom: 40 }}>
            Then year two begins. The honeymoon ends. The PMO is no longer new — it is overhead. And that is when the real test starts.
          </p>

          {/* Pull quote */}
          <blockquote style={{ borderLeft: `3px solid ${brass}`, paddingLeft: 28, margin: "40px 0", color: ink }}>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 400, fontStyle: "italic", lineHeight: 1.45, color: ink }}>
              "A PMO that cannot articulate its value in terms the CFO understands will not survive its second budget cycle."
            </p>
          </blockquote>

          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 500, color: ink, marginBottom: 16, marginTop: 40 }}>The Politics of Visibility</h2>
          <p style={{ fontFamily: "Source Serif 4, Georgia, serif", fontSize: 16, lineHeight: 1.85, color: `hsl(220,15%,32%)`, marginBottom: 28 }}>
            Most PMOs die from a visibility problem, not a delivery problem. The programmes they govern are running fine. The projects are on track. But nobody in the C-suite can articulate what the PMO actually does, and so in the next restructure, it disappears.
          </p>

          {/* Key insight box */}
          <div style={{ background: `hsl(220,25%,14%)`, padding: "32px 36px", margin: "40px 0" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: brassLight, marginBottom: 16 }}>Key insight</div>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontWeight: 400, color: paper, lineHeight: 1.5 }}>
              Survival requires reframing: from "we track your projects" to "we protect your investment and surface risk before it costs you." The language must change, or the function will not survive.
            </p>
          </div>

          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 500, color: ink, marginBottom: 16, marginTop: 40 }}>Budget Cycle Survival</h2>
          <p style={{ fontFamily: "Source Serif 4, Georgia, serif", fontSize: 16, lineHeight: 1.85, color: `hsl(220,15%,32%)`, marginBottom: 28 }}>
            The annual budget round is when most PMOs are challenged. The question "what did we get for this?" is asked, and if the PMO cannot answer it with hard numbers, it loses headcount.
          </p>
          <p style={{ fontFamily: "Source Serif 4, Georgia, serif", fontSize: 16, lineHeight: 1.85, color: `hsl(220,15%,32%)`, marginBottom: 40 }}>
            When I built the PMO at Mercer, I established outcome metrics in week one — not project metrics, but organisational outcome metrics. Efficiency gain. Risk incidents prevented. Cost avoidance. By the time the first budget challenge came, we had a number: 36% improvement in delivery predictability. That number survived every scrutiny.
          </p>

          {/* Author card */}
          <div style={{ marginTop: 60, paddingTop: 40, borderTop: `1px solid ${hairline}`, display: "flex", gap: 24, alignItems: "start" }}>
            <svg width="48" height="48" viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0 }}>
              <rect width="40" height="40" rx="2" fill={ink} />
              <text x="20" y="28" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="22" fill={paper}>M</text>
            </svg>
            <div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontWeight: 500, color: ink, marginBottom: 4 }}>Mujeeb Lawal</div>
              <div style={{ fontSize: 12, color: muted, marginBottom: 10 }}>Senior Programme Director · 17 years · London / Dubai</div>
              <div style={{ fontSize: 13, color: `hsl(220,15%,42%)`, lineHeight: 1.65 }}>Mujeeb has built PMOs and governed large-scale programmes across financial services, telecoms, insurance, and sustainability.</div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

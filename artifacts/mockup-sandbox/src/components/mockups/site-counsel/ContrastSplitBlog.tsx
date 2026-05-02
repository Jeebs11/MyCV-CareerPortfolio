export default function ContrastSplitBlog() {
  const ink = "hsl(220,25%,14%)";
  const paper = "hsl(40,20%,97%)";
  const brass = "hsl(35,45%,45%)";
  const brassLight = "hsl(35,55%,62%)";
  const hairline = "hsl(40,15%,87%)";
  const muted = "hsl(220,12%,52%)";

  const posts = [
    {
      date: "12 Apr 2026", tag: "Governance",
      title: "Why Most PMOs Fail in Year Two",
      excerpt: "Building a PMO is the easy part. The hard part is making it survive the politics, the budget cycle, and the inevitable 'we don't need this' pushback from senior stakeholders.",
      readTime: "6 min read",
    },
    {
      date: "28 Mar 2026", tag: "Agile at Scale",
      title: "SAFe vs. Spotify: A Practitioner's Honest View",
      excerpt: "After deploying both frameworks across teams of 10 and teams of 300, here's what the consultants selling them won't tell you.",
      readTime: "8 min read",
    },
    {
      date: "15 Feb 2026", tag: "Regulatory Delivery",
      title: "Delivering Under the FCA: What Changes When the Regulator Is in the Room",
      excerpt: "Three years of FCA-governed programmes taught me that regulatory change is not a compliance exercise. It is a trust exercise.",
      readTime: "5 min read",
    },
    {
      date: "2 Jan 2026", tag: "Leadership",
      title: "The Board Pack No One Reads — and How to Fix It",
      excerpt: "Senior stakeholders have twelve minutes for your update. Here is how to design a board pack that makes every one of them count.",
      readTime: "4 min read",
    },
    {
      date: "18 Nov 2025", tag: "Tools",
      title: "Power BI for Programme Directors: Beyond Traffic Lights",
      excerpt: "Most programme dashboards answer the wrong question. This is how to build a Power BI view that surfaces risk before it becomes incident.",
      readTime: "7 min read",
    },
    {
      date: "4 Oct 2025", tag: "Sustainability",
      title: "Aligning Delivery to the UN SDGs: A Practical Framework",
      excerpt: "Sustainability reporting is no longer optional for large organisations. Here is how I structured a measurable, board-reportable ESG delivery framework.",
      readTime: "6 min read",
    },
  ];

  const tags = ["All", "Governance", "Agile at Scale", "Regulatory Delivery", "Leadership", "Tools", "Sustainability"];

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

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 32, fontWeight: 400, lineHeight: 1.1, color: paper, marginBottom: 8 }}>Insights</div>
          <div style={{ fontSize: 13, color: `hsl(220,15%,50%)`, lineHeight: 1.6 }}>Thought leadership on programme delivery, governance, and leading complex change at scale.</div>
        </div>

        {/* Tag filter */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: `hsl(220,15%,40%)`, marginBottom: 16 }}>Filter by topic</div>
          {tags.map((tag, i) => (
            <button key={i} style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "9px 0 9px 12px", background: "none", border: "none", cursor: "pointer",
              fontSize: 12, fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? brassLight : `hsl(220,15%,50%)`,
              borderLeft: i === 0 ? `2px solid ${brassLight}` : "2px solid transparent",
              letterSpacing: "0.04em",
            }}>{tag}</button>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ borderTop: `1px solid hsl(220,20%,22%)`, paddingTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
          <a href="#" style={{ fontSize: 12, color: `hsl(220,15%,50%)` }}>← Back to Profile</a>
          <a href="#" style={{ fontSize: 12, color: `hsl(220,15%,50%)` }}>Case Studies</a>
          <a href="#" style={{ fontSize: 12, color: `hsl(220,15%,50%)` }}>Download CV</a>
        </div>
      </aside>

      {/* ── RIGHT PANEL ── */}
      <main style={{ flex: 1, background: paper, padding: "0" }}>

        {/* Page header */}
        <div style={{ padding: "52px 64px 40px", borderBottom: `1px solid ${hairline}` }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: brass, marginBottom: 12 }}>
            {posts.length} articles
          </div>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 48, fontWeight: 400, color: ink, lineHeight: 1.1 }}>
            Practitioner's Notes
          </h1>
        </div>

        {/* Post list */}
        <div>
          {posts.map((p, i) => (
            <article key={i} style={{ padding: "40px 64px", borderBottom: `1px solid ${hairline}`, cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.background = "hsl(40,18%,94%)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: brass, background: `hsl(35,45%,45%,0.08)`, padding: "4px 10px", border: `1px solid hsl(35,45%,75%)` }}>{p.tag}</span>
                  <span style={{ fontSize: 11, color: muted }}>{p.date}</span>
                </div>
                <span style={{ fontSize: 11, color: muted }}>{p.readTime}</span>
              </div>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 500, color: ink, marginBottom: 10, lineHeight: 1.2 }}>{p.title}</h2>
              <p style={{ fontSize: 14, color: `hsl(220,15%,42%)`, lineHeight: 1.75, maxWidth: 620 }}>{p.excerpt}</p>
              <div style={{ marginTop: 20, fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: brass }}>Read →</div>
            </article>
          ))}
        </div>

      </main>
    </div>
  );
}

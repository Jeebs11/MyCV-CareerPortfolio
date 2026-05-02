export default function InkFoilSite() {
  const ink = "hsl(220,25%,15%)";
  const paper = "hsl(40,20%,97%)";
  const brass = "hsl(35,45%,45%)";
  const brassLight = "hsl(35,55%,62%)";
  const slate = "hsl(220,15%,40%)";
  const muted = "hsl(220,18%,28%)";

  const mandates = [
    {
      num: "01",
      headline: "Built PMO from the ground up",
      client: "Mercer · Financial Services",
      impact: "+36% delivery efficiency",
      detail: "Designed governance, tooling and reporting for a 34-person cross-functional team. Introduced Agile ceremonies across a traditionally waterfall practice.",
    },
    {
      num: "02",
      headline: "FCA-regulated change programme",
      client: "Simply Business · InsureTech",
      impact: "£1.2M delivered on time",
      detail: "Led end-to-end regulatory change across underwriting and claims under tight FCA timelines with zero compliance breaches.",
    },
    {
      num: "03",
      headline: "UN SDG energy reduction",
      client: "6Connex · SaaS / Sustainability",
      impact: "−35% energy consumption",
      detail: "Drove infrastructure rationalisation aligned to UN Sustainable Development Goals, measured and reported quarterly to board.",
    },
  ];

  const career = [
    { year: "2022–24", role: "Head of Projects & PMO", org: "Mercer", type: "Permanent" },
    { year: "2020–22", role: "Senior Programme Manager", org: "Simply Business", type: "Permanent" },
    { year: "2018–20", role: "Programme Manager", org: "GSMA", type: "Contract" },
    { year: "2016–18", role: "Senior Project Manager", org: "6Connex", type: "Contract" },
    { year: "2012–16", role: "Project Manager", org: "Barclays", type: "Permanent" },
    { year: "2008–12", role: "Business Analyst / PM", org: "Accenture", type: "Permanent" },
  ];

  return (
    <div style={{ background: ink, color: paper, fontFamily: "Inter, sans-serif", minHeight: "100vh" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: hsl(220,25%,15%); }
        .cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }
        .hr-brass { border: none; border-top: 1px solid hsl(35,45%,35%); margin: 0; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ borderBottom: `1px solid ${muted}`, padding: "20px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="2" fill={brass} />
            <text x="20" y="28" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="22" fill={paper}>M</text>
          </svg>
          <span style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: paper }}>Mujeeb Lawal</span>
        </div>
        <div style={{ display: "flex", gap: 36 }}>
          {["Mandates", "Career", "Credentials", "Contact"].map(l => (
            <a key={l} href="#" style={{ color: `hsl(220,15%,60%)`, fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ padding: "80px 60px 60px", maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: brassLight, marginBottom: 28 }}>
          Senior Programme Director · Open to New Opportunities
        </div>
        <h1 className="cormorant" style={{ fontSize: 96, fontWeight: 400, lineHeight: 1.0, color: paper, marginBottom: 32, letterSpacing: "-0.01em" }}>
          Mujeeb<br />Lawal
        </h1>
        <p style={{ fontSize: 18, fontWeight: 300, color: `hsl(220,15%,72%)`, maxWidth: 560, lineHeight: 1.6, marginBottom: 52 }}>
          Programme Director specialising in large-scale organisational change, regulatory delivery, and PMO transformation across financial services, telecoms, and insurance.
        </p>

        {/* KPI strip */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0, borderTop: `1px solid ${muted}`, borderBottom: `1px solid ${muted}` }}>
          {[
            { val: "£50M+", label: "Programmes led" },
            { val: "17", label: "Years of practice" },
            { val: "34", label: "Largest team" },
            { val: "7", label: "Industry sectors" },
          ].map((k, i) => (
            <div key={i} style={{ padding: "28px 32px", borderLeft: i > 0 ? `1px solid ${muted}` : "none" }}>
              <div className="cormorant" style={{ fontSize: 52, fontWeight: 500, color: brassLight, lineHeight: 1 }}>{k.val}</div>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: `hsl(220,15%,55%)`, marginTop: 8 }}>{k.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MANDATES ── */}
      <section style={{ padding: "72px 60px", maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 48 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: brassLight, fontWeight: 600 }}>Selected Mandates</div>
          <hr className="hr-brass" style={{ flex: 1 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {mandates.map((m, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr 260px", gap: 0, borderTop: `1px solid ${muted}`, padding: "36px 0", alignItems: "start" }}>
              <div className="cormorant" style={{ fontSize: 48, fontWeight: 400, color: muted, lineHeight: 1 }}>{m.num}</div>
              <div style={{ paddingRight: 40 }}>
                <div className="cormorant" style={{ fontSize: 26, fontWeight: 500, color: paper, marginBottom: 6 }}>{m.headline}</div>
                <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: brassLight, marginBottom: 16, fontWeight: 500 }}>{m.client}</div>
                <div style={{ fontSize: 14, color: `hsl(220,15%,65%)`, lineHeight: 1.7 }}>{m.detail}</div>
              </div>
              <div style={{ background: muted, borderRadius: 2, padding: "20px 24px" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: brassLight, marginBottom: 8, fontWeight: 600 }}>Outcome</div>
                <div className="cormorant" style={{ fontSize: 28, fontWeight: 500, color: brassLight }}>{m.impact}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CAPABILITY BAND ── */}
      <div style={{ background: `hsl(220,25%,11%)`, padding: "52px 60px", margin: "0" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 48 }}>
          {[
            { label: "Methodology", items: ["Agile / SAFe", "PRINCE2 Practitioner", "Waterfall", "Scrum Master"] },
            { label: "Delivery", items: ["PMO Build & Run", "Risk & Governance", "Regulatory Change", "Stakeholder Mgt"] },
            { label: "Tooling", items: ["Jira · Confluence", "Power BI · Tableau", "MS Project", "ServiceNow"] },
            { label: "Scale", items: ["Up to 34-person teams", "Multi-£M budgets", "Cross-geography", "Board reporting"] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: brassLight, marginBottom: 20 }}>{col.label}</div>
              {col.items.map((item, j) => (
                <div key={j} style={{ fontSize: 13, color: `hsl(220,15%,65%)`, lineHeight: 1, padding: "10px 0", borderBottom: `1px solid hsl(220,25%,18%)` }}>{item}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── CAREER ── */}
      <section style={{ padding: "72px 60px", maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 48 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: brassLight, fontWeight: 600 }}>Career Arc</div>
          <hr className="hr-brass" style={{ flex: 1 }} />
        </div>
        {career.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr 110px", alignItems: "center", padding: "18px 0", borderBottom: `1px solid ${muted}` }}>
            <div style={{ fontSize: 12, color: `hsl(220,15%,45%)`, fontWeight: 500, letterSpacing: "0.04em" }}>{r.year}</div>
            <div>
              <span className="cormorant" style={{ fontSize: 20, fontWeight: 500, color: paper, marginRight: 12 }}>{r.role}</span>
              <span style={{ fontSize: 12, color: brassLight }}>· {r.org}</span>
            </div>
            <div style={{
              fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
              color: r.type === "Permanent" ? brassLight : `hsl(200,60%,65%)`,
              textAlign: "right"
            }}>{r.type}</div>
          </div>
        ))}
      </section>

      {/* ── CONTACT ── */}
      <section style={{ background: `hsl(220,25%,11%)`, padding: "60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="cormorant" style={{ fontSize: 40, fontWeight: 400, color: paper, marginBottom: 8 }}>Available for your next mandate.</div>
            <div style={{ fontSize: 13, color: `hsl(220,15%,60%)` }}>London · Dubai · Remote</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "right" }}>
            <a href="mailto:odmlawal@gmail.com" style={{ color: brassLight, fontSize: 14, textDecoration: "none", fontWeight: 500 }}>odmlawal@gmail.com</a>
            <a href="tel:+971509082234" style={{ color: `hsl(220,15%,60%)`, fontSize: 13, textDecoration: "none" }}>+971 50 908 2234</a>
            <a href="https://linkedin.com/in/mujeebola" style={{ color: `hsl(220,15%,60%)`, fontSize: 13, textDecoration: "none" }}>linkedin.com/in/mujeebola</a>
            <div style={{ marginTop: 8 }}>
              <a href="#" style={{ background: brass, color: paper, fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", padding: "12px 28px", textDecoration: "none", display: "inline-block" }}>Download CV</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

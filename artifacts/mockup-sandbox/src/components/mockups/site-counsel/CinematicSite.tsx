export default function CinematicSite() {
  const ink = "hsl(220,28%,12%)";
  const inkMid = "hsl(220,24%,17%)";
  const paper = "hsl(40,20%,97%)";
  const paperWarm = "hsl(40,18%,93%)";
  const brass = "hsl(35,50%,48%)";
  const brassLight = "hsl(35,55%,63%)";
  const cream = "hsl(40,22%,90%)";

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: ink, color: paper }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Source+Serif+4:ital,wght@0,300;0,400;1,300&family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* ── NAV (slim, dark) ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: ink, borderBottom: `1px solid hsl(220,20%,20%)`, padding: "16px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="2" fill={brass} />
            <text x="20" y="28" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="22" fill={paper}>M</text>
          </svg>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: `hsl(220,15%,65%)` }}>Mujeeb Lawal</span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Mandates", "Career", "Contact"].map(l => (
            <a key={l} href="#" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: `hsl(220,15%,55%)`, textDecoration: "none" }}>{l}</a>
          ))}
          <a href="#" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", background: brass, color: paper, padding: "10px 22px", textDecoration: "none" }}>CV</a>
        </div>
      </nav>

      {/* ── CINEMATIC HERO ── */}
      <section style={{ padding: "100px 60px 80px", maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: brassLight, marginBottom: 40, display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ width: 40, height: 1, background: brass, display: "inline-block" }}></span>
          Senior Programme Director · London · Dubai
        </div>

        {/* HUGE NAME */}
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 112, fontWeight: 400, lineHeight: 0.92, letterSpacing: "-0.02em", color: paper, marginBottom: 0 }}>
          Mujeeb
        </h1>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 112, fontWeight: 400, lineHeight: 0.92, letterSpacing: "-0.02em", color: brassLight, marginBottom: 48 }}>
          Lawal.
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end" }}>
          <p style={{ fontFamily: "Source Serif 4, Georgia, serif", fontSize: 19, fontWeight: 300, lineHeight: 1.6, color: `hsl(220,15%,70%)` }}>
            17 years directing complex programmes across financial services, insurance, and telecoms. PRINCE2 Practitioner. Certified Scrum Master. Available Q2 2026.
          </p>
          <div style={{ display: "flex", gap: 0, alignSelf: "end" }}>
            {[
              { n: "£50M+", l: "led" },
              { n: "17", l: "years" },
              { n: "7", l: "sectors" },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, padding: "0 28px", borderLeft: i > 0 ? `1px solid hsl(220,20%,22%)` : "none" }}>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 52, fontWeight: 500, color: paper, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: `hsl(220,15%,45%)`, marginTop: 6 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust logos */}
        <div style={{ marginTop: 64, paddingTop: 40, borderTop: `1px solid hsl(220,20%,20%)`, display: "flex", alignItems: "center", gap: 48 }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: `hsl(220,15%,38%)` }}>Past mandates</div>
          {["Mercer", "GSMA", "Simply Business", "6Connex"].map(c => (
            <div key={c} style={{ fontSize: 14, fontWeight: 600, color: `hsl(220,15%,42%)`, letterSpacing: "0.03em" }}>{c}</div>
          ))}
        </div>
      </section>

      {/* ── ACHIEVEMENT SHOWCASE (dark cards on dark bg) ── */}
      <section style={{ padding: "80px 60px", background: inkMid }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 56 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: brassLight }}>Signature Mandates</div>
            <div style={{ flex: 1, height: 1, background: `hsl(220,20%,22%)` }}></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
            {[
              {
                impact: "+36%", impactLabel: "Efficiency gain",
                title: "PMO Build · Mercer",
                detail: "Built PMO governance and tooling for a 34-person cross-functional team from the ground up. Agile transformation of a historically waterfall practice.",
                year: "2022–24", sector: "Financial Services"
              },
              {
                impact: "£1.2M", impactLabel: "Programme delivered",
                title: "FCA Change · Simply Business",
                detail: "FCA-regulated change programme across underwriting and claims. Zero compliance breaches. Delivered on schedule across a 12-person distributed team.",
                year: "2020–22", sector: "InsureTech"
              },
              {
                impact: "−35%", impactLabel: "Energy reduction",
                title: "UN SDG · 6Connex",
                detail: "Infrastructure rationalisation aligned to UN Sustainable Development Goals. Quarterly board reporting. Recognised by the UN Global Compact.",
                year: "2018–20", sector: "SaaS / Sustainability"
              },
            ].map((m, i) => (
              <div key={i} style={{ background: ink, padding: "44px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 340 }}>
                <div>
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 64, fontWeight: 500, color: brassLight, lineHeight: 1, marginBottom: 4 }}>{m.impact}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: `hsl(220,15%,42%)`, marginBottom: 28 }}>{m.impactLabel}</div>
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontWeight: 500, color: paper, marginBottom: 16 }}>{m.title}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.75, color: `hsl(220,15%,55%)` }}>{m.detail}</div>
                </div>
                <div style={{ marginTop: 32, paddingTop: 20, borderTop: `1px solid hsl(220,20%,20%)`, display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 10, color: `hsl(220,15%,40%)`, letterSpacing: "0.1em" }}>{m.year}</div>
                  <div style={{ fontSize: 10, color: `hsl(220,15%,40%)`, letterSpacing: "0.1em" }}>{m.sector}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS BAND (light break) ── */}
      <section style={{ background: paper, color: ink, padding: "72px 60px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 52 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: brass }}>Capability</div>
            <div style={{ flex: 1, height: 1, background: `hsl(40,15%,84%)` }}></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0 }}>
            {[
              { label: "Methodology", items: ["Agile / SAFe", "PRINCE2 Practitioner", "Waterfall", "Certified Scrum Master"] },
              { label: "Delivery", items: ["PMO Build & Run", "Risk & Governance", "Regulatory Change", "Board Reporting"] },
              { label: "Tooling", items: ["Jira · Confluence", "Power BI · Tableau", "MS Project", "ServiceNow"] },
              { label: "Industry", items: ["Financial Services", "Insurance / RegTech", "Telecoms", "SaaS · Sustainability"] },
            ].map((col, i) => (
              <div key={i} style={{ padding: "0 36px", borderLeft: i > 0 ? `1px solid hsl(40,15%,84%)` : "none" }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: brass, marginBottom: 20 }}>{col.label}</div>
                {col.items.map((item, j) => (
                  <div key={j} style={{ fontSize: 13, color: `hsl(220,18%,35%)`, padding: "10px 0", borderBottom: `1px solid hsl(40,15%,88%)` }}>{item}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAREER (dark again) ── */}
      <section style={{ background: ink, padding: "72px 60px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 52 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: brassLight }}>Career · 2008 – present</div>
            <div style={{ flex: 1, height: 1, background: `hsl(220,20%,22%)` }}></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {[
              { year: "2022–24", role: "Head of Projects & PMO", org: "Mercer", type: "Permanent" },
              { year: "2020–22", role: "Senior Programme Manager", org: "Simply Business", type: "Permanent" },
              { year: "2018–20", role: "Programme Manager", org: "GSMA", type: "Contract" },
              { year: "2016–18", role: "Senior Project Manager", org: "6Connex", type: "Contract" },
              { year: "2014–16", role: "Project Manager", org: "Barclays", type: "Permanent" },
              { year: "2012–14", role: "Senior Business Analyst", org: "Vodafone", type: "Contract" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "24px 28px", borderTop: `1px solid hsl(220,20%,20%)`, borderRight: i % 2 === 0 ? `1px solid hsl(220,20%,20%)` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontWeight: 500, color: paper }}>{r.role}</div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: r.type === "Permanent" ? brassLight : `hsl(200,55%,60%)` }}>{r.type}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 12, color: brassLight, fontWeight: 500 }}>{r.org}</div>
                  <div style={{ fontSize: 12, color: `hsl(220,15%,40%)` }}>{r.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FOOTER ── */}
      <section style={{ background: brass, padding: "72px 60px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: 40 }}>
          <div>
            <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 52, fontWeight: 400, color: paper, lineHeight: 1.1, marginBottom: 16 }}>
              Ready for your<br />next mandate.
            </div>
            <div style={{ fontSize: 12, color: `hsl(35,30%,85%)`, fontWeight: 400 }}>London · Dubai · Remote · Available Q2 2026</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <a href="mailto:odmlawal@gmail.com" style={{ fontSize: 16, color: paper, textDecoration: "none", fontWeight: 500 }}>odmlawal@gmail.com</a>
            <a href="tel:+971509082234" style={{ fontSize: 14, color: `hsl(35,30%,88%)`, textDecoration: "none" }}>+971 50 908 2234</a>
            <a href="https://linkedin.com/in/mujeebola" style={{ fontSize: 14, color: `hsl(35,30%,88%)`, textDecoration: "none" }}>linkedin.com/in/mujeebola</a>
            <div style={{ marginTop: 8 }}>
              <a href="#" style={{ background: ink, color: paper, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "14px 32px", textDecoration: "none", display: "inline-block" }}>Download CV</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

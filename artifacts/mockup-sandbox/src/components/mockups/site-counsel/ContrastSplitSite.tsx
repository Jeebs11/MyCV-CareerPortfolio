import { useState } from "react";

export default function ContrastSplitSite() {
  const [activeSection, setActiveSection] = useState("profile");

  const ink = "hsl(220,25%,14%)";
  const paper = "hsl(40,20%,97%)";
  const brass = "hsl(35,45%,45%)";
  const brassLight = "hsl(35,55%,62%)";
  const hairline = "hsl(40,15%,87%)";

  const nav = [
    { id: "profile", label: "Profile" },
    { id: "mandates", label: "Selected Mandates" },
    { id: "skills", label: "Capability" },
    { id: "career", label: "Career" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div style={{ fontFamily: "Inter, sans-serif", display: "flex", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* ── LEFT PANEL — dark, sticky ── */}
      <aside style={{ width: 340, background: ink, color: paper, position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", padding: "52px 44px", flexShrink: 0, overflowY: "auto" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 52 }}>
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="2" fill={brass} />
            <text x="20" y="28" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="22" fill={paper}>M</text>
          </svg>
        </div>

        {/* Name + title */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 44, fontWeight: 400, lineHeight: 1.05, color: paper, marginBottom: 10 }}>Mujeeb<br />Lawal</div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: brassLight }}>Senior Programme Director</div>
        </div>

        {/* Key stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 44, borderTop: `1px solid hsl(220,20%,25%)` }}>
          {[
            { val: "£50M+", label: "Programmes led" },
            { val: "17 yrs", label: "Experience" },
            { val: "34", label: "Largest team size" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "16px 0", borderBottom: `1px solid hsl(220,20%,25%)`, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: 28, fontWeight: 500, color: brassLight }}>{s.val}</div>
              <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: `hsl(220,15%,50%)` }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1 }}>
          {nav.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "12px 0", background: "none", border: "none", cursor: "pointer",
                fontSize: 11, fontWeight: activeSection === item.id ? 600 : 400,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: activeSection === item.id ? brassLight : `hsl(220,15%,50%)`,
                borderLeft: activeSection === item.id ? `2px solid ${brassLight}` : "2px solid transparent",
                paddingLeft: 12, transition: "all 0.15s"
              }}
            >{item.label}</button>
          ))}
        </nav>

        {/* Contact links */}
        <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 8 }}>
          <a href="mailto:odmlawal@gmail.com" style={{ fontSize: 12, color: `hsl(220,15%,55%)`, textDecoration: "none" }}>odmlawal@gmail.com</a>
          <a href="tel:+971509082234" style={{ fontSize: 12, color: `hsl(220,15%,55%)`, textDecoration: "none" }}>+971 50 908 2234</a>
          <div style={{ marginTop: 12 }}>
            <a href="#" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ink, background: brass, padding: "10px 20px", textDecoration: "none", display: "inline-block" }}>Download CV</a>
          </div>
        </div>
      </aside>

      {/* ── RIGHT PANEL — light, scrollable ── */}
      <main style={{ flex: 1, background: paper, overflowY: "auto", padding: "0" }}>

        {/* Profile */}
        <section style={{ padding: "72px 64px 64px", borderBottom: `1px solid ${hairline}` }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: brass, marginBottom: 20 }}>Profile</div>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 400, lineHeight: 1.5, color: ink, maxWidth: 620, marginBottom: 32 }}>
            "A programme director who builds institutions, not just outputs — governing at scale, delivering under pressure, and leaving infrastructure behind."
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: `hsl(220,15%,40%)`, maxWidth: 600 }}>
            17 years leading complex change across financial services, telecoms, insurance, and sustainability. Comfortable at board level and delivery level simultaneously. PRINCE2 Practitioner, Certified Scrum Master. London and Dubai based.
          </p>
          {/* Trust strip */}
          <div style={{ marginTop: 44, display: "flex", gap: 40, alignItems: "center" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: `hsl(220,15%,55%)` }}>Past employers</div>
            {["Mercer", "GSMA", "Simply Business", "6Connex"].map(c => (
              <div key={c} style={{ fontSize: 13, fontWeight: 600, color: `hsl(220,25%,25%)`, letterSpacing: "0.02em" }}>{c}</div>
            ))}
          </div>
        </section>

        {/* Mandates */}
        <section style={{ padding: "64px", borderBottom: `1px solid ${hairline}` }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: brass, marginBottom: 40 }}>Selected Mandates</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {[
              { num: "01", title: "PMO Build — Mercer", metric: "+36% efficiency", sub: "Financial Services · 2022–24 · Permanent", body: "Built PMO governance, tooling, and reporting framework from scratch for a 34-person cross-functional team. Introduced Agile ceremonies across a historically waterfall practice. Board-level dashboard delivered in week six." },
              { num: "02", title: "FCA Regulatory Programme — Simply Business", metric: "£1.2M on time", sub: "Insurance / FinTech · 2020–22 · Permanent", body: "Led FCA-mandated change across underwriting and claims systems. Zero compliance breaches. Coordinated a 12-person delivery team across two time-zones with full audit trail maintained throughout." },
              { num: "03", title: "UN SDG Energy Mandate — 6Connex", metric: "−35% energy use", sub: "SaaS / Sustainability · 2018–20 · Contract", body: "Infrastructure rationalisation programme aligned to UN SDG targets. Quarterly board reporting against measurable reduction milestones. Recognised by the UN Global Compact reporting framework." },
            ].map((m, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 0 }}>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, fontWeight: 300, color: `hsl(40,15%,82%)`, lineHeight: 1 }}>{m.num}</div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                    <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 500, color: ink }}>{m.title}</div>
                    <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontWeight: 500, color: brass }}>{m.metric}</div>
                  </div>
                  <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: `hsl(220,15%,55%)`, marginBottom: 12 }}>{m.sub}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.75, color: `hsl(220,15%,40%)` }}>{m.body}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Capability */}
        <section style={{ padding: "64px", borderBottom: `1px solid ${hairline}` }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: brass, marginBottom: 40 }}>Capability</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {[
              { label: "Methodology", items: ["Agile / SAFe", "PRINCE2 Practitioner", "Waterfall", "Scrum Master", "MSP"] },
              { label: "Delivery Scale", items: ["PMO Build & Run", "Budget authority: multi-£M", "Team size: up to 34", "Board reporting", "Cross-geography"] },
              { label: "Tooling", items: ["Jira · Confluence", "Power BI · Tableau", "MS Project", "ServiceNow", "Smartsheet"] },
              { label: "Industry", items: ["Financial Services", "Insurance", "Telecoms", "SaaS / Tech", "Sustainability", "Engineering"] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: ink, marginBottom: 16 }}>{col.label}</div>
                {col.items.map((item, j) => (
                  <div key={j} style={{ fontSize: 13, color: `hsl(220,15%,38%)`, padding: "9px 0", borderBottom: `1px solid ${hairline}` }}>{item}</div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Career */}
        <section style={{ padding: "64px", borderBottom: `1px solid ${hairline}` }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: brass, marginBottom: 40 }}>Career</div>
          {[
            { year: "2022–24", role: "Head of Projects & PMO", org: "Mercer", type: "Permanent", note: "Built PMO; 34-person team; board-level governance" },
            { year: "2020–22", role: "Senior Programme Manager", org: "Simply Business", type: "Permanent", note: "FCA compliance delivery; £1.2M programme" },
            { year: "2018–20", role: "Programme Manager", org: "GSMA", type: "Contract", note: "Mobile industry; international multi-team coordination" },
            { year: "2016–18", role: "Senior Project Manager", org: "6Connex", type: "Contract", note: "Sustainability; UN SDG energy reduction programme" },
            { year: "2014–16", role: "Project Manager", org: "Barclays", type: "Permanent", note: "Financial services; regulatory and technology change" },
            { year: "2012–14", role: "Senior Business Analyst", org: "Vodafone", type: "Contract", note: "Telecoms; transformation and systems integration" },
            { year: "2008–12", role: "Business Analyst / PM", org: "Accenture", type: "Permanent", note: "Consulting; public and private sector delivery" },
          ].map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr 90px", alignItems: "start", padding: "18px 0", borderBottom: `1px solid ${hairline}`, gap: 16 }}>
              <div style={{ fontSize: 12, color: `hsl(220,15%,55%)`, fontWeight: 500 }}>{r.year}</div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, fontWeight: 500, color: ink }}>{r.role}</div>
              <div style={{ fontSize: 13, color: `hsl(220,15%,45%)` }}>{r.note}</div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", textAlign: "right", paddingTop: 4,
                color: r.type === "Permanent" ? brass : `hsl(200,55%,45%)` }}>{r.type}</div>
            </div>
          ))}
        </section>

        {/* Education */}
        <section style={{ padding: "64px" }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: brass, marginBottom: 40 }}>Education</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {[
              { deg: "MSc Project Management", inst: "University of Westminster", year: "2010" },
              { deg: "BSc Business Administration", inst: "Lagos State University", year: "2006" },
            ].map((e, i) => (
              <div key={i} style={{ padding: "28px", border: `1px solid ${hairline}` }}>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 500, color: ink, marginBottom: 8 }}>{e.deg}</div>
                <div style={{ fontSize: 12, color: `hsl(220,15%,50%)`, marginBottom: 4 }}>{e.inst}</div>
                <div style={{ fontSize: 11, color: brassLight, fontWeight: 600, letterSpacing: "0.1em" }}>{e.year}</div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

export default function MinimalSite() {
  const ink = "hsl(220,25%,13%)";
  const paper = "hsl(40,18%,98%)";
  const brass = "hsl(35,50%,46%)";
  const slate = "hsl(220,12%,52%)";
  const hairline = "hsl(40,12%,88%)";

  return (
    <div style={{ background: paper, color: ink, fontFamily: "Inter, sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 48px" }}>

        {/* ── TOP BAR ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "36px 0", borderBottom: `1px solid ${hairline}` }}>
          <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="2" fill={ink} />
            <text x="20" y="28" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="22" fill={paper}>M</text>
          </svg>
          <a href="#" style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: slate, textDecoration: "none" }}>Download CV</a>
        </div>

        {/* ── HERO ── */}
        <div style={{ paddingTop: 100, paddingBottom: 80 }}>
          <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: slate, marginBottom: 28 }}>
            Senior Programme Director
          </div>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 80, fontWeight: 300, lineHeight: 1.0, letterSpacing: "-0.01em", color: ink, marginBottom: 40 }}>
            Mujeeb Lawal
          </h1>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 300, fontStyle: "italic", lineHeight: 1.55, color: slate, maxWidth: 560 }}>
            Seventeen years directing complex programmes across financial services, insurance, telecoms, and sustainability. London and Dubai.
          </p>
        </div>

        {/* ── NUMBERS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: `1px solid ${hairline}`, borderBottom: `1px solid ${hairline}` }}>
          {[
            { n: "£50M+", l: "in programmes led" },
            { n: "17", l: "years of practice" },
            { n: "34", l: "largest team directed" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "44px 0", paddingRight: 32, borderLeft: i > 0 ? `1px solid ${hairline}` : "none", paddingLeft: i > 0 ? 32 : 0 }}>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 72, fontWeight: 300, color: brass, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: slate, marginTop: 10 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* ── MANDATES ── */}
        <div style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: slate, marginBottom: 52 }}>Selected Mandates</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              {
                outcome: "+36% efficiency",
                context: "Built PMO from ground up · Mercer · Financial Services · 34-person team",
                body: "Governance, tooling, and board-level reporting infrastructure. Agile transformation of a historically waterfall practice. Delivered inside six months.",
              },
              {
                outcome: "£1.2M delivered",
                context: "FCA-regulated change programme · Simply Business · InsureTech",
                body: "End-to-end regulatory change across underwriting and claims under tight FCA timelines. Zero compliance breaches across the programme lifecycle.",
              },
              {
                outcome: "−35% energy",
                context: "UN SDG mandate · 6Connex · SaaS / Sustainability",
                body: "Infrastructure rationalisation aligned to UN Sustainable Development Goals. Quarterly board measurement and reporting. Recognised by the UN Global Compact.",
              },
            ].map((m, i) => (
              <div key={i} style={{ paddingTop: 40, paddingBottom: 40, borderTop: `1px solid ${hairline}`, display: "grid", gridTemplateColumns: "220px 1fr", gap: 48, alignItems: "start" }}>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 34, fontWeight: 400, color: brass, lineHeight: 1.1 }}>{m.outcome}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: slate, marginBottom: 12 }}>{m.context}</div>
                  <div style={{ fontSize: 15, lineHeight: 1.75, color: `hsl(220,15%,38%)` }}>{m.body}</div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${hairline}` }} />
          </div>
        </div>

        {/* ── CAREER ── */}
        <div style={{ paddingBottom: 80 }}>
          <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: slate, marginBottom: 36 }}>Career</div>
          {[
            { y: "2022–24", r: "Head of Projects & PMO", o: "Mercer", t: "Permanent" },
            { y: "2020–22", r: "Senior Programme Manager", o: "Simply Business", t: "Permanent" },
            { y: "2018–20", r: "Programme Manager", o: "GSMA", t: "Contract" },
            { y: "2016–18", r: "Senior Project Manager", o: "6Connex", t: "Contract" },
            { y: "2014–16", r: "Project Manager", o: "Barclays", t: "Permanent" },
            { y: "2012–14", r: "Senior Business Analyst", o: "Vodafone", t: "Contract" },
            { y: "2010–12", r: "Business Analyst", o: "Accenture", t: "Permanent" },
            { y: "2008–10", r: "Programme Analyst", o: "Unilever", t: "Permanent" },
          ].map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "88px 1fr auto", alignItems: "baseline", padding: "14px 0", borderBottom: `1px solid ${hairline}`, gap: 24 }}>
              <div style={{ fontSize: 12, color: slate, fontWeight: 400, letterSpacing: "0.02em" }}>{r.y}</div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontWeight: 400, color: ink }}>
                {r.r} <span style={{ color: slate, fontWeight: 300 }}>· {r.o}</span>
              </div>
              <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: r.t === "Permanent" ? brass : `hsl(200,45%,48%)` }}>{r.t}</div>
            </div>
          ))}
        </div>

        {/* ── CREDENTIALS ── */}
        <div style={{ paddingBottom: 80, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: slate, marginBottom: 24 }}>Certifications</div>
            {["PRINCE2 Practitioner", "Certified Scrum Master", "MSP — Managing Successful Programmes", "Agile / SAFe"].map((c, i) => (
              <div key={i} style={{ fontSize: 14, color: `hsl(220,15%,38%)`, padding: "10px 0", borderBottom: `1px solid ${hairline}` }}>{c}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: slate, marginBottom: 24 }}>Education</div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontWeight: 400, color: ink, marginBottom: 4 }}>MSc Project Management</div>
              <div style={{ fontSize: 13, color: slate }}>University of Westminster · 2010</div>
            </div>
            <div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontWeight: 400, color: ink, marginBottom: 4 }}>BSc Business Administration</div>
              <div style={{ fontSize: 13, color: slate }}>Lagos State University · 2006</div>
            </div>
          </div>
        </div>

        {/* ── CONTACT ── */}
        <div style={{ borderTop: `1px solid ${hairline}`, padding: "52px 0 72px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "end" }}>
          <div>
            <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, fontWeight: 300, color: ink, lineHeight: 1.2, marginBottom: 12 }}>
              Available for<br />your next mandate.
            </div>
            <div style={{ fontSize: 12, color: slate }}>London · Dubai · Remote</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href="mailto:odmlawal@gmail.com" style={{ fontSize: 14, color: ink, textDecoration: "none", fontWeight: 400 }}>odmlawal@gmail.com</a>
            <a href="tel:+971509082234" style={{ fontSize: 14, color: slate, textDecoration: "none" }}>+971 50 908 2234</a>
            <a href="https://linkedin.com/in/mujeebola" style={{ fontSize: 14, color: slate, textDecoration: "none" }}>linkedin.com/in/mujeebola</a>
          </div>
        </div>

      </div>
    </div>
  );
}

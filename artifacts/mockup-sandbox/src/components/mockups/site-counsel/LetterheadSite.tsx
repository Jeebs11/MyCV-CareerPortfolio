import React from "react";

const LogoSVG = ({ color = "currentColor", size = 280 }) => (
  <svg width={size} viewBox="0 0 280 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 20L40 60" stroke={color} strokeWidth="1.5" strokeLinecap="square"/>
    <path d="M40 20L55 45L70 20" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
    <path d="M70 20L70 60" stroke={color} strokeWidth="1.5" strokeLinecap="square"/>
    <path d="M95 20L95 60L115 60" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
    <text x="135" y="45" fontFamily="'Cormorant Garamond', serif" fontSize="26" fontWeight="300" fill={color} letterSpacing="0.05em">Mujeeb Lawal</text>
    <text x="136" y="60" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="400" fill={color} letterSpacing="0.3em" opacity="0.6">PROGRAMME DIRECTOR</text>
  </svg>
);

const LogoMarkSVG = ({ color = "currentColor", size = 32 }) => (
  <svg width={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 8L6 24" stroke={color} strokeWidth="1.5" strokeLinecap="square"/>
    <path d="M6 8L16 18L26 8" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
    <path d="M26 8L26 24" stroke={color} strokeWidth="1.5" strokeLinecap="square"/>
  </svg>
);

export default function LetterheadSite() {
  const colors = {
    paper: "hsl(40, 20%, 97%)",
    bone: "hsl(40, 25%, 93%)",
    hairline: "hsl(40, 15%, 85%)",
    ink: "hsl(220, 25%, 15%)",
    slate: "hsl(220, 15%, 40%)",
    brass: "hsl(35, 45%, 45%)",
  };

  return (
    <div
      className="w-[1280px] mx-auto pb-32"
      style={{ backgroundColor: colors.paper, color: colors.ink }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;1,8..60,300;1,8..60,400&display=swap');
        
        .font-display {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .font-body {
          font-family: 'Source Serif 4', serif;
        }
        
        .font-sans-custom {
          font-family: 'Inter', sans-serif;
        }

        .hairline-b { border-bottom: 1px solid ${colors.hairline}; }
        .hairline-t { border-top: 1px solid ${colors.hairline}; }
      `,
        }}
      />

      {/* 1. Chrome / Nav */}
      <div className="w-full flex justify-between items-center px-16 pt-16 pb-8">
        <LogoSVG color={colors.ink} size={200} />
        <div className="flex items-center gap-8 font-sans-custom text-[10px] uppercase tracking-[0.2em] font-medium text-[hsl(220,15%,40%)]">
          <span>Mandates</span>
          <span>Capabilities</span>
          <span>Arc</span>
          <button className="px-6 py-2.5 border border-[hsl(220,25%,15%)] text-[hsl(220,25%,15%)] hover:bg-[hsl(220,25%,15%)] hover:text-[hsl(40,20%,97%)] transition-colors">
            Contact
          </button>
        </div>
      </div>

      <div className="w-full px-[200px]">
        {/* 2. Hero */}
        <section className="py-32 text-center flex flex-col items-center">
          <div className="font-sans-custom text-[10px] uppercase tracking-[0.2em] font-medium text-[hsl(220,15%,40%)] mb-8">
            Senior Programme Director
          </div>
          <h1 className="font-display font-medium text-[56px] leading-[1.1] tracking-tight text-[hsl(220,25%,15%)] mb-10 max-w-3xl">
            <span
              style={{
                borderBottom: \`1px solid \${colors.brass}\`,
                paddingBottom: "4px",
              }}
            >
              £50M+
            </span>{" "}
            delivered. 17 years of practice. London / Dubai.
          </h1>
          <p className="font-body text-[16px] italic text-[hsl(220,15%,40%)] mb-12">
            Financial services · Insurance · Telecoms · Engineering ·
            Sustainability
          </p>
          <div className="flex items-center gap-8">
            <button className="px-8 py-3.5 bg-[hsl(220,25%,15%)] text-[hsl(40,20%,97%)] font-sans-custom text-[10px] uppercase tracking-[0.15em]">
              Request Capabilities
            </button>
            <div className="font-sans-custom text-[10px] tracking-wide text-[hsl(220,15%,40%)] uppercase">
              Status: Available from Q1 2026
            </div>
          </div>
        </section>

        {/* 3. Trust Bar */}
        <section className="py-12 hairline-t hairline-b flex items-center justify-center gap-12 font-sans-custom text-[11px] uppercase tracking-[0.25em] text-[hsl(220,15%,40%)]">
          <span>Mercer</span>
          <span className="opacity-40">·</span>
          <span>GSMA</span>
          <span className="opacity-40">·</span>
          <span>Simply Business</span>
          <span className="opacity-40">·</span>
          <span>6Connex</span>
        </section>

        {/* 4. Flagship Mandates */}
        <section className="py-24 text-center">
          <h2 className="font-display text-[28px] text-[hsl(220,25%,15%)] mb-16">
            Signature Mandates
          </h2>
          <div className="flex flex-col gap-12 text-left max-w-2xl mx-auto">
            <div>
              <div className="font-sans-custom text-[10px] uppercase tracking-[0.2em] font-medium text-[hsl(220,15%,40%)] mb-4">
                01 — 2022–2024
              </div>
              <p className="font-body text-[17px] leading-[1.7] text-[hsl(220,25%,15%)]">
                <strong>PMO build, ground-up.</strong> Stood up a new Programme
                Management Office for a regulated insurance carrier. Outcome: 36%
                delivery-efficiency uplift over 18 months. Team of 9.
              </p>
            </div>
            <div className="w-8 h-[1px] bg-[hsl(40,15%,85%)]"></div>
            <div>
              <div className="font-sans-custom text-[10px] uppercase tracking-[0.2em] font-medium text-[hsl(220,15%,40%)] mb-4">
                02 — 2020–2022
              </div>
              <p className="font-body text-[17px] leading-[1.7] text-[hsl(220,25%,15%)]">
                <strong>£1.2M FCA-regulated programme.</strong> Led a 34-person
                multidisciplinary team through end-to-end delivery of an
                FCA-regulated change programme. On time, on budget,
                post-implementation review clean.
              </p>
            </div>
            <div className="w-8 h-[1px] bg-[hsl(40,15%,85%)]"></div>
            <div>
              <div className="font-sans-custom text-[10px] uppercase tracking-[0.2em] font-medium text-[hsl(220,15%,40%)] mb-4">
                03 — 2018–2020
              </div>
              <p className="font-body text-[17px] leading-[1.7] text-[hsl(220,25%,15%)]">
                <strong>UN-aligned sustainability programme.</strong> Delivered an
                energy-reduction programme aligned to UN SDG targets across a
                portfolio of commercial sites. Outcome: 35% reduction in energy
                consumption.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Capability Summary */}
        <section className="py-24 hairline-t">
          <h2 className="font-display text-[28px] text-[hsl(220,25%,15%)] text-center mb-16">
            Capability Summary
          </h2>
          <div className="max-w-2xl mx-auto flex flex-col gap-8">
            <div className="flex items-baseline gap-6">
              <span className="w-32 font-sans-custom text-[10px] uppercase tracking-[0.2em] font-medium text-[hsl(220,15%,40%)]">
                Methodologies
              </span>
              <span className="font-body text-[16px] text-[hsl(220,25%,15%)]">
                Agile · Waterfall · SAFe · PRINCE2
              </span>
            </div>
            <div className="flex items-baseline gap-6">
              <span className="w-32 font-sans-custom text-[10px] uppercase tracking-[0.2em] font-medium text-[hsl(220,15%,40%)]">
                Tools
              </span>
              <span className="font-body text-[16px] text-[hsl(220,25%,15%)]">
                Jira · Confluence · Power BI · Tableau
              </span>
            </div>
            <div className="flex items-baseline gap-6">
              <span className="w-32 font-sans-custom text-[10px] uppercase tracking-[0.2em] font-medium text-[hsl(220,15%,40%)]">
                Certifications
              </span>
              <span className="font-body text-[16px] text-[hsl(220,25%,15%)]">
                PRINCE2 Practitioner · Scrum Master (CSM) · MSP (in progress)
              </span>
            </div>
            <div className="flex items-baseline gap-6">
              <span className="w-32 font-sans-custom text-[10px] uppercase tracking-[0.2em] font-medium text-[hsl(220,15%,40%)]">
                Industries
              </span>
              <span className="font-body text-[16px] text-[hsl(220,25%,15%)]">
                Financial services · Insurance · Telecoms · Engineering ·
                Sustainability · Technology · Public sector
              </span>
            </div>
          </div>
        </section>

        {/* 6. Career Arc */}
        <section className="py-24 hairline-t">
          <h2 className="font-display text-[28px] text-[hsl(220,25%,15%)] text-center mb-16">
            Career Arc
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-[120px_1fr_180px_100px] gap-4 pb-4 font-sans-custom text-[10px] uppercase tracking-[0.2em] font-medium text-[hsl(220,15%,40%)]">
              <div>Period</div>
              <div>Role</div>
              <div>Organisation</div>
              <div className="text-right">Type</div>
            </div>
            <div className="flex flex-col">
              {[
                {
                  period: "2022–2024",
                  role: "Head of Projects & PMO",
                  org: "Mercer",
                  type: "Permanent",
                },
                {
                  period: "2020–2022",
                  role: "Senior Project Manager",
                  org: "GSMA",
                  type: "Contract",
                },
                {
                  period: "2018–2020",
                  role: "Project Manager — Sustainability",
                  org: "(Energy client)",
                  type: "Contract",
                },
                {
                  period: "2016–2018",
                  role: "Project Manager",
                  org: "Simply Business",
                  type: "Permanent",
                },
                {
                  period: "2014–2016",
                  role: "Project Manager",
                  org: "6Connex",
                  type: "Contract",
                },
                {
                  period: "2012–2014",
                  role: "Senior PMO Analyst",
                  org: "(Telecoms client)",
                  type: "Contract",
                },
                {
                  period: "2010–2012",
                  role: "PMO Analyst",
                  org: "(Engineering firm)",
                  type: "Permanent",
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[120px_1fr_180px_100px] gap-4 py-5 hairline-t items-center"
                >
                  <div className="font-sans-custom text-[11px] text-[hsl(220,15%,40%)]">
                    {row.period}
                  </div>
                  <div className="font-body text-[16px] text-[hsl(220,25%,15%)]">
                    {row.role}
                  </div>
                  <div className="font-body text-[16px] italic text-[hsl(220,15%,40%)]">
                    {row.org}
                  </div>
                  <div className="font-sans-custom text-[11px] text-[hsl(220,15%,40%)] text-right">
                    {row.type}
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-[120px_1fr_180px_100px] gap-4 py-5 hairline-t items-center">
                <div className="col-span-4 font-body text-[15px] italic text-[hsl(220,15%,40%)] text-center py-2">
                  + 4 earlier roles, 2008–2014
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Education */}
        <section className="py-16 text-center hairline-t">
          <div className="font-body text-[17px] italic text-[hsl(220,15%,40%)] leading-[2] max-w-xl mx-auto">
            MSc, Project Management — University of Salford
            <br />
            BSc, Civil Engineering — University of Lagos
          </div>
        </section>

        {/* 8. Contact */}
        <section className="pt-24 pb-16 text-center hairline-t">
          <div className="mb-12">
            <LogoMarkSVG color={colors.ink} size={40} />
          </div>
          <div className="font-display text-[24px] text-[hsl(220,25%,15%)] mb-8">
            — ML, London / Dubai
          </div>
          <div className="flex flex-col gap-2 font-sans-custom text-[11px] uppercase tracking-[0.2em] font-medium text-[hsl(220,15%,40%)]">
            <a href="mailto:odmlawal@gmail.com" className="hover:text-[hsl(220,25%,15%)] transition-colors">
              odmlawal@gmail.com
            </a>
            <a href="https://wa.me/971509082234" className="hover:text-[hsl(220,25%,15%)] transition-colors">
              +971 50 908 2234
            </a>
            <a href="https://linkedin.com/in/mujeebola" className="hover:text-[hsl(220,25%,15%)] transition-colors">
              linkedin.com/in/mujeebola
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

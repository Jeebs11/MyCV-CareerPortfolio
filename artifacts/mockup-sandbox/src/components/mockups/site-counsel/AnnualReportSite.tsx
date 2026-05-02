import React from "react";
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Download } from "lucide-react";

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

export default function AnnualReportSite() {
  const colors = {
    paper: "hsl(40, 20%, 97%)",
    bone: "hsl(40, 25%, 93%)",
    hairline: "hsl(40, 15%, 85%)",
    ink: "hsl(220, 25%, 15%)",
    slate: "hsl(220, 15%, 40%)",
    brass: "hsl(35, 45%, 45%)",
  };

  return (
    <div className="w-[1280px] mx-auto min-h-screen relative" style={{ backgroundColor: colors.paper, color: colors.ink }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;1,8..60,300;1,8..60,400&display=swap');
        
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'Source Serif 4', serif; }
        .font-sans-custom { font-family: 'Inter', sans-serif; }
        
        .hairline-t { border-top: 1px solid ${colors.hairline}; }
        .hairline-b { border-bottom: 1px solid ${colors.hairline}; }
        .hairline-l { border-left: 1px solid ${colors.hairline}; }
        .hairline-r { border-right: 1px solid ${colors.hairline}; }
        `
      }} />

      {/* 1. Chrome / Nav */}
      <nav className="w-full flex items-center justify-between px-12 py-8 hairline-b">
        <LogoSVG color={colors.ink} size={240} />
        <div className="flex items-center gap-12 font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)]">
          <a href="#mandates" className="hover:text-[hsl(220,25%,15%)] transition-colors">Mandates</a>
          <a href="#capabilities" className="hover:text-[hsl(220,25%,15%)] transition-colors">Capabilities</a>
          <a href="#career" className="hover:text-[hsl(220,25%,15%)] transition-colors">Career</a>
          <button className="px-6 py-3 bg-[hsl(220,25%,15%)] text-[hsl(40,20%,97%)] font-sans-custom text-[10px] uppercase tracking-[0.2em] transition-colors hover:bg-[hsl(220,25%,20%)]">
            Request Statement
          </button>
        </div>
      </nav>

      {/* 2. Hero */}
      <header className="w-full flex flex-col items-center text-center px-12 pt-32 pb-24 hairline-b">
        <h1 className="font-display font-medium text-[80px] leading-[0.95] tracking-tight mb-8">
          Programme & Portfolio Director
        </h1>
        <p className="font-body text-xl italic text-[hsl(220,15%,40%)] mb-12 max-w-2xl">
          Delivering capital programmes in highly regulated environments. <br />
          Seventeen years. Fifty million pounds. Zero compromises.
        </p>
        <div className="flex items-center gap-12 font-sans-custom text-[11px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)] mb-12">
          <span>£50M+ Delivered</span>
          <span className="w-1 h-1 bg-[hsl(35,45%,45%)] rounded-full"></span>
          <span>17 Years of Practice</span>
          <span className="w-1 h-1 bg-[hsl(35,45%,45%)] rounded-full"></span>
          <span>London / Dubai</span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <button className="px-8 py-4 bg-[hsl(220,25%,15%)] text-[hsl(40,20%,97%)] font-sans-custom text-[10px] uppercase tracking-[0.2em] transition-colors hover:bg-[hsl(220,25%,20%)]">
            Engage for Q1 2026
          </button>
          <span className="font-sans-custom text-[9px] uppercase tracking-widest text-[hsl(220,15%,40%)]">
            Financial services · Insurance · Telecoms · Engineering · Sustainability
          </span>
        </div>
      </header>

      {/* 3. Trust Bar */}
      <div className="w-full flex items-center justify-center gap-16 py-8 hairline-b bg-[hsl(40,25%,93%)] font-sans-custom text-[12px] uppercase tracking-[0.25em] font-medium text-[hsl(220,15%,40%)]">
        <span>Mercer</span>
        <span>GSMA</span>
        <span>Simply Business</span>
        <span>6Connex</span>
      </div>

      <div className="w-full px-12 py-24 flex gap-16">
        {/* Left Margin / Index */}
        <div className="w-32 flex-shrink-0 flex flex-col gap-32 font-display text-lg text-[hsl(35,45%,45%)]">
          <div>§01</div>
        </div>

        {/* 4. Flagship Mandates */}
        <div className="flex-1" id="mandates">
          <h2 className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)] mb-12">
            Selected Mandates & Outcomes
          </h2>

          <div className="grid grid-cols-2 gap-x-16 gap-y-16">
            <div className="flex flex-col gap-4">
              <div className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(35,45%,45%)]">2022–2024</div>
              <h3 className="font-display text-3xl font-medium leading-tight">PMO build, ground-up.</h3>
              <p className="font-body text-base leading-relaxed text-[hsl(220,15%,40%)]">
                Stood up a new Programme Management Office for a regulated insurance carrier. 
              </p>
              <div className="pt-4 hairline-t mt-auto">
                <div className="font-sans-custom text-[9px] uppercase tracking-widest text-[hsl(220,15%,40%)] mb-1">Outcome</div>
                <div className="font-display text-xl">36% delivery-efficiency uplift over 18 months. Team of 9.</div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(35,45%,45%)]">2020–2022</div>
              <h3 className="font-display text-3xl font-medium leading-tight">£1.2M FCA-regulated programme.</h3>
              <p className="font-body text-base leading-relaxed text-[hsl(220,15%,40%)]">
                Led a 34-person multidisciplinary team through end-to-end delivery of an FCA-regulated change programme.
              </p>
              <div className="pt-4 hairline-t mt-auto">
                <div className="font-sans-custom text-[9px] uppercase tracking-widest text-[hsl(220,15%,40%)] mb-1">Outcome</div>
                <div className="font-display text-xl">On time, on budget, post-implementation review clean.</div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(35,45%,45%)]">2018–2020</div>
              <h3 className="font-display text-3xl font-medium leading-tight">UN-aligned sustainability.</h3>
              <p className="font-body text-base leading-relaxed text-[hsl(220,15%,40%)]">
                Delivered an energy-reduction programme aligned to UN SDG targets across a portfolio of commercial sites.
              </p>
              <div className="pt-4 hairline-t mt-auto">
                <div className="font-sans-custom text-[9px] uppercase tracking-widest text-[hsl(220,15%,40%)] mb-1">Outcome</div>
                <div className="font-display text-xl">35% reduction in energy consumption.</div>
              </div>
            </div>

            <div className="flex flex-col gap-4 justify-center bg-[hsl(40,25%,93%)] p-8">
              <div className="font-display text-3xl font-medium italic leading-tight text-[hsl(220,25%,15%)] mb-4">
                "...delivered the £1.2M FCA programme on time, on budget, with a clean post-implementation review."
              </div>
              <div className="font-sans-custom text-[9px] uppercase tracking-widest text-[hsl(220,15%,40%)]">
                — Post-implementation Review, 2022
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-12 py-24 flex gap-16 hairline-t bg-[hsl(40,25%,93%)]">
        {/* Left Margin / Index */}
        <div className="w-32 flex-shrink-0 flex flex-col font-display text-lg text-[hsl(35,45%,45%)]">
          <div>§02</div>
        </div>

        {/* 5. Capability Summary */}
        <div className="flex-1" id="capabilities">
          <h2 className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)] mb-12">
            Capability Matrix
          </h2>
          
          <div className="grid grid-cols-2 gap-x-16 gap-y-16">
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-2xl font-medium">Methodologies</h3>
              <div className="font-sans-custom text-[11px] uppercase tracking-[0.1em] text-[hsl(220,15%,40%)] leading-loose">
                Agile <br/>
                Waterfall <br/>
                SAFe <br/>
                PRINCE2
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-2xl font-medium">Tools</h3>
              <div className="font-sans-custom text-[11px] uppercase tracking-[0.1em] text-[hsl(220,15%,40%)] leading-loose">
                Jira <br/>
                Confluence <br/>
                Power BI <br/>
                Tableau
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="font-display text-2xl font-medium">Certifications</h3>
              <div className="font-sans-custom text-[11px] uppercase tracking-[0.1em] text-[hsl(220,15%,40%)] leading-loose">
                PRINCE2 Practitioner <br/>
                Scrum Master (CSM) <br/>
                MSP (in progress)
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="font-display text-2xl font-medium">Industries (7)</h3>
              <div className="font-sans-custom text-[11px] uppercase tracking-[0.1em] text-[hsl(220,15%,40%)] leading-loose flex gap-8">
                <div>
                  Financial services <br/>
                  Insurance <br/>
                  Telecoms <br/>
                  Engineering
                </div>
                <div>
                  Sustainability <br/>
                  Technology <br/>
                  Public sector
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-12 py-24 flex gap-16 hairline-t">
        {/* Left Margin / Index */}
        <div className="w-32 flex-shrink-0 flex flex-col font-display text-lg text-[hsl(35,45%,45%)]">
          <div>§03</div>
        </div>

        {/* 6. Career Arc & Education */}
        <div className="flex-1 flex gap-16" id="career">
          <div className="flex-1">
            <h2 className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)] mb-12">
              Career Arc (12 Roles, 17 Years)
            </h2>
            <div className="flex flex-col">
              {[
                { period: "2022–2024", role: "Head of Projects & PMO", org: "Mercer", type: "Permanent" },
                { period: "2020–2022", role: "Senior Project Manager", org: "GSMA", type: "Contract" },
                { period: "2018–2020", role: "Project Manager — Sustainability", org: "(Energy client)", type: "Contract" },
                { period: "2016–2018", role: "Project Manager", org: "Simply Business", type: "Permanent" },
                { period: "2014–2016", role: "Project Manager", org: "6Connex", type: "Contract" },
                { period: "2012–2014", role: "Senior PMO Analyst", org: "(Telecoms client)", type: "Contract" },
                { period: "2010–2012", role: "PMO Analyst", org: "(Engineering firm)", type: "Permanent" },
              ].map((job, idx) => (
                <div key={idx} className={`py-6 flex flex-col gap-2 ${idx !== 0 ? 'hairline-t' : ''}`}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-display text-xl font-medium">{job.role}</span>
                    <span className="font-sans-custom text-[10px] uppercase tracking-widest text-[hsl(35,45%,45%)]">{job.period}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-[hsl(220,15%,40%)]">
                    <span className="font-body text-base italic">{job.org}</span>
                    <span className="font-sans-custom text-[9px] uppercase tracking-widest">{job.type}</span>
                  </div>
                </div>
              ))}
              <div className="py-6 hairline-t font-body text-base italic text-[hsl(220,15%,40%)]">
                + 4 earlier roles, 2008–2010
              </div>
            </div>
          </div>
          
          <div className="w-[320px] flex-shrink-0 flex flex-col gap-12">
            <div>
              <h2 className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)] mb-8">
                Education
              </h2>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="font-display text-lg font-medium">MSc, Project Management</span>
                  <span className="font-body text-base italic text-[hsl(220,15%,40%)]">University of Salford</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-display text-lg font-medium">BSc, Civil Engineering</span>
                  <span className="font-body text-base italic text-[hsl(220,15%,40%)]">University of Lagos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Contact & Footer */}
      <footer className="w-full bg-[hsl(220,30%,10%)] text-[hsl(40,20%,97%)] px-12 py-24 flex justify-between items-end">
        <div className="flex flex-col gap-8">
          <LogoSVG color="hsl(40, 20%, 97%)" size={240} />
          <div className="font-body text-lg italic text-white/60">
            Accepting conversations for mandates commencing Q1 2026.
          </div>
          <div className="flex items-center gap-8 font-sans-custom text-[10px] uppercase tracking-[0.15em] text-white/60">
            <a href="mailto:odmlawal@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={12} /> odmlawal@gmail.com
            </a>
            <a href="https://wa.me/971509082234" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={12} /> +971 50 908 2234
            </a>
            <a href="https://linkedin.com/in/mujeebola" className="flex items-center gap-2 hover:text-white transition-colors">
              <Linkedin size={12} /> linkedin.com/in/mujeebola
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={12} /> London / Dubai
            </span>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 items-end">
          <button className="px-8 py-4 border border-[hsl(40,20%,97%)] text-[hsl(40,20%,97%)] font-sans-custom text-[10px] uppercase tracking-[0.2em] transition-colors hover:bg-[hsl(40,20%,97%)] hover:text-[hsl(220,25%,15%)]">
            Request Statement
          </button>
          <div className="font-sans-custom text-[9px] uppercase tracking-widest text-white/40">
            © {new Date().getFullYear()} Mujeeb Lawal
          </div>
        </div>
      </footer>
    </div>
  );
}

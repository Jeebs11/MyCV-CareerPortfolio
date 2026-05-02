import React, { useState, useEffect } from "react";

export default function ChambersSite() {
  const colors = {
    paper: "hsl(40, 20%, 97%)",
    ink: "hsl(220, 25%, 15%)",
    brass: "hsl(35, 45%, 45%)",
    slate: "hsl(220, 15%, 40%)",
    hairline: "hsl(40, 15%, 85%)",
    bone: "hsl(40, 25%, 93%)",
  };

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

  const [activeSection, setActiveSection] = useState("practice");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["practice", "mandates", "capability", "tenures", "education", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 40, behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "practice", label: "Practice" },
    { id: "mandates", label: "Mandates" },
    { id: "capability", label: "Capability" },
    { id: "tenures", label: "Tenures" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div
      className="w-[1280px] mx-auto min-h-screen relative flex items-start"
      style={{
        backgroundColor: colors.paper,
        color: colors.ink,
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;1,8..60,300;1,8..60,400&display=swap');
        
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'Source Serif 4', serif; }
        .font-sans-custom { font-family: 'Inter', sans-serif; }

        .hairline-b { border-bottom: 1px solid ${colors.hairline}; }
        .hairline-t { border-top: 1px solid ${colors.hairline}; }
        .hairline-l { border-left: 1px solid ${colors.hairline}; }
        .hairline-r { border-right: 1px solid ${colors.hairline}; }
      `}} />

      {/* Left Rail (Sticky) */}
      <div className="w-[260px] sticky top-0 h-screen flex flex-col pt-12 pb-12 px-10 hairline-r overflow-y-auto shrink-0">
        <div className="mb-16 -ml-4">
          <LogoSVG color={colors.ink} size={200} />
        </div>
        
        <nav className="flex flex-col gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-left flex items-center gap-4 group"
            >
              <div 
                className="w-1.5 h-1.5 rounded-full transition-colors" 
                style={{ backgroundColor: activeSection === item.id ? colors.brass : "transparent" }}
              />
              <span 
                className="font-sans-custom text-[11px] uppercase tracking-[0.15em] transition-colors"
                style={{ 
                  color: activeSection === item.id ? colors.ink : colors.slate,
                  fontWeight: activeSection === item.id ? 500 : 400
                }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-16 flex flex-col gap-4">
          <button 
            className="w-full py-3 bg-[hsl(220,25%,15%)] text-white font-sans-custom text-[10px] uppercase tracking-[0.15em] hover:bg-[hsl(220,25%,20%)] transition-colors"
            onClick={() => scrollTo('contact')}
          >
            Instruct Counsel
          </button>
          <button 
            className="w-full py-3 border border-[hsl(220,25%,15%)] text-[hsl(220,25%,15%)] bg-transparent font-sans-custom text-[10px] uppercase tracking-[0.15em] hover:bg-[hsl(40,25%,93%)] transition-colors"
          >
            Download C.V.
          </button>
        </div>
      </div>

      {/* Right Reading Panel */}
      <div className="w-[1020px] flex flex-col shrink-0">
        
        {/* Practice / Hero Section */}
        <section id="practice" className="pt-24 pb-20 px-24 hairline-b">
          <div className="max-w-3xl">
            <h1 className="font-display font-medium text-6xl leading-[1.1] mb-12">
              Mujeeb Lawal
              <span className="block font-display italic text-4xl text-[hsl(220,15%,40%)] mt-2 font-normal">
                Programme & Portfolio Director
              </span>
            </h1>
            
            <div className="grid grid-cols-2 gap-x-12 gap-y-8 mb-16 font-body text-base">
              <div className="flex flex-col gap-1">
                <span className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)]">Call to Practice</span>
                <span className="text-[hsl(220,25%,15%)]">2008 (17 Years)</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)]">Mandate Value</span>
                <span className="font-display text-2xl text-[hsl(220,25%,15%)]">£50M+ Delivered</span>
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <span className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)]">Practice Areas</span>
                <span className="text-[hsl(220,25%,15%)] italic">Financial services · Insurance · Telecoms · Engineering · Sustainability</span>
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <span className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)]">Status</span>
                <span className="text-[hsl(220,25%,15%)] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[hsl(35,45%,45%)]"></div>
                  Available for new mandates from Q1 2026
                </span>
              </div>
            </div>

            {/* Trust Bar */}
            <div className="pt-8 hairline-t flex items-center gap-12 font-sans-custom text-[11px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)] opacity-80">
              <span>Mercer</span>
              <span>GSMA</span>
              <span>Simply Business</span>
              <span>6Connex</span>
            </div>
          </div>
        </section>

        {/* Mandates Section */}
        <section id="mandates" className="pt-20 pb-20 px-24 hairline-b">
          <div className="max-w-4xl">
            <h2 className="font-sans-custom text-[11px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)] mb-12">
              Cited Mandates
            </h2>
            
            <div className="flex flex-col">
              {/* Mandate 1 */}
              <div className="py-6 hairline-b first:border-t-0 flex gap-12 group">
                <div className="w-24 shrink-0 font-sans-custom text-[11px] tracking-widest text-[hsl(220,15%,40%)] pt-1">
                  2022–2024
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-4">
                    <span className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)]">Insurance</span>
                    <h3 className="font-display font-medium text-2xl text-[hsl(220,25%,15%)]">PMO build, ground-up</h3>
                  </div>
                  <p className="font-body text-base leading-relaxed text-[hsl(220,25%,15%)] italic">
                    Stood up a new Programme Management Office for a regulated insurance carrier. Team of 9.
                  </p>
                  <p className="font-body text-sm text-[hsl(220,15%,40%)] mt-2">
                    <span className="font-medium text-[hsl(220,25%,15%)]">Outcome:</span> 36% delivery-efficiency uplift over 18 months.
                  </p>
                </div>
              </div>

              {/* Mandate 2 */}
              <div className="py-6 hairline-b flex gap-12 group">
                <div className="w-24 shrink-0 font-sans-custom text-[11px] tracking-widest text-[hsl(220,15%,40%)] pt-1">
                  2020–2022
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-4">
                    <span className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)]">Financial Svcs</span>
                    <h3 className="font-display font-medium text-2xl text-[hsl(220,25%,15%)]">£1.2M FCA-regulated programme</h3>
                  </div>
                  <p className="font-body text-base leading-relaxed text-[hsl(220,25%,15%)] italic">
                    Led a 34-person multidisciplinary team through end-to-end delivery of an FCA-regulated change programme.
                  </p>
                  <p className="font-body text-sm text-[hsl(220,15%,40%)] mt-2">
                    <span className="font-medium text-[hsl(220,25%,15%)]">Outcome:</span> On time, on budget, post-implementation review clean.
                  </p>
                </div>
              </div>

              {/* Mandate 3 */}
              <div className="py-6 flex gap-12 group">
                <div className="w-24 shrink-0 font-sans-custom text-[11px] tracking-widest text-[hsl(220,15%,40%)] pt-1">
                  2018–2020
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-4">
                    <span className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)]">Sustainability</span>
                    <h3 className="font-display font-medium text-2xl text-[hsl(220,25%,15%)]">UN-aligned sustainability programme</h3>
                  </div>
                  <p className="font-body text-base leading-relaxed text-[hsl(220,25%,15%)] italic">
                    Delivered an energy-reduction programme aligned to UN SDG targets across a portfolio of commercial sites.
                  </p>
                  <p className="font-body text-sm text-[hsl(220,15%,40%)] mt-2">
                    <span className="font-medium text-[hsl(220,25%,15%)]">Outcome:</span> 35% reduction in energy consumption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capability Section */}
        <section id="capability" className="pt-20 pb-20 px-24 hairline-b">
          <div className="max-w-4xl">
            <h2 className="font-sans-custom text-[11px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)] mb-12">
              Capability & Admissions
            </h2>
            
            <div className="grid grid-cols-2 gap-y-12 gap-x-16 font-body text-base text-[hsl(220,25%,15%)]">
              
              <div className="flex flex-col gap-4">
                <span className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)]">Methodologies</span>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-3 before:content-[''] before:block before:w-1 before:h-1 before:bg-[hsl(40,15%,85%)] before:rounded-full">Agile</li>
                  <li className="flex items-center gap-3 before:content-[''] before:block before:w-1 before:h-1 before:bg-[hsl(40,15%,85%)] before:rounded-full">Waterfall</li>
                  <li className="flex items-center gap-3 before:content-[''] before:block before:w-1 before:h-1 before:bg-[hsl(40,15%,85%)] before:rounded-full">SAFe</li>
                  <li className="flex items-center gap-3 before:content-[''] before:block before:w-1 before:h-1 before:bg-[hsl(40,15%,85%)] before:rounded-full">PRINCE2</li>
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <span className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)]">Tools</span>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-3 before:content-[''] before:block before:w-1 before:h-1 before:bg-[hsl(40,15%,85%)] before:rounded-full">Jira</li>
                  <li className="flex items-center gap-3 before:content-[''] before:block before:w-1 before:h-1 before:bg-[hsl(40,15%,85%)] before:rounded-full">Confluence</li>
                  <li className="flex items-center gap-3 before:content-[''] before:block before:w-1 before:h-1 before:bg-[hsl(40,15%,85%)] before:rounded-full">Power BI</li>
                  <li className="flex items-center gap-3 before:content-[''] before:block before:w-1 before:h-1 before:bg-[hsl(40,15%,85%)] before:rounded-full">Tableau</li>
                </ul>
              </div>

              <div className="flex flex-col gap-4 col-span-2">
                <span className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)]">Certifications (Bar Admissions)</span>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center justify-between py-2 hairline-b">
                    <span>PRINCE2 Practitioner</span>
                    <span className="font-sans-custom text-[10px] uppercase tracking-widest text-[hsl(220,15%,40%)]">Admitted</span>
                  </li>
                  <li className="flex items-center justify-between py-2 hairline-b">
                    <span>Scrum Master (CSM)</span>
                    <span className="font-sans-custom text-[10px] uppercase tracking-widest text-[hsl(220,15%,40%)]">Admitted</span>
                  </li>
                  <li className="flex items-center justify-between py-2">
                    <span>MSP</span>
                    <span className="font-sans-custom text-[10px] uppercase tracking-widest text-[hsl(35,45%,45%)]">In Progress</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-4 col-span-2">
                <span className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)]">Sectors of Practice (7)</span>
                <div className="flex flex-wrap gap-x-8 gap-y-3 italic text-[hsl(220,15%,40%)]">
                  <span>Financial services</span>
                  <span>Insurance</span>
                  <span>Telecoms</span>
                  <span>Engineering</span>
                  <span>Sustainability</span>
                  <span>Technology</span>
                  <span>Public sector</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Tenures Section */}
        <section id="tenures" className="pt-20 pb-20 px-24 hairline-b bg-[hsl(40,25%,93%)]">
          <div className="max-w-4xl">
            <h2 className="font-sans-custom text-[11px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)] mb-12">
              Tenures & Appointments
            </h2>
            
            <div className="flex flex-col">
              {[
                { period: "2022–2024", role: "Head of Projects & PMO", org: "Mercer", type: "Permanent" },
                { period: "2020–2022", role: "Senior Project Manager", org: "GSMA", type: "Contract" },
                { period: "2018–2020", role: "Project Manager — Sustainability programme", org: "(Energy client)", type: "Contract" },
                { period: "2016–2018", role: "Project Manager", org: "Simply Business", type: "Permanent" },
                { period: "2014–2016", role: "Project Manager", org: "6Connex", type: "Contract" },
                { period: "2012–2014", role: "Senior PMO Analyst", org: "(Telecoms client)", type: "Contract" },
                { period: "2010–2012", role: "PMO Analyst", org: "(Engineering firm)", type: "Permanent" },
              ].map((tenure, i) => (
                <div key={i} className="py-5 hairline-b border-white/40 flex items-center gap-8 font-body text-base group">
                  <div className="w-24 shrink-0 font-sans-custom text-[11px] tracking-widest text-[hsl(220,15%,40%)]">
                    {tenure.period}
                  </div>
                  <div className="flex-1 font-display font-medium text-xl text-[hsl(220,25%,15%)]">
                    {tenure.role}
                  </div>
                  <div className="w-48 shrink-0 text-[hsl(220,15%,40%)] italic">
                    {tenure.org}
                  </div>
                  <div className="w-24 shrink-0 text-right font-sans-custom text-[9px] uppercase tracking-widest text-[hsl(220,15%,40%)]">
                    {tenure.type}
                  </div>
                </div>
              ))}
              
              <div className="py-5 flex items-center gap-8 font-body text-base group opacity-60">
                <div className="w-24 shrink-0 font-sans-custom text-[11px] tracking-widest text-[hsl(220,15%,40%)]">
                  2008–2010
                </div>
                <div className="flex-1 font-display font-medium text-xl text-[hsl(220,25%,15%)]">
                  Junior Project Coordinator
                </div>
                <div className="w-48 shrink-0 text-[hsl(220,15%,40%)] italic">
                  (First role)
                </div>
                <div className="w-24 shrink-0 text-right font-sans-custom text-[9px] uppercase tracking-widest text-[hsl(220,15%,40%)]">
                  Permanent
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="pt-20 pb-20 px-24 hairline-b">
          <div className="max-w-4xl">
            <h2 className="font-sans-custom text-[11px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)] mb-12">
              Education
            </h2>
            
            <div className="flex flex-col gap-8">
              <div className="flex items-baseline gap-12">
                <div className="w-24 shrink-0 font-sans-custom text-[11px] tracking-widest text-[hsl(220,15%,40%)] pt-1">
                  MSc
                </div>
                <div>
                  <h3 className="font-display font-medium text-2xl text-[hsl(220,25%,15%)] mb-1">Project Management</h3>
                  <p className="font-body text-base text-[hsl(220,15%,40%)] italic">University of Salford</p>
                </div>
              </div>
              <div className="flex items-baseline gap-12">
                <div className="w-24 shrink-0 font-sans-custom text-[11px] tracking-widest text-[hsl(220,15%,40%)] pt-1">
                  BSc
                </div>
                <div>
                  <h3 className="font-display font-medium text-2xl text-[hsl(220,25%,15%)] mb-1">Civil Engineering</h3>
                  <p className="font-body text-base text-[hsl(220,15%,40%)] italic">University of Lagos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section & Footer */}
        <section id="contact" className="pt-20 pb-24 px-24">
          <div className="max-w-4xl">
            <h2 className="font-sans-custom text-[11px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)] mb-12">
              Instruct Counsel
            </h2>
            
            <div className="grid grid-cols-2 gap-16 font-body text-base text-[hsl(220,25%,15%)]">
              <div className="flex flex-col gap-8">
                <div>
                  <span className="block font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)] mb-2">Direct Email</span>
                  <a href="mailto:odmlawal@gmail.com" className="font-display text-2xl hover:text-[hsl(35,45%,45%)] transition-colors">odmlawal@gmail.com</a>
                </div>
                <div>
                  <span className="block font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)] mb-2">WhatsApp / Phone</span>
                  <a href="https://wa.me/971509082234" className="font-display text-2xl hover:text-[hsl(35,45%,45%)] transition-colors">+971 50 908 2234</a>
                </div>
              </div>
              
              <div className="flex flex-col gap-8">
                <div>
                  <span className="block font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)] mb-2">Professional Network</span>
                  <a href="https://linkedin.com/in/mujeebola" target="_blank" rel="noreferrer" className="font-display text-2xl hover:text-[hsl(35,45%,45%)] transition-colors underline decoration-[hsl(40,15%,85%)] underline-offset-4">linkedin.com/in/mujeebola</a>
                </div>
                <div>
                  <span className="block font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)] mb-2">Locations</span>
                  <span className="font-display text-2xl italic">London / Dubai</span>
                </div>
              </div>
            </div>

            <div className="mt-32 pt-8 hairline-t flex items-center justify-between font-sans-custom text-[9px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)]">
              <span>&copy; {new Date().getFullYear()} Mujeeb Lawal</span>
              <span>The Senior Counsel</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

import React from "react";
import { ArrowRight, Mail, MapPin, Phone, Briefcase } from "lucide-react";

export default function SeniorCounsel() {
  const colors = {
    paper: "hsl(40, 20%, 97%)",
    ink: "hsl(220, 25%, 15%)",
    brass: "hsl(35, 45%, 45%)",
    slate: "hsl(220, 15%, 40%)",
    hairline: "hsl(40, 15%, 85%)",
    darkSurface: "hsl(220, 30%, 10%)",
    bone: "hsl(40, 25%, 93%)",
  };

  const LogoSVG = ({ className = "", color = "currentColor", size = 280 }: { className?: string, color?: string, size?: number }) => (
    <svg width={size} viewBox="0 0 280 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M40 20L40 60" stroke={color} strokeWidth="1.5" strokeLinecap="square"/>
      <path d="M40 20L55 45L70 20" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
      <path d="M70 20L70 60" stroke={color} strokeWidth="1.5" strokeLinecap="square"/>
      <path d="M95 20L95 60L115 60" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
      <text x="135" y="45" fontFamily="'Cormorant Garamond', serif" fontSize="26" fontWeight="300" fill={color} letterSpacing="0.05em">Mujeeb Lawal</text>
      <text x="136" y="60" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="400" fill={color} letterSpacing="0.3em" opacity="0.6">PROGRAMME DIRECTOR</text>
    </svg>
  );

  const LogoMarkOnlySVG = ({ className = "", color = "currentColor", size = 32 }: { className?: string, color?: string, size?: number }) => (
    <svg width={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 8L6 24" stroke={color} strokeWidth="1.5" strokeLinecap="square"/>
      <path d="M6 8L16 18L26 8" stroke={color} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
      <path d="M26 8L26 24" stroke={color} strokeWidth="1.5" strokeLinecap="square"/>
    </svg>
  );

  return (
    <div
      className="w-[1280px] mx-auto relative flex flex-col items-center pb-32"
      style={{
        backgroundColor: colors.paper,
        color: colors.ink,
      }}
    >
      <style dangerouslySetInnerHTML={{
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
        .hairline-l { border-left: 1px solid ${colors.hairline}; }
        .hairline-r { border-right: 1px solid ${colors.hairline}; }
      `}} />

      {/* 1. DIRECTION HEADER STRIP */}
      <header className="w-full px-16 pt-24 pb-16 hairline-b">
        <div className="max-w-5xl">
          <h1 className="font-display font-medium text-7xl tracking-tight mb-6">
            The Senior Counsel
          </h1>
          <p className="font-sans-custom text-[11px] uppercase tracking-[0.2em] font-medium text-[hsl(220,15%,40%)] mb-8">
            Direction I — Mayfair Partnership Letterhead
          </p>
          <div className="font-body text-xl leading-relaxed text-[hsl(220,25%,20%)] max-w-3xl">
            A brand that operates like a private chambers or elite strategic advisory. 
            The trust signal is restraint. It relies on generous margins, classic serifs, 
            and a single metallic accent to communicate absolute competence. It never sells; 
            it simply presents the facts of an exceptional track record.
          </div>
        </div>
      </header>

      {/* SECTION WRAPPER */}
      <div className="w-full px-16 py-20 flex flex-col gap-32">

        {/* 2. LOGO SPECIMENS */}
        <section>
          <h2 className="font-sans-custom text-[10px] uppercase tracking-[0.25em] font-medium text-[hsl(220,15%,40%)] mb-8">
            01. Identity Marks
          </h2>
          <div className="flex flex-col gap-12">
            {/* Light Surface */}
            <div className="w-full border border-[hsl(40,15%,85%)] bg-[hsl(40,20%,97%)] p-16 flex items-center justify-between">
              <div className="flex flex-col gap-12">
                <div className="flex items-end gap-16">
                  <LogoSVG color={colors.ink} size={320} />
                </div>
                <div className="flex items-center gap-8">
                  <LogoMarkOnlySVG color={colors.ink} size={32} />
                  <span className="font-sans-custom text-[10px] uppercase tracking-widest text-[hsl(220,15%,40%)]">Favicon / Avatar</span>
                </div>
              </div>
              <div className="w-[1px] h-32 bg-[hsl(40,15%,85%)]"></div>
              <div className="w-64">
                <p className="font-body text-sm leading-relaxed text-[hsl(220,15%,40%)] italic">
                  Primary execution. Clean, geometric monogram grounded by a traditional serif wordmark. Absolute clarity.
                </p>
              </div>
            </div>

            {/* Dark Surface */}
            <div className="w-full bg-[hsl(220,30%,10%)] p-16 flex items-center justify-between" style={{ color: colors.paper }}>
              <div className="flex flex-col gap-12">
                <div className="flex items-end gap-16">
                  <LogoSVG color={colors.paper} size={320} />
                </div>
                <div className="flex items-center gap-8">
                  <LogoMarkOnlySVG color={colors.paper} size={32} />
                  <span className="font-sans-custom text-[10px] uppercase tracking-widest opacity-60">Favicon / Avatar</span>
                </div>
              </div>
              <div className="w-[1px] h-32 bg-white/10"></div>
              <div className="w-64">
                <p className="font-body text-sm leading-relaxed opacity-70 italic">
                  Reverse execution for executive reports, slide decks, and digital media where contrast commands focus.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. COLOR PALETTE */}
        <section>
          <h2 className="font-sans-custom text-[10px] uppercase tracking-[0.25em] font-medium text-[hsl(220,15%,40%)] mb-8">
            02. Palette & Materials
          </h2>
          <div className="flex gap-8 mb-12">
            {[
              { name: "Oxford", hex: "#1C2331", bg: colors.ink },
              { name: "Slate", hex: "#565F6E", bg: colors.slate },
              { name: "Antique Brass", hex: "#A68A56", bg: colors.brass },
              { name: "Bone", hex: "#EBE8E1", bg: colors.bone },
              { name: "Cotton", hex: "#F6F5F2", bg: colors.paper },
            ].map((color, i) => (
              <div key={i} className="flex-1 flex flex-col gap-4">
                <div className="w-full aspect-[4/3] border border-black/5" style={{ backgroundColor: color.bg }}></div>
                <div className="flex justify-between items-baseline">
                  <span className="font-display text-lg">{color.name}</span>
                  <span className="font-sans-custom text-[10px] uppercase tracking-widest text-[hsl(220,15%,40%)]">{color.hex}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Neutral Ramp */}
          <div className="flex flex-col gap-3">
            <span className="font-sans-custom text-[10px] uppercase tracking-[0.2em] font-medium text-[hsl(220,15%,40%)]">Oxford Tonal Ramp</span>
            <div className="flex h-12 w-full rounded-sm overflow-hidden border border-black/5">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((weight) => {
                const lightness = 95 - (weight / 900) * 85;
                return (
                  <div key={weight} className="flex-1" style={{ backgroundColor: `hsl(220, 25%, ${lightness}%)` }}></div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. TYPOGRAPHY SPECIMEN */}
        <section>
          <h2 className="font-sans-custom text-[10px] uppercase tracking-[0.25em] font-medium text-[hsl(220,15%,40%)] mb-8">
            03. Typography
          </h2>
          <div className="border border-[hsl(40,15%,85%)] bg-white p-16 flex flex-col gap-12">
            <div>
              <div className="font-sans-custom text-[10px] uppercase tracking-widest text-[hsl(220,15%,40%)] mb-4">Display — Cormorant Garamond</div>
              <div className="font-display text-[72px] leading-none tracking-tight">Mujeeb Lawal</div>
            </div>
            
            <div className="w-full h-[1px] bg-[hsl(40,15%,85%)]"></div>
            
            <div className="flex gap-16">
              <div className="flex-1">
                <div className="font-sans-custom text-[10px] uppercase tracking-widest text-[hsl(220,15%,40%)] mb-4">Role / Sub-headline — Cormorant Garamond Italic</div>
                <div className="font-display italic text-2xl text-[hsl(220,25%,20%)]">Programme & Portfolio Director</div>
              </div>
              <div className="flex-1">
                <div className="font-sans-custom text-[10px] uppercase tracking-widest text-[hsl(220,15%,40%)] mb-4">Caption / Eyebrow — Inter Medium</div>
                <div className="font-sans-custom text-[11px] uppercase tracking-[0.2em] font-medium text-[hsl(220,15%,40%)]">Available Q1 2026</div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[hsl(40,15%,85%)]"></div>

            <div>
              <div className="font-sans-custom text-[10px] uppercase tracking-widest text-[hsl(220,15%,40%)] mb-4">Body — Source Serif 4</div>
              <div className="font-body text-base leading-[1.625] text-[hsl(220,25%,20%)] max-w-2xl">
                Overseeing a £50M+ portfolio of regulated financial services and telecoms engagements. Over 17 years of international delivery experience across London and Dubai, executing Tier-1 partner-grade transformation programmes.
              </div>
            </div>
          </div>
        </section>

        {/* 5. VOICE IN 4 CONTEXTS */}
        <section>
          <h2 className="font-sans-custom text-[10px] uppercase tracking-[0.25em] font-medium text-[hsl(220,15%,40%)] mb-8">
            04. Brand Voice
          </h2>
          <div className="grid grid-cols-2 gap-8">
            {[
              {
                context: "Headline",
                copy: "Delivering capital programmes in highly regulated environments. Seventeen years. Fifty million pounds. Zero compromises."
              },
              {
                context: "Status",
                copy: "Currently concluding an engagement. Accepting conversations for mandates commencing Q1 2026."
              },
              {
                context: "CTA",
                copy: "Request Capabilities Statement"
              },
              {
                context: "Error",
                copy: "The requested document is unavailable. Please return to the homepage or contact my office directly."
              }
            ].map((item, i) => (
              <div key={i} className="border border-[hsl(40,15%,85%)] bg-[hsl(40,25%,93%)] p-10 flex flex-col gap-6">
                <div className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)] font-medium">
                  {item.context}
                </div>
                <div className="font-body text-lg text-[hsl(220,25%,15%)] leading-relaxed italic">
                  "{item.copy}"
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. WEB HERO PREVIEW */}
        <section>
          <h2 className="font-sans-custom text-[10px] uppercase tracking-[0.25em] font-medium text-[hsl(220,15%,40%)] mb-8">
            05. Web Hero Application
          </h2>
          <div className="w-full border border-[hsl(40,15%,85%)] bg-white overflow-hidden flex justify-center py-16 shadow-sm">
            
            {/* The Hero Container */}
            <div className="w-[720px] h-[420px] border border-[hsl(40,15%,85%)] bg-[hsl(40,20%,97%)] relative flex flex-col">
              
              {/* Header */}
              <div className="w-full flex items-center justify-between px-8 py-6 hairline-b">
                <LogoSVG color={colors.ink} size={140} />
                <div className="font-sans-custom text-[9px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)]">London / Dubai</div>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col items-center justify-center px-12 text-center">
                <div className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(35,45%,45%)] font-medium mb-6">
                  Senior Programme Director
                </div>
                
                <h1 className="font-display font-medium text-[42px] leading-[1.1] text-[hsl(220,25%,15%)] mb-6 max-w-lg">
                  £50M+ delivered.<br/>17+ years of practice.
                </h1>

                <p className="font-body text-[15px] italic text-[hsl(220,15%,40%)] mb-8">
                  Financial services · Insurance · Telecoms · Engineering · Sustainability
                </p>

                <div className="flex items-center gap-6">
                  <button className="px-6 py-3 bg-[hsl(220,25%,15%)] text-white font-sans-custom text-[10px] uppercase tracking-[0.15em] hover:bg-[hsl(220,25%,20%)] transition-colors">
                    Request Capabilities
                  </button>
                  <span className="font-sans-custom text-[10px] tracking-wide text-[hsl(220,15%,40%)] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(35,45%,45%)]"></div>
                    Available for new mandates from Q1 2026
                  </span>
                </div>
              </div>

              {/* Trusted By Footer */}
              <div className="w-full flex items-center justify-center gap-8 py-5 hairline-t font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(220,15%,40%)] opacity-70">
                <span>Mercer</span>
                <span className="w-1 h-1 rounded-full bg-[hsl(40,15%,85%)]"></span>
                <span>GSMA</span>
                <span className="w-1 h-1 rounded-full bg-[hsl(40,15%,85%)]"></span>
                <span>Simply Business</span>
                <span className="w-1 h-1 rounded-full bg-[hsl(40,15%,85%)]"></span>
                <span>6Connex</span>
              </div>

            </div>
          </div>
        </section>

        {/* 7. LINKEDIN BANNER */}
        <section>
          <h2 className="font-sans-custom text-[10px] uppercase tracking-[0.25em] font-medium text-[hsl(220,15%,40%)] mb-8">
            06. LinkedIn Banner
          </h2>
          <div className="w-full border border-[hsl(40,15%,85%)] bg-white overflow-hidden flex justify-center py-16 shadow-sm">
            <div className="w-[720px] h-[180px] bg-[hsl(220,30%,10%)] relative flex items-center justify-between px-16 overflow-hidden">
              {/* Subtle background texture/lines */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(to right, ${colors.paper} 1px, transparent 1px)`, backgroundSize: '40px 100%' }}></div>
              
              <div className="relative z-10 flex flex-col text-left">
                <LogoSVG color={colors.paper} size={160} className="mb-4" />
                <div className="font-display italic text-lg text-white/80">Senior Programme Director</div>
              </div>

              <div className="relative z-10 flex flex-col items-end gap-2 text-right">
                <div className="font-sans-custom text-[9px] uppercase tracking-[0.2em] text-[hsl(35,45%,45%)]">
                  £50M+ Delivered · 17+ Years
                </div>
                <div className="font-sans-custom text-[9px] uppercase tracking-[0.15em] text-white/50">
                  London / Dubai
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. EMAIL SIGNATURE */}
        <section>
          <h2 className="font-sans-custom text-[10px] uppercase tracking-[0.25em] font-medium text-[hsl(220,15%,40%)] mb-8">
            07. Email Signature
          </h2>
          <div className="w-full border border-[hsl(40,15%,85%)] bg-white overflow-hidden flex justify-center py-16 shadow-sm">
            <div className="w-[580px] h-[140px] bg-white border border-[hsl(40,15%,85%)] p-6 flex items-center gap-8">
              
              <div className="pr-6 border-r border-[hsl(40,15%,85%)] h-full flex flex-col justify-center">
                <LogoMarkOnlySVG color={colors.ink} size={40} />
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="font-display font-medium text-xl text-[hsl(220,25%,15%)] mb-1">Mujeeb Lawal</div>
                <div className="font-body italic text-sm text-[hsl(220,15%,40%)] mb-3">Senior Project Manager &nbsp;·&nbsp; PMO Lead</div>
                
                <div className="flex items-center gap-4 font-sans-custom text-[10px] text-[hsl(220,15%,40%)] tracking-wide">
                  <span className="flex items-center gap-1.5"><Mail size={10} className="text-[hsl(35,45%,45%)]" /> odmlawal@gmail.com</span>
                  <span className="flex items-center gap-1.5"><Phone size={10} className="text-[hsl(35,45%,45%)]" /> +971 50 908 2234</span>
                  <span className="flex items-center gap-1.5"><MapPin size={10} className="text-[hsl(35,45%,45%)]" /> London / Dubai</span>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

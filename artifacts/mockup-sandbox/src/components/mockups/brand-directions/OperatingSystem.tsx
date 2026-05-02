import React from "react";
import { ArrowRight, Terminal, Globe, Mail, Linkedin, Phone } from "lucide-react";

export default function OperatingSystem() {
  const signalColor = "#00f0ff";
  const bgDark = "#08090a";
  const bgPanel = "#111214";
  const textMuted = "#8a8f98";
  const textBright = "#ededef";

  const LogoSVG = ({ className = "", color = "currentColor", size = 280 }: { className?: string, color?: string, size?: number }) => (
    <svg width={size} height={size * 0.25} viewBox="0 0 280 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="0" y="20" width="30" height="30" fill={color} />
      <rect x="34" y="20" width="8" height="30" fill={color} opacity="0.5" />
      <path d="M60 48V22H68V48H60ZM78 48V22H86V48H78ZM104 49C100.133 49 96.8 47.6667 94 45L99 39C100.6 40.7333 102.467 41.6 104.6 41.6C106.333 41.6 107.2 40.8 107.2 39.2C107.2 37.8667 106.133 37.0667 104 36.8L97.6 35.8C92.4 34.8 89.8 31.8 89.8 26.8C89.8 21.8667 93.4 19.4 100.6 19.4C104.467 19.4 107.667 20.4667 110.2 22.6L105.6 28.2C103.733 26.7333 101.8 26 99.8 26C98.2 26 97.4 26.6667 97.4 28C97.4 29.2 98.333 29.8667 100.2 30.1333L106.6 31.2C112.067 32.1333 114.8 35.1333 114.8 40.2C114.8 45.5333 111.2 49 104 49Z" fill={color}/>
      <text x="125" y="48" fontFamily="Inter" fontWeight="600" fontSize="32" fill={color} letterSpacing="-1">MUJEEB</text>
      <text x="250" y="48" fontFamily="Geist Mono" fontSize="14" fill={color} opacity="0.5">SYS</text>
    </svg>
  );

  const LogoIconSVG = ({ className = "", color = "currentColor", size = 32 }: { className?: string, color?: string, size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="4" width="18" height="24" fill={color} />
      <rect x="24" y="4" width="4" height="24" fill={color} opacity="0.5" />
    </svg>
  );

  return (
    <div 
      className="w-[1280px] mx-auto flex flex-col font-sans relative overflow-hidden"
      style={{ backgroundColor: bgDark, color: textBright }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        
        .font-sans { font-family: 'Inter', sans-serif; letter-spacing: -0.02em; }
        .font-mono { font-family: 'Geist Mono', monospace; font-variant-numeric: tabular-nums; }
        
        .bg-grid {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .border-technical {
          border: 1px solid rgba(255,255,255,0.1);
        }
      `}} />

      {/* 1. DIRECTION HEADER */}
      <section className="px-16 pt-24 pb-16 border-b border-technical bg-grid">
        <div className="max-w-4xl space-y-6">
          <div className="font-mono text-sm tracking-widest text-[#00f0ff] uppercase flex items-center gap-3">
            <span className="w-2 h-2 bg-[#00f0ff] block"></span>
            Direction III
          </div>
          <h1 className="text-7xl font-semibold tracking-tighter text-white">The Operating System</h1>
          <p className="text-2xl font-medium" style={{ color: textMuted }}>
            I run programmes the way a trader runs a book — with a system, not a hope.
          </p>
          <div className="font-mono text-sm leading-relaxed max-w-2xl pt-4" style={{ color: textMuted }}>
            // CONCEPT NARRATIVE<br/>
            Bloomberg Terminal grew up and learned to brand itself. A trader's terminal applied to programme delivery — every metric is a tape, every status is a tick, every section header is a comment line. Dark technical canvas. One high-contrast signal color for live data. Engineer-precise, evidence-rich, no fluff.
          </div>
        </div>
      </section>

      {/* 2. LOGO SPECIMENS */}
      <section className="px-16 py-20 border-b border-technical">
        <div className="font-mono text-xs tracking-widest mb-12" style={{ color: textMuted }}>01 / LOGO SPECIMENS</div>
        
        <div className="grid grid-cols-2 gap-px bg-[#222]">
          {/* Dark Surface */}
          <div className="p-16 flex flex-col items-center justify-center gap-12" style={{ backgroundColor: bgDark }}>
            <LogoSVG color="#ffffff" size={240} />
            <div className="flex items-center gap-8 border-t border-white/10 pt-8 w-full justify-center">
              <LogoIconSVG color="#ffffff" size={32} />
              <LogoIconSVG color={signalColor} size={32} />
            </div>
            <div className="font-mono text-[10px] text-white/40 uppercase mt-auto">Surface: Carbon / #08090A</div>
          </div>
          
          {/* Light Surface */}
          <div className="p-16 flex flex-col items-center justify-center gap-12 bg-[#f4f5f6]">
            <LogoSVG color="#111214" size={240} />
            <div className="flex items-center gap-8 border-t border-black/10 pt-8 w-full justify-center">
              <LogoIconSVG color="#111214" size={32} />
              <LogoIconSVG color="#00a0aa" size={32} />
            </div>
            <div className="font-mono text-[10px] text-black/40 uppercase mt-auto">Surface: Paper / #F4F5F6</div>
          </div>
        </div>
      </section>

      {/* 3. COLOR PALETTE */}
      <section className="px-16 py-20 border-b border-technical">
        <div className="font-mono text-xs tracking-widest mb-12" style={{ color: textMuted }}>02 / COLOR SYSTEM</div>
        
        <div className="flex gap-4 mb-16">
          {[
            { name: "CARBON", hex: "#08090A" },
            { name: "PANEL", hex: "#111214" },
            { name: "SLATE", hex: "#8A8F98" },
            { name: "PAPER", hex: "#EDEDEF" },
            { name: "SIGNAL CYAN", hex: "#00F0FF" },
          ].map((color, i) => (
            <div key={i} className="flex-1 flex flex-col">
              <div className="h-32 w-full rounded-sm border border-white/10" style={{ backgroundColor: color.hex }}></div>
              <div className="mt-4 font-mono text-xs font-medium text-white">{color.name}</div>
              <div className="mt-1 font-mono text-[10px]" style={{ color: textMuted }}>{color.hex}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="font-mono text-[10px]" style={{ color: textMuted }}>NEUTRAL RAMP (CARBON)</div>
          <div className="flex h-12 w-full rounded-sm overflow-hidden border border-white/10">
            {['#FAFAFA', '#F4F5F6', '#E4E5E7', '#D1D3D6', '#A0A3A8', '#6E7279', '#3D4148', '#1A1D21', '#08090A'].map((hex, i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: hex }}></div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TYPOGRAPHY */}
      <section className="px-16 py-20 border-b border-technical">
        <div className="font-mono text-xs tracking-widest mb-12" style={{ color: textMuted }}>03 / TYPOGRAPHY</div>
        
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-4 space-y-8">
            <div>
              <div className="font-mono text-[10px] mb-2" style={{ color: textMuted }}>DISPLAY & BODY / INTER</div>
              <div className="text-2xl font-medium text-white">Inter Tight & Regular</div>
              <div className="text-sm mt-2" style={{ color: textMuted }}>Weights: 400, 500, 600, 700</div>
            </div>
            <div>
              <div className="font-mono text-[10px] mb-2" style={{ color: textMuted }}>DATA & UI / GEIST MONO</div>
              <div className="font-mono text-xl text-white">Geist Mono</div>
              <div className="text-sm mt-2" style={{ color: textMuted }}>Weights: 400, 500</div>
            </div>
          </div>
          
          <div className="col-span-8 bg-[#111214] p-12 border border-white/10 rounded-sm">
            <div className="font-mono text-xs tracking-widest mb-6" style={{ color: signalColor }}>[ SYS.IDENT ]</div>
            <div className="text-[72px] font-semibold leading-none tracking-tighter text-white mb-4">
              Mujeeb Lawal
            </div>
            <div className="text-2xl font-medium mb-8" style={{ color: textMuted }}>
              Senior Programme Director &middot; PMO Lead
            </div>
            <p className="text-base leading-[26px] max-w-2xl font-sans" style={{ color: textBright }}>
              Delivering £50M+ portfolios of regulated financial-services, telecoms, insurance, sustainability and engineering programmes. A top operator turning complex transformations into systematic, predictable delivery engines.
            </p>
            <div className="mt-12 pt-6 border-t border-white/10 flex gap-12 font-mono text-sm">
              <div><span style={{ color: textMuted }}>METRIC_01:</span> 17+ YRS</div>
              <div><span style={{ color: textMuted }}>METRIC_02:</span> £50M+</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VOICE */}
      <section className="px-16 py-20 border-b border-technical">
        <div className="font-mono text-xs tracking-widest mb-12" style={{ color: textMuted }}>04 / BRAND VOICE</div>
        
        <div className="grid grid-cols-2 gap-px bg-[#222]">
          {[
            { label: "HEADLINE", copy: "17 years. £50M+ delivered. Zero escaped programmes." },
            { label: "STATUS", copy: "// availability: Q1 2026. Accepting briefs." },
            { label: "CTA", copy: "[ INITIATE ENGAGEMENT ] -> response expected within 24h." },
            { label: "ERROR", copy: "Request failed (503). Retrying connection to portfolio database." }
          ].map((item, i) => (
            <div key={i} className="p-12 border-technical" style={{ backgroundColor: bgPanel }}>
              <div className="font-mono text-[10px] tracking-[0.2em] mb-6" style={{ color: signalColor }}>{item.label}</div>
              <div className={item.label === "HEADLINE" ? "text-3xl font-semibold tracking-tight text-white" : "font-mono text-sm text-white"}>
                {item.copy}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. WEB HERO */}
      <section className="px-16 py-20 border-b border-technical bg-grid">
        <div className="font-mono text-xs tracking-widest mb-12" style={{ color: textMuted }}>05 / WEB HERO PREVIEW</div>
        
        <div className="w-full max-w-[960px] mx-auto h-[540px] border border-white/20 rounded-md overflow-hidden relative shadow-2xl flex flex-col" style={{ backgroundColor: bgDark }}>
          {/* Browser Chrome */}
          <div className="h-10 border-b border-white/10 bg-[#111214] flex items-center px-4 gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
            </div>
            <div className="h-6 flex-1 bg-black/40 rounded border border-white/5 flex items-center justify-center font-mono text-[10px] text-white/40">
              <Terminal size={12} className="mr-2" />
              system.mujeeblawal.com
            </div>
          </div>

          {/* Hero Content */}
          <div className="flex-1 flex flex-col p-12 justify-center relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="px-3 py-1 font-mono text-[10px] uppercase border border-[#00f0ff]/30 text-[#00f0ff] bg-[#00f0ff]/10 rounded-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#00f0ff] animate-pulse"></span>
                SYS.ONLINE
              </div>
              <div className="font-mono text-[10px] text-white/50">// AVAILABILITY: Q1 2026</div>
            </div>

            <h1 className="text-6xl font-semibold tracking-tighter text-white leading-[1.1] mb-6">
              Programme <br/> &amp; Portfolio Director.
            </h1>
            
            <div className="font-mono text-sm leading-relaxed mb-10 max-w-lg" style={{ color: textMuted }}>
              &gt; 17 years international delivery.<br/>
              &gt; £50M+ portfolio managed.<br/>
              &gt; Sectors: FinServ, Telecoms, Insurance.
            </div>

            <div className="flex items-center gap-6">
              <button className="font-mono text-xs uppercase px-6 py-3 bg-[#00f0ff] text-black font-semibold hover:bg-white transition-colors flex items-center gap-2">
                Initiate Engagement <ArrowRight size={14} />
              </button>
              <button className="font-mono text-xs uppercase px-6 py-3 border border-white/20 text-white hover:bg-white/5 transition-colors">
                View Logs (CV)
              </button>
            </div>
          </div>

          {/* Decorative tech lines */}
          <div className="absolute right-0 top-0 bottom-0 w-64 border-l border-white/5 flex flex-col font-mono text-[8px] text-white/20 p-4 justify-between hidden md:flex z-0">
            <div className="space-y-2">
              <div>[SYS.LOAD] OK</div>
              <div>[MEM.ALLOC] 24%</div>
              <div>[NET.PING] 12ms</div>
            </div>
            <div className="space-y-4 opacity-50">
              <div className="h-px w-full bg-white/20"></div>
              <div>CLIENTS // MERCER, GSMA, SIMPLY BUSINESS</div>
              <div className="h-px w-full bg-white/20"></div>
              <div>LOC // LHR-DXB</div>
            </div>
            <div>
              [VERSION] 17.0.4
            </div>
          </div>
        </div>
      </section>

      {/* 7. LINKEDIN BANNER */}
      <section className="px-16 py-20 border-b border-technical">
        <div className="font-mono text-xs tracking-widest mb-12" style={{ color: textMuted }}>06 / LINKEDIN BANNER</div>
        
        <div className="w-full max-w-[960px] mx-auto h-[240px] border border-white/20 rounded-md overflow-hidden relative flex items-center p-12" style={{ backgroundColor: bgDark }}>
          <div className="absolute inset-0 bg-grid opacity-50"></div>
          
          <div className="relative z-10 flex w-full justify-between items-center">
            <div className="space-y-4">
              <LogoSVG color="#ffffff" size={140} />
              <div className="font-mono text-sm mt-4" style={{ color: signalColor }}>
                // SENIOR PROJECT MANAGER &middot; PMO LEAD
              </div>
              <div className="flex gap-4 font-mono text-[10px] mt-2" style={{ color: textMuted }}>
                <span className="border border-white/10 px-2 py-1">£50M+ DELIVERED</span>
                <span className="border border-white/10 px-2 py-1">17+ YEARS EXP</span>
                <span className="border border-white/10 px-2 py-1">LONDON / DUBAI</span>
              </div>
            </div>
            <div className="font-mono text-[10px] text-right space-y-2 opacity-50 border-l border-white/20 pl-4 py-2 hidden md:block">
              <div>SECTORS:</div>
              <div>FINANCIAL SERVICES</div>
              <div>TELECOMS</div>
              <div>INSURANCE</div>
              <div>ENGINEERING</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. EMAIL SIGNATURE */}
      <section className="px-16 py-20">
        <div className="font-mono text-xs tracking-widest mb-12" style={{ color: textMuted }}>07 / EMAIL SIGNATURE</div>
        
        <div className="w-full max-w-2xl mx-auto p-8 border border-white/20 rounded-md bg-white">
          <div className="flex items-start gap-6 font-sans">
            <div className="w-16 h-16 bg-[#08090A] rounded-sm flex items-center justify-center shrink-0">
              <LogoIconSVG color="#00f0ff" size={24} />
            </div>
            <div className="space-y-1 w-full text-[#111214]">
              <div className="font-semibold text-lg leading-tight tracking-tight">Mujeeb Lawal</div>
              <div className="text-sm text-[#555] font-mono mb-3 uppercase tracking-wider text-[10px]">Senior Programme Director</div>
              <div className="h-px w-full bg-[#eee] my-3"></div>
              
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#666]">
                <div className="flex items-center gap-2">
                  <Globe size={12} color="#00a0aa" /> 
                  <span className="truncate">system.mujeeblawal.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={12} color="#00a0aa" /> 
                  <span>odmlawal@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={12} color="#00a0aa" /> 
                  <span>+971 50 908 2234</span>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin size={12} color="#00a0aa" /> 
                  <span>/in/mujeebola</span>
                </div>
              </div>
              <div className="mt-3 text-[9px] text-[#999] font-mono">
                LOC: LONDON / DUBAI &middot; AVAIL: Q1 2026
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

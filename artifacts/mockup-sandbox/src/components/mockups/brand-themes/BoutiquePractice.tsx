import React from "react";
import { Download, FolderKanban } from "lucide-react";

const BONE = "42 30% 89%";
const FOREST = "145 32% 18%";
const TERRACOTTA = "14 47% 49%";
const WARM_GRAPHITE = "30 6% 16%";

export default function BoutiquePractice() {
  return (
    <div
      className="min-h-screen w-full selection:bg-[#c9bea5]"
      style={{
        backgroundColor: `hsl(${BONE})`,
        color: `hsl(${FOREST})`,
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@300;400;500&display=swap');
        
        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-caveat { font-family: 'Caveat', cursive; }
      `,
        }}
      />

      <div className="max-w-6xl mx-auto px-8 md:px-16 py-16 md:py-24 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        {/* Left Column: Portrait & Signature */}
        <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-end">
          <div className="flex flex-col gap-6 w-full max-w-[400px]">
            {/* Portrait Card */}
            <div
              className="w-full aspect-square border-2 p-3 flex flex-col"
              style={{ borderColor: `hsl(${FOREST})` }}
            >
              <div
                className="w-full h-full flex items-center justify-center relative overflow-hidden group"
                style={{ backgroundColor: `hsl(${WARM_GRAPHITE})` }}
              >
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                  style={{
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/stucco.png")',
                  }}
                />
                <span
                  className="font-fraunces text-8xl md:text-9xl font-light tracking-tighter"
                  style={{ color: `hsl(${BONE})` }}
                >
                  ML
                </span>
              </div>
            </div>

            {/* Caption & Signature */}
            <div className="flex flex-col items-start gap-4 px-2">
              <p
                className="font-fraunces italic text-sm md:text-base opacity-90"
                style={{ color: `hsl(${FOREST})` }}
              >
                Mujeeb Lawal · Practice est. 2008
              </p>
              <div
                className="font-caveat text-4xl md:text-5xl -rotate-2 transform"
                style={{ color: `hsl(${TERRACOTTA})` }}
              >
                — ML
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="w-full lg:w-7/12 flex flex-col gap-12 pt-4">
          
          {/* Eyebrow & Status */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 border-b pb-4" style={{ borderColor: `hsl(${FOREST})` }}>
              <span className="font-inter uppercase tracking-[0.2em] text-xs font-medium">
                MUJEEB LAWAL · INDEPENDENT PRACTICE
              </span>
              <div 
                className="px-3 py-1 text-[10px] uppercase tracking-widest rounded-full border border-opacity-50 ml-auto whitespace-nowrap"
                style={{ 
                  borderColor: `hsl(${FOREST})`,
                  color: `hsl(${FOREST})`
                }}
              >
                OPEN TO NEW OPPORTUNITIES
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="relative -ml-1">
            <h1 className="font-fraunces font-semibold text-[3.5rem] leading-[1.05] tracking-tight">
              <span className="block">Senior</span>
              <span className="block">Project Manager</span>
              <span className="block">
                <span className="italic font-normal" style={{ color: `hsl(${TERRACOTTA})` }}>& Builder </span> 
                of Programmes
              </span>
            </h1>
            
            {/* Compositional Diagonal Hairline */}
            <div 
              className="absolute left-1/2 top-1/2 w-[120px] h-[1px] transform -translate-x-1/2 -translate-y-1/2 -rotate-[20deg]"
              style={{ backgroundColor: `hsl(${TERRACOTTA})` }}
            />
          </div>

          {/* Byline / Proof */}
          <div className="font-inter text-sm md:text-base font-medium opacity-90">
            Senior Program Manager · PMO Lead · £50M+ Delivery · 17+ Years
          </div>

          {/* Pull Quote */}
          <div className="pl-6 border-l-2" style={{ borderColor: `hsl(${WARM_GRAPHITE} / 0.2)` }}>
            <p 
              className="font-fraunces italic text-xl md:text-2xl leading-relaxed"
              style={{ color: `hsl(${WARM_GRAPHITE})` }}
            >
              "Programmes are buildings. They reward patience, plan, and the discipline of not over-engineering."
            </p>
          </div>

          {/* Ledger Table */}
          <div className="flex flex-col mt-4">
            <h3 className="font-inter uppercase tracking-widest text-xs font-semibold mb-6 opacity-70">
              Selected Engagements
            </h3>
            <div className="w-full flex flex-col font-inter text-sm">
              {[
                { year: "2024", client: "Mercer", outcome: "36% efficiency gain · £1.2M PMO build" },
                { year: "2022", client: "Simply Business", outcome: "FCA-regulated platform delivered 4 weeks early" },
                { year: "2020", client: "GSMA", outcome: "35% energy reduction · UN-SDG aligned" },
                { year: "2019", client: "Marsh McLennan", outcome: "£8M cost saved on global migration" },
              ].map((row, i) => (
                <div 
                  key={i} 
                  className="grid grid-cols-[60px_140px_1fr] md:grid-cols-[80px_180px_1fr] py-4 border-b items-baseline gap-4"
                  style={{ borderColor: `hsl(${WARM_GRAPHITE} / 0.2)` }}
                >
                  <span className="font-mono text-xs opacity-60 tabular-nums">{row.year}</span>
                  <span className="font-medium">{row.client}</span>
                  <span className="opacity-80 truncate" title={row.outcome}>{row.outcome}</span>
                </div>
              ))}
            </div>
            
            {/* Trust strip */}
            <div className="flex items-center gap-6 mt-8 font-inter text-xs uppercase tracking-widest opacity-50 flex-wrap">
              <span>Mercer</span>
              <span>·</span>
              <span>GSMA</span>
              <span>·</span>
              <span>Simply Business</span>
              <span>·</span>
              <span>6Connex</span>
            </div>
          </div>

          {/* Actions & Contact */}
          <div className="flex flex-col gap-6 pt-6">
            <div className="flex flex-wrap gap-4">
              <button 
                className="px-8 py-4 font-inter text-sm uppercase tracking-wider font-semibold border-2 transition-all hover:bg-black/5"
                style={{ 
                  borderColor: `hsl(${FOREST})`, 
                  color: `hsl(${FOREST})` 
                }}
              >
                View Selected Work
              </button>
              <button 
                className="px-8 py-4 font-inter text-sm uppercase tracking-wider font-semibold border transition-all hover:bg-black/5"
                style={{ 
                  borderColor: `hsl(${FOREST} / 0.3)`, 
                  color: `hsl(${FOREST})` 
                }}
              >
                Request Dossier
              </button>
            </div>
            
            <div className="font-inter text-xs tracking-wider opacity-80 mt-2 flex flex-wrap gap-3 items-center">
              <a href="mailto:odmlawal@gmail.com" className="hover:opacity-60 transition-opacity">odmlawal@gmail.com</a>
              <span>·</span>
              <a href="#" className="hover:opacity-60 transition-opacity">LinkedIn</a>
              <span>·</span>
              <a href="#" className="hover:opacity-60 transition-opacity">WhatsApp +971 50 908 2234</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

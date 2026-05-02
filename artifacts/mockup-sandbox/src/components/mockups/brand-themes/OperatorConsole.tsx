import React from "react";
import { Download, ArrowRight } from "lucide-react";

export default function OperatorConsole() {
  return (
    <div
      className="min-h-screen w-full flex flex-col font-sans"
      style={{
        backgroundColor: "hsl(225 13% 7%)",
        color: "hsl(48 19% 95%)",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Inter Tight', sans-serif; letter-spacing: -0.03em; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        .pulse-amber {
          animation: pulse-amber 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-amber {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `,
        }}
      />

      {/* CONSOLE HEADER BAR */}
      <header
        className="w-full h-11 flex items-center justify-between px-6 border-b"
        style={{
          backgroundColor: "hsl(225 13% 9%)",
          borderColor: "hsl(225 8% 60% / 0.3)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-2 h-2"
            style={{ backgroundColor: "hsl(173 67% 42%)" }}
          />
          <span
            className="font-mono text-[11px] font-medium tracking-wider"
            style={{ color: "hsl(48 19% 95%)" }}
          >
            ACTIVE &middot; ACCEPTING BRIEFS
          </span>
        </div>
        
        <div
          className="font-mono text-[11px] tracking-widest uppercase hidden sm:block"
          style={{ color: "hsl(225 8% 60%)" }}
        >
          DUBAI / EU / UK
        </div>
        
        <div className="flex items-center gap-3">
          <div
            className="w-1.5 h-1.5 pulse-amber"
            style={{ backgroundColor: "hsl(35 92% 50%)" }}
          />
          <span
            className="font-mono text-[11px]"
            style={{ color: "hsl(225 8% 60%)" }}
          >
            14:42 GST
          </span>
        </div>
      </header>

      {/* MAIN BLOCK */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-16 sm:py-24">
        <div className="w-full max-w-[1080px] flex flex-col gap-12">
          
          <div className="space-y-6">
            <div className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: "hsl(225 8% 60%)" }}>
              MUJEEB LAWAL // PROGRAMME OPERATOR
            </div>
            
            <div className="space-y-2">
              <h1 className="font-display text-5xl sm:text-7xl leading-[0.9] m-0 p-0">
                Senior Project Manager
              </h1>
              <h2 className="font-body font-medium text-lg sm:text-xl m-0 p-0" style={{ color: "hsl(225 8% 60%)" }}>
                Senior Program Manager &nbsp;&middot;&nbsp; PMO Lead
              </h2>
            </div>

            <div className="font-mono text-sm" style={{ color: "hsl(225 8% 60%)" }}>
              £50M+ Delivery &middot; 17+ Years
            </div>
          </div>

          {/* FOUR-CELL NUMERIC GRID & SIDE RAIL */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* GRID */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 border-y border-r" style={{ borderColor: "hsl(225 8% 60% / 0.3)" }}>
              {[
                { val: "£50M+", lbl: "DELIVERED" },
                { val: "17 YRS", lbl: "EXPERIENCE" },
                { val: "12 PROG.", lbl: "LED" },
                { val: "7 SECTORS", lbl: "COVERED" },
              ].map((cell, i) => (
                <div key={i} className="flex flex-col gap-1 py-6 px-4 border-l" style={{ borderColor: "hsl(225 8% 60% / 0.3)" }}>
                  <span className="font-display text-2xl sm:text-3xl">{cell.val}</span>
                  <span className="font-mono text-[10px] sm:text-xs tracking-wider uppercase" style={{ color: "hsl(225 8% 60%)" }}>{cell.lbl}</span>
                </div>
              ))}
            </div>

            {/* SIDE RAIL */}
            <div className="flex flex-row flex-wrap lg:flex-col gap-3 justify-center">
              {["[PRINCE2 P2P]", "[SAFe 6.0]", "[SCRUM MASTER]", "[SIX SIGMA]"].map((cert, i) => (
                <div
                  key={i}
                  className="font-mono text-xs px-3 py-1.5 border"
                  style={{
                    color: "hsl(225 8% 60%)",
                    borderColor: "hsl(173 67% 42% / 0.2)",
                    backgroundColor: "hsl(173 67% 42% / 0.05)"
                  }}
                >
                  {cert}
                </div>
              ))}
            </div>
          </div>

          {/* CTAs & Contact */}
          <div className="space-y-8 mt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                className="font-mono text-sm font-medium px-6 py-4 flex items-center gap-3 transition-colors rounded-sm"
                style={{
                  backgroundColor: "hsl(173 67% 42%)",
                  color: "hsl(225 13% 7%)"
                }}
              >
                BRIEF A PROGRAMME <ArrowRight className="w-4 h-4" />
              </button>

              <button
                className="font-mono text-sm px-6 py-4 flex items-center gap-3 border rounded-sm"
                style={{
                  backgroundColor: "transparent",
                  color: "hsl(48 19% 95%)",
                  borderColor: "hsl(225 8% 60%)"
                }}
              >
                DOWNLOAD CAPABILITIES.PDF
                <span className="text-[10px]" style={{ color: "hsl(225 8% 60%)" }}>[PDF &middot; 240KB]</span>
              </button>
            </div>

            <div className="font-mono text-xs sm:text-sm" style={{ color: "hsl(225 8% 60%)" }}>
              odmlawal@gmail.com &nbsp;&middot;&nbsp; LinkedIn &nbsp;&middot;&nbsp; WhatsApp +971 50 908 2234
            </div>
          </div>

        </div>
      </main>

      {/* BOTTOM TICKER STRIP */}
      <footer
        className="w-full h-8 flex items-center overflow-hidden whitespace-nowrap px-4 border-t"
        style={{
          backgroundColor: "hsl(225 13% 9%)",
          borderColor: "hsl(225 8% 60% / 0.3)",
        }}
      >
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "hsl(225 8% 60%)" }}>
          ENGAGED BY &middot; MERCER &middot; GSMA &middot; SIMPLY BUSINESS &middot; 6CONNEX &middot; MARSH McLENNAN &middot; LLOYD'S &middot; MERCER &middot; GSMA &middot; SIMPLY BUSINESS &middot; 6CONNEX
        </span>
      </footer>
    </div>
  );
}

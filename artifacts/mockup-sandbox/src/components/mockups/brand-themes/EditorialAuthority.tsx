import React from "react";
import { ArrowRight } from "lucide-react";

export default function EditorialAuthority() {
  const colors = {
    paper: "hsl(36 60% 96%)",
    ink: "hsl(24 6% 9%)",
    oxfordRed: "hsl(4 56% 26%)",
    hairline: "hsl(36 18% 82%)",
  };

  return (
    <div
      className="min-h-screen w-full relative flex flex-col"
      style={{
        backgroundColor: colors.paper,
        color: colors.ink,
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400;1,8..60,600&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Source Serif 4', serif; }
        .font-sans-custom { font-family: 'Inter', sans-serif; }
        
        .drop-cap {
          float: left;
          font-size: 5rem;
          line-height: 0.8;
          padding-top: 4px;
          padding-right: 8px;
          padding-bottom: 0;
          color: hsl(4 56% 26%);
          font-family: 'Playfair Display', serif;
          font-weight: 900;
        }

        .hairline-b {
          border-bottom: 1px solid hsl(36 18% 82%);
        }
        .hairline-t {
          border-top: 1px solid hsl(36 18% 82%);
        }
      `,
        }}
      />

      <div className="max-w-7xl mx-auto w-full px-8 py-6 flex flex-col flex-grow">
        {/* Top Masthead Strip */}
        <header className="mb-12">
          <div className="flex justify-between items-end pb-4 hairline-b border-b-2" style={{ borderBottomColor: colors.oxfordRed }}>
            <div
              className="font-sans-custom font-medium text-[11px] uppercase tracking-[0.3em]"
              style={{ color: colors.ink }}
            >
              SPRING 2026 — NO. 12
            </div>
            <div
              className="font-sans-custom font-medium text-[11px] uppercase tracking-[0.3em]"
              style={{ color: colors.ink }}
            >
              DUBAI EDITION
            </div>
          </div>
        </header>

        {/* Main Content Split */}
        <main className="flex flex-col lg:flex-row gap-16 flex-grow">
          {/* Left Column 7/12 */}
          <article className="lg:w-7/12 flex flex-col">
            <div
              className="font-sans-custom font-medium text-[11px] uppercase tracking-[0.3em] mb-6"
              style={{ color: colors.oxfordRed }}
            >
              MUJEEB LAWAL
            </div>

            <div className="mb-6">
              <h1 className="font-display font-black text-6xl leading-[1.1] mb-6">
                <span className="drop-cap">S</span>
                enior Project Manager
              </h1>
              
              <div className="font-display italic text-2xl" style={{ color: colors.ink }}>
                Senior Program Manager &nbsp;·&nbsp; PMO Lead
              </div>
              <div className="font-display italic text-base mt-2 opacity-70" style={{ color: colors.ink }}>
                by Mujeeb Lawal &nbsp;·&nbsp; filed from Dubai
              </div>
            </div>

            <div className="font-body text-lg leading-relaxed mb-8 max-w-prose">
              After overseeing portfolios encompassing{" "}
              <strong className="font-semibold">£50M+ Delivery &nbsp;·&nbsp; 17+ Years</strong>, 
              the imperative remains clear: transformation must outpace the market. 
              Navigating global regulatory landscapes and bridging legacy operations 
              with modern efficiencies defines the modern mandate.
            </div>

            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center mt-4">
              <div 
                className="font-sans-custom font-semibold text-[11px] uppercase tracking-[0.2em] px-3 py-1.5 border border-current"
                style={{ color: colors.oxfordRed, borderColor: colors.oxfordRed }}
              >
                OPEN TO NEW OPPORTUNITIES
              </div>
              
              <div className="flex gap-6">
                <button className="group flex items-center gap-2 font-sans-custom text-[11px] uppercase tracking-[0.2em] font-semibold hover:opacity-80 transition-opacity">
                  DOWNLOAD CV <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: colors.oxfordRed }} />
                </button>
                <button className="group flex items-center gap-2 font-sans-custom text-[11px] uppercase tracking-[0.2em] font-semibold hover:opacity-80 transition-opacity">
                  VIEW PORTFOLIO <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: colors.oxfordRed }} />
                </button>
              </div>
            </div>
          </article>

          {/* Right Column 5/12 */}
          <aside className="lg:w-5/12 flex flex-col pt-2 lg:pl-12 lg:border-l border-[hsl(36_18%_82%)]">
            <div className="mb-10">
              <div className="w-24 h-24 mb-4 flex items-center justify-center border-2" style={{ borderColor: colors.ink }}>
                <span className="font-display font-black text-4xl" style={{ color: colors.ink }}>ML</span>
              </div>
              <div className="font-display italic text-sm opacity-70 mb-8" style={{ color: colors.ink }}>
                Mujeeb Lawal &nbsp;·&nbsp; Programme Director
              </div>

              <div className="font-display italic text-lg leading-loose mb-10" style={{ color: colors.ink }}>
                Insurance &nbsp;·&nbsp; Financial Services<br/>
                Sustainability &nbsp;·&nbsp; Telecoms
              </div>

              <div className="flex flex-col gap-4 font-body text-base">
                <a href="mailto:odmlawal@gmail.com" className="underline hover:text-[hsl(4_56%_26%)] transition-colors w-fit" style={{ textDecorationColor: "currentcolor" }}>
                  odmlawal@gmail.com
                </a>
                <a href="#" className="underline hover:text-[hsl(4_56%_26%)] transition-colors w-fit" style={{ textDecorationColor: "currentcolor" }}>
                  LinkedIn
                </a>
                <a href="#" className="underline hover:text-[hsl(4_56%_26%)] transition-colors w-fit" style={{ textDecorationColor: "currentcolor" }}>
                  WhatsApp +971 50 908 2234
                </a>
              </div>
            </div>
          </aside>
        </main>

        {/* Bottom Stats Strip */}
        <footer className="mt-16">
          <div className="font-sans-custom font-medium text-[10px] uppercase tracking-[0.3em] mb-4 opacity-60">
            ENGAGED BY
          </div>
          <div className="hairline-t pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="font-sans-custom text-[11px] uppercase tracking-[0.2em] opacity-70">MERCER</div>
            <div className="font-sans-custom text-[11px] uppercase tracking-[0.2em] opacity-70">GSMA</div>
            <div className="font-sans-custom text-[11px] uppercase tracking-[0.2em] opacity-70">SIMPLY BUSINESS</div>
            <div className="font-sans-custom text-[11px] uppercase tracking-[0.2em] opacity-70">6CONNEX</div>
          </div>
        </footer>
      </div>
    </div>
  );
}

import React from "react";
import { ChevronDown, Download, FolderKanban, Linkedin, Mail, MessageCircle } from "lucide-react";

// Variant 0 — Baseline: faithful reproduction of the live hero
// (today's neon-cyan-to-blue gradient over dark cosmic background).
// Content Lock is hard-coded; no useQuery / wouter dependencies.

const PRIMARY = "190 85% 55%";
const ACCENT = "220 90% 60%";

export default function Baseline() {
  return (
    <div
      className="min-h-screen w-full font-sans text-white selection:bg-cyan-500/30"
      style={{
        background:
          "radial-gradient(ellipse at top, hsl(225 30% 12%) 0%, hsl(225 35% 6%) 60%, hsl(225 40% 4%) 100%)",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
        .baseline-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        @keyframes baseline-pulse { 0%,100% { opacity:.5 } 50% { opacity:1 } }
        .baseline-pulse { animation: baseline-pulse 3s ease-in-out infinite; }
        @keyframes baseline-bounce { 0%,100% { transform: translate(-50%, 0) } 50% { transform: translate(-50%, 8px) } }
        .baseline-bounce { animation: baseline-bounce 2s ease-in-out infinite; }
      ` }} />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-24">
        <div className="absolute inset-0">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl baseline-pulse"
            style={{ background: `hsl(${PRIMARY} / 0.20)` }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl baseline-pulse"
            style={{ background: `hsl(${ACCENT} / 0.20)`, animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
            style={{ background: "hsl(270 65% 35% / 0.10)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col items-center text-center">
            <div className="space-y-8 max-w-5xl">
              <div className="space-y-6">
                {/* Wordmark */}
                <div className="flex items-center justify-center gap-4">
                  <span
                    className="h-px w-12"
                    style={{ background: `hsl(${PRIMARY} / 0.5)` }}
                  />
                  <span
                    className="baseline-display text-sm font-semibold uppercase"
                    style={{
                      letterSpacing: "0.4em",
                      color: `hsl(${PRIMARY})`,
                    }}
                  >
                    Mujeeb Lawal
                  </span>
                  <span
                    className="h-px w-12"
                    style={{ background: `hsl(${PRIMARY} / 0.5)` }}
                  />
                </div>

                {/* Status pill */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30">
                  <div className="w-2 h-2 rounded-full bg-green-400 baseline-pulse" />
                  <span className="text-sm font-medium text-green-300">
                    Open to new opportunities
                  </span>
                </div>

                {/* Headline cascade */}
                <h1 className="baseline-display font-bold text-white" style={{ lineHeight: 1.05 }}>
                  <span className="block text-6xl lg:text-7xl">Senior Project Manager</span>
                  <span className="block text-4xl lg:text-5xl font-semibold text-white/70 mt-2">
                    Senior Program Manager
                  </span>
                  <span className="block text-4xl lg:text-5xl font-semibold text-white/70 mt-1">
                    PMO Lead
                  </span>
                  <span
                    className="block text-3xl lg:text-5xl mt-3 text-transparent bg-clip-text"
                    style={{
                      backgroundImage: `linear-gradient(90deg, hsl(${PRIMARY}), hsl(${ACCENT}))`,
                    }}
                  >
                    £50M+ Delivery | 17+ Years
                  </span>
                </h1>
              </div>

              {/* CTAs */}
              <div className="flex flex-row flex-wrap gap-3 items-center justify-center">
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-md px-8 py-5 text-base font-semibold text-white border-0 transition-transform hover:-translate-y-px"
                  style={{
                    backgroundImage: `linear-gradient(90deg, hsl(${PRIMARY}), hsl(${ACCENT}))`,
                    boxShadow: `0 0 24px -6px hsl(${PRIMARY} / 0.5)`,
                  }}
                >
                  <Download className="w-5 h-5" /> Download CV
                </button>

                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-md px-8 py-5 text-base font-medium text-white border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors"
                >
                  <FolderKanban className="w-5 h-5" /> View Portfolio
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md px-8 py-5 text-base font-medium text-white border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors"
                >
                  <Mail className="w-5 h-5" /> Get in Touch
                </a>
              </div>

              {/* Contact line */}
              <div className="flex flex-row flex-wrap items-center gap-4 pt-2 text-sm text-white/70 justify-center">
                <a
                  href="mailto:odmlawal@gmail.com"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>odmlawal@gmail.com</span>
                </a>
                <span className="text-white/30">|</span>
                <a
                  href="https://www.linkedin.com/in/mujeeb-lawal-experienced-project-manager/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                </a>
                <span className="text-white/30">|</span>
                <a
                  href="https://wa.me/971509082234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp +971 50 908 2234</span>
                </a>
              </div>
            </div>
          </div>

          <button
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/60 transition-colors baseline-bounce"
            aria-label="Scroll"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>
    </div>
  );
}

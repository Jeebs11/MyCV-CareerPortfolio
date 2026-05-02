import React from "react";

export default function ExecutiveMonochrome() {
  return (
    <div
      className="min-h-screen w-full relative flex flex-col items-center justify-between overflow-hidden"
      style={{
        backgroundColor: "hsl(36 35% 93%)", // Bone
        color: "hsl(215 60% 10%)", // Deep Navy
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@300&display=swap');
        
        .font-display {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          letter-spacing: -0.02em;
        }
        
        .font-mono-custom {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 300;
        }
        
        .font-sans-custom {
          font-family: 'Inter', sans-serif;
        }

        .bg-grid {
          background-size: calc(100% / 12) 100%;
          background-image: linear-gradient(to right, hsl(35 35% 56% / 0.06) 1px, transparent 1px);
        }
      `}} />

      {/* 12-column hairline grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none z-0" />

      {/* TOP */}
      <header className="relative z-10 w-full pt-16 flex flex-col items-center justify-center">
        <h1 className="font-sans-custom font-semibold text-xs tracking-[0.2em] uppercase text-[hsl(215,60%,10%)]">
          Mujeeb Lawal
        </h1>
        <div className="mt-4 w-6 h-[1px] bg-[hsl(35,35%,56%)]" />
      </header>

      {/* CENTER */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-6 max-w-4xl mx-auto py-12">
        
        {/* Status */}
        <div className="mb-12 border border-[hsl(35,35%,56%)]/40 px-4 py-1.5 rounded-[2px]">
          <span className="font-sans-custom text-[10px] font-medium tracking-widest uppercase text-[hsl(215,60%,10%)]">
            Open to new opportunities
          </span>
        </div>

        {/* The Hero Gesture */}
        <div className="flex flex-col md:flex-row items-baseline justify-center mb-16 relative left-[2%]">
          <span className="font-mono-custom text-[200px] md:text-[260px] leading-[0.8] text-[hsl(35,35%,56%)] tracking-tighter">
            17
          </span>
          <span className="font-display italic text-4xl md:text-5xl leading-tight text-[hsl(215,60%,10%)] max-w-[300px] ml-4 relative -top-4 md:-top-8">
            years delivering<br/>capital programmes
          </span>
        </div>

        {/* Roles & Proof */}
        <div className="flex flex-col items-center text-center space-y-5">
          <h2 className="font-display text-4xl md:text-5xl text-[hsl(215,60%,10%)]">
            Senior Project Manager
          </h2>
          
          <div className="font-sans-custom font-medium text-xs tracking-widest uppercase text-[hsl(215,60%,10%)] flex items-center gap-3">
            <span>Senior Program Manager</span>
            <span className="text-[hsl(35,35%,56%)] text-lg leading-none">·</span>
            <span>PMO Lead</span>
          </div>
          
          <div className="font-sans-custom font-normal text-sm text-[hsl(218,45%,20%)] flex items-center gap-2">
            <span>£50M+ Delivery</span>
            <span className="text-[hsl(35,35%,56%)]">·</span>
            <span>17+ Years</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8">
          <button className="group relative flex items-center justify-center bg-[hsl(215,60%,10%)] text-[hsl(36,35%,93%)] px-8 py-4 rounded-[2px] hover:bg-[hsl(215,60%,15%)] transition-colors">
            <span className="font-sans-custom font-medium text-sm tracking-wide">
              Download Capabilities Statement
            </span>
            <span className="ml-3 pl-3 border-l border-[hsl(36,35%,93%)]/20 font-sans-custom font-semibold text-[10px] tracking-wider opacity-70">
              PDF
            </span>
          </button>

          <button className="group relative px-2 py-2 flex flex-col items-center justify-center bg-transparent">
            <span className="font-sans-custom font-medium text-sm tracking-wide text-[hsl(215,60%,10%)]">
              Schedule a Conversation
            </span>
            <span className="absolute bottom-1 w-full h-[1px] bg-[hsl(35,35%,56%)] scale-x-100 origin-left transition-transform group-hover:scale-x-0" />
          </button>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full pb-8 pt-8 flex flex-col items-center">
        {/* Contact */}
        <div className="font-sans-custom text-[11px] font-normal tracking-wide text-[hsl(218,45%,20%)] flex items-center gap-3 mb-10">
          <span>odmlawal@gmail.com</span>
          <span className="text-[hsl(35,35%,56%)] text-base leading-none">·</span>
          <span>LinkedIn</span>
          <span className="text-[hsl(35,35%,56%)] text-base leading-none">·</span>
          <span>WhatsApp +971 50 908 2234</span>
        </div>

        {/* Trust Strip */}
        <div className="w-full max-w-5xl px-6">
          <div className="w-full h-[1px] bg-[hsl(35,35%,56%)]/40 mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-sans-custom text-[10px] tracking-[0.15em] font-medium text-[hsl(218,45%,20%)]">
            <span className="opacity-60">ENGAGED BY</span>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <span>MERCER</span>
              <span className="text-[hsl(35,35%,56%)] text-sm leading-none opacity-60">·</span>
              <span>GSMA</span>
              <span className="text-[hsl(35,35%,56%)] text-sm leading-none opacity-60">·</span>
              <span>SIMPLY BUSINESS</span>
              <span className="text-[hsl(35,35%,56%)] text-sm leading-none opacity-60">·</span>
              <span>6CONNEX</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

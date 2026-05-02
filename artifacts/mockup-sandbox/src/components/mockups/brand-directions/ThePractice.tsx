import React from "react";

export function ThePractice() {
  return (
    <div className="w-[1280px] mx-auto bg-[#0A0A0A] text-[#EDEDED] font-sans antialiased selection:bg-[#FF3B00] selection:text-white">
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
          .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }
          .font-body { font-family: 'Inter', sans-serif; }
        `
      }} />

      {/* Grid Background overlay for texture */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: 'linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10 p-24 flex flex-col gap-32">
        
        {/* 1. Direction header strip */}
        <section className="flex flex-col gap-6 border-b border-[#333] pb-16">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-[#FF3B00] rounded-full"></div>
            <span className="font-display text-sm tracking-[0.2em] text-[#A0A0A0] uppercase">Direction II</span>
          </div>
          <h1 className="font-display text-8xl font-light tracking-tight text-white">The Practice.</h1>
          <p className="font-display text-3xl font-light text-[#A0A0A0] tracking-tight mt-4">
            A boutique strategic advisory practice so precise, clients wait.
          </p>
          <div className="max-w-3xl mt-4">
            <p className="font-body text-lg text-[#888] leading-relaxed">
              This direction positions you not as a contractor, but as a senior partner of an elite one-person firm. 
              The aesthetic borrows from blue-chip strategic advisory and top-tier tech enterprise tiers. 
              Quiet near-monochrome canvas. Extreme whitespace. One jarringly saturated accent color to signal absolute confidence. 
              Statements over promises.
            </p>
          </div>
        </section>

        {/* 2. Logo specimens */}
        <section className="flex flex-col gap-12">
          <header>
            <h2 className="font-display text-sm tracking-[0.2em] text-[#A0A0A0] uppercase mb-4">01 / Identity Marks</h2>
          </header>

          <div className="grid grid-cols-2 gap-8">
            {/* Concept A: Geometric Monogram */}
            <div className="flex flex-col gap-4">
              <div className="h-[400px] bg-[#141414] rounded-sm flex items-center justify-center border border-[#222] relative group">
                <div className="absolute top-6 left-6 font-body text-xs text-[#666] uppercase tracking-widest">Concept A / Primary</div>
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 100V20L60 60L100 20V100" stroke="#EDEDED" strokeWidth="8" strokeMiterlimit="10" strokeLinecap="square"/>
                  <rect x="52" y="76" width="16" height="16" fill="#FF3B00"/>
                </svg>
              </div>
              <div className="flex gap-4">
                <div className="h-32 flex-1 bg-white rounded-sm flex items-center justify-center relative">
                   <div className="absolute top-3 left-3 font-body text-[10px] text-[#999] uppercase tracking-widest">Light Surface</div>
                   <svg width="60" height="60" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 100V20L60 60L100 20V100" stroke="#0A0A0A" strokeWidth="8" strokeMiterlimit="10" strokeLinecap="square"/>
                    <rect x="52" y="76" width="16" height="16" fill="#FF3B00"/>
                  </svg>
                </div>
                <div className="h-32 flex-1 bg-[#141414] rounded-sm flex items-center justify-center border border-[#222] relative">
                   <div className="absolute top-3 left-3 font-body text-[10px] text-[#666] uppercase tracking-widest">Favicon</div>
                   <svg width="32" height="32" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 100V20L60 60L100 20V100" stroke="#EDEDED" strokeWidth="12" strokeMiterlimit="10" strokeLinecap="square"/>
                    <rect x="46" y="70" width="28" height="28" fill="#FF3B00"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Concept B: Wordmark */}
            <div className="flex flex-col gap-4">
              <div className="h-[400px] bg-white rounded-sm flex items-center justify-center relative group">
                <div className="absolute top-6 left-6 font-body text-xs text-[#999] uppercase tracking-widest">Concept B / Wordmark</div>
                <svg width="320" height="60" viewBox="0 0 320 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="45" fontFamily="Plus Jakarta Sans" fontSize="48" fontWeight="600" fill="#0A0A0A" letterSpacing="-0.04em">LAWAL</text>
                  <circle cx="178" cy="40" r="6" fill="#FF3B00"/>
                </svg>
              </div>
              <div className="flex gap-4">
                <div className="h-32 flex-1 bg-[#141414] border border-[#222] rounded-sm flex items-center justify-center relative">
                   <div className="absolute top-3 left-3 font-body text-[10px] text-[#666] uppercase tracking-widest">Dark Surface</div>
                   <svg width="160" height="30" viewBox="0 0 320 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="0" y="45" fontFamily="Plus Jakarta Sans" fontSize="48" fontWeight="600" fill="#EDEDED" letterSpacing="-0.04em">LAWAL</text>
                    <circle cx="178" cy="40" r="6" fill="#FF3B00"/>
                  </svg>
                </div>
                <div className="h-32 flex-1 bg-white rounded-sm flex items-center justify-center border border-[#EEE] relative">
                   <div className="absolute top-3 left-3 font-body text-[10px] text-[#999] uppercase tracking-widest">Favicon</div>
                   <svg width="32" height="32" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="10" y="85" fontFamily="Plus Jakarta Sans" fontSize="80" fontWeight="700" fill="#0A0A0A" letterSpacing="-0.04em">L</text>
                    <circle cx="75" cy="75" r="12" fill="#FF3B00"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Color palette */}
        <section className="flex flex-col gap-12">
          <header>
            <h2 className="font-display text-sm tracking-[0.2em] text-[#A0A0A0] uppercase mb-4">02 / Color System</h2>
          </header>

          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-5 gap-4">
              <div className="flex flex-col gap-3">
                <div className="h-24 rounded-sm bg-[#0A0A0A] border border-[#222]"></div>
                <div className="flex justify-between items-center font-body text-xs">
                  <span className="text-[#EDEDED] font-medium">Abyss</span>
                  <span className="text-[#666]">#0A0A0A</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="h-24 rounded-sm bg-[#141414] border border-[#222]"></div>
                <div className="flex justify-between items-center font-body text-xs">
                  <span className="text-[#EDEDED] font-medium">Graphite</span>
                  <span className="text-[#666]">#141414</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="h-24 rounded-sm bg-[#333333] border border-[#444]"></div>
                <div className="flex justify-between items-center font-body text-xs">
                  <span className="text-[#EDEDED] font-medium">Lead</span>
                  <span className="text-[#666]">#333333</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="h-24 rounded-sm bg-[#EDEDED] border border-[#DDD]"></div>
                <div className="flex justify-between items-center font-body text-xs">
                  <span className="text-[#EDEDED] font-medium">Bone</span>
                  <span className="text-[#666]">#EDEDED</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="h-24 rounded-sm bg-[#FF3B00]"></div>
                <div className="flex justify-between items-center font-body text-xs">
                  <span className="text-[#EDEDED] font-medium">Signal Orange</span>
                  <span className="text-[#666]">#FF3B00</span>
                </div>
              </div>
            </div>

            {/* Neutral Ramp */}
            <div className="flex flex-col gap-3 mt-4">
              <div className="font-body text-xs text-[#666] uppercase tracking-widest mb-1">Neutral Scale (Graphite)</div>
              <div className="flex h-12 w-full rounded-sm overflow-hidden border border-[#222]">
                <div className="flex-1 bg-[#FAFAFA]"></div>
                <div className="flex-1 bg-[#F4F4F5]"></div>
                <div className="flex-1 bg-[#E4E4E7]"></div>
                <div className="flex-1 bg-[#D4D4D8]"></div>
                <div className="flex-1 bg-[#A1A1AA]"></div>
                <div className="flex-1 bg-[#71717A]"></div>
                <div className="flex-1 bg-[#52525B]"></div>
                <div className="flex-1 bg-[#3F3F46]"></div>
                <div className="flex-1 bg-[#27272A]"></div>
                <div className="flex-1 bg-[#18181B]"></div>
                <div className="flex-1 bg-[#09090B]"></div>
              </div>
              <div className="flex justify-between font-body text-[10px] text-[#666]">
                <span>50</span>
                <span>900</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Typography specimen */}
        <section className="flex flex-col gap-12 border-t border-[#333] pt-16">
          <header>
            <h2 className="font-display text-sm tracking-[0.2em] text-[#A0A0A0] uppercase mb-4">03 / Typography</h2>
          </header>

          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-2">
              <div className="font-body text-xs text-[#666] uppercase tracking-widest mb-2">Display — Plus Jakarta Sans</div>
              <div className="font-display text-[72px] leading-[1] font-light tracking-tight text-white">
                Mujeeb Lawal.
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="font-body text-xs text-[#666] uppercase tracking-widest mb-2">Role Line — Plus Jakarta Sans Medium</div>
              <div className="font-display text-3xl font-medium tracking-tight text-[#EDEDED]">
                Senior Programme Director
              </div>
            </div>

            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="font-body text-xs text-[#666] uppercase tracking-widest mb-2">Body — Inter Regular</div>
              <div className="font-body text-[16px] leading-[26px] text-[#A0A0A0]">
                I take on £50M+ portfolios of regulated financial-services, telecoms, and engineering programmes. 
                Seventeen years of international delivery have taught me one absolute truth: programmes that finish are built on discipline, not heroics.
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="font-body text-xs text-[#666] uppercase tracking-widest mb-2">Eyebrow / Caption — Plus Jakarta Sans</div>
              <div className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF3B00]">
                Available from Q1 2026
              </div>
            </div>
          </div>
        </section>

        {/* 5. Voice in 4 contexts */}
        <section className="flex flex-col gap-12 border-t border-[#333] pt-16">
          <header>
            <h2 className="font-display text-sm tracking-[0.2em] text-[#A0A0A0] uppercase mb-4">04 / Tone of Voice</h2>
          </header>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#141414] border border-[#222] p-8 rounded-sm flex flex-col gap-6">
              <div className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#666]">Headline Context</div>
              <div className="font-display text-2xl font-light text-white leading-snug">
                Programmes that finish.<br/>Outcomes that hold.
              </div>
            </div>

            <div className="bg-[#141414] border border-[#222] p-8 rounded-sm flex flex-col gap-6">
              <div className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#666]">Status Context</div>
              <div className="font-body text-lg text-[#A0A0A0]">
                Selectively taking new mandates starting Q1 2026.
              </div>
            </div>

            <div className="bg-[#141414] border border-[#222] p-8 rounded-sm flex flex-col gap-6">
              <div className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#666]">CTA Context</div>
              <div className="flex flex-col items-start gap-2">
                <button className="bg-white text-[#0A0A0A] font-display font-medium text-sm px-6 py-3 rounded-sm">
                  Request Dossier
                </button>
                <span className="font-body text-xs text-[#666]">Secure link. Valid for 7 days.</span>
              </div>
            </div>

            <div className="bg-[#141414] border border-[#222] p-8 rounded-sm flex flex-col gap-6">
              <div className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#666]">Error Context</div>
              <div className="font-body text-[#FF3B00] bg-[#FF3B00]/10 px-4 py-3 border border-[#FF3B00]/20 rounded-sm text-sm">
                Document unavailable. Please request a new access link.
              </div>
            </div>
          </div>
        </section>

        {/* 6. Brand in action — Web hero preview */}
        <section className="flex flex-col gap-12 border-t border-[#333] pt-16">
          <header>
            <h2 className="font-display text-sm tracking-[0.2em] text-[#A0A0A0] uppercase mb-4">05 / Application: Web Hero</h2>
          </header>

          <div className="w-[720px] h-[420px] bg-[#0A0A0A] border border-[#333] rounded-md overflow-hidden relative flex flex-col justify-between p-10">
            {/* Top Nav */}
            <div className="flex justify-between items-center w-full relative z-10">
              <svg width="40" height="40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 100V20L60 60L100 20V100" stroke="#EDEDED" strokeWidth="10" strokeMiterlimit="10" strokeLinecap="square"/>
                <rect x="50" y="74" width="20" height="20" fill="#FF3B00"/>
              </svg>
              <div className="flex items-center gap-6 font-display text-xs text-[#A0A0A0] tracking-wide">
                <span className="text-white">Profile</span>
                <span>Track Record</span>
                <span>Contact</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6 relative z-10">
              <div className="inline-flex items-center gap-2 border border-[#333] bg-[#141414] rounded-full px-3 py-1.5 w-fit">
                <div className="w-2 h-2 rounded-full bg-[#FF3B00]"></div>
                <span className="font-display text-[10px] font-medium tracking-[0.1em] uppercase text-[#A0A0A0]">Available from Q1 2026</span>
              </div>
              
              <h1 className="font-display text-6xl font-light tracking-tight text-white leading-[1.1]">
                Senior Project Manager.
              </h1>
              
              <div className="flex items-center gap-4 font-body text-sm text-[#A0A0A0]">
                <span className="text-[#EDEDED] font-medium">£50M+ delivered</span>
                <span className="text-[#333]">•</span>
                <span>17+ years</span>
                <span className="text-[#333]">•</span>
                <span>London / Dubai</span>
              </div>

              <div className="mt-4">
                <button className="bg-white hover:bg-[#EDEDED] text-[#0A0A0A] font-display font-medium text-sm px-6 py-3 rounded-sm transition-colors">
                  Request Dossier
                </button>
              </div>
            </div>

            {/* Subtle background element */}
            <div className="absolute right-[-10%] top-[-20%] w-[500px] h-[500px] border border-[#222] rounded-full opacity-20 pointer-events-none"></div>
            <div className="absolute right-[-20%] top-[-30%] w-[700px] h-[700px] border border-[#222] rounded-full opacity-10 pointer-events-none"></div>
          </div>
        </section>

        {/* 7. Brand in action — LinkedIn banner */}
        <section className="flex flex-col gap-12 border-t border-[#333] pt-16">
          <header>
            <h2 className="font-display text-sm tracking-[0.2em] text-[#A0A0A0] uppercase mb-4">06 / Application: LinkedIn Banner</h2>
          </header>

          <div className="w-[720px] h-[180px] bg-[#141414] border border-[#333] overflow-hidden relative flex flex-col justify-end p-8">
            {/* Background geometric */}
            <div className="absolute right-0 top-0 w-[400px] h-full overflow-hidden">
              <svg width="400" height="180" viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-[-50px] opacity-10">
                <path d="M0 180V0L180 180L360 0V180" stroke="#EDEDED" strokeWidth="20" strokeMiterlimit="10" strokeLinecap="square"/>
              </svg>
            </div>

            <div className="relative z-10 flex justify-between items-end w-full">
              <div className="flex flex-col gap-2">
                <h1 className="font-display text-3xl font-light tracking-tight text-white">
                  Mujeeb Lawal.
                </h1>
                <div className="font-body text-sm text-[#A0A0A0] tracking-wide">
                  PMO Lead <span className="mx-2 text-[#333]">|</span> Programme & Portfolio Director
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 text-right">
                <div className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-[#FF3B00]">
                  £50M+ Delivered
                </div>
                <div className="font-body text-xs text-[#666]">
                  London / Dubai
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Brand in action — Email signature */}
        <section className="flex flex-col gap-12 border-t border-[#333] pt-16 pb-24">
          <header>
            <h2 className="font-display text-sm tracking-[0.2em] text-[#A0A0A0] uppercase mb-4">07 / Application: Email Signature</h2>
          </header>

          <div className="w-[580px] h-[140px] bg-white border border-[#EEE] rounded-md flex items-center p-8 gap-6 shadow-sm">
            <div className="pr-6 border-r border-[#E5E5E5]">
              <svg width="48" height="48" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 100V20L60 60L100 20V100" stroke="#0A0A0A" strokeWidth="8" strokeMiterlimit="10" strokeLinecap="square"/>
                <rect x="52" y="76" width="16" height="16" fill="#FF3B00"/>
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-display text-lg font-semibold text-[#0A0A0A] tracking-tight">
                Mujeeb Lawal
              </div>
              <div className="font-body text-xs text-[#666] mb-2">
                Senior Programme Director
              </div>
              <div className="flex items-center gap-3 font-body text-[11px] text-[#888]">
                <a href="mailto:odmlawal@gmail.com" className="text-[#0A0A0A] hover:text-[#FF3B00]">odmlawal@gmail.com</a>
                <span>|</span>
                <span>+971 50 908 2234</span>
                <span>|</span>
                <a href="https://linkedin.com/in/mujeebola" className="text-[#0A0A0A] hover:text-[#FF3B00]">LinkedIn</a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

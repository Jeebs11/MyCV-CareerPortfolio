const INK = 'hsl(220,25%,14%)';
const PAPER = 'hsl(40,20%,97%)';
const BRASS = 'hsl(35,45%,45%)';
const BRASS_LIGHT = 'hsl(35,55%,62%)';
const HAIRLINE = 'hsl(40,15%,87%)';
const MUTED = 'hsl(220,12%,52%)';

const mandates = [
  { n:'01', title:'Built PMO from Ground Up', co:'Novocycle Technology', year:'2024', metric:'36% efficiency gain', tags:'15+ team members · EU-funded' },
  { n:'02', title:'34% Project Efficiency Improvement', co:'JLT Specialty (Marsh & McLennan)', year:'2018', metric:'34% efficiency gain', tags:'Insurance sector · Process optimisation' },
  { n:'03', title:'35% Energy Reduction for UN SDGs', co:'GSMA', year:'2020', metric:'35% energy reduction', tags:'8 tech onboardings · UN SDG alignment' },
];

function SectionRule({ label }: { label: string }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:0, padding:'0 64px', marginBottom:32 }}>
      <div style={{ flex:1, height:1, background:BRASS, opacity:0.4 }} />
      <div style={{ padding:'0 20px', fontSize:8.5, letterSpacing:'0.28em', textTransform:'uppercase', color:BRASS, fontWeight:600, flexShrink:0 }}>{label}</div>
      <div style={{ flex:1, height:1, background:BRASS, opacity:0.4 }} />
    </div>
  );
}

export function FullWidthDividers() {
  return (
    <div style={{ display:'flex', height:'100vh', fontFamily:'Inter, sans-serif', background:PAPER, overflow:'hidden' }}>
      <style>{`* { box-sizing:border-box; margin:0; padding:0; } @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');`}</style>

      {/* LEFT PANEL */}
      <aside style={{ width:340, background:INK, color:PAPER, flexShrink:0, padding:'48px 40px', display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:44 }}>
          <div style={{ width:32, height:32, background:BRASS, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:2, flexShrink:0 }}>
            <span style={{ fontFamily:'Cormorant Garamond, serif', fontWeight:600, fontSize:13, color:PAPER }}>ML</span>
          </div>
          <span style={{ fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase', color:'hsl(220,15%,50%)' }}>Mujeeb Lawal</span>
        </div>
        <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:42, fontWeight:400, lineHeight:1.05, marginBottom:8 }}>Mujeeb<br/>Lawal</div>
        <div style={{ fontSize:9.5, fontWeight:600, letterSpacing:'0.22em', textTransform:'uppercase', color:BRASS_LIGHT, marginBottom:40 }}>Senior Programme Director</div>
        <div style={{ display:'flex', flexDirection:'column', gap:20, marginBottom:44, paddingTop:20, borderTop:'1px solid hsl(220,20%,22%)' }}>
          {[['£50M+','PROGRAMMES LED'],['17 yrs','EXPERIENCE'],['34','LARGEST TEAM']].map(([v,l])=>(
            <div key={l} style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
              <span style={{ fontFamily:'Cormorant Garamond, serif', fontSize:26, fontWeight:400, color:BRASS_LIGHT }}>{v}</span>
              <span style={{ fontSize:8.5, letterSpacing:'0.18em', textTransform:'uppercase', color:'hsl(220,15%,40%)' }}>{l}</span>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {['PROFILE','SELECTED MANDATES','CAREER','CONTACT'].map((s,i)=>(
            <div key={s} style={{ fontSize:9.5, letterSpacing:'0.18em', textTransform:'uppercase', color: i===0 ? PAPER : 'hsl(220,15%,45%)', paddingLeft: i===0 ? 0 : 8, borderLeft: i===0 ? `2px solid ${BRASS}` : 'none', paddingTop:2 }}>{s}</div>
          ))}
        </div>
      </aside>

      {/* RIGHT PANEL — full-width brass dividers between sections */}
      <main style={{ flex:1, overflowY:'auto' }}>
        {/* Profile section */}
        <div style={{ paddingTop:48, paddingBottom:40 }}>
          <SectionRule label="Profile" />
          <div style={{ padding:'0 64px' }}>
            <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:28, fontWeight:400, fontStyle:'italic', lineHeight:1.4, color:INK, marginBottom:20, maxWidth:620 }}>
              "A programme director who builds institutions, not just outputs — governing at scale, delivering under pressure, and leaving infrastructure behind."
            </p>
            <p style={{ fontSize:13, lineHeight:1.85, color:MUTED, maxWidth:620 }}>
              17 years leading complex change across financial services, telecoms, insurance, and sustainability. Comfortable at board level and delivery level simultaneously.
            </p>
            <div style={{ marginTop:24, display:'flex', alignItems:'center', gap:16 }}>
              <span style={{ fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'hsl(220,15%,55%)' }}>Past employers</span>
              {['Mercer','GSMA','Simply Business','6Connex'].map(e=>(
                <span key={e} style={{ fontSize:12, fontWeight:500, color:INK }}>{e}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Mandates section */}
        <div style={{ paddingTop:8, paddingBottom:40 }}>
          <SectionRule label="Top Key Achievements" />
          <div style={{ padding:'0 64px' }}>
            {mandates.map((m,i)=>(
              <div key={m.n} style={{ display:'flex', gap:20, paddingBottom:24, marginBottom:24, borderBottom: i<2 ? `1px solid ${HAIRLINE}` : 'none' }}>
                <span style={{ fontFamily:'Cormorant Garamond, serif', fontSize:40, fontWeight:300, color:'hsl(220,20%,88%)', lineHeight:1, width:36, flexShrink:0 }}>{m.n}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:20, fontWeight:500, color:INK, marginBottom:4 }}>{m.title}</div>
                  <div style={{ fontSize:9.5, letterSpacing:'0.14em', textTransform:'uppercase', color:MUTED, marginBottom:4 }}>{m.co} · {m.year}</div>
                  <div style={{ fontSize:11.5, color:MUTED }}>{m.tags}</div>
                </div>
                <div style={{ fontSize:13, fontFamily:'Cormorant Garamond, serif', fontStyle:'italic', color:BRASS, flexShrink:0, paddingTop:4 }}>{m.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

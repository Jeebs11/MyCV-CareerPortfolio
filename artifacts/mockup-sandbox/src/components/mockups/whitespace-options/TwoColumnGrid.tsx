const INK = 'hsl(220,25%,14%)';
const PAPER = 'hsl(40,20%,97%)';
const BRASS = 'hsl(35,45%,45%)';
const BRASS_LIGHT = 'hsl(35,55%,62%)';
const HAIRLINE = 'hsl(40,15%,87%)';
const MUTED = 'hsl(220,12%,52%)';

const mandates = [
  { n:'01', title:'Built PMO from Ground Up', co:'Novocycle Technology', year:'2024', metric:'36% efficiency gain', tags:'15+ team members · EU-funded' },
  { n:'02', title:'Project Efficiency +34%', co:'JLT Specialty (Marsh & McLennan)', year:'2018', metric:'34% efficiency gain', tags:'Insurance · Process optimisation' },
  { n:'03', title:'Energy Reduction for UN SDGs', co:'GSMA', year:'2020', metric:'35% energy reduction', tags:'8 tech onboardings · SDG alignment' },
  { n:'04', title:'Digital Transformation', co:'Simply Business', year:'2016', metric:'£4M cost saved', tags:'Agile delivery · 6 squads' },
];

const capabilities = [
  { label:'Programme Governance', sub:'PMO build · reporting · risk' },
  { label:'Agile Delivery', sub:'Scrum · Kanban · SAFe' },
  { label:'Stakeholder Management', sub:'C-suite · cross-functional' },
  { label:'Digital Transformation', sub:'Fintech · InsurTech · Telecoms' },
  { label:'Financial Oversight', sub:'£50M+ budgets · variance mgmt' },
  { label:'Team Leadership', sub:'34 direct · matrix teams' },
];

export function TwoColumnGrid() {
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
          {['PROFILE','SELECTED MANDATES','CAPABILITY','CONTACT'].map((s,i)=>(
            <div key={s} style={{ fontSize:9.5, letterSpacing:'0.18em', textTransform:'uppercase', color: i===0 ? PAPER : 'hsl(220,15%,45%)', paddingLeft: i===0 ? 0 : 8, borderLeft: i===0 ? `2px solid ${BRASS}` : 'none', paddingTop:2 }}>{s}</div>
          ))}
        </div>
      </aside>

      {/* RIGHT PANEL — two-column grid layouts */}
      <main style={{ flex:1, overflowY:'auto', padding:'48px 64px' }}>
        {/* Intro — single wide row */}
        <div style={{ marginBottom:40, paddingBottom:40, borderBottom:`1px solid ${HAIRLINE}` }}>
          <div style={{ fontSize:9, fontWeight:600, letterSpacing:'0.24em', textTransform:'uppercase', color:BRASS, marginBottom:14 }}>Profile</div>
          <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:24, fontWeight:400, fontStyle:'italic', lineHeight:1.45, color:INK, maxWidth:'100%' }}>
            "A programme director who builds institutions, not just outputs — governing at scale, delivering under pressure, and leaving infrastructure behind."
          </p>
        </div>

        {/* Mandates — 2-column grid */}
        <div style={{ marginBottom:40 }}>
          <div style={{ fontSize:9, fontWeight:600, letterSpacing:'0.24em', textTransform:'uppercase', color:BRASS, marginBottom:20 }}>Top key achievements</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px 32px' }}>
            {mandates.map(m=>(
              <div key={m.n} style={{ padding:'20px 24px', border:`1px solid ${HAIRLINE}`, background:'hsl(40,18%,95%)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                  <span style={{ fontFamily:'Cormorant Garamond, serif', fontSize:32, fontWeight:300, color:'hsl(220,20%,86%)', lineHeight:1 }}>{m.n}</span>
                  <span style={{ fontSize:11, fontFamily:'Cormorant Garamond, serif', fontStyle:'italic', color:BRASS }}>{m.metric}</span>
                </div>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:16, fontWeight:500, color:INK, marginBottom:4, lineHeight:1.3 }}>{m.title}</div>
                <div style={{ fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', color:MUTED, marginBottom:4 }}>{m.co} · {m.year}</div>
                <div style={{ fontSize:11, color:MUTED }}>{m.tags}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities — 3-column grid */}
        <div>
          <div style={{ fontSize:9, fontWeight:600, letterSpacing:'0.24em', textTransform:'uppercase', color:BRASS, marginBottom:16 }}>Capabilities</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'12px 20px' }}>
            {capabilities.map(c=>(
              <div key={c.label} style={{ paddingTop:12, borderTop:`1px solid ${BRASS}`, borderTopWidth:1.5 }}>
                <div style={{ fontSize:12, fontWeight:500, color:INK, marginBottom:2 }}>{c.label}</div>
                <div style={{ fontSize:10.5, color:MUTED }}>{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

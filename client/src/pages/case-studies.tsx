import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import type { ProjectRow } from '@shared/schema';
import FloatingNav from '@/components/FloatingNav';

const INK = 'hsl(220,25%,14%)';
const PAPER = 'hsl(40,20%,97%)';
const BRASS = 'hsl(35,45%,45%)';
const BRASS_LIGHT = 'hsl(35,55%,62%)';
const HAIRLINE = 'hsl(40,15%,87%)';
const MUTED = 'hsl(220,12%,52%)';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

function SectionRule({ label, isMobile }: { label: string; isMobile: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: `0 ${isMobile ? 24 : 64}px`, marginBottom: 36 }}>
      <div style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: BRASS, flexShrink: 0, paddingRight: 20 }}>{label}</div>
      <div style={{ flex: 1, height: 1, background: BRASS, opacity: 0.35 }} />
    </div>
  );
}

const FALLBACK_MANDATES = [
  { id: 0, title: 'PMO Build — Mercer', sector: 'Financial Services', year: '2022–24', metric: '+36%', metricLabel: 'Delivery efficiency', employmentType: 'Permanent', challenge: "Mercer's project portfolio had grown organically across three business units with no central governance, no shared tooling, and no consolidated view for the ExCo. Programmes were being run in isolation, risks were siloed, and the CTO had no reliable view of portfolio health.", approach: "Designed and built a fit-for-purpose PMO over six months. Established a governance framework with clear RACI, introduced Jira and Confluence as the single source of truth, built a Power BI board pack for monthly ExCo reporting, and ran an Agile transformation programme for the 34-person delivery team.", outcome: "36% improvement in delivery predictability in the first full year. Risk escalation time reduced from 14 days to 48 hours. ExCo confidence in portfolio visibility rated 'high' for the first time in three annual surveys.", tags: ['PMO', 'Governance', 'Agile Transformation', 'Power BI', 'PRINCE2'] },
  { id: 1, title: 'FCA Regulatory Programme — Simply Business', sector: 'Insurance / FinTech', year: '2020–22', metric: '£1.2M', metricLabel: 'Programme delivered', employmentType: 'Permanent', challenge: "Following an FCA supervisory review, Simply Business required a structured change programme to address findings across underwriting, claims, and customer communications. The programme had a hard regulatory deadline, a 12-person delivery team across two time-zones, and zero tolerance for compliance deviation.", approach: "Stood up a dedicated programme office, established weekly steering with Legal, Compliance and the FCA liaison team. Introduced a risk-first delivery cadence — every sprint began with a compliance risk review before any feature work. Maintained a full audit trail from design decision to production deployment.", outcome: "All FCA findings remediated on schedule. Zero compliance breaches across the programme lifecycle. Programme closed with a formal 'no further action' letter from the FCA.", tags: ['FCA', 'Regulatory', 'Risk Management', 'Agile', 'Financial Services'] },
  { id: 2, title: 'UN SDG Energy Mandate — 6Connex', sector: 'SaaS / Sustainability', year: '2018–20', metric: '−35%', metricLabel: 'Energy consumption', employmentType: 'Contract', challenge: "6Connex committed to the UN Global Compact and needed to demonstrate measurable progress against SDG 7 and SDG 13. Infrastructure was distributed across three data centres with no baseline measurement, no reduction plan, and no board reporting mechanism.", approach: "Established a baseline energy measurement framework, identified the highest-consumption infrastructure components, and built a phased rationalisation roadmap. Introduced quarterly board reporting aligned to UN SDG indicators.", outcome: "35% reduction in total energy consumption over 18 months. Recognised by the UN Global Compact Progress Report. Programme approach cited as a case study in the industry body's sustainable tech guidelines.", tags: ['Sustainability', 'UN SDG', 'Infrastructure', 'Board Reporting', 'ESG'] },
  { id: 3, title: 'Mobile Industry Programme — GSMA', sector: 'Telecoms', year: '2019–20', metric: '12', metricLabel: 'Markets delivered', employmentType: 'Contract', challenge: "GSMA required a cross-geography programme to deliver a mobile money interoperability standard across 12 markets in Sub-Saharan Africa and Asia. Each market had different regulatory environments, different technology partners, and different operator relationships.", approach: "Designed a federated programme model — central governance and standards, local delivery authority. Built a programme-level risk register with market-by-market dependencies. Established a stakeholder engagement calendar covering 40+ operator and regulator relationships.", outcome: "All 12 markets delivered within the programme window. Interoperability framework adopted by three additional markets post-programme.", tags: ['Telecoms', 'Stakeholder Management', 'International', 'Standards', 'Mobile'] },
];

interface Mandate { id: number | string; title: string; sector: string; year: string; metric: string; metricLabel: string; employmentType: string; challenge: string; approach: string; outcome: string; tags: string[] }

function toMandate(p: ProjectRow): Mandate {
  return { id: p.id, title: p.title, sector: p.sector, year: p.year, metric: p.metric, metricLabel: p.summary || 'Headline outcome', employmentType: p.role || 'Permanent', challenge: p.challenge, approach: p.description || p.impact, outcome: p.impact, tags: (p.techStack as string[]) || [] };
}

export default function CaseStudiesPage() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);
  const { data: dbProjects = [] } = useQuery<ProjectRow[]>({ queryKey: ['/api/projects'] });

  useEffect(() => { document.title = 'Case Studies — Mujeeb Lawal | Senior Programme Director'; }, []);

  const mandates: Mandate[] = dbProjects.length > 0 ? dbProjects.map(toMandate) : FALLBACK_MANDATES;
  const p = mandates[active] ?? mandates[0];
  const P = isMobile ? 24 : 64;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh' }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } a { text-decoration: none; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: hsl(220,20%,30%); }`}</style>
      <FloatingNav />

      {/* LEFT PANEL / MOBILE HEADER */}
      <aside style={{ width: isMobile ? '100%' : 340, background: INK, color: PAPER, position: 'sticky', top: 0, zIndex: 100, height: isMobile ? 'auto' : '100vh', display: 'flex', flexDirection: 'column', padding: isMobile ? '0' : '52px 44px', flexShrink: 0, overflowY: isMobile ? 'visible' : 'auto' }}>

        {isMobile ? (
          <div>
            {/* Mobile top bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid hsl(220,20%,22%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="2" fill={BRASS} /><text x="20" y="27" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="15" fill={PAPER}>ML</text></svg>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 400, color: PAPER }}>Case Studies</div>
              </div>
              <Link href="/" style={{ fontSize: 11, color: 'hsl(220,15%,50%)', letterSpacing: '0.1em' }}>← Home</Link>
            </div>
            {/* Mobile mandate selector - horizontal scroll */}
            <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid hsl(220,20%,22%)', scrollbarWidth: 'none' }}>
              {mandates.map((m, i) => (
                <button key={i} onClick={() => setActive(i)} style={{ flexShrink: 0, padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer', borderBottom: active === i ? `2px solid ${BRASS_LIGHT}` : '2px solid transparent', marginBottom: -1 }}>
                  <div style={{ fontSize: 10, fontWeight: active === i ? 600 : 400, color: active === i ? BRASS_LIGHT : 'hsl(220,15%,52%)', whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>{m.title.split(' — ')[1] || m.title}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 52, textDecoration: 'none' }}>
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="2" fill={BRASS} /><text x="20" y="27" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="15" fill={PAPER}>ML</text></svg>
              <span style={{ fontSize: 11, color: 'hsl(220,15%,50%)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>Mujeeb Lawal</span>
            </Link>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, lineHeight: 1.1, color: PAPER, marginBottom: 8 }}>Case Studies</div>
              <div style={{ fontSize: 13, color: 'hsl(220,15%,50%)', lineHeight: 1.6 }}>Four mandates in detail — challenge, approach, and measurable outcome.</div>
            </div>
            <nav style={{ flex: 1 }}>
              {mandates.map((m, i) => (
                <button key={i} onClick={() => setActive(i)} data-testid={`btn-mandate-${i}`} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '14px 0 14px 14px', background: 'none', border: 'none', cursor: 'pointer', borderLeft: active === i ? `2px solid ${BRASS_LIGHT}` : '2px solid hsl(220,20%,22%)', marginBottom: 2 }}>
                  <div style={{ fontSize: 11, fontWeight: active === i ? 600 : 400, color: active === i ? BRASS_LIGHT : 'hsl(220,15%,52%)', marginBottom: 3, letterSpacing: '0.02em' }}>{m.title}</div>
                  <div style={{ fontSize: 10, color: 'hsl(220,15%,38%)', letterSpacing: '0.08em' }}>{m.sector} · {m.year}</div>
                </button>
              ))}
            </nav>
            <div style={{ borderTop: '1px solid hsl(220,20%,22%)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link href="/" style={{ fontSize: 12, color: 'hsl(220,15%,50%)' }}>← Back to Profile</Link>
              <Link href="/portfolio" style={{ fontSize: 12, color: 'hsl(220,15%,50%)' }}>Portfolio</Link>
              <Link href="/insights" style={{ fontSize: 12, color: 'hsl(220,15%,50%)' }}>Insights</Link>
            </div>
          </>
        )}
      </aside>

      {/* RIGHT PANEL */}
      <main style={{ flex: 1, background: PAPER, overflowY: isMobile ? 'visible' : 'auto', height: isMobile ? 'auto' : '100vh' }}>

        {/* Header */}
        <div style={{ paddingTop: isMobile ? 28 : 52, paddingBottom: 36 }}>
          <SectionRule label={`${p.sector} · ${p.year}`} isMobile={isMobile} />
          <div style={{ padding: `0 ${P}px` }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BRASS, border: `1px solid hsl(35,45%,72%)`, padding: '4px 10px' }}>{p.sector}</span>
              <span style={{ fontSize: 11, color: MUTED }}>{p.year}</span>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: p.employmentType === 'Permanent' ? BRASS : 'hsl(200,45%,48%)' }}>{p.employmentType}</span>
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 32 : 44, fontWeight: 400, color: INK, lineHeight: 1.1, marginBottom: 20 }}>{p.title}</h1>
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 44 : 56, fontWeight: 400, color: BRASS, lineHeight: 1 }}>{p.metric}</div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: MUTED, marginTop: 6 }}>{p.metricLabel}</div>
            </div>
          </div>
        </div>

        {/* Three acts */}
        <div style={{ paddingBottom: 52 }}>
          {[
            { label: 'The Challenge', body: p.challenge },
            { label: 'The Approach', body: p.approach },
            { label: 'The Outcome', body: p.outcome },
          ].map((act, i) => (
            <div key={i} style={{ paddingBottom: 36 }}>
              <SectionRule label={act.label} isMobile={isMobile} />
              <div style={{ padding: `0 ${P}px` }}>
                <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.85, color: 'hsl(220,15%,35%)', maxWidth: 680 }}>{act.body}</p>
              </div>
            </div>
          ))}

          {p.tags.length > 0 && (
            <div style={{ paddingBottom: 24 }}>
              <SectionRule label="Technologies" isMobile={isMobile} />
              <div style={{ padding: `0 ${P}px`, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {p.tags.map((tag, j) => (
                  <span key={j} style={{ fontSize: 11, fontWeight: 500, color: INK, border: `1px solid ${HAIRLINE}`, padding: '6px 14px', letterSpacing: '0.04em' }}>{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Prev / Next */}
        <div style={{ padding: `0 ${P}px 48px`, display: 'flex', justifyContent: 'space-between' }}>
          {active > 0
            ? <button onClick={() => setActive(active - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: BRASS }}>← Previous</button>
            : <span />}
          {active < mandates.length - 1
            ? <button onClick={() => setActive(active + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: BRASS }}>Next →</button>
            : <span />}
        </div>
      </main>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import type { BuiltProjectRow } from '@shared/schema';
import FloatingNav from '@/components/FloatingNav';
import ChatBot from '@/components/ChatBot';
import { getVariantHomeHref } from '@/hooks/useVariantHomeHref';

const INK = 'hsl(220,25%,14%)';
const PAPER = 'hsl(40,20%,97%)';
const BRASS = 'hsl(35,45%,45%)';
const BRASS_LIGHT = 'hsl(35,55%,62%)';
const HAIRLINE = 'hsl(40,15%,87%)';
const MUTED = 'hsl(220,12%,52%)';

const FILTERS = ['All', 'Web App', 'Mobile App', 'Work Project'];

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
    <div style={{ display: 'flex', alignItems: 'center', padding: `0 ${isMobile ? 24 : 64}px`, marginBottom: 40 }}>
      <div style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: BRASS, flexShrink: 0, paddingRight: 20 }}>{label}</div>
      <div style={{ flex: 1, height: 1, background: BRASS, opacity: 0.35 }} />
    </div>
  );
}

const FALLBACK: BuiltProjectRow[] = [
  { id: 1, title: 'PM Portfolio — This Site', description: 'Full-stack portfolio website with admin CMS, blog engine, CV download gate, and AI chatbot. Built end-to-end on Replit.', type: 'Web App', stack: ['React', 'TypeScript', 'Drizzle ORM', 'PostgreSQL'], lines: ['Contact capture & lead export', 'Admin blog editor (ReactQuill)', 'AI chatbot for recruiter Q&A', 'Theme/brand customisation panel'], status: 'Live', url: 'https://replit.com/@mujeeb', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&q=80', highlight: true, sortOrder: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, title: 'Programme Health Dashboard', description: 'Real-time portfolio health dashboard with RAG status, risk register, and milestone tracker. Modelled on the Power BI boards built for Mercer.', type: 'Dashboard', stack: ['React', 'Recharts', 'Express', 'PostgreSQL'], lines: ['RAG status per workstream', 'Risk escalation timeline', 'Budget burn vs. forecast', 'Exportable board pack PDF'], status: 'Live', url: 'https://replit.com/@mujeeb', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80', highlight: false, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, title: 'Meeting Notes → Action Tracker', description: 'Paste meeting transcript → GPT extracts actions, owners, and deadlines → pushes to a shared Google Sheet.', type: 'Automation', stack: ['Node.js', 'OpenAI API', 'Google Sheets API'], lines: ['Owner detection from transcript', 'Deadline extraction', 'Google Sheets push', 'Slack summary notification'], status: 'Live', url: 'https://replit.com/@mujeeb', image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=900&q=80', highlight: false, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
  { id: 4, title: 'Risk Register Builder', description: 'Structured risk register with P×I heat map, owner assignment, and mitigation tracking.', type: 'Tool', stack: ['React', 'TypeScript', 'CSV Export'], lines: ['P×I heat map visualisation', 'Owner & due date tracking', 'Mitigation log per risk', 'CSV / Excel export'], status: 'Live', url: null, image: null, highlight: false, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
  { id: 5, title: 'Stakeholder Engagement Planner', description: 'Maps stakeholders by influence/interest, tracks engagement history, and generates a comms calendar.', type: 'Web App', stack: ['React', 'Express', 'PostgreSQL'], lines: ['Influence / interest matrix', 'Engagement log per stakeholder', 'Auto-generated comms calendar', 'Export to PowerPoint outline'], status: 'Live', url: null, image: null, highlight: false, sortOrder: 4, createdAt: new Date(), updatedAt: new Date() },
  { id: 6, title: 'Weekly Status Report Generator', description: 'Pulls Jira sprint data and generates a board-ready weekly status report in under 30 seconds.', type: 'Automation', stack: ['Node.js', 'OpenAI API', 'Express'], lines: ['Jira sprint data ingestion', 'GPT narrative generation', 'RAG status auto-assigned', 'Docx / PDF output'], status: 'Beta', url: null, image: null, highlight: false, sortOrder: 5, createdAt: new Date(), updatedAt: new Date() },
];

const PAGE_SIZE = 10;

export default function BuiltProjectsPage() {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { data: dbProjects = [] } = useQuery<BuiltProjectRow[]>({ queryKey: ['/api/built-projects'] });

  useEffect(() => { document.title = 'Portfolio — Mujeeb Lawal | Built on Replit'; }, []);

  const all: BuiltProjectRow[] = dbProjects.length > 0 ? dbProjects : FALLBACK;
  const filtered = filter === 'All' ? all : all.filter(p => p.type === filter);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const P = isMobile ? 24 : 64;

  function changeFilter(f: string) { setFilter(f); setPage(1); }

  return (
    <>
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh' }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } a { text-decoration: none; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: hsl(220,20%,30%); }`}</style>
      <FloatingNav />

      {/* LEFT PANEL / MOBILE HEADER */}
      <aside style={{ width: isMobile ? '100%' : 340, background: INK, color: PAPER, position: 'sticky', top: 0, zIndex: 100, height: isMobile ? 'auto' : '100vh', display: 'flex', flexDirection: 'column', padding: isMobile ? '0' : '52px 44px', flexShrink: 0, overflowY: isMobile ? 'visible' : 'auto' }}>

        {isMobile ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid hsl(220,20%,22%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="2" fill={BRASS} /><text x="20" y="27" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="15" fill={PAPER}>ML</text></svg>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 400, color: PAPER }}>Portfolio</div>
              </div>
              <Link href={getVariantHomeHref()} style={{ fontSize: 11, color: 'hsl(220,15%,50%)', letterSpacing: '0.1em' }}>← Home</Link>
            </div>
            {/* Mobile filter strip */}
            <div style={{ display: 'flex', overflowX: 'auto', padding: '0 8px', borderBottom: '1px solid hsl(220,20%,22%)', scrollbarWidth: 'none' }}>
              {FILTERS.map((f, i) => (
                <button key={i} onClick={() => changeFilter(f)} style={{ flexShrink: 0, padding: '12px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 10, fontWeight: filter === f ? 700 : 400, color: filter === f ? BRASS_LIGHT : 'hsl(220,15%,50%)', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: filter === f ? `2px solid ${BRASS_LIGHT}` : '2px solid transparent', marginBottom: -1 }}>{f}</button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <Link href={getVariantHomeHref()} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 52, textDecoration: 'none' }}>
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="2" fill={BRASS} /><text x="20" y="27" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="15" fill={PAPER}>ML</text></svg>
              <span style={{ fontSize: 11, color: 'hsl(220,15%,50%)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>Mujeeb Lawal</span>
            </Link>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, lineHeight: 1.1, color: PAPER, marginBottom: 8 }}>Portfolio</div>
              <div style={{ fontSize: 13, color: 'hsl(220,15%,50%)', lineHeight: 1.65 }}>Things I've built — web apps, mobile apps, and work projects. All live on Replit.</div>
            </div>
            <div style={{ padding: '16px 0', borderTop: '1px solid hsl(220,20%,22%)', borderBottom: '1px solid hsl(220,20%,22%)', marginBottom: 32 }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, color: BRASS_LIGHT }}>{filtered.length}</span>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'hsl(220,15%,42%)', marginLeft: 12 }}>{filter === 'All' ? 'projects' : filter.toLowerCase() + 's'}</span>
            </div>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'hsl(220,15%,38%)', marginBottom: 14 }}>Filter by type</div>
              {FILTERS.map((f, i) => (
                <button key={i} onClick={() => changeFilter(f)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 0 9px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: filter === f ? 600 : 400, color: filter === f ? BRASS_LIGHT : 'hsl(220,15%,50%)', borderLeft: filter === f ? `2px solid ${BRASS_LIGHT}` : '2px solid hsl(220,20%,22%)', letterSpacing: '0.04em' }}>{f}</button>
              ))}
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ borderTop: '1px solid hsl(220,20%,22%)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link href={getVariantHomeHref()} style={{ fontSize: 12, color: 'hsl(220,15%,50%)' }}>← Back to Profile</Link>
              <Link href="/insights" style={{ fontSize: 12, color: 'hsl(220,15%,50%)' }}>Thought Leadership</Link>
            </div>
          </>
        )}
      </aside>

      {/* RIGHT PANEL */}
      <main style={{ flex: 1, background: PAPER, overflowY: isMobile ? 'visible' : 'auto', height: isMobile ? 'auto' : '100vh' }}>
        <div style={{ paddingTop: isMobile ? 28 : 52, paddingBottom: 36 }}>
          <SectionRule label="Built on Replit" isMobile={isMobile} />
          <div style={{ padding: `0 ${P}px` }}>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 36 : 48, fontWeight: 400, color: INK, lineHeight: 1.1, marginBottom: 12 }}>Portfolio</h1>
            <p style={{ fontSize: isMobile ? 13 : 14, color: MUTED, maxWidth: 560 }}>I don't just manage delivery — I build. These are working tools and applications, each solving a real problem I encountered in programme work.</p>
          </div>
        </div>

        <div style={{ paddingBottom: 48 }}>
          <SectionRule label={`${filtered.length} ${filter === 'All' ? 'projects' : filter.toLowerCase() + 's'}`} isMobile={isMobile} />
          <div style={{ padding: `0 ${P}px`, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 2 }}>
            {paginated.map((p, i) => {
              const isHovered = hoveredCard === i;
              const cardBg = p.highlight ? INK : 'transparent';
              const cardTextColor = p.highlight ? PAPER : INK;
              const stack = Array.isArray(p.stack) ? p.stack : [];
              const lines = Array.isArray(p.lines) ? p.lines : [];
              return (
                <div key={p.id} data-testid={`card-project-${p.id}`}
                  onMouseEnter={() => !isMobile && setHoveredCard(i)}
                  onMouseLeave={() => !isMobile && setHoveredCard(null)}
                  style={{ background: cardBg, border: `1px solid ${p.highlight ? 'transparent' : HAIRLINE}`, padding: isMobile ? '24px 20px' : '36px 32px', display: 'flex', flexDirection: 'column', color: cardTextColor, cursor: 'default' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: p.highlight ? BRASS_LIGHT : BRASS, border: `1px solid ${p.highlight ? 'hsl(220,20%,28%)' : 'hsl(35,45%,72%)'}`, padding: '4px 10px' }}>{p.type}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: p.status === 'Live' ? 'hsl(145,45%,48%)' : 'hsl(35,65%,58%)' }}>{p.status}</span>
                  </div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 22 : 24, fontWeight: 500, lineHeight: 1.15, marginBottom: 10, color: cardTextColor }}>{p.title}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 16, color: p.highlight ? 'hsl(220,15%,68%)' : 'hsl(220,15%,42%)' }}>{p.description}</p>
                  {/* Mobile: image shown as block above details */}
                  {isMobile && p.image && (
                    <div style={{ marginBottom: 16, overflow: 'hidden', height: 180, background: p.highlight ? 'hsl(220,20%,18%)' : HAIRLINE }}>
                      <img
                        src={p.image}
                        alt={p.title}
                        onError={e => { e.currentTarget.style.visibility = 'hidden'; }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                      />
                    </div>
                  )}
                  {/* Desktop: hover-reveal overlay */}
                  <div style={{ position: 'relative', flex: 1, minHeight: 120 }}>
                    <div>
                      <div style={{ marginBottom: 16 }}>
                        {lines.map((l, j) => (
                          <div key={j} style={{ fontSize: 12, padding: '5px 0', borderBottom: `1px solid ${p.highlight ? 'hsl(220,20%,22%)' : HAIRLINE}`, display: 'flex', alignItems: 'center', gap: 8, color: p.highlight ? 'hsl(220,15%,55%)' : MUTED }}>
                            <span style={{ color: BRASS_LIGHT, fontSize: 10 }}>—</span>{l}
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {stack.map((s, j) => (<span key={j} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: p.highlight ? 'hsl(220,15%,55%)' : MUTED, background: p.highlight ? 'hsl(220,20%,20%)' : 'hsl(40,15%,92%)', padding: '4px 10px' }}>{s}</span>))}
                      </div>
                    </div>
                    {!isMobile && p.image && (
                      <div style={{ position: 'absolute', inset: 0, opacity: isHovered ? 0 : 1, transition: 'opacity 0.45s cubic-bezier(0.4,0,0.2,1)', pointerEvents: isHovered ? 'none' : 'auto', overflow: 'hidden', background: p.highlight ? 'hsl(220,20%,18%)' : HAIRLINE }}>
                        <img
                          src={p.image}
                          alt={p.title}
                          onError={e => { e.currentTarget.style.visibility = 'hidden'; }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                        />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: `linear-gradient(to bottom, transparent, ${cardBg === 'transparent' ? PAPER : cardBg})` }} />
                        <div style={{ position: 'absolute', bottom: 10, right: 12, fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: p.highlight ? 'hsl(220,15%,55%)' : MUTED }}>Hover to explore →</div>
                      </div>
                    )}
                  </div>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ display: 'inline-block', marginTop: 20, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: BRASS_LIGHT }}>View project →</a>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {totalPages > 1 && (
          <div style={{ padding: `24px ${P}px 48px`, borderTop: `1px solid ${HAIRLINE}`, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: page === 1 ? 'hsl(220,15%,75%)' : INK, background: 'none', border: 'none', cursor: page === 1 ? 'default' : 'pointer', padding: 0 }}>← Prev</button>
            <div style={{ display: 'flex', gap: 6 }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)} style={{ width: 32, height: 32, fontSize: 12, fontWeight: n === page ? 600 : 400, color: n === page ? PAPER : MUTED, background: n === page ? INK : 'transparent', border: `1px solid ${n === page ? 'transparent' : HAIRLINE}`, cursor: 'pointer' }}>{n}</button>
              ))}
            </div>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: page === totalPages ? 'hsl(220,15%,75%)' : INK, background: 'none', border: 'none', cursor: page === totalPages ? 'default' : 'pointer', padding: 0 }}>Next →</button>
          </div>
        )}
      </main>
    </div>
    <ChatBot />
    </>
  );
}

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import type { BuiltProjectRow } from '@shared/schema';

const INK = 'hsl(220,25%,14%)';
const PAPER = 'hsl(40,20%,97%)';
const BRASS = 'hsl(35,45%,45%)';
const BRASS_LIGHT = 'hsl(35,55%,62%)';
const HAIRLINE = 'hsl(40,15%,87%)';
const MUTED = 'hsl(220,12%,52%)';

const FILTERS = ['All', 'Web App', 'Automation', 'Dashboard', 'Tool'];

const FALLBACK: BuiltProjectRow[] = [
  {
    id: 1, title: 'PM Portfolio — This Site', description: 'Full-stack portfolio website with admin CMS, blog engine, CV download gate, and AI chatbot. Built end-to-end on Replit.',
    type: 'Web App', stack: ['React', 'TypeScript', 'Drizzle ORM', 'PostgreSQL'],
    lines: ['Contact capture & lead export', 'Admin blog editor (ReactQuill)', 'AI chatbot for recruiter Q&A', 'Theme/brand customisation panel'],
    status: 'Live', url: null, image: null, highlight: true, sortOrder: 0, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 2, title: 'Programme Health Dashboard', description: 'Real-time portfolio health dashboard with RAG status, risk register, and milestone tracker. Modelled on the Power BI boards built for Mercer.',
    type: 'Dashboard', stack: ['React', 'Recharts', 'Express', 'PostgreSQL'],
    lines: ['RAG status per workstream', 'Risk escalation timeline', 'Budget burn vs. forecast', 'Exportable board pack PDF'],
    status: 'Live', url: null, image: null, highlight: false, sortOrder: 1, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 3, title: 'Meeting Notes → Action Tracker', description: 'Paste meeting transcript → GPT extracts actions, owners, and deadlines → pushes to a shared Google Sheet.',
    type: 'Automation', stack: ['Node.js', 'OpenAI API', 'Google Sheets API'],
    lines: ['Owner detection from transcript', 'Deadline extraction', 'Google Sheets push', 'Slack summary notification'],
    status: 'Live', url: null, image: null, highlight: false, sortOrder: 2, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 4, title: 'Risk Register Builder', description: 'Structured risk register with P×I heat map, owner assignment, and mitigation tracking. Exportable to CSV for board packs.',
    type: 'Tool', stack: ['React', 'TypeScript', 'CSV Export'],
    lines: ['P×I heat map visualisation', 'Owner & due date tracking', 'Mitigation log per risk', 'CSV / Excel export'],
    status: 'Live', url: null, image: null, highlight: false, sortOrder: 3, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 5, title: 'Stakeholder Engagement Planner', description: 'Maps stakeholders by influence/interest, tracks engagement history, and generates a comms calendar for complex programmes.',
    type: 'Web App', stack: ['React', 'Express', 'PostgreSQL'],
    lines: ['Influence / interest matrix', 'Engagement log per stakeholder', 'Auto-generated comms calendar', 'Export to PowerPoint outline'],
    status: 'Live', url: null, image: null, highlight: false, sortOrder: 4, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 6, title: 'Weekly Status Report Generator', description: 'Pulls Jira sprint data, combines with brief text input, and generates a board-ready weekly status report in under 30 seconds.',
    type: 'Automation', stack: ['Node.js', 'OpenAI API', 'Express'],
    lines: ['Jira sprint data ingestion', 'GPT narrative generation', 'RAG status auto-assigned', 'Docx / PDF output'],
    status: 'Beta', url: null, image: null, highlight: false, sortOrder: 5, createdAt: new Date(), updatedAt: new Date(),
  },
];

export default function BuiltProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { data: dbProjects = [] } = useQuery<BuiltProjectRow[]>({ queryKey: ['/api/built-projects'] });

  useEffect(() => {
    document.title = 'Projects — Mujeeb Lawal | Built on Replit';
  }, []);

  const all: BuiltProjectRow[] = dbProjects.length > 0 ? dbProjects : FALLBACK;
  const filtered = filter === 'All' ? all : all.filter(p => p.type === filter);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: hsl(220,20%,30%); }
      `}</style>

      {/* LEFT PANEL */}
      <aside style={{ width: 340, background: INK, color: PAPER, position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', padding: '52px 44px', flexShrink: 0, overflowY: 'auto' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 52, textDecoration: 'none' }}>
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="2" fill={BRASS} />
            <text x="20" y="28" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="22" fill={PAPER}>M</text>
          </svg>
          <span style={{ fontSize: 11, color: 'hsl(220,15%,50%)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>Mujeeb Lawal</span>
        </Link>

        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, lineHeight: 1.1, color: PAPER, marginBottom: 8 }}>Projects</div>
          <div style={{ fontSize: 13, color: 'hsl(220,15%,50%)', lineHeight: 1.65 }}>Things I've built — web apps, tools, automations, and dashboards. All live on Replit.</div>
        </div>

        <div style={{ padding: '16px 0', borderTop: '1px solid hsl(220,20%,22%)', borderBottom: '1px solid hsl(220,20%,22%)', marginBottom: 32 }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, color: BRASS_LIGHT }}>{filtered.length}</span>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'hsl(220,15%,42%)', marginLeft: 12 }}>
            {filter === 'All' ? 'projects' : filter.toLowerCase() + 's'}
          </span>
        </div>

        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'hsl(220,15%,38%)', marginBottom: 14 }}>Filter by type</div>
          {FILTERS.map((f, i) => (
            <button key={i} onClick={() => setFilter(f)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '9px 0 9px 12px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: filter === f ? 600 : 400,
              color: filter === f ? BRASS_LIGHT : 'hsl(220,15%,50%)',
              borderLeft: filter === f ? `2px solid ${BRASS_LIGHT}` : '2px solid hsl(220,20%,22%)',
              letterSpacing: '0.04em',
            }}>{f}</button>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ borderTop: '1px solid hsl(220,20%,22%)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Link href="/" style={{ fontSize: 12, color: 'hsl(220,15%,50%)' }}>← Back to Profile</Link>
          <Link href="/case-studies" style={{ fontSize: 12, color: 'hsl(220,15%,50%)' }}>Case Studies</Link>
          <Link href="/insights" style={{ fontSize: 12, color: 'hsl(220,15%,50%)' }}>Insights</Link>
        </div>
      </aside>

      {/* RIGHT PANEL */}
      <main style={{ flex: 1, background: PAPER, overflowY: 'auto', height: '100vh' }}>
        <div style={{ padding: '52px 64px 40px', borderBottom: `1px solid ${HAIRLINE}` }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: BRASS, marginBottom: 12 }}>Built on Replit</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 48, fontWeight: 400, color: INK, lineHeight: 1.1, marginBottom: 12 }}>Technical Projects</h1>
          <p style={{ fontSize: 14, color: MUTED, maxWidth: 560 }}>I don't just manage delivery — I build. These are working tools and applications, each solving a real problem I encountered in programme work.</p>
        </div>

        <div style={{ padding: '48px 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          {filtered.map((p, i) => {
            const isHovered = hoveredCard === i;
            const cardBg = p.highlight ? INK : 'transparent';
            const cardTextColor = p.highlight ? PAPER : INK;
            const stack = Array.isArray(p.stack) ? p.stack : [];
            const lines = Array.isArray(p.lines) ? p.lines : [];

            return (
              <div
                key={p.id}
                data-testid={`card-project-${p.id}`}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ background: cardBg, border: `1px solid ${p.highlight ? 'transparent' : HAIRLINE}`, padding: '36px 32px', display: 'flex', flexDirection: 'column', color: cardTextColor }}
              >
                {/* Type badge + Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: p.highlight ? BRASS_LIGHT : BRASS, border: `1px solid ${p.highlight ? 'hsl(220,20%,28%)' : 'hsl(35,45%,72%)'}`, padding: '4px 10px' }}>{p.type}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: p.status === 'Live' ? 'hsl(145,45%,48%)' : 'hsl(35,65%,58%)' }}>{p.status}</span>
                </div>

                {/* Title */}
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 500, lineHeight: 1.15, marginBottom: 12, color: cardTextColor }}>{p.title}</div>

                {/* Description */}
                <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 20, color: p.highlight ? 'hsl(220,15%,68%)' : 'hsl(220,15%,42%)' }}>{p.description}</p>

                {/* Image / Bullets area */}
                <div style={{ position: 'relative', flex: 1 }}>
                  {/* Text layer */}
                  <div>
                    <div style={{ marginBottom: 20 }}>
                      {lines.map((l, j) => (
                        <div key={j} style={{ fontSize: 12, padding: '5px 0', borderBottom: `1px solid ${p.highlight ? 'hsl(220,20%,22%)' : HAIRLINE}`, display: 'flex', alignItems: 'center', gap: 8, color: p.highlight ? 'hsl(220,15%,55%)' : MUTED }}>
                          <span style={{ color: BRASS_LIGHT, fontSize: 10 }}>—</span>{l}
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {stack.map((s, j) => (
                        <span key={j} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: p.highlight ? 'hsl(220,15%,55%)' : MUTED, background: p.highlight ? 'hsl(220,20%,20%)' : 'hsl(40,15%,92%)', padding: '4px 10px' }}>{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Screenshot overlay */}
                  {p.image && (
                    <div style={{ position: 'absolute', inset: 0, opacity: isHovered ? 0 : 1, transition: 'opacity 0.45s cubic-bezier(0.4,0,0.2,1)', pointerEvents: isHovered ? 'none' : 'auto', borderRadius: 2, overflow: 'hidden' }}>
                      <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: `linear-gradient(to bottom, transparent, ${cardBg === 'transparent' ? PAPER : cardBg})` }} />
                      <div style={{ position: 'absolute', bottom: 10, right: 12, fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: p.highlight ? 'hsl(220,15%,55%)' : MUTED, opacity: isHovered ? 0 : 1, transition: 'opacity 0.3s ease' }}>Hover to explore →</div>
                    </div>
                  )}
                </div>

                {/* View project link */}
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 24, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: BRASS_LIGHT, opacity: (!p.image || isHovered) ? 1 : 0, transition: 'opacity 0.35s ease' }}>
                    View project →
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import type { CareerRoleRow, FlagshipWinRow, SiteSkillRow, SiteEducationRow } from '@shared/schema';
import FloatingNav from '@/components/FloatingNav';

const INK = 'hsl(220,25%,14%)';
const PAPER = 'hsl(40,20%,97%)';
const BRASS = 'hsl(35,45%,45%)';
const BRASS_LIGHT = 'hsl(35,55%,62%)';
const HAIRLINE = 'hsl(40,15%,87%)';
const MUTED = 'hsl(220,12%,52%)';


interface SiteSettings { [key: string]: string }
interface CVForm { name: string; email: string; phone: string }

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

export default function Home() {
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState('profile');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [cvForm, setCvForm] = useState<CVForm>({ name: '', email: '', phone: '' });
  const [cvSubmitting, setCvSubmitting] = useState(false);
  const [cvError, setCvError] = useState('');
  const [expandedRoles, setExpandedRoles] = useState<Set<number | string>>(new Set());
  const toggleRole = (id: number | string) => setExpandedRoles(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  const mainRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Read ?v= query param for variant slug
  const variantSlug = new URLSearchParams(window.location.search).get('v') || null;

  const { data: settings = {} } = useQuery<SiteSettings>({ queryKey: ['/api/site/settings'] });
  const { data: flagshipWins = [] } = useQuery<FlagshipWinRow[]>({ queryKey: ['/api/site/flagship-wins'] });
  const { data: skills = [] } = useQuery<SiteSkillRow[]>({ queryKey: ['/api/site/skills'] });
  const { data: careerRoles = [] } = useQuery<CareerRoleRow[]>({ queryKey: ['/api/site/career-roles'] });
  const { data: education = [] } = useQuery<SiteEducationRow[]>({ queryKey: ['/api/site/education'] });

  // Load variant if ?v= param is present
  type VariantContent = {
    tagline?: string;
    bio?: string;
    careerRoles?: Array<{ id: number; description: string }>;
    skillsList?: Array<{ id: number; name: string; category: string }>;
    highlightedAchievements?: Array<{ id: number; overrideText?: string }>;
    cvFileId?: number | null;
  };
  type VariantRow = { id: number; slug: string; label: string; isActive: boolean; content: VariantContent };
  const { data: variantData } = useQuery<VariantRow>({
    queryKey: ['/api/variants', variantSlug],
    queryFn: async () => {
      const res = await fetch(`/api/variants/${variantSlug}`);
      if (!res.ok) throw new Error('Variant not found');
      return res.json();
    },
    enabled: !!variantSlug,
    retry: false,
  });

  // Merge variant content over base content
  const variantContent: VariantContent = variantData?.content || {};

  useEffect(() => {
    document.title = 'Mujeeb Lawal — Senior Programme Director | £50M+ Delivery';
  }, []);

  useEffect(() => {
    const root = isMobile ? null : mainRef.current;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); },
      { root, threshold: 0.25 }
    );
    Object.values(sectionRefs.current).forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [isMobile]);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    setMobileNavOpen(false);
    if (!el) return;
    if (isMobile) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const root = mainRef.current;
      if (root) root.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    }
  };

  const handleCVDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvForm.name || !cvForm.email) { setCvError('Name and email are required.'); return; }
    setCvSubmitting(true); setCvError('');
    try {
      const body: Record<string, unknown> = { ...cvForm };
      // If variant specifies a specific CV file, pass it
      if (variantContent.cvFileId) body.cvFileId = variantContent.cvFileId;
      const res = await fetch('/api/cv/download', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || 'Download failed'); }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'Mujeeb_Lawal_CV.pdf'; a.click();
      URL.revokeObjectURL(url);
      setCvModalOpen(false); setCvForm({ name: '', email: '', phone: '' });
    } catch (err: any) { setCvError(err.message || 'Something went wrong'); }
    finally { setCvSubmitting(false); }
  };

  // Apply variant skill overrides if present.
  // Use Array.isArray check so an intentionally empty skillsList is respected (not fallen back to base).
  const effectiveSkills = Array.isArray(variantContent.skillsList)
    ? variantContent.skillsList
    : skills;

  const methodologies = effectiveSkills.filter(s => s.category === 'methodology').map(s => s.name);
  const tools = effectiveSkills.filter(s => s.category === 'tool').map(s => s.name);
  const certifications = effectiveSkills.filter(s => s.category === 'certification').map(s => s.name);
  const industries = effectiveSkills.filter(s => s.category === 'industry').map(s => s.name);

  const email = settings['contact.email'] || 'odmlawal@gmail.com';
  const phoneUK = settings['contact.phone_uk'] || '+44 7908226038';
  const phoneUAE = settings['contact.phone_uae'] || '+971 509082234';
  const whatsapp = settings['contact.whatsapp'] || '971509082234';
  const linkedIn = settings['contact.linkedin_url'] || 'https://www.linkedin.com/in/mujeeb-lawal-experienced-project-manager/';
  const copyright = settings['footer.copyright'] || '© 2025 Mujeeb Lawal. All rights reserved.';

  const sectionLabels = {
    profile:      settings['section.profile_label']      || 'Profile',
    achievements: settings['section.achievements_label'] || 'Top Key Achievements',
    career:       settings['section.career_label']       || 'Career',
    capability:   settings['section.capability_label']   || 'Capability',
    education:    settings['section.education_label']    || 'Education',
    contact:      settings['section.contact_label']      || 'Contact',
  };
  const navItems = [
    { id: 'profile',    label: sectionLabels.profile },
    { id: 'mandates',   label: sectionLabels.achievements },
    { id: 'career',     label: sectionLabels.career },
    { id: 'capability', label: sectionLabels.capability },
    { id: 'education',  label: sectionLabels.education },
    { id: 'contact',    label: sectionLabels.contact },
  ];

  const profileName = settings['profile.name'] || 'Mujeeb Lawal';
  const profileTitle = settings['profile.title'] || 'Senior Programme Director';
  const baseQuote = settings['profile.quote'] || '"A programme director who builds institutions, not just outputs — governing at scale, delivering under pressure, and leaving infrastructure behind."';
  const baseBio = settings['profile.bio'] || '17 years leading complex change across financial services, telecoms, insurance, and sustainability. Comfortable at board level and delivery level simultaneously. PRINCE2 Practitioner, Certified Scrum Master. London and Dubai based.';
  // Override quote/bio with variant content if present
  const profileQuote = variantContent.tagline || baseQuote;
  const profileBio = variantContent.bio || baseBio;
  const pastEmployers = (settings['profile.past_employers'] || 'Mercer,GSMA,Simply Business,6Connex').split(',').map((e: string) => e.trim()).filter(Boolean);

  // Apply variant career role description overrides
  const effectiveCareerRoles = careerRoles.map(role => {
    if (variantContent.careerRoles) {
      const override = variantContent.careerRoles.find(r => r.id === role.id);
      if (override && override.description) {
        return { ...role, description: override.description };
      }
    }
    return role;
  });

  // Apply variant achievement overrides/selection.
  // Array.isArray check ensures an intentionally empty list is respected (not fallen back to base).
  const effectiveFlagshipWins = (() => {
    if (!Array.isArray(variantContent.highlightedAchievements)) {
      return flagshipWins;
    }
    return variantContent.highlightedAchievements
      .map(a => {
        const win = flagshipWins.find(w => w.id === a.id);
        if (!win) return null;
        if (a.overrideText) {
          return { ...win, metrics: [a.overrideText, ...(Array.isArray(win.metrics) ? win.metrics.slice(1) : [])] };
        }
        return win;
      })
      .filter(Boolean) as typeof flagshipWins;
  })();
  const stats = [
    { val: settings['profile.stat1_val'] || '£50M+', label: settings['profile.stat1_label'] || 'Programmes led' },
    { val: settings['profile.stat2_val'] || '17 yrs', label: settings['profile.stat2_label'] || 'Experience' },
    { val: settings['profile.stat3_val'] || '34', label: settings['profile.stat3_label'] || 'Largest team' },
  ];

  const s = (id: string, el: HTMLElement | null) => { sectionRefs.current[id] = el; };
  const P = isMobile ? 24 : 64;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: isMobile ? 'auto' : '100vh', overflow: isMobile ? 'visible' : 'hidden' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: hsl(220,20%,30%); }
      `}</style>
      <FloatingNav />

      {/* ── LEFT PANEL / MOBILE HEADER ── */}
      <aside style={{
        width: isMobile ? '100%' : 340,
        background: INK, color: PAPER,
        position: 'sticky', top: 0, zIndex: 100,
        height: isMobile ? 'auto' : '100vh',
        display: 'flex', flexDirection: 'column',
        padding: isMobile ? '0' : '52px 44px',
        flexShrink: 0,
        overflowY: isMobile ? 'visible' : 'auto',
      }}>
        {isMobile ? (
          /* ── MOBILE COMPACT HEADER ── */
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid hsl(220,20%,22%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="2" fill={BRASS} />
                  <text x="20" y="27" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="15" fill={PAPER}>{profileName.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()}</text>
                </svg>
                <div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, fontWeight: 400, color: PAPER, lineHeight: 1 }}>{profileName}</div>
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: BRASS_LIGHT, marginTop: 2 }}>{profileTitle}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={() => setCvModalOpen(true)} style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: INK, background: BRASS, padding: '8px 14px', border: 'none', cursor: 'pointer' }}>CV</button>
                <button onClick={() => setMobileNavOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5, padding: 4 }}>
                  {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: 22, height: 1.5, background: PAPER }} />)}
                </button>
              </div>
            </div>
            {/* Mobile nav drawer */}
            {mobileNavOpen && (
              <div style={{ background: INK, borderBottom: '1px solid hsl(220,20%,22%)', padding: '12px 24px 16px' }}>
                {navItems.map(item => (
                  <button key={item.id} onClick={() => scrollTo(item.id)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'hsl(220,15%,60%)', borderBottom: '1px solid hsl(220,20%,20%)' }}>{item.label}</button>
                ))}
                <div style={{ display: 'flex', gap: 20, marginTop: 12 }}>
                  <Link href="/portfolio" onClick={() => setMobileNavOpen(false)} style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'hsl(220,15%,45%)' }}>Portfolio</Link>
                  <Link href="/insights" onClick={() => setMobileNavOpen(false)} style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'hsl(220,15%,45%)' }}>Thought Leadership</Link>
                </div>
              </div>
            )}
          </>
        ) : (
          /* ── DESKTOP LEFT PANEL ── */
          <>
            <div style={{ marginBottom: 40 }}>
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none" style={{ marginBottom: 20 }}>
                <rect width="40" height="40" rx="2" fill={BRASS} />
                <text x="20" y="27" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="15" fill={PAPER}>{profileName.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()}</text>
              </svg>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 44, fontWeight: 400, lineHeight: 1.05, color: PAPER, marginBottom: 10 }}>
                {(() => { const idx = profileName.indexOf(' '); return idx >= 0 ? <>{profileName.slice(0, idx)}<br />{profileName.slice(idx + 1)}</> : profileName; })()}
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BRASS_LIGHT }}>{profileTitle}</div>
              {settings['hero.status_badge'] && (
                <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'hsl(220,20%,20%)', border: '1px solid hsl(220,20%,28%)', padding: '5px 10px' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'hsl(140,60%,50%)', flexShrink: 0 }} />
                  <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'hsl(140,50%,65%)' }}>{settings['hero.status_badge']}</span>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 44, borderTop: '1px solid hsl(220,20%,25%)' }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ padding: '16px 0', borderBottom: '1px solid hsl(220,20%,25%)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 500, color: BRASS_LIGHT }}>{stat.val}</div>
                  <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'hsl(220,15%,50%)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <nav style={{ flex: 1 }}>
              {navItems.map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)} data-testid={`nav-${item.id}`} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0 12px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: activeSection === item.id ? 600 : 400, letterSpacing: '0.16em', textTransform: 'uppercase', color: activeSection === item.id ? BRASS_LIGHT : 'hsl(220,15%,50%)', borderLeft: activeSection === item.id ? `2px solid ${BRASS_LIGHT}` : '2px solid transparent', transition: 'all 0.15s' }}>{item.label}</button>
              ))}
              <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid hsl(220,20%,22%)' }}>
                <Link href="/portfolio" style={{ display: 'block', padding: '10px 0 10px 12px', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'hsl(220,15%,42%)', borderLeft: '2px solid transparent' }}>Portfolio</Link>
                <Link href="/insights" style={{ display: 'block', padding: '10px 0 10px 12px', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'hsl(220,15%,42%)', borderLeft: '2px solid transparent' }}>Thought Leadership</Link>
              </div>
            </nav>
            <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a href={`mailto:${email}`} style={{ fontSize: 12, color: 'hsl(220,15%,55%)' }}>{email}</a>
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'hsl(220,15%,55%)' }}>WhatsApp: {phoneUAE}</a>
              <div style={{ marginTop: 12 }}>
                <button data-testid="btn-download-cv" onClick={() => setCvModalOpen(true)} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: INK, background: BRASS, padding: '10px 20px', border: 'none', cursor: 'pointer' }}>Download CV</button>
              </div>
            </div>
          </>
        )}
      </aside>

      {/* ── RIGHT PANEL ── */}
      <main ref={mainRef} style={{ flex: 1, background: PAPER, overflowY: isMobile ? 'visible' : 'auto', height: isMobile ? 'auto' : '100vh' }}>

        {/* Stats strip on mobile */}
        {isMobile && (
          <div style={{ display: 'flex', borderBottom: `1px solid ${HAIRLINE}` }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ flex: 1, padding: '16px 0', textAlign: 'center', borderRight: i < 2 ? `1px solid ${HAIRLINE}` : 'none' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: BRASS }}>{stat.val}</div>
                <div style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED, marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* PROFILE */}
        <section id="profile" ref={el => s('profile', el)} style={{ paddingTop: isMobile ? 40 : 64, paddingBottom: 56 }}>
          <SectionRule label={sectionLabels.profile} isMobile={isMobile} />
          <div style={{ padding: `0 ${P}px` }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 20 : 26, fontWeight: 400, lineHeight: 1.5, color: INK, maxWidth: 620, marginBottom: 24, fontStyle: 'italic' }}>
              {profileQuote}
            </p>
            <p style={{ fontSize: isMobile ? 13 : 14, lineHeight: 1.8, color: 'hsl(220,15%,40%)', maxWidth: 600, marginBottom: 36 }}>
              {profileBio}
            </p>
            <div style={{ display: 'flex', gap: isMobile ? 16 : 40, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'hsl(220,15%,55%)', flexShrink: 0 }}>Past employers</div>
              {pastEmployers.map((c: string) => (
                <div key={c} style={{ fontSize: isMobile ? 12 : 13, fontWeight: 600, color: 'hsl(220,25%,25%)', letterSpacing: '0.02em' }}>{c}</div>
              ))}
            </div>
          </div>
        </section>

        {/* MANDATES */}
        <section id="mandates" ref={el => s('mandates', el)} style={{ paddingBottom: 56 }}>
          <SectionRule label={sectionLabels.achievements} isMobile={isMobile} />
          <div style={{ padding: `0 ${P}px`, display: 'flex', flexDirection: 'column', gap: isMobile ? 32 : 40 }}>
            {effectiveFlagshipWins.length > 0
              ? effectiveFlagshipWins.map((win, i) => (
                <div key={win.id} style={{ display: 'grid', gridTemplateColumns: isMobile ? '40px 1fr' : '56px 1fr', gap: 0 }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 28 : 36, fontWeight: 300, color: 'hsl(40,15%,82%)', lineHeight: 1 }}>0{i + 1}</div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4, flexWrap: 'wrap', gap: 8 }}>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 18 : 22, fontWeight: 500, color: INK }}>{win.title}</div>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 17 : 20, fontWeight: 500, color: BRASS }}>{(win.metrics as string[])?.[0] || ''}</div>
                    </div>
                    <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'hsl(220,15%,55%)', marginBottom: 10 }}>{win.company} · {win.period}</div>
                    <div style={{ fontSize: isMobile ? 12 : 13, lineHeight: 1.75, color: 'hsl(220,15%,40%)' }}>{(win.metrics as string[])?.slice(1).join(' · ')}</div>
                  </div>
                </div>
              ))
              : [
                { num: '01', title: 'PMO Build — Mercer', metric: '+36% efficiency', sub: 'Financial Services · 2022–24', body: 'Built PMO governance, tooling, and reporting framework from scratch for a 34-person cross-functional team.' },
                { num: '02', title: 'FCA Regulatory Programme — Simply Business', metric: '£1.2M on time', sub: 'Insurance · 2020–22', body: 'Led FCA-mandated change across underwriting and claims. Zero compliance breaches.' },
                { num: '03', title: 'UN SDG Energy Mandate — 6Connex', metric: '−35% energy', sub: 'SaaS / Sustainability · 2018–20', body: 'Infrastructure rationalisation aligned to UN SDG targets. Recognised by the UN Global Compact.' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: isMobile ? '40px 1fr' : '56px 1fr', gap: 0 }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 28 : 36, fontWeight: 300, color: 'hsl(40,15%,82%)', lineHeight: 1 }}>{m.num}</div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4, flexWrap: 'wrap', gap: 8 }}>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 18 : 22, fontWeight: 500, color: INK }}>{m.title}</div>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 17 : 20, fontWeight: 500, color: BRASS }}>{m.metric}</div>
                    </div>
                    <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'hsl(220,15%,55%)', marginBottom: 10 }}>{m.sub}</div>
                    <div style={{ fontSize: isMobile ? 12 : 13, lineHeight: 1.75, color: 'hsl(220,15%,40%)' }}>{m.body}</div>
                  </div>
                </div>
              ))
            }
          </div>
        </section>

        {/* CAREER */}
        <section id="career" ref={el => s('career', el)} style={{ paddingBottom: 56 }}>
          <SectionRule label={sectionLabels.career} isMobile={isMobile} />
          <div style={{ padding: `0 ${P}px` }}>
            {(effectiveCareerRoles.length > 0 ? effectiveCareerRoles : [
              { id: 1, role: 'Head of Projects & PMO Lead', company: 'Novocycle Technology', period: 'Apr 2024 – Present', employmentType: 'Permanent', description: 'Built PMO from scratch; EU-funded battery recycling programmes; 36% reporting efficiency gain' },
              { id: 2, role: 'Senior Technical Project Manager', company: 'Caravan and Motorhome Club', period: 'Oct 2022 – Nov 2023', employmentType: 'Contract', description: 'Mutual agreement insurance product transformation; vendor negotiation' },
              { id: 3, role: 'Programme Manager', company: 'Simply Business', period: 'Aug 2022 – Mar 2023', employmentType: 'Contract', description: '£1.2M FCA-regulated product; 34-person team; two FCA compliance programmes' },
              { id: 4, role: 'Programme Manager & Digital Transformation Lead', company: 'Mercer', period: 'Oct 2021 – Jun 2022', employmentType: 'Contract', description: 'Global benefits platform for Amazon, Estée Lauder, Marsh & McLennan' },
              { id: 5, role: 'Senior International Project Manager', company: '6Connex', period: 'Jul 2020 – Mar 2022', employmentType: 'Contract', description: 'Virtual events across 6 time-zones; Agile engineering coordination' },
              { id: 6, role: 'Project Manager', company: 'GSMA', period: 'Jan 2019 – Mar 2020', employmentType: 'Contract', description: 'UN SDG energy benchmark tool; 35% energy reduction for major operators' },
              { id: 7, role: 'Project Delivery Manager', company: 'Best Future Education', period: 'Mar 2020 – Dec 2020', employmentType: 'Contract', description: 'Digital pivot through COVID-19; remote learning platform delivery' },
              { id: 8, role: 'Senior Implementation Consultant', company: 'Dictate.IT', period: 'Sep 2014 – May 2016', employmentType: 'Permanent', description: "NHS digital dictation deployment; St George's, Royal Free, Nuffield Health" },
              { id: 9, role: 'Technical Project Manager', company: 'BSS Industrial', period: 'Nov 2013 – Aug 2014', employmentType: 'Permanent', description: 'High-profile construction; Hilton Brighton, commercial fit-outs' },
              { id: 10, role: 'Project Support Engineer', company: 'Alfa Laval', period: 'Sep 2008 – Nov 2013', employmentType: 'Permanent', description: 'The Shard, London 2012 Olympic Aquatic Centre, 20 Fenchurch Street' },
            ] as any[]).map((role: any, i: number) => {
              const roleKey = role.id ?? i;
              const isExpanded = expandedRoles.has(roleKey);
              const hasImpacts = Array.isArray(role.keyAchievements) && role.keyAchievements.length > 0;
              return (
                <div key={roleKey} style={{ padding: '14px 0', borderBottom: `1px solid ${HAIRLINE}` }}>
                  {isMobile ? (
                    <div>
                      {/* Role header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 3 }}>
                        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, fontWeight: 500, color: INK, lineHeight: 1.2 }}>{role.role}</div>
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: role.employmentType === 'Permanent' ? BRASS : 'hsl(200,55%,45%)', flexShrink: 0 }}>{role.employmentType}</div>
                      </div>
                      <div style={{ fontSize: 12, color: MUTED, marginBottom: 6 }}>{role.company} · {role.period}</div>
                      {/* Description — always visible */}
                      {role.description && (
                        <div style={{ fontSize: 12, color: 'hsl(220,15%,45%)', lineHeight: 1.65, marginBottom: 8 }}>{role.description}</div>
                      )}
                      {/* Key impacts toggle */}
                      {hasImpacts && (
                        <>
                          <button
                            onClick={() => toggleRole(roleKey)}
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 10, color: BRASS, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 4, marginBottom: isExpanded ? 8 : 0 }}
                          >
                            <span style={{ fontSize: 13, lineHeight: 1 }}>{isExpanded ? '−' : '+'}</span>
                            {isExpanded ? 'Hide key impacts' : 'Key impacts'}
                          </button>
                          {isExpanded && role.keyAchievements.map((a: string, k: number) => (
                            <div key={k} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'hsl(220,15%,42%)', lineHeight: 1.6, padding: '4px 0', borderBottom: `1px solid ${HAIRLINE}` }}>
                              <span style={{ color: BRASS, fontSize: 9, marginTop: 4, flexShrink: 0 }}>—</span>{a}
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  ) : (
                    <div>
                      {/* Desktop 3-column header row */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 148px', alignItems: 'start', gap: 24 }}>
                        <div>
                          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 500, color: INK, marginBottom: 2 }}>{role.role}</div>
                          <div style={{ fontSize: 12, color: MUTED }}>{role.company}</div>
                        </div>
                        {/* Description — always visible in middle column */}
                        <div style={{ fontSize: 12, color: 'hsl(220,15%,45%)', lineHeight: 1.65, paddingTop: 2 }}>
                          {role.description}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 11, color: MUTED, marginBottom: 4, whiteSpace: 'nowrap' }}>{role.period}</div>
                          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: role.employmentType === 'Permanent' ? BRASS : 'hsl(200,55%,45%)' }}>{role.employmentType}</div>
                        </div>
                      </div>
                      {/* Key impacts toggle — below the 3-col row, indented to middle column */}
                      {hasImpacts && (
                        <div style={{ marginTop: 8, paddingLeft: `calc((100% - 148px - 48px) * (1 / 2.4) + 24px)` }}>
                          <button
                            onClick={() => toggleRole(roleKey)}
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 10, color: BRASS, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 5, marginBottom: isExpanded ? 8 : 0 }}
                          >
                            <span style={{ fontSize: 13, lineHeight: 1 }}>{isExpanded ? '▾' : '▸'}</span>
                            {isExpanded ? 'Hide key impacts' : 'Key impacts'}
                          </button>
                          {isExpanded && (
                            <div>
                              {role.keyAchievements.map((a: string, k: number) => (
                                <div key={k} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'hsl(220,15%,42%)', lineHeight: 1.6, padding: '4px 0', borderBottom: `1px solid ${HAIRLINE}` }}>
                                  <span style={{ color: BRASS, fontSize: 9, marginTop: 4, flexShrink: 0 }}>—</span>{a}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CAPABILITY */}
        <section id="capability" ref={el => s('capability', el)} style={{ paddingBottom: 56 }}>
          <SectionRule label={sectionLabels.capability} isMobile={isMobile} />
          <div style={{ padding: `0 ${P}px` }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 40 }}>
              {[
                { label: 'Methodology', items: methodologies.length > 0 ? methodologies : ['Agile / SAFe', 'PRINCE2 Practitioner', 'Waterfall', 'Scrum Master', 'MSP'] },
                { label: 'Tooling', items: tools.length > 0 ? tools : ['Jira · Confluence', 'Power BI · Tableau', 'MS Project', 'ServiceNow', 'Smartsheet'] },
                { label: 'Certifications', items: certifications.length > 0 ? certifications : ['PRINCE2 Practitioner', 'Scrum Master (PSM I & II)', 'Six Sigma'] },
                { label: 'Industry', items: industries.length > 0 ? industries : ['Financial Services', 'Insurance', 'Telecoms', 'SaaS / Tech', 'Sustainability', 'Engineering'] },
              ].map((col, i) => (
                <div key={i}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: INK, marginBottom: 16 }}>{col.label}</div>
                  {col.items.map((item, j) => (
                    <div key={j} style={{ fontSize: 13, color: 'hsl(220,15%,38%)', padding: '9px 0', borderBottom: `1px solid ${HAIRLINE}` }}>{item}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" ref={el => s('education', el)} style={{ paddingBottom: 56 }}>
          <SectionRule label={sectionLabels.education} isMobile={isMobile} />
          <div style={{ padding: `0 ${P}px` }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 40 }}>
              {(education.length > 0 ? education : [
                { id: 1, degree: 'MSc Project Management', institution: 'University of Westminster', period: '2010', location: 'London, UK' },
                { id: 2, degree: 'BSc Business Administration', institution: 'Lagos State University', period: '2006', location: 'Lagos, Nigeria' },
              ] as any[]).map((edu: any) => (
                <div key={edu.id} style={{ padding: '24px', border: `1px solid ${HAIRLINE}` }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 20 : 22, fontWeight: 500, color: INK, marginBottom: 8 }}>{edu.degree}</div>
                  <div style={{ fontSize: 12, color: MUTED, marginBottom: 4 }}>{edu.institution}</div>
                  <div style={{ fontSize: 11, color: BRASS_LIGHT, fontWeight: 600, letterSpacing: '0.1em' }}>{edu.period} {edu.location ? `· ${edu.location}` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" ref={el => s('contact', el)} style={{ paddingBottom: 64 }}>
          <SectionRule label={sectionLabels.contact} isMobile={isMobile} />
          <div style={{ padding: `0 ${P}px` }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 12 : 40, marginBottom: 40 }}>
              {[
                { label: 'Email', value: email, href: `mailto:${email}` },
                { label: 'LinkedIn', value: 'linkedin.com/in/mujeeb-lawal', href: linkedIn },
                { label: 'WhatsApp', value: phoneUAE, href: `https://wa.me/${whatsapp}` },
                { label: 'Phone (UK)', value: phoneUK, href: `tel:${phoneUK.replace(/\s/g, '')}` },
              ].map((c, i) => (
                <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  style={{ display: 'block', padding: '20px', border: `1px solid ${HAIRLINE}`, textDecoration: 'none' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: BRASS, marginBottom: 6 }}>{c.label}</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 17 : 20, fontWeight: 500, color: INK }}>{c.value}</div>
                </a>
              ))}
            </div>
            <button data-testid="btn-download-cv-contact" onClick={() => setCvModalOpen(true)} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: PAPER, background: INK, padding: '14px 28px', border: 'none', cursor: 'pointer', width: isMobile ? '100%' : 'auto' }}>Download CV</button>
            <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${HAIRLINE}`, fontSize: 11, color: 'hsl(220,15%,65%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <span>{copyright}</span>
              <a href="/privacy" style={{ color: 'hsl(220,15%,55%)', borderBottom: '1px solid hsl(220,15%,35%)' }}>Privacy Policy</a>
            </div>
          </div>
        </section>
      </main>

      {/* ── CV DOWNLOAD MODAL ── */}
      {cvModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={(e) => { if (e.target === e.currentTarget) setCvModalOpen(false); }}>
          <div style={{ background: PAPER, maxWidth: 480, width: '100%', padding: isMobile ? '36px 28px' : '48px 44px' }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BRASS, marginBottom: 16 }}>Download CV</div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 400, color: INK, marginBottom: 8 }}>Just one quick step</div>
            <div style={{ fontSize: 13, color: MUTED, marginBottom: 32, lineHeight: 1.6 }}>Leave your details and the CV will download immediately.</div>
            <form onSubmit={handleCVDownload}>
              {[
                { label: 'Name *', key: 'name' as const, type: 'text', placeholder: 'Your name' },
                { label: 'Email *', key: 'email' as const, type: 'email', placeholder: 'your@email.com' },
                { label: 'Phone', key: 'phone' as const, type: 'tel', placeholder: 'Optional' },
              ].map((field) => (
                <div key={field.key} style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: INK, marginBottom: 8 }}>{field.label}</div>
                  <input data-testid={`input-cv-${field.key}`} type={field.type} placeholder={field.placeholder} value={cvForm[field.key]} onChange={e => setCvForm(f => ({ ...f, [field.key]: e.target.value }))} style={{ width: '100%', padding: '12px 16px', border: `1px solid ${HAIRLINE}`, background: 'transparent', fontSize: 14, color: INK, outline: 'none', fontFamily: 'Inter, sans-serif' }} />
                </div>
              ))}
              {cvError && <div style={{ fontSize: 12, color: 'hsl(0,60%,50%)', marginBottom: 16 }}>{cvError}</div>}
              <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.6, marginBottom: 16 }}>By downloading you consent to your details being stored. See the <a href="/privacy" target="_blank" style={{ color: BRASS, textDecoration: 'underline' }}>Privacy Policy</a>.</div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="submit" data-testid="btn-cv-submit" disabled={cvSubmitting} style={{ flex: 1, padding: '14px', background: INK, color: PAPER, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{cvSubmitting ? 'Downloading…' : 'Download CV'}</button>
                <button type="button" onClick={() => setCvModalOpen(false)} style={{ padding: '14px 20px', background: 'transparent', color: MUTED, border: `1px solid ${HAIRLINE}`, cursor: 'pointer', fontSize: 11 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

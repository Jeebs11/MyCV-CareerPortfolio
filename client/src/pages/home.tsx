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

const NAV_ITEMS = [
  { id: 'profile', label: 'Profile' },
  { id: 'mandates', label: 'Selected Mandates' },
  { id: 'career', label: 'Career' },
  { id: 'capability', label: 'Capability' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

interface SiteSettings { [key: string]: string }

interface CVForm { name: string; email: string; phone: string }

export default function Home() {
  const [activeSection, setActiveSection] = useState('profile');
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [cvForm, setCvForm] = useState<CVForm>({ name: '', email: '', phone: '' });
  const [cvSubmitting, setCvSubmitting] = useState(false);
  const [cvError, setCvError] = useState('');
  const mainRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // API data
  const { data: settings = {} } = useQuery<SiteSettings>({ queryKey: ['/api/site/settings'] });
  const { data: flagshipWins = [] } = useQuery<FlagshipWinRow[]>({ queryKey: ['/api/site/flagship-wins'] });
  const { data: skills = [] } = useQuery<SiteSkillRow[]>({ queryKey: ['/api/site/skills'] });
  const { data: careerRoles = [] } = useQuery<CareerRoleRow[]>({ queryKey: ['/api/site/career-roles'] });
  const { data: education = [] } = useQuery<SiteEducationRow[]>({ queryKey: ['/api/site/education'] });

  // SEO
  useEffect(() => {
    document.title = 'Mujeeb Lawal — Senior Programme Director | £50M+ Delivery';
  }, []);

  // Scrollspy
  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root, threshold: 0.35 }
    );
    Object.values(sectionRefs.current).forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    const root = mainRef.current;
    if (el && root) root.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  };

  const handleCVDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvForm.name || !cvForm.email) { setCvError('Name and email are required.'); return; }
    setCvSubmitting(true);
    setCvError('');
    try {
      const res = await fetch('/api/cv/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cvForm),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Download failed');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Mujeeb_Lawal_CV.pdf';
      a.click();
      URL.revokeObjectURL(url);
      setCvModalOpen(false);
      setCvForm({ name: '', email: '', phone: '' });
    } catch (err: any) {
      setCvError(err.message || 'Something went wrong');
    } finally {
      setCvSubmitting(false);
    }
  };

  // Skills grouped by category
  const methodologies = skills.filter(s => s.category === 'methodology').map(s => s.name);
  const tools = skills.filter(s => s.category === 'tool').map(s => s.name);
  const certifications = skills.filter(s => s.category === 'certification').map(s => s.name);
  const industries = skills.filter(s => s.category === 'industry').map(s => s.name);

  const email = settings['contact.email'] || 'odmlawal@gmail.com';
  const phoneUK = settings['contact.phone_uk'] || '+44 7908226038';
  const phoneUAE = settings['contact.phone_uae'] || '+971 509082234';
  const whatsapp = settings['contact.whatsapp'] || '971509082234';
  const linkedIn = settings['contact.linkedin_url'] || 'https://www.linkedin.com/in/mujeeb-lawal-experienced-project-manager/';
  const copyright = settings['footer.copyright'] || '© 2025 Mujeeb Lawal. All rights reserved.';

  const s = (id: string, el: HTMLElement | null) => { sectionRefs.current[id] = el; };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: hsl(220,20%,30%); }
      `}</style>
      <FloatingNav />
      {/* ── LEFT PANEL ── */}
      <aside style={{ width: 340, background: INK, color: PAPER, height: '100vh', display: 'flex', flexDirection: 'column', padding: '52px 44px', flexShrink: 0, overflowY: 'auto' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 52 }}>
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="2" fill={BRASS} />
            <text x="20" y="28" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="22" fill={PAPER}>M</text>
          </svg>
        </div>

        {/* Name + title */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 44, fontWeight: 400, lineHeight: 1.05, color: PAPER, marginBottom: 10 }}>Mujeeb<br />Lawal</div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BRASS_LIGHT }}>Senior Programme Director</div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 44, borderTop: '1px solid hsl(220,20%,25%)' }}>
          {[
            { val: '£50M+', label: 'Programmes led' },
            { val: '17 yrs', label: 'Experience' },
            { val: '34', label: 'Largest team' },
          ].map((stat, i) => (
            <div key={i} style={{ padding: '16px 0', borderBottom: '1px solid hsl(220,20%,25%)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 500, color: BRASS_LIGHT }}>{stat.val}</div>
              <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'hsl(220,15%,50%)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1 }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              data-testid={`nav-${item.id}`}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '12px 0 12px 12px', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: activeSection === item.id ? 600 : 400,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: activeSection === item.id ? BRASS_LIGHT : 'hsl(220,15%,50%)',
                borderLeft: activeSection === item.id ? `2px solid ${BRASS_LIGHT}` : '2px solid transparent',
                transition: 'all 0.15s',
              }}
            >{item.label}</button>
          ))}

          {/* Cross-site links */}
          <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid hsl(220,20%,22%)' }}>
            <Link href="/portfolio" style={{ display: 'block', padding: '10px 0 10px 12px', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'hsl(220,15%,42%)', borderLeft: '2px solid transparent' }}>Portfolio</Link>
            <Link href="/insights" style={{ display: 'block', padding: '10px 0 10px 12px', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'hsl(220,15%,42%)', borderLeft: '2px solid transparent' }}>Thought Leadership</Link>
          </div>
        </nav>

        {/* Contact + Download CV */}
        <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href={`mailto:${email}`} style={{ fontSize: 12, color: 'hsl(220,15%,55%)', textDecoration: 'none' }}>{email}</a>
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'hsl(220,15%,55%)', textDecoration: 'none' }}>WhatsApp: {phoneUAE}</a>
          <div style={{ marginTop: 12 }}>
            <button
              data-testid="btn-download-cv"
              onClick={() => setCvModalOpen(true)}
              style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: INK, background: BRASS, padding: '10px 20px', border: 'none', cursor: 'pointer' }}
            >Download CV</button>
          </div>
        </div>
      </aside>
      {/* ── RIGHT PANEL ── */}
      <main ref={mainRef} style={{ flex: 1, background: PAPER, overflowY: 'auto', height: '100vh' }}>

        {/* PROFILE */}
        <section id="profile" ref={el => s('profile', el)} style={{ padding: '72px 64px 64px', borderBottom: `1px solid ${HAIRLINE}` }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BRASS, marginBottom: 20 }}>Profile</div>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 400, lineHeight: 1.5, color: INK, maxWidth: 620, marginBottom: 32, fontStyle: 'italic' }}>
            "A programme director who builds institutions, not just outputs — governing at scale, delivering under pressure, and leaving infrastructure behind."
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'hsl(220,15%,40%)', maxWidth: 600, marginBottom: 44 }}>
            17 years leading complex change across financial services, telecoms, insurance, and sustainability. Comfortable at board level and delivery level simultaneously. PRINCE2 Practitioner, Certified Scrum Master. London and Dubai based.
          </p>
          {/* Trust strip */}
          <div style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'hsl(220,15%,55%)' }}>Past employers</div>
            {['Mercer', 'GSMA', 'Simply Business', '6Connex'].map(c => (
              <div key={c} style={{ fontSize: 13, fontWeight: 600, color: 'hsl(220,25%,25%)', letterSpacing: '0.02em' }}>{c}</div>
            ))}
          </div>
        </section>

        {/* MANDATES */}
        <section id="mandates" ref={el => s('mandates', el)} style={{ padding: '64px', borderBottom: `1px solid ${HAIRLINE}` }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BRASS, marginBottom: 40 }}>Top key achievements</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {flagshipWins.length > 0
              ? flagshipWins.slice(0, 3).map((win, i) => (
                <div key={win.id} style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 0 }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 300, color: 'hsl(40,15%,82%)', lineHeight: 1 }}>0{i + 1}</div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: INK }}>{win.title}</div>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 500, color: BRASS }}>{(win.metrics as string[])?.[0] || ''}</div>
                    </div>
                    <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'hsl(220,15%,55%)', marginBottom: 12 }}>{win.company} · {win.period}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.75, color: 'hsl(220,15%,40%)' }}>{(win.metrics as string[])?.slice(1).join(' · ')}</div>
                  </div>
                </div>
              ))
              : [
                { num: '01', title: 'PMO Build — Mercer', metric: '+36% efficiency', sub: 'Financial Services · 2022–24', body: 'Built PMO governance, tooling, and reporting framework from scratch for a 34-person cross-functional team. Board-level Power BI dashboard delivered in week six.' },
                { num: '02', title: 'FCA Regulatory Programme — Simply Business', metric: '£1.2M on time', sub: 'Insurance · 2020–22', body: 'Led FCA-mandated change across underwriting and claims. Zero compliance breaches. Coordinated 12-person team across two time-zones with full audit trail.' },
                { num: '03', title: 'UN SDG Energy Mandate — 6Connex', metric: '−35% energy', sub: 'SaaS / Sustainability · 2018–20', body: 'Infrastructure rationalisation aligned to UN SDG targets. Quarterly board reporting against measurable reduction milestones. Recognised by the UN Global Compact.' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 0 }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 300, color: 'hsl(40,15%,82%)', lineHeight: 1 }}>{m.num}</div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: INK }}>{m.title}</div>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 500, color: BRASS }}>{m.metric}</div>
                    </div>
                    <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'hsl(220,15%,55%)', marginBottom: 12 }}>{m.sub}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.75, color: 'hsl(220,15%,40%)' }}>{m.body}</div>
                  </div>
                </div>
              ))
            }
          </div>
          <div style={{ marginTop: 40 }}>
            <Link href="/case-studies" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: BRASS }}>All case studies →</Link>
          </div>
        </section>

        {/* CAREER */}
        <section id="career" ref={el => s('career', el)} style={{ padding: '64px', borderBottom: `1px solid ${HAIRLINE}` }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BRASS, marginBottom: 40 }}>Career</div>
          {(careerRoles.length > 0 ? careerRoles : [
            { id: 1, role: 'Head of Projects & PMO Lead', company: 'Novocycle Technology', period: 'Apr 2024 – Present', employmentType: 'Permanent', description: 'Built PMO from scratch; EU-funded battery recycling programmes; 36% reporting efficiency gain' },
            { id: 2, role: 'Senior Technical Project Manager', company: 'Caravan and Motorhome Club', period: 'Oct 2022 – Nov 2023', employmentType: 'Contract', description: 'Mutual agreement insurance product transformation; vendor negotiation' },
            { id: 3, role: 'Programme Manager', company: 'Simply Business', period: 'Aug 2022 – Mar 2023', employmentType: 'Contract', description: '£1.2M FCA-regulated product; 34-person team; two FCA compliance programmes' },
            { id: 4, role: 'Programme Manager & Digital Transformation Lead', company: 'Mercer', period: 'Oct 2021 – Jun 2022', employmentType: 'Contract', description: 'Global benefits platform for Amazon, Estée Lauder, Marsh & McLennan' },
            { id: 5, role: 'Senior International Project Manager', company: '6Connex', period: 'Jul 2020 – Mar 2022', employmentType: 'Contract', description: 'Virtual events across 6 time-zones; Agile engineering coordination' },
            { id: 6, role: 'Project Manager', company: 'GSMA', period: 'Jan 2019 – Mar 2020', employmentType: 'Contract', description: 'UN SDG energy benchmark tool; 35% energy reduction for major operators' },
            { id: 7, role: 'Project Delivery Manager', company: 'Best Future Education', period: 'Mar 2020 – Dec 2020', employmentType: 'Contract', description: 'Digital pivot through COVID-19; remote learning platform delivery' },
            { id: 8, role: 'Senior Implementation Consultant', company: 'Dictate.IT', period: 'Sep 2014 – May 2016', employmentType: 'Permanent', description: 'NHS digital dictation deployment; St George\'s, Royal Free, Nuffield Health' },
            { id: 9, role: 'Technical Project Manager', company: 'BSS Industrial', period: 'Nov 2013 – Aug 2014', employmentType: 'Permanent', description: 'High-profile construction; Hilton Brighton, commercial fit-outs' },
            { id: 10, role: 'Project Support Engineer', company: 'Alfa Laval', period: 'Sep 2008 – Nov 2013', employmentType: 'Permanent', description: 'The Shard, London 2012 Olympic Aquatic Centre, 20 Fenchurch Street' },
          ] as any[]).map((role: any, i: number) => (
            <div key={role.id || i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 90px', alignItems: 'start', padding: '18px 0', borderBottom: `1px solid ${HAIRLINE}`, gap: 24 }}>
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 500, color: INK, marginBottom: 2 }}>{role.role}</div>
                <div style={{ fontSize: 12, color: MUTED }}>{role.company}</div>
              </div>
              <div style={{ fontSize: 12, color: 'hsl(220,15%,45%)', paddingTop: 3 }}>{role.description || (Array.isArray(role.keyAchievements) ? role.keyAchievements[0] : '')}</div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: MUTED, marginBottom: 4 }}>{role.period}</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: role.employmentType === 'Permanent' ? BRASS : 'hsl(200,55%,45%)' }}>{role.employmentType}</div>
              </div>
            </div>
          ))}
        </section>

        <section id="capability" ref={el => s('capability', el)} style={{ padding: '64px', borderBottom: `1px solid ${HAIRLINE}` }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BRASS, marginBottom: 40 }}>Capability</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            {[
              { label: 'Methodology', items: methodologies.length > 0 ? methodologies : ['Agile / SAFe', 'PRINCE2 Practitioner', 'Waterfall', 'Scrum Master', 'MSP'] },
              { label: 'Tooling', items: tools.length > 0 ? tools : ['Jira · Confluence', 'Power BI · Tableau', 'MS Project', 'ServiceNow', 'Smartsheet'] },
              { label: 'Certifications', items: certifications.length > 0 ? certifications : ['PRINCE2 Practitioner', 'Scrum Master (PSM I & II)', 'Six Sigma'] },
              { label: 'Industry', items: industries.length > 0 ? industries : ['Financial Services', 'Insurance', 'Telecoms', 'SaaS / Tech', 'Sustainability', 'Engineering'] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: INK, marginBottom: 16 }}>{col.label}</div>
                {col.items.slice(0, 7).map((item, j) => (
                  <div key={j} style={{ fontSize: 13, color: 'hsl(220,15%,38%)', padding: '9px 0', borderBottom: `1px solid ${HAIRLINE}` }}>{item}</div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" ref={el => s('education', el)} style={{ padding: '64px', borderBottom: `1px solid ${HAIRLINE}` }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BRASS, marginBottom: 40 }}>Education</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            {(education.length > 0 ? education : [
              { id: 1, degree: 'MSc Project Management', institution: 'University of Westminster', period: '2010', location: 'London, UK' },
              { id: 2, degree: 'BSc Business Administration', institution: 'Lagos State University', period: '2006', location: 'Lagos, Nigeria' },
            ] as any[]).map((edu: any) => (
              <div key={edu.id} style={{ padding: '28px', border: `1px solid ${HAIRLINE}` }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: INK, marginBottom: 8 }}>{edu.degree}</div>
                <div style={{ fontSize: 12, color: MUTED, marginBottom: 4 }}>{edu.institution}</div>
                <div style={{ fontSize: 11, color: BRASS_LIGHT, fontWeight: 600, letterSpacing: '0.1em' }}>{edu.period} {edu.location ? `· ${edu.location}` : ''}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" ref={el => s('contact', el)} style={{ padding: '64px' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BRASS, marginBottom: 40 }}>Contact</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            {[
              { label: 'Email', value: email, href: `mailto:${email}` },
              { label: 'LinkedIn', value: 'linkedin.com/in/mujeeb-lawal', href: linkedIn },
              { label: 'WhatsApp', value: phoneUAE, href: `https://wa.me/${whatsapp}` },
              { label: 'Phone (UK)', value: phoneUK, href: `tel:${phoneUK.replace(/\s/g, '')}` },
            ].map((c, i) => (
              <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ display: 'block', padding: '28px', border: `1px solid ${HAIRLINE}`, textDecoration: 'none' }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: BRASS, marginBottom: 8 }}>{c.label}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 500, color: INK }}>{c.value}</div>
              </a>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <button
              data-testid="btn-download-cv-contact"
              onClick={() => setCvModalOpen(true)}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: PAPER, background: INK, padding: '14px 28px', border: 'none', cursor: 'pointer' }}
            >Download CV</button>
          </div>
          <div style={{ marginTop: 64, paddingTop: 24, borderTop: `1px solid ${HAIRLINE}`, fontSize: 11, color: 'hsl(220,15%,65%)' }}>{copyright}</div>
        </section>
      </main>
      {/* ── CV DOWNLOAD MODAL ── */}
      {cvModalOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={(e) => { if (e.target === e.currentTarget) setCvModalOpen(false); }}
        >
          <div style={{ background: PAPER, maxWidth: 480, width: '100%', padding: '48px 44px' }}>
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
                  <input
                    data-testid={`input-cv-${field.key}`}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={cvForm[field.key]}
                    onChange={e => setCvForm(f => ({ ...f, [field.key]: e.target.value }))}
                    style={{ width: '100%', padding: '12px 16px', border: `1px solid ${HAIRLINE}`, background: 'transparent', fontSize: 14, color: INK, outline: 'none', fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
              ))}
              {cvError && <div style={{ fontSize: 12, color: 'hsl(0,60%,50%)', marginBottom: 16 }}>{cvError}</div>}
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button
                  type="submit"
                  data-testid="btn-cv-submit"
                  disabled={cvSubmitting}
                  style={{ flex: 1, padding: '14px', background: INK, color: PAPER, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}
                >{cvSubmitting ? 'Downloading…' : 'Download CV'}</button>
                <button
                  type="button"
                  onClick={() => setCvModalOpen(false)}
                  style={{ padding: '14px 20px', background: 'transparent', color: MUTED, border: `1px solid ${HAIRLINE}`, cursor: 'pointer', fontSize: 11 }}
                >Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

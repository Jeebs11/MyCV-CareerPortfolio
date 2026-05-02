import { useEffect } from 'react';
import { Link } from 'wouter';
import FloatingNav from '@/components/FloatingNav';

const INK = 'hsl(220,25%,14%)';
const PAPER = 'hsl(40,20%,97%)';
const BRASS = 'hsl(35,45%,45%)';
const BRASS_LIGHT = 'hsl(35,55%,62%)';
const HAIRLINE = 'hsl(40,15%,87%)';
const MUTED = 'hsl(220,12%,52%)';

export default function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy — Mujeeb Lawal';
  }, []);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', minHeight: '100vh' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: hsl(220,20%,30%); }
      `}</style>

      <FloatingNav />

      {/* LEFT PANEL */}
      <aside style={{ width: 340, background: INK, color: PAPER, position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', padding: '52px 44px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="2" fill={BRASS} />
            <text x="20" y="27" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="15" fill={PAPER}>ML</text>
          </svg>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 400, lineHeight: 1.1, color: PAPER }}>Privacy Policy</div>
            <div style={{ fontSize: 11, color: 'hsl(220,15%,50%)', marginTop: 4 }}>How your data is used.</div>
          </div>
        </div>

        <div style={{ fontSize: 11, color: 'hsl(220,15%,40%)', lineHeight: 1.7 }}>
          <div style={{ marginBottom: 8 }}>Last updated: May 2026</div>
          <div>Controller: Mujeeb Lawal</div>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ borderTop: '1px solid hsl(220,20%,22%)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link href="/" style={{ fontSize: 12, color: 'hsl(220,15%,50%)' }}>← Back to Profile</Link>
        </div>
      </aside>

      {/* RIGHT PANEL */}
      <main style={{ flex: 1, background: PAPER, overflowY: 'auto', height: '100vh' }}>
        <div style={{ padding: '52px 64px 40px', borderBottom: `1px solid ${HAIRLINE}` }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: BRASS, marginBottom: 12 }}>Legal</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 48, fontWeight: 400, color: INK, lineHeight: 1.1 }}>Privacy Policy</h1>
        </div>

        <div style={{ padding: '52px 64px', maxWidth: 720 }}>
          {[
            {
              heading: '1. Who we are',
              body: 'This website is a personal portfolio operated by Mujeeb Lawal ("I", "me", "my"). For the purposes of UK GDPR and the Data Protection Act 2018, I am the data controller for information collected via this site.',
            },
            {
              heading: '2. What data I collect',
              body: 'When you choose to download my CV, I ask for your name, email address, and optionally your phone number. This is the only personal data collected. No tracking cookies, analytics scripts, or advertising pixels are used on this site.',
            },
            {
              heading: '3. Why I collect it (lawful basis)',
              body: 'Your data is collected on the basis of your explicit consent, given when you tick the consent box and click "Download CV". You can withdraw consent at any time by emailing me and I will delete your record within 30 days.',
            },
            {
              heading: '4. How I use your data',
              body: 'Your contact details are used solely to follow up on potential opportunities or to respond to your enquiry. I do not sell, rent, or share your data with any third party, mailing list, or marketing platform.',
            },
            {
              heading: '5. How long I keep it',
              body: 'CV contact records are retained for a maximum of 12 months from the date of submission, after which they are permanently deleted.',
            },
            {
              heading: '6. Cookies',
              body: 'This site does not use any tracking, analytics, or advertising cookies. The only technical cookie that may be set is a session cookie required for the password-protected admin area — this is a strictly necessary cookie and is exempt from consent requirements under UK GDPR.',
            },
            {
              heading: '7. Your rights',
              body: 'Under UK GDPR you have the right to: access your data, correct inaccuracies, request deletion ("right to be forgotten"), restrict or object to processing, and lodge a complaint with the ICO (ico.org.uk).',
            },
            {
              heading: '8. Data security',
              body: 'Data is stored in a secured PostgreSQL database hosted on Neon (SOC 2 Type II certified). Connections are encrypted in transit. Access to stored data requires admin authentication.',
            },
            {
              heading: '9. Changes to this policy',
              body: 'If this policy changes materially, the "last updated" date at the top will be revised. Continued use of the site after changes constitutes acceptance of the updated policy.',
            },
          ].map((section, i) => (
            <div key={i} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: i < 8 ? `1px solid ${HAIRLINE}` : 'none' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: INK, marginBottom: 12 }}>{section.heading}</h2>
              <p style={{ fontSize: 14, lineHeight: 1.85, color: 'hsl(220,15%,38%)' }}>{section.body}</p>
            </div>
          ))}

          <div style={{ marginTop: 16, paddingTop: 24, borderTop: `1px solid ${HAIRLINE}`, fontSize: 12, color: MUTED }}>
            Questions? Email <a href="mailto:odmlawal@gmail.com" style={{ color: BRASS }}>odmlawal@gmail.com</a>
          </div>
        </div>
      </main>
    </div>
  );
}

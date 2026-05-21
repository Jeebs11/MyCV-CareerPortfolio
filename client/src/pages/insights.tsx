import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import DOMPurify from 'dompurify';
import FloatingNav from '@/components/FloatingNav';
import ChatBot from '@/components/ChatBot';
import { getVariantHomeHref } from '@/hooks/useVariantHomeHref';

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

interface BlogPost { id: string; title: string; excerpt: string; content: string; category: string; readTime: string; publishDate: string; tags: string[]; featured?: boolean; heroImage?: string }

function SectionRule({ label, isMobile }: { label: string; isMobile: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: `0 ${isMobile ? 24 : 64}px`, marginBottom: 0 }}>
      <div style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: BRASS, flexShrink: 0, paddingRight: 20 }}>{label}</div>
      <div style={{ flex: 1, height: 1, background: BRASS, opacity: 0.35 }} />
    </div>
  );
}

const PAGE_SIZE = 10;

export default function InsightsPage() {
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({ queryKey: ['/api/blog-posts'] });

  useEffect(() => { document.title = "Thought Leadership — Mujeeb Lawal | Programme Delivery"; }, []);

  const categories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];
  const filtered = selectedCategory === 'All' ? blogPosts : blogPosts.filter(p => p.category === selectedCategory);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const P = isMobile ? 24 : 64;

  function changeCategory(cat: string) { setSelectedCategory(cat); setPage(1); }

  return (
    <>
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh' }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } a { text-decoration: none; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: hsl(220,20%,30%); } .article-hover:hover { background: hsl(40,18%,94%) !important; }`}</style>
      <FloatingNav />

      {/* LEFT PANEL / MOBILE HEADER */}
      <aside style={{ width: isMobile ? '100%' : 340, background: INK, color: PAPER, position: 'sticky', top: 0, zIndex: 100, height: isMobile ? 'auto' : '100vh', display: 'flex', flexDirection: 'column', padding: isMobile ? '0' : '52px 44px', flexShrink: 0, overflowY: isMobile ? 'visible' : 'auto' }}>

        {isMobile ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid hsl(220,20%,22%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="2" fill={BRASS} /><text x="20" y="27" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="15" fill={PAPER}>ML</text></svg>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 400, color: PAPER }}>Thought Leadership</div>
              </div>
              <Link href={getVariantHomeHref()} style={{ fontSize: 11, color: 'hsl(220,15%,50%)', letterSpacing: '0.1em' }}>← Home</Link>
            </div>
            {/* Category filter strip */}
            <div style={{ display: 'flex', overflowX: 'auto', padding: '0 8px', borderBottom: '1px solid hsl(220,20%,22%)', scrollbarWidth: 'none' }}>
              {categories.map((cat, i) => (
                <button key={i} onClick={() => changeCategory(cat)} style={{ flexShrink: 0, padding: '12px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 10, fontWeight: selectedCategory === cat ? 700 : 400, color: selectedCategory === cat ? BRASS_LIGHT : 'hsl(220,15%,50%)', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: selectedCategory === cat ? `2px solid ${BRASS_LIGHT}` : '2px solid transparent', marginBottom: -1 }}>{cat}</button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <Link href={getVariantHomeHref()} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 52, textDecoration: 'none' }}>
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="2" fill={BRASS} /><text x="20" y="27" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="15" fill={PAPER}>ML</text></svg>
              <span style={{ fontSize: 11, color: 'hsl(220,15%,50%)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>Mujeeb Lawal</span>
            </Link>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, lineHeight: 1.1, color: PAPER, marginBottom: 8 }}>Thought Leadership</div>
              <div style={{ fontSize: 13, color: 'hsl(220,15%,50%)', lineHeight: 1.6 }}>Thought leadership on programme delivery, governance, and leading complex change at scale.</div>
            </div>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'hsl(220,15%,40%)', marginBottom: 16 }}>Filter by topic</div>
              {categories.map((cat, i) => (
                <button key={i} onClick={() => changeCategory(cat)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 0 9px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: selectedCategory === cat ? 600 : 400, color: selectedCategory === cat ? BRASS_LIGHT : 'hsl(220,15%,50%)', borderLeft: selectedCategory === cat ? `2px solid ${BRASS_LIGHT}` : '2px solid transparent', letterSpacing: '0.04em' }}>{cat}</button>
              ))}
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ borderTop: '1px solid hsl(220,20%,22%)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href={getVariantHomeHref()} style={{ fontSize: 12, color: 'hsl(220,15%,50%)' }}>← Back to Profile</Link>
              <Link href="/portfolio" style={{ fontSize: 12, color: 'hsl(220,15%,50%)' }}>Portfolio</Link>
            </div>
          </>
        )}
      </aside>

      {/* RIGHT PANEL */}
      <main style={{ flex: 1, background: PAPER, overflowY: isMobile ? 'visible' : 'auto', height: isMobile ? 'auto' : '100vh' }}>
        <div style={{ paddingTop: isMobile ? 28 : 52, paddingBottom: 36 }}>
          <SectionRule label="Practitioner's Notes" isMobile={isMobile} />
          <div style={{ padding: `32px ${P}px 0` }}>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 36 : 48, fontWeight: 400, color: INK, lineHeight: 1.1 }}>Thought Leadership</h1>
          </div>
        </div>

        {isLoading ? (
          <div style={{ paddingBottom: 48 }}>
            <SectionRule label="Loading" isMobile={isMobile} />
            <div style={{ padding: '60px 24px', textAlign: 'center', color: MUTED, fontSize: 13 }}>Loading articles…</div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ paddingBottom: 48 }}>
            <SectionRule label="Articles" isMobile={isMobile} />
            <div style={{ padding: `60px ${P}px`, textAlign: 'center', color: MUTED }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 400, marginBottom: 12 }}>No articles yet</div>
              <div style={{ fontSize: 13 }}>Check back soon — new insights are added regularly.</div>
            </div>
          </div>
        ) : (
          <div>
            <SectionRule label={`${filtered.length} articles`} isMobile={isMobile} />
            {paginated.map((post) => (
              <article key={post.id} className="article-hover" data-testid={`article-${post.id}`} onClick={() => setSelectedPost(post)}
                style={{ padding: `32px ${P}px`, borderBottom: `1px solid ${HAIRLINE}`, cursor: 'pointer', background: 'transparent', transition: 'background 0.15s' }}>
                {post.heroImage && (
                  <div style={{ marginBottom: 16, overflow: 'hidden', height: isMobile ? 160 : 200 }}>
                    <img src={post.heroImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BRASS, background: 'hsla(35,45%,45%,0.08)', padding: '4px 10px', border: `1px solid hsl(35,45%,75%)` }}>{post.category}</span>
                    <span style={{ fontSize: 11, color: MUTED }}>{post.publishDate}</span>
                  </div>
                  <span style={{ fontSize: 11, color: MUTED }}>{post.readTime}</span>
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 22 : 26, fontWeight: 500, color: INK, marginBottom: 8, lineHeight: 1.2 }}>{post.title}</h2>
                <p style={{ fontSize: isMobile ? 13 : 14, color: 'hsl(220,15%,42%)', lineHeight: 1.75, maxWidth: 620 }}>{post.excerpt}</p>
                <div style={{ marginTop: 16, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: BRASS }}>Read →</div>
              </article>
            ))}
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
          </div>
        )}

        {/* Article modal */}
        {selectedPost && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: isMobile ? '0' : '40px 20px' }}
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedPost(null); }}>
            <div style={{ background: PAPER, maxWidth: 720, width: '100%', position: 'relative' }}>
              {selectedPost.heroImage && <img src={selectedPost.heroImage} alt={selectedPost.title} style={{ width: '100%', height: isMobile ? 200 : 320, objectFit: 'cover', display: 'block' }} />}
              <div style={{ padding: isMobile ? '32px 24px' : '48px 56px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BRASS, border: `1px solid hsl(35,45%,72%)`, padding: '4px 10px' }}>{selectedPost.category}</span>
                  <button onClick={() => setSelectedPost(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: MUTED, lineHeight: 1, padding: '0 4px' }}>×</button>
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? 28 : 36, fontWeight: 400, color: INK, lineHeight: 1.15, marginBottom: 10 }}>{selectedPost.title}</h2>
                <div style={{ fontSize: 12, color: MUTED, marginBottom: 28 }}>{selectedPost.publishDate} · {selectedPost.readTime}</div>
                <div style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.85, color: 'hsl(220,15%,30%)' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedPost.content) }} />
                {selectedPost.tags.length > 0 && (
                  <div style={{ marginTop: 36, paddingTop: 20, borderTop: `1px solid ${HAIRLINE}`, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {selectedPost.tags.map((tag, i) => (<span key={i} style={{ fontSize: 11, color: MUTED, border: `1px solid ${HAIRLINE}`, padding: '4px 12px' }}>{tag}</span>))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
    <ChatBot />
    </>
  );
}

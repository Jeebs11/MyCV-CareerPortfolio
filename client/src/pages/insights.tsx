import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import DOMPurify from 'dompurify';
import FloatingNav from '@/components/FloatingNav';

const INK = 'hsl(220,25%,14%)';
const PAPER = 'hsl(40,20%,97%)';
const BRASS = 'hsl(35,45%,45%)';
const BRASS_LIGHT = 'hsl(35,55%,62%)';
const HAIRLINE = 'hsl(40,15%,87%)';
const MUTED = 'hsl(220,12%,52%)';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishDate: string;
  tags: string[];
  featured?: boolean;
  heroImage?: string;
}

const PAGE_SIZE = 10;

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({ queryKey: ['/api/blog-posts'] });

  useEffect(() => {
    document.title = "Thought Leadership — Mujeeb Lawal | Programme Delivery";
  }, []);

  const categories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];
  const filtered = selectedCategory === 'All' ? blogPosts : blogPosts.filter(p => p.category === selectedCategory);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changeCategory(cat: string) {
    setSelectedCategory(cat);
    setPage(1);
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', minHeight: '100vh' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: hsl(220,20%,30%); }
        .article-hover:hover { background: hsl(40,18%,94%) !important; }
      `}</style>

      <FloatingNav />

      {/* LEFT PANEL */}
      <aside style={{ width: 340, background: INK, color: PAPER, position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', padding: '52px 44px', flexShrink: 0, overflowY: 'auto' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 52, textDecoration: 'none' }}>
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="2" fill={BRASS} />
            <text x="20" y="27" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontWeight="600" fontSize="15" fill={PAPER}>ML</text>
          </svg>
          <span style={{ fontSize: 11, color: 'hsl(220,15%,50%)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>Mujeeb Lawal</span>
        </Link>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, lineHeight: 1.1, color: PAPER, marginBottom: 8 }}>Thought Leadership</div>
          <div style={{ fontSize: 13, color: 'hsl(220,15%,50%)', lineHeight: 1.6 }}>Thought leadership on programme delivery, governance, and leading complex change at scale.</div>
        </div>

        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'hsl(220,15%,40%)', marginBottom: 16 }}>Filter by topic</div>
          {categories.map((cat, i) => (
            <button key={i} onClick={() => changeCategory(cat)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '9px 0 9px 12px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: selectedCategory === cat ? 600 : 400,
              color: selectedCategory === cat ? BRASS_LIGHT : 'hsl(220,15%,50%)',
              borderLeft: selectedCategory === cat ? `2px solid ${BRASS_LIGHT}` : '2px solid transparent',
              letterSpacing: '0.04em',
            }}>{cat}</button>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ borderTop: '1px solid hsl(220,20%,22%)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link href="/" style={{ fontSize: 12, color: 'hsl(220,15%,50%)' }}>← Back to Profile</Link>
          <Link href="/portfolio" style={{ fontSize: 12, color: 'hsl(220,15%,50%)' }}>Portfolio</Link>
        </div>
      </aside>

      {/* RIGHT PANEL */}
      <main style={{ flex: 1, background: PAPER, overflowY: 'auto', height: '100vh' }}>
        <div style={{ padding: '52px 64px 40px', borderBottom: `1px solid ${HAIRLINE}` }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: BRASS, marginBottom: 12 }}>
            {isLoading ? '...' : `${filtered.length} articles`}
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 48, fontWeight: 400, color: INK, lineHeight: 1.1 }}>Practitioner's Notes</h1>
        </div>

        {isLoading ? (
          <div style={{ padding: '80px 64px', textAlign: 'center', color: MUTED, fontSize: 13 }}>Loading articles…</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '80px 64px', textAlign: 'center', color: MUTED }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 400, marginBottom: 12 }}>No articles yet</div>
            <div style={{ fontSize: 13 }}>Check back soon — new insights are added regularly.</div>
          </div>
        ) : (
          <div>
            {paginated.map((post, i) => (
              <article
                key={post.id}
                className="article-hover"
                data-testid={`article-${post.id}`}
                onClick={() => setSelectedPost(post)}
                style={{ padding: '40px 64px', borderBottom: `1px solid ${HAIRLINE}`, cursor: 'pointer', background: 'transparent', transition: 'background 0.15s' }}
              >
                {post.heroImage && (
                  <div style={{ marginBottom: 20, borderRadius: 2, overflow: 'hidden', height: 200 }}>
                    <img src={post.heroImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BRASS, background: 'hsla(35,45%,45%,0.08)', padding: '4px 10px', border: `1px solid hsl(35,45%,75%)` }}>{post.category}</span>
                    <span style={{ fontSize: 11, color: MUTED }}>{post.publishDate}</span>
                  </div>
                  <span style={{ fontSize: 11, color: MUTED }}>{post.readTime}</span>
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 500, color: INK, marginBottom: 10, lineHeight: 1.2 }}>{post.title}</h2>
                <p style={{ fontSize: 14, color: 'hsl(220,15%,42%)', lineHeight: 1.75, maxWidth: 620 }}>{post.excerpt}</p>
                <div style={{ marginTop: 20, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: BRASS }}>Read →</div>
              </article>
            ))}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div style={{ padding: '32px 64px 48px', borderTop: `1px solid ${HAIRLINE}`, display: 'flex', alignItems: 'center', gap: 24 }}>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: page === 1 ? 'hsl(220,15%,75%)' : INK, background: 'none', border: 'none', cursor: page === 1 ? 'default' : 'pointer', padding: 0 }}
                >← Prev</button>

                <div style={{ display: 'flex', gap: 6 }}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      style={{ width: 32, height: 32, fontSize: 12, fontWeight: n === page ? 600 : 400, color: n === page ? PAPER : MUTED, background: n === page ? INK : 'transparent', border: `1px solid ${n === page ? 'transparent' : HAIRLINE}`, cursor: 'pointer' }}
                    >{n}</button>
                  ))}
                </div>

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: page === totalPages ? 'hsl(220,15%,75%)' : INK, background: 'none', border: 'none', cursor: page === totalPages ? 'default' : 'pointer', padding: 0 }}
                >Next →</button>

                <span style={{ marginLeft: 'auto', fontSize: 11, color: MUTED }}>
                  {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Article modal */}
        {selectedPost && (
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '40px 20px' }}
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedPost(null); }}
          >
            <div style={{ background: PAPER, maxWidth: 720, width: '100%', position: 'relative' }}>
              {selectedPost.heroImage && (
                <img src={selectedPost.heroImage} alt={selectedPost.title} style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }} />
              )}
              <div style={{ padding: '48px 56px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BRASS, border: `1px solid hsl(35,45%,72%)`, padding: '4px 10px' }}>{selectedPost.category}</span>
                  <button onClick={() => setSelectedPost(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: MUTED, lineHeight: 1 }}>×</button>
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, color: INK, lineHeight: 1.15, marginBottom: 12 }}>{selectedPost.title}</h2>
                <div style={{ fontSize: 12, color: MUTED, marginBottom: 32 }}>{selectedPost.publishDate} · {selectedPost.readTime}</div>
                <div
                  style={{ fontSize: 15, lineHeight: 1.85, color: 'hsl(220,15%,30%)' }}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedPost.content) }}
                />
                {selectedPost.tags.length > 0 && (
                  <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px solid ${HAIRLINE}`, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {selectedPost.tags.map((tag, i) => (
                      <span key={i} style={{ fontSize: 11, color: MUTED, border: `1px solid ${HAIRLINE}`, padding: '4px 12px' }}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

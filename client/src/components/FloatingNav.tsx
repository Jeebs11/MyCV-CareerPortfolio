import { useLocation, Link } from 'wouter';

const INK = 'hsl(220,25%,14%)';
const PAPER = 'hsl(40,20%,97%)';
const BRASS = 'hsl(35,45%,45%)';
const BRASS_LIGHT = 'hsl(35,55%,62%)';

const PAGES = [
  { href: '/', label: 'Profile' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/insights', label: 'Thought Leadership' },
];

export default function FloatingNav() {
  const [location] = useLocation();

  const isActive = (href: string) =>
    href === '/' ? location === '/' : location === href || location === '/projects' && href === '/portfolio';

  return (
    <nav
      className="fnav-root"
      style={{
        position: 'fixed',
        top: 24,
        right: 32,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        background: INK,
        border: `1px solid hsl(220,20%,25%)`,
        borderRadius: 4,
        padding: '0 4px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .fnav-root { display: none !important; }
        }
        .fnav-link {
          font-family: Inter, sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${PAPER};
          opacity: 0.55;
          padding: 10px 14px;
          border-radius: 2px;
          text-decoration: none;
          transition: opacity 0.15s, color 0.15s;
          white-space: nowrap;
          position: relative;
        }
        .fnav-link:hover {
          opacity: 0.9;
          color: ${PAPER};
        }
        .fnav-link.active {
          opacity: 1;
          color: ${BRASS_LIGHT};
        }
        .fnav-link.active::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 14px;
          right: 14px;
          height: 1px;
          background: ${BRASS};
          border-radius: 1px;
        }
        .fnav-sep {
          width: 1px;
          height: 14px;
          background: hsl(220,20%,25%);
          flex-shrink: 0;
        }
      `}</style>

      {PAGES.map((page, i) => (
        <span key={page.href} style={{ display: 'flex', alignItems: 'center' }}>
          {i > 0 && <span className="fnav-sep" />}
          <Link href={page.href} className={`fnav-link${isActive(page.href) ? ' active' : ''}`}>
            {page.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}

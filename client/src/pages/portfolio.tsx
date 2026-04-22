import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  ChevronRight,
  Download,
  ExternalLink,
  Globe,
  Mail,
  ShieldCheck,
  TrendingUp,
  Zap,
  ArrowLeft,
  Loader2,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { ProjectRow } from '@shared/schema';

export default function PortfolioPage() {
  const [activeSector, setActiveSector] = useState('All');
  const [selectedProject, setSelectedProject] = useState<ProjectRow | null>(null);

  useEffect(() => {
    const title = 'Portfolio — Mujeeb Lawal | Senior Project Manager';
    const desc = 'Selected delivery portfolio from Mujeeb Lawal — 17+ years, £50M+ delivered across 7 sectors. Signature transformation programmes in financial services, insurance, sustainability and more.';
    const url = typeof window !== 'undefined' ? window.location.href : '';

    document.title = title;

    const setMeta = (selector: string, attr: string, key: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    setMeta('meta[name="description"]', 'name', 'description', desc);
    // OpenGraph
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', desc);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    if (url) setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    // Twitter
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', desc);
  }, []);

  // Per-project metadata (OG) when a detail dialog is open
  useEffect(() => {
    if (!selectedProject) return;
    const t = `${selectedProject.title} — ${selectedProject.client} | Mujeeb Lawal`;
    const d = selectedProject.summary || selectedProject.impact;
    document.title = t;
    const setMeta = (selector: string, attr: string, key: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };
    setMeta('meta[property="og:title"]', 'property', 'og:title', t);
    setMeta('meta[property="og:description"]', 'property', 'og:description', d);
    if (selectedProject.heroImage) {
      setMeta('meta[property="og:image"]', 'property', 'og:image', selectedProject.heroImage);
      setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', selectedProject.heroImage);
    }

    // Per-project JSON-LD (CreativeWork / CaseStudy)
    const json = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: selectedProject.title,
      headline: selectedProject.title,
      about: selectedProject.sector,
      description: selectedProject.description || selectedProject.summary || selectedProject.impact,
      datePublished: selectedProject.year,
      creator: { '@type': 'Person', name: 'Mujeeb Lawal' },
      sourceOrganization: { '@type': 'Organization', name: selectedProject.client },
      image: selectedProject.heroImage || undefined,
      url: typeof window !== 'undefined' ? window.location.origin + '/portfolio#' + selectedProject.slug : undefined,
    };
    let s = document.getElementById('project-jsonld') as HTMLScriptElement | null;
    if (!s) {
      s = document.createElement('script');
      s.type = 'application/ld+json';
      s.id = 'project-jsonld';
      document.head.appendChild(s);
    }
    s.textContent = JSON.stringify(json);
    return () => {
      const el = document.getElementById('project-jsonld');
      if (el) el.remove();
    };
  }, [selectedProject]);

  const { data: projects = [], isLoading, isError } = useQuery<ProjectRow[]>({
    queryKey: ['/api/projects'],
  });

  const sectors = useMemo(() => {
    const set = new Set<string>(projects.map(p => p.sector));
    return ['All', ...Array.from(set)];
  }, [projects]);

  const featuredProject = useMemo(
    () => projects.find(p => p.featured) ?? projects[0],
    [projects]
  );

  const gridProjects = useMemo(() => {
    const list = featuredProject
      ? projects.filter(p => p.id !== featuredProject.id)
      : projects;
    return activeSector === 'All' ? list : list.filter(p => p.sector === activeSector);
  }, [projects, featuredProject, activeSector]);

  const showFeatured =
    featuredProject &&
    (activeSector === 'All' || activeSector === featuredProject.sector);

  // JSON-LD structured data
  useEffect(() => {
    if (projects.length === 0) return;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Mujeeb Lawal — Project Portfolio',
      description: 'Signature delivery programmes across financial services, insurance, sustainability and tech.',
      hasPart: projects.map(p => ({
        '@type': 'CreativeWork',
        name: p.title,
        about: p.sector,
        creator: { '@type': 'Person', name: 'Mujeeb Lawal' },
        sourceOrganization: { '@type': 'Organization', name: p.client },
        datePublished: p.year,
        description: p.impact,
      })),
    };
    let script = document.getElementById('portfolio-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'portfolio-jsonld';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
    return () => {
      const s = document.getElementById('portfolio-jsonld');
      if (s) s.remove();
    };
  }, [projects]);

  const handleProjectClick = (project: ProjectRow) => {
    setSelectedProject(project);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-cyan-500/30">
      <style dangerouslySetInnerHTML={{ __html: `
        .portfolio-glass-panel {
          background: rgba(20, 20, 25, 0.6);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
      ` }} />

      {/* Top Nav */}
      <div className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white"
              data-testid="button-back-home"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/insights">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white" data-testid="link-insights">
                Insights
              </Button>
            </Link>
            <a href="mailto:odmlawal@gmail.com">
              <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 text-white border-0" data-testid="button-contact-top">
                <Mail className="w-4 h-4 mr-2" /> Contact
              </Button>
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-20">
        {/* Header Band */}
        <header className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-cyan-400">
                <Briefcase className="w-5 h-5" />
                <span className="font-mono text-sm uppercase tracking-wider">Delivery Portfolio</span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-light text-white tracking-tight" data-testid="text-portfolio-title">
                Selected Projects
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-light">
                17 years. £50M+ delivered. 7 sectors.
                <br className="hidden md:block" />
                A curated selection of signature transformation programmes.
              </p>
            </div>

            {sectors.length > 1 && (
              <div className="flex flex-wrap gap-2 max-w-md md:justify-end">
                {sectors.map(sector => (
                  <button
                    key={sector}
                    onClick={() => setActiveSector(sector)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 border ${
                      activeSector === sector
                        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                        : 'bg-transparent border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-600'
                    }`}
                    data-testid={`filter-sector-${sector.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {sector}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Separator className="bg-slate-800/50" />
        </header>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          </div>
        )}

        {/* Error state */}
        {!isLoading && isError && (
          <div className="text-center py-24 portfolio-glass-panel rounded-xl border-dashed border-rose-900/40">
            <ShieldCheck className="w-12 h-12 text-rose-400/70 mx-auto mb-4" />
            <h3 className="text-xl text-white font-display mb-2">Couldn't load portfolio</h3>
            <p className="text-slate-400 font-light">There was a problem loading the case studies. Please refresh and try again.</p>
          </div>
        )}

        {/* Empty state when no projects exist at all */}
        {!isLoading && !isError && projects.length === 0 && (
          <div className="text-center py-24 portfolio-glass-panel rounded-xl border-dashed border-slate-800">
            <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl text-white font-display mb-2">Portfolio coming soon</h3>
            <p className="text-slate-400 font-light">
              Selected case studies will appear here shortly.
            </p>
          </div>
        )}

        {/* Hero Feature Card */}
        {showFeatured && featuredProject && (
          <section
            className="relative group cursor-pointer"
            onClick={() => handleProjectClick(featuredProject)}
            data-testid={`card-featured-${featuredProject.id}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10" />
            <div className="portfolio-glass-panel rounded-2xl overflow-hidden flex flex-col lg:flex-row border-slate-800/60 transition-colors duration-500 group-hover:border-cyan-500/30 relative z-10">
              {/* Hero Brand Area */}
              <div className="lg:w-2/5 bg-gradient-to-br from-slate-900 to-black p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/50 relative overflow-hidden min-h-[320px]">
                {featuredProject.heroImage ? (
                  <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{ backgroundImage: `url(${featuredProject.heroImage})` }}
                  />
                ) : (
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Globe className="w-48 h-48 text-cyan-400" />
                  </div>
                )}

                <div className="flex items-start justify-between relative z-10">
                  <Badge variant="outline" className="bg-black/50 border-cyan-500/30 text-cyan-300 font-mono text-xs">
                    Signature Case Study
                  </Badge>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 transition-colors duration-500">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="mt-16 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    {featuredProject.logo ? (
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2 flex-shrink-0">
                        <img
                          src={featuredProject.logo}
                          alt={featuredProject.client}
                          className="w-full h-full object-contain"
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 flex-shrink-0">
                        <Building2 className="w-7 h-7 text-slate-400" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-slate-400 uppercase tracking-widest font-mono mb-1">
                        {featuredProject.sector}
                      </p>
                      <p className="text-xl text-white font-medium">{featuredProject.client}</p>
                    </div>
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl font-light text-white leading-tight mb-4">
                    {featuredProject.title}
                  </h2>
                  <p className="font-mono text-cyan-400 text-sm md:text-base flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {featuredProject.metric}
                  </p>
                </div>
              </div>

              {/* Hero Content Area */}
              <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-black/40">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-3">The Challenge</h3>
                    <p className="text-slate-300 leading-relaxed text-lg font-light">
                      {featuredProject.challenge}
                    </p>
                  </div>
                  <Separator className="bg-slate-800/50" />
                  <div>
                    <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-3">The Impact</h3>
                    <p className="text-white leading-relaxed text-xl font-light">
                      {featuredProject.impact}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 pt-4 flex-wrap">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 font-mono uppercase">Timeline</span>
                      <span className="text-slate-300 font-medium">{featuredProject.year}</span>
                    </div>
                    {featuredProject.role && (
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-mono uppercase">Role</span>
                        <span className="text-slate-300 font-medium">{featuredProject.role}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3-Column Grid */}
        {!isLoading && projects.length > 0 && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridProjects.map(project => (
                <article
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
                  className="group relative portfolio-glass-panel rounded-xl flex flex-col h-full hover:bg-white/[0.02] transition-colors duration-500 border border-slate-800/60 hover:border-slate-700 cursor-pointer overflow-hidden"
                  data-testid={`card-project-${project.id}`}
                >
                  {project.heroImage ? (
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-900">
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        data-testid={`img-card-hero-${project.id}`}
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    <div className="w-full aspect-[16/9] bg-gradient-to-br from-slate-900 to-slate-800/40 flex items-center justify-center">
                      <Briefcase className="w-10 h-10 text-slate-700" />
                    </div>
                  )}

                  <div className="p-6 border-b border-slate-800/50 flex-grow">
                    <div className="flex items-start justify-between mb-5 gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {project.logo ? (
                          <div className="w-10 h-10 bg-white rounded-lg p-1.5 flex items-center justify-center flex-shrink-0">
                            <img
                              src={project.logo}
                              alt={project.client}
                              className="w-full h-full object-contain"
                              onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 flex-shrink-0">
                            <Building2 className="w-5 h-5 text-slate-400" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs text-slate-500 font-mono uppercase tracking-wider truncate">
                            {project.sector}
                          </p>
                          <p className="text-slate-200 font-medium truncate">{project.client}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors flex-shrink-0" />
                    </div>

                    <h3 className="font-display text-2xl font-light text-white mb-3 group-hover:text-cyan-100 transition-colors">
                      {project.title}
                    </h3>

                    <p
                      className="text-slate-300 text-sm font-light leading-relaxed mb-4 line-clamp-3"
                      data-testid={`text-card-summary-${project.id}`}
                    >
                      {project.summary || project.challenge}
                    </p>

                    {project.outcomes && project.outcomes.length > 0 && (
                      <ul
                        className="space-y-1.5 mt-4 pt-4 border-t border-slate-800/50"
                        data-testid={`list-card-outcomes-${project.id}`}
                      >
                        {project.outcomes.slice(0, 3).map((o, i) => (
                          <li key={i} className="flex gap-2 text-xs text-slate-400 leading-snug">
                            <span className="text-cyan-400/80 mt-[3px]">▸</span>
                            <span className="line-clamp-1">{o}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="p-6 bg-black/20 mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center gap-2 text-cyan-400/90 font-mono text-sm bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                        <Zap className="w-3.5 h-3.5" />
                        {project.metric}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                      <span>{project.year}</span>
                      <span className="uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Read Case Study
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {gridProjects.length === 0 && !showFeatured && (
              <div className="text-center py-24 portfolio-glass-panel rounded-xl border-dashed border-slate-800">
                <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl text-white font-display mb-2">No projects found</h3>
                <p className="text-slate-400 font-light">Try selecting a different sector.</p>
                <Button
                  variant="outline"
                  className="mt-6 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
                  onClick={() => setActiveSector('All')}
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </section>
        )}

        {/* Footer CTA Strip */}
        <section className="relative overflow-hidden rounded-2xl border border-cyan-900/30 bg-gradient-to-r from-slate-900 to-black p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10">
            <h2 className="font-display text-2xl md:text-3xl text-white font-light mb-2">
              Want the full case study?
            </h2>
            <p className="text-slate-400 font-light text-lg">
              Detailed methodologies, risk frameworks, and architectural decisions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
            <Link href="/#hero">
              <Button
                size="lg"
                variant="outline"
                className="bg-black/50 border-slate-700 text-white hover:bg-slate-800 hover:text-white font-medium h-12 px-6 w-full"
                data-testid="button-cta-download-cv"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </Link>
            <a href="mailto:odmlawal@gmail.com">
              <Button
                size="lg"
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium h-12 px-8 border-0 w-full"
                data-testid="button-cta-contact"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Mujeeb
              </Button>
            </a>
          </div>
        </section>
      </main>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0a0a0d] border border-slate-800 text-slate-300">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4 mb-4">
                  {selectedProject.logo ? (
                    <div className="w-14 h-14 bg-white rounded-lg p-1.5 flex items-center justify-center flex-shrink-0">
                      <img
                        src={selectedProject.logo}
                        alt={selectedProject.client}
                        className="w-full h-full object-contain"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 flex-shrink-0">
                      <Building2 className="w-6 h-6 text-slate-400" />
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-cyan-400 font-mono uppercase tracking-wider mb-1">
                      {selectedProject.sector} · {selectedProject.year}
                    </p>
                    <DialogTitle className="font-display text-2xl md:text-3xl font-light text-white text-left">
                      {selectedProject.title}
                    </DialogTitle>
                    <DialogDescription className="text-slate-400 mt-1">
                      {selectedProject.client}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {selectedProject.heroImage && (
                <img
                  src={selectedProject.heroImage}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg border border-slate-800"
                />
              )}

              <div className="inline-flex items-center gap-2 text-cyan-400/90 font-mono text-sm bg-cyan-500/10 px-3 py-1.5 rounded border border-cyan-500/20 self-start">
                <Zap className="w-4 h-4" />
                {selectedProject.metric}
              </div>

              <div className="space-y-6 pt-2">
                {selectedProject.summary && (
                  <p className="text-base text-slate-200 leading-relaxed font-light italic border-l-2 border-cyan-500/40 pl-4">
                    {selectedProject.summary}
                  </p>
                )}
                <div>
                  <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-2">The Challenge</h3>
                  <p className="text-slate-300 leading-relaxed font-light">
                    {selectedProject.challenge}
                  </p>
                </div>
                <Separator className="bg-slate-800/50" />
                <div>
                  <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-2">The Impact</h3>
                  <p className="text-white leading-relaxed font-light">
                    {selectedProject.impact}
                  </p>
                </div>
                {selectedProject.description && (
                  <>
                    <Separator className="bg-slate-800/50" />
                    <div>
                      <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-2">Project Detail</h3>
                      <div className="text-slate-300 leading-relaxed font-light whitespace-pre-line">
                        {selectedProject.description}
                      </div>
                    </div>
                  </>
                )}
                {selectedProject.outcomes && selectedProject.outcomes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-2">Outcomes</h3>
                    <ul className="space-y-1.5">
                      {selectedProject.outcomes.map((o, i) => (
                        <li key={i} className="flex gap-2 text-slate-300 font-light" data-testid={`text-outcome-${i}`}>
                          <span className="text-cyan-400 mt-1">▸</span><span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedProject.galleryImages && selectedProject.galleryImages.length > 0 && (
                  <div>
                    <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-2">Gallery</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedProject.galleryImages.map((src, i) => (
                        <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="block">
                          <img
                            src={src}
                            alt={`${selectedProject.title} gallery ${i + 1}`}
                            className="w-full h-28 object-cover rounded-md border border-slate-800 hover-elevate"
                            data-testid={`img-gallery-${i}`}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  {selectedProject.role && (
                    <div>
                      <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-2">Role</h3>
                      <p className="text-slate-300 font-light">{selectedProject.role}</p>
                    </div>
                  )}
                  {selectedProject.duration && (
                    <div>
                      <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-2">Duration</h3>
                      <p className="text-slate-300 font-light" data-testid="text-detail-duration">{selectedProject.duration}</p>
                    </div>
                  )}
                </div>
                {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                  <div>
                    <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-2">Tools & Methods</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((t, i) => (
                        <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-slate-800/70 border border-slate-700 text-slate-300" data-testid={`badge-tech-${i}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
                {selectedProject.externalUrl && (
                  <a
                    href={selectedProject.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                    data-testid="link-detail-external"
                  >
                    <Button variant="outline" className="w-full border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-cyan-500/10">
                      <ExternalLink className="w-4 h-4 mr-2" /> Visit Project
                    </Button>
                  </a>
                )}
                <a href="mailto:odmlawal@gmail.com" className="flex-1">
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white border-0" data-testid="button-detail-contact">
                    <Mail className="w-4 h-4 mr-2" /> Discuss This Project
                  </Button>
                </a>
                <Button
                  variant="outline"
                  onClick={() => setSelectedProject(null)}
                  className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
                  data-testid="button-detail-close"
                >
                  <X className="w-4 h-4 mr-2" /> Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

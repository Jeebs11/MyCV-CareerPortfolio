import React, { useState } from "react";
import { 
  ArrowUpRight, 
  Briefcase, 
  Building2, 
  ChevronRight, 
  Download, 
  ExternalLink, 
  Globe, 
  Leaf, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Zap 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// -- DATA --
const HERO_PROJECT = {
  id: "hero",
  title: "PMO Build & Optimisation",
  client: "Mercer",
  logo: "https://logo.clearbit.com/mercer.com",
  sector: "Financial Services",
  metric: "36% efficiency gain · £1.2M budget · 34-person team",
  challenge: "The group risk division lacked a standardised governance framework, leading to fragmented reporting and inefficient resource allocation across a global portfolio.",
  impact: "Designed and implemented a centralised PMO from the ground up. Standardised reporting cycles, trained 34 personnel, and deployed new tooling, resulting in a 36% reduction in operational overhead.",
  year: "2022–2024",
  externalUrl: false,
};

const PROJECTS = [
  {
    id: "p1",
    title: "FCA-Regulated Insurance Platform",
    client: "Simply Business",
    logo: "https://logo.clearbit.com/simplybusiness.co.uk",
    sector: "Insurance",
    metric: "Delivered 4 weeks early",
    challenge: "Complex regulatory requirements threatened to delay the launch of a new digital insurance product for SME customers.",
    impact: "Orchestrated cross-functional squads to align agile delivery with strict compliance milestones, accelerating time-to-market.",
    year: "2021–2022",
    externalUrl: true,
  },
  {
    id: "p2",
    title: "UN-SDG Energy Reduction Programme",
    client: "GSMA",
    logo: "https://logo.clearbit.com/gsma.com",
    sector: "Sustainability",
    metric: "35% energy reduction",
    challenge: "Required a scalable framework to track and reduce energy consumption across global office footprints in alignment with UN Sustainable Development Goals.",
    impact: "Led the implementation of IoT monitoring and operational policy changes, significantly lowering the carbon baseline.",
    year: "2019–2021",
    externalUrl: true,
  },
  {
    id: "p3",
    title: "Global Reinsurance Migration",
    client: "Marsh McLennan",
    logo: "https://logo.clearbit.com/marsh.com",
    sector: "Insurance",
    metric: "£8M cost saved",
    challenge: "Legacy on-premise systems were creating high maintenance costs and data silos across international reinsurance hubs.",
    impact: "Directed a multi-year cloud migration strategy, consolidating data centres and unifying underwriting platforms globally.",
    year: "2017–2019",
    externalUrl: false,
  },
  {
    id: "p4",
    title: "Digital Transformation",
    client: "Telecoms Client",
    logo: null,
    sector: "Telecoms",
    metric: "£15M programme value",
    challenge: "Siloed customer service channels resulted in poor resolution times and disjointed user experiences.",
    impact: "Managed the end-to-end rollout of an omnichannel contact centre solution, integrating voice, chat, and social.",
    year: "2016–2018",
    externalUrl: false,
  },
  {
    id: "p5",
    title: "Pension Scheme Compliance",
    client: "JLT",
    logo: "https://logo.clearbit.com/jlt.com", // Fallback to icon if fails
    sector: "RegTech",
    metric: "100% audit pass rate",
    challenge: "Upcoming legislative changes required an overhaul of data handling and reporting for massive pension portfolios.",
    impact: "Implemented automated compliance checks and data remediation processes well ahead of regulatory deadlines.",
    year: "2015–2017",
    externalUrl: false,
  },
  {
    id: "p6",
    title: "Virtual Events Platform",
    client: "6Connex",
    logo: "https://logo.clearbit.com/6connex.com",
    sector: "Tech",
    metric: "Scaled to 50k+ concurrent users",
    challenge: "Rapid surge in remote work demanded an immediate scaling of the platform's infrastructure and feature set.",
    impact: "Led an accelerated product roadmap, delivering high-availability streaming architecture and robust engagement tools.",
    year: "2020–2021",
    externalUrl: true,
  },
  {
    id: "p7",
    title: "Lloyd's Market Onboarding",
    client: "Lloyd's",
    logo: "https://logo.clearbit.com/lloyds.com",
    sector: "Insurance",
    metric: "50% faster onboarding",
    challenge: "Manual and paper-heavy processes were creating severe bottlenecks for new syndicates entering the market.",
    impact: "Digitised the syndicate approval workflow, introducing secure portal access and automated background checks.",
    year: "2018–2020",
    externalUrl: true,
  },
  {
    id: "p8",
    title: "Customer Data Platform Rollout",
    client: "Public Sector",
    logo: null,
    sector: "Public Sector",
    metric: "2M+ records migrated",
    challenge: "Fragmented citizen data across legacy databases hindered the delivery of joined-up public services.",
    impact: "Governed a high-security data migration project, establishing a single source of truth under strict privacy protocols.",
    year: "2014–2016",
    externalUrl: false,
  },
];

const SECTORS = ["All", "Financial Services", "Insurance", "Sustainability", "Telecoms", "RegTech", "Tech", "Public Sector"];

export function MagazineGrid() {
  const [activeSector, setActiveSector] = useState("All");

  const filteredProjects = activeSector === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.sector === activeSector);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-cyan-500/30">
      <style dangerouslySetInline={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono-custom { font-family: 'JetBrains Mono', monospace; }
        
        .glass-panel {
          background: rgba(20, 20, 25, 0.6);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .cyan-glow {
          box-shadow: 0 0 40px -10px rgba(6, 182, 212, 0.15);
        }
      `}} />

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-20">
        
        {/* Header Band */}
        <header className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-cyan-400">
                <Briefcase className="w-5 h-5" />
                <span className="font-mono-custom text-sm uppercase tracking-wider">Delivery Portfolio</span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-light text-white tracking-tight">
                Selected Projects
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-light">
                17 years. £50M+ delivered. 7 sectors. <br className="hidden md:block"/> 
                A curated selection of signature transformation programmes.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 max-w-md justify-end">
              {SECTORS.map(sector => (
                <button
                  key={sector}
                  onClick={() => setActiveSector(sector)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 border ${
                    activeSector === sector 
                      ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300" 
                      : "bg-transparent border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-600"
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>
          <Separator className="bg-slate-800/50" />
        </header>

        {/* Hero Feature Card */}
        {(activeSector === "All" || activeSector === HERO_PROJECT.sector) && (
          <section className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10" />
            <div className="glass-panel rounded-2xl overflow-hidden flex flex-col lg:flex-row border-slate-800/60 transition-colors duration-500 group-hover:border-cyan-500/30 relative z-10">
              
              {/* Hero Image / Brand Area */}
              <div className="lg:w-2/5 bg-gradient-to-br from-slate-900 to-black p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Globe className="w-48 h-48 text-cyan-400" />
                </div>
                
                <div className="flex items-start justify-between relative z-10">
                  <Badge variant="outline" className="bg-black/50 border-cyan-500/30 text-cyan-300 font-mono-custom text-xs">
                    Signature Case Study
                  </Badge>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 transition-colors duration-500">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="mt-16 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2">
                      <img src={HERO_PROJECT.logo} alt={HERO_PROJECT.client} className="w-full h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 uppercase tracking-widest font-mono-custom mb-1">{HERO_PROJECT.sector}</p>
                      <p className="text-xl text-white font-medium">{HERO_PROJECT.client}</p>
                    </div>
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl font-light text-white leading-tight mb-4">
                    {HERO_PROJECT.title}
                  </h2>
                  <p className="font-mono-custom text-cyan-400 text-sm md:text-base flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {HERO_PROJECT.metric}
                  </p>
                </div>
              </div>

              {/* Hero Content Area */}
              <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-black/40">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-mono-custom text-slate-500 uppercase tracking-wider mb-3">The Challenge</h3>
                    <p className="text-slate-300 leading-relaxed text-lg font-light">
                      {HERO_PROJECT.challenge}
                    </p>
                  </div>
                  <Separator className="bg-slate-800/50" />
                  <div>
                    <h3 className="text-sm font-mono-custom text-slate-500 uppercase tracking-wider mb-3">The Impact</h3>
                    <p className="text-white leading-relaxed text-xl font-light">
                      {HERO_PROJECT.impact}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 pt-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 font-mono-custom uppercase">Timeline</span>
                      <span className="text-slate-300 font-medium">{HERO_PROJECT.year}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 font-mono-custom uppercase">Role</span>
                      <span className="text-slate-300 font-medium">PMO Lead</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3-Column Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <article 
                key={project.id} 
                className="group relative glass-panel rounded-xl flex flex-col h-full hover:bg-white/[0.02] transition-colors duration-500 border border-slate-800/60 hover:border-slate-700 cursor-pointer overflow-hidden"
              >
                {/* Top Section */}
                <div className="p-6 border-b border-slate-800/50 flex-grow">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      {project.logo ? (
                        <div className="w-10 h-10 bg-white rounded-lg p-1.5 flex items-center justify-center">
                          <img src={project.logo} alt={project.client} className="w-full h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                          <Building2 className="w-5 h-5 text-slate-400" />
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-slate-500 font-mono-custom uppercase tracking-wider">{project.sector}</p>
                        <p className="text-slate-200 font-medium">{project.client}</p>
                      </div>
                    </div>
                    {project.externalUrl ? (
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                    )}
                  </div>
                  
                  <h3 className="font-display text-2xl font-light text-white mb-4 group-hover:text-cyan-100 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                    {project.challenge}
                  </p>
                </div>
                
                {/* Bottom Section */}
                <div className="p-6 bg-black/20 mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-2 text-cyan-400/90 font-mono-custom text-sm bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                      <Zap className="w-3.5 h-3.5" />
                      {project.metric}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono-custom text-slate-500">
                    <span>{project.year}</span>
                    <span className="uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.externalUrl ? "View Live ↗" : "Read Case Study"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-24 glass-panel rounded-xl border-dashed border-slate-800">
              <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl text-white font-display mb-2">No projects found</h3>
              <p className="text-slate-400 font-light">Try selecting a different sector.</p>
              <Button 
                variant="outline" 
                className="mt-6 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
                onClick={() => setActiveSector("All")}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>

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
            <Button size="lg" variant="outline" className="bg-black/50 border-slate-700 text-white hover:bg-slate-800 hover:text-white font-medium h-12 px-6">
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium h-12 px-8 border-0 shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.6)] transition-all">
              <Mail className="w-4 h-4 mr-2" />
              Contact Mujeeb
            </Button>
          </div>
        </section>
        
      </main>
    </div>
  );
}

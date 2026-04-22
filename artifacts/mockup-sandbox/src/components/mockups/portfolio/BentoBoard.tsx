import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronRight, Briefcase, Globe, ShieldCheck, Sparkles, Leaf, Building2, Download, Mail, Zap, Target, LayoutDashboard, Clock } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: "FCA-Regulated Insurance Platform",
    client: "Simply Business",
    logo: "https://logo.clearbit.com/simplybusiness.co.uk",
    sector: "Insurance / RegTech",
    metric: "£8M cost saved",
    year: "2022–2024",
    challenge: "Led the end-to-end delivery of a new FCA-compliant insurance platform. Replaced legacy monolithic systems with microservices architecture while maintaining 100% regulatory compliance and zero downtime for 800k+ SME customers.",
    isExternal: true,
    size: "col-span-1 md:col-span-2 row-span-2", // 2x2 Hero
    type: "feature",
    bgClass: "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-cyan-500/20 hover:border-cyan-500/40",
    icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />
  },
  {
    id: 2,
    name: "£50M+",
    metricType: "stat",
    sector: "Portfolio Value",
    challenge: "Successfully delivered across financial services, telco, and public sectors.",
    size: "col-span-1 md:col-span-1 row-span-1", // 1x1 Metric
    bgClass: "bg-gradient-to-br from-blue-900/40 to-cyan-900/20 border-blue-500/20",
    icon: <Target className="w-5 h-5 text-blue-400" />
  },
  {
    id: 3,
    name: "PMO Build & Optimisation",
    client: "Mercer",
    logo: "https://logo.clearbit.com/mercer.com",
    sector: "Financial Services",
    metric: "36% efficiency gain",
    year: "2020–2022",
    challenge: "Designed and implemented a global PMO framework. Standardised reporting, governance, and resource allocation across 40+ concurrent projects.",
    isExternal: false,
    size: "col-span-1 md:col-span-1 row-span-2", // 1x2 Tall
    bgClass: "bg-slate-900/60 border-white/5 hover:border-white/10",
    icon: <Briefcase className="w-5 h-5 text-slate-300" />
  },
  {
    id: 4,
    name: "UN-SDG Energy Reduction Programme",
    client: "GSMA",
    logo: "https://logo.clearbit.com/gsma.com",
    sector: "Sustainability / Telecoms",
    metric: "35% energy reduction",
    year: "2019–2021",
    challenge: "Directed global sustainability initiative aligning mobile network operators with UN Sustainable Development Goals.",
    isExternal: true,
    size: "col-span-1 md:col-span-2 row-span-1", // 2x1 Wide
    bgClass: "bg-slate-900/60 border-white/5 hover:border-white/10",
    icon: <Leaf className="w-5 h-5 text-emerald-400" />
  },
  {
    id: 5,
    name: "7 Sectors",
    metricType: "stat",
    sector: "Cross-Industry",
    challenge: "Versatile delivery spanning heavily regulated and agile environments.",
    size: "col-span-1 md:col-span-1 row-span-1", // 1x1 Metric
    bgClass: "bg-gradient-to-tr from-slate-800/40 to-slate-900/40 border-slate-700/50",
    icon: <Globe className="w-5 h-5 text-slate-400" />
  },
  {
    id: 6,
    name: "Global Reinsurance Migration",
    client: "Marsh McLennan",
    logo: "https://logo.clearbit.com/marsh.com",
    sector: "Insurance",
    metric: "Delivered 4 weeks early",
    year: "2018–2019",
    challenge: "Managed complex data migration for reinsurance division, coordinating offshore teams and legacy system decommissioning.",
    isExternal: false,
    size: "col-span-1 md:col-span-1 row-span-1", // 1x1
    bgClass: "bg-slate-900/60 border-white/5 hover:border-white/10",
    icon: <Building2 className="w-5 h-5 text-slate-300" />
  },
  {
    id: 7,
    name: "Virtual Events Platform",
    client: "6Connex",
    logo: "https://logo.clearbit.com/6connex.com",
    sector: "Digital Tech",
    metric: "£1.2M budget · 34-person team",
    year: "2020",
    challenge: "Scaled delivery capabilities during pandemic peak, accelerating platform features to meet 400% user growth.",
    isExternal: true,
    size: "col-span-1 md:col-span-2 row-span-1", // 2x1 Wide
    bgClass: "bg-slate-900/60 border-white/5 hover:border-white/10",
    icon: <Zap className="w-5 h-5 text-amber-400" />
  },
  {
    id: 8,
    name: "17 Years",
    metricType: "stat",
    sector: "Delivery Excellence",
    challenge: "Consistent track record of recovering failing projects and driving strategic change.",
    size: "col-span-1 md:col-span-1 row-span-1", // 1x1 Metric
    bgClass: "bg-gradient-to-br from-cyan-900/20 to-slate-900/60 border-cyan-500/10",
    icon: <Clock className="w-5 h-5 text-cyan-400" />
  },
  {
    id: 9,
    name: "Lloyd's Market Onboarding",
    client: "Lloyd's",
    logo: "https://logo.clearbit.com/lloyds.com",
    sector: "Insurance",
    metric: "100% compliance",
    year: "2017–2018",
    challenge: "Streamlined syndicate onboarding workflows, replacing manual processes with automated data pipelines.",
    isExternal: false,
    size: "col-span-1 md:col-span-1 row-span-1", // 1x1
    bgClass: "bg-slate-900/60 border-white/5 hover:border-white/10",
    icon: <LayoutDashboard className="w-5 h-5 text-slate-300" />
  },
];

export function BentoBoard() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-50 dark relative overflow-hidden font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .glass-panel {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
      `}} />

      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        
        {/* Header Band */}
        <header className="mb-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Signature Delivery Portfolio</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight mb-4">
                Selected Projects
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl">
                17 years. <span className="text-white font-medium">£50M+ delivered.</span> 7 sectors. From FCA-regulated migrations to UN sustainability programmes.
              </p>
            </div>
            
            {/* Filter / Legend */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Insurance', 'Financial Services', 'Telecoms', 'Sustainability'].map((tag, i) => (
                <button 
                  key={tag}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    i === 0 
                      ? 'bg-white text-slate-900' 
                      : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] gap-4 md:gap-6">
          {projects.map((project) => {
            
            if (project.metricType === "stat") {
              return (
                <div 
                  key={project.id}
                  className={`group relative overflow-hidden rounded-3xl border glass-panel p-6 flex flex-col justify-between transition-transform hover:-translate-y-1 ${project.size} ${project.bgClass}`}
                >
                  <div className="flex items-center justify-between opacity-80">
                    <span className="text-sm font-medium uppercase tracking-wider">{project.sector}</span>
                    {project.icon}
                  </div>
                  <div>
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{project.name}</h3>
                    <p className="text-slate-400 text-sm">{project.challenge}</p>
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={project.id}
                className={`group relative overflow-hidden rounded-3xl border glass-panel p-6 md:p-8 flex flex-col transition-all hover:shadow-2xl hover:shadow-cyan-500/5 ${project.size} ${project.bgClass} ${project.isExternal ? 'cursor-pointer' : 'cursor-default'}`}
              >
                {/* Background decorative elements for hero cards */}
                {project.type === 'feature' && (
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px] group-hover:bg-cyan-500/20 transition-all duration-500" />
                )}

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 overflow-hidden flex items-center justify-center p-2 backdrop-blur-md">
                      <img src={project.logo} alt={project.client} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-300 block">{project.client}</span>
                      <span className="text-xs text-slate-500">{project.sector}</span>
                    </div>
                  </div>
                  
                  {project.isExternal ? (
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  ) : (
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-slate-400 font-normal">
                      Case Study
                    </Badge>
                  )}
                </div>

                <div className="mt-auto relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-xs px-2.5 py-0.5 rounded-full hover:bg-cyan-500/20">
                      {project.metric}
                    </Badge>
                    <span className="text-xs text-slate-500 font-mono">{project.year}</span>
                  </div>
                  
                  <h3 className={`font-display font-bold text-white mb-3 ${project.size.includes('row-span-2') ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                    {project.name}
                  </h3>
                  
                  <p className={`text-slate-400 leading-relaxed ${project.size.includes('row-span-2') ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'}`}>
                    {project.challenge}
                  </p>
                </div>
                
                {/* Interactive glow border effect on hover */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 pointer-events-none transition-colors duration-500" />
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <div className="bg-gradient-to-r from-slate-900 to-slate-900/50 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 glass-panel relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-cyan-500/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">Want the full case studies?</h2>
              <p className="text-slate-400">Download the detailed CV or get in touch to discuss your upcoming delivery challenges.</p>
            </div>
            
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Button size="lg" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white rounded-xl h-12 px-6">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200 rounded-xl h-12 px-6 font-medium">
                <Mail className="w-4 h-4 mr-2" />
                Contact Mujeeb
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

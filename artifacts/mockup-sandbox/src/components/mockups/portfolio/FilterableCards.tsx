import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Briefcase, Building2, Globe, ShieldCheck, Sparkles, Leaf, Download, Mail } from "lucide-react";

type Sector = "All" | "Insurance" | "Financial Services" | "Telecoms" | "Sustainability" | "RegTech" | "Public Sector";

interface Project {
  id: string;
  name: string;
  client: string;
  logoUrl?: string;
  sector: Sector;
  metric: string;
  summary: string;
  yearRange: string;
  externalUrl?: string;
}

const projects: Project[] = [
  {
    id: "1",
    name: "Global Reinsurance Migration",
    client: "Marsh McLennan",
    logoUrl: "https://logo.clearbit.com/marsh.com",
    sector: "Insurance",
    metric: "£8M cost saved",
    summary: "Led the migration of legacy reinsurance platforms to a unified cloud architecture. Consolidated data across 14 regions while maintaining regulatory compliance.",
    yearRange: "2022–2024",
  },
  {
    id: "2",
    name: "Group Risk PMO Build",
    client: "Mercer",
    logoUrl: "https://logo.clearbit.com/mercer.com",
    sector: "Financial Services",
    metric: "36% efficiency gain",
    summary: "Established a centralized Project Management Office from the ground up. Standardized governance frameworks and reporting across a £50M+ portfolio.",
    yearRange: "2020–2022",
  },
  {
    id: "3",
    name: "UN-SDG Energy Reduction Programme",
    client: "GSMA",
    logoUrl: "https://logo.clearbit.com/gsma.com",
    sector: "Sustainability",
    metric: "35% energy reduction",
    summary: "Directed a multi-national sustainability initiative aligned with UN SDGs. Coordinated with telecom operators globally to optimize energy consumption.",
    yearRange: "2019–2021",
    externalUrl: "https://example.com"
  },
  {
    id: "4",
    name: "FCA-Regulated Insurance Platform",
    client: "Simply Business",
    logoUrl: "https://logo.clearbit.com/simplybusiness.co.uk",
    sector: "RegTech",
    metric: "Delivered 4 weeks early",
    summary: "Managed the end-to-end delivery of a new digital insurance platform. Ensured strict adherence to FCA regulations and data security standards.",
    yearRange: "2021–2023",
  },
  {
    id: "5",
    name: "Virtual Events Platform Rollout",
    client: "6Connex",
    logoUrl: "https://logo.clearbit.com/6connex.com",
    sector: "Telecoms",
    metric: "£1.2M budget · 34-person team",
    summary: "Spearheaded the rapid deployment of a scalable virtual events platform during peak global demand. Managed cross-functional engineering pods.",
    yearRange: "2020–2021",
    externalUrl: "https://example.com"
  },
  {
    id: "6",
    name: "Lloyd's Market Onboarding",
    client: "Lloyd's",
    logoUrl: "https://logo.clearbit.com/lloyds.com",
    sector: "Insurance",
    metric: "Zero critical defects",
    summary: "Orchestrated the digital onboarding process for new market entrants. Streamlined workflows and reduced time-to-market for syndicate approvals.",
    yearRange: "2018–2020",
  },
  {
    id: "7",
    name: "Pension Scheme Compliance",
    client: "JLT",
    logoUrl: "https://logo.clearbit.com/jlt.com",
    sector: "Financial Services",
    metric: "100% audit pass rate",
    summary: "Delivered a comprehensive compliance overhaul for legacy pension schemes. Mitigated significant regulatory risks ahead of legislative deadlines.",
    yearRange: "2017–2019",
  },
  {
    id: "8",
    name: "Customer Data Platform",
    client: "Public Sector Client",
    sector: "Public Sector",
    metric: "2M+ records migrated",
    summary: "Led the implementation of a unified customer data platform. Improved service delivery metrics and enabled predictive analytics capabilities.",
    yearRange: "2023–Present",
  }
];

const sectors: Sector[] = ["All", "Insurance", "Financial Services", "Telecoms", "Sustainability", "RegTech", "Public Sector"];

export function FilterableCards() {
  const [activeSector, setActiveSector] = useState<Sector>("All");

  const filteredProjects = projects.filter(
    (p) => activeSector === "All" || p.sector === activeSector
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Header Band */}
      <div className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/80 border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                Selected Projects
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-['Inter']">
                17 years. £50M+ delivered. 7 sectors.
              </p>
            </div>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {sectors.map((sector) => (
                <button
                  key={sector}
                  onClick={() => setActiveSector(sector)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeSector === sector
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="bg-card/40 border-border/50 hover:bg-card/60 transition-colors duration-300 flex flex-col group overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-white/5 flex items-center justify-center p-2 border border-white/10 shrink-0">
                      {project.logoUrl ? (
                        <img src={project.logoUrl} alt={`${project.client} logo`} className="w-full h-full object-contain" />
                      ) : (
                        <Building2 className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">{project.client}</div>
                      <div className="text-xs text-muted-foreground/70">{project.yearRange}</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 font-normal shrink-0">
                    {project.sector}
                  </Badge>
                </div>
                
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-card-foreground leading-tight group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
              </CardHeader>
              
              <CardContent className="flex-1 pb-6">
                <div className="mb-4 inline-flex items-center rounded-md bg-secondary/40 px-3 py-1.5 text-sm font-['JetBrains_Mono'] font-medium text-foreground/90 border border-border/50">
                  <Sparkles className="w-3.5 h-3.5 mr-2 text-primary" />
                  {project.metric}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {project.summary}
                </p>
              </CardContent>
              
              <CardFooter className="pt-0 border-t border-border/20 mt-auto">
                <div className="w-full pt-4 flex justify-between items-center">
                  {project.externalUrl ? (
                    <a href={project.externalUrl} className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                      View live <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                    </a>
                  ) : (
                    <button className="inline-flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors group/btn">
                      Open case study <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="py-24 text-center">
            <Briefcase className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground">Try selecting a different sector filter.</p>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <footer className="border-t border-border/40 bg-secondary/20 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-foreground mb-2">Want the full case study?</h2>
            <p className="text-muted-foreground">Dive deeper into the methodology, governance, and delivery frameworks.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Button variant="outline" className="border-border/50 hover:bg-secondary/50">
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary),0.2)]">
              <Mail className="w-4 h-4 mr-2" />
              Contact Mujeeb
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

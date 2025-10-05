import { useState, useEffect, useRef } from 'react';
import { experiences, skills, keyAchievements } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ChatBot from '@/components/ChatBot';
import {
  TrendingUp,
  Award,
  Zap,
  Globe,
  MapPin,
  Leaf,
  Mail,
  Linkedin,
  Download,
  ArrowRight,
  Briefcase,
  Code,
  Users,
  Target,
  ChevronDown
} from 'lucide-react';

const iconMap: Record<string, any> = {
  TrendingUp,
  Award,
  Zap,
  Globe,
  MapPin,
  Leaf
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(270,8%,12%)] via-[hsl(260,10%,15%)] to-[hsl(240,12%,18%)]">
      <Navigation scrollToSection={scrollToSection} />
      
      <HeroSection scrollToSection={scrollToSection} />
      
      <MetricsDashboard />
      
      <CareerTimeline activeRegion={activeRegion} setActiveRegion={setActiveRegion} />
      
      <GeographicMap activeRegion={activeRegion} setActiveRegion={setActiveRegion} />
      
      <SkillsShowcase />
      
      <ContactSection />
      
      <Footer />
      
      <ChatBot />
    </div>
  );
}

function Navigation({ scrollToSection }: { scrollToSection: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[hsl(270,8%,12%)]/80 backdrop-blur-xl border-b border-white/10' : ''
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] flex items-center justify-center font-display font-bold text-white">
              ML
            </div>
            <span className="font-display text-xl text-white hidden sm:block">Mujeeb Lawal</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-sm text-white/70 hover:text-white transition-colors"
              data-testid="link-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className="text-sm text-white/70 hover:text-white transition-colors"
              data-testid="link-experience"
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="text-sm text-white/70 hover:text-white transition-colors"
              data-testid="link-skills"
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-sm text-white/70 hover:text-white transition-colors"
              data-testid="link-contact"
            >
              Contact
            </button>
          </div>
          
          <Button 
            onClick={() => scrollToSection('contact')}
            className="bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0"
            data-testid="button-cta-nav"
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ scrollToSection }: { scrollToSection: (id: string) => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" data-testid="section-hero">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(190,85%,55%)]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(220,90%,60%)]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(270,65%,35%)]/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge 
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
                data-testid="badge-status"
              >
                Available for New Opportunities
              </Badge>
              
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight" data-testid="text-hero-title">
                Senior Project Manager
              </h1>
              
              <p className="text-xl sm:text-2xl text-white/80" data-testid="text-hero-subtitle">
                Delivering Multi-Million Pound Programmes Across 4 Continents
              </p>
              
              <p className="text-lg text-white/60 max-w-xl" data-testid="text-hero-description">
                17+ years of expertise in international project delivery, Agile transformation, and PMO leadership. 
                Trusted by Fortune 500 companies to deliver complex, regulated programmes on time and within budget.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0 hover-elevate active-elevate-2"
                onClick={() => scrollToSection('contact')}
                data-testid="button-primary-cta"
              >
                Let's Talk <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/10"
                onClick={() => scrollToSection('experience')}
                data-testid="button-secondary-cta"
              >
                View Experience
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/10"
                onClick={() => window.open('https://www.linkedin.com/in/mujeeb-lawal-experienced-project-manager/', '_blank')}
                data-testid="button-download-cv"
              >
                <Download className="mr-2 w-4 h-4" /> LinkedIn Profile
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-4">
              <a 
                href="mailto:odmlawal@gmail.com"
                className="text-white/60 hover:text-white transition-colors"
                data-testid="link-email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/mujeeb-lawal-experienced-project-manager/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <FloatingCards />
          </div>
        </div>
        
        <button 
          onClick={() => scrollToSection('metrics')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/60 transition-colors animate-bounce"
          data-testid="button-scroll-indicator"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}

function FloatingCards() {
  return (
    <div className="relative w-full h-[500px]">
      <Card className="absolute top-0 right-0 w-64 bg-white/5 backdrop-blur-xl border-white/10 p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300 hover-elevate" data-testid="card-floating-1">
        <Briefcase className="w-8 h-8 text-[hsl(190,85%,55%)] mb-3" />
        <h3 className="font-semibold text-white mb-2">PMO Leadership</h3>
        <p className="text-sm text-white/60">Established frameworks across Europe & MENA</p>
      </Card>
      
      <Card className="absolute top-20 left-0 w-64 bg-white/5 backdrop-blur-xl border-white/10 p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300 hover-elevate" data-testid="card-floating-2">
        <Users className="w-8 h-8 text-[hsl(220,90%,60%)] mb-3" />
        <h3 className="font-semibold text-white mb-2">Global Teams</h3>
        <p className="text-sm text-white/60">Coordinated across 6 time zones</p>
      </Card>
      
      <Card className="absolute bottom-20 right-10 w-64 bg-white/5 backdrop-blur-xl border-white/10 p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300 hover-elevate" data-testid="card-floating-3">
        <Target className="w-8 h-8 text-[hsl(145,70%,50%)] mb-3" />
        <h3 className="font-semibold text-white mb-2">£1.2M+ Delivered</h3>
        <p className="text-sm text-white/60">FCA-regulated programmes</p>
      </Card>
      
      <Card className="absolute bottom-0 left-10 w-64 bg-white/5 backdrop-blur-xl border-white/10 p-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300 hover-elevate" data-testid="card-floating-4">
        <Code className="w-8 h-8 text-[hsl(25,85%,60%)] mb-3" />
        <h3 className="font-semibold text-white mb-2">AI Integration</h3>
        <p className="text-sm text-white/60">Developed AI time-tracking tools</p>
      </Card>
    </div>
  );
}

function MetricsDashboard() {
  return (
    <section id="metrics" className="relative py-20" data-testid="section-metrics">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4" data-testid="text-metrics-title">
            Impact by Numbers
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Quantifiable results from 17+ years of international project delivery
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {keyAchievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon];
            return (
              <AnimatedMetricCard key={index} achievement={achievement} Icon={Icon} index={index} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AnimatedMetricCard({ achievement, Icon, index }: { achievement: any; Icon: any; index: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numericString = achievement.metric.replace(/[£+%M]/g, '').trim();
    const target = parseFloat(numericString);
    if (isNaN(target)) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, achievement.metric]);

  const hasDecimal = achievement.metric.includes('.');
  const displayValue = hasDecimal ? count.toFixed(1) : Math.floor(count);

  return (
    <Card
      ref={ref}
      className="bg-white/5 backdrop-blur-xl border-white/10 p-6 text-center hover-elevate"
      style={{ animationDelay: `${index * 100}ms` }}
      data-testid={`card-metric-${index}`}
    >
      <Icon className="w-8 h-8 text-[hsl(190,85%,55%)] mx-auto mb-3" />
      <div className="font-mono text-3xl font-bold text-white mb-2">
        {achievement.metric.includes('£') && '£'}
        {isVisible ? displayValue : hasDecimal ? '0.0' : '0'}
        {achievement.metric.includes('M') && 'M'}
        {achievement.metric.includes('+') && '+'}
        {achievement.metric.includes('%') && '%'}
      </div>
      <p className="text-sm text-white/60">{achievement.description}</p>
    </Card>
  );
}

function CareerTimeline({ activeRegion, setActiveRegion }: { activeRegion: string | null; setActiveRegion: (region: string | null) => void }) {
  return (
    <section id="experience" className="relative py-20" data-testid="section-experience">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Career Journey
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Delivering complex programmes across insurance, fintech, telecoms, and engineering sectors
          </p>
        </div>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <TimelineCard 
              key={exp.id} 
              experience={exp} 
              index={index}
              onHover={() => setActiveRegion(exp.region)}
              onLeave={() => setActiveRegion(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ experience, index, onHover, onLeave }: { experience: any; index: number; onHover: () => void; onLeave: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className="bg-white/5 backdrop-blur-xl border-white/10 p-6 sm:p-8 hover-elevate transition-all duration-300"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      data-testid={`card-experience-${index}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-md bg-gradient-to-br from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3 className="font-display text-xl font-bold text-white mb-1">{experience.role}</h3>
              <p className="text-[hsl(190,85%,55%)] font-medium">{experience.company}</p>
            </div>
            
            <div className="flex flex-col sm:items-end gap-2">
              <Badge 
                className={`${
                  experience.current 
                    ? 'bg-[hsl(145,70%,50%)]/20 border-[hsl(145,70%,50%)]/30 text-[hsl(145,70%,70%)]' 
                    : 'bg-white/10 border-white/20 text-white/70'
                } backdrop-blur-md`}
              >
                {experience.period}
              </Badge>
              <p className="text-sm text-white/50">{experience.location}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            {experience.achievements.slice(0, isExpanded ? undefined : 2).map((achievement: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(190,85%,55%)] mt-2 flex-shrink-0" />
                <p className="text-white/70 text-sm">{achievement}</p>
              </div>
            ))}
          </div>
          
          {experience.achievements.length > 2 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[hsl(190,85%,55%)] text-sm font-medium mt-3 hover:text-[hsl(190,85%,65%)] transition-colors"
              data-testid={`button-expand-${index}`}
            >
              {isExpanded ? 'Show Less' : `Show ${experience.achievements.length - 2} More`}
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}

function GeographicMap({ activeRegion, setActiveRegion }: { activeRegion: string | null; setActiveRegion: (region: string | null) => void }) {
  const regions = [
    { id: 'europe', name: 'Europe', projects: 8, left: '48%', top: '25%' },
    { id: 'uk', name: 'United Kingdom', projects: 12, left: '46%', top: '30%' },
    { id: 'mena', name: 'MENA', projects: 5, left: '55%', top: '45%' },
    { id: 'us', name: 'United States', projects: 4, left: '20%', top: '35%' },
    { id: 'asia', name: 'South East Asia', projects: 6, left: '75%', top: '50%' }
  ];

  return (
    <section id="global" className="relative py-20" data-testid="section-global">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Global Delivery Footprint
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Successfully delivered programmes across 4 continents, managing teams in 6 time zones
          </p>
        </div>
        
        <div className="relative w-full h-[500px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(270,8%,12%)]/50 to-[hsl(240,12%,18%)]/50" />
          
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 500">
            <path d="M 400 150 Q 500 100 600 200" stroke="hsl(190,85%,55%)" strokeWidth="2" fill="none" className="animate-pulse" />
            <path d="M 200 200 Q 400 150 450 180" stroke="hsl(190,85%,55%)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <path d="M 450 180 Q 600 150 750 300" stroke="hsl(190,85%,55%)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDelay: '1s' }} />
          </svg>
          
          {regions.map((region) => (
            <button
              key={region.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                activeRegion === region.id || activeRegion === null
                  ? 'opacity-100 scale-100'
                  : 'opacity-40 scale-90'
              }`}
              style={{ left: region.left, top: region.top }}
              onMouseEnter={() => setActiveRegion(region.id)}
              onMouseLeave={() => setActiveRegion(null)}
              data-testid={`button-region-${region.id}`}
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] flex items-center justify-center shadow-lg shadow-[hsl(190,85%,55%)]/50 hover-elevate">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                
                {(activeRegion === region.id || activeRegion === null) && (
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-md px-3 py-2 whitespace-nowrap">
                    <p className="text-white text-sm font-semibold">{region.name}</p>
                    <p className="text-white/60 text-xs">{region.projects} projects</p>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsShowcase() {
  const categories = {
    methodology: skills.filter(s => s.category === 'methodology'),
    certification: skills.filter(s => s.category === 'certification'),
    technical: skills.filter(s => s.category === 'technical'),
    domain: skills.filter(s => s.category === 'domain')
  };

  return (
    <section id="skills" className="relative py-20" data-testid="section-skills">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Certified methodologies and proven technical capabilities
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkillCategory title="Methodologies" skills={categories.methodology} color="hsl(190,85%,55%)" />
          <SkillCategory title="Certifications" skills={categories.certification} color="hsl(220,90%,60%)" />
          <SkillCategory title="Technical" skills={categories.technical} color="hsl(145,70%,50%)" />
          <SkillCategory title="Domain Expertise" skills={categories.domain} color="hsl(25,85%,60%)" />
        </div>
      </div>
    </section>
  );
}

function SkillCategory({ title, skills, color }: { title: string; skills: any[]; color: string }) {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 hover-elevate" data-testid={`card-skills-${title.toLowerCase().replace(' ', '-')}`}>
      <h3 className="font-display text-xl font-bold text-white mb-4">{title}</h3>
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-white/80 text-sm">{skill.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative py-20" data-testid="section-contact">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 sm:p-12">
          <div className="text-center space-y-6">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              Let's Work Together
            </h2>
            
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Looking for an experienced project manager to deliver your next critical programme? 
              Let's discuss how I can help drive your success.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0 hover-elevate active-elevate-2"
                onClick={() => window.location.href = 'mailto:odmlawal@gmail.com'}
                data-testid="button-email-contact"
              >
                <Mail className="mr-2 w-5 h-5" />
                odmlawal@gmail.com
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/10"
                onClick={() => window.open('https://www.linkedin.com/in/mujeeb-lawal-experienced-project-manager/', '_blank')}
                data-testid="button-linkedin-contact"
              >
                <Linkedin className="mr-2 w-5 h-5" />
                Connect on LinkedIn
              </Button>
            </div>
            
            <div className="pt-8 border-t border-white/10">
              <p className="text-white/50 text-sm">
                <span className="font-mono">+44 (0) 7908226038</span>
                <span className="mx-3">•</span>
                <span>London, UK</span>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/10" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] flex items-center justify-center font-display font-bold text-white text-sm">
              ML
            </div>
            <span className="text-white/60 text-sm">© 2025 Mujeeb Lawal. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="mailto:odmlawal@gmail.com"
              className="text-white/40 hover:text-white transition-colors"
              data-testid="link-footer-email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/mujeeb-lawal-experienced-project-manager/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              data-testid="link-footer-linkedin"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

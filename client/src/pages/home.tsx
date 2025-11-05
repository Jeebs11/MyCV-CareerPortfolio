import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { experiences, skills, keyAchievements, detailedCertifications, timelineProjects, industryExperience, education } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ChatBot = lazy(() => import('@/components/ChatBot'));
const SectionNavigation = lazy(() => import('@/components/SectionNavigation'));
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
  ChevronDown,
  CheckCircle2,
  Clock,
  DollarSign,
  BarChart3,
  ShieldCheck,
  Smile,
  AlertCircle,
  ExternalLink,
  Calendar,
  BookOpen,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  GraduationCap,
  Menu,
  Phone,
  MessageCircle
} from 'lucide-react';

const iconMap: Record<string, any> = {
  TrendingUp,
  Award,
  Zap,
  Globe,
  MapPin,
  Leaf,
  Calendar,
  Briefcase,
  Target,
  DollarSign,
  Users
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed navigation bar
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(270,8%,12%)] via-[hsl(260,10%,15%)] to-[hsl(240,12%,18%)]">
      <Navigation scrollToSection={scrollToSection} />
      <StickyContactBar />
      
      <HeroSection scrollToSection={scrollToSection} />
      
      <FlagshipAchievements />
      
      <SkillsAndCertificationsGrid />
      
      <CollapsibleCareerJourney />
      
      <ContactSection />
      
      <Footer />
      
      <Suspense fallback={null}>
        <SectionNavigation />
        <ChatBot />
      </Suspense>
    </div>
  );
}

function Navigation({ scrollToSection }: { scrollToSection: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showCVDialog, setShowCVDialog] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollable = documentHeight - windowHeight;
      const progress = (scrollTop / scrollable) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    setMobileMenuOpen(false);
    // Wait for menu to close before scrolling
    setTimeout(() => {
      scrollToSection(section);
    }, 300);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[hsl(270,8%,12%)]/80 backdrop-blur-xl border-b border-white/10' : ''
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] flex items-center justify-center font-display font-bold text-white text-sm">
              ML
            </div>
            <span className="font-display text-lg font-semibold text-white hidden sm:block">Mujeeb Lawal</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('career-journey')}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              data-testid="link-journey"
            >
              Journey
            </button>
            <a 
              href="/insights"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              data-testid="link-insights"
            >
              Thought Leadership
            </a>
            <Button 
              onClick={() => scrollToSection('contact')}
              size="sm"
              className="bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0 px-6"
              data-testid="button-cta-nav"
            >
              Get in Touch
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10"
                data-testid="button-mobile-menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
              <SheetContent 
                side="right" 
                className="bg-[hsl(270,8%,12%)]/95 backdrop-blur-xl border-white/10 w-[280px] sm:w-[320px]"
              >
                <SheetHeader>
                  <SheetTitle className="text-white font-display">Navigation</SheetTitle>
                  <SheetDescription className="text-white/60 text-sm">
                    Explore different sections of the portfolio
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <button 
                    onClick={() => handleNavClick('journey')}
                    className="text-left text-white/90 hover:text-white transition-colors py-3 px-4 rounded-md hover-elevate"
                    data-testid="mobile-link-journey"
                  >
                    <div className="font-medium">Journey</div>
                    <div className="text-sm text-white/60">17 Years of Experience</div>
                  </button>
                  <a 
                    href="/insights"
                    className="text-left text-white/90 hover:text-white transition-colors py-3 px-4 rounded-md hover-elevate"
                    data-testid="mobile-link-insights"
                  >
                    <div className="font-medium">Thought Leadership</div>
                    <div className="text-sm text-white/60">Articles & Insights</div>
                  </a>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setTimeout(() => setShowCVDialog(true), 300);
                    }}
                    className="text-left text-white/90 hover:text-white transition-colors py-3 px-4 rounded-md hover-elevate flex items-center gap-2"
                    data-testid="mobile-button-download-cv"
                  >
                    <Download className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Download CV</div>
                      <div className="text-sm text-white/60">Get my resume</div>
                    </div>
                  </button>
                </div>
              </SheetContent>
            </Sheet>
        </div>
      </div>
      
      {/* Scroll Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
        <div 
          className="h-full bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
          data-testid="scroll-progress-bar"
        />
      </div>
      
      {/* CV Download Dialog */}
      <CVDownloadDialog open={showCVDialog} onOpenChange={setShowCVDialog} />
    </nav>
  );
}

function StickyContactBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCVDialog, setShowCVDialog] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600); // Show after scrolling past hero
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed top-20 right-4 z-40 flex flex-col gap-2 sm:flex-row sm:gap-3" data-testid="sticky-contact-bar">
        <Button
          size="sm"
          variant="outline"
          className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/20 shadow-lg"
          onClick={() => setShowCVDialog(true)}
          data-testid="button-sticky-cv"
        >
          <Download className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">CV</span>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/20 shadow-lg"
          onClick={() => window.location.href = 'mailto:odmlawal@gmail.com'}
          data-testid="button-sticky-email"
        >
          <Mail className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Email</span>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/20 shadow-lg"
          onClick={() => window.open('https://wa.me/971509082234', '_blank')}
          data-testid="button-sticky-whatsapp"
        >
          <MessageCircle className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">WhatsApp</span>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/20 shadow-lg"
          onClick={() => window.open('https://www.linkedin.com/in/mujeeb-lawal-experienced-project-manager/', '_blank')}
          data-testid="button-sticky-linkedin"
        >
          <Linkedin className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">LinkedIn</span>
        </Button>
      </div>
      
      <CVDownloadDialog open={showCVDialog} onOpenChange={setShowCVDialog} />
    </>
  );
}

function FlagshipAchievements() {
  const flagshipProjects = [
    {
      id: 'flagship-1',
      title: 'Built PMO from Ground Up',
      company: 'Novocycle Technology',
      period: '2024',
      metrics: ['36% efficiency gain', '15+ team members', 'EU-funded programmes'],
      icon: Target,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'flagship-2',
      title: '34% Project Efficiency Improvement',
      company: 'JLT Specialty (Marsh & McLennan)',
      period: '2018',
      metrics: ['34% efficiency gain', 'Insurance sector', 'Process optimization'],
      icon: ShieldCheck,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'flagship-3',
      title: '35% Energy Reduction for UN SDGs',
      company: 'GSMA',
      period: '2019-2020',
      metrics: ['35% energy reduction', '8 tech onboardings', 'UN SDG alignment'],
      icon: Leaf,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section id="flagship-wins" className="relative py-16 md:py-24" data-testid="section-flagship">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white mb-4">
            Signature Wins
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Three Flagship Achievements
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
            Tangible business impact across regulated delivery, PMO leadership, and sustainability initiatives
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {flagshipProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <Card
                key={project.id}
                className="bg-white/5 backdrop-blur-sm border-white/10 p-6 md:p-8 hover-elevate transition-all group"
                data-testid={`card-flagship-${index + 1}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="space-y-4">
                  {/* Icon & Title */}
                  <div className="space-y-3">
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${project.color} p-3 flex items-center justify-center`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <span className="text-[hsl(190,85%,55%)] font-medium">{project.company}</span>
                        <span>•</span>
                        <span>{project.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.metrics.map((metric, idx) => (
                      <Badge 
                        key={idx}
                        className="text-xs bg-white/5 border-white/10 text-white/70"
                      >
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillsAndCertificationsGrid() {
  const skillsData = {
    methodologies: [
      'Agile (Scrum/Kanban)', 'Waterfall', 'Lean', 'SAFe', 'Prince2', 'Change Management', 'Rapid Application Development (RAD)', 'Software Development Life Cycle (SDLC)'
    ],
    tools: [
      'Jira', 'Confluence', 'MS Project', 'PowerBI', 'Tableau', 'Azure DevOps', 'Smartsheet'
    ],
    certifications: [
      { name: 'Prince2 Agile', status: 'certified' },
      { name: 'Scrum Master', status: 'certified' },
      { name: 'PMP', status: 'pursuing' },
      { name: 'CompTIA Security+', status: 'pursuing' }
    ],
    industries: [
      'Insurance & Financial Services',
      'Telecommunications',
      'Healthcare & Life Sciences',
      'Engineering & Technology',
      'Public Sector',
      'Events & Hospitality',
      'Energy & Sustainability'
    ]
  };

  return (
    <section id="skills" className="relative py-16 md:py-24" data-testid="section-skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white mb-4">
            Expertise Overview
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & Certifications
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
            Proven methodologies, tools, and credentials for enterprise-level programme delivery
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Methodologies & Frameworks */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 md:p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 p-2.5 flex items-center justify-center">
                  <Target className="w-full h-full text-white" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                  Methodologies & Frameworks
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsData.methodologies.map((method, idx) => (
                  <Badge 
                    key={idx}
                    className="text-sm bg-blue-500/10 border-blue-500/20 text-blue-300"
                  >
                    {method}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Tools & Technologies */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 md:p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-2.5 flex items-center justify-center">
                  <Code className="w-full h-full text-white" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                  Tools & Platforms
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsData.tools.map((tool, idx) => (
                  <Badge 
                    key={idx}
                    className="text-sm bg-purple-500/10 border-purple-500/20 text-purple-300"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Certifications */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 md:p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 p-2.5 flex items-center justify-center">
                  <Award className="w-full h-full text-white" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                  Certifications
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsData.certifications.map((cert, idx) => (
                  <Badge 
                    key={idx}
                    className={`text-sm ${
                      cert.status === 'pursuing' 
                        ? 'bg-green-500/5 border-green-500/30 border-dashed text-green-300' 
                        : 'bg-green-500/10 border-green-500/20 text-green-300'
                    }`}
                  >
                    {cert.name}
                    {cert.status === 'pursuing' && (
                      <span className="ml-1 text-xs opacity-70">(Pursuing)</span>
                    )}
                    {cert.status === 'certified' && (
                      <span className="ml-1 text-xs opacity-70">✓</span>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Industry Experience */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 md:p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 p-2.5 flex items-center justify-center">
                  <Briefcase className="w-full h-full text-white" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                  Industry Experience (7 Sectors)
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsData.industries.map((industry, idx) => (
                  <Badge 
                    key={idx}
                    className="text-sm bg-orange-500/10 border-orange-500/20 text-orange-300"
                  >
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function CollapsibleCareerJourney() {
  // Company domain mapping for logo fetching via Clearbit
  const companyDomains: Record<string, string> = {
    'Novocycle Technology': 'novocycle.com',
    'Simply Business': 'simplybusiness.com',
    'Mercer': 'mercer.com',
    'GSMA': 'gsma.com',
    '6Connex': '6connex.com',
    'Verizon': 'verizon.com',
    'Reed': 'reed.com',
    'BAM Nuttall': 'bamnuttall.co.uk',
    'MedPlus': 'medplus.in',
    'Netscribes': 'netscribes.com',
    'Zenta Healthcare': 'zenta.co.uk',
    'TLC': 'tlc.org'
  };

  const getCompanyLogo = (companyName: string) => {
    const domain = companyDomains[companyName];
    return domain ? `https://logo.clearbit.com/${domain}` : null;
  };

  return (
    <section id="career-journey" className="relative py-16 md:py-24" data-testid="section-career-journey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white mb-4">
            Full Career History
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            17-Year Career Journey
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
            12 companies • 7 industries • £50M+ delivered across regulated and complex programmes
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {timelineProjects.map((project, index) => {
            const logoUrl = getCompanyLogo(project.company);
            
            return (
              <AccordionItem 
                key={project.id} 
                value={project.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
                data-testid={`accordion-career-${index}`}
              >
                <AccordionTrigger className="px-4 md:px-6 py-4 hover:no-underline hover-elevate">
                  <div className="flex items-center gap-3 md:gap-4 w-full text-left">
                    {/* Company Logo */}
                    {logoUrl ? (
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white p-2 flex items-center justify-center">
                        <img 
                          src={logoUrl} 
                          alt={`${project.company} logo`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            // Fallback to initials if logo fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<span class="text-sm font-bold text-gray-800">${project.company.substring(0, 2).toUpperCase()}</span>`;
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white p-2 flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-800">
                          {project.company.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}

                    {/* Role & Company Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm md:text-base mb-1">
                        {project.role}
                      </h3>
                      <div className="flex items-center gap-2 text-xs md:text-sm text-white/60 flex-wrap">
                        <span className="text-[hsl(190,85%,55%)]">{project.company}</span>
                        <span>•</span>
                        <span>{project.period}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">{project.location}</span>
                      </div>
                    </div>

                    {/* Status Badges - Far Right */}
                    <div className="flex flex-col gap-1.5 flex-shrink-0 items-end ml-auto">
                      <Badge 
                        className={`text-xs ${
                          project.employmentType === 'Contract' 
                            ? 'bg-orange-500/20 border-orange-500/30 text-orange-300' 
                            : 'bg-blue-500/20 border-blue-500/30 text-blue-300'
                        }`}
                      >
                        {project.employmentType}
                      </Badge>
                      {project.current && (
                        <Badge className="text-xs bg-green-500/20 border-green-500/30 text-green-300">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-4 md:px-6 pb-4">
                  <div className="space-y-4 pt-2">
                    {/* Role Description */}
                    {project.description && (
                      <div>
                        <p className="text-white/80 text-sm md:text-base leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    )}

                    {/* Key Achievements */}
                    <div>
                      <h4 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Key Impact
                      </h4>
                      <ul className="space-y-2">
                        {project.keyAchievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[hsl(190,85%,55%)] mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-white/80">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics & Details */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                      <Badge className="text-xs bg-white/5 border-white/10 text-white/70">
                        {project.industry}
                      </Badge>
                      {project.projectType && (
                        <Badge className="text-xs bg-white/5 border-white/10 text-white/70">
                          {project.projectType}
                        </Badge>
                      )}
                      {project.budget && (
                        <Badge className="text-xs bg-[hsl(190,85%,55%)]/20 border-[hsl(190,85%,55%)]/30 text-[hsl(190,85%,65%)]">
                          Budget: {project.budget}
                        </Badge>
                      )}
                      {project.teamSize && (
                        <Badge className="text-xs bg-white/5 border-white/10 text-white/70">
                          Team: {project.teamSize} people
                        </Badge>
                      )}
                    </div>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-white/70 mb-2">Technologies & Tools</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <Badge key={idx} className="text-xs bg-white/5 border-white/10 text-white/70">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}

function VerticalCareerTimeline() {
  const [selectedProject, setSelectedProject] = useState<typeof timelineProjects[0] | null>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(true);

  const handleDesktopScroll = () => {
    if (!desktopScrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = desktopScrollRef.current;
    setShowTopFade(scrollTop > 20);
    setShowBottomFade(scrollTop < scrollHeight - clientHeight - 20);
  };

  return (
    <div className="w-full">
      <div className="mb-4 text-center lg:text-left">
        <Badge 
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white"
          data-testid="badge-career-timeline"
        >
          Career Journey
        </Badge>
        <h3 className="font-display text-2xl font-bold text-white mt-2" data-testid="text-career-timeline-title">
          17 Years • 12 Companies
        </h3>
      </div>

      <div className="relative">
        {/* Desktop: Vertical scrollable carousel */}
        <div className="hidden lg:block relative">
          {/* Top fade overlay */}
          {showTopFade && (
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[hsl(270,8%,12%)] to-transparent pointer-events-none z-10" />
          )}
          
          <div 
            ref={desktopScrollRef}
            onScroll={handleDesktopScroll}
            className="max-h-[500px] overflow-y-auto space-y-3 py-2 scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            data-testid="carousel-desktop"
          >
            {timelineProjects.map((project) => (
              <Card
                key={project.id}
                className="bg-white/5 backdrop-blur-xl border-white/10 p-4 hover-elevate cursor-pointer transition-all"
                onClick={() => setSelectedProject(project)}
                data-testid={`card-career-${project.id}`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      <Badge 
                        className="text-xs bg-gradient-to-r from-[hsl(190,85%,55%)]/20 to-[hsl(220,90%,60%)]/20 border-[hsl(190,85%,55%)]/30 text-white"
                        data-testid={`badge-career-period-${project.id}`}
                      >
                        {project.period}
                      </Badge>
                      <Badge 
                        className={`text-xs ${
                          project.employmentType === 'Contract' 
                            ? 'bg-orange-500/20 border-orange-500/30 text-orange-300' 
                            : 'bg-blue-500/20 border-blue-500/30 text-blue-300'
                        }`}
                        data-testid={`badge-career-employment-${project.id}`}
                      >
                        {project.employmentType}
                      </Badge>
                    </div>
                    {project.current && (
                      <Badge className="text-xs bg-green-500/20 border-green-500/30 text-green-300" data-testid={`badge-career-current-${project.id}`}>
                        Current
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold text-white text-sm leading-tight mb-1" data-testid={`text-career-role-${project.id}`}>
                      {project.role}
                    </h4>
                    <p className="text-[hsl(190,85%,55%)] text-sm font-medium" data-testid={`text-career-company-${project.id}`}>
                      {project.company}
                    </p>
                    <p className="text-xs text-white/60" data-testid={`text-career-location-${project.id}`}>
                      {project.location}
                    </p>
                  </div>

                  {project.description && (
                    <p className="text-sm text-white/70 leading-relaxed" data-testid={`text-career-description-${project.id}`}>
                      {project.description}
                    </p>
                  )}

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Badge variant="outline" className="text-xs border-white/20 text-white/70" data-testid={`badge-career-industry-${project.id}`}>
                      {project.industry}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-white/20 text-white/70" data-testid={`badge-career-type-${project.id}`}>
                      {project.projectType}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom fade overlay */}
          {showBottomFade && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[hsl(270,8%,12%)] to-transparent pointer-events-none z-10" />
          )}
        </div>

        {/* Mobile: Vertical single-column stack */}
        <div className="lg:hidden relative">
          <div className="space-y-3" data-testid="carousel-mobile">
            {timelineProjects.map((project) => (
              <Card
                key={project.id}
                className="bg-white/5 backdrop-blur-xl border-white/10 p-4 hover-elevate cursor-pointer w-full"
                onClick={() => setSelectedProject(project)}
                data-testid={`card-career-mobile-${project.id}`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      <Badge 
                        className="text-xs bg-gradient-to-r from-[hsl(190,85%,55%)]/20 to-[hsl(220,90%,60%)]/20 border-[hsl(190,85%,55%)]/30 text-white"
                        data-testid={`badge-career-mobile-period-${project.id}`}
                      >
                        {project.period}
                      </Badge>
                      <Badge 
                        className={`text-xs ${
                          project.employmentType === 'Contract' 
                            ? 'bg-orange-500/20 border-orange-500/30 text-orange-300' 
                            : 'bg-blue-500/20 border-blue-500/30 text-blue-300'
                        }`}
                        data-testid={`badge-career-mobile-employment-${project.id}`}
                      >
                        {project.employmentType}
                      </Badge>
                    </div>
                    {project.current && (
                      <Badge className="text-xs bg-green-500/20 border-green-500/30 text-green-300" data-testid={`badge-career-mobile-current-${project.id}`}>
                        Current
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold text-white text-sm leading-tight mb-1" data-testid={`text-career-mobile-role-${project.id}`}>
                      {project.role}
                    </h4>
                    <p className="text-[hsl(190,85%,55%)] text-sm font-medium" data-testid={`text-career-mobile-company-${project.id}`}>
                      {project.company}
                    </p>
                    <p className="text-xs text-white/60" data-testid={`text-career-mobile-location-${project.id}`}>
                      {project.location}
                    </p>
                  </div>

                  {project.description && (
                    <p className="text-sm text-white/70 leading-relaxed" data-testid={`text-career-mobile-description-${project.id}`}>
                      {project.description}
                    </p>
                  )}

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Badge variant="outline" className="text-xs border-white/20 text-white/70" data-testid={`badge-career-mobile-industry-${project.id}`}>
                      {project.industry}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-white/20 text-white/70" data-testid={`badge-career-mobile-type-${project.id}`}>
                      {project.projectType}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Position Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent 
          className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-black/90 backdrop-blur-xl border border-white/10" 
          data-testid="dialog-career-detail"
        >
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-4">
                  <div className="flex-1">
                    <DialogTitle className="text-xl sm:text-2xl font-display mb-2 text-white pr-6" data-testid="text-dialog-role">
                      {selectedProject.role}
                    </DialogTitle>
                    <DialogDescription className="text-base sm:text-lg text-[hsl(190,85%,55%)] font-medium" data-testid="text-dialog-company">
                      {selectedProject.company}
                    </DialogDescription>
                  </div>
                  {selectedProject.current && (
                    <Badge className="bg-green-500/20 border-green-500/30 text-green-300" data-testid="badge-dialog-current">
                      Current Position
                    </Badge>
                  )}
                </div>
              </DialogHeader>

              <div className="space-y-5 sm:space-y-6">
                {/* Overview Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-white/60" />
                    <div>
                      <p className="text-xs text-white/60">Period</p>
                      <p className="text-sm font-medium text-white" data-testid="text-dialog-period">{selectedProject.period}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-white/60" />
                    <div>
                      <p className="text-xs text-white/60">Location</p>
                      <p className="text-sm font-medium text-white" data-testid="text-dialog-location">{selectedProject.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-white/60" />
                    <div>
                      <p className="text-xs text-white/60">Industry</p>
                      <p className="text-sm font-medium text-white" data-testid="text-dialog-industry">{selectedProject.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-white/60" />
                    <div>
                      <p className="text-xs text-white/60">Project Type</p>
                      <p className="text-sm font-medium text-white" data-testid="text-dialog-type">{selectedProject.projectType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-white/60" />
                    <div>
                      <p className="text-xs text-white/60">Employment Type</p>
                      <Badge 
                        className={`text-xs ${
                          selectedProject.employmentType === 'Contract' 
                            ? 'bg-orange-500/20 border-orange-500/30 text-orange-300' 
                            : 'bg-blue-500/20 border-blue-500/30 text-blue-300'
                        }`}
                        data-testid="text-dialog-employment"
                      >
                        {selectedProject.employmentType}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {selectedProject.description && (
                  <div>
                    <p className="text-base text-white/80 leading-relaxed" data-testid="text-dialog-description">
                      {selectedProject.description}
                    </p>
                  </div>
                )}

                {/* Full Impact */}
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-3 flex items-center gap-2 text-white">
                    <Award className="w-5 h-5 text-[hsl(190,85%,55%)]" />
                    Full Impact
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.keyAchievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2" data-testid={`text-dialog-achievement-${idx}`}>
                        <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/80">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Additional Details */}
                {(selectedProject.budget || selectedProject.teamSize || selectedProject.technologies) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-white/10">
                    {selectedProject.budget && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-white/60" />
                        <div>
                          <p className="text-xs text-white/60">Budget</p>
                          <p className="text-sm font-medium text-white" data-testid="text-dialog-budget">{selectedProject.budget}</p>
                        </div>
                      </div>
                    )}
                    {selectedProject.teamSize && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-white/60" />
                        <div>
                          <p className="text-xs text-white/60">Team Size</p>
                          <p className="text-sm font-medium text-white" data-testid="text-dialog-team">{selectedProject.teamSize} members</p>
                        </div>
                      </div>
                    )}
                    {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                      <div className="col-span-full">
                        <div className="flex items-center gap-2 mb-2">
                          <Code className="w-4 h-4 text-white/60" />
                          <p className="text-xs text-white/60">Technologies</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, idx) => (
                            <Badge 
                              key={`${selectedProject.id}-${tech}-${idx}`} 
                              variant="outline" 
                              className="text-xs border-white/20 text-white/70 bg-white/5" 
                              data-testid={`badge-dialog-tech-${selectedProject.id}-${tech.toLowerCase().replace(/\s+/g, '-')}-${idx}`}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function HeroSection({ scrollToSection }: { scrollToSection: (id: string) => void }) {
  const [showCVDialog, setShowCVDialog] = useState(false);

  return (
    <section id="hero" className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24" data-testid="section-hero">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-[hsl(190,85%,55%)]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-[hsl(220,90%,60%)]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[hsl(270,65%,35%)]/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="flex flex-col items-center text-center">
          <div className="space-y-6 md:space-y-8 max-w-5xl">
            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-green-500/20 border border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs md:text-sm font-medium text-green-300" data-testid="badge-status">
                  Open to new opportunities
                </span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]" data-testid="text-hero-title">
                Senior Project Manager
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] mt-2">
                  £50M+ Delivery | 17+ Years
                </span>
              </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-center justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0 hover-elevate active-elevate-2 text-base md:text-lg px-8 md:px-10 py-6 md:py-7 w-full sm:w-auto font-semibold"
                onClick={() => setShowCVDialog(true)}
                data-testid="button-primary-cta"
              >
                <Download className="mr-2 w-5 h-5" /> Download CV
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/10 text-base md:text-lg px-8 md:px-10 py-6 md:py-7 w-full sm:w-auto"
                onClick={() => scrollToSection('contact')}
                data-testid="button-secondary-cta"
              >
                <Mail className="mr-2 w-5 h-5" /> Get in Touch
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2 text-sm text-white/70 justify-center">
              <a 
                href="mailto:odmlawal@gmail.com"
                className="hover:text-white transition-colors flex items-center gap-2"
                data-testid="link-email"
              >
                <Mail className="w-4 h-4" />
                <span>odmlawal@gmail.com</span>
              </a>
              <span className="text-white/30 hidden sm:block">|</span>
              <a 
                href="https://www.linkedin.com/in/mujeeb-lawal-experienced-project-manager/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-2"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Profile</span>
              </a>
              <span className="text-white/30 hidden sm:block">|</span>
              <a 
                href="https://wa.me/971509082234"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-2"
                data-testid="link-whatsapp"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => scrollToSection('flagship-wins')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/60 transition-colors animate-bounce"
          data-testid="button-scroll-indicator"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
      
      <CVDownloadDialog open={showCVDialog} onOpenChange={setShowCVDialog} />
    </section>
  );
}

function MetricsDashboard() {
  return (
    <section id="metrics" className="relative py-12 md:py-20" data-testid="section-metrics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4" data-testid="text-metrics-title">
            Impact by Numbers
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto px-4">
            Quantifiable results from 17+ years of international project delivery
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
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
      className="bg-white/5 backdrop-blur-xl border-white/10 p-4 md:p-6 text-center hover-elevate"
      style={{ animationDelay: `${index * 100}ms` }}
      data-testid={`card-metric-${index}`}
    >
      <Icon className="w-6 h-6 md:w-8 md:h-8 text-[hsl(190,85%,55%)] mx-auto mb-2 md:mb-3" />
      <div className="font-mono text-2xl md:text-3xl font-bold text-white mb-2">
        {achievement.metric.includes('£') && '£'}
        {isVisible ? displayValue : hasDecimal ? '0.0' : '0'}
        {achievement.metric.includes('M') && 'M'}
        {achievement.metric.includes('+') && '+'}
        {achievement.metric.includes('%') && '%'}
      </div>
      <p className="text-xs md:text-sm text-white/60 leading-tight">{achievement.description}</p>
    </Card>
  );
}

function CareerTimeline({ activeRegion, setActiveRegion }: { activeRegion: string | null; setActiveRegion: (region: string | null) => void }) {
  return (
    <section id="experience" className="relative py-12 md:py-20" data-testid="section-experience">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            Career Journey
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto px-4">
            Delivering complex programmes across insurance, fintech, telecoms, and engineering sectors
          </p>
        </div>
        
        <div className="space-y-4 md:space-y-6">
          {timelineProjects.map((exp, index) => (
            <TimelineCard 
              key={exp.id} 
              experience={exp} 
              index={index}
              onHover={() => setActiveRegion(null)}
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
  const [showImpactDialog, setShowImpactDialog] = useState(false);

  return (
    <>
      <Card
        className="bg-white/5 backdrop-blur-xl border-white/10 p-4 sm:p-6 md:p-8 hover-elevate transition-all duration-300"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        data-testid={`card-experience-${index}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-gradient-to-br from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] flex items-center justify-center">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-1 leading-tight">{experience.role}</h3>
                <p className="text-[hsl(190,85%,55%)] font-medium text-sm sm:text-base">{experience.company}</p>
              </div>
              
              <div className="flex flex-col sm:items-end gap-2">
                <div className="flex flex-wrap gap-1.5 justify-end">
                  <Badge 
                    className={`${
                      experience.current 
                        ? 'bg-[hsl(145,70%,50%)]/20 border-[hsl(145,70%,50%)]/30 text-[hsl(145,70%,70%)]' 
                        : 'bg-white/10 border-white/20 text-white/70'
                    } backdrop-blur-md text-xs`}
                  >
                    {experience.period}
                  </Badge>
                  <Badge 
                    className={`text-xs ${
                      experience.employmentType === 'Contract' 
                        ? 'bg-orange-500/20 border-orange-500/30 text-orange-300' 
                        : 'bg-blue-500/20 border-blue-500/30 text-blue-300'
                    }`}
                    data-testid={`badge-timeline-employment-${index}`}
                  >
                    {experience.employmentType}
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-white/50">{experience.location}</p>
              </div>
            </div>
            
            {experience.description && (
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-3" data-testid={`text-career-journey-description-${index}`}>
                {experience.description}
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-4">
              <Button
                size="sm"
                variant="ghost"
                className="text-xs text-[hsl(190,85%,55%)] hover:text-[hsl(190,85%,65%)] h-auto py-2 px-3 w-full sm:w-auto justify-center sm:justify-start"
                onClick={() => setShowImpactDialog(true)}
                data-testid={`button-view-impact-exp-${index}`}
              >
                View Full Impact <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Impact Dialog */}
      <Dialog open={showImpactDialog} onOpenChange={(open) => { if (!open) setShowImpactDialog(false); }}>
        <DialogContent className="bg-[hsl(270,8%,12%)] border-white/10 text-white max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl sm:text-2xl text-white pr-6">
              {experience.role}
            </DialogTitle>
            <DialogDescription className="text-[hsl(190,85%,55%)] text-sm sm:text-base">
              {experience.company} • {experience.period}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Full Impact
              </h3>
              <ul className="space-y-2.5">
                {experience.keyAchievements && experience.keyAchievements.map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(190,85%,55%)] mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-white/80 leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Badge className="text-xs bg-white/5 border-white/10 text-white/70">
                {experience.industry}
              </Badge>
              <Badge className="text-xs bg-white/5 border-white/10 text-white/70">
                {experience.location}
              </Badge>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
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
    <section id="global" className="relative py-12 md:py-20" data-testid="section-global">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            Global Delivery Footprint
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto px-4">
            Successfully delivered programmes across 4 continents, managing teams in 6 time zones
          </p>
        </div>
        
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden">
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
              onClick={() => setActiveRegion(activeRegion === region.id ? null : region.id)}
              data-testid={`button-region-${region.id}`}
            >
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] flex items-center justify-center shadow-lg shadow-[hsl(190,85%,55%)]/50 hover-elevate">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                
                {/* Desktop: show on hover or all, Mobile: show only on click */}
                {activeRegion === region.id && (
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-md px-3 py-2 whitespace-nowrap z-10">
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


function CertificationsWall() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [selectedEdu, setSelectedEdu] = useState<string | null>(null);

  return (
    <section id="certifications" className="relative py-12 md:py-20" data-testid="section-certifications">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            Certifications & Education
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto px-4">
            Industry-recognized qualifications and academic credentials
          </p>
        </div>

        <div className="space-y-10 md:space-y-12">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[hsl(190,85%,55%)]" />
              Professional Certifications
            </h3>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {detailedCertifications.map((cert, index) => (
                <Card
                  key={cert.id}
                  className="bg-white/5 backdrop-blur-xl border-white/10 p-6 hover-elevate transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedCert(selectedCert === cert.id ? null : cert.id)}
                  data-testid={`card-cert-${index}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-md bg-gradient-to-br from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] flex items-center justify-center flex-shrink-0">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-xl font-bold text-white mb-1">{cert.name}</h3>
                      <p className="text-[hsl(190,85%,55%)] text-sm mb-2">{cert.issuer}</p>
                      
                      <div className="flex items-center gap-2 text-xs text-white/50 mb-3">
                        <Calendar className="w-3 h-3" />
                        <span>Obtained {cert.dateObtained}</span>
                        {cert.verificationUrl && (
                          <>
                            <span>•</span>
                            <a 
                              href={cert.verificationUrl}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 text-[hsl(190,85%,55%)] hover:text-[hsl(190,85%,65%)]"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Verify
                            </a>
                          </>
                        )}
                      </div>

                      {selectedCert === cert.id && (
                        <div className="space-y-3 mt-4 pt-4 border-t border-white/10">
                          <p className="text-sm text-white/70">{cert.description}</p>
                          
                          <div>
                            <p className="text-xs font-semibold text-white mb-2">Skills Validated:</p>
                            <div className="flex flex-wrap gap-2">
                              {cert.skills.map((skill, idx) => (
                                <Badge 
                                  key={idx}
                                  className="bg-white/10 border-white/20 text-white/80 text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-[hsl(190,85%,55%)]" />
              Education
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <Card
                  key={edu.id}
                  className="bg-white/5 backdrop-blur-xl border-white/10 p-6 hover-elevate transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedEdu(selectedEdu === edu.id ? null : edu.id)}
                  data-testid={`card-edu-${index}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-md bg-gradient-to-br from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-xl font-bold text-white mb-1">{edu.degree}</h3>
                      <p className="text-[hsl(190,85%,55%)] text-sm mb-2">{edu.institution}</p>
                      
                      <div className="flex flex-col gap-1 text-xs text-white/50 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>{edu.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span>{edu.location}</span>
                        </div>
                        {edu.fieldOfStudy && (
                          <p className="text-white/60 mt-1">{edu.fieldOfStudy}</p>
                        )}
                      </div>

                      {selectedEdu === edu.id && edu.achievements && (
                        <div className="space-y-3 mt-4 pt-4 border-t border-white/10">
                          <div>
                            <p className="text-xs font-semibold text-white mb-2">Highlights:</p>
                            <ul className="space-y-2">
                              {edu.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-white/70">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function IndustryExperienceMap() {
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null);

  return (
    <section id="industries" className="relative py-12 md:py-20 lg:py-24" data-testid="section-industries">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-16">
          <Badge className="mb-3 md:mb-4 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20" data-testid="badge-industries">
            Industry Expertise
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4" data-testid="text-industries-title">
            Cross-Industry Experience
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/60 max-w-2xl mx-auto px-4" data-testid="text-industries-subtitle">
            Delivering excellence across 7+ industries
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {industryExperience.map((industry) => {
            const isExpanded = expandedIndustry === industry.id;
            
            return (
              <Card
                key={industry.id}
                className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden hover-elevate"
                data-testid={`card-industry-${industry.id}`}
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: industry.color + '30', border: `2px solid ${industry.color}` }}
                    >
                      {industry.years}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-white mb-1.5 leading-tight" data-testid={`text-industry-name-${industry.id}`}>
                        {industry.name}
                      </h3>
                      <p className="text-sm text-white/60">{industry.years} years experience</p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => setExpandedIndustry(isExpanded ? null : industry.id)}
                    className="w-full flex items-center justify-between text-white/70 hover:text-white h-10 px-3"
                    data-testid={`button-industry-toggle-${industry.id}`}
                  >
                    <span className="flex-1 text-left text-sm">{isExpanded ? 'Hide' : 'View'} Projects ({industry.projects.length})</span>
                    <ChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                  </Button>

                  {isExpanded && (
                    <div className="space-y-3 pt-4 border-t border-white/10" data-testid={`list-industry-projects-${industry.id}`}>
                      {industry.projects.map((project, idx) => (
                        <div 
                          key={idx}
                          className="p-3 rounded-lg bg-white/5 border border-white/10"
                          data-testid={`item-industry-project-${industry.id}-${idx}`}
                        >
                          <p className="font-medium text-white text-sm" data-testid={`text-project-company-${idx}`}>
                            {project.company}
                          </p>
                          <p className="text-xs text-white/60" data-testid={`text-project-role-${idx}`}>
                            {project.role} • {project.period}
                          </p>
                          <p className="text-xs text-[hsl(190,85%,55%)] mt-2" data-testid={`text-project-achievement-${idx}`}>
                            {project.keyAchievement}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative py-12 md:py-20" data-testid="section-contact">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 sm:p-8 md:p-12">
          <div className="text-center space-y-4 md:space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Let's Work Together
            </h2>
            
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto px-2">
              Looking for an experienced project manager to deliver your next critical programme? 
              Let's discuss how I can help drive your success.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 md:pt-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0 hover-elevate active-elevate-2 min-h-12"
                onClick={() => window.location.href = 'mailto:odmlawal@gmail.com'}
                data-testid="button-email-contact"
              >
                <Mail className="mr-2 w-5 h-5" />
                odmlawal@gmail.com
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/10 min-h-12"
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
              <p className="text-white/50 text-sm mt-2">
                <span className="font-mono">+971 (0) 509082234</span>
                <span className="mx-3">•</span>
                <span>Dubai, UAE</span>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function CVDownloadDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/cv/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone }),
      });

      if (!response.ok) {
        throw new Error('Failed to process request');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Mujeeb_Lawal_CV.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      // Reset form and close dialog
      setName('');
      setEmail('');
      setPhone('');
      onOpenChange(false);
    } catch (err) {
      setError('Unable to download CV. Please try again or contact me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[hsl(270,8%,12%)] border-white/20 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white font-display text-2xl">Download My CV</DialogTitle>
          <DialogDescription className="text-white/60">
            Please share your details to receive my CV
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[hsl(190,85%,55%)] focus:border-transparent"
              placeholder="John Doe"
              data-testid="input-cv-name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[hsl(190,85%,55%)] focus:border-transparent"
              placeholder="john@example.com"
              data-testid="input-cv-email"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
              Phone Number <span className="text-white/40 text-xs">(Optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[hsl(190,85%,55%)] focus:border-transparent"
              placeholder="+44 7900 000000"
              data-testid="input-cv-phone"
            />
          </div>
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm">
              {error}
            </div>
          )}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10"
              data-testid="button-cv-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0 hover:opacity-90"
              data-testid="button-cv-submit"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
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

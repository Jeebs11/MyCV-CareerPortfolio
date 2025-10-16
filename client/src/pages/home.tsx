import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { experiences, skills, keyAchievements, detailedCertifications, timelineProjects, industryExperience, education } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';

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
  Menu
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
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

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
      
      <HeroSection scrollToSection={scrollToSection} />
      
      <MetricsDashboard />
      
      <CareerTimeline activeRegion={activeRegion} setActiveRegion={setActiveRegion} />
      
      <IndustryExperienceMap />
      
      <GeographicMap activeRegion={activeRegion} setActiveRegion={setActiveRegion} />
      
      <CertificationsWall />
      
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] flex items-center justify-center font-display font-bold text-white">
              ML
            </div>
            <span className="font-display text-lg sm:text-xl text-white hidden sm:block">Mujeeb Lawal</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('journey')}
              className="text-sm text-white/70 hover:text-white transition-colors"
              data-testid="link-journey"
            >
              Journey
            </button>
            <a 
              href="/insights"
              className="text-sm text-white/70 hover:text-white transition-colors"
              data-testid="link-insights"
            >
              Thought Leadership
            </a>
            <Button
              onClick={() => setShowCVDialog(true)}
              variant="outline"
              size="sm"
              className="bg-transparent border-white/20 text-white hover:bg-white/10"
              data-testid="button-download-cv"
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
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

            {/* CTA Button - Hidden on small mobile, visible on sm and up */}
            <Button 
              onClick={() => scrollToSection('contact')}
              className="hidden sm:flex bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0"
              data-testid="button-cta-nav"
            >
              Get in Touch
            </Button>
          </div>
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
                    <Badge 
                      className="text-xs bg-gradient-to-r from-[hsl(190,85%,55%)]/20 to-[hsl(220,90%,60%)]/20 border-[hsl(190,85%,55%)]/30 text-white"
                      data-testid={`badge-career-period-${project.id}`}
                    >
                      {project.period}
                    </Badge>
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
                    <Badge 
                      className="text-xs bg-gradient-to-r from-[hsl(190,85%,55%)]/20 to-[hsl(220,90%,60%)]/20 border-[hsl(190,85%,55%)]/30 text-white"
                      data-testid={`badge-career-mobile-period-${project.id}`}
                    >
                      {project.period}
                    </Badge>
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
  const topRoles = timelineProjects.slice(0, 3);
  const [selectedProject, setSelectedProject] = useState<typeof timelineProjects[0] | null>(null);

  return (
    <section id="journey" className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24" data-testid="section-hero">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-[hsl(190,85%,55%)]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-[hsl(220,90%,60%)]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[hsl(270,65%,35%)]/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-green-500/20 border border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs md:text-sm font-medium text-green-300" data-testid="badge-status">
                  Open to new opportunities
                </span>
              </div>
              
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" data-testid="text-hero-title">
                Project and Operation Delivery Expert
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)]">
                  7 Industries . 4 Continents
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-xl leading-relaxed" data-testid="text-hero-subtitle">
                Fortune 500-trusted PM specialist delivering regulated, multi-million pound programmes on time and within budget
              </p>

              {/* Social Proof */}
              <div className="pt-2">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Trusted By</p>
                <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs sm:text-sm text-white/60">
                  <span>Amazon</span>
                  <span>•</span>
                  <span>Estée Lauder</span>
                  <span>•</span>
                  <span>Simply Business</span>
                  <span>•</span>
                  <span>Mercer</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0 hover-elevate active-elevate-2 text-sm md:text-base px-6 md:px-8 w-full sm:w-auto"
                onClick={() => scrollToSection('contact')}
                data-testid="button-primary-cta"
              >
                Schedule a Call <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/10 text-sm md:text-base w-full sm:w-auto"
                onClick={() => scrollToSection('experience')}
                data-testid="button-secondary-cta"
              >
                View Track Record
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/10 text-sm md:text-base w-full sm:w-auto"
                onClick={() => window.open('https://www.linkedin.com/in/mujeeb-lawal-experienced-project-manager/', '_blank')}
                data-testid="button-download-cv"
              >
                <Linkedin className="mr-2 w-4 h-4 md:w-5 md:h-5" /> LinkedIn
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2">
              <a 
                href="mailto:odmlawal@gmail.com"
                className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                data-testid="link-email"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm sm:hidden">odmlawal@gmail.com</span>
              </a>
              <span className="text-white/30 hidden sm:block">|</span>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-green-300 leading-relaxed">
                  Available: Immediate Start • Remote/Hybrid/Freelance/No Visa Needed - Self Sponsored
                </span>
              </div>
            </div>
          </div>
          
          <div className="relative w-full lg:w-auto">
            <div className="mb-3 md:mb-4">
              <h3 className="font-display text-lg md:text-xl font-bold text-white mb-1" data-testid="text-recent-roles-title">
                Recent Impact
              </h3>
              <p className="text-xs md:text-sm text-white/50">Latest leadership roles</p>
            </div>
            <div className="space-y-3">
              {topRoles.map((project) => (
                <Card
                  key={project.id}
                  className="bg-white/5 backdrop-blur-xl border-white/10 p-4 md:p-5 hover-elevate transition-all"
                  data-testid={`card-recent-${project.id}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <Badge 
                        className="text-xs bg-gradient-to-r from-[hsl(190,85%,55%)]/20 to-[hsl(220,90%,60%)]/20 border-[hsl(190,85%,55%)]/30 text-white"
                        data-testid={`badge-period-${project.id}`}
                      >
                        {project.period}
                      </Badge>
                      {project.current && (
                        <Badge className="text-xs bg-green-500/20 border-green-500/30 text-green-300" data-testid={`badge-current-${project.id}`}>
                          Current
                        </Badge>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold text-white text-sm md:text-base leading-tight mb-1" data-testid={`text-role-${project.id}`}>
                        {project.role}
                      </h4>
                      <p className="text-[hsl(190,85%,55%)] text-xs md:text-sm mb-2" data-testid={`text-company-${project.id}`}>
                        {project.company}
                      </p>
                      {project.description && (
                        <p className="text-white/60 text-xs md:text-sm leading-relaxed" data-testid={`text-description-${project.id}`}>
                          {project.description}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:items-center sm:justify-between">
                      <div className="flex flex-wrap gap-2">
                        <Badge className="text-xs bg-white/5 border-white/10 text-white/70">
                          {project.industry}
                        </Badge>
                        {project.projectType && (
                          <Badge className="text-xs bg-white/5 border-white/10 text-white/70">
                            {project.projectType}
                          </Badge>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs text-[hsl(190,85%,55%)] hover:text-[hsl(190,85%,65%)] h-auto py-2 px-3 w-full sm:w-auto justify-center sm:justify-start"
                        onClick={() => setSelectedProject(project)}
                        data-testid={`button-view-impact-${project.id}`}
                      >
                        View Impact <ArrowRight className="ml-1 w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        {/* Impact Dialog */}
        <Dialog open={selectedProject !== null} onOpenChange={(open) => { if (!open) setSelectedProject(null); }}>
          <DialogContent className="bg-[hsl(270,8%,12%)] border-white/10 text-white max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-display text-xl sm:text-2xl text-white pr-6">
                    {selectedProject.role}
                  </DialogTitle>
                  <DialogDescription className="text-[hsl(190,85%,55%)] text-sm sm:text-base">
                    {selectedProject.company} • {selectedProject.period}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  {selectedProject.description && (
                    <div>
                      <p className="text-base text-white/80 leading-relaxed" data-testid="text-recent-dialog-description">
                        {selectedProject.description}
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Full Impact
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.keyAchievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[hsl(190,85%,55%)] mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-white/80">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge className="text-xs bg-white/5 border-white/10 text-white/70">
                      {selectedProject.industry}
                    </Badge>
                    {selectedProject.projectType && (
                      <Badge className="text-xs bg-white/5 border-white/10 text-white/70">
                        {selectedProject.projectType}
                      </Badge>
                    )}
                    {selectedProject.budget && (
                      <Badge className="text-xs bg-[hsl(190,85%,55%)]/20 border-[hsl(190,85%,55%)]/30 text-[hsl(190,85%,65%)]">
                        Budget: {selectedProject.budget}
                      </Badge>
                    )}
                    {selectedProject.teamSize && (
                      <Badge className="text-xs bg-white/5 border-white/10 text-white/70">
                        Team: {selectedProject.teamSize} people
                      </Badge>
                    )}
                  </div>

                  {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-white/70 mb-2">Technologies & Tools</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, idx) => (
                          <Badge key={idx} className="text-xs bg-white/5 border-white/10 text-white/70">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
        
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
                <Badge 
                  className={`${
                    experience.current 
                      ? 'bg-[hsl(145,70%,50%)]/20 border-[hsl(145,70%,50%)]/30 text-[hsl(145,70%,70%)]' 
                      : 'bg-white/10 border-white/20 text-white/70'
                  } backdrop-blur-md text-xs`}
                >
                  {experience.period}
                </Badge>
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

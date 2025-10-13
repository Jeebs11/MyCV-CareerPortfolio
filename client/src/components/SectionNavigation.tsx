import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Compass,
  Rocket,
  BarChart3,
  Briefcase,
  Globe,
  Award,
  Building2,
  Mail
} from 'lucide-react';

const sections = [
  { id: 'journey', label: 'Journey', icon: Rocket },
  { id: 'metrics', label: 'Impact', icon: BarChart3 },
  { id: 'experience', label: 'Timeline', icon: Briefcase },
  { id: 'global', label: 'Global', icon: Globe },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'industries', label: 'Industries', icon: Building2 },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function SectionNavigation() {
  const [activeSection, setActiveSection] = useState('journey');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0.5],
        rootMargin: '-20% 0px -20% 0px',
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
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
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop: Floating Navigation Dots */}
      <div className="hidden md:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-3">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`group relative transition-all duration-300 ${
                  isActive ? 'scale-125' : 'hover:scale-110'
                }`}
                data-testid={`nav-dot-${section.id}`}
                aria-label={`Navigate to ${section.label}`}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)]'
                      : 'bg-white/30 group-hover:bg-white/50'
                  }`}
                />
                
                {/* Tooltip */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg px-3 py-2 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[hsl(190,85%,55%)]" />
                    <span className="text-sm font-medium text-white">{section.label}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile: Floating Action Button */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="md:hidden fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0 shadow-xl shadow-[hsl(190,85%,55%)]/30 hover-elevate active-elevate-2"
            data-testid="button-mobile-nav-fab"
          >
            <Compass className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        
        <SheetContent 
          side="bottom" 
          className="bg-[hsl(270,8%,12%)]/95 backdrop-blur-xl border-white/10 rounded-t-3xl"
        >
          <SheetHeader className="mb-4">
            <SheetTitle className="text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-[hsl(190,85%,55%)]" />
              Quick Navigation
            </SheetTitle>
          </SheetHeader>
          
          <div className="grid grid-cols-2 gap-3 pb-6">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <Button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  variant={isActive ? "default" : "ghost"}
                  className={`h-auto py-4 flex-col gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  data-testid={`mobile-nav-${section.id}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{section.label}</span>
                </Button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

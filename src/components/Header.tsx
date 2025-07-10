import { Button } from '@/components/ui/button'
import { BookOpen, Briefcase, Code, FolderOpen, Menu, MessageSquare, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Главная', icon: Code },
    { id: 'services', label: 'Услуги', icon: Briefcase },
    { id: 'portfolio', label: 'Портфолио', icon: FolderOpen },
    { id: 'blog', label: 'Блог', icon: BookOpen },
    { id: 'contact', label: 'Контакты', icon: MessageSquare },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-lg border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Frontend Dev</span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>
          
          <div className="hidden lg:block">
            <Button
              onClick={() => scrollToSection('contact')}
              className="gradient-primary text-primary-foreground hover:glow-primary transition-all duration-300"
            >
              Связаться
            </Button>
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-foreground hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        <div
          className={`lg:hidden absolute top-full right-0 left-0 bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden transform transition-transform transition-opacity duration-700 ease-in-out origin-top-right ${
            isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-200 py-2"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('contact')}
                className="gradient-primary text-primary-foreground w-full mt-4"
              >
                Связаться
              </Button>
            </div>
          </div>
        </div>
      
      
      </nav>
    </header>
  );
};
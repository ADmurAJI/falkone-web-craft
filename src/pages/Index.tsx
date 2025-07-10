import { AboutSection } from '@/components/AboutSection.tsx'
import { BlogSection } from '@/components/BlogSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { PortfolioSection } from '@/components/PortfolioSection'
import { ServicesSection } from '@/components/ServicesSection'
import { TechnologyMarquee } from '@/components/TechnologyMarquee.tsx'

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TechnologyMarquee />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

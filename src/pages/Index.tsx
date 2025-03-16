
import { useEffect } from 'react';
import Hero from '../components/Hero';
import WorkShowcase from '../components/WorkShowcase';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Reveal animations for elements with image-reveal class
    const revealElements = document.querySelectorAll('.image-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => observer.observe(el));
    
    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Femi Taofeeq | Cinematographer & Director of Photography</title>
        <meta name="description" content="Award-winning cinematographer and director of photography based in Nigeria, specializing in feature films, documentaries, music videos, and commercials." />
        <meta name="keywords" content="cinematographer, director of photography, DP, DOP, filmmaking, Nigeria, Lagos, visual storytelling, film production" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://femitaofeeq.com/" />
        <meta property="og:title" content="Femi Taofeeq | Cinematographer & Director of Photography" />
        <meta property="og:description" content="Award-winning cinematographer and director of photography based in Nigeria, specializing in feature films, documentaries, music videos, and commercials." />
        <meta property="og:image" content="/lovable-uploads/aa15e6de-d56e-45e8-bf84-15843d54ca2f.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://femitaofeeq.com/" />
        <meta property="twitter:title" content="Femi Taofeeq | Cinematographer & Director of Photography" />
        <meta property="twitter:description" content="Award-winning cinematographer and director of photography based in Nigeria, specializing in feature films, documentaries, music videos, and commercials." />
        <meta property="twitter:image" content="/lovable-uploads/aa15e6de-d56e-45e8-bf84-15843d54ca2f.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://femitaofeeq.com/" />
      </Helmet>
      
      <main className="overflow-hidden">
        <Hero />
        <WorkShowcase />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Index;

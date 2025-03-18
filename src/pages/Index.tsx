
import { useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import WorkShowcase from '../components/WorkShowcase';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

const Index = () => {
  // Create refs for the sections
  const sectionsRef = useRef<HTMLElement[]>([]);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Enhanced reveal animations for elements
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('image-reveal')) {
            entry.target.classList.add('revealed');
          }
          if (entry.target.classList.contains('fade-in-up')) {
            entry.target.classList.add('visible');
          }
          if (entry.target.classList.contains('fade-in-left')) {
            entry.target.classList.add('visible');
          }
          if (entry.target.classList.contains('fade-in-right')) {
            entry.target.classList.add('visible');
          }
          if (entry.target.classList.contains('scale-in')) {
            entry.target.classList.add('visible');
          }
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    };
    
    // Create the observer with options
    const observer = new IntersectionObserver(handleIntersection, { 
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    });
    
    // Select elements to observe
    const revealElements = document.querySelectorAll('.image-reveal, .fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    revealElements.forEach(el => observer.observe(el));
    
    // Parallax scrolling effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.querySelectorAll('.parallax').forEach((element) => {
        const speed = element.getAttribute('data-speed') || '0.1';
        const yPos = -(scrollY * Number(speed));
        element.setAttribute('style', `transform: translateY(${yPos}px)`);
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      revealElements.forEach(el => observer.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
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
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-20 gradient-bg"></div>
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

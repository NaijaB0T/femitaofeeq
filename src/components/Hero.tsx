
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Staggered animation timing
    setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.classList.add('opacity-100');
        titleRef.current.classList.remove('opacity-0');
      }
    }, 300);
    
    setTimeout(() => {
      if (subtitleRef.current) {
        subtitleRef.current.classList.add('opacity-100');
        subtitleRef.current.classList.remove('opacity-0');
      }
    }, 800);
    
    setTimeout(() => {
      if (ctaRef.current) {
        ctaRef.current.classList.add('opacity-100');
        ctaRef.current.classList.remove('opacity-0');
      }
    }, 1200);
    
    setTimeout(() => {
      if (imageRef.current) {
        imageRef.current.classList.add('revealed');
      }
    }, 500);
    
    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (imageRef.current) {
        const translateY = scrollPosition * 0.15;
        imageRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div>
            {/* Main heading with enhanced animation */}
            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl xl:text-8xl font-display font-bold leading-tight tracking-tighter opacity-0 transition-all duration-1000 transform"
            >
              <span className="block transition-transform duration-1000 hover:translate-x-2">FEMI</span>
              <span className="block transition-transform duration-1000 hover:translate-x-2 delay-300">TAOFEEQ</span>
            </h1>
            
            {/* Subtitle with enhanced animation */}
            <p 
              ref={subtitleRef}
              className="mt-6 text-xl md:text-2xl font-medium max-w-md opacity-0 transition-all duration-1000 delay-500"
            >
              Cinematographer & Director of Photography crafting visual stories from Nigeria to the world.
            </p>
            
            {/* CTA Button with enhanced animation */}
            <div 
              ref={ctaRef}
              className="mt-8 opacity-0 transition-all duration-1000 delay-700"
            >
              <Link 
                to="/works" 
                className="inline-flex items-center bg-cinema-black text-cinema-yellow px-6 py-3 text-lg font-medium group"
              >
                <span className="relative overflow-hidden inline-block">
                  <span className="relative z-10 group-hover:text-white transition-colors duration-500">View Portfolio</span>
                  <span className="absolute inset-0 bg-cinema-orange w-0 group-hover:w-full transition-all duration-500 z-0"></span>
                </span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
          
          <div 
            ref={imageRef} 
            className="image-reveal rounded-lg overflow-hidden relative h-[70vh] md:h-[85vh]"
          >
            <img 
              src="/lovable-uploads/aa15e6de-d56e-45e8-bf84-15843d54ca2f.png" 
              alt="Femi Taofeeq - Cinematographer" 
              className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              <p className="text-sm md:text-base font-mono">Behind the camera | Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Marquee Ticker with continuous animation */}
      <div 
        ref={marqueeRef}
        className="mt-16 md:mt-24 border-t border-b border-cinema-black py-4 overflow-hidden"
      >
        <div className="marquee-container">
          <div className="marquee-content">
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap hover:text-cinema-orange transition-colors duration-300">CINEMATOGRAPHER</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">•</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap hover:text-cinema-orange transition-colors duration-300">DIRECTOR OF PHOTOGRAPHY</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">•</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap hover:text-cinema-orange transition-colors duration-300">VISUAL STORYTELLER</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">•</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap hover:text-cinema-orange transition-colors duration-300">CINEMATOGRAPHER</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">•</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap hover:text-cinema-orange transition-colors duration-300">DIRECTOR OF PHOTOGRAPHY</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">•</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap hover:text-cinema-orange transition-colors duration-300">VISUAL STORYTELLER</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">•</span>
          </div>
        </div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-1/3 left-10 w-16 h-16 rounded-full bg-cinema-orange opacity-20 float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-1/4 right-20 w-24 h-24 rounded-full bg-cinema-yellow opacity-30 float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-10 w-10 h-10 rounded-full bg-cinema-red opacity-20 float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Hero;

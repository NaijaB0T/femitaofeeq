
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    // Reveal animations on component mount
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === imageRef.current) {
            imageRef.current.classList.add('revealed');
          }
          
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0');
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (imageRef.current) observer.observe(imageRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    
    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (subtitleRef.current) observer.unobserve(subtitleRef.current);
    };
  }, []);
  
  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div>
            {/* Main heading */}
            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl xl:text-8xl font-display font-bold leading-tight tracking-tighter opacity-0 transition-opacity duration-1000 delay-300"
            >
              <span className="block">FEMI</span>
              <span className="block">TAOFEEQ</span>
            </h1>
            
            {/* Subtitle */}
            <p 
              ref={subtitleRef}
              className="mt-6 text-xl md:text-2xl font-medium max-w-md opacity-0 transition-opacity duration-1000 delay-500"
            >
              Cinematographer & Director of Photography crafting visual stories from Nigeria to the world.
            </p>
            
            {/* CTA Button */}
            <div className="mt-8 opacity-0 transition-opacity duration-1000 delay-700 animate-fade-in">
              <Link 
                to="/works" 
                className="inline-flex items-center bg-cinema-black text-cinema-yellow px-6 py-3 text-lg font-medium transition-transform hover:translate-x-2"
              >
                View Portfolio <ArrowRight className="ml-2 h-5 w-5" />
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
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
              <p className="text-sm md:text-base font-mono">Behind the camera | Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Marquee Ticker */}
      <div className="mt-16 md:mt-24 border-t border-b border-cinema-black py-4 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content">
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">CINEMATOGRAPHER</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">•</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">DIRECTOR OF PHOTOGRAPHY</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">•</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">VISUAL STORYTELLER</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">•</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">CINEMATOGRAPHER</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">•</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">DIRECTOR OF PHOTOGRAPHY</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">•</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">VISUAL STORYTELLER</span>
            <span className="mx-4 text-xl md:text-3xl font-mono whitespace-nowrap">•</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

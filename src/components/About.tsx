
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0');
          
          if (entry.target.classList.contains('image-reveal')) {
            entry.target.classList.add('revealed');
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (imageRef.current) observer.observe(imageRef.current);
    if (textRef.current) observer.observe(textRef.current);
    
    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
      if (textRef.current) observer.unobserve(textRef.current);
    };
  }, []);
  
  return (
    <section className="py-24 bg-cinema-black text-cinema-yellow">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div 
            ref={imageRef}
            className="image-reveal rounded-lg overflow-hidden h-[60vh] opacity-0 transition-opacity duration-700"
          >
            <img 
              src="https://images.unsplash.com/photo-1604122728260-2c5f11b0b566?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Femi Taofeeq - Behind the Scenes" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div 
            ref={textRef}
            className="opacity-0 transition-opacity duration-700 delay-300"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              About Femi
            </h2>
            
            <div className="prose prose-lg text-cinema-yellow">
              <p className="mb-4">
                Femi Taofeeq is a visionary cinematographer and director of photography based in Nigeria, 
                known for capturing authentic African stories through a distinctive cinematic lens.
              </p>
              
              <p className="mb-4">
                With over 8 years of experience in the film industry, Femi has developed a unique visual 
                style that blends traditional storytelling with contemporary filmmaking techniques. His 
                work spans feature films, documentaries, music videos, and commercials.
              </p>
              
              <p className="mb-4">
                Femi's cinematography is characterized by bold compositions, striking color palettes, 
                and a deep understanding of how light shapes narrative.
              </p>
            </div>
            
            <div className="mt-8">
              <Link 
                to="/about" 
                className="inline-flex items-center border border-cinema-yellow px-6 py-3 text-lg font-medium hover:bg-cinema-yellow hover:text-cinema-black transition-colors duration-300"
              >
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

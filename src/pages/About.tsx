
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Animation for revealing elements
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
    
    document.querySelectorAll('.reveal-animation').forEach(el => {
      observer.observe(el);
    });
    
    document.querySelectorAll('.image-reveal').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.reveal-animation, .image-reveal').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>About | Femi Taofeeq - Cinematographer & Director of Photography</title>
        <meta name="description" content="Learn about Femi Taofeeq, a cinematographer and director of photography based in Nigeria with expertise in visual storytelling." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-12">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h1 className="text-5xl md:text-6xl font-display font-bold mb-8 reveal-animation opacity-0 transition-opacity duration-700">
                  About Me
                </h1>
                
                <div className="prose prose-lg max-w-none reveal-animation opacity-0 transition-opacity duration-700 delay-300">
                  <p>
                    Femi Taofeeq is a visionary cinematographer and director of photography based in Nigeria, 
                    specializing in capturing authentic stories that resonate with audiences worldwide.
                  </p>
                  
                  <p>
                    With over 8 years of experience in the film industry, Femi has developed a unique visual style 
                    that blends traditional African storytelling with contemporary filmmaking techniques. His work 
                    spans feature films, documentaries, music videos, and commercials.
                  </p>
                  
                  <p>
                    Femi's cinematography is characterized by bold compositions, striking color palettes, and a deep 
                    understanding of how light shapes narrative. He believes that every frame should tell a story, and 
                    every lighting setup should enhance the emotional impact of a scene.
                  </p>
                  
                  <p>
                    After graduating from the Nigerian Film Institute with honors, Femi honed his craft working 
                    alongside some of Africa's most respected filmmakers. His work has been featured in international 
                    film festivals and has earned him recognition for his distinctive visual approach.
                  </p>
                </div>
              </div>
              
              <div className="image-reveal rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Femi Taofeeq Portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-cinema-black text-cinema-yellow">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center reveal-animation opacity-0 transition-opacity duration-700">
              My Approach to Cinematography
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border border-cinema-yellow/30 rounded-lg reveal-animation opacity-0 transition-opacity duration-700 delay-100">
                <h3 className="text-xl font-bold mb-4">Visual Storytelling</h3>
                <p className="text-cinema-yellow/80">
                  Every frame is a canvas that should advance the narrative and evoke emotion. 
                  I believe in creating imagery that resonates with audiences on a visceral level.
                </p>
              </div>
              
              <div className="p-6 border border-cinema-yellow/30 rounded-lg reveal-animation opacity-0 transition-opacity duration-700 delay-200">
                <h3 className="text-xl font-bold mb-4">Authentic Representation</h3>
                <p className="text-cinema-yellow/80">
                  As a Nigerian cinematographer, I'm passionate about portraying African stories and 
                  cultures with authenticity, dignity, and nuance.
                </p>
              </div>
              
              <div className="p-6 border border-cinema-yellow/30 rounded-lg reveal-animation opacity-0 transition-opacity duration-700 delay-300">
                <h3 className="text-xl font-bold mb-4">Technical Excellence</h3>
                <p className="text-cinema-yellow/80">
                  I'm constantly exploring new techniques and technologies to push the boundaries of what's 
                  possible in cinematography while staying true to the heart of the story.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 reveal-animation opacity-0 transition-opacity duration-700">
              Equipment
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="reveal-animation opacity-0 transition-opacity duration-700 delay-100">
                <h3 className="text-2xl font-bold mb-4">Cameras</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>ARRI Alexa Mini</li>
                  <li>RED Gemini 5K</li>
                  <li>Sony FX9</li>
                  <li>Blackmagic URSA Mini Pro 12K</li>
                  <li>Canon C500 Mark II</li>
                </ul>
              </div>
              
              <div className="reveal-animation opacity-0 transition-opacity duration-700 delay-200">
                <h3 className="text-2xl font-bold mb-4">Lenses</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>ARRI Signature Primes</li>
                  <li>Cooke S4/i Primes</li>
                  <li>Atlas Orion Anamorphics</li>
                  <li>Angenieux EZ Zooms</li>
                  <li>Zeiss Supreme Primes</li>
                </ul>
              </div>
              
              <div className="reveal-animation opacity-0 transition-opacity duration-700 delay-300">
                <h3 className="text-2xl font-bold mb-4">Lighting</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>ARRI SkyPanel S60-C</li>
                  <li>ARRI M-Series HMIs</li>
                  <li>Litepanels Gemini 2x1</li>
                  <li>Aputure 600d Pro</li>
                  <li>Quasar Science Rainbow 2</li>
                </ul>
              </div>
              
              <div className="reveal-animation opacity-0 transition-opacity duration-700 delay-400">
                <h3 className="text-2xl font-bold mb-4">Support & Movement</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>DJI Ronin 2</li>
                  <li>ARRI Trinity</li>
                  <li>Steadicam M-1</li>
                  <li>Dana Dolly</li>
                  <li>Technocrane 15</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-cinema-orange">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white reveal-animation opacity-0 transition-opacity duration-700">
              Let's Create Something Beautiful Together
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto reveal-animation opacity-0 transition-opacity duration-700 delay-200">
              I'm always looking for innovative projects and collaborations that push 
              creative boundaries and tell compelling stories.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-white text-cinema-orange px-8 py-3 text-lg font-medium hover:bg-cinema-black hover:text-cinema-yellow transition-colors duration-300 reveal-animation opacity-0 transition-opacity duration-700 delay-300"
            >
              Get In Touch
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default About;

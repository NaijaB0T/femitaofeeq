
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Sample portfolio items
const portfolioItems = [
  {
    id: 1,
    title: "Lagos Nights",
    category: "Short Film",
    thumbnail: "https://images.unsplash.com/photo-1543536448-1e76fc2795bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    year: 2023
  },
  {
    id: 2,
    title: "Rhythms of Yoruba",
    category: "Documentary",
    thumbnail: "https://images.unsplash.com/photo-1568168172820-83c587783f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    year: 2022
  },
  {
    id: 3,
    title: "Harmony",
    category: "Music Video",
    thumbnail: "https://images.unsplash.com/photo-1559762705-2123aa9b467f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    year: 2023
  },
  {
    id: 4,
    title: "Urban Echoes",
    category: "Commercial",
    thumbnail: "https://images.unsplash.com/photo-1518130772768-f31b4902c12b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    year: 2021
  }
];

const WorkShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    if (headingRef.current) observer.observe(headingRef.current);
    
    itemRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });
    
    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      
      itemRefs.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="py-24" id="work">
      <div className="container mx-auto px-4 md:px-6">
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl font-display font-bold mb-12 opacity-0 transition-opacity duration-700"
        >
          Featured Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              ref={el => itemRefs.current[index] = el}
              className="opacity-0 transition-all duration-700"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Link to={`/works/${item.id}`}>
                <div className="group relative overflow-hidden rounded-lg">
                  <div className="image-reveal">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-cinema-yellow font-mono mb-1">{item.category}</p>
                          <h3 className="text-2xl font-display font-bold text-white">{item.title}</h3>
                        </div>
                        <span className="bg-cinema-yellow text-cinema-black text-sm font-mono px-3 py-1">
                          {item.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/works" 
            className="inline-flex items-center border-2 border-cinema-black bg-transparent hover:bg-cinema-black text-cinema-black hover:text-cinema-yellow px-8 py-3 text-lg font-medium transition-colors duration-300"
          >
            View All Projects <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkShowcase;

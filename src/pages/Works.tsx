
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { jsonStorage, PortfolioItem } from '../utils/jsonStorage';

const Works = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  
  useEffect(() => {
    // Load categories and portfolio items from storage
    const cats = ["All", ...jsonStorage.getCategories()];
    setCategories(cats);
    
    const items = jsonStorage.getPortfolioItems();
    setPortfolioItems(items);
  }, []);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Filter items based on selected category
    if (selectedCategory === "All") {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, portfolioItems]);
  
  // Initialize animation observer
  useEffect(() => {
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
  }, [filteredItems]);
  
  return (
    <>
      <Helmet>
        <title>Portfolio | Femi Taofeeq - Cinematographer & Director of Photography</title>
        <meta name="description" content="Explore the portfolio of Femi Taofeeq, featuring work in feature films, documentaries, music videos, and commercials." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-12">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-12 animate-fade-in">
              Portfolio
            </h1>
            
            {/* Category Filter */}
            <div className="mb-12 overflow-x-auto pb-4">
              <div className="flex space-x-4 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-lg font-medium transition-colors whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-cinema-black text-cinema-yellow'
                        : 'bg-transparent text-cinema-black border border-cinema-black hover:bg-cinema-black/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="group animate-fade-in">
                  <div className="relative overflow-hidden rounded-lg image-reveal">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 w-full">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-cinema-yellow font-mono mb-1">{item.category}</p>
                            <h3 className="text-xl font-display font-bold text-white">{item.title}</h3>
                            <p className="text-white/80 mt-1">Client: {item.client}</p>
                          </div>
                          <span className="bg-cinema-yellow text-cinema-black text-sm font-mono px-3 py-1">
                            {item.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredItems.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No portfolio items found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Works;

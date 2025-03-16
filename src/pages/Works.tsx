
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const categories = ["All", "Feature Films", "Documentaries", "Music Videos", "Commercials", "Short Films"];

const portfolioItems = [
  {
    id: 1,
    title: "Lagos Nights",
    category: "Short Films",
    thumbnail: "https://images.unsplash.com/photo-1543536448-1e76fc2795bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    year: 2023,
    client: "Independent Production"
  },
  {
    id: 2,
    title: "Rhythms of Yoruba",
    category: "Documentaries",
    thumbnail: "https://images.unsplash.com/photo-1568168172820-83c587783f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    year: 2022,
    client: "Cultural Heritage Foundation"
  },
  {
    id: 3,
    title: "Harmony",
    category: "Music Videos",
    thumbnail: "https://images.unsplash.com/photo-1559762705-2123aa9b467f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    year: 2023,
    client: "AfroBeats Records"
  },
  {
    id: 4,
    title: "Urban Echoes",
    category: "Commercials",
    thumbnail: "https://images.unsplash.com/photo-1518130772768-f31b4902c12b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    year: 2021,
    client: "Lagos Tourism Board"
  },
  {
    id: 5,
    title: "The Last Fisherman",
    category: "Feature Films",
    thumbnail: "https://images.unsplash.com/photo-1493804714600-6edb1cd93080?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    year: 2022,
    client: "Nollywood Productions"
  },
  {
    id: 6,
    title: "Market Day",
    category: "Documentaries",
    thumbnail: "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    year: 2023,
    client: "African Cultures Institute"
  },
  {
    id: 7,
    title: "Whispers",
    category: "Short Films",
    thumbnail: "https://images.unsplash.com/photo-1482859454941-1929825988b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    year: 2021,
    client: "Film Festival Entry"
  },
  {
    id: 8,
    title: "Beyond Tomorrow",
    category: "Commercials",
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    year: 2023,
    client: "Tech Innovations Inc."
  }
];

const Works = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState(portfolioItems);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Filter items based on selected category
    if (selectedCategory === "All") {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory]);
  
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
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Works;

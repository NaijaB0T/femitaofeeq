
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { jsonStorage, PortfolioItem } from '../utils/jsonStorage';
import { ArrowLeft } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';

const WorkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const numericId = parseInt(id, 10);
      const portfolioItem = jsonStorage.getPortfolioItems().find(item => item.id === numericId);
      
      if (portfolioItem) {
        setItem(portfolioItem);
      }
      
      setLoading(false);
    }
  }, [id]);
  
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-12 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse w-12 h-12 rounded-full bg-cinema-black/10"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  if (!item) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-12 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <h2 className="text-3xl font-display font-bold mb-4">Work Not Found</h2>
              <p className="text-gray-600 mb-8">The portfolio item you're looking for doesn't exist.</p>
              <Link 
                to="/works" 
                className="inline-flex items-center bg-cinema-black text-cinema-yellow px-6 py-3 rounded hover:bg-opacity-90 transition-colors"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to All Works
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{item.title} | Femi Taofeeq - Cinematographer & Director of Photography</title>
        <meta name="description" content={item.description || `View ${item.title}, a ${item.category.toLowerCase()} project by Femi Taofeeq for ${item.client}.`} />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Link 
              to="/works" 
              className="inline-flex items-center text-cinema-black hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Works
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="rounded-lg overflow-hidden mb-6 image-reveal">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-full object-cover"
                />
              </div>
            </div>
            
            <div>
              <div className="sticky top-28">
                <div className="bg-cinema-black/5 p-6 rounded-lg">
                  <span className="inline-block bg-cinema-yellow text-cinema-black text-sm font-mono px-3 py-1 mb-4">
                    {item.category}
                  </span>
                  
                  <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                    {item.title}
                  </h1>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Client</h3>
                      <p className="font-medium">{item.client}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Year</h3>
                      <p className="font-medium">{item.year}</p>
                    </div>
                    
                    {item.videoUrl && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Video</h3>
                        <div className="mt-2 fade-in-up">
                          <VideoPlayer url={item.videoUrl} />
                        </div>
                      </div>
                    )}
                    
                    {item.description && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">About this project</h3>
                        <p className="text-gray-700">{item.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default WorkDetail;

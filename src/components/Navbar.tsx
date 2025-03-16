
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-cinema-yellow border-b border-cinema-black'
          : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl md:text-3xl font-mono font-bold tracking-tighter hover:scale-105 transition-transform"
        >
          FemiTaofeeq
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`nav-link text-lg font-medium ${
              location.pathname === '/' ? 'active-link' : ''
            }`}
          >
            Home
          </Link>
          <Link 
            to="/works" 
            className={`nav-link text-lg font-medium ${
              location.pathname === '/works' ? 'active-link' : ''
            }`}
          >
            Works
          </Link>
          <Link 
            to="/about" 
            className={`nav-link text-lg font-medium ${
              location.pathname === '/about' ? 'active-link' : ''
            }`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link text-lg font-medium ${
              location.pathname === '/contact' ? 'active-link' : ''
            }`}
          >
            Contact
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden focus:outline-none rounded-full w-10 h-10 flex items-center justify-center border border-cinema-black"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cinema-yellow border-b border-cinema-black animate-fade-in">
          <nav className="container mx-auto py-6 px-4 flex flex-col space-y-6">
            <Link 
              to="/" 
              className="text-2xl font-medium"
            >
              Home
            </Link>
            <Link 
              to="/works" 
              className="text-2xl font-medium"
            >
              Works
            </Link>
            <Link 
              to="/about" 
              className="text-2xl font-medium"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-2xl font-medium"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;


import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jsonStorage, SocialMedia, ContactInfo } from '../utils/jsonStorage';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [socialMedia, setSocialMedia] = useState<SocialMedia>({});
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: '',
    phone: '',
    location: ''
  });
  
  useEffect(() => {
    // Load social media links from storage
    const socialLinks = jsonStorage.getSocialMedia();
    setSocialMedia(socialLinks);
    
    // Load contact information from storage
    const contactData = jsonStorage.getContactInfo();
    setContactInfo(contactData);
  }, []);
  
  return (
    <footer className="py-12 bg-cinema-black text-cinema-yellow">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link to="/" className="text-3xl font-mono font-bold tracking-tighter mb-4 block">
              FemiTaofeeq
            </Link>
            <p className="max-w-md text-cinema-yellow/80 mb-6">
              Cinematographer and Director of Photography based in Nigeria, 
              bringing stories to life through the power of visual storytelling.
            </p>
            <div className="flex space-x-4">
              {socialMedia.instagram && (
                <a 
                  href={socialMedia.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cinema-yellow/80 hover:text-cinema-yellow transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              
              {socialMedia.twitter && (
                <a 
                  href={socialMedia.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cinema-yellow/80 hover:text-cinema-yellow transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              
              {socialMedia.facebook && (
                <a 
                  href={socialMedia.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cinema-yellow/80 hover:text-cinema-yellow transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              
              {socialMedia.linkedin && (
                <a 
                  href={socialMedia.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cinema-yellow/80 hover:text-cinema-yellow transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              
              {socialMedia.vimeo && (
                <a 
                  href={socialMedia.vimeo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cinema-yellow/80 hover:text-cinema-yellow transition-colors"
                  aria-label="Vimeo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Z"></path><path d="M10 9a3 3 0 0 0-3 3v5h3v-5"></path><path d="M17 9h-4v8h4a4 4 0 0 0 0-8Z"></path></svg>
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-cinema-yellow/80 hover:text-cinema-yellow transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/works" className="text-cinema-yellow/80 hover:text-cinema-yellow transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cinema-yellow/80 hover:text-cinema-yellow transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cinema-yellow/80 hover:text-cinema-yellow transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic">
              <p className="mb-2 text-cinema-yellow/80">{contactInfo.location}</p>
              <p className="mb-2">
                <a href={`mailto:${contactInfo.email}`} className="text-cinema-yellow/80 hover:text-cinema-yellow transition-colors">
                  {contactInfo.email}
                </a>
              </p>
              <p>
                <a href={`tel:${contactInfo.phone}`} className="text-cinema-yellow/80 hover:text-cinema-yellow transition-colors">
                  {contactInfo.phone}
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-cinema-yellow/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cinema-yellow/60 text-sm">
            &copy; {currentYear} Femi Taofeeq. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm">
              <li>
                <a href="#" className="text-cinema-yellow/60 hover:text-cinema-yellow transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-cinema-yellow/60 hover:text-cinema-yellow transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

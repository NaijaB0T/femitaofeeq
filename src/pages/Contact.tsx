
import { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, Send, MapPin, Facebook, Linkedin } from 'lucide-react';
import { jsonStorage, ContactInfo, SocialMedia } from '../utils/jsonStorage';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: '',
    phone: '',
    location: ''
  });
  
  const [socialMedia, setSocialMedia] = useState<SocialMedia>({});
  
  // Create refs for animated elements
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load contact information from storage
    const contactData = jsonStorage.getContactInfo();
    setContactInfo(contactData);
    
    // Load social media from storage
    const socialData = jsonStorage.getSocialMedia();
    setSocialMedia(socialData);
    
    // Animation for revealing elements - enhanced with staggered timing
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('fade-in-up')) {
            entry.target.classList.add('visible');
          }
          if (entry.target.classList.contains('fade-in-left')) {
            entry.target.classList.add('visible');
          }
          if (entry.target.classList.contains('fade-in-right')) {
            entry.target.classList.add('visible');
          }
          if (entry.target.classList.contains('scale-in')) {
            entry.target.classList.add('visible');
          }
          
          if (entry.target.classList.contains('image-reveal')) {
            entry.target.classList.add('revealed');
          }
          
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .image-reveal').forEach(el => {
      observer.observe(el);
    });
    
    // Staggered entrance animations
    setTimeout(() => {
      if (titleRef.current) titleRef.current.classList.add('visible');
    }, 200);
    
    setTimeout(() => {
      if (subtitleRef.current) subtitleRef.current.classList.add('visible');
    }, 400);
    
    setTimeout(() => {
      if (formRef.current) formRef.current.classList.add('visible');
    }, 600);
    
    setTimeout(() => {
      if (contactInfoRef.current) contactInfoRef.current.classList.add('visible');
    }, 800);
    
    return () => {
      document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .image-reveal').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save message to localStorage
    try {
      jsonStorage.saveMessage(formData);
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Show success message
      toast.success('Thanks for your message! I\'ll get back to you soon.', {
        position: 'top-center',
        duration: 3000,
      });
    } catch (error) {
      console.error('Error saving message:', error);
      toast.error('There was a problem sending your message. Please try again.', {
        position: 'top-center',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact | Femi Taofeeq - Cinematographer & Director of Photography</title>
        <meta name="description" content="Get in touch with Femi Taofeeq for cinematography projects, collaborations, or inquiries." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-12 overflow-hidden">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h1 
                ref={titleRef}
                className="text-5xl md:text-6xl font-display font-bold mb-4 fade-in-up"
              >
                Get In Touch
              </h1>
              <p 
                ref={subtitleRef}
                className="text-xl max-w-2xl mx-auto fade-in-up"
                style={{ transitionDelay: '100ms' }}
              >
                Available for select projects, collaborations and creative opportunities worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div 
                ref={formRef} 
                className="fade-in-left"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="overflow-hidden">
                      <label htmlFor="name" className="block mb-2 font-medium transform transition duration-300 translate-y-0 opacity-100">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-cinema-black/20 focus:border-cinema-black focus:ring-1 focus:ring-cinema-black outline-none transition-all duration-300 focus:scale-[1.01]"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <label htmlFor="email" className="block mb-2 font-medium transform transition duration-300 translate-y-0 opacity-100">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-cinema-black/20 focus:border-cinema-black focus:ring-1 focus:ring-cinema-black outline-none transition-all duration-300 focus:scale-[1.01]"
                      />
                    </div>
                  </div>
                  
                  <div className="overflow-hidden">
                    <label htmlFor="subject" className="block mb-2 font-medium transform transition duration-300 translate-y-0 opacity-100">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-cinema-black/20 focus:border-cinema-black focus:ring-1 focus:ring-cinema-black outline-none transition-all duration-300 focus:scale-[1.01]"
                    />
                  </div>
                  
                  <div className="overflow-hidden">
                    <label htmlFor="message" className="block mb-2 font-medium transform transition duration-300 translate-y-0 opacity-100">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-cinema-black/20 focus:border-cinema-black focus:ring-1 focus:ring-cinema-black outline-none transition-all duration-300 focus:scale-[1.01]"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center bg-cinema-black text-cinema-yellow px-8 py-4 text-lg font-medium relative overflow-hidden transition-all duration-300"
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">Send Message</span>
                    <Send className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="absolute inset-0 w-0 bg-cinema-orange group-hover:w-full transition-all duration-300"></span>
                  </button>
                </form>
              </div>
              
              <div 
                ref={contactInfoRef} 
                className="space-y-8 lg:pl-12 fade-in-right"
              >
                <div className="bg-cinema-black text-cinema-yellow p-8 rounded-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-lg">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 hover:-translate-y-1 transition-transform duration-300">
                      <div className="bg-cinema-yellow text-cinema-black p-3 rounded-full">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">Email</h3>
                        <a href={`mailto:${contactInfo.email}`} className="text-lg text-cinema-yellow/80 hover:text-cinema-yellow transition-colors">
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 hover:-translate-y-1 transition-transform duration-300">
                      <div className="bg-cinema-yellow text-cinema-black p-3 rounded-full">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">Phone</h3>
                        <a href={`tel:${contactInfo.phone}`} className="text-lg text-cinema-yellow/80 hover:text-cinema-yellow transition-colors">
                          {contactInfo.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 hover:-translate-y-1 transition-transform duration-300">
                      <div className="bg-cinema-yellow text-cinema-black p-3 rounded-full">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">Location</h3>
                        <p className="text-lg text-cinema-yellow/80">
                          {contactInfo.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-cinema-black/20 p-6 rounded-lg scale-in">
                  <h3 className="text-xl font-bold mb-4">Follow me</h3>
                  <div className="flex space-x-4">
                    {socialMedia.instagram && (
                      <a 
                        href={socialMedia.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-cinema-black text-cinema-yellow w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 hover:bg-gradient-to-br hover:from-purple-600 hover:to-orange-600 transition-all duration-300"
                        aria-label="Instagram"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      </a>
                    )}
                    
                    {socialMedia.twitter && (
                      <a 
                        href={socialMedia.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-cinema-black text-cinema-yellow w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 hover:bg-blue-500 transition-all duration-300"
                        aria-label="Twitter"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                      </a>
                    )}
                    
                    {socialMedia.vimeo && (
                      <a 
                        href={socialMedia.vimeo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-cinema-black text-cinema-yellow w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 hover:bg-blue-700 transition-all duration-300"
                        aria-label="Vimeo"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Z"></path><path d="M10 9a3 3 0 0 0-3 3v5h3v-5"></path><path d="M17 9h-4v8h4a4 4 0 0 0 0-8Z"></path></svg>
                      </a>
                    )}
                    
                    {socialMedia.facebook && (
                      <a 
                        href={socialMedia.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-cinema-black text-cinema-yellow w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 hover:bg-blue-600 transition-all duration-300"
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
                        className="bg-cinema-black text-cinema-yellow w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 hover:bg-blue-800 transition-all duration-300"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="bg-cinema-orange text-white p-6 rounded-lg hover:shadow-lg transform transition-all duration-500 hover:translate-y-[-5px] fade-in-up" style={{transitionDelay: '200ms'}}>
                  <h3 className="text-xl font-bold mb-2">Booking Inquiries</h3>
                  <p className="mb-4">
                    For booking inquiries, project proposals or collaboration opportunities,
                    please include details about your project, timeline, and budget.
                  </p>
                  <p className="font-medium">
                    Response time: 24-48 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-cinema-orange opacity-10 float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-1/3 right-20 w-32 h-32 rounded-full bg-cinema-yellow opacity-20 float" style={{ animationDelay: '1.5s' }}></div>
      </main>
      
      <Footer />
    </>
  );
};

export default Contact;

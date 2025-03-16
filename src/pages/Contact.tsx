
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, Send, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a backend
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    // Show success message
    alert('Thanks for your message! I\'ll get back to you soon.');
  };
  
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
    
    return () => {
      document.querySelectorAll('.reveal-animation').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact | Femi Taofeeq - Cinematographer & Director of Photography</title>
        <meta name="description" content="Get in touch with Femi Taofeeq for cinematography projects, collaborations, or inquiries." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-12">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 reveal-animation opacity-0 transition-opacity duration-700">
                Get In Touch
              </h1>
              <p className="text-xl max-w-2xl mx-auto reveal-animation opacity-0 transition-opacity duration-700 delay-200">
                Available for select projects, collaborations and creative opportunities worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="reveal-animation opacity-0 transition-opacity duration-700 delay-300">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-cinema-black/20 focus:border-cinema-black focus:ring-1 focus:ring-cinema-black outline-none transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-cinema-black/20 focus:border-cinema-black focus:ring-1 focus:ring-cinema-black outline-none transition"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block mb-2 font-medium">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-cinema-black/20 focus:border-cinema-black focus:ring-1 focus:ring-cinema-black outline-none transition"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-cinema-black/20 focus:border-cinema-black focus:ring-1 focus:ring-cinema-black outline-none transition"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center bg-cinema-black text-cinema-yellow px-8 py-4 text-lg font-medium hover:bg-cinema-orange transition-colors duration-300"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
              
              <div className="space-y-8 lg:pl-12 reveal-animation opacity-0 transition-opacity duration-700 delay-400">
                <div className="bg-cinema-black text-cinema-yellow p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-cinema-yellow text-cinema-black p-3 rounded-full">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">Email</h3>
                        <a href="mailto:info@femitaofeeq.com" className="text-lg text-cinema-yellow/80 hover:text-cinema-yellow transition-colors">
                          info@femitaofeeq.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-cinema-yellow text-cinema-black p-3 rounded-full">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">Phone</h3>
                        <a href="tel:+2348000000000" className="text-lg text-cinema-yellow/80 hover:text-cinema-yellow transition-colors">
                          +234 800 000 0000
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-cinema-yellow text-cinema-black p-3 rounded-full">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">Location</h3>
                        <p className="text-lg text-cinema-yellow/80">
                          Lagos, Nigeria
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-cinema-black/20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Follow me</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-cinema-black text-cinema-yellow w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform"
                      aria-label="Instagram"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-cinema-black text-cinema-yellow w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform"
                      aria-label="Twitter"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    </a>
                    <a 
                      href="https://vimeo.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-cinema-black text-cinema-yellow w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform"
                      aria-label="Vimeo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Z"></path><path d="M10 9a3 3 0 0 0-3 3v5h3v-5"></path><path d="M17 9h-4v8h4a4 4 0 0 0 0-8Z"></path></svg>
                    </a>
                  </div>
                </div>
                
                <div className="bg-cinema-orange text-white p-6 rounded-lg">
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
      </main>
      
      <Footer />
    </>
  );
};

export default Contact;

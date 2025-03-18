
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import AdminLayout from '../../components/AdminLayout';
import { jsonStorage, ContactInfo } from '../../utils/jsonStorage';
import { Plus, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Instagram, Twitter, Youtube, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Define schema for social media form
const socialMediaSchema = z.object({
  instagram: z.string().url({ message: "Please enter a valid Instagram URL" }).or(z.string().length(0)),
  twitter: z.string().url({ message: "Please enter a valid Twitter URL" }).or(z.string().length(0)),
  vimeo: z.string().url({ message: "Please enter a valid Vimeo URL" }).or(z.string().length(0)),
  facebook: z.string().url({ message: "Please enter a valid Facebook URL" }).or(z.string().length(0)),
  linkedin: z.string().url({ message: "Please enter a valid LinkedIn URL" }).or(z.string().length(0))
});

// Define schema for contact info form
const contactInfoSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  location: z.string().min(1, { message: "Location is required" })
});

type SocialMediaFormValues = z.infer<typeof socialMediaSchema>;
type ContactInfoFormValues = z.infer<typeof contactInfoSchema>;

const Settings = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  
  // Initialize form with social media schema
  const socialForm = useForm<SocialMediaFormValues>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: {
      instagram: '',
      twitter: '',
      vimeo: '',
      facebook: '',
      linkedin: ''
    }
  });
  
  // Initialize form with contact info schema
  const contactForm = useForm<ContactInfoFormValues>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      email: '',
      phone: '',
      location: ''
    }
  });
  
  useEffect(() => {
    loadCategories();
    loadSocialMedia();
    loadContactInfo();
  }, []);
  
  const loadCategories = () => {
    const cats = jsonStorage.getCategories();
    setCategories(cats);
  };
  
  const loadSocialMedia = () => {
    const socialHandles = jsonStorage.getSocialMedia();
    
    // Set form values from storage
    if (socialHandles) {
      socialForm.reset(socialHandles);
    }
  };
  
  const loadContactInfo = () => {
    const contactInfo = jsonStorage.getContactInfo();
    
    // Set form values from storage
    if (contactInfo) {
      contactForm.reset(contactInfo);
    }
  };
  
  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }
    
    if (categories.includes(newCategory.trim())) {
      toast.error('This category already exists');
      return;
    }
    
    jsonStorage.saveCategory(newCategory.trim());
    loadCategories();
    setNewCategory('');
    toast.success('Category added successfully');
  };
  
  const handleDeleteCategory = (category: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${category}"?`)) {
      jsonStorage.deleteCategory(category);
      loadCategories();
      toast.success('Category deleted successfully');
    }
  };
  
  const onSubmitSocialMedia = (values: SocialMediaFormValues) => {
    jsonStorage.saveSocialMedia(values);
    toast.success('Social media links updated successfully');
  };
  
  const onSubmitContactInfo = (values: ContactInfoFormValues) => {
    jsonStorage.saveContactInfo(values);
    toast.success('Contact information updated successfully');
  };
  
  return (
    <>
      <Helmet>
        <title>Settings | Admin | Femi Taofeeq</title>
      </Helmet>
      
      <AdminLayout>
        <div className="p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-600 mt-1">Configure your portfolio settings</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Categories Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold">Portfolio Categories</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage the categories used to organize your portfolio items
                </p>
              </div>
              
              <div className="p-6">
                <div className="flex mb-4">
                  <Input
                    type="text"
                    placeholder="New category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="flex-1 mr-2"
                  />
                  <button
                    onClick={handleAddCategory}
                    className="inline-flex items-center bg-cinema-black text-cinema-yellow px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add
                  </button>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Current Categories</h3>
                  
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div 
                        key={category}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                      >
                        <span>{category}</span>
                        <button
                          onClick={() => handleDeleteCategory(category)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    
                    {categories.length === 0 && (
                      <p className="text-gray-500 text-center py-4">
                        No categories defined yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold">Social Media Links</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your social media profiles
                </p>
              </div>
              
              <div className="p-6">
                <Form {...socialForm}>
                  <form onSubmit={socialForm.handleSubmit(onSubmitSocialMedia)} className="space-y-4">
                    <FormField
                      control={socialForm.control}
                      name="instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Instagram className="h-4 w-4 mr-2" />
                            Instagram
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="https://instagram.com/yourusername" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={socialForm.control}
                      name="twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Twitter className="h-4 w-4 mr-2" />
                            Twitter
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="https://twitter.com/yourusername" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={socialForm.control}
                      name="vimeo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Youtube className="h-4 w-4 mr-2" />
                            Vimeo
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="https://vimeo.com/yourusername" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={socialForm.control}
                      name="facebook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Facebook className="h-4 w-4 mr-2" />
                            Facebook
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="https://facebook.com/yourpage" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={socialForm.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Linkedin className="h-4 w-4 mr-2" />
                            LinkedIn
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/yourusername" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center bg-cinema-black text-cinema-yellow px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                      >
                        <Save className="h-5 w-5 mr-2" />
                        Save Social Links
                      </button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
            
            {/* Contact Information Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold">Contact Information</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your contact details shown throughout the site
                </p>
              </div>
              
              <div className="p-6">
                <Form {...contactForm}>
                  <form onSubmit={contactForm.handleSubmit(onSubmitContactInfo)} className="space-y-4">
                    <FormField
                      control={contactForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="info@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={contactForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="+1 234 567 8901" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={contactForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            Location
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="City, Country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center bg-cinema-black text-cinema-yellow px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                      >
                        <Save className="h-5 w-5 mr-2" />
                        Save Contact Info
                      </button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
            
            {/* Website Information Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold">Website Information</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Basic information about your portfolio website
                </p>
              </div>
              
              <div className="p-6">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="siteTitle" className="block text-sm font-medium mb-1">
                      Website Title
                    </label>
                    <Input
                      id="siteTitle"
                      defaultValue="Femi Taofeeq | Cinematographer & Director of Photography"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="siteDescription" className="block text-sm font-medium mb-1">
                      Website Description
                    </label>
                    <textarea
                      id="siteDescription"
                      rows={3}
                      defaultValue="Award-winning cinematographer and director of photography based in Nigeria, specializing in feature films, documentaries, music videos, and commercials."
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="button"
                      className="inline-flex items-center bg-cinema-black text-cinema-yellow px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                      onClick={() => toast.success('Website settings saved successfully')}
                    >
                      <Save className="h-5 w-5 mr-2" />
                      Save Settings
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Settings;

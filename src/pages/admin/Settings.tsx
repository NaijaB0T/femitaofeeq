import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import AdminLayout from '../../components/AdminLayout';
import { jsonStorage } from '../../utils/jsonStorage';
import { Plus, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

const Settings = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  
  useEffect(() => {
    loadCategories();
  }, []);
  
  const loadCategories = () => {
    const cats = jsonStorage.getCategories();
    setCategories(cats);
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
            
            {/* Other Settings Section */}
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
                  
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium mb-1">
                      Contact Email
                    </label>
                    <Input
                      id="contactEmail"
                      type="email"
                      defaultValue="info@femitaofeeq.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium mb-1">
                      Contact Phone
                    </label>
                    <Input
                      id="contactPhone"
                      defaultValue="+234 800 000 0000"
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

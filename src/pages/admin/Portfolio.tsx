import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import AdminLayout from '../../components/AdminLayout';
import { jsonStorage, PortfolioItem } from '../../utils/jsonStorage';
import { 
  Edit, Trash2, Plus, Search, Star, 
  StarOff, Filter
} from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageUploader from '../../components/ImageUploader';

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [categories, setCategories] = useState<string[]>([]);
  
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    thumbnail: '',
    year: new Date().getFullYear(),
    client: '',
    description: '',
    featured: false,
    videoUrl: '',
    galleryImages: [] as string[]
  });
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = () => {
    const items = jsonStorage.getPortfolioItems();
    setPortfolioItems(items);
    
    const cats = jsonStorage.getCategories();
    setCategories(cats);
  };
  
  const handleOpenAddDialog = () => {
    setIsAddMode(true);
    setSelectedItem(null);
    setFormData({
      title: '',
      category: categories[0] || '',
      thumbnail: '',
      year: new Date().getFullYear(),
      client: '',
      description: '',
      featured: false,
      videoUrl: '',
      galleryImages: []
    });
    setIsDialogOpen(true);
  };
  
  const handleOpenEditDialog = (item: PortfolioItem) => {
    setIsAddMode(false);
    setSelectedItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      thumbnail: item.thumbnail,
      year: item.year,
      client: item.client,
      description: item.description || '',
      featured: item.featured || false,
      videoUrl: item.videoUrl || '',
      galleryImages: item.galleryImages || []
    });
    setIsDialogOpen(true);
  };
  
  const handleDeleteItem = (id: number) => {
    if (window.confirm('Are you sure you want to delete this portfolio item?')) {
      jsonStorage.deletePortfolioItem(id);
      loadData();
      toast.success('Portfolio item deleted successfully');
    }
  };
  
  const handleToggleFeatured = (id: number, featured: boolean) => {
    jsonStorage.updatePortfolioItem(id, { featured: !featured });
    loadData();
    toast.success(featured ? 'Item removed from featured' : 'Item added to featured');
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };
  
  const handleGalleryImagesChange = (galleryImages: string[]) => {
    setFormData({
      ...formData,
      galleryImages
    });
  };
  
  const handleThumbnailChange = (thumbnails: string[]) => {
    setFormData({
      ...formData,
      thumbnail: thumbnails[0] || ''
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAddMode) {
      jsonStorage.savePortfolioItem(formData);
      toast.success('Portfolio item added successfully');
    } else if (selectedItem) {
      jsonStorage.updatePortfolioItem(selectedItem.id, formData);
      toast.success('Portfolio item updated successfully');
    }
    
    loadData();
    setIsDialogOpen(false);
  };
  
  const filteredItems = portfolioItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <>
      <Helmet>
        <title>Portfolio Management | Admin | Femi Taofeeq</title>
      </Helmet>
      
      <AdminLayout>
        <div className="p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Portfolio</h1>
              <p className="text-gray-600 mt-1">Manage your portfolio items</p>
            </div>
            
            <button
              onClick={handleOpenAddDialog}
              className="inline-flex items-center bg-cinema-black text-cinema-yellow px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Item
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search portfolio items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full"
                />
              </div>
              
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-gray-500" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button
                      onClick={() => handleToggleFeatured(item.id, item.featured || false)}
                      className={`p-2 rounded-full ${
                        item.featured
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                      title={item.featured ? 'Remove from featured' : 'Add to featured'}
                    >
                      {item.featured ? 
                        <Star className="h-4 w-4" /> : 
                        <StarOff className="h-4 w-4" />
                      }
                    </button>
                  </div>
                  
                  {item.galleryImages && item.galleryImages.length > 0 && (
                    <div className="absolute top-3 left-3 bg-cinema-black/70 text-white text-xs px-2 py-1 rounded">
                      {item.galleryImages.length} images
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="mb-2 flex justify-between items-start">
                    <div>
                      <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-bold mt-2">{item.title}</h3>
                    </div>
                    <span className="text-sm text-gray-500">
                      {item.year}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-1">
                    Client: {item.client}
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-3">
                    <button
                      onClick={() => handleOpenEditDialog(item)}
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-600 hover:text-red-800 flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredItems.length === 0 && (
              <div className="col-span-full py-10 text-center">
                <p className="text-gray-500">No portfolio items found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
      
      {/* Add/Edit Item Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isAddMode ? 'Add New Portfolio Item' : 'Edit Portfolio Item'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 pt-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="thumbnail" className="block text-sm font-medium mb-1">
                    Thumbnail
                  </label>
                  <ImageUploader 
                    images={formData.thumbnail ? [formData.thumbnail] : []}
                    onChange={handleThumbnailChange}
                    singleMode={true}
                  />
                </div>
                
                <div>
                  <label htmlFor="year" className="block text-sm font-medium mb-1">
                    Year
                  </label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4 pt-4">
                <div>
                  <label htmlFor="client" className="block text-sm font-medium mb-1">
                    Client
                  </label>
                  <Input
                    id="client"
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="videoUrl" className="block text-sm font-medium mb-1">
                    Video URL (YouTube or Vimeo embed link)
                  </label>
                  <Input
                    id="videoUrl"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    placeholder="https://www.youtube.com/embed/..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use the embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID or https://player.vimeo.com/video/VIDEO_ID)
                  </p>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm">
                    Feature this item on homepage
                  </label>
                </div>
              </TabsContent>
              
              <TabsContent value="gallery" className="space-y-4 pt-4">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Image Gallery
                  </label>
                  <ImageUploader
                    images={formData.galleryImages}
                    onChange={handleGalleryImagesChange}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Add multiple images to create a gallery for this project.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cinema-black text-cinema-yellow rounded-md hover:bg-opacity-90 transition-colors"
              >
                {isAddMode ? 'Add Item' : 'Save Changes'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Portfolio;

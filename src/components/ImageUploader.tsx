
import { useState, ChangeEvent } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

const ImageUploader = ({ images = [], onChange }: ImageUploaderProps) => {
  const [newImageUrl, setNewImageUrl] = useState('');
  const [dragging, setDragging] = useState(false);
  
  const handleAddImage = () => {
    if (!newImageUrl) {
      toast.error('Please enter an image URL');
      return;
    }
    
    if (!newImageUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i)) {
      toast.error('Please enter a valid image URL');
      return;
    }
    
    const updatedImages = [...images, newImageUrl];
    onChange(updatedImages);
    setNewImageUrl('');
    toast.success('Image added successfully');
  };
  
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    onChange(updatedImages);
    toast.success('Image removed successfully');
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };
  
  const handleDragLeave = () => {
    setDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    // Get the text that was dropped
    const text = e.dataTransfer.getData('text');
    if (text && text.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i)) {
      const updatedImages = [...images, text];
      onChange(updatedImages);
      toast.success('Image added successfully');
    } else {
      toast.error('Please drop a valid image URL');
    }
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...images];
    const [movedItem] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedItem);
    onChange(updatedImages);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter image URL"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="button" 
          onClick={handleAddImage}
          variant="outline"
        >
          <Upload className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
      
      <div 
        className={`border-2 border-dashed rounded-md p-4 text-center ${dragging ? 'border-primary bg-primary/5' : 'border-gray-300'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-sm text-gray-500">
          Drag and drop image URLs here
        </p>
      </div>
      
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img 
                src={image} 
                alt={`Gallery image ${index + 1}`}
                className="w-full aspect-video object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

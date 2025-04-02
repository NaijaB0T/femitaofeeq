
import { useState, ChangeEvent } from 'react';
import { X, Upload, Trash2, Image, MoveHorizontal, ArrowUp, ArrowDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  singleMode?: boolean;
}

const ImageUploader = ({ images = [], onChange, singleMode = false }: ImageUploaderProps) => {
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
    
    if (singleMode) {
      onChange([newImageUrl]);
    } else {
      const updatedImages = [...images, newImageUrl];
      onChange(updatedImages);
    }
    
    setNewImageUrl('');
    toast.success('Image added successfully');
  };
  
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    onChange(updatedImages);
    toast.success('Image removed successfully');
  };
  
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Convert FileList to array and process each file
    Array.from(files).forEach((file) => {
      // Check if file is an image
      if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/i)) {
        toast.error(`File ${file.name} is not a supported image format`);
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large (max 5MB)`);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const dataUrl = event.target.result.toString();
          
          if (singleMode) {
            onChange([dataUrl]);
          } else {
            const updatedImages = [...images, dataUrl];
            onChange(updatedImages);
          }
          
          toast.success(`Image ${file.name} uploaded successfully`);
        }
      };
      reader.readAsDataURL(file);
    });
    
    // Reset the input to allow uploading the same file again
    e.target.value = '';
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
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Handle file drops
      const files = e.dataTransfer.files;
      Array.from(files).forEach((file) => {
        if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/i)) {
          toast.error(`File ${file.name} is not a supported image format`);
          return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`File ${file.name} is too large (max 5MB)`);
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && event.target.result) {
            const dataUrl = event.target.result.toString();
            
            if (singleMode) {
              onChange([dataUrl]);
            } else {
              const updatedImages = [...images, dataUrl];
              onChange(updatedImages);
            }
            
            toast.success(`Image ${file.name} uploaded successfully`);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      // Get the text that was dropped (for URLs)
      const text = e.dataTransfer.getData('text');
      if (text && text.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i)) {
        if (singleMode) {
          onChange([text]);
        } else {
          const updatedImages = [...images, text];
          onChange(updatedImages);
        }
        toast.success('Image added successfully');
      } else if (text) {
        toast.error('Please drop a valid image URL or file');
      }
    }
  };

  const moveImageUp = (index: number) => {
    if (index <= 0) return;
    
    const updatedImages = [...images];
    const temp = updatedImages[index];
    updatedImages[index] = updatedImages[index - 1];
    updatedImages[index - 1] = temp;
    
    onChange(updatedImages);
    toast.success('Image order updated');
  };
  
  const moveImageDown = (index: number) => {
    if (index >= images.length - 1) return;
    
    const updatedImages = [...images];
    const temp = updatedImages[index];
    updatedImages[index] = updatedImages[index + 1];
    updatedImages[index + 1] = temp;
    
    onChange(updatedImages);
    toast.success('Image order updated');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
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
          size="sm"
        >
          <Upload className="h-4 w-4 mr-2" />
          Add URL
        </Button>
        <div className="relative">
          <Input
            type="file"
            id="image-upload"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 w-full cursor-pointer"
            multiple={!singleMode}
          />
          <Button 
            type="button"
            variant="secondary"
            size="sm"
          >
            <Image className="h-4 w-4 mr-2" />
            Upload {singleMode ? 'Image' : 'Images'}
          </Button>
        </div>
      </div>
      
      <div 
        className={`border-2 border-dashed rounded-md p-4 text-center ${dragging ? 'border-primary bg-primary/5' : 'border-gray-300'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-sm text-gray-500">
          Drag and drop image {singleMode ? 'file' : 'files'} or URLs here
        </p>
      </div>
      
      {images.length > 0 && (
        <div className={singleMode ? "" : "grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4"}>
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img 
                src={image} 
                alt={`Gallery image ${index + 1}`}
                className={`${singleMode ? 'w-full max-h-48 object-contain' : 'w-full aspect-video object-cover'} rounded-md`}
              />
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
                
                {!singleMode && (
                  <>
                    <button
                      type="button"
                      onClick={() => moveImageUp(index)}
                      disabled={index === 0}
                      className={`bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${index === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                      aria-label="Move image up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => moveImageDown(index)}
                      disabled={index === images.length - 1}
                      className={`bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${index === images.length - 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                      aria-label="Move image down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
              
              {!singleMode && (
                <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-0.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {index + 1} / {images.length}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

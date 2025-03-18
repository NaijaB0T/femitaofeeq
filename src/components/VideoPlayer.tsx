
import React, { useState, useEffect } from 'react';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      // Check if the URL is for YouTube
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = '';
        
        if (url.includes('youtube.com/watch?v=')) {
          videoId = new URL(url).searchParams.get('v') || '';
        } else if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1].split('?')[0];
        }
        
        if (videoId) {
          setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
        } else {
          setError(true);
        }
      } 
      // Check if the URL is for Vimeo
      else if (url.includes('vimeo.com')) {
        const vimeoId = url.split('vimeo.com/')[1].split('?')[0];
        setEmbedUrl(`https://player.vimeo.com/video/${vimeoId}`);
      } 
      // URL is not supported
      else {
        setError(true);
      }
    } catch (err) {
      console.error("Error parsing video URL:", err);
      setError(true);
    }
    
    setLoading(false);
  }, [url]);

  if (loading) {
    return (
      <div className="aspect-video bg-gray-100 animate-pulse flex items-center justify-center rounded-lg">
        <div className="text-gray-400">Loading video...</div>
      </div>
    );
  }

  if (error || !embedUrl) {
    return (
      <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-lg">
        <div className="text-gray-500">Video unavailable</div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-lg" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={embedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded Video"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;

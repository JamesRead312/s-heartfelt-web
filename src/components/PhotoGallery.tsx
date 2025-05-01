
import { useEffect, useState } from 'react';

const images = [
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
  'https://images.unsplash.com/photo-1472396961693-142e6e269027',
  'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
];

const PhotoGallery = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 15000); // Show after the message has been displayed
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) return null;

  return (
    <div className="mt-16 mb-8 animate-fade-in">
      <h2 className="text-3xl font-cursive text-center mb-6 text-rose-700">Our Memories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <img 
              src={`${img}?w=600&h=400&fit=crop`} 
              alt={`Our memory ${idx + 1}`} 
              className="w-full h-64 object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '1s' }}>
        <p className="text-3xl font-cursive text-rose-800">Forever yours, James.</p>
        <div className="mt-4">
          <svg className="animate-pulse-gentle mx-auto" width="32" height="32" viewBox="0 0 24 24" fill="#FDA4AF" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;

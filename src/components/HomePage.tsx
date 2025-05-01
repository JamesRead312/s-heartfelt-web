
import { useState } from 'react';
import { Heart } from 'lucide-react';

interface HomePageProps {
  onButtonClick: () => void;
}

const HomePage = ({ onButtonClick }: HomePageProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 transition-all duration-500">
      <div className="container max-w-5xl animate-fade-in">
        <h1 className="font-cursive text-center text-6xl md:text-8xl mb-12 text-rose-700">
          Mi Amor, Alona
        </h1>
        
        <div 
          className={`
            mx-auto w-48 h-48 relative cursor-pointer 
            rounded-full flex items-center justify-center
            transition-all duration-300
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
          onClick={onButtonClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          role="button"
          aria-label="Click me"
        >
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div className="heart-shape transform scale-75 pulse-gentle"></div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-rose-700 font-cursive text-xl z-10">Click Me!</span>
          </div>
          
          <div className="absolute -top-4 -right-4">
            <Heart 
              className={`text-pink-500 fill-pink-200 transition-all duration-300 ${isHovered ? 'animate-soft-bounce' : ''}`} 
              size={32} 
            />
          </div>
        </div>
      </div>
      
      <div className="mt-auto text-center text-sm text-rose-700/60">
        <p>For you, with all my love</p>
      </div>
    </div>
  );
};

export default HomePage;

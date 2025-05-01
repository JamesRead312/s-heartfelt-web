
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      onLoadingComplete();
    }, 5000);

    const progressInterval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 1;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 50);

    // Create floating hearts
    const createdHearts = [];
    for (let i = 0; i < 15; i++) {
      const delay = Math.random() * 5;
      const size = Math.random() * 0.5 + 0.5; // 0.5 to 1
      const left = Math.random() * 80 + 10; // 10% to 90%
      
      createdHearts.push({
        id: i,
        style: {
          position: 'absolute',
          left: `${left}%`,
          top: `${Math.random() * 80 + 10}%`,
          transform: `scale(${size})`,
          opacity: Math.random() * 0.7 + 0.3,
          animationDelay: `${delay}s`,
        } as React.CSSProperties,
      });
    }
    setHearts(createdHearts);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-romance-cream to-romance-blush flex flex-col items-center justify-center z-50">
      <h1 className="text-4xl font-cursive mb-8 text-rose-600">
        Loading a special surprise...
      </h1>
      
      {hearts.map(heart => (
        <div key={heart.id} style={heart.style as React.CSSProperties} className="animate-floating-hearts absolute">
          <Heart className="text-pink-400 fill-pink-200" size={32} />
        </div>
      ))}
      
      <div className="w-64 bg-white/30 rounded-full h-2 mt-4">
        <div 
          className="bg-pink-400 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="mt-4 text-rose-700 font-serif italic">
        {progress < 30 && "Gathering love..."}
        {progress >= 30 && progress < 60 && "Sprinkling romance..."}
        {progress >= 60 && progress < 90 && "Adding special touches..."}
        {progress >= 90 && "Almost ready..."}
      </p>
    </div>
  );
};

export default LoadingScreen;

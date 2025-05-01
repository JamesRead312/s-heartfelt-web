
import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import HomePage from '@/components/HomePage';
import Message from '@/components/Message';
import PhotoGallery from '@/components/PhotoGallery';
import BackgroundEffects from '@/components/BackgroundEffects';
import AudioPlayer from '@/components/AudioPlayer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleButtonClick = () => {
    setShowMessage(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-romance-cream to-romance-blush overflow-x-hidden">
      {isLoading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        <>
          <AudioPlayer />
          <BackgroundEffects />
          
          <div className={`transition-all duration-1000 ${showMessage ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
            <HomePage onButtonClick={handleButtonClick} />
          </div>
          
          {showMessage && (
            <div className="min-h-screen p-6 flex flex-col items-center justify-center animate-fade-in">
              <Message />
              <PhotoGallery />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Index;

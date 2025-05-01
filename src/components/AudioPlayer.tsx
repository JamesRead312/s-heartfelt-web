
import { useEffect, useRef, useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Using a different royalty-free music URL that's more reliable
    const audioUrl = "https://storage.googleapis.com/media-session/sintel/snowfight.mp3";
    
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.volume = volume / 100;
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setError(null);
          })
          .catch(error => {
            // Auto-play was prevented
            console.log("Audio playback issue:", error);
            setIsPlaying(false);
            setError("Click to play music");
          });
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Update volume when slider changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Playback error:", error);
            setError("Unable to play music. Try again.");
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume / 100;
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    setVolume(volumeValue);
    if (volumeValue > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/30 backdrop-blur-sm p-2 rounded-full hover:bg-white/50 transition-all">
      <audio ref={audioRef} loop />
      
      <button 
        onClick={togglePlay} 
        className="p-2 rounded-full hover:bg-white/30 transition-all"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        )}
      </button>
      
      <div className="hidden md:flex items-center gap-2">
        <button 
          onClick={toggleMute}
          className="p-1 rounded-full hover:bg-white/30 transition-all"
        >
          {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        
        <div className="w-24">
          <Slider
            value={[volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="cursor-pointer"
          />
        </div>
      </div>
      
      {error && (
        <span className="text-xs text-rose-700 whitespace-nowrap">{error}</span>
      )}
    </div>
  );
};

export default AudioPlayer;

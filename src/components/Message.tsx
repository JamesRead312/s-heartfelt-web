
import { useEffect, useState } from 'react';

const Message = () => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const lines = [
    "In every heartbeat, I find your name.",
    "In every breath, I feel your love.",
    "You are the calm in my chaos,",
    "The dream I never want to wake from.",
    "I made this little world to show you",
    "Just how deeply, madly, and endlessly",
    "I love you, Alona."
  ];

  useEffect(() => {
    const showLines = () => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < lines.length) {
          setVisibleLines(prev => [...prev, currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 2000);

      return () => clearInterval(interval);
    };

    const timer = setTimeout(showLines, 500);
    return () => clearTimeout(timer);
  }, [lines.length]);

  return (
    <div className="max-w-md mx-auto bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-lg">
      <div className="space-y-4">
        {lines.map((line, index) => (
          <p
            key={index}
            className={`
              text-xl md:text-2xl font-serif text-rose-800 text-center
              transition-all duration-1000 
              ${visibleLines.includes(index) ? 'line-appear' : 'opacity-0'}
            `}
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Message;

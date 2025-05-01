
import { useEffect, useState } from 'react';

interface SnowflakeProps {
  style: React.CSSProperties;
}

const Snowflake = ({ style }: SnowflakeProps) => {
  return <div className="snow" style={style}></div>;
};

const BackgroundEffects = () => {
  const [snowflakes, setSnowflakes] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const createSnowflakes = () => {
      const flakes = [];
      for (let i = 0; i < 50; i++) {
        const delay = Math.random() * 10;
        const initialOpacity = Math.random() * 0.7 + 0.3;
        const duration = (Math.random() * 8 + 5) * 1000; // 5-13 seconds in ms
        
        flakes.push({
          left: `${Math.random() * 100}vw`,
          animationDelay: `${delay}s`,
          opacity: initialOpacity,
          animationDuration: `${duration}ms`,
        });
      }
      setSnowflakes(flakes);
    };

    createSnowflakes();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {snowflakes.map((style, index) => (
        <Snowflake key={index} style={style} />
      ))}
    </div>
  );
};

export default BackgroundEffects;

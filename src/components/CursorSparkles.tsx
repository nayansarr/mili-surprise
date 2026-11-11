import React, { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const CursorSparkles: React.FC = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Check if device supports fine hover cursor
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const colors = ['#f472b6', '#c084fc', '#fde047', '#93c5fd', '#ffffff'];
    let counter = 0;
    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 45) return; // throttle sparkle generation
      lastTime = now;

      const newSparkle: Sparkle = {
        id: ++counter,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)]
      };

      setSparkles(prev => [...prev.slice(-14), newSparkle]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setSparkles(prev => prev.slice(1));
    }, 120);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {sparkles.map(sparkle => (
        <span
          key={sparkle.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-ping"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            color: sparkle.color,
            fontSize: `${sparkle.size}px`,
            opacity: 0.75
          }}
        >
          ✧
        </span>
      ))}
    </div>
  );
};

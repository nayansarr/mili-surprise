import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  speed: number;
  twinkleSpeed: number;
  isHeart?: boolean;
}

export const DreamyCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate stars and floating soft hearts
    const particles: Particle[] = [];
    const colors = ['#fbcfe8', '#e9d5ff', '#fed7aa', '#fef08a', '#bae6fd', '#ffffff'];

    const count = Math.min(65, Math.floor((width * height) / 16000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.25 + 0.05,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        isHeart: i % 7 === 0 // every 7th is a tiny floating heart
      });
    }

    const drawHeart = (cx: number, cy: number, size: number, color: string, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha * 0.7;
      ctx.fillStyle = color;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(cx, cy + topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(
        cx, cy, 
        cx - size / 2, cy, 
        cx - size / 2, cy + topCurveHeight
      );
      // bottom left curve
      ctx.bezierCurveTo(
        cx - size / 2, cy + (size + topCurveHeight) / 2, 
        cx, cy + (size + topCurveHeight) / 1.2, 
        cx, cy + size
      );
      // bottom right curve
      ctx.bezierCurveTo(
        cx, cy + (size + topCurveHeight) / 1.2, 
        cx + size / 2, cy + (size + topCurveHeight) / 2, 
        cx + size / 2, cy + topCurveHeight
      );
      // top right curve
      ctx.bezierCurveTo(
        cx + size / 2, cy, 
        cx, cy, 
        cx, cy + topCurveHeight
      );
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    let step = 0;
    const render = () => {
      step += 1;
      if (width <= 0 || height <= 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Deep celestial gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, Math.max(1, height));
      bgGrad.addColorStop(0, '#0c0d1e');
      bgGrad.addColorStop(0.4, '#15132d');
      bgGrad.addColorStop(0.8, '#1e1638');
      bgGrad.addColorStop(1, '#110e24');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Soft ambient nebula clouds
      const r1 = Math.max(40, width * 0.45);
      const nebula1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 10, width * 0.2, height * 0.3, r1);
      nebula1.addColorStop(0, 'rgba(236, 72, 153, 0.08)');
      nebula1.addColorStop(0.5, 'rgba(168, 85, 247, 0.05)');
      nebula1.addColorStop(1, 'rgba(12, 13, 30, 0)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const r2 = Math.max(60, width * 0.5);
      const nebula2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 20, width * 0.8, height * 0.7, r2);
      nebula2.addColorStop(0, 'rgba(99, 102, 241, 0.08)');
      nebula2.addColorStop(0.6, 'rgba(244, 114, 182, 0.04)');
      nebula2.addColorStop(1, 'rgba(12, 13, 30, 0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // Render stars & floating hearts
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y -= p.speed;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        const alpha = Math.sin(step * p.twinkleSpeed + i) * 0.3 + p.alpha;
        const currentAlpha = Math.max(0.1, Math.min(0.9, alpha));

        if (p.isHeart) {
          drawHeart(p.x, p.y, p.radius * 3.5, p.color, currentAlpha);
        } else {
          ctx.save();
          ctx.globalAlpha = currentAlpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          // Soft star glow for larger stars
          if (p.radius > 2.0) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fill();
          }
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      aria-hidden="true"
    />
  );
};

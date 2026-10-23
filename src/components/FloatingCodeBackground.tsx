import React, { useEffect, useRef } from 'react';

interface CodeSnippetParticle {
  text: string;
  x: number;
  y: number;
  vy: number;
  colorBase: string;
  glowColor: string;
  fontSize: number;
  baseAlpha: number;
  alphaSpeed: number;
  alphaOffset: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  wobbleOffset: number;
}

const CODE_SNIPPETS = [
  'useState<boolean>()',
  'const [state, setState]',
  'useEffect(() => {}, [])',
  'return <Portfolio />',
  'interface Props',
  'type SDE = Engineer',
  'async / await',
  'Promise.resolve()',
  'git commit -m "feat"',
  '() => void',
  '<Canvas />',
  'npm run build',
  'props: Props',
  'const token: string',
  '01000001 01010000', // AP binary
  '<div>{children}</div>',
  'ref.current',
  'Record<string, unknown>',
  'useCallback(() => {}, [])',
  'true : false',
  'import { Three } from "three"',
  'export default App',
  'border-glow: #38bdf8',
  'null | undefined',
  'Math.min(dpr, 2)',
  '200 OK',
  'flex items-center',
  'transition-all duration-300',
  'Array.from({ length: 42 })',
  '<React.Fragment />',
  'status: "active"',
  'tailwind.config.ts',
  'next();',
];

const COLOR_PALETTES = [
  { base: '56, 189, 248', glow: 'rgba(56, 189, 248, 0.45)' }, // Electric Cyan (#38bdf8)
  { base: '14, 165, 233', glow: 'rgba(14, 165, 233, 0.40)' }, // Electric Blue (#0ea5e9)
  { base: '168, 85, 247', glow: 'rgba(168, 85, 247, 0.45)' }, // Cyber Purple (#a855f7)
  { base: '192, 132, 252', glow: 'rgba(192, 132, 252, 0.40)' }, // Neon Violet (#c084fc)
  { base: '96, 165, 250', glow: 'rgba(96, 165, 250, 0.35)' }, // Sky Indigo (#60a5fa)
];

export const FloatingCodeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Check for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = motionQuery.matches;

    // Determine density based on screen width
    const getParticleCount = (w: number): number => {
      if (w < 640) return 14;      // Mobile
      if (w < 1024) return 22;     // Tablet
      return 34;                   // Desktop
    };

    let particles: CodeSnippetParticle[] = [];

    const initParticles = () => {
      const count = getParticleCount(width);
      particles = [];

      for (let i = 0; i < count; i++) {
        const text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
        const palette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
        
        // Mobile-friendly font size variation
        const isMobile = width < 640;
        const fontSize = isMobile
          ? Math.floor(Math.random() * 3) + 11 // 11-13px
          : Math.floor(Math.random() * 4) + 12; // 12-15px

        particles.push({
          text,
          x: Math.random() * width,
          y: Math.random() * height,
          vy: Math.random() * 0.35 + 0.15, // Subtle upward floating speed
          colorBase: palette.base,
          glowColor: palette.glow,
          fontSize,
          baseAlpha: Math.random() * 0.14 + 0.10, // Subtle opacity (0.10 - 0.24)
          alphaSpeed: Math.random() * 0.0015 + 0.0008,
          alphaOffset: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.0012 + 0.0006,
          wobbleAmp: Math.random() * 1.2 + 0.4,
          wobbleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    // Update canvas dimensions with clamped DPR
    const updateSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      initParticles();
    };

    updateSize();

    let lastTime = performance.now();

    const drawFrame = (currentTime: number) => {
      const dt = currentTime - lastTime;
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Gentle upward float
          p.y -= p.vy * (dt / 16.67);

          // Horizontal drift
          p.x += Math.sin(currentTime * p.wobbleSpeed + p.wobbleOffset) * (p.wobbleAmp * 0.2);

          // Wrap boundaries
          if (p.y < -40) {
            p.y = height + 30;
            p.x = Math.random() * width;
          } else if (p.y > height + 40) {
            p.y = -30;
            p.x = Math.random() * width;
          }

          if (p.x < -100) {
            p.x = width + 50;
          } else if (p.x > width + 100) {
            p.x = -50;
          }
        }

        // Calculate breathing opacity
        const alphaPulse = Math.sin(currentTime * p.alphaSpeed + p.alphaOffset);
        const currentAlpha = Math.max(0.06, Math.min(0.28, p.baseAlpha + alphaPulse * 0.06));

        // Font and glow setup
        ctx.font = `${p.fontSize}px 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
        ctx.fillStyle = `rgba(${p.colorBase}, ${currentAlpha})`;
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = 6;

        ctx.fillText(p.text, p.x, p.y);
      }

      // Reset shadow for next draw calls
      ctx.shadowBlur = 0;
    };

    const animate = (time: number) => {
      drawFrame(time);
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Start animation loop
    animationFrameId = requestAnimationFrame(animate);

    // Visibility change handler to pause rAF loop when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now();
        if (!prefersReducedMotion) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(animate);
        } else {
          drawFrame(performance.now());
        }
      }
    };

    // Debounced resize handler
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        updateSize();
        drawFrame(performance.now());
      }, 150);
    };

    // Motion preference change listener
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      cancelAnimationFrame(animationFrameId);
      if (!prefersReducedMotion) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      } else {
        drawFrame(performance.now());
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 select-none"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

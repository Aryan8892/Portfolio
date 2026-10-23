import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on fine-pointer (mouse) devices, never on touchscreens
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isHoverSupported = window.matchMedia('(hover: hover)').matches;
    if (!isFinePointer || !isHoverSupported) {
      return;
    }

    setIsSupported(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Track state
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isHovering = false;
    let isMouseDown = false;
    let currentRingRadius = 15;
    let targetRingRadius = 15;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    // Mouse movement
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
      }

      // Spawn subtle trail particle if moving and motion not reduced
      if (!prefersReducedMotion && Math.random() < 0.45) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.8 + 0.2;
        const isCyan = Math.random() > 0.4;

        particles.push({
          x: mouseX,
          y: mouseY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 0.65,
          size: Math.random() * 2.2 + 1.2,
          color: isCyan ? '56, 189, 248' : '168, 85, 247',
        });

        // Limit particles pool
        if (particles.length > 20) {
          particles.shift();
        }
      }
    };

    // Detect hover on interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input:not([type="text"]):not([type="email"]):not([type="password"]), select, [role="button"], .cursor-pointer, [data-interactive]'
      );

      const isText = target.closest('input[type="text"], input[type="email"], textarea, [contenteditable="true"]');

      if (isText) {
        // Hide custom cursor temporarily for native text input caret
        isVisible = false;
        isHovering = false;
      } else if (interactive) {
        isVisible = true;
        isHovering = true;
      } else {
        isVisible = true;
        isHovering = false;
      }
    };

    const onMouseDown = () => {
      isMouseDown = true;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
    };

    const onMouseEnter = () => {
      isVisible = true;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });
    window.addEventListener('resize', updateCanvasSize, { passive: true });

    // Enable CSS custom cursor hide on interactive elements while custom cursor is active
    document.documentElement.classList.add('custom-cursor-active');

    // 60FPS Render Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isVisible) {
        // Easing interpolation for the outer ring
        const lerpFactor = prefersReducedMotion ? 1 : 0.22;
        ringX += (mouseX - ringX) * lerpFactor;
        ringY += (mouseY - ringY) * lerpFactor;

        // Radius transition based on state
        if (isHovering) {
          targetRingRadius = 26;
        } else if (isMouseDown) {
          targetRingRadius = 11;
        } else {
          targetRingRadius = 16;
        }
        currentRingRadius += (targetRingRadius - currentRingRadius) * 0.2;

        // 1. Draw Trailing Particles
        if (!prefersReducedMotion) {
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.035;

            if (p.alpha <= 0) {
              particles.splice(i, 1);
              continue;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
            ctx.shadowColor = `rgba(${p.color}, 0.8)`;
            ctx.shadowBlur = 6;
            ctx.fill();
          }
        }

        // 2. Draw Outer Purple/Cyan Ring
        ctx.beginPath();
        ctx.arc(ringX, ringY, currentRingRadius, 0, Math.PI * 2);

        if (isHovering) {
          // Interactive expansion state
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)'; // Electric Cyan border
          ctx.lineWidth = 1.8;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
          ctx.shadowBlur = 10;
          ctx.fillStyle = 'rgba(168, 85, 247, 0.12)'; // Soft purple glow interior
          ctx.fill();
        } else {
          // Normal idle state: thin neon purple outer ring
          ctx.strokeStyle = 'rgba(168, 85, 247, 0.75)'; // Cyber Purple
          ctx.lineWidth = 1.4;
          ctx.shadowColor = 'rgba(168, 85, 247, 0.45)';
          ctx.shadowBlur = 7;
        }
        ctx.stroke();

        // 3. Draw Inner Glowing Cyan Dot
        ctx.beginPath();
        const dotRadius = isHovering ? 2.5 : isMouseDown ? 4.5 : 3.5;
        ctx.arc(mouseX, mouseY, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8'; // Glowing cyan
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 9;
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('resize', updateCanvasSize);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!isSupported) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999]"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />
  );
};

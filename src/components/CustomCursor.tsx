import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const ripple = rippleRef.current;
    const canvas = canvasRef.current;
    if (!dot || !ring || !ripple || !canvas) return;

    const ctx = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // State tracking
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isHovering = false;
    let isMouseDown = false;
    let scale = 1;
    let targetScale = 1;

    // Trail sparks
    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }
    const sparks: Spark[] = [];

    // Pointer event handler (works across desktop and touch-enabled hybrid laptops)
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;

      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        document.documentElement.classList.add('custom-cursor-active');
      }

      // Spawn subtle cyber trailing spark
      if (!prefersReducedMotion && ctx && Math.random() < 0.35) {
        const isCyan = Math.random() > 0.4;
        sparks.push({
          x: mouseX,
          y: mouseY,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 2 + 1,
          alpha: 0.65,
          color: isCyan ? '0, 240, 255' : '168, 85, 247',
        });
        if (sparks.length > 25) sparks.shift();
      }
    };

    // Detect hover on interactive items
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isText = target.closest(
        'input[type="text"], input[type="email"], input[type="password"], textarea, [contenteditable="true"]'
      );

      if (isText) {
        isHovering = false;
        dot.style.opacity = '0';
        ring.style.opacity = '0';
        return;
      }

      dot.style.opacity = isVisible ? '1' : '0';
      ring.style.opacity = isVisible ? '1' : '0';

      const isInteractive = target.closest(
        'a, button, [role="button"], input, select, .cursor-pointer, [data-interactive], .glass-panel'
      );

      isHovering = !!isInteractive;
    };

    const onMouseDown = () => {
      isMouseDown = true;
      // Trigger glowing ripple burst
      ripple.style.transition = 'none';
      ripple.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(0.6)`;
      ripple.style.opacity = '0.9';

      requestAnimationFrame(() => {
        ripple.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease-out';
        ripple.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(2.4)`;
        ripple.style.opacity = '0';
      });
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      ripple.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // 120FPS Hardware-Accelerated Smooth Render Loop
    let animationFrameId: number;

    const render = () => {
      if (isVisible) {
        // Fast direct dot position (zero latency for instant feel)
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

        // Smooth spring lerp for the outer following circle
        const lerpFactor = prefersReducedMotion ? 1 : 0.16;
        ringX += (mouseX - ringX) * lerpFactor;
        ringY += (mouseY - ringY) * lerpFactor;

        // Target scale based on state
        if (isMouseDown) {
          targetScale = 0.75;
        } else if (isHovering) {
          targetScale = 1.45;
        } else {
          targetScale = 1.0;
        }
        scale += (targetScale - scale) * 0.18;

        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;

        // Color & style transition based on hover
        if (isHovering) {
          ring.style.borderColor = 'rgba(0, 240, 255, 0.9)';
          ring.style.backgroundColor = 'rgba(0, 240, 255, 0.08)';
          ring.style.boxShadow = '0 0 18px rgba(0, 240, 255, 0.45), inset 0 0 10px rgba(168, 85, 247, 0.25)';
        } else {
          ring.style.borderColor = 'rgba(56, 189, 248, 0.65)';
          ring.style.backgroundColor = 'rgba(168, 85, 247, 0.03)';
          ring.style.boxShadow = '0 0 12px rgba(56, 189, 248, 0.3), inset 0 0 6px rgba(168, 85, 247, 0.15)';
        }

        // Draw sparks on canvas
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (!prefersReducedMotion && sparks.length > 0) {
            for (let i = sparks.length - 1; i >= 0; i--) {
              const s = sparks[i];
              s.x += s.vx;
              s.y += s.vy;
              s.alpha -= 0.035;

              if (s.alpha <= 0) {
                sparks.splice(i, 1);
                continue;
              }

              ctx.beginPath();
              ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${s.color}, ${s.alpha})`;
              ctx.shadowColor = `rgba(${s.color}, 0.8)`;
              ctx.shadowBlur = 6;
              ctx.fill();
            }
          }
        }
      } else if (ctx && sparks.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sparks.length = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none" aria-hidden="true">
      {/* Background Trail Sparks Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full"
      />

      {/* Outer Smoothly-Following Animated Circle */}
      <div
        ref={ringRef}
        className="pointer-events-none absolute top-0 left-0 w-9 h-9 rounded-full border border-cyan-400/70 opacity-0 will-change-transform flex items-center justify-center transition-colors duration-200"
        style={{
          boxShadow: '0 0 12px rgba(56, 189, 248, 0.3), inset 0 0 6px rgba(168, 85, 247, 0.15)',
        }}
      >
        {/* Subtle Cyber Reticle Accent Notches */}
        <div className="absolute inset-0 rounded-full border border-dashed border-violet-400/30 animate-spin [animation-duration:12s]" />
      </div>

      {/* Click Ripple Effect Ring */}
      <div
        ref={rippleRef}
        className="pointer-events-none absolute top-0 left-0 w-8 h-8 rounded-full border border-cyan-300 opacity-0 will-change-transform"
        style={{
          boxShadow: '0 0 14px rgba(0, 240, 255, 0.6)',
        }}
      />

      {/* Inner Pinpoint Cursor Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 will-change-transform shadow-[0_0_8px_#00f0ff]"
      />
    </div>
  );
};

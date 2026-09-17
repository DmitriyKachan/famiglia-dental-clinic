'use client';

import React, { useEffect, useState } from 'react';

export const AmbientGlow: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Only enable on pointer devices (desktop/tablet with mouse), avoid mobile battery drain
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;

    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    const loop = () => {
      // Smooth lerp interpolation
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (opacity === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div
        className="absolute w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] pointer-events-none"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          background: 'radial-gradient(circle, rgba(197, 168, 128, 0.08) 0%, rgba(197, 168, 128, 0.02) 45%, transparent 70%)',
        }}
      />
    </div>
  );
};

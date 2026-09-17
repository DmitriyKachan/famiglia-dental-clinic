'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

export function BlurFade({
  children,
  className = '',
  duration = 0.4,
  delay = 0,
  yOffset = 8,
  inView = true,
  inViewMargin = '-50px',
  blur = '6px',
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(!inView);

  useEffect(() => {
    if (!inView) {
      setIsInView(true);
      return;
    }

    // Support prefers-reduced-motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsInView(true);
      return;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { rootMargin: inViewMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [inView, inViewMargin]);

  const style: React.CSSProperties = {
    transitionDuration: `${duration}s`,
    transitionDelay: `${delay}s`,
    transitionProperty: 'opacity, filter, transform',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    opacity: isInView ? 1 : 0,
    filter: isInView ? 'blur(0px)' : `blur(${blur})`,
    transform: isInView ? 'translateY(0px)' : `translateY(${yOffset}px)`,
    willChange: 'opacity, filter, transform',
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

export default BlurFade;

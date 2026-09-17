'use client';

import React from 'react';

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#C5A880',
      shimmerSize = '0.08em',
      shimmerDuration = '3s',
      borderRadius = '9999px',
      background = '#1E1B18',
      className = '',
      children,
      type = 'button',
      onClick,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        style={
          {
            '--spread': '90deg',
            '--shimmer-color': shimmerColor,
            '--radius': borderRadius,
            '--speed': shimmerDuration,
            '--cut': shimmerSize,
            '--bg': background,
          } as React.CSSProperties
        }
        className={`group relative z-0 inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-brand-gold/30 px-6 py-3 text-sm font-medium text-white [background:var(--bg)] [border-radius:var(--radius)] transition-all duration-300 hover:border-brand-gold hover:shadow-[0_0_20px_rgba(197,168,128,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      >
        {/* Spark container */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30 overflow-visible [container-type:size]"
        >
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-spin [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div
              className="absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]"
              style={{
                animationDuration: shimmerDuration,
              }}
            />
          </div>
        </div>

        {/* Subtle perimeter glow / highlight */}
        <div
          aria-hidden="true"
          className="absolute inset-px -z-20 rounded-[inherit] bg-brand-dark/95 transition-colors duration-300 group-hover:bg-brand-dark/90"
        />

        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-2 font-medium tracking-wide">
          {children}
        </span>
      </button>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';

export default ShimmerButton;

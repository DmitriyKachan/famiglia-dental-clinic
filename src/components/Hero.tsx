'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Star, ArrowRight, ShieldCheck, MapPin, Sparkles, Crosshair, Eye } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, locale } = useI18n();
  const heroRef = useRef<HTMLElement>(null);

  // 3D Tilt State
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, mouseX: 0, mouseY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Normalised -1 to 1
    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    // Subtle 3D tilt angles
    setTilt({
      rotateX: -normY * 8, // tilt up/down
      rotateY: normX * 10, // tilt left/right
      mouseX: normX * 20,
      mouseY: normY * 20,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, mouseX: 0, mouseY: 0 });
  }, []);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-36 pb-24 md:pt-44 md:pb-36 overflow-hidden bg-[#151210] text-white perspective-1200"
    >
      {/* ========================================================================= */}
      {/* PLANE 1: Backplane (Z: -200px) — Laser Grid & Ambient Optical Beams */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 bg-laser-grid opacity-30 pointer-events-none -z-30" />
      
      {/* Warm Ambient Optical Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-[#D4AF37]/15 via-[#38BDF8]/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-20" />

      {/* Optical Crosshair Marks */}
      <div className="absolute top-28 left-8 text-[#D4AF37]/30 hidden lg:flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase pointer-events-none">
        <Crosshair className="w-3.5 h-3.5 animate-pulse" />
        <span>SYS.OPTICS // 49.820N 24.015E</span>
      </div>

      {/* ========================================================================= */}
      {/* PLANE 2: Typography Plane (Z: -60px) — Monumental Brand Backdrop */}
      {/* ========================================================================= */}
      <div 
        style={{
          transform: `translate3d(${-tilt.mouseX * 0.4}px, ${-tilt.mouseY * 0.4}px, -60px)`,
          transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none -z-10 overflow-hidden"
      >
        <span className="text-[15vw] font-serif font-black tracking-tighter text-[#2D241E]/40 leading-none whitespace-nowrap opacity-60">
          FAMIGLIA
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: High-Tech Copy & Primary CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            {/* Precision Optics Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full glass-panel-dark shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold tracking-wider text-[#F7F4EE] uppercase">
                {t.hero.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#FFFFFF] leading-[1.12] tracking-tight">
              {locale === 'ua' ? (
                <>
                  Мистецтво <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F6F2EA] to-[#D4AF37]">ювелірної</span> стоматології
                </>
              ) : (
                <>
                  The Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F6F2EA] to-[#D4AF37]">Precision</span> Dentistry
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#DFD3C2] leading-relaxed max-w-2xl font-light">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto pt-2">
              <a
                href="#booking"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-[#151210] bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#D4AF37] hover:brightness-110 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 cursor-pointer group"
              >
                <span>{t.hero.ctaBooking}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a
                href="#mirror-inspection"
                className="inline-flex items-center justify-center px-7 py-4 text-base font-medium text-white glass-panel-dark hover:bg-white/10 rounded-full transition-all cursor-pointer space-x-2"
              >
                <Eye className="w-4 h-4 text-[#38BDF8]" />
                <span>{locale === 'ua' ? '3D Інспекція усмішки' : '3D Smile Inspection'}</span>
              </a>
            </div>

            {/* Micro proof telemetry */}
            <div className="pt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#A09388] font-mono">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>100% STERILE CLASS B</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                <span>MICRO-INVASIVE CARE</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>LVIV, BOIKIVSKA 2</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PLANE 3 & 4: Midplane (Z: 0) & Foreground 3D Floating Stage (Z: +80px) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div
              style={{
                transform: `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
              className="relative w-full max-w-md preserve-3d"
            >
              {/* Outer Optic Target Ring */}
              <div className="absolute -inset-4 rounded-[2.5rem] border border-[#D4AF37]/30 pointer-events-none" />
              <div className="absolute -inset-8 rounded-[3rem] border border-dashed border-[#D4AF37]/15 pointer-events-none animate-spin-slow" />

              {/* Main Photo Container */}
              <div className="relative rounded-3xl overflow-hidden glass-panel-dark p-2 shadow-2xl">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#2D241E]/30">
                  <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
                    alt="Famiglia Dental Clinic Atmosphere"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151210]/90 via-transparent to-transparent" />

                  {/* Optical Focus Reticle overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                    <div className="w-24 h-24 border border-dashed border-[#D4AF37] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#38BDF8] rounded-full" />
                    </div>
                  </div>

                  {/* Bottom Text Over Photo */}
                  <div className="absolute bottom-5 left-5 right-5 text-white text-left">
                    <p className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-mono font-semibold">
                      FAMIGLIA • LVIV
                    </p>
                    <p className="text-base font-serif italic mt-1 text-white">
                      «{locale === 'ua' ? 'Стоматологія без болю та страху' : 'Dentistry without pain or fear'}»
                    </p>
                  </div>
                </div>
              </div>

              {/* Foreground Floating Widget 1: 25x Optical Micro-Precision */}
              <div
                style={{
                  transform: `translate3d(${tilt.mouseX * 0.8}px, ${tilt.mouseY * 0.8}px, 60px)`,
                  transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
                className="absolute -top-6 -left-6 glass-panel-dark rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[#D4AF37]/40 flex items-center space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-mono font-bold text-sm">
                  25x
                </div>
                <div className="text-left pr-2">
                  <p className="text-[10px] uppercase font-mono tracking-widest text-[#38BDF8] font-bold">
                    Carl Zeiss Optics
                  </p>
                  <p className="text-xs font-semibold text-white">
                    {locale === 'ua' ? 'Дентальний мікроскоп' : 'Dental Microscope'}
                  </p>
                </div>
              </div>

              {/* Foreground Floating Widget 2: 15+ Years & Founder */}
              <div
                style={{
                  transform: `translate3d(${tilt.mouseX * 0.6}px, ${tilt.mouseY * 0.6}px, 40px)`,
                  transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
                className="absolute -bottom-6 -right-6 glass-panel-dark rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[#D4AF37]/40 flex items-center space-x-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#151210] font-bold text-base">
                  ★
                </div>
                <div className="text-left">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-sm font-bold text-white">4.9 / 5.0</span>
                    <span className="text-[10px] text-[#D4AF37]">★★★★★</span>
                  </div>
                  <p className="text-[11px] text-[#DFD3C2]">
                    {locale === 'ua' ? 'Тетяна Бибіс • 15+ років' : 'Tetiana Bybis • 15+ yrs'}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

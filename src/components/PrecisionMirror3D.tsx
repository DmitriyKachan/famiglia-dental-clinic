'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Sparkles, Move, ZoomIn, CheckCircle2, Eye, ShieldAlert } from 'lucide-react';

interface InspectionTarget {
  id: string;
  nameUa: string;
  nameEn: string;
  baseImg: string;
  macroImg: string;
  tagUa: string;
  tagEn: string;
  noteUa: string;
  noteEn: string;
}

const targets: InspectionTarget[] = [
  {
    id: 'veneer',
    nameUa: 'Керамічний вінір e.max',
    nameEn: 'Ceramic Veneer e.max',
    baseImg: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=85',
    macroImg: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=2400&q=95',
    tagUa: 'Товщина 0.3 мм • Ідеальне прилягання',
    tagEn: 'Thickness 0.3mm • Perfect Margin Fit',
    noteUa: 'Бездоганний плавний перехід між вініром та яснами без нависаючих країв.',
    noteEn: 'Flawless margin transition between veneer and gum line without overhang.',
  },
  {
    id: 'restoration',
    nameUa: 'Художня реставрація фісур',
    nameEn: 'Direct Composite Restoration',
    baseImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85',
    macroImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=2400&q=95',
    tagUa: 'Анатомічне моделювання горбків',
    tagEn: 'Anatomical Cusp Sculpting',
    noteUa: 'Пошарове відтворення природних світлотіней та індивідуального рельєфу емалі.',
    noteEn: 'Layer-by-layer sculpting of natural enamel opalescence and fissure depth.',
  },
];

export const PrecisionMirror3D: React.FC = () => {
  const { locale } = useI18n();
  const [activeTarget, setActiveTarget] = useState<InspectionTarget>(targets[0]);
  const stageRef = useRef<HTMLDivElement>(null);

  // Position in percentage (0 to 100)
  const [lensPos, setLensPos] = useState({ x: 50, y: 45 });
  const [isInteracting, setIsInteracting] = useState(false);
  const [tilt3D, setTilt3D] = useState({ rx: 0, ry: 0 });

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const relX = Math.max(10, Math.min(90, ((clientX - rect.left) / rect.width) * 100));
    const relY = Math.max(15, Math.min(85, ((clientY - rect.top) / rect.height) * 100));

    const normX = ((clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((clientY - rect.top) / rect.height - 0.5) * 2;

    setLensPos({ x: relX, y: relY });
    setTilt3D({
      rx: -normY * 12, // 3D tilt forward/backward
      ry: normX * 15,  // 3D tilt left/right
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    updatePosition(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <section id="mirror-inspection" className="relative py-28 bg-[#151210] text-white overflow-hidden scroll-mt-20">
      {/* Background Laser Lines */}
      <div className="absolute inset-0 bg-laser-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1E1916] border border-[#D4AF37]/40 text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-4 shadow-sm">
            <Eye className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{locale === 'ua' ? 'АВТОРСЬКИЙ ІНТЕРАКТИВ' : 'SIGNATURE MOVE'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            {locale === 'ua' ? '3D Інспекція мікроскопа' : '3D Optical Microscope Inspection'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#DFD3C2] font-light leading-relaxed">
            {locale === 'ua'
              ? 'Наведіть або перетягуйте стоматологічне сапфірове дзеркало, щоб роздивитися бездоганність кожного мікрона реставрації під оптикою.'
              : 'Hover or drag the sapphire dental mirror to inspect the flawless micro-precision of the restoration under optical magnification.'}
          </p>
        </div>

        {/* Target Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-full bg-[#1E1916] border border-[#D4AF37]/30 space-x-2">
            {targets.map((tgt) => (
              <button
                key={tgt.id}
                type="button"
                onClick={() => setActiveTarget(tgt)}
                className={`px-5 py-2.5 text-xs sm:text-sm font-mono tracking-wider uppercase rounded-full transition-all cursor-pointer ${
                  activeTarget.id === tgt.id
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C378] text-[#151210] font-bold shadow-lg'
                    : 'text-[#DFD3C2] hover:text-white'
                }`}
              >
                {locale === 'ua' ? tgt.nameUa : tgt.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Main 3D Inspection Stage */}
        <div className="max-w-5xl mx-auto relative rounded-3xl p-3 sm:p-4 glass-panel-dark border border-[#D4AF37]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {/* Telemetry Header Strip */}
          <div className="flex flex-wrap items-center justify-between px-4 py-2 mb-2 text-[11px] font-mono text-[#D4AF37] border-b border-[#D4AF37]/20">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
              <span>LIVE OPTICS // ZEISS 25X LOUPE</span>
            </div>
            <div className="flex items-center space-x-4 text-[#A09388]">
              <span>MAGNIFICATION: 3.5X</span>
              <span>COORD: X:{Math.round(lensPos.x)}% Y:{Math.round(lensPos.y)}%</span>
            </div>
          </div>

          {/* Interactive Inspection Canvas Container */}
          <div
            ref={stageRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            onTouchMove={handleTouchMove}
            className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden cursor-crosshair select-none bg-black"
          >
            {/* Base Image (Standard Resolution) */}
            <img
              src={activeTarget.baseImg}
              alt={locale === 'ua' ? activeTarget.nameUa : activeTarget.nameEn}
              className="w-full h-full object-cover object-center pointer-events-none filter brightness-90 contrast-105"
            />

            {/* Ambient vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Helper drag guide when idle */}
            {!isInteracting && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#D4AF37]/50 flex items-center space-x-2 text-xs font-mono text-[#D4AF37] animate-pulse">
                <Move className="w-4 h-4 text-[#38BDF8]" />
                <span>{locale === 'ua' ? 'Посуньте дзеркало для огляду' : 'Move mirror to inspect details'}</span>
              </div>
            )}

            {/* ================================================================= */}
            {/* THE 3D SAPPHIRE DENTAL MIRROR (Interactive Optical Loupe) */}
            {/* ================================================================= */}
            <div
              style={{
                left: `${lensPos.x}%`,
                top: `${lensPos.y}%`,
                transform: `translate(-50%, -50%) perspective(800px) rotateX(${tilt3D.rx}deg) rotateY(${tilt3D.ry}deg)`,
                transition: 'transform 0.08s ease-out',
              }}
              className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full pointer-events-none z-20 shadow-[0_0_50px_rgba(212,175,55,0.6),0_20px_40px_rgba(0,0,0,0.9)]"
            >
              {/* Metallic Mirror Bezel Ring */}
              <div className="absolute -inset-2 rounded-full border-4 border-[#D4AF37] bg-gradient-to-tr from-[#B89368] via-[#F7F4EE] to-[#8C7355] opacity-90 shadow-xl" />
              <div className="absolute -inset-1 rounded-full border border-white/60" />

              {/* Angled Chrome Dental Mirror Handle Graphic */}
              <div 
                style={{ transform: 'rotate(-45deg)' }}
                className="absolute -bottom-14 -left-14 w-28 h-5 bg-gradient-to-r from-[#DFD3C2] via-[#F7F4EE] to-[#6E6259] rounded-full shadow-2xl border border-black/40 -z-10"
              />

              {/* Magnified High-Resolution Lens Viewport */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#38BDF8]">
                <div
                  style={{
                    backgroundImage: `url(${activeTarget.macroImg})`,
                    backgroundSize: '350%',
                    backgroundPosition: `${lensPos.x}% ${lensPos.y}%`,
                  }}
                  className="w-full h-full transform scale-110 filter brightness-110 contrast-115"
                />

                {/* Sapphire Glass Fresnel Light Glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/40 pointer-events-none" />

                {/* Laser Optical Reticle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 border border-[#38BDF8]/60 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full shadow-[0_0_8px_#38BDF8]" />
                  </div>
                  <div className="absolute w-full h-[1px] bg-[#38BDF8]/20" />
                  <div className="absolute h-full w-[1px] bg-[#38BDF8]/20" />
                </div>
              </div>

              {/* Floating Magnification Tag */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#151210] border border-[#38BDF8] text-[#38BDF8] font-mono font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-md">
                3.5x ZOOM
              </div>
            </div>

          </div>

          {/* Bottom Card Summary */}
          <div className="mt-4 p-4 rounded-2xl bg-[#1E1916] border border-[#D4AF37]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-xs font-mono font-bold uppercase text-[#D4AF37]">
                  {locale === 'ua' ? activeTarget.tagUa : activeTarget.tagEn}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#DFD3C2] font-light">
                {locale === 'ua' ? activeTarget.noteUa : activeTarget.noteEn}
              </p>
            </div>

            <a
              href="#booking"
              className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-mono uppercase font-bold tracking-wider text-[#151210] bg-gradient-to-r from-[#D4AF37] to-[#E5C378] hover:brightness-110 rounded-full transition-all cursor-pointer shrink-0 shadow-md"
            >
              {locale === 'ua' ? 'Записатися на діагностику' : 'Book Optical Diagnosis'}
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

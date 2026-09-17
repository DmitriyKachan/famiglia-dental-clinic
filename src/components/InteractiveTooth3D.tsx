'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useI18n } from '@/lib/i18n/context';
import { Sparkles, Layers, ShieldCheck, Eye, ArrowRight, RotateCw } from 'lucide-react';
import { BlurFade } from './magicui/BlurFade';

type ViewMode = 'anatomy' | 'veneer' | 'implant';

export const InteractiveTooth3D: React.FC = () => {
  const { t, locale } = useI18n();
  const mountRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('veneer');
  const [isHovered, setIsHovered] = useState(false);
  const [activePin, setActivePin] = useState<number | null>(0);

  // References to 3D objects for dynamic mode switching
  const sceneRef = useRef<THREE.Scene | null>(null);
  const toothMeshRef = useRef<THREE.Mesh | null>(null);
  const veneerMeshRef = useRef<THREE.Mesh | null>(null);
  const implantMeshRef = useRef<THREE.Group | null>(null);
  const rootMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    // Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf5ebe0, 1.2);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    // Luxury Warm Gold Rim Light
    const goldRimLight = new THREE.PointLight(0xc5a880, 4.0, 10);
    goldRimLight.position.set(2.5, 2.5, -2.5);
    scene.add(goldRimLight);

    const blueBackLight = new THREE.PointLight(0xe0f2fe, 1.5, 10);
    blueBackLight.position.set(-2.5, -2.0, -2.5);
    scene.add(blueBackLight);

    // Group for all tooth components
    const toothGroup = new THREE.Group();
    scene.add(toothGroup);

    // 1. Procedural High-Gloss Tooth Crown Geometry
    // Using a refined parametric shape resembling a maxillary incisor/canine
    const crownPoints: THREE.Vector2[] = [];
    const segments = 24;
    for (let i = 0; i <= segments; i++) {
      const y = (i / segments) * 1.8 - 0.2; // -0.2 to 1.6
      let radius = 0.55;
      if (y < 0.2) {
        // Neck/cervical line
        radius = 0.48 + y * 0.4;
      } else if (y < 1.1) {
        // Crown body & belly
        const tVal = (y - 0.2) / 0.9;
        radius = 0.56 + Math.sin(tVal * Math.PI) * 0.24;
      } else {
        // Incisal edge tapering
        const tVal = (y - 1.1) / 0.5;
        radius = 0.72 - tVal * 0.28;
      }
      crownPoints.push(new THREE.Vector2(radius, y));
    }

    const crownGeo = new THREE.LatheGeometry(crownPoints, 32);
    // Flatten front-to-back slightly like a natural incisor
    crownGeo.scale(1.0, 1.0, 0.68);

    // Enamel Material (Physical PBR shader)
    const enamelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfcfbfa,
      roughness: 0.12,
      metalness: 0.02,
      clearcoat: 0.95,
      clearcoatRoughness: 0.08,
      transmission: 0.22,
      ior: 1.54,
      reflectivity: 0.6,
    });

    const toothMesh = new THREE.Mesh(crownGeo, enamelMaterial);
    toothGroup.add(toothMesh);
    toothMeshRef.current = toothMesh;

    // 2. Natural Root Geometry
    const rootPoints: THREE.Vector2[] = [];
    for (let i = 0; i <= 16; i++) {
      const tVal = i / 16;
      const y = -0.2 - tVal * 1.2; // -0.2 to -1.4
      const radius = 0.46 * (1 - tVal * 0.75);
      rootPoints.push(new THREE.Vector2(radius, y));
    }
    const rootGeo = new THREE.LatheGeometry(rootPoints, 24);
    rootGeo.scale(0.85, 1.0, 0.75);

    const rootMaterial = new THREE.MeshStandardMaterial({
      color: 0xdfd3c3,
      roughness: 0.5,
      metalness: 0.0,
    });
    const rootMesh = new THREE.Mesh(rootGeo, rootMaterial);
    toothGroup.add(rootMesh);
    rootMeshRef.current = rootMesh;

    // 3. Ultra-Thin Ceramic Veneer Shell Layer (0.3mm offset)
    const veneerPoints: THREE.Vector2[] = [];
    for (let i = 3; i <= segments; i++) {
      const p = crownPoints[i];
      veneerPoints.push(new THREE.Vector2(p.x * 1.045, p.y));
    }
    const veneerGeo = new THREE.LatheGeometry(veneerPoints, 32, 0, Math.PI); // Front half shell
    veneerGeo.scale(1.0, 1.0, 0.7);
    veneerGeo.rotateY(-Math.PI / 2); // Front facing

    const veneerMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.05,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      transmission: 0.45,
      ior: 1.58,
      sheen: 0.6,
      sheenColor: new THREE.Color(0xfef08a),
    });

    const veneerMesh = new THREE.Mesh(veneerGeo, veneerMaterial);
    veneerMesh.position.z = 0.02;
    toothGroup.add(veneerMesh);
    veneerMeshRef.current = veneerMesh;

    // 4. Swiss Titanium Dental Implant Group (visible in 'implant' mode)
    const implantGroup = new THREE.Group();
    // Implant Screw Threads
    const screwGeo = new THREE.CylinderGeometry(0.38, 0.22, 1.4, 24, 16);
    const implantMaterial = new THREE.MeshStandardMaterial({
      color: 0x8e9297,
      metalness: 0.92,
      roughness: 0.25,
    });
    const screwMesh = new THREE.Mesh(screwGeo, implantMaterial);
    screwMesh.position.y = -0.85;
    implantGroup.add(screwMesh);

    // Abutment Gold/Titanium Collar
    const collarGeo = new THREE.CylinderGeometry(0.42, 0.36, 0.35, 24);
    const collarMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.2,
    });
    const collarMesh = new THREE.Mesh(collarGeo, collarMaterial);
    collarMesh.position.y = -0.05;
    implantGroup.add(collarMesh);

    implantGroup.visible = false;
    toothGroup.add(implantGroup);
    implantMeshRef.current = implantGroup;

    // Subtle floating animation and mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        targetRotationY += deltaX * 0.012;
        targetRotationX += deltaY * 0.008;
        prevMouseX = clientX;
        prevMouseY = clientY;
      } else {
        const rect = container.getBoundingClientRect();
        mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -(((clientY - rect.top) / rect.height) * 2 - 1);
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth auto rotation when idle
      if (!isDragging) {
        targetRotationY += 0.004;
        toothGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.06;
      }

      // Smooth damping interpolation
      toothGroup.rotation.y += (targetRotationY + mouseX * 0.25 - toothGroup.rotation.y) * 0.08;
      toothGroup.rotation.x += (targetRotationX + mouseY * 0.15 - toothGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      renderer.dispose();
      crownGeo.dispose();
      rootGeo.dispose();
      veneerGeo.dispose();
      screwGeo.dispose();
      collarGeo.dispose();
      enamelMaterial.dispose();
      rootMaterial.dispose();
      veneerMaterial.dispose();
      implantMaterial.dispose();
      collarMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update 3D visibility based on ViewMode
  useEffect(() => {
    if (!toothMeshRef.current || !veneerMeshRef.current || !implantMeshRef.current || !rootMeshRef.current) {
      return;
    }

    if (viewMode === 'anatomy') {
      toothMeshRef.current.visible = true;
      (toothMeshRef.current.material as THREE.MeshPhysicalMaterial).opacity = 1.0;
      (toothMeshRef.current.material as THREE.MeshPhysicalMaterial).transparent = false;
      rootMeshRef.current.visible = true;
      veneerMeshRef.current.visible = false;
      implantMeshRef.current.visible = false;
    } else if (viewMode === 'veneer') {
      toothMeshRef.current.visible = true;
      // Slight transparency to reveal preparation and veneer layer
      (toothMeshRef.current.material as THREE.MeshPhysicalMaterial).transparent = true;
      (toothMeshRef.current.material as THREE.MeshPhysicalMaterial).opacity = 0.88;
      rootMeshRef.current.visible = true;
      veneerMeshRef.current.visible = true;
      implantMeshRef.current.visible = false;
    } else if (viewMode === 'implant') {
      toothMeshRef.current.visible = true;
      (toothMeshRef.current.material as THREE.MeshPhysicalMaterial).transparent = false;
      (toothMeshRef.current.material as THREE.MeshPhysicalMaterial).opacity = 1.0;
      rootMeshRef.current.visible = false;
      veneerMeshRef.current.visible = false;
      implantMeshRef.current.visible = true;
    }
  }, [viewMode]);

  const annotations = [
    {
      id: 0,
      titleUa: 'Ультратонка кераміка 0.3–0.5 мм',
      titleEn: 'Ultra-thin ceramic 0.3–0.5 mm',
      descUa: 'Максимальне збереження живої тканини зуба без надмірного спилювання.',
      descEn: 'Maximum tooth vitality preservation with micro-preparation.',
      mode: 'veneer' as ViewMode,
    },
    {
      id: 1,
      titleUa: 'Природна оптична опалесценція',
      titleEn: 'Natural optical opalescence',
      descUa: 'Ідентична світлопроникність до живої емалі при будь-якому освітленні.',
      descEn: 'Lifelike light refraction identical to natural tooth enamel.',
      mode: 'anatomy' as ViewMode,
    },
    {
      id: 2,
      titleUa: 'Швейцарська біосумісність',
      titleEn: 'Swiss biocompatibility',
      descUa: 'Преміальний титан Grade 4 з остеоінтеграцією понад 99.4%.',
      descEn: 'Premium Grade 4 titanium with over 99.4% osseointegration success.',
      mode: 'implant' as ViewMode,
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-b from-brand-base via-white to-brand-base overflow-hidden border-b border-brand-border">
      {/* Subtle Background Glow Orbs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-amber-100/40 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <BlurFade delay={0.05}>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-surface border border-brand-border text-xs font-semibold uppercase tracking-wider text-brand-gold mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>{locale === 'ua' ? 'ІНТЕРАКТИВНИЙ 3D-ДОСВІД' : 'INTERACTIVE 3D EXPERIENCE'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-brand-dark">
              {locale === 'ua' ? 'Цифрове моделювання та ювелірна точність' : 'Digital Modeling & Micro-Precision Precision'}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-light">
              {locale === 'ua'
                ? 'Обертайте інтерактивну модель, перемикайте режими та подивіться, як створюється бездоганна реставрація у Famiglia.'
                : 'Rotate the interactive model, switch modes, and inspect how seamless dental restorations are crafted at Famiglia.'}
            </p>
          </div>
        </BlurFade>

        {/* 3D Showcase Card with Liquid Glass Backdrop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center 3D Canvas Column */}
          <div className="lg:col-span-7 relative">
            <div
              className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl bg-gradient-to-b from-white/90 to-brand-base/80 border border-brand-border/80 shadow-[0_16px_40px_rgba(45,36,30,0.06)] backdrop-blur-xl overflow-hidden cursor-grab active:cursor-grabbing group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Three.js Canvas Container */}
              <div ref={mountRef} className="w-full h-full" />

              {/* 360 Hint Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-surface/90 backdrop-blur-md border border-brand-border text-[11px] font-medium text-brand-dark shadow-sm pointer-events-none">
                <RotateCw className="w-3.5 h-3.5 text-brand-gold animate-spin" style={{ animationDuration: '6s' }} />
                <span>{locale === 'ua' ? 'Поверніть модель на 360°' : 'Rotate model 360°'}</span>
              </div>

              {/* Live Shimmer Reflection Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* View Mode Switcher Pills at the bottom of the canvas */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-center">
                <div className="inline-flex p-1 rounded-2xl bg-brand-surface/95 backdrop-blur-md border border-brand-border shadow-md space-x-1">
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('veneer');
                      setActivePin(0);
                    }}
                    className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                      viewMode === 'veneer'
                        ? 'bg-brand-dark text-white shadow-sm'
                        : 'text-brand-muted hover:text-brand-dark hover:bg-brand-base'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{locale === 'ua' ? 'Вініри 0.3 мм' : 'Veneers 0.3mm'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('anatomy');
                      setActivePin(1);
                    }}
                    className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                      viewMode === 'anatomy'
                        ? 'bg-brand-dark text-white shadow-sm'
                        : 'text-brand-muted hover:text-brand-dark hover:bg-brand-base'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{locale === 'ua' ? 'Емаль та коронка' : 'Enamel & Crown'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('implant');
                      setActivePin(2);
                    }}
                    className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                      viewMode === 'implant'
                        ? 'bg-brand-dark text-white shadow-sm'
                        : 'text-brand-muted hover:text-brand-dark hover:bg-brand-base'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{locale === 'ua' ? 'Імплантація' : 'Implant System'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Clinical Highlights & Interactive Feature Explorer */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark">
                {locale === 'ua' ? 'Технології цифрової точності' : 'Precision Digital Technologies'}
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                {locale === 'ua'
                  ? 'У клініці Famiglia ми поєднуємо естетичне відчуття пропорцій із 3D-моделюванням та мікроскопічним контролем кожного міліметра.'
                  : 'At Famiglia clinic, we combine aesthetic proportion harmony with 3D smile planning and microscopic control.'}
              </p>
            </div>

            {/* Interactive Feature Cards */}
            <div className="space-y-3 pt-2">
              {annotations.map((item, idx) => {
                const isSelected = activePin === idx;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActivePin(idx);
                      setViewMode(item.mode);
                    }}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-white border-brand-gold shadow-md -translate-y-0.5'
                        : 'bg-white/60 hover:bg-white border-brand-border/80 hover:border-brand-border shadow-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                          isSelected ? 'bg-brand-gold text-white shadow-sm' : 'bg-brand-base text-brand-muted'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-brand-dark">
                          {locale === 'ua' ? item.titleUa : item.titleEn}
                        </h4>
                        <p className="mt-1 text-xs text-brand-muted leading-relaxed">
                          {locale === 'ua' ? item.descUa : item.descEn}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action CTA */}
            <div className="pt-3">
              <a
                href="#booking"
                className="inline-flex items-center justify-center space-x-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-brand-dark text-white text-sm font-semibold hover:bg-stone-800 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>{locale === 'ua' ? 'Записатися на 3D-діагностику' : 'Book 3D Smile Consultation'}</span>
                <ArrowRight className="w-4 h-4 text-brand-gold" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

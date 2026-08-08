import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Hero3DCanvasProps {
  mousePos: { x: number; y: number };
  theme: 'dark' | 'light';
  onCupClick?: () => void;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ mousePos, theme, onCupClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    
    // Slight fog for cinematic depth
    scene.fog = new THREE.FogExp2(theme === 'dark' ? 0x2C1810 : 0xFAF6F0, 0.08);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // 2. Lighting - Cinematic Warm Sunlight & Environment Highlights
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.9);
    scene.add(ambientLight);

    // Main Key Light (Morning Sun)
    const keyLight = new THREE.DirectionalLight(0xffdca8, 2.5);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Rim / Fill Light for Ceramic Gloss Reflection
    const rimLight = new THREE.DirectionalLight(0xc58b44, 1.8);
    rimLight.position.set(-6, -2, -3);
    scene.add(rimLight);

    const topSoftLight = new THREE.PointLight(0xfff0dd, 1.2, 10);
    topSoftLight.position.set(0, 4, 2);
    scene.add(topSoftLight);

    // 3. Create 3D Ceramic Coffee Cup Group
    const coffeeGroup = new THREE.Group();
    // Position on the right side for desktop screens, centered for mobile
    const isMobile = window.innerWidth < 768;
    coffeeGroup.position.set(isMobile ? 0 : 1.8, isMobile ? -0.4 : 0.1, 0);
    scene.add(coffeeGroup);

    // Ceramic Cup Material (PBR)
    const ceramicMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfdfbf7,
      roughness: 0.15,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.9,
    });

    // Golden Rim / Base Trim Material
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc58b44,
      metalness: 0.85,
      roughness: 0.2,
    });

    // Cup Body Geometry (Tapered Cylinder)
    const cupRadiusTop = 1.1;
    const cupRadiusBottom = 0.75;
    const cupHeight = 1.5;
    const cupGeo = new THREE.CylinderGeometry(cupRadiusTop, cupRadiusBottom, cupHeight, 48, 1, false);
    const cupMesh = new THREE.Mesh(cupGeo, ceramicMaterial);
    cupMesh.castShadow = true;
    cupMesh.receiveShadow = true;
    coffeeGroup.add(cupMesh);

    // Cup Inner Hollow Mesh
    const cupInnerGeo = new THREE.CylinderGeometry(cupRadiusTop - 0.08, cupRadiusBottom - 0.08, cupHeight - 0.05, 48);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a2416,
      roughness: 0.4,
    });
    const cupInnerMesh = new THREE.Mesh(cupInnerGeo, innerMaterial);
    cupInnerMesh.position.y = 0.04;
    coffeeGroup.add(cupInnerMesh);

    // Cup Gold Rim Accent
    const rimGeo = new THREE.TorusGeometry(cupRadiusTop, 0.04, 16, 64);
    const rimMesh = new THREE.Mesh(rimGeo, goldMaterial);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = cupHeight / 2;
    coffeeGroup.add(rimMesh);

    // Cup Handle (Curved Torus Segment)
    const handleGeo = new THREE.TorusGeometry(0.5, 0.09, 16, 32, Math.PI * 0.85);
    const handleMesh = new THREE.Mesh(handleGeo, ceramicMaterial);
    handleMesh.position.set(cupRadiusTop - 0.1, 0, 0);
    handleMesh.rotation.z = -Math.PI / 2;
    handleMesh.castShadow = true;
    coffeeGroup.add(handleMesh);

    // Ceramic Saucer Plate
    const saucerGeo = new THREE.CylinderGeometry(1.6, 1.1, 0.12, 48);
    const saucerMesh = new THREE.Mesh(saucerGeo, ceramicMaterial);
    saucerMesh.position.y = -cupHeight / 2 - 0.1;
    saucerMesh.castShadow = true;
    saucerMesh.receiveShadow = true;
    coffeeGroup.add(saucerMesh);

    // Saucer Gold Rim Accent
    const saucerRimGeo = new THREE.TorusGeometry(1.6, 0.03, 16, 64);
    const saucerRimMesh = new THREE.Mesh(saucerRimGeo, goldMaterial);
    saucerRimMesh.rotation.x = Math.PI / 2;
    saucerRimMesh.position.y = -cupHeight / 2 - 0.04;
    coffeeGroup.add(saucerRimMesh);

    // 4. Create Latte Art Surface Canvas Texture
    const canvasLatte = document.createElement('canvas');
    canvasLatte.width = 512;
    canvasLatte.height = 512;
    const ctx = canvasLatte.getContext('2d');
    if (ctx) {
      // Dark Espresso Base
      const grad = ctx.createRadialGradient(256, 256, 20, 256, 256, 256);
      grad.addColorStop(0, '#5B3A29');
      grad.addColorStop(0.5, '#3A2416');
      grad.addColorStop(1, '#2C1810');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(256, 256, 250, 0, Math.PI * 2);
      ctx.fill();

      // Silky Cream Rosetta Latte Art Pattern
      ctx.fillStyle = '#F7F2EC';
      ctx.shadowColor = '#B7793E';
      ctx.shadowBlur = 10;
      
      // Central Heart Rosetta leaves
      for (let i = 0; i < 7; i++) {
        const radiusY = 30 + i * 18;
        const radiusX = 15 + i * 12;
        const yPos = 280 - i * 22;
        ctx.beginPath();
        ctx.ellipse(256, yPos, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(247, 242, 236, 0.95)' : 'rgba(216, 181, 138, 0.7)';
        ctx.fill();
      }

      // Top Heart Cap
      ctx.beginPath();
      ctx.arc(256, 100, 22, 0, Math.PI * 2);
      ctx.fillStyle = '#F7F2EC';
      ctx.fill();
    }

    const latteTexture = new THREE.CanvasTexture(canvasLatte);
    const coffeeLiquidMaterial = new THREE.MeshStandardMaterial({
      map: latteTexture,
      roughness: 0.35,
      metalness: 0.1,
    });

    // Coffee Liquid Surface Mesh
    const liquidGeo = new THREE.CircleGeometry(cupRadiusTop - 0.08, 48);
    const liquidMesh = new THREE.Mesh(liquidGeo, coffeeLiquidMaterial);
    liquidMesh.rotation.x = -Math.PI / 2;
    liquidMesh.position.y = cupHeight / 2 - 0.08;
    coffeeGroup.add(liquidMesh);

    // Contact Shadow Plane beneath Cup
    const shadowGeo = new THREE.PlaneGeometry(4, 4);
    const shadowTextureCanvas = document.createElement('canvas');
    shadowTextureCanvas.width = 256;
    shadowTextureCanvas.height = 256;
    const shadowCtx = shadowTextureCanvas.getContext('2d');
    if (shadowCtx) {
      const shadowGrad = shadowCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
      shadowGrad.addColorStop(0, 'rgba(0,0,0,0.65)');
      shadowGrad.addColorStop(0.5, 'rgba(0,0,0,0.25)');
      shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      shadowCtx.fillStyle = shadowGrad;
      shadowCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowTextureCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -cupHeight / 2 - 0.18;
    coffeeGroup.add(shadowMesh);

    // 5. Rising Steam Particles (Hot Coffee Steam Effect)
    const steamParticleCount = 45;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamParticleCount * 3);
    const steamOpacities = new Float32Array(steamParticleCount);
    const steamSpeeds = new Float32Array(steamParticleCount);

    for (let i = 0; i < steamParticleCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 0.8; // x
      steamPositions[i * 3 + 1] = cupHeight / 2 + Math.random() * 1.5; // y
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.8; // z
      steamOpacities[i] = Math.random() * 0.4;
      steamSpeeds[i] = 0.008 + Math.random() * 0.012;
    }

    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    // Create soft steam particle texture
    const steamCanvas = document.createElement('canvas');
    steamCanvas.width = 64;
    steamCanvas.height = 64;
    const sCtx = steamCanvas.getContext('2d');
    if (sCtx) {
      const sGrad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
      sGrad.addColorStop(0, 'rgba(255, 245, 235, 0.8)');
      sGrad.addColorStop(0.5, 'rgba(255, 240, 220, 0.3)');
      sGrad.addColorStop(1, 'rgba(255, 240, 220, 0)');
      sCtx.fillStyle = sGrad;
      sCtx.fillRect(0, 0, 64, 64);
    }
    const steamTexture = new THREE.CanvasTexture(steamCanvas);

    const steamMat = new THREE.PointsMaterial({
      size: 0.45,
      map: steamTexture,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const steamParticles = new THREE.Points(steamGeo, steamMat);
    coffeeGroup.add(steamParticles);

    // 6. Floating Roasted Coffee Beans in Ambient 3D Space
    const beansGroup = new THREE.Group();
    scene.add(beansGroup);

    const beanMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a2416,
      roughness: 0.3,
      metalness: 0.1,
    });

    // Procedural coffee bean mesh geometry (Scaled stretched sphere with indentation)
    const beanGeo = new THREE.SphereGeometry(0.12, 12, 12);
    beanGeo.scale(1.4, 0.9, 0.8);

    const beanCount = 14;
    const beanData: { mesh: THREE.Mesh; rotSpeed: THREE.Vector3; floatSpeed: number; initialY: number }[] = [];

    for (let i = 0; i < beanCount; i++) {
      const beanMesh = new THREE.Mesh(beanGeo, beanMaterial);
      const posX = (Math.random() - 0.5) * 8;
      const posY = (Math.random() - 0.5) * 4;
      const posZ = -1 - Math.random() * 3;
      beanMesh.position.set(posX, posY, posZ);
      beanMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      beansGroup.add(beanMesh);

      beanData.push({
        mesh: beanMesh,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        floatSpeed: 0.005 + Math.random() * 0.01,
        initialY: posY,
      });
    }

    // 7. Golden Sparkle Dust Particles
    const dustCount = 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 12;
      dustPos[i + 1] = (Math.random() - 0.5) * 8;
      dustPos[i + 2] = (Math.random() - 0.5) * 6;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));

    const dustMat = new THREE.PointsMaterial({
      color: 0xc58b44,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // Raycaster for cup click interaction
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      if (!onCupClick) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(coffeeGroup.children, true);
      if (intersects.length > 0) {
        onCupClick();
      }
    };

    renderer.domElement.addEventListener('click', handleClick);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth floating animation for the coffee cup group
      coffeeGroup.position.y = (isMobile ? -0.4 : 0.1) + Math.sin(elapsedTime * 1.5) * 0.08;
      coffeeGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.12;
      coffeeGroup.rotation.z = Math.cos(elapsedTime * 1.2) * 0.03;

      // Mouse Parallax movement
      const targetCamX = mousePos.x * 0.8;
      const targetCamY = mousePos.y * 0.5;

      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (-targetCamY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Animate Steam Particles rising
      const posAttr = steamGeo.attributes.position as THREE.BufferAttribute;
      const positionsArr = posAttr.array as Float32Array;

      for (let i = 0; i < steamParticleCount; i++) {
        positionsArr[i * 3 + 1] += steamSpeeds[i]; // Rise upward
        positionsArr[i * 3] += Math.sin(elapsedTime * 2 + i) * 0.002; // Soft wave

        // Reset particle when it rises too high
        if (positionsArr[i * 3 + 1] > cupHeight / 2 + 2.2) {
          positionsArr[i * 3 + 1] = cupHeight / 2 + 0.1;
          positionsArr[i * 3] = (Math.random() - 0.5) * 0.6;
          positionsArr[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
        }
      }
      posAttr.needsUpdate = true;

      // Animate Floating Beans
      beanData.forEach(({ mesh, rotSpeed, floatSpeed, initialY }) => {
        mesh.rotation.x += rotSpeed.x;
        mesh.rotation.y += rotSpeed.y;
        mesh.position.y = initialY + Math.sin(elapsedTime * 2 + initialY) * 0.15;
      });

      // Slowly rotate dust particles
      dustParticles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      const mobileCheck = width < 768;
      coffeeGroup.position.set(mobileCheck ? 0 : 1.8, mobileCheck ? -0.4 : 0.1, 0);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [theme, onCupClick]);

  return (
    <div
      ref={mountRef}
      id="hero-3d-canvas-container"
      className="absolute inset-0 w-full h-full pointer-events-auto z-10 cursor-pointer"
      title="Click 3D Coffee Cup to Customize Your Brew"
    />
  );
};

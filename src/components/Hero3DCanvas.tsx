import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0.05, 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Master Group & Character Floating Root
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const characterRoot = new THREE.Group();
    characterRoot.position.y = -0.06;
    masterGroup.add(characterRoot);

    // ==========================================
    // 2. TEXTURE LOADING & CHARACTER RIG
    // ==========================================
    const textureLoader = new THREE.TextureLoader();

    // 1) Steady Shoulders & Hoodie Base Texture
    const shoulderTexture = textureLoader.load('/character_shoulders.png');
    shoulderTexture.colorSpace = THREE.SRGBColorSpace;
    shoulderTexture.minFilter = THREE.LinearFilter;
    shoulderTexture.magFilter = THREE.LinearFilter;

    // 2) 3D Head & Expressive Face Texture
    // 2) 3D Head & Expressive Face Base Texture (Original eyes removed with seamless matching skin)
    const headTexture = textureLoader.load('/character_head_skin.png');
    headTexture.colorSpace = THREE.SRGBColorSpace;
    headTexture.minFilter = THREE.LinearFilter;
    headTexture.magFilter = THREE.LinearFilter;

    // 3) Duplicate Eyes: Open & Blinking Textures (Exact match in size, shape, radius, and appearance)
    const openLeftTexture = textureLoader.load('/eye_open_left.png');
    openLeftTexture.colorSpace = THREE.SRGBColorSpace;
    openLeftTexture.minFilter = THREE.LinearFilter;
    openLeftTexture.magFilter = THREE.LinearFilter;

    const openRightTexture = textureLoader.load('/eye_open_right.png');
    openRightTexture.colorSpace = THREE.SRGBColorSpace;
    openRightTexture.minFilter = THREE.LinearFilter;
    openRightTexture.magFilter = THREE.LinearFilter;

    const blinkLeftTexture = textureLoader.load('/eye_blink_left.png');
    blinkLeftTexture.colorSpace = THREE.SRGBColorSpace;
    blinkLeftTexture.minFilter = THREE.LinearFilter;
    blinkLeftTexture.magFilter = THREE.LinearFilter;

    const blinkRightTexture = textureLoader.load('/eye_blink_right.png');
    blinkRightTexture.colorSpace = THREE.SRGBColorSpace;
    blinkRightTexture.minFilter = THREE.LinearFilter;
    blinkRightTexture.magFilter = THREE.LinearFilter;

    // --- STEADY SHOULDERS MESH ---
    // Anchored at base: does NOT rotate with head
    const shoulderGeo = new THREE.PlaneGeometry(3.9, 3.9, 16, 16);
    const shoulderMat = new THREE.MeshStandardMaterial({
      map: shoulderTexture,
      transparent: true,
      alphaTest: 0.01,
      roughness: 0.5,
      metalness: 0.15,
      side: THREE.FrontSide,
    });
    const shoulderMesh = new THREE.Mesh(shoulderGeo, shoulderMat);
    shoulderMesh.position.set(0, 0, 0);
    characterRoot.add(shoulderMesh);

    // --- 3D SCULPTED VOLUMETRIC HEAD MESH ---
    // Pivots from the neck: rotates in pitch, yaw, and roll in true 3D
    const headPivotGroup = new THREE.Group();
    // Neck base pivot position
    headPivotGroup.position.set(0, -0.65, 0.08);
    characterRoot.add(headPivotGroup);

    // Function defining the exact 3D facial contour of the character
    const getHeadVZ = (vx: number, vy: number): number => {
      // Face curvature center around (0, 0.25)
      const dx = vx / 1.45;
      const dy = (vy - 0.25) / 1.45;
      const distSq = dx * dx + dy * dy;

      let vz = 0;
      if (distSq < 1.0) {
        // Volumetric curve: nose, mouth, eyes protrude forward
        vz = (1.0 - distSq) * 0.36;
      } else {
        // Ears, temples and back hair curve backward
        vz = -Math.min(0.25, (distSq - 1.0) * 0.18);
      }

      // Extra 3D facial feature definition around nose and cheeks
      const noseDist = Math.sqrt(vx * vx * 3.5 + (vy - 0.12) * (vy - 0.12) * 3.0);
      if (noseDist < 0.65) {
        vz += (0.65 - noseDist) * 0.24;
      }
      return vz;
    };

    // Subdivided 3D volumetric face geometry with sculpted depth
    const headGeo = new THREE.PlaneGeometry(3.9, 3.9, 64, 64);
    const pos = headGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      pos.setZ(i, getHeadVZ(vx, vy));
    }
    headGeo.computeVertexNormals();

    const headMat = new THREE.MeshStandardMaterial({
      map: headTexture,
      transparent: true,
      alphaTest: 0.01,
      roughness: 0.38,
      metalness: 0.1,
      side: THREE.FrontSide,
    });

    const headMesh = new THREE.Mesh(headGeo, headMat);
    // Counter-offset so the head sits naturally on top of the neck pivot
    headMesh.position.set(0, 0.65, 0);
    headPivotGroup.add(headMesh);

    // --- DUPLICATE EYE MESHES ---
    // Helper to generate eye geometries conforming precisely to the 3D head face contour
    const createEyeGeo = (centerX: number, centerYHead: number) => {
      const geo = new THREE.PlaneGeometry(0.686, 0.495, 20, 20);
      const eyePos = geo.attributes.position;
      const baseHeadZ = getHeadVZ(centerX, centerYHead);
      for (let i = 0; i < eyePos.count; i++) {
        const ex = eyePos.getX(i);
        const ey = eyePos.getY(i);
        const vx = centerX + ex;
        const vy = centerYHead + ey;
        const headSurfaceZ = getHeadVZ(vx, vy);

        // Spherical eyeball/cornea curvature at center
        const edistSq = (ex / 0.343) ** 2 + (ey / 0.248) ** 2;
        const bulge = Math.max(0, 1 - edistSq) * 0.018;

        eyePos.setZ(i, (headSurfaceZ - baseHeadZ) + bulge);
      }
      geo.computeVertexNormals();
      return { geo, baseHeadZ };
    };

    // Eye coordinates relative to head center (width 3.9 covers 1024px)
    // Left eye center: pixel (412, 545) -> X = -0.381, Y = 0.524 (local head Y = -0.126)
    // Right eye center: pixel (636, 545) -> X = +0.472, Y = 0.524 (local head Y = -0.126)
    const leftEye = createEyeGeo(-0.381, -0.126);
    const rightEye = createEyeGeo(0.472, -0.126);

    // 1) Duplicate Open Eyes (Seamlessly match size, shape, radius, and lighting)
    const leftOpenMat = new THREE.MeshStandardMaterial({
      map: openLeftTexture,
      transparent: true,
      opacity: 1.0,
      roughness: 0.38,
      metalness: 0.1,
      side: THREE.FrontSide,
    });
    const leftOpenMesh = new THREE.Mesh(leftEye.geo, leftOpenMat);
    leftOpenMesh.position.set(-0.381, 0.524, leftEye.baseHeadZ + 0.006);
    leftOpenMesh.renderOrder = 1;
    headPivotGroup.add(leftOpenMesh);

    const rightOpenMat = new THREE.MeshStandardMaterial({
      map: openRightTexture,
      transparent: true,
      opacity: 1.0,
      roughness: 0.38,
      metalness: 0.1,
      side: THREE.FrontSide,
    });
    const rightOpenMesh = new THREE.Mesh(rightEye.geo, rightOpenMat);
    rightOpenMesh.position.set(0.472, 0.524, rightEye.baseHeadZ + 0.006);
    rightOpenMesh.renderOrder = 1;
    headPivotGroup.add(rightOpenMesh);

    // 2) Duplicate Blinking Eyes (Smooth eyelid closure over matching skin)
    const leftBlinkMat = new THREE.MeshStandardMaterial({
      map: blinkLeftTexture,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      roughness: 0.38,
      metalness: 0.1,
      side: THREE.FrontSide,
    });
    const leftBlinkMesh = new THREE.Mesh(leftEye.geo.clone(), leftBlinkMat);
    leftBlinkMesh.position.set(-0.381, 0.524, leftEye.baseHeadZ + 0.008);
    leftBlinkMesh.visible = false;
    leftBlinkMesh.renderOrder = 2;
    headPivotGroup.add(leftBlinkMesh);

    const rightBlinkMat = new THREE.MeshStandardMaterial({
      map: blinkRightTexture,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      roughness: 0.38,
      metalness: 0.1,
      side: THREE.FrontSide,
    });
    const rightBlinkMesh = new THREE.Mesh(rightEye.geo.clone(), rightBlinkMat);
    rightBlinkMesh.position.set(0.472, 0.524, rightEye.baseHeadZ + 0.008);
    rightBlinkMesh.visible = false;
    rightBlinkMesh.renderOrder = 2;
    headPivotGroup.add(rightBlinkMesh);

    // ==========================================
    // 3. CYBERPUNK 3D LIGHTING & HOLOGRAPHIC ACCENTS
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x182030, 1.3);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 3.5, 12);
    cyanPointLight.position.set(-2.6, 1.4, 2.2);
    scene.add(cyanPointLight);

    const purplePointLight = new THREE.PointLight(0xa855f7, 3.2, 12);
    purplePointLight.position.set(2.6, 1.2, 2.0);
    scene.add(purplePointLight);

    const frontKeyLight = new THREE.DirectionalLight(0xffffff, 0.85);
    frontKeyLight.position.set(0, 1.8, 4.2);
    scene.add(frontKeyLight);

    // Holographic Cyber Rings Behind Character
    const ringGroup = new THREE.Group();
    ringGroup.position.set(0, 0.05, -0.35);
    characterRoot.add(ringGroup);

    const ringGeo1 = new THREE.RingGeometry(1.85, 1.88, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringGroup.add(ringMesh1);

    const ringGeo2 = new THREE.RingGeometry(1.95, 1.97, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringGroup.add(ringMesh2);

    // 3D Orbiting Floating Particles
    const particleCount = 65;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const rad = 1.4 + Math.random() * 1.5;
      particlePositions[i * 3] = Math.cos(theta) * rad;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 3.2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2.0 - 0.1;

      if (Math.random() > 0.5) {
        particleColors[i * 3] = 0.0;
        particleColors[i * 3 + 1] = 0.94;
        particleColors[i * 3 + 2] = 1.0;
      } else {
        particleColors[i * 3] = 0.66;
        particleColors[i * 3 + 1] = 0.33;
        particleColors[i * 3 + 2] = 0.97;
      }
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    characterRoot.add(particles);

    // ==========================================
    // 4. FULL-SCREEN MOUSE TRACKING
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let isHovering = false;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      // Track cursor position across the entire application screen relative to character
      const dx = (e.clientX - charCenterX) / (window.innerWidth * 0.5);
      const dy = -(e.clientY - charCenterY) / (window.innerHeight * 0.5);

      targetMouseX = THREE.MathUtils.clamp(dx, -1.0, 1.0);
      targetMouseY = THREE.MathUtils.clamp(dy, -1.0, 1.0);

      isHovering =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
    };

    const onPointerLeave = () => {
      isHovering = false;
      targetMouseX = 0;
      targetMouseY = 0;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    window.addEventListener('blur', onPointerLeave);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // 5. NATURAL BLINKING STATE DYNAMICS
    // ==========================================
    let isBlinking = false;
    let blinkStartTime = 0;
    const blinkDuration = 160; // ms: natural human eye blink duration
    let nextBlinkTime = performance.now() + 2500 + Math.random() * 2500;

    // ==========================================
    // 6. MAIN ANIMATION LOOP
    // ==========================================
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth cursor lerp
      mouseX += (targetMouseX - mouseX) * 0.085;
      mouseY += (targetMouseY - mouseY) * 0.085;

      // ==========================================
      // 7. TRUE 3D HEAD ROTATION (SHOULDERS REMAIN STEADY)
      // ==========================================
      // The head pivots from the neck base to track cursor smoothly
      const targetHeadYaw = THREE.MathUtils.clamp(mouseX * 0.42, -0.38, 0.38);
      const targetHeadPitch = THREE.MathUtils.clamp(-mouseY * 0.28, -0.22, 0.22);
      const targetHeadRoll = THREE.MathUtils.clamp(-mouseX * 0.10, -0.08, 0.08);

      headPivotGroup.rotation.y += (targetHeadYaw - headPivotGroup.rotation.y) * 0.085;
      headPivotGroup.rotation.x += (targetHeadPitch - headPivotGroup.rotation.x) * 0.085;
      headPivotGroup.rotation.z += (targetHeadRoll - headPivotGroup.rotation.z) * 0.085;

      // Notice: shoulderMesh is NOT rotated by mouse! Shoulders stay completely steady!

      // ==========================================
      // 8. NATURAL DUPLICATE EYE BLINKING ANIMATION
      // ==========================================
      const now = performance.now();
      if (!isBlinking && now >= nextBlinkTime) {
        isBlinking = true;
        blinkStartTime = now;
      }

      if (isBlinking) {
        const elapsed = now - blinkStartTime;
        if (elapsed >= blinkDuration) {
          isBlinking = false;
          // Restore open eyes
          leftOpenMat.opacity = 1.0;
          rightOpenMat.opacity = 1.0;
          leftOpenMesh.scale.y = 1.0;
          rightOpenMesh.scale.y = 1.0;

          // Hide closed eyelids
          leftBlinkMat.opacity = 0;
          rightBlinkMat.opacity = 0;
          leftBlinkMesh.visible = false;
          rightBlinkMesh.visible = false;

          // Next blink timing (18% chance of rapid natural double-blink)
          const isDoubleBlink = Math.random() < 0.18;
          nextBlinkTime = now + (isDoubleBlink ? 120 + Math.random() * 80 : 2800 + Math.random() * 2600);
        } else {
          const progress = elapsed / blinkDuration;
          const factor = Math.sin(progress * Math.PI); // 0 -> 1 -> 0
          
          // Eyelid closes smoothly over eye
          const blinkOpacity = Math.min(1.0, factor * 2.2);
          leftBlinkMat.opacity = blinkOpacity;
          rightBlinkMat.opacity = blinkOpacity;
          leftBlinkMesh.visible = true;
          rightBlinkMesh.visible = true;

          // Natural vertical eyelid sweep
          const blinkScaleY = 0.35 + factor * 0.65;
          leftBlinkMesh.scale.y = blinkScaleY;
          rightBlinkMesh.scale.y = blinkScaleY;

          // Open eye naturally compresses and softens during blink
          const openScaleY = Math.max(0.08, 1.0 - factor * 0.92);
          leftOpenMesh.scale.y = openScaleY;
          rightOpenMesh.scale.y = openScaleY;
          leftOpenMat.opacity = Math.max(0.0, 1.0 - factor * 1.5);
          rightOpenMat.opacity = Math.max(0.0, 1.0 - factor * 1.5);
        }
      } else {
        leftOpenMat.opacity = 1.0;
        rightOpenMat.opacity = 1.0;
        leftOpenMesh.scale.y = 1.0;
        rightOpenMesh.scale.y = 1.0;
        leftBlinkMesh.visible = false;
        rightBlinkMesh.visible = false;
      }

      // ==========================================
      // 9. IDLE FLOATING & SUBTLE BREATHING
      // ==========================================
      if (!prefersReducedMotion) {
        // Gentle anti-gravity float
        characterRoot.position.y = -0.06 + Math.sin(elapsedTime * 1.5) * 0.04;

        // Very subtle breathing scale on shoulders (anchored, no rotation)
        const breathe = 1.0 + Math.sin(elapsedTime * 2.0) * 0.008;
        shoulderMesh.scale.set(1.0, breathe, 1.0);

        // Rotate Holographic Rings
        ringMesh1.rotation.z = elapsedTime * 0.12;
        ringMesh2.rotation.z = -elapsedTime * 0.16;
        particles.rotation.y = elapsedTime * 0.06;

        // Dynamic 3D lighting responds to head angle
        cyanPointLight.intensity = (isHovering ? 3.8 : 3.2) + (mouseX < 0 ? Math.abs(mouseX) * 1.6 : 0);
        purplePointLight.intensity = (isHovering ? 3.5 : 2.9) + (mouseX > 0 ? mouseX * 1.6 : 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // ==========================================
    // 10. CLEANUP RESOURCES
    // ==========================================
    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('blur', onPointerLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });

      shoulderTexture.dispose();
      headTexture.dispose();
      openLeftTexture.dispose();
      openRightTexture.dispose();
      blinkLeftTexture.dispose();
      blinkRightTexture.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[380px] lg:min-h-[480px] flex items-center justify-center relative pointer-events-none select-none"
      aria-hidden="true"
    />
  );
};

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
    const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0.2, 5.0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Main Master Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Character Floating Root Group
    const characterRoot = new THREE.Group();
    characterRoot.position.y = -0.15;
    masterGroup.add(characterRoot);

    // ==========================================
    // CYBERPUNK MATERIALS PALETTE
    // ==========================================
    // Dark Metallic Armor Plating
    const darkArmorMat = new THREE.MeshStandardMaterial({
      color: 0x0c101c,
      roughness: 0.25,
      metalness: 0.88,
    });

    const midArmorMat = new THREE.MeshStandardMaterial({
      color: 0x1e2638,
      roughness: 0.35,
      metalness: 0.75,
    });

    // Visor Glass
    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x05070f,
      roughness: 0.1,
      metalness: 0.95,
      transmission: 0.3,
      transparent: true,
      opacity: 0.92,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    // Glowing Cyan Core & Accents
    const cyanNeonMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x00e5ff,
      emissiveIntensity: 2.2,
      roughness: 0.2,
      metalness: 0.5,
    });

    // Glowing Purple/Violet Accents
    const purpleNeonMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x9333ea,
      emissiveIntensity: 2.0,
      roughness: 0.2,
      metalness: 0.5,
    });

    // Eye Pupils Glow Material
    const eyePupilMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

    const eyeIrisMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      wireframe: false,
    });

    // ==========================================
    // 2. TORSO & UPPER BODY CHASSIS
    // ==========================================
    const torsoGroup = new THREE.Group();
    characterRoot.add(torsoGroup);

    // Main Chest Plate (Tapered Cylinder)
    const chestGeo = new THREE.CylinderGeometry(0.68, 0.44, 0.88, 8);
    const chestMesh = new THREE.Mesh(chestGeo, darkArmorMat);
    chestMesh.position.y = 0.05;
    torsoGroup.add(chestMesh);

    // Collar / Neck Guard Ring
    const collarGeo = new THREE.TorusGeometry(0.42, 0.06, 12, 32);
    const collarMesh = new THREE.Mesh(collarGeo, midArmorMat);
    collarMesh.rotation.x = Math.PI / 2;
    collarMesh.position.y = 0.52;
    torsoGroup.add(collarMesh);

    // Collar Accent Neon Light
    const collarNeonGeo = new THREE.TorusGeometry(0.44, 0.02, 8, 32);
    const collarNeonMesh = new THREE.Mesh(collarNeonGeo, purpleNeonMat);
    collarNeonMesh.rotation.x = Math.PI / 2;
    collarNeonMesh.position.y = 0.52;
    torsoGroup.add(collarNeonMesh);

    // Arc Reactor / Power Core (Chest Center)
    const reactorHousingGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.1, 16);
    const reactorHousing = new THREE.Mesh(reactorHousingGeo, midArmorMat);
    reactorHousing.rotation.x = Math.PI / 2;
    reactorHousing.position.set(0, 0.18, 0.52);
    torsoGroup.add(reactorHousing);

    const reactorCoreGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 16);
    const reactorCore = new THREE.Mesh(reactorCoreGeo, cyanNeonMat);
    reactorCore.rotation.x = Math.PI / 2;
    reactorCore.position.set(0, 0.18, 0.54);
    torsoGroup.add(reactorCore);

    // Chest Plate Cyber Trim Lines
    const trimLeftGeo = new THREE.BoxGeometry(0.04, 0.4, 0.04);
    const trimLeft = new THREE.Mesh(trimLeftGeo, cyanNeonMat);
    trimLeft.position.set(-0.25, 0.08, 0.48);
    trimLeft.rotation.z = -0.3;
    torsoGroup.add(trimLeft);

    const trimRightGeo = new THREE.BoxGeometry(0.04, 0.4, 0.04);
    const trimRight = new THREE.Mesh(trimRightGeo, cyanNeonMat);
    trimRight.position.set(0.25, 0.08, 0.48);
    trimRight.rotation.z = 0.3;
    torsoGroup.add(trimRight);

    // Shoulder Pauldrons (Left & Right)
    const shoulderGeo = new THREE.SphereGeometry(0.32, 16, 12);
    shoulderGeo.scale(1.2, 0.7, 0.9);

    const leftShoulder = new THREE.Mesh(shoulderGeo, darkArmorMat);
    leftShoulder.position.set(-0.82, 0.32, 0);
    leftShoulder.rotation.z = 0.35;
    torsoGroup.add(leftShoulder);

    const leftShoulderStripe = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.025, 8, 24), purpleNeonMat);
    leftShoulderStripe.position.set(-0.84, 0.33, 0);
    leftShoulderStripe.rotation.y = Math.PI / 2;
    torsoGroup.add(leftShoulderStripe);

    const rightShoulder = new THREE.Mesh(shoulderGeo, darkArmorMat);
    rightShoulder.position.set(0.82, 0.32, 0);
    rightShoulder.rotation.z = -0.35;
    torsoGroup.add(rightShoulder);

    const rightShoulderStripe = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.025, 8, 24), purpleNeonMat);
    rightShoulderStripe.position.set(0.84, 0.33, 0);
    rightShoulderStripe.rotation.y = Math.PI / 2;
    torsoGroup.add(rightShoulderStripe);

    // Anti-Gravity Thruster Base (Bottom of Torso)
    const thrusterBaseGeo = new THREE.CylinderGeometry(0.38, 0.22, 0.28, 16);
    const thrusterBase = new THREE.Mesh(thrusterBaseGeo, darkArmorMat);
    thrusterBase.position.y = -0.48;
    torsoGroup.add(thrusterBase);

    const thrusterRingGeo = new THREE.TorusGeometry(0.32, 0.035, 12, 32);
    const thrusterRing = new THREE.Mesh(thrusterRingGeo, cyanNeonMat);
    thrusterRing.rotation.x = Math.PI / 2;
    thrusterRing.position.y = -0.58;
    torsoGroup.add(thrusterRing);

    // Thruster Energy Glow Disc
    const thrusterGlowGeo = new THREE.CylinderGeometry(0.18, 0.02, 0.25, 16);
    const thrusterGlowMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
    });
    const thrusterGlow = new THREE.Mesh(thrusterGlowGeo, thrusterGlowMat);
    thrusterGlow.position.y = -0.72;
    torsoGroup.add(thrusterGlow);

    // ==========================================
    // 3. HEAD & EXPRESSIVE VISOR / EYES
    // ==========================================
    const neckJoint = new THREE.Group();
    neckJoint.position.set(0, 0.6, 0);
    characterRoot.add(neckJoint);

    const headGroup = new THREE.Group();
    neckJoint.add(headGroup);

    // Main Helmet Dome
    const helmetGeo = new THREE.SphereGeometry(0.64, 24, 20);
    helmetGeo.scale(0.96, 1.05, 1.02);
    const helmetMesh = new THREE.Mesh(helmetGeo, darkArmorMat);
    headGroup.add(helmetMesh);

    // Curved Dark Visor Faceplate
    const visorGeo = new THREE.SphereGeometry(0.58, 24, 18, 0, Math.PI);
    visorGeo.scale(0.94, 0.85, 0.98);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.02, 0.12);
    visorMesh.rotation.y = -Math.PI / 2;
    headGroup.add(visorMesh);

    // Visor Bezel / Brow Trim
    const browGeo = new THREE.BoxGeometry(0.85, 0.06, 0.25);
    const browMesh = new THREE.Mesh(browGeo, midArmorMat);
    browMesh.position.set(0, 0.36, 0.44);
    headGroup.add(browMesh);

    // Forehead Neural Crest / Cyber Sensor
    const crestGeo = new THREE.BoxGeometry(0.16, 0.34, 0.28);
    const crestMesh = new THREE.Mesh(crestGeo, cyanNeonMat);
    crestMesh.position.set(0, 0.52, 0.22);
    crestMesh.rotation.x = -0.35;
    headGroup.add(crestMesh);

    // Side Cyber Ears / Audio Sensors
    const earGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 16);
    const leftEar = new THREE.Mesh(earGeo, midArmorMat);
    leftEar.rotation.z = Math.PI / 2;
    leftEar.position.set(-0.64, 0.08, 0);
    headGroup.add(leftEar);

    const leftEarRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.025, 8, 20), purpleNeonMat);
    leftEarRing.rotation.y = Math.PI / 2;
    leftEarRing.position.set(-0.71, 0.08, 0);
    headGroup.add(leftEarRing);

    const rightEar = new THREE.Mesh(earGeo, midArmorMat);
    rightEar.rotation.z = Math.PI / 2;
    rightEar.position.set(0.64, 0.08, 0);
    headGroup.add(rightEar);

    const rightEarRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.025, 8, 20), purpleNeonMat);
    rightEarRing.rotation.y = Math.PI / 2;
    rightEarRing.position.set(0.71, 0.08, 0);
    headGroup.add(rightEarRing);

    // Dual Cyber Antennas
    const antennaGeo = new THREE.CylinderGeometry(0.02, 0.035, 0.45, 8);
    const leftAntenna = new THREE.Mesh(antennaGeo, midArmorMat);
    leftAntenna.position.set(-0.52, 0.58, -0.05);
    leftAntenna.rotation.z = 0.4;
    leftAntenna.rotation.x = -0.2;
    headGroup.add(leftAntenna);

    const leftTip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 10), purpleNeonMat);
    leftTip.position.set(-0.62, 0.78, -0.09);
    headGroup.add(leftTip);

    const rightAntenna = new THREE.Mesh(antennaGeo, midArmorMat);
    rightAntenna.position.set(0.52, 0.58, -0.05);
    rightAntenna.rotation.z = -0.4;
    rightAntenna.rotation.x = -0.2;
    headGroup.add(rightAntenna);

    const rightTip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 10), purpleNeonMat);
    rightTip.position.set(0.62, 0.78, -0.09);
    headGroup.add(rightTip);

    // ==========================================
    // 4. EXPRESSIVE EYES GROUP (TRACKS CURSOR)
    // ==========================================
    const eyesGroup = new THREE.Group();
    eyesGroup.position.set(0, 0.08, 0.54);
    headGroup.add(eyesGroup);

    // Left Eye Capsule (Digital Glowing Visor Pupil)
    const eyePupilGeo = new THREE.CapsuleGeometry
      ? new THREE.CapsuleGeometry(0.065, 0.12, 8, 16)
      : new THREE.CylinderGeometry(0.065, 0.065, 0.16, 16);

    const leftPupil = new THREE.Mesh(eyePupilGeo, eyePupilMat);
    leftPupil.rotation.z = Math.PI / 2;
    leftPupil.position.set(-0.21, 0, 0);
    eyesGroup.add(leftPupil);

    const leftIrisRing = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.015, 8, 20), eyeIrisMat);
    leftIrisRing.position.set(-0.21, 0, -0.01);
    eyesGroup.add(leftIrisRing);

    // Right Eye Capsule
    const rightPupil = new THREE.Mesh(eyePupilGeo, eyePupilMat);
    rightPupil.rotation.z = Math.PI / 2;
    rightPupil.position.set(0.21, 0, 0);
    eyesGroup.add(rightPupil);

    const rightIrisRing = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.015, 8, 20), eyeIrisMat);
    rightIrisRing.position.set(0.21, 0, -0.01);
    eyesGroup.add(rightIrisRing);

    // Expressive Brow Indicators (LED Slits)
    const leftBrowGeo = new THREE.BoxGeometry(0.18, 0.02, 0.02);
    const leftBrow = new THREE.Mesh(leftBrowGeo, cyanNeonMat);
    leftBrow.position.set(-0.21, 0.16, 0);
    leftBrow.rotation.z = 0.1;
    eyesGroup.add(leftBrow);

    const rightBrowGeo = new THREE.BoxGeometry(0.18, 0.02, 0.02);
    const rightBrow = new THREE.Mesh(rightBrowGeo, cyanNeonMat);
    rightBrow.position.set(0.21, 0.16, 0);
    rightBrow.rotation.z = -0.1;
    eyesGroup.add(rightBrow);

    // ==========================================
    // 5. FLOATING ORBITAL ENERGY RINGS & PARTICLES
    // ==========================================
    const haloGroup = new THREE.Group();
    masterGroup.add(haloGroup);

    // Outer Segmented Planetary Ring
    const halo1Geo = new THREE.TorusGeometry(1.7, 0.014, 12, 80);
    const halo1Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const halo1 = new THREE.Mesh(halo1Geo, halo1Mat);
    halo1.rotation.x = Math.PI / 3;
    haloGroup.add(halo1);

    const halo2Geo = new THREE.TorusGeometry(1.95, 0.012, 12, 80);
    const halo2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.25,
    });
    const halo2 = new THREE.Mesh(halo2Geo, halo2Mat);
    halo2.rotation.x = -Math.PI / 4;
    halo2.rotation.y = Math.PI / 5;
    haloGroup.add(halo2);

    // Ambient Cyber Particles
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colCyan = new THREE.Color(0x38bdf8);
    const colPurple = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 1.6 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) + 0.1;
      positions[i3 + 2] = radius * Math.cos(phi);

      const mixed = colCyan.clone().lerp(colPurple, Math.random());
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    haloGroup.add(particles);

    // ==========================================
    // 6. SCENE LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const mainCyanLight = new THREE.PointLight(0x38bdf8, 5.0, 12);
    mainCyanLight.position.set(2.5, 3.0, 3.5);
    scene.add(mainCyanLight);

    const fillPurpleLight = new THREE.PointLight(0xa855f7, 5.5, 12);
    fillPurpleLight.position.set(-2.8, -1.5, 2.5);
    scene.add(fillPurpleLight);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 2.0);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);

    // ==========================================
    // 7. INTERACTIVE CURSOR TRACKING STATE
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let isMouseActive = false;
    let mouseTimeoutId: number;

    const onPointerMove = (event: MouseEvent) => {
      isMouseActive = true;
      window.clearTimeout(mouseTimeoutId);

      // Calculate normalized coordinates relative to hero center
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        const heroCenterX = rect.left + rect.width / 2;
        const heroCenterY = rect.top + rect.height / 2;

        targetMouseX = Math.max(-1, Math.min(1, (event.clientX - heroCenterX) / (rect.width * 0.45)));
        targetMouseY = Math.max(-1, Math.min(1, (event.clientY - heroCenterY) / (rect.height * 0.45)));
      } else {
        targetMouseX = Math.max(-1, Math.min(1, (event.clientX - window.innerWidth / 2) / (window.innerWidth * 0.5)));
        targetMouseY = Math.max(-1, Math.min(1, (event.clientY - window.innerHeight / 2) / (window.innerHeight * 0.5)));
      }

      // Smooth decay back to idle when mouse stops for 3.5 seconds
      mouseTimeoutId = window.setTimeout(() => {
        isMouseActive = false;
      }, 3500);
    };

    const onPointerLeave = () => {
      isMouseActive = false;
      targetMouseX = 0;
      targetMouseY = 0;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseleave', onPointerLeave, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // ==========================================
    // 8. ANIMATION LOOP WITH NATURAL DAMPING
    // ==========================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    // Eye blink state
    let lastBlinkTime = 0;
    let isBlinking = false;
    let eyeScaleY = 1.0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smoothly interpolate current mouse tracking towards target
      if (isMouseActive) {
        mouseX += (targetMouseX - mouseX) * 0.08;
        mouseY += (targetMouseY - mouseY) * 0.08;
      } else {
        // Natural idle look-around cycle when idle or on mobile
        const idleScanX = Math.sin(elapsedTime * 0.75) * 0.22 + Math.cos(elapsedTime * 0.3) * 0.1;
        const idleScanY = Math.sin(elapsedTime * 0.6) * 0.12;
        mouseX += (idleScanX - mouseX) * 0.03;
        mouseY += (idleScanY - mouseY) * 0.03;
      }

      // Natural Eye Blink Cycle (Every ~4 seconds)
      if (elapsedTime - lastBlinkTime > 3.8 + Math.sin(elapsedTime) * 1.2) {
        isBlinking = true;
        lastBlinkTime = elapsedTime;
      }

      if (isBlinking) {
        eyeScaleY -= 0.25;
        if (eyeScaleY <= 0.08) {
          isBlinking = false;
        }
      } else if (eyeScaleY < 1.0) {
        eyeScaleY += 0.22;
        if (eyeScaleY > 1.0) eyeScaleY = 1.0;
      }

      eyesGroup.scale.y = eyeScaleY;

      // 1. Visor Pupils Follow Cursor (Micro-tracking with limits)
      const pupilX = THREE.MathUtils.clamp(mouseX * 0.09, -0.075, 0.075);
      const pupilY = THREE.MathUtils.clamp(-mouseY * 0.065, -0.05, 0.05);
      eyesGroup.position.x += (pupilX - eyesGroup.position.x) * 0.15;
      eyesGroup.position.y += (0.08 + pupilY - eyesGroup.position.y) * 0.15;

      // Dynamic Brow Expressions
      leftBrow.rotation.z = 0.08 + mouseX * 0.08;
      rightBrow.rotation.z = -0.08 + mouseX * 0.08;

      // 2. Head Tracking with Realistic Clamping
      const targetHeadYaw = THREE.MathUtils.clamp(mouseX * 0.42, -0.38, 0.38);
      const targetHeadPitch = THREE.MathUtils.clamp(-mouseY * 0.30, -0.25, 0.25);
      const targetHeadRoll = THREE.MathUtils.clamp(-mouseX * 0.12, -0.1, 0.1);

      headGroup.rotation.y += (targetHeadYaw - headGroup.rotation.y) * 0.07;
      headGroup.rotation.x += (targetHeadPitch - headGroup.rotation.x) * 0.07;
      headGroup.rotation.z += (targetHeadRoll - headGroup.rotation.z) * 0.07;

      // 3. Torso & Upper Body Coordinated Movement (Gentle Drag)
      const targetTorsoYaw = targetHeadYaw * 0.35;
      const targetTorsoPitch = targetHeadPitch * 0.22;
      const targetTorsoRoll = targetHeadRoll * 0.4;

      torsoGroup.rotation.y += (targetTorsoYaw - torsoGroup.rotation.y) * 0.045;
      torsoGroup.rotation.x += (targetTorsoPitch - torsoGroup.rotation.x) * 0.045;
      torsoGroup.rotation.z += (targetTorsoRoll - torsoGroup.rotation.z) * 0.045;

      // 4. Idle Floating & Breathing Motion
      if (!prefersReducedMotion) {
        // Anti-gravity levitation float
        characterRoot.position.y = -0.15 + Math.sin(elapsedTime * 1.8) * 0.09;
        characterRoot.position.x = Math.sin(elapsedTime * 0.9) * 0.025;

        // Subtle Chest Breathing
        const breatheScale = 1.0 + Math.sin(elapsedTime * 2.2) * 0.015;
        chestMesh.scale.set(breatheScale, 1.0, breatheScale);

        // Reactor Core & Thruster Energy Pulsing
        const pulse = 1.8 + Math.sin(elapsedTime * 3.5) * 0.6;
        reactorCore.material.emissiveIntensity = pulse;
        thrusterGlow.scale.set(1 + Math.sin(elapsedTime * 6.0) * 0.08, 1 + Math.sin(elapsedTime * 8.0) * 0.15, 1);

        // Orbital Halo Rings Rotation
        halo1.rotation.z = elapsedTime * 0.14;
        halo2.rotation.z = -elapsedTime * 0.18;
        particles.rotation.y = elapsedTime * 0.05;
      }

      // Master subtle parallax
      masterGroup.rotation.y += (mouseX * 0.1 - masterGroup.rotation.y) * 0.04;
      masterGroup.rotation.x += (-mouseY * 0.08 - masterGroup.rotation.x) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // ==========================================
    // 9. CLEANUP RESOURCES
    // ==========================================
    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(mouseTimeoutId);
      cancelAnimationFrame(animationFrameId);

      // Traverse and dispose geometries & materials
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

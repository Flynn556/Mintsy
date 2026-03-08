import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface InteractiveCoinProps {
  size?: 'small' | 'medium' | 'large';
  interactive?: boolean;
}

export const InteractiveCoin: React.FC<InteractiveCoinProps> = ({ 
  size = 'medium', 
  interactive = true 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coinRef = useRef<THREE.Mesh>(null);
  const rippleRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [burst, setBurst] = useState(false);
  const { viewport, mouse } = useThree();

  // Load texture from public folder
  const texture = useTexture('/coin.jpg', (tex) => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 16;
  });

  // Scale mapping
  const scaleMap = {
    small: 0.5,
    medium: 1.5,
    large: 3.0
  };
  const baseScale = scaleMap[size];

  // Materials
  const sideMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#FFC247",
    metalness: 1,
    roughness: 0.1,
    emissive: "#8B5A00",
    emissiveIntensity: 0.2
  }), []);

  const faceMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: texture,
    metalness: 0.9,
    roughness: 0.1,
    emissive: "#FFB800",
    emissiveIntensity: hovered ? 0.8 : 0.2
  }), [texture, hovered]);

  const sweepRef = useRef<THREE.PointLight>(null);
  const springScale = useRef(baseScale);

  useFrame((state, delta) => {
    if (!groupRef.current || !coinRef.current) return;

    const t = state.clock.getElapsedTime();

    // Idle Animation: slow rotation
    const rotationSpeed = hovered ? 0.04 : 0.01;
    coinRef.current.rotation.y += rotationSpeed;

    // Floating motion
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.1;

    // Light sweep on hover
    if (sweepRef.current && hovered) {
      sweepRef.current.position.x = Math.sin(t * 5) * 2;
    }

    // Mouse Tilt Interaction
    if (interactive) {
      const targetRotationX = (mouse.y * viewport.height) / 30;
      const targetRotationY = (mouse.x * viewport.width) / 30;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetRotationX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
    }

    // Scale animation (spring-like)
    const targetScale = clicked ? baseScale * 1.3 : hovered ? baseScale * 1.1 : baseScale;
    springScale.current = THREE.MathUtils.lerp(springScale.current, targetScale, 0.1);
    groupRef.current.scale.setScalar(springScale.current);

    // Ripple animation
    if (rippleRef.current && clicked) {
      rippleRef.current.scale.addScalar(0.05);
      const mat = rippleRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity -= 0.02;
      if (mat.opacity <= 0) {
        setClicked(false);
        rippleRef.current.scale.set(1, 1, 1);
        mat.opacity = 1;
      }
    }
  });

  const handleClick = () => {
    if (!interactive) return;
    setClicked(true);
    setBurst(true);
    setTimeout(() => setBurst(false), 1000);
  };

  return (
    <group ref={groupRef}>
      {hovered && <pointLight ref={sweepRef} intensity={2} color="#FFFFFF" position={[0, 0, 1]} />}
      <mesh
        ref={coinRef}
        rotation={[Math.PI / 2, 0, 0]}
        onPointerOver={() => interactive && setHovered(true)}
        onPointerOut={() => interactive && setHovered(false)}
        onClick={handleClick}
      >
        <cylinderGeometry args={[1, 1, 0.2, 64]} />
        <primitive object={sideMaterial} attach="material-0" />
        <primitive object={faceMaterial} attach="material-1" />
        <primitive object={faceMaterial} attach="material-2" />
      </mesh>

      {/* Ripple Effect */}
      {clicked && (
        <mesh ref={rippleRef}>
          <ringGeometry args={[1, 1.1, 64]} />
          <meshStandardMaterial 
            color="#FFC247" 
            transparent 
            opacity={1} 
            emissive="#FFB800" 
            emissiveIntensity={2} 
          />
        </mesh>
      )}

      {/* Local Particles */}
      <CoinParticles count={20} burst={burst} />
    </group>
  );
};

const CoinParticles = ({ count = 20, burst = false }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4
        ),
        speed: Math.random() * 0.01 + 0.005,
        offset: Math.random() * Math.PI * 2,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2
        )
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.children.forEach((child, i) => {
      const p = particles[i];
      if (burst) {
        child.position.add(p.velocity);
      } else {
        child.position.y += Math.sin(t + p.offset) * 0.002;
        child.position.x += Math.cos(t + p.offset) * 0.002;
        // Slowly return to original position if not bursting
        child.position.lerp(p.position, 0.05);
      }
    });
  });

  return (
    <group ref={meshRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#FFC247" : "#FFB800"} 
            emissive={i % 2 === 0 ? "#FFC247" : "#FFB800"}
            emissiveIntensity={1}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

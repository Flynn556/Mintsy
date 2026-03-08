import React, { useRef, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { InteractiveCoin } from './InteractiveCoin';

export const MintsyCoin = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const t = scrollProgress;
    
    // Scene 1: Center (0 to 0.2)
    // Scene 2: Right (0.2 to 0.4)
    // Scene 3: Left (0.4 to 0.6)
    // Scene 4: Center/Scale (0.6 to 0.8)
    // Scene 5: Orbiting (0.8 to 1.0)
    
    if (t < 0.2) {
      // Hero
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.1);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.1));
    } else if (t < 0.4) {
      // Trenches
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 2, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0.5, 0.1);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 0.8, 0.1));
    } else if (t < 0.6) {
      // How it works
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, -2, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -0.5, 0.1);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 0.6, 0.1));
    } else {
      // Ecosystem
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.1);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1.5, 0.1));
    }
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <InteractiveCoin size="large" interactive={false} />
      </Suspense>
    </group>
  );
};

export const Particles = ({ count = 1000 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, [count]);

  const meshRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.0005;
    meshRef.current.rotation.x += 0.0002;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#FFC247"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, MeshDistortMaterial } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

const HolographicAvatar = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Use basic sphere for the avatar
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // Add subtle floating motion
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });
  
  const springs = useSpring({
    scale: [1, 1, 1],
    position: [0, 0, 0],
    from: { scale: [0, 0, 0], position: [0, -3, 0] },
    config: { mass: 2, tension: 280, friction: 80 },
    delay: 800,
  });
  
  // Create a particle effect around the avatar
  const ParticleRing = () => {
    const particleCount = 100;
    const particleRef = useRef<THREE.Points>(null);
    
    // Generate particles in a ring shape
    const particlesPosition = useMemo(() => {
      const positions = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 1.5 + Math.random() * 0.5;
        
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = Math.sin(angle) * radius * 0.5;
        positions[i * 3 + 2] = Math.sin(angle) * radius;
      }
      
      return positions;
    }, [particleCount]);
    
    useFrame((state) => {
      if (particleRef.current) {
        particleRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        particleRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
      }
    });
    
    return (
      <points ref={particleRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#00FFFF"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    );
  };
  
  return (
    <animated.group {...springs}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial
          color="#9D00FF"
          distort={0.4}
          speed={2}
          transparent
          opacity={0.9}
          metalness={1}
          roughness={0.3}
        />
      </mesh>
      
      <ParticleRing />
    </animated.group>
  );
};

export default HolographicAvatar;
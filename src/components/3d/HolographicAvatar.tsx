import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

const HolographicAvatar = () => {
  const meshRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/assests/mozgai.glb');
  
  // Load textures
  const textures = useTexture({
    map: '/assests/textures/Emblemat_Świadomośc_kolor2_1.png',
    normalMap: '/assests/textures/Emblemat_Świadomośc_normalmap_2.png'
  });

  // Apply textures to materials
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach(material => {
        if (material instanceof THREE.Material) {
          material.map = textures.map;
          material.normalMap = textures.normalMap;
          material.needsUpdate = true;
          
          // Enhance material properties
          material.metalness = 0.8;
          material.roughness = 0.2;
          material.envMapIntensity = 1.5;
        }
      });
    }
  }, [materials, textures]);
  
  // Animate model
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
  
  return (
    <animated.group ref={meshRef} {...springs}>
      <primitive 
        object={nodes.Scene} 
        scale={[1.5, 1.5, 1.5]}  // Increased scale
        position={[0, -1, 0]}
      />
      
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.5} />
      
      {/* Main key light */}
      <pointLight
        position={[2, 2, 2]}
        color="#00FFFF"
        intensity={2}
        distance={10}
      />
      
      {/* Fill light */}
      <pointLight
        position={[-2, -1, -2]}
        color="#9D00FF"
        intensity={1.5}
        distance={8}
      />
      
      {/* Rim light for edge definition */}
      <pointLight
        position={[0, 0, -3]}
        color="#FFFFFF"
        intensity={1}
        distance={5}
      />
    </animated.group>
  );
};

// Preload assets
useGLTF.preload('/assests/mozgai.glb');

export default HolographicAvatar;
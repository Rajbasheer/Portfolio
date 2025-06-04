import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

const HolographicAvatar = () => {
  const meshRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/assests/mozgai.glb');
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { camera } = useThree();
  
  // Load textures
  const textures = useTexture({
    map: '/assests/textures/Emblemat_Świadomośc_kolor2_1.png',
    normalMap: '/assests/textures/Emblemat_Świadomośc_normalmap_2.png'
  });

  // Configure textures
  useEffect(() => {
    textures.map.wrapS = textures.map.wrapT = THREE.RepeatWrapping;
    textures.map.repeat.set(1, 1);
    textures.normalMap.wrapS = textures.normalMap.wrapT = THREE.RepeatWrapping;
    textures.normalMap.repeat.set(1, 1);
  }, [textures]);

  // Apply textures to materials
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach(material => {
        if (material instanceof THREE.Material) {
          material.map = textures.map;
          material.normalMap = textures.normalMap;
          material.needsUpdate = true;
          
          // Enhanced material properties
          material.metalness = 0.8;
          material.roughness = 0.2;
          material.envMapIntensity = 1.5;
          material.transparent = true;
          material.opacity = 0.9;
        }
      });
    }
  }, [materials, textures]);

  // Interactive animations
  const springs = useSpring({
    scale: clicked ? [1.8, 1.8, 1.8] : hovered ? [1.6, 1.6, 1.6] : [1.5, 1.5, 1.5],
    rotation: clicked ? [0, Math.PI * 2, 0] : [0, 0, 0],
    config: { mass: 2, tension: 280, friction: 60 },
  });
  
  // Animate model
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation
      const targetRotationY = hovered ? state.clock.getElapsedTime() * 0.5 : state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.1;
      
      // Interactive floating motion
      const floatIntensity = hovered ? 0.4 : 0.2;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * floatIntensity;
      
      // Camera interaction
      if (clicked) {
        camera.position.lerp(new THREE.Vector3(0, 0, 4), 0.1);
      } else {
        camera.position.lerp(new THREE.Vector3(0, 0, 5), 0.1);
      }
    }
  });

  return (
    <animated.group 
      ref={meshRef}
      {...springs}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      <primitive 
        object={nodes.Scene}
        position={[0, -1, 0]}
      />
      
      {/* Dynamic lighting based on interaction */}
      <ambientLight intensity={hovered ? 0.7 : 0.5} />
      
      {/* Main key light */}
      <pointLight
        position={[2, 2, 2]}
        color={hovered ? "#00FFFF" : "#9D00FF"}
        intensity={hovered ? 2.5 : 2}
        distance={10}
      />
      
      {/* Fill light */}
      <pointLight
        position={[-2, -1, -2]}
        color={hovered ? "#9D00FF" : "#00FFFF"}
        intensity={hovered ? 2 : 1.5}
        distance={8}
      />
      
      {/* Rim light */}
      <pointLight
        position={[0, 0, -3]}
        color="#FFFFFF"
        intensity={hovered ? 1.5 : 1}
        distance={5}
      />
      
      {/* Interactive glow effect */}
      {hovered && (
        <pointLight
          position={[0, 0, 2]}
          color="#00FFFF"
          intensity={2}
          distance={3}
        />
      )}
    </animated.group>
  );
};

// Preload assets
useGLTF.preload('/assests/mozgai.glb');

export default HolographicAvatar;
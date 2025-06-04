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

  // Apply enhanced glowing materials
  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach(material => {
        if (material instanceof THREE.Material) {
          material.map = textures.map;
          material.normalMap = textures.normalMap;
          material.needsUpdate = true;
          
          // Enhanced glowing material properties
          material.metalness = 0.9;
          material.roughness = 0.1;
          material.envMapIntensity = 2;
          material.transparent = true;
          material.opacity = 0.95;
          
          // Add emissive glow
          material.emissive = new THREE.Color(hovered ? '#00FFFF' : '#9D00FF');
          material.emissiveIntensity = hovered ? 0.8 : 0.5;
          
          // Add custom shader chunks for enhanced glow
          if (material instanceof THREE.MeshStandardMaterial) {
            material.onBeforeCompile = (shader) => {
              shader.uniforms.time = { value: 0 };
              
              // Add uniform declaration at global scope
              shader.fragmentShader = 'uniform float time;\n' + shader.fragmentShader;
              
              // Replace emissivemap fragment
              shader.fragmentShader = shader.fragmentShader.replace(
                '#include <emissivemap_fragment>',
                `
                #include <emissivemap_fragment>
                float pulse = sin(vUv.x * 10.0 + time) * 0.5 + 0.5;
                totalEmissiveRadiance += emissive * pulse;
                `
              );
              
              // Store shader reference for updating time uniform
              (material as any)._shader = shader;
            };
          }
        }
      });
    }
  }, [materials, textures, hovered]);

  // Interactive animations
  const springs = useSpring({
    scale: clicked ? [1.8, 1.8, 1.8] : hovered ? [1.6, 1.6, 1.6] : [1.5, 1.5, 1.5],
    rotation: clicked ? [0, Math.PI * 2, 0] : [0, 0, 0],
    config: { mass: 2, tension: 280, friction: 60 },
  });
  
  // Enhanced animation with glow effects
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation
      const targetRotationY = hovered ? state.clock.getElapsedTime() * 0.5 : state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.1;
      
      // Dynamic floating motion
      const floatIntensity = hovered ? 0.4 : 0.2;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * floatIntensity;
      
      // Update shader time uniform
      if (materials) {
        Object.values(materials).forEach(material => {
          if (material instanceof THREE.Material && (material as any)._shader) {
            (material as any)._shader.uniforms.time.value = state.clock.getElapsedTime();
          }
          
          // Pulsating glow effect
          if (material instanceof THREE.Material) {
            const pulseIntensity = Math.sin(state.clock.getElapsedTime() * 2) * 0.2 + 0.8;
            material.emissiveIntensity = hovered ? pulseIntensity : 0.5;
          }
        });
      }
      
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
      
      {/* Enhanced dynamic lighting system */}
      <ambientLight intensity={hovered ? 0.8 : 0.6} />
      
      {/* Primary glow light */}
      <pointLight
        position={[2, 2, 2]}
        color={hovered ? "#00FFFF" : "#9D00FF"}
        intensity={hovered ? 3 : 2}
        distance={12}
        decay={2}
      />
      
      {/* Secondary glow light */}
      <pointLight
        position={[-2, -1, -2]}
        color={hovered ? "#9D00FF" : "#00FFFF"}
        intensity={hovered ? 2.5 : 1.8}
        distance={10}
        decay={2}
      />
      
      {/* Accent rim light */}
      <pointLight
        position={[0, 0, -3]}
        color="#FFFFFF"
        intensity={hovered ? 2 : 1.5}
        distance={8}
        decay={2}
      />
      
      {/* Interactive volumetric glow */}
      {hovered && (
        <>
          <pointLight
            position={[0, 0, 2]}
            color="#00FFFF"
            intensity={3}
            distance={5}
            decay={2}
          />
          <pointLight
            position={[0, 2, 0]}
            color="#9D00FF"
            intensity={2.5}
            distance={4}
            decay={2}
          />
        </>
      )}
    </animated.group>
  );
};

// Preload assets
useGLTF.preload('/assests/mozgai.glb');

export default HolographicAvatar;
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
  const { camera, pointer } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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

  // Interactive animations with mouse tracking
  const springs = useSpring({
    scale: clicked ? [2.3, 2.3, 2.3] : hovered ? [2.1, 2.1, 2.1] : [2.0, 2.0, 2.0],
    rotation: [
      hovered ? pointer.y * 0.5 : 0,
      hovered ? pointer.x * 0.5 : 0,
      0
    ],
    config: { 
      mass: 2, 
      tension: 280, 
      friction: hovered ? 30 : 60 // Lower friction when hovered for smoother movement
    }
  });
  
  // Enhanced animation with mouse interaction
  useFrame((state) => {
    if (meshRef.current) {
      // Get normalized mouse position
      const mouseX = (pointer.x * state.viewport.width) / 2;
      const mouseY = (pointer.y * state.viewport.height) / 2;
      
      // Smooth mouse following
      if (hovered) {
        meshRef.current.position.x += (mouseX / 4 - meshRef.current.position.x) * 0.1;
        meshRef.current.position.y += (mouseY / 4 - meshRef.current.position.y) * 0.1;
      } else {
        // Return to center when not hovered
        meshRef.current.position.x += (0 - meshRef.current.position.x) * 0.1;
        meshRef.current.position.y += (0 - meshRef.current.position.y) * 0.1;
      }
      
      // Dynamic floating motion
      const floatIntensity = hovered ? 0.2 : 0.1;
      const baseY = hovered ? mouseY / 4 : 0;
      meshRef.current.position.y = baseY + Math.sin(state.clock.getElapsedTime() * 0.5) * floatIntensity;
      
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
        camera.position.lerp(new THREE.Vector3(mouseX / 2, mouseY / 2, 4), 0.1);
      } else {
        camera.position.lerp(new THREE.Vector3(0, 0, 5), 0.1);
      }
    }
  });

  return (
    <animated.group 
      ref={meshRef}
      {...springs}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'grab';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'grabbing';
        setClicked(true);
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'grab';
        setClicked(false);
      }}
      position={[0, 0, 0]}
    >
      <primitive 
        object={nodes.Scene}
        position={[0, 0, 0]}
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
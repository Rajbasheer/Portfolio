import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

const HolographicAvatar = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { camera, pointer } = useThree();
  const [rotationSpeed, setRotationSpeed] = useState({ x: 0, y: 0 });
  
  // Interactive animations with mouse tracking
  const springs = useSpring({
    scale: clicked ? [2.3, 2.3, 2.3] : hovered ? [2.1, 2.1, 2.1] : [2.0, 2.0, 2.0],
    rotation: [
      hovered ? pointer.y * Math.PI : 0,
      hovered ? pointer.x * Math.PI : 0,
      0
    ],
    config: { 
      mass: 2, 
      tension: 280, 
      friction: hovered ? 20 : 40 // Lower friction for smoother rotation
    }
  });
  
  // Enhanced animation with mouse interaction
  useFrame((state) => {
    if (meshRef.current) {
      // Get normalized mouse position
      const mouseX = (pointer.x * state.viewport.width) / 2;
      const mouseY = (pointer.y * state.viewport.height) / 2;
      
      if (hovered) {
        // Smooth rotation based on mouse movement
        rotationSpeed.x = (mouseY - (meshRef.current.rotation.x * 180 / Math.PI)) * 0.1;
        rotationSpeed.y = (mouseX - (meshRef.current.rotation.y * 180 / Math.PI)) * 0.1;
        
        meshRef.current.rotation.x += rotationSpeed.x * 0.01;
        meshRef.current.rotation.y += rotationSpeed.y * 0.01;
        
        // Add slight floating motion
        meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      } else {
        // Smooth return to initial position
        meshRef.current.rotation.x *= 0.95;
        meshRef.current.rotation.y *= 0.95;
        meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
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
          emissive={hovered ? "#00FFFF" : "#9D00FF"}
          emissiveIntensity={hovered ? 0.8 : 0.5}
        />
      </mesh>
      
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

export default HolographicAvatar;
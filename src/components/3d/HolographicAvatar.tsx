import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

const HolographicAvatar = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { pointer } = useThree();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [lastPointer, setLastPointer] = useState({ x: 0, y: 0 });
  
  // Interactive animations
  const springs = useSpring({
    scale: hovered ? [2.1, 2.1, 2.1] : [2.0, 2.0, 2.0],
    config: { 
      mass: 2, 
      tension: 280, 
      friction: hovered ? 30 : 60
    }
  });

  // Handle rotation based on drag
  useFrame((state) => {
    if (meshRef.current) {
      if (isDragging) {
        // Calculate rotation based on pointer movement
        const deltaX = pointer.x - lastPointer.x;
        const deltaY = pointer.y - lastPointer.y;
        
        setRotation({
          x: rotation.x + deltaY * 2,
          y: rotation.y + deltaX * 2
        });
        
        setLastPointer({ x: pointer.x, y: pointer.y });
      }

      // Apply rotation with smooth interpolation
      meshRef.current.rotation.x += (rotation.x - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y += (rotation.y - meshRef.current.rotation.y) * 0.1;
      
      // Add floating animation
      const floatY = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      meshRef.current.position.y = floatY;
    }
  });

  return (
    <animated.group {...springs}>
      <mesh
        ref={meshRef}
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
          setIsDragging(true);
          document.body.style.cursor = 'grabbing';
          setLastPointer({ x: pointer.x, y: pointer.y });
        }}
        onPointerUp={(e) => {
          e.stopPropagation();
          setIsDragging(false);
          document.body.style.cursor = hovered ? 'grab' : 'auto';
        }}
      >
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

      {/* Dynamic lighting system */}
      <pointLight
        position={[2, 2, 2]}
        color={hovered ? "#00FFFF" : "#9D00FF"}
        intensity={hovered ? 3 : 2}
        distance={12}
        decay={2}
      />
      
      <pointLight
        position={[-2, -1, -2]}
        color={hovered ? "#9D00FF" : "#00FFFF"}
        intensity={hovered ? 2.5 : 1.8}
        distance={10}
        decay={2}
      />
      
      {/* Interactive glow */}
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
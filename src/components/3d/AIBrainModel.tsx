import { useRef, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

// Performance-optimized AI Brain Model
const AIBrainModel = () => {
  const meshRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // Optimized animation with useFrame
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation with delta time for consistent performance
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.1;
    }
    
    if (nodesRef.current) {
      nodesRef.current.rotation.y = -state.clock.getElapsedTime() * 0.15;
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  // Memoized neural network structure for performance
  const { nodePositions, nodeColors, connectionGeometry } = useMemo(() => {
    const positions = new Float32Array(60); // 20 nodes * 3 coordinates
    const colors = new Float32Array(60);
    const connections = [];
    
    // Generate optimized neural network structure
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const radius = 1.8 + Math.sin(i * 0.3) * 0.4;
      const height = (Math.sin(i * 0.4) - 0.5) * 1.5;
      
      const idx = i * 3;
      positions[idx] = Math.cos(angle) * radius;
      positions[idx + 1] = height;
      positions[idx + 2] = Math.sin(angle) * radius;
      
      // Alternating colors for visual variety
      const colorIntensity = 0.8 + Math.sin(i * 0.5) * 0.2;
      if (i % 3 === 0) {
        colors[idx] = 0;
        colors[idx + 1] = colorIntensity;
        colors[idx + 2] = colorIntensity;
      } else {
        colors[idx] = 0.6 * colorIntensity;
        colors[idx + 1] = 0;
        colors[idx + 2] = colorIntensity;
      }
    }

    // Generate connection lines (optimized)
    const connectionPoints = [];
    for (let i = 0; i < 20; i++) {
      for (let j = i + 1; j < 20; j++) {
        if (Math.random() > 0.75) { // Reduced connections for performance
          const startIdx = i * 3;
          const endIdx = j * 3;
          
          connectionPoints.push(
            positions[startIdx], positions[startIdx + 1], positions[startIdx + 2],
            positions[endIdx], positions[endIdx + 1], positions[endIdx + 2]
          );
        }
      }
    }

    const connectionGeometry = new THREE.BufferGeometry();
    connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPoints, 3));

    return { 
      nodePositions: positions, 
      nodeColors: colors, 
      connectionGeometry 
    };
  }, []);

  // Memoized floating particles for performance
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(150); // 50 particles * 3 coordinates
    const colors = new Float32Array(150);
    
    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 2;
      const radius = 2.5 + Math.random() * 0.8;
      const height = (Math.random() - 0.5) * 3;
      
      const idx = i * 3;
      positions[idx] = Math.cos(angle) * radius;
      positions[idx + 1] = height;
      positions[idx + 2] = Math.sin(angle) * radius;
      
      // Color variation
      const isBlue = i % 2 === 0;
      colors[idx] = isBlue ? 0 : 0.6;
      colors[idx + 1] = isBlue ? 1 : 0;
      colors[idx + 2] = 1;
    }
    
    return { positions, colors };
  }, []);

  // Spring animation for entrance
  const springs = useSpring({
    scale: [1, 1, 1],
    position: [0, 0, 0],
    from: { scale: [0, 0, 0], position: [0, -2, 0] },
    config: { mass: 2, tension: 280, friction: 80 },
  });

  return (
    <animated.group {...springs} ref={meshRef}>
      {/* Central Core - Optimized icosahedron */}
      <mesh>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial
          color="#00FFFF"
          transparent
          opacity={0.4}
          wireframe
          emissive="#00FFFF"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Outer Shell */}
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#9D00FF"
          transparent
          opacity={0.25}
          wireframe
          emissive="#9D00FF"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Neural Network Nodes - Using Points for performance */}
      <Points ref={nodesRef} positions={nodePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.12}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Points>

      {/* Neural Connections */}
      <lineSegments geometry={connectionGeometry}>
        <lineBasicMaterial
          color="#00FFFF"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Floating Particles */}
      <Points ref={particlesRef} positions={particlePositions.positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.06}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Points>
    </animated.group>
  );
};

// Memoized component for performance
export default AIBrainModel;
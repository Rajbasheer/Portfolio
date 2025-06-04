import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

const HolographicAvatar = () => {
  const meshRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/assests/mozgai.glb');
  
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
        scale={[0.8, 0.8, 0.8]}
        position={[0, -1, 0]}
      />
      
      {/* Add ambient glow effect */}
      <pointLight
        position={[0, 0, 0]}
        color="#00FFFF"
        intensity={2}
        distance={5}
      />
      
      {/* Add rim lighting */}
      <pointLight
        position={[2, 0, -2]}
        color="#9D00FF"
        intensity={1}
        distance={3}
      />
    </animated.group>
  );
};

useGLTF.preload('/assests/mozgai.glb');

export default HolographicAvatar;
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

interface BackgroundStarsProps {
  count?: number;
}

const BackgroundStars = ({ count = 1000 }: BackgroundStarsProps) => {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random stars
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Position
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;
      
      // Color
      const colorIndex = Math.floor(Math.random() * 3);
      if (colorIndex === 0) { // Cyan
        colors[i3] = 0;
        colors[i3 + 1] = 1;
        colors[i3 + 2] = 1;
      } else if (colorIndex === 1) { // Purple
        colors[i3] = 0.6;
        colors[i3 + 1] = 0;
        colors[i3 + 2] = 1;
      } else { // Magenta
        colors[i3] = 1;
        colors[i3 + 1] = 0;
        colors[i3 + 2] = 1;
      }
      
      // Size
      sizes[i] = Math.random() * 1.5;
    }
    
    return { positions, colors, sizes };
  }, [count]);
  
  // Animate stars
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });
  
  const spring = useSpring({
    scale: [1, 1, 1],
    from: { scale: [0, 0, 0] },
    config: { mass: 1, tension: 280, friction: 60 },
  });
  
  return (
    <animated.group scale={spring.scale}>
      <Points ref={ref} positions={particles.positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.1}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Points>
    </animated.group>
  );
};

export default BackgroundStars;
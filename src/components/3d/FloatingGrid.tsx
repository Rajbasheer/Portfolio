import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

interface FloatingGridProps {
  cellSize?: number;
  cellThickness?: number;
  cellColor?: string;
  sectionSize?: number;
  fadeDistance?: number;
  fadeStrength?: number;
  followMouse?: boolean;
}

const FloatingGrid = ({
  cellSize = 0.5,
  cellThickness = 0.5,
  cellColor = '#00ffff',
  sectionSize = 3,
  fadeDistance = 30,
  fadeStrength = 1.5,
  followMouse = true,
}: FloatingGridProps) => {
  const gridRef = useRef<THREE.Group>(null);
  
  const springs = useSpring({
    scale: [1, 1, 1],
    position: [0, -2, 0],
    rotation: [Math.PI / 2, 0, 0],
    from: { scale: [0, 0, 0], position: [0, -5, 0] },
    config: { mass: 1, tension: 280, friction: 120 },
  });
  
  useFrame(({ clock, mouse }) => {
    if (gridRef.current) {
      // Subtle floating animation
      gridRef.current.position.y = -2 + Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      
      // Optional mouse following
      if (followMouse) {
        gridRef.current.rotation.x = Math.PI / 2 + (mouse.y * 0.1);
        gridRef.current.rotation.z = mouse.x * 0.1;
      }
    }
  });
  
  return (
    <animated.group
      ref={gridRef}
      position={springs.position}
      rotation={springs.rotation}
      scale={springs.scale}
    >
      <Grid
        infiniteGrid
        cellSize={cellSize}
        cellThickness={cellThickness}
        cellColor={cellColor}
        sectionSize={sectionSize}
        fadeDistance={fadeDistance}
        fadeStrength={fadeStrength}
      />
    </animated.group>
  );
};

export default FloatingGrid;
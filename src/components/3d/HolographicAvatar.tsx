import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

const HolographicAvatar = () => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { camera, pointer } = useThree();
  
  const { scene } = useGLTF('/assets/central_brain_of_mankind_cml.glb');

  // Apply default material to the model
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          metalness: 0.9,
          roughness: 0.1,
          envMapIntensity: 1,
        });
      }
    });
  }, [scene]);
  
  const springs = useSpring({
    scale: clicked ? [1.15, 1.15, 1.15] : hovered ? [1.05, 1.05, 1.05] : [1.0, 1.0, 1.0],
    config: { 
      mass: 2, 
      tension: 280, 
      friction: 40
    }
  });
  
  useFrame((state) => {
    if (meshRef.current) {
      // Constant rotation on Y axis only
      meshRef.current.rotation.y += 0.005;
      
      if (clicked) {
        camera.position.lerp(new THREE.Vector3(0, 0, 4), 0.1);
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
      <primitive 
        ref={meshRef}
        object={scene.clone()} 
        scale={0.5}
      />
      
      {/* Basic lighting setup */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.8} />
    </animated.group>
  );
};

export default HolographicAvatar;
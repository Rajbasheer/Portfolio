import { ReactNode, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import BackgroundStars from '../3d/BackgroundStars';
import { Canvas } from '@react-three/fiber';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeSection } = useAppContext();

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <BackgroundStars count={1500} />
        </Canvas>
      </div>
      
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
      
      <div className="absolute bottom-4 left-4 z-20 text-neon-blue/60 text-xs">
        <span>NEO-PORTFOLIO v2.100</span>
      </div>
      
      <div className="absolute bottom-4 right-4 z-20 text-neon-blue/60 text-xs">
        <span>ACTIVE NODE: {activeSection.toUpperCase()}</span>
      </div>
    </motion.div>
  );
};

export default Layout;
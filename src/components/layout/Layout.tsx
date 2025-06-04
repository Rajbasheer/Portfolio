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
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <BackgroundStars count={1500} />
        </Canvas>
      </div>
      
      {/* Main Content - Responsive Container */}
      <motion.div 
        ref={containerRef}
        className="relative z-10 w-full min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="w-full min-h-screen">
          {children}
        </div>
      </motion.div>
      
      {/* Fixed UI Elements */}
      <div className="fixed bottom-4 left-4 z-20 text-neon-blue/60 text-xs">
        <span>RAJ-PORTFOLIO v1.0</span>
      </div>
      
      <div className="fixed bottom-4 right-4 z-20 text-neon-blue/60 text-xs">
        <span>SECTION: {activeSection.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default Layout;
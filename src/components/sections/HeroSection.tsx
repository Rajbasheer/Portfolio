import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useAppContext } from '../../context/AppContext';
import FloatingGrid from '../3d/FloatingGrid';
import HolographicAvatar from '../3d/HolographicAvatar';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useAppContext();
  
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };
  
  const subHeadingVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
    hover: { 
      scale: 1.05,
      backgroundColor: "rgba(157, 0, 255, 0.2)"
    },
    tap: { scale: 0.95 }
  };
  
  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen flex flex-col md:flex-row items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="md:w-1/2 z-10 md:order-1 order-2 px-4 md:px-8">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="text-white">NEO</span>
          <span className="bg-gradient-to-r from-neon-cyan to-neon-purple text-transparent bg-clip-text">DEVELOPER</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-white/80 mb-8 max-w-lg"
          variants={subHeadingVariants}
          initial="hidden"
          animate="visible"
        >
          Building immersive digital experiences for the next evolution of humanity. Quantum computing specialist and neural interface architect.
        </motion.p>
        
        <motion.button 
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/30 hover:border-neon-purple/60 transition-colors duration-300"
          onClick={() => setActiveSection('projects')}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <span>EXPLORE PROJECTS</span>
          <ArrowRight size={18} />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-purple/0 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </div>
      
      <div className="md:w-1/2 h-[40vh] md:h-[60vh] z-0 md:order-2 order-1 mb-8 md:mb-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#9D00FF" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00FFFF" />
          <HolographicAvatar />
          <FloatingGrid />
        </Canvas>
      </div>
    </motion.div>
  );
};

export default HeroSection;
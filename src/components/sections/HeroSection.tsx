import { useState, useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useAppContext } from '../../context/AppContext';
import HolographicAvatar from '../3d/HolographicAvatar';
import { ArrowRight, Award, TrendingUp, Users, Zap } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useAppContext();
  const [currentMetric, setCurrentMetric] = useState(0);
  const [show3D, setShow3D] = useState(false);
  
  const metrics = [
    { value: "60%", label: "Reduction in Manual Work", icon: TrendingUp },
    { value: "40%", label: "Inference Latency Improvement", icon: Zap },
    { value: "99.9%", label: "System Uptime Achieved", icon: Award },
    { value: "25%", label: "Model Accuracy Boost", icon: TrendingUp }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Delay 3D rendering to improve initial section load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow3D(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  // Simplified animations for better performance
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: 'easeOut' } // Simplified easing
    }
  };
  
  const subHeadingVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.5, delay: 0.2, ease: 'easeOut' }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, delay: 0.4, ease: 'easeOut' }
    },
    hover: { 
      scale: 1.05,
      backgroundColor: "rgba(157, 0, 255, 0.3)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };
  
  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen flex flex-col md:flex-row items-center justify-center p-4 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating Achievement Badge */}
      <motion.div
        className="absolute top-20 right-4 md:right-8 z-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 backdrop-blur-md border border-neon-cyan/30 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Users size={16} className="text-neon-cyan" />
            <span className="text-xs text-white font-semibold">PROVEN IMPACT</span>
          </div>
          <motion.div
            key={currentMetric}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="text-lg font-bold text-neon-cyan">{metrics[currentMetric].value}</div>
            <div className="text-xs text-white/80">{metrics[currentMetric].label}</div>
          </motion.div>
        </div>
      </motion.div>

      <div className="md:w-1/2 z-10 md:order-1 order-2 px-4 md:px-8">
        <motion.div
          className="mb-4"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="inline-flex items-center gap-2 bg-neon-purple/20 backdrop-blur-sm border border-neon-purple/30 rounded-full px-4 py-2 mb-4">
            <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
            <span className="text-sm text-white font-medium">Available for Immediate Hire</span>
          </div>
        </motion.div>

        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="text-white">RAJ</span>
          <span className="bg-gradient-to-r from-neon-cyan to-neon-purple text-transparent bg-clip-text">BASHEER</span>
        </motion.h1>
        
        <motion.div
          className="mb-6"
          variants={subHeadingVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-xl md:text-2xl text-neon-cyan font-semibold mb-2">
            AI Engineering Leader Who Delivers Results
          </h2>
          <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-4">
            <span>📍 Harrison, NJ</span>
            <span>🚀 6+ Years Experience</span>
            <span>💼 Currently @ Vitel Global</span>
          </div>
        </motion.div>
        
        <motion.p 
          className="text-lg md:text-xl text-white/80 mb-8 max-w-lg leading-relaxed"
          variants={subHeadingVariants}
          initial="hidden"
          animate="visible"
        >
          I don't just build AI systems—I create <span className="text-neon-cyan font-semibold">revenue-generating solutions</span> that scale. My AI Voice Agents process <span className="text-neon-purple font-semibold">10,000+ calls</span> with 99.9% uptime, saving companies thousands in operational costs.
        </motion.p>

        {/* Quick Value Props */}
        <motion.div
          className="grid grid-cols-2 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <div className="bg-deep-space/40 backdrop-blur-sm border border-neon-blue/20 rounded-lg p-3">
            <div className="text-neon-cyan font-bold text-lg">40%</div>
            <div className="text-xs text-white/70">Faster AI Inference</div>
          </div>
          <div className="bg-deep-space/40 backdrop-blur-sm border border-neon-blue/20 rounded-lg p-3">
            <div className="text-neon-purple font-bold text-lg">3×</div>
            <div className="text-xs text-white/70">Response Efficiency</div>
          </div>
        </motion.div>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button 
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple text-deep-space font-semibold relative overflow-hidden group"
            onClick={() => setActiveSection('projects')}
            whileHover="hover"
            whileTap="tap"
          >
            <span className="relative z-10">VIEW MY IMPACT</span>
            <ArrowRight size={18} className="relative z-10" />
            <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </motion.button>

          <motion.button 
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-neon-purple text-neon-purple hover:bg-neon-purple/10 transition-all duration-300"
            onClick={() => setActiveSection('contact')}
            whileHover={{ scale: 1.05, borderColor: "#00FFFF" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>HIRE ME NOW</span>
            <Zap size={18} />
          </motion.button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          className="mt-8 flex items-center gap-6 text-sm text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 bg-neon-cyan/30 rounded-full border border-neon-cyan/50"></div>
              <div className="w-6 h-6 bg-neon-purple/30 rounded-full border border-neon-purple/50"></div>
              <div className="w-6 h-6 bg-white/30 rounded-full border border-white/50"></div>
            </div>
            <a href='https://drive.google.com/file/d/1QiKNFsEoIfN1pdI2TtT-av5Nv_OHhdPc/view?usp=drive_link'>Curious? My Resume just a click away</a>
          </div>
        </motion.div>
      </div>
      
      {/* Optimized 3D Section - Loads after initial content */}
      <div className="md:w-1/2 h-[40vh] md:h-[60vh] z-0 md:order-2 order-1 mb-8 md:mb-0 flex items-center justify-center">
        {show3D ? (
          <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={2.0} color="#00FFFF" />
            <pointLight position={[-5, -5, -5]} intensity={1.5} color="#9D00FF" />
            <spotLight
              position={[0, 5, 0]}
              intensity={1.5}
              angle={0.5}
              penumbra={1}
              color="#00FFFF"
            />
            <Suspense fallback={null}>
              <HolographicAvatar />
            </Suspense>
          </Canvas>
        ) : (
          // Simple placeholder while 3D loads
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 animate-pulse" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HeroSection;
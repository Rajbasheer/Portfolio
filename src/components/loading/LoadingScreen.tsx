import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      className="fixed inset-0 bg-deep-space flex flex-col items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative w-24 h-24 mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 blur-lg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap size={48} className="text-neon-cyan animate-pulse" />
        </div>
      </motion.div>

      <motion.h1 
        className="text-2xl font-bold mb-8 text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        INITIALIZING <span className="text-neon-cyan">NEO-PORTFOLIO</span>
      </motion.h1>
      
      <motion.div 
        className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden mb-2"
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 256 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan"
          style={{ width: `${progress}%` }}
          initial={{ width: "0%" }}
        />
      </motion.div>
      
      <motion.div 
        className="flex justify-between w-64 text-xs text-neon-blue/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span>LOADING ASSETS</span>
        <span>{progress}%</span>
      </motion.div>
      
      <motion.div 
        className="mt-16 text-xs text-neon-blue/50 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p className="typing-effect">QUANTUM RENDERING SYSTEM v2.100</p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
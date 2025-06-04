import { Suspense, lazy, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';

// Lazy load the 3D model for code splitting
const AIBrainModel = lazy(() => import('./AIBrainModel'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="relative">
      {/* Simple CSS loader while 3D loads */}
      <div className="w-16 h-16 border-2 border-neon-cyan/30 rounded-full animate-spin">
        <div className="absolute top-2 left-2 w-12 h-12 border-2 border-neon-purple/50 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}>
          <div className="absolute top-2 left-2 w-8 h-8 border border-neon-cyan/70 rounded-full animate-spin"></div>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full animate-pulse"></div>
    </div>
  </div>
);

// Error boundary fallback
const ErrorFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 rounded-xl flex items-center justify-center">
        <div className="w-8 h-8 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"></div>
      </div>
      <p className="text-white/60 text-sm">AI Visualization</p>
    </div>
  </div>
);

interface AI3DCanvasProps {
  className?: string;
}

const AI3DCanvas = memo(({ className = "w-full h-96" }: AI3DCanvasProps) => {
  return (
    <div className={className}>
      <motion.div
        className="relative w-full h-full bg-deep-space/20 rounded-xl border border-neon-blue/20 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            camera={{ 
              position: [0, 0, 6], 
              fov: 50,
              near: 0.1,
              far: 1000 
            }}
            dpr={[1, 2]} // Adaptive pixel ratio for performance
            performance={{ min: 0.5 }} // Performance monitoring
            frameloop="demand" // Only render when needed
            gl={{ 
              antialias: true,
              alpha: true,
              powerPreference: "high-performance"
            }}
          >
            {/* Optimized lighting setup */}
            <ambientLight intensity={0.3} />
            <pointLight 
              position={[8, 8, 8]} 
              intensity={0.7} 
              color="#00FFFF"
              decay={2}
              distance={20}
            />
            <pointLight 
              position={[-8, -8, -8]} 
              intensity={0.5} 
              color="#9D00FF"
              decay={2}
              distance={20}
            />
            
            {/* Fog for depth */}
            <fog attach="fog" args={['#0a0a0a', 8, 25]} />
            
            <AIBrainModel />
          </Canvas>
        </Suspense>

        {/* Floating Status Labels */}
        <motion.div
          className="absolute top-4 left-4 bg-deep-space/80 backdrop-blur-sm border border-neon-cyan/30 rounded-lg px-3 py-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
            <span className="text-xs text-white font-medium">AI Processing</span>
          </div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-4 right-4 bg-deep-space/80 backdrop-blur-sm border border-neon-purple/30 rounded-lg px-3 py-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
            <span className="text-xs text-white font-medium">Neural Network</span>
          </div>
        </motion.div>

        {/* Performance indicator (dev only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute top-4 right-4 text-xs text-white/40">
            <span>3D Active</span>
          </div>
        )}
      </motion.div>
    </div>
  );
});

AI3DCanvas.displayName = 'AI3DCanvas';

export default AI3DCanvas;
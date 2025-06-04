import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a'
      );
    };
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    const handleTouchStart = () => {
      setIsVisible(false);
      document.body.classList.add('is-touch-device');
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { once: true });

    setTimeout(() => setIsVisible(true), 1000);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed z-[200] pointer-events-none mix-blend-difference hidden md:block"
        style={{
          left: smoothX,
          top: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="relative"
          animate={{
            rotate: isPointer ? 45 : 0,
            scale: isPointer ? 0.8 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-5 h-5 relative">
            <div className="absolute inset-0 bg-white" style={{ clipPath: 'polygon(0 40%, 40% 40%, 40% 0, 60% 0, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0 60%)' }} />
          </div>
        </motion.div>
      </motion.div>

      {/* Outer shape */}
      <motion.div
        className="fixed z-[200] pointer-events-none mix-blend-difference hidden md:block"
        style={{
          left: smoothX,
          top: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="relative"
          animate={{
            rotate: isPointer ? -45 : 0,
            scale: isPointer ? 1.2 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-12 h-12 relative">
            <div className="absolute inset-0 border border-white" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }} />
          </div>
        </motion.div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="fixed z-[190] pointer-events-none hidden md:block"
        style={{
          left: smoothX,
          top: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-16 h-16"
          style={{
            background: 'linear-gradient(45deg, rgba(0, 255, 255, 0.2), rgba(157, 0, 255, 0.2))',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            filter: 'blur(8px)',
          }}
          animate={{
            scale: isPointer ? 1.5 : 1,
            opacity: isPointer ? 0.8 : 0.4,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
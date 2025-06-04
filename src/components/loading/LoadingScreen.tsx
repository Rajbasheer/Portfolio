import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

interface LoadingTask {
  name: string;
  completed: boolean;
  progress: number;
}

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const [tasks, setTasks] = useState<LoadingTask[]>([
    { name: 'LOADING ASSETS', completed: false, progress: 0 },
    { name: 'INITIALIZING AI SYSTEMS', completed: false, progress: 0 },
    { name: 'PREPARING PORTFOLIO', completed: false, progress: 0 },
    { name: 'OPTIMIZING PERFORMANCE', completed: false, progress: 0 }
  ]);
  
  useEffect(() => {
    let taskIndex = 0;
    let overallProgress = 0;
    const totalDuration = 2000; // Match your loading time
    const intervalTime = 100; // Update every 100ms
    const totalSteps = totalDuration / intervalTime; // 25 steps
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      
      // Calculate which task should be active based on progress
      const progressPerTask = totalSteps / tasks.length;
      taskIndex = Math.floor(currentStep / progressPerTask);
      
      if (taskIndex < tasks.length) {
        // Calculate progress within current task
        const taskStartStep = taskIndex * progressPerTask;
        const stepWithinTask = currentStep - taskStartStep;
        const taskProgress = Math.min(100, (stepWithinTask / progressPerTask) * 100);
        
        setTasks(prev => {
          const newTasks = [...prev];
          
          // Mark previous tasks as completed
          for (let i = 0; i < taskIndex; i++) {
            newTasks[i] = { ...newTasks[i], progress: 100, completed: true };
          }
          
          // Update current task
          if (taskIndex < newTasks.length) {
            newTasks[taskIndex] = {
              ...newTasks[taskIndex],
              progress: taskProgress,
              completed: taskProgress >= 100
            };
          }
          
          return newTasks;
        });
        
        setCurrentTask(taskIndex);
      }
      
      // Calculate overall progress (0-100%)
      overallProgress = Math.min(100, (currentStep / totalSteps) * 100);
      setProgress(overallProgress);
      
      // Stop when we reach 100% or exceed total duration
      if (currentStep >= totalSteps || overallProgress >= 100) {
        setProgress(100);
        // Mark all tasks as completed
        setTasks(prev => prev.map(task => ({ ...task, progress: 100, completed: true })));
        clearInterval(interval);
      }
    }, intervalTime);
    
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
      {/* Logo/Icon */}
      <motion.div
        className="relative w-24 h-24 mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 blur-lg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Code2 size={48} className="text-neon-cyan animate-pulse" />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1 
        className="text-2xl font-bold mb-8 text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        INITIALIZING <span className="text-neon-cyan">RAJ PORTFOLIO</span>
      </motion.h1>
      
      {/* Progress Bar */}
      <motion.div 
        className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden mb-4"
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 320 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan"
          style={{ width: `${progress}%` }}
          initial={{ width: "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>
      
      {/* Progress Info */}
      <motion.div 
        className="flex justify-between w-80 text-xs text-neon-blue/70 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span>LOADING PORTFOLIO</span>
        <span>{Math.round(progress)}%</span>
      </motion.div>
      
      {/* Task List */}
      <motion.div
        className="w-80 space-y-2 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {tasks.map((task, index) => (
          <motion.div
            key={task.name}
            className={`flex items-center gap-3 text-sm transition-colors duration-300 ${
              index === currentTask 
                ? 'text-neon-cyan' 
                : task.completed 
                  ? 'text-white/60' 
                  : 'text-white/30'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
          >
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              task.completed 
                ? 'bg-neon-cyan' 
                : index === currentTask 
                  ? 'bg-neon-cyan animate-pulse' 
                  : 'bg-white/20'
            }`} />
            <span className="font-mono">{task.name}</span>
            {index === currentTask && (
              <div className="flex-1 flex justify-end">
                <span className="text-xs text-neon-cyan">{Math.round(task.progress)}%</span>
              </div>
            )}
            {task.completed && (
              <div className="flex-1 flex justify-end">
                <span className="text-xs text-neon-cyan">✓</span>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
      
      {/* Footer */}
      <motion.div 
        className="text-xs text-neon-blue/50 font-mono text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <p className="typing-effect">BACKEND ENGINEER • AI SPECIALIST v1.0</p>
        <p className="mt-2 text-white/40">Optimized for performance • Zero loading delays</p>
      </motion.div>

      {/* Animated particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 10,
              opacity: 0
            }}
            animate={{
              y: -10,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
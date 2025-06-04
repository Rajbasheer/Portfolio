import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1
      } 
    }
  };
  
  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.4 } }
  };
  
  const overlayVariants = {
    rest: { opacity: 0.3 },
    hover: { opacity: 0.6, transition: { duration: 0.4 } }
  };
  
  const contentVariants = {
    rest: { y: 10, opacity: 0.9 },
    hover: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };
  
  return (
    <motion.div
      ref={cardRef}
      className="relative group rounded-xl overflow-hidden aspect-[4/5] cursor-pointer h-[360px] md:h-[432px]"
      variants={cardVariants}
      whileHover="hover"
      initial="rest"
      animate="rest"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-deep-space to-transparent z-10"
        variants={overlayVariants}
      />
      
      <motion.img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        variants={imageVariants}
      />
      
      <motion.div 
        className="absolute inset-x-0 bottom-0 p-4 md:p-6 z-20"
        variants={contentVariants}
      >
        <div className="space-y-2 md:space-y-3">
          <h3 className="text-lg md:text-xl font-bold text-white">{project.title}</h3>
          <p className="text-sm md:text-base text-white/80 line-clamp-3">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-2 md:mt-3">
            {project.technologies.map((tech) => (
              <span 
                key={tech}
                className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/30"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <motion.button 
            className="mt-3 md:mt-4 flex items-center gap-2 text-neon-cyan hover:text-white transition-colors duration-300"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>VIEW PROJECT</span>
            <ArrowUpRight size={16} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
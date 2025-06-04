import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Building, TrendingUp } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  company?: string;
  year?: string;
  liveUrl?: string;
  impact?: string;
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
    hover: { scale: 1.1, transition: { duration: 0.4 } }
  };
  
  const overlayVariants = {
    rest: { opacity: 0.4 },
    hover: { opacity: 0.7, transition: { duration: 0.4 } }
  };
  
  const contentVariants = {
    rest: { y: 15, opacity: 0.9 },
    hover: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  const handleProjectClick = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      className="relative group rounded-xl overflow-hidden aspect-[4/5] cursor-pointer h-[360px] md:h-[432px]"
      variants={cardVariants}
      whileHover="hover"
      initial="rest"
      animate="rest"
      onClick={handleProjectClick}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/60 to-transparent z-10"
        variants={overlayVariants}
      />
      
      <motion.img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        variants={imageVariants}
      />

      {/* Impact Badge */}
      {project.impact && (
        <div className="absolute top-4 left-4 z-30">
          <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 backdrop-blur-sm rounded-full border border-neon-cyan/30">
            <TrendingUp size={12} className="text-neon-cyan" />
            <span className="text-xs text-white font-medium">{project.impact}</span>
          </div>
        </div>
      )}
      
      {/* Company and Year Badge */}
      {project.company && (
        <div className="absolute top-16 left-4 z-20">
          <div className="flex items-center gap-2 px-3 py-1 bg-deep-space/80 backdrop-blur-sm rounded-full border border-neon-blue/20">
            <Building size={14} className="text-neon-cyan" />
            <span className="text-xs text-white font-medium">{project.company}</span>
            {project.year && (
              <span className="text-xs text-white/70">• {project.year}</span>
            )}
          </div>
        </div>
      )}

      {/* Live URL Indicator */}
      {project.liveUrl && (
        <div className="absolute top-4 right-4 z-20">
          <motion.div 
            className="p-2 bg-neon-cyan/20 backdrop-blur-sm rounded-full border border-neon-cyan/30"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 255, 255, 0.3)" }}
          >
            <ExternalLink size={16} className="text-neon-cyan" />
          </motion.div>
        </div>
      )}
      
      <motion.div 
        className="absolute inset-x-0 bottom-0 p-4 md:p-6 z-20"
        variants={contentVariants}
      >
        <div className="space-y-2 md:space-y-3">
          <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{project.title}</h3>
          <p className="text-sm md:text-base text-white/90 line-clamp-3 leading-relaxed">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-2 md:mt-3">
            {project.technologies.slice(0, 3).map((tech) => (
              <span 
                key={tech}
                className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-neon-purple/30 text-white border border-neon-purple/50 font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-white/20 text-white/80 border border-white/30">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
          
          <motion.div 
            className="mt-3 md:mt-4 flex items-center justify-between"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2 text-neon-cyan hover:text-white transition-colors duration-300">
              <span className="text-sm font-semibold">
                {project.liveUrl ? 'VIEW LIVE PROJECT' : 'VIEW DETAILS'}
              </span>
              <ArrowUpRight size={16} />
            </div>
            
            {/* ROI Indicator */}
            <div className="flex items-center gap-1 text-xs text-neon-purple font-medium">
              <TrendingUp size={12} />
              <span>HIGH ROI</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Hover Effect Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  );
};

export default ProjectCard;
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from '../ui/ProjectCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Enterprise Resource Hub',
    description: 'Microservices-based resource management platform serving 10,000+ users with real-time analytics and reporting.',
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg'
  },
  {
    id: 2,
    title: 'AI-Powered Analytics',
    description: 'Machine learning platform for predictive analytics, reducing data processing time by 60% through automated workflows.',
    technologies: ['Python', 'TensorFlow', 'Docker', 'Azure'],
    image: 'https://images.pexels.com/photos/7054528/pexels-photo-7054528.jpeg'
  },
  {
    id: 3,
    title: 'Cloud Migration Suite',
    description: 'Led the development of a cloud migration tool that successfully transitioned 200+ applications to AWS infrastructure.',
    technologies: ['AWS', 'Terraform', 'Jenkins', 'Kubernetes'],
    image: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg'
  },
  {
    id: 4,
    title: 'Smart City Platform',
    description: 'IoT-based smart city management system integrating traffic, energy, and environmental monitoring.',
    technologies: ['IoT', 'React', 'Node.js', 'MongoDB'],
    image: 'https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg'
  },
  {
    id: 5,
    title: 'Quantum Computing Simulator',
    description: 'Educational platform for quantum computing simulation with interactive visualizations.',
    technologies: ['Python', 'React', 'WebGL', 'TypeScript'],
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg'
  },
  {
    id: 6,
    title: 'Blockchain Supply Chain',
    description: 'Decentralized supply chain management system using blockchain technology.',
    technologies: ['Solidity', 'Ethereum', 'React', 'Node.js'],
    image: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg'
  },
  {
    id: 7,
    title: 'Neural Network Composer',
    description: 'AI-powered music composition tool using deep learning algorithms.',
    technologies: ['Python', 'TensorFlow', 'Web Audio API'],
    image: 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg'
  },
  {
    id: 8,
    title: 'Augmented Reality SDK',
    description: 'Cross-platform SDK for building AR applications with gesture recognition.',
    technologies: ['Unity', 'C#', 'ARKit', 'ARCore'],
    image: 'https://images.pexels.com/photos/8728285/pexels-photo-8728285.jpeg'
  },
  {
    id: 9,
    title: 'Cybersecurity Dashboard',
    description: 'Real-time security monitoring and threat detection platform.',
    technologies: ['React', 'Python', 'ElasticSearch'],
    image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg'
  },
  {
    id: 10,
    title: 'Edge Computing Platform',
    description: 'Distributed computing platform for IoT devices with real-time processing.',
    technologies: ['Rust', 'WebAssembly', 'Kubernetes'],
    image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg'
  },
  {
    id: 11,
    title: 'Virtual Reality Training',
    description: 'VR-based industrial training platform with performance analytics.',
    technologies: ['Unity', 'C#', 'WebXR', 'Firebase'],
    image: 'https://images.pexels.com/photos/8728557/pexels-photo-8728557.jpeg'
  },
  {
    id: 12,
    title: 'Autonomous Drone System',
    description: 'AI-powered drone control system for automated inspection and mapping.',
    technologies: ['Python', 'ROS', 'Computer Vision'],
    image: 'https://images.pexels.com/photos/442589/pexels-photo-442589.jpeg'
  },
  {
    id: 13,
    title: 'Quantum Cryptography',
    description: 'Next-generation cryptographic system using quantum key distribution.',
    technologies: ['Python', 'C++', 'Quantum SDK'],
    image: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg'
  }
];

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleScrollDirection = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth <= 768 ? 300 : 400;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.section
      ref={ref}
      className="p-4 md:p-8 overflow-hidden relative flex flex-col min-h-screen"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="mb-8 mt-20 md:mt-8"
        initial={{ y: -30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple text-transparent bg-clip-text">
          FEATURED PROJECTS
        </h2>
      </motion.div>
      
      <div className="flex-1 relative">
        <motion.div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 md:space-x-6 snap-x snap-mandatory scroll-smooth pb-16 hide-scrollbar"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="flex-none snap-center" 
              style={{ width: window.innerWidth <= 768 ? '300px' : '400px' }}
            >
              <ProjectCard
                project={project}
                index={index}
              />
            </div>
          ))}
        </motion.div>

        <div className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 flex items-center gap-4 p-4">
          <motion.button
            onClick={() => handleScrollDirection('left')}
            className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
              canScrollLeft 
                ? 'bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30' 
                : 'bg-gray-800/20 text-gray-600 cursor-not-allowed'
            }`}
            disabled={!canScrollLeft}
            whileHover={canScrollLeft ? { scale: 1.1 } : {}}
            whileTap={canScrollLeft ? { scale: 0.95 } : {}}
          >
            <ArrowLeft size={24} />
          </motion.button>

          <motion.button
            onClick={() => handleScrollDirection('right')}
            className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
              canScrollRight 
                ? 'bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30' 
                : 'bg-gray-800/20 text-gray-600 cursor-not-allowed'
            }`}
            disabled={!canScrollRight}
            whileHover={canScrollRight ? { scale: 1.1 } : {}}
            whileTap={canScrollRight ? { scale: 0.95 } : {}}
          >
            <ArrowRight size={24} />
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;
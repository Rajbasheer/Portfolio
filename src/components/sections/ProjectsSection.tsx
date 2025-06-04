import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from '../ui/ProjectCard';

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

const projects: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Voice Agent',
    description: 'Revolutionary AI Voice Agent that automates outbound calling and appointment scheduling, achieving 3× response efficiency and 60% reduction in manual work using Python, AWS Lambda, and LangChain.',
    technologies: ['Python', 'AWS Lambda', 'FastAPI', 'Twilio'],
    image: '/Portfolio/assets/calling.png',
    company: 'Vitel Global',
    year: '2024',
    liveUrl: 'https://callingo.ai/',
    impact: '60% reduction in manual work, 95% transcription accuracy'
  },
  {
    id: 2,
    title: 'Avatar Chat Bot Platform',
    description: 'Next-generation AI Avatar Chatbot delivering 45% higher user engagement and 50% lower latency using Synthesia avatars, LLMs, and deployed on AWS EKS.',
    technologies: ['Python', 'AWS EKS', 'Synthesia', 'FastAPI'],
    image: '/Portfolio/assets/avatar.png',
    company: 'Vitel Global',
    year: '2024',
    liveUrl: 'https://avatarchatbots.ai/',
    impact: '45% higher engagement, 50% faster responses'
  },
  {
    id: 3,
    title: 'Multi-LLM Code Generation Platform',
    description: 'Enterprise-grade Generative AI platform for automated code generation using multiple LLMs (OpenAI, Claude, Gemini) with intelligent prompt routing and token management.',
    technologies: ['Python', 'FastAPI', 'LangChain', 'OpenAI'],
    image: '/Portfolio/assets/mutli_llm.png',
    company: 'Vitel Global',
    year: '2024',
    impact: 'Multi-model orchestration, enterprise scalability'
  },
  {
    id: 4,
    title: 'Custom LLM Fine-tuning Engine',
    description: 'Built sophisticated LLM fine-tuning pipeline using domain-specific datasets, improving model accuracy by 35% for specialized AI applications.',
    technologies: ['Python', 'PyTorch', 'Hugging Face', 'CUDA'],
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg',
    company: 'Vitel Global',
    year: '2024',
    impact: '35% accuracy improvement, custom domain adaptation'
  },
  {
    id: 5,
    title: 'Job Tracking Multi-Agent System',
    description: 'Intelligent job application tracking system powered by multiple AI agents. Automates application status monitoring, interview scheduling, and provides insights using advanced RAG techniques.',
    technologies: ['Python', 'LangChain', 'RAG', 'FastAPI'],
    image: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg',
    company: 'Personal Project',
    year: '2024',
    impact: 'Automated job tracking, AI-powered insights'
  },
  {
    id: 6,
    title: 'Toyota Material Handling Platform',
    description: 'Enterprise-scale platform serving thousands of dealers worldwide. Built scalable RESTful APIs for real-time inventory tracking and equipment management.',
    technologies: ['Python', 'FastAPI', 'React.js', 'PostgreSQL'],
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
    company: 'Accenture',
    year: '2021-2023',
    liveUrl: 'https://www.toyotaforklift.com/',
    impact: '40% performance improvement, global dealer network'
  },
  {
    id: 7,
    title: 'MediLink Healthcare Platform',
    description: 'HIPAA-compliant AI-driven healthcare platform for managing patient records. Features LLM-powered search system reducing search time by 50%.',
    technologies: ['React.js', 'Spring Boot', 'MySQL', 'LLM'],
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg',
    company: 'Academic Project',
    year: '2024',
    impact: '50% faster medical record retrieval, HIPAA compliant'
  }
];

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [visibleProjects, setVisibleProjects] = useState(3);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleProjects(1);
      } else if (width < 1024) {
        setVisibleProjects(2);
      } else if (width < 1280) {
        setVisibleProjects(3);
      } else {
        setVisibleProjects(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.section
      ref={ref}
      className="section-container"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="content-wrapper">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple text-transparent bg-clip-text mb-2">
            REVENUE-GENERATING PROJECTS
          </h2>
          <p className="text-sm md:text-base text-white/70 mb-4">
            AI solutions that deliver measurable business impact and ROI
          </p>
          
          {/* Impact Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            <div className="bg-deep-space/40 backdrop-blur-sm border border-neon-cyan/20 rounded-lg p-2 md:p-3 text-center">
              <div className="text-neon-cyan font-bold text-sm md:text-lg">10K+</div>
              <div className="text-xs text-white/70">Calls Handled</div>
            </div>
            <div className="bg-deep-space/40 backdrop-blur-sm border border-neon-purple/20 rounded-lg p-2 md:p-3 text-center">
              <div className="text-neon-purple font-bold text-sm md:text-lg">99.9%</div>
              <div className="text-xs text-white/70">Uptime</div>
            </div>
            <div className="bg-deep-space/40 backdrop-blur-sm border border-neon-cyan/20 rounded-lg p-2 md:p-3 text-center">
              <div className="text-neon-cyan font-bold text-sm md:text-lg">60%</div>
              <div className="text-xs text-white/70">Cost Cut</div>
            </div>
            <div className="bg-deep-space/40 backdrop-blur-sm border border-neon-purple/20 rounded-lg p-2 md:p-3 text-center">
              <div className="text-neon-purple font-bold text-sm md:text-lg">3×</div>
              <div className="text-xs text-white/70">Efficiency</div>
            </div>
          </div>
        </motion.div>
        
        {/* Projects Container */}
        <div className="relative flex-1">
          <motion.div
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                className="snap-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;
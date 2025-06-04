import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Shield, Database, Sparkles, Brain, Code, Cloud, Award, MapPin } from 'lucide-react';

const skills = [
  { name: 'AI/ML & Gen-AI Development', icon: Brain, value: 95, highlight: true },
  { name: 'Backend Engineering (Python)', icon: Code, value: 90, highlight: true },
  { name: 'Cloud Architecture (AWS/GCP)', icon: Cloud, value: 88 },
  { name: 'Database & MLOps', icon: Database, value: 85 },
  { name: 'Full-Stack Development', icon: Sparkles, value: 82 },
  { name: 'DevOps & Security', icon: Shield, value: 80 }
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.section
      ref={ref}
      className="section-container"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="content-wrapper">
        <div className="responsive-grid">
          <div>
            <motion.h2
              className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-neon-cyan to-neon-purple text-transparent bg-clip-text"
              initial={{ x: -50 }}
              animate={isInView ? { x: 0 } : { x: -50 }}
              transition={{ duration: 0.5 }}
            >
              WHY COMPANIES CHOOSE ME
            </motion.h2>
            
            <motion.div
              className="space-y-4 text-white/80"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-base leading-relaxed">
                Senior Backend Engineer with <span className="text-neon-cyan font-semibold">6+ years</span> of experience specializing in building scalable, cloud-native applications and LLM-powered AI systems. Expert in Python, FastAPI, TensorFlow, PyTorch, and LangChain with hands-on expertise in Generative AI and Retrieval-Augmented Generation (RAG).
              </p>
              <p className="text-base leading-relaxed">
                Currently working as a Backend Engineer (Gen-AI) at <span className="text-neon-purple font-medium">Vitel Global</span>, where I've built AI-powered Voice Agents that achieve <span className="text-neon-cyan font-semibold">3× response efficiency</span> and reduced manual work by <span className="text-neon-cyan font-semibold">60%</span>.
              </p>
              <p className="text-base leading-relaxed">
                Passionate about combining backend engineering and GenAI to deliver robust, real-time solutions. Proven track record of reducing inference latency by <span className="text-neon-purple font-semibold">40%</span> and improving model accuracy by <span className="text-neon-purple font-semibold">25%</span>.
              </p>
              
              <div className="mt-6 p-4 bg-deep-space/30 rounded-lg border border-neon-blue/20">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={18} className="text-neon-cyan" />
                  <h4 className="text-neon-cyan font-semibold text-base">Education</h4>
                </div>
                <p className="text-sm">
                  <strong>Masters in Computer Science</strong><br />
                  Pace University, Seidenberg School of Computer Science<br />
                  <span className="flex items-center gap-1 mt-1 text-white/60">
                    <MapPin size={14} />
                    New York City
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 bg-neon-cyan/30 rounded-full border border-neon-cyan/50"></div>
                    <div className="w-6 h-6 bg-neon-purple/30 rounded-full border border-neon-purple/50"></div>
                    <div className="w-6 h-6 bg-white/30 rounded-full border border-white/50"></div>
                  </div>
                  <a href='https://github.com/Rajbasheer'>Explore my GitHub (Steal with style)</a>
                </div>
            </motion.div>
          </div>
          
          <div>
            <motion.h3
              className="text-xl md:text-2xl font-bold mb-6 text-neon-cyan"
              initial={{ x: 50 }}
              animate={isInView ? { x: 0 } : { x: 50 }}
              transition={{ duration: 0.5 }}
            >
              TECHNICAL EXPERTISE
            </motion.h3>
            
            <div className="skills-grid">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                
                return (
                  <motion.div
                    key={skill.name}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-full ${skill.highlight ? 'bg-neon-cyan/20' : 'bg-neon-blue/10'}`}>
                          <Icon size={16} className={skill.highlight ? 'text-neon-cyan' : 'text-neon-cyan'} />
                        </div>
                        <span className="font-medium text-sm">{skill.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-neon-cyan">{skill.value}%</span>
                        {skill.highlight && (
                          <span className="px-2 py-0.5 bg-neon-cyan/20 rounded text-xs font-bold text-neon-cyan">
                            EXPERT
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="h-1.5 w-full bg-deep-space/80 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full ${
                          skill.highlight 
                            ? 'bg-gradient-to-r from-neon-cyan to-neon-purple' 
                            : 'bg-gradient-to-r from-neon-cyan to-neon-purple'
                        }`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.value}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <motion.div
              className="mt-6 p-4 bg-neon-purple/10 rounded-lg border border-neon-purple/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h4 className="text-neon-purple font-semibold text-base mb-3">Key Technologies</h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  'Python', 'FastAPI', 'TensorFlow', 'PyTorch', 'LangChain', 'OpenAI', 'AWS', 'GCP', 
                  'Docker', 'Kubernetes', 'React.js', 'MongoDB', 'PostgreSQL', 'Jenkins'
                ].map((tech) => (
                  <span key={tech} className="px-2 py-1 rounded-full bg-deep-space/50 text-white/70 hover:text-white transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
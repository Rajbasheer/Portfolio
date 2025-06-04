import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Shield, Database, Sparkles, Brain } from 'lucide-react';

const skills = [
  { name: 'Full Stack Development', icon: Sparkles, value: 95 },
  { name: 'Database Engineering', icon: Database, value: 90 },
  { name: 'Cloud Architecture', icon: Brain, value: 85 },
  { name: 'DevOps & Security', icon: Shield, value: 85 }
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.section
      ref={ref}
      className="flex flex-col lg:flex-row gap-8 lg:gap-16 p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="lg:w-1/2">
        <motion.h2
          className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-neon-cyan to-neon-purple text-transparent bg-clip-text"
          initial={{ x: -50 }}
          animate={isInView ? { x: 0 } : { x: -50 }}
          transition={{ duration: 0.5 }}
        >
          ABOUT THE DEVELOPER
        </motion.h2>
        
        <motion.div
          className="space-y-4 text-white/80"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="leading-relaxed">
            Full Stack Developer with over 5 years of experience in building scalable web applications and microservices. Specializing in React, Node.js, and cloud technologies with a focus on creating innovative solutions for complex business challenges.
          </p>
          <p className="leading-relaxed">
            Currently working as a Senior Software Engineer at Infosys, leading development of enterprise-level applications and mentoring junior developers. Previously contributed to major projects at Tata Consultancy Services, delivering high-impact solutions for global clients.
          </p>
          <p className="leading-relaxed">
            Passionate about clean code, performance optimization, and staying ahead of emerging technologies. Proven track record of reducing deployment times by 40% and implementing CI/CD pipelines that improved development efficiency.
          </p>
        </motion.div>
      </div>
      
      <div className="lg:w-1/2">
        <motion.h3
          className="text-xl md:text-2xl font-bold mb-6 text-neon-cyan"
          initial={{ x: 50 }}
          animate={isInView ? { x: 0 } : { x: 50 }}
          transition={{ duration: 0.5 }}
        >
          TECHNICAL PROFICIENCIES
        </motion.h3>
        
        <div className="space-y-6">
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
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-1.5 bg-neon-blue/10 rounded-full">
                    <Icon size={18} className="text-neon-cyan" />
                  </div>
                  <span className="font-medium">{skill.name}</span>
                </div>
                
                <div className="h-1.5 w-full bg-deep-space/80 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.value}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
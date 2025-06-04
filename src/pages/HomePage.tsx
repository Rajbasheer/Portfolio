import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ContactSection from '../components/sections/ContactSection';

const HomePage = () => {
  const { activeSection } = useAppContext();

  // Section variants for animations
  const sectionVariants = {
    hidden: { 
      opacity: 0,
      x: -20
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1]
      }
    },
    exit: { 
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.3,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  // Update page title based on active section
  useEffect(() => {
    const sectionTitles = {
      home: 'NEO-PORTFOLIO | Home',
      about: 'NEO-PORTFOLIO | About',
      projects: 'NEO-PORTFOLIO | Projects',
      contact: 'NEO-PORTFOLIO | Connect'
    };
    
    document.title = sectionTitles[activeSection];
  }, [activeSection]);

  return (
    <div className="w-full min-h-screen">
      <AnimatePresence mode="wait">
        {activeSection === 'home' && (
          <motion.div
            key="home"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <HeroSection />
          </motion.div>
        )}
        
        {activeSection === 'about' && (
          <motion.div
            key="about"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-screen flex items-center"
          >
            <AboutSection />
          </motion.div>
        )}
        
        {activeSection === 'projects' && (
          <motion.div
            key="projects"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-screen flex items-center"
          >
            <ProjectsSection />
          </motion.div>
        )}
        
        {activeSection === 'contact' && (
          <motion.div
            key="contact"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-screen flex items-center"
          >
            <ContactSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
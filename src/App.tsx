import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import LoadingScreen from './components/loading/LoadingScreen';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';
import Navigation from './components/navigation/Navigation';
import { AppProvider, useAppContext } from './context/AppContext';

// Main content component with optimized section management
const MainContent = () => {
  const { activeSection } = useAppContext();

  // Preload critical assets after initial render
  useEffect(() => {
    // Preload project images for instant Projects section loading
    const projectImages = [
      '/Portfolio/assets/call_agent.png',
      '/Portfolio/assets/avatar.png',
      '/Portfolio/assets/mutli_llm.png',
      'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg',
      'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg',
      'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
      'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg'
    ];

    // Start preloading images immediately
    projectImages.forEach(imageSrc => {
      const img = new Image();
      img.src = imageSrc;
    });

    // Preload EmailJS for contact section
    import('@emailjs/browser').catch(() => {
      console.log('EmailJS preload failed, will load on demand');
    });

    // Update page title based on active section
    const sectionTitles = {
      home: 'Rajbasheer Baig | Backend Engineer (Gen-AI)',
      about: 'About | Rajbasheer Baig', 
      projects: 'Projects | Rajbasheer Baig',
      contact: 'Contact | Rajbasheer Baig'
    };
    
    document.title = sectionTitles[activeSection];
  }, [activeSection]);

  return (
    <div className="relative w-full min-h-screen">
      {/* Navigation */}
      <Navigation />
      
      {/* All sections are always mounted, visibility controlled via CSS */}
      
      {/* Hero Section */}
      <motion.div
        className={`section-wrapper ${activeSection === 'home' ? 'section-active' : 'section-inactive'}`}
        animate={{
          opacity: activeSection === 'home' ? 1 : 0,
          pointerEvents: activeSection === 'home' ? 'auto' : 'none',
          zIndex: activeSection === 'home' ? 10 : 1
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <HeroSection />
      </motion.div>

      {/* About Section */}
      <motion.div
        className={`section-wrapper ${activeSection === 'about' ? 'section-active' : 'section-inactive'}`}
        animate={{
          opacity: activeSection === 'about' ? 1 : 0,
          pointerEvents: activeSection === 'about' ? 'auto' : 'none',
          zIndex: activeSection === 'about' ? 10 : 1
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <AboutSection />
      </motion.div>

      {/* Projects Section */}
      <motion.div
        className={`section-wrapper ${activeSection === 'projects' ? 'section-active' : 'section-inactive'}`}
        animate={{
          opacity: activeSection === 'projects' ? 1 : 0,
          pointerEvents: activeSection === 'projects' ? 'auto' : 'none',
          zIndex: activeSection === 'projects' ? 10 : 1
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <ProjectsSection />
      </motion.div>

      {/* Contact Section */}
      <motion.div
        className={`section-wrapper ${activeSection === 'contact' ? 'section-active' : 'section-inactive'}`}
        animate={{
          opacity: activeSection === 'contact' ? 1 : 0,
          pointerEvents: activeSection === 'contact' ? 'auto' : 'none',
          zIndex: activeSection === 'contact' ? 10 : 1
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <ContactSection />
      </motion.div>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let assetsLoaded = false;
    let minTimeElapsed = false;
    
    // Function to finish loading when both conditions are met
    const finishLoading = () => {
      if (assetsLoaded && minTimeElapsed) {
        setLoading(false);
      }
    };
    
    // Ensure minimum loading screen display time (for UX)
    const minDisplayTimer = setTimeout(() => {
      minTimeElapsed = true;
      finishLoading();
    }, 2000); // Show loading screen for at least 2 seconds
    
    // Real asset loading check
    const checkCriticalAssets = () => {
      // Check if critical fonts are loaded
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          assetsLoaded = true;
          finishLoading();
        });
      } else {
        // Fallback for older browsers
        setTimeout(() => {
          assetsLoaded = true;
          finishLoading();
        }, 500);
      }
    };

    // Start checking assets immediately
    checkCriticalAssets();
    
    // Maximum timeout as backup (if assets never load)
    const maxTimer = setTimeout(() => {
      assetsLoaded = true;
      minTimeElapsed = true;
      setLoading(false);
    }, 4000); // Maximum 4 seconds as absolute fallback
    
    return () => {
      clearTimeout(minDisplayTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  return (
    <AppProvider>
      <div className="min-h-screen bg-deep-space text-neon-blue overflow-x-hidden">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <Layout key="main">
            <MainContent />
          </Layout>
        )}
      </div>
    </AppProvider>
  );
}

export default App;
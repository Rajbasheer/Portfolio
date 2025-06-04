import { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleUser, Code, Mail, Home, Menu, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const navItems = [
  { id: 'home', label: 'HOME', icon: Home },
  { id: 'about', label: 'ABOUT', icon: CircleUser },
  { id: 'projects', label: 'PROJECTS', icon: Code },
  { id: 'contact', label: 'CONNECT', icon: Mail }
];

const Navigation = () => {
  const { activeSection, setActiveSection } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsOpen(false);
  };
  
  return (
    <>
      {/* Mobile Navigation Toggle */}
      <motion.button
        className="fixed top-4 right-4 z-[100] p-3 rounded-full bg-deep-space/80 backdrop-blur-md border border-neon-blue/20 text-neon-cyan md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-deep-space/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.nav
            className="relative h-full flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ul className="flex flex-col items-center gap-6">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <motion.li 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`group flex items-center gap-4 px-8 py-4 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-neon-purple/20 text-neon-cyan' 
                          : 'text-white/70 hover:bg-white/5'
                      }`}
                    >
                      <Icon 
                        size={24} 
                        className={`transition-colors duration-300 ${
                          isActive ? 'text-neon-cyan' : 'text-white/70 group-hover:text-white'
                        }`} 
                      />
                      <span className="text-xl font-medium">{item.label}</span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        </motion.div>
      )}
      
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 hidden md:block"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="bg-deep-space/30 backdrop-blur-md border border-neon-blue/20 rounded-full px-1 py-1">
          <ul className="flex items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`relative flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 ${
                      isActive ? 'text-deep-space' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"
                        layoutId="activeNavBackground"
                        transition={{ type: 'spring', duration: 0.6 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      <Icon size={16} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </motion.nav>
    </>
  );
};

export default Navigation;
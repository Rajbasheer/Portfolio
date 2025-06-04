import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Send, Globe, AtSign, MessageSquare } from 'lucide-react';

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setFormState({ name: '', email: '', message: '' });
      
      // Reset after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };
  
  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };
  
  return (
    <motion.section
      ref={ref}
      className="flex flex-col lg:flex-row gap-8 lg:gap-16 p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="lg:w-1/3">
        <motion.h2
          className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-neon-cyan to-neon-purple text-transparent bg-clip-text"
          initial={{ x: -50 }}
          animate={isInView ? { x: 0 } : { x: -50 }}
          transition={{ duration: 0.5 }}
        >
          ESTABLISH NEURAL LINK
        </motion.h2>
        
        <motion.div
          className="text-white/80 space-y-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="leading-relaxed">
            Ready to collaborate on your next-generation project? Connect with me through the quantum communication channel.
          </p>
          
          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              <div className="p-2 bg-neon-blue/10 rounded-full">
                <Globe size={20} className="text-neon-cyan" />
              </div>
              <span>Bangalore, India</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="p-2 bg-neon-blue/10 rounded-full">
                <AtSign size={20} className="text-neon-cyan" />
              </div>
              <span>rajbasheer.baig@future-dev.io</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="p-2 bg-neon-blue/10 rounded-full">
                <MessageSquare size={20} className="text-neon-cyan" />
              </div>
              <span>Connect on LinkedIn</span>
            </li>
          </ul>
        </motion.div>
      </div>
      
      <motion.div
        className="lg:w-2/3"
        variants={formVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 rounded-xl blur-xl" />
          
          <form 
            onSubmit={handleSubmit}
            className="relative bg-deep-space/90 backdrop-blur-md border border-neon-blue/20 rounded-xl p-6 md:p-8"
          >
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-neon-blue mb-2">
                YOUR IDENTITY
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="w-full bg-deep-space/60 border border-neon-blue/30 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-all duration-300"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-neon-blue mb-2">
                QUANTUM ADDRESS
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className="w-full bg-deep-space/60 border border-neon-blue/30 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-medium text-neon-blue mb-2">
                TRANSMISSION
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={5}
                className="w-full bg-deep-space/60 border border-neon-blue/30 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-all duration-300 resize-none"
                placeholder="What would you like to discuss?"
                required
              />
            </div>
            
            <div className="flex justify-end">
              <motion.button
                type="submit"
                className="relative overflow-hidden group flex items-center gap-2 bg-gradient-to-r from-neon-cyan to-neon-purple px-6 py-3 rounded-lg text-deep-space font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={formStatus === 'submitting'}
              >
                <span className="relative z-10">
                  {formStatus === 'idle' && 'TRANSMIT MESSAGE'}
                  {formStatus === 'submitting' && 'PROCESSING...'}
                  {formStatus === 'success' && 'TRANSMISSION COMPLETE'}
                  {formStatus === 'error' && 'TRANSMISSION FAILED'}
                </span>
                {formStatus === 'idle' && (
                  <Send size={16} className="relative z-10" />
                )}
                <span className="absolute right-full w-full h-full bg-white group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ContactSection;
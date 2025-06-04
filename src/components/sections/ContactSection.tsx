import { useState, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Send, MapPin, AtSign, Phone, Linkedin, Clock, CheckCircle, ExternalLink } from 'lucide-react';

// Lazy load the 3D component
const AI3DCanvas = lazy(() => import('../3d/AI3DCanvas'));

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    setTimeout(() => {
      setFormStatus('success');
      setFormState({ name: '', email: '', project: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };
  
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
          className="text-center mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-neon-cyan to-neon-purple text-transparent bg-clip-text">
            LET'S BUILD YOUR AI FUTURE
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto text-responsive">
            Ready to 10X your capabilities? Get your free AI strategy session.
          </p>
          
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 backdrop-blur-sm border border-neon-cyan/30 rounded-full px-3 py-2 mt-4">
            <Clock size={14} className="text-neon-cyan animate-pulse" />
            <span className="text-xs md:text-sm text-white font-medium">Available Now • Response in 4 Hours</span>
          </div>
        </motion.div>

        <div className="contact-grid">
          {/* Contact Content */}
          <div>
            <div className="contact-inner-grid">
              {/* Quick Connect */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg font-bold text-neon-cyan mb-4">INSTANT CONNECT</h3>
                
                <motion.a
                  href="tel:+18624052051"
                  className="block p-3 bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 backdrop-blur-sm border border-neon-purple/30 rounded-lg hover:border-neon-purple/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neon-purple/30 rounded-full">
                      <Phone size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm">Call Now</div>
                      <div className="text-xs text-white/70">(862) 405-2051</div>
                    </div>
                    <ExternalLink size={14} className="text-neon-purple" />
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:mrajbasheer@gmail.com"
                  className="block p-3 bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 backdrop-blur-sm border border-neon-cyan/30 rounded-lg hover:border-neon-cyan/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neon-cyan/30 rounded-full">
                      <AtSign size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm">Email Direct</div>
                      <div className="text-xs text-white/70">4hr response</div>
                    </div>
                    <ExternalLink size={14} className="text-neon-cyan" />
                  </div>
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/rajbasheerbaig-mogal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-deep-space/40 backdrop-blur-sm border border-neon-blue/20 rounded-lg hover:border-neon-blue/40 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neon-blue/30 rounded-full">
                      <Linkedin size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm">LinkedIn</div>
                      <div className="text-xs text-white/70">Professional network</div>
                    </div>
                    <ExternalLink size={14} className="text-neon-blue" />
                  </div>
                </motion.a>

                <div className="mt-4 p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/20">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={14} className="text-neon-purple" />
                    <span className="text-white font-medium text-sm">Harrison, NJ</span>
                  </div>
                  <div className="text-xs text-white/70">Remote & On-site Available</div>
                </div>

                <div className="space-y-2">
                  {['Free consultation', '24-48hr response', 'Proven ROI results'].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-white/80">
                      <CheckCircle size={12} className="text-neon-cyan" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                className="form-responsive"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <form 
                  onSubmit={handleSubmit}
                  className="bg-deep-space/80 backdrop-blur-md border border-neon-blue/20 rounded-xl p-4"
                >
                  <h3 className="text-base font-bold text-white mb-4">GET YOUR FREE AI STRATEGY SESSION</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-neon-blue mb-1">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full bg-deep-space/60 border border-neon-blue/30 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
                        placeholder="Full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-neon-blue mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full bg-deep-space/60 border border-neon-blue/30 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neon-blue mb-1">Project Interest</label>
                      <select
                        name="project"
                        value={formState.project}
                        onChange={handleChange}
                        className="w-full bg-deep-space/60 border border-neon-blue/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
                      >
                        <option value="">Select project type</option>
                        <option value="ai-voice-agent">AI Voice Agent</option>
                        <option value="llm-finetuning">LLM Fine-tuning</option>
                        <option value="chatbot">AI Chatbot</option>
                        <option value="backend-api">Backend APIs</option>
                        <option value="consulting">AI Consulting</option>
                        <option value="full-time">Full-time Role</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-neon-blue mb-1">Project Details *</label>
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-deep-space/60 border border-neon-blue/30 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 resize-none"
                        placeholder="Tell me about your project goals..."
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-4">
                    <motion.button
                      type="submit"
                      className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple px-4 py-3 rounded-lg text-deep-space font-bold text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={formStatus === 'submitting'}
                    >
                      {formStatus === 'idle' && 'GET FREE CONSULTATION'}
                      {formStatus === 'submitting' && 'SENDING...'}
                      {formStatus === 'success' && 'REQUEST SENT! 🚀'}
                    </motion.button>

                    <motion.a
                      href="tel:+18624052051"
                      className="w-full text-center px-4 py-3 rounded-lg border-2 border-neon-purple text-neon-purple hover:bg-neon-purple/10 transition-all duration-300 font-bold text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      CALL NOW
                    </motion.a>
                  </div>

                  {formStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 bg-neon-cyan/20 border border-neon-cyan/40 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-neon-cyan" />
                        <div>
                          <h4 className="font-bold text-white text-xs">Request Received!</h4>
                          <p className="text-xs text-white/80">I'll respond within 4 hours.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </div>
          </div>

          {/* 3D Visual - Hidden on mobile */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="w-full h-80 bg-deep-space/20 rounded-xl border border-neon-blue/20 flex items-center justify-center">
              <Suspense fallback={
                <div className="text-center">
                  <div className="w-12 h-12 border-2 border-neon-cyan/30 rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-xs text-white/60">Loading AI Visual...</p>
                </div>
              }>
                <AI3DCanvas className="w-full h-full" />
              </Suspense>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
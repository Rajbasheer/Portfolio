import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Send, MapPin, AtSign, Phone, Linkedin, CheckCircle, ExternalLink } from 'lucide-react';

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
      className="h-screen flex flex-col p-4 md:p-6 pt-24 md:pt-32"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple text-transparent bg-clip-text mb-2">
          LET'S BUILD YOUR AI FUTURE
        </h2>
        <p className="text-sm md:text-base text-white/70">
          Ready to 10X your capabilities? Get your free AI strategy session.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Column - Quick Connect */}
        <motion.div
          className="lg:col-span-3 flex flex-col justify-between"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-3">
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
                <ExternalLink size={14} className="text-neon-purple opacity-0 group-hover:opacity-100 transition-opacity" />
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
                  <div className="text-xs text-white/70">Quick Response</div>
                </div>
                <ExternalLink size={14} className="text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
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
                <ExternalLink size={14} className="text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          </div>

          <div className="mt-6 space-y-4">
            <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/20">
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={14} className="text-neon-purple" />
                <span className="text-white font-medium text-sm">Harrison, NJ</span>
              </div>
              <div className="text-xs text-white/70">Remote & On-site Available</div>
            </div>

            <div className="space-y-2">
              {['Free consultation', 'Proven ROI results', 'Enterprise solutions'].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-white/80">
                  <CheckCircle size={12} className="text-neon-cyan" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column - Form */}
        <motion.div
          className="lg:col-span-9"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-deep-space/80 backdrop-blur-md border border-neon-blue/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">GET YOUR FREE AI STRATEGY SESSION</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-neon-blue">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full h-10 bg-deep-space/60 border border-neon-blue/30 rounded-lg px-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-all duration-300"
                    placeholder="Full name"
                    required
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-neon-blue">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full h-10 bg-deep-space/60 border border-neon-blue/30 rounded-lg px-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neon-blue">Project Interest</label>
                <select
                  name="project"
                  value={formState.project}
                  onChange={handleChange}
                  className="w-full h-10 bg-deep-space/60 border border-neon-blue/30 rounded-lg px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-all duration-300"
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
              
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neon-blue">Project Details *</label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-deep-space/60 border border-neon-blue/30 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 resize-none transition-all duration-300"
                  placeholder="Tell me about your project goals..."
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <motion.button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-neon-cyan to-neon-purple px-6 py-3 rounded-lg text-deep-space font-bold text-sm hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formStatus === 'submitting'}
                >
                  <span className="flex items-center justify-center gap-2">
                    {formStatus === 'idle' && (
                      <>
                        GET FREE CONSULTATION
                        <Send size={14} className="transform -rotate-45" />
                      </>
                    )}
                    {formStatus === 'submitting' && 'SENDING...'}
                    {formStatus === 'success' && 'REQUEST SENT! 🚀'}
                  </span>
                </motion.button>

                <motion.a
                  href="tel:+18624052051"
                  className="sm:w-1/3 text-center px-6 py-3 rounded-lg border-2 border-neon-purple text-neon-purple hover:bg-neon-purple/10 transition-all duration-300 font-bold text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    CALL NOW
                    <Phone size={14} />
                  </span>
                </motion.a>
              </div>

              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-neon-cyan/20 border border-neon-cyan/40 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-neon-cyan" />
                    <div>
                      <h4 className="font-bold text-white text-xs">Request Received!</h4>
                      <p className="text-xs text-white/80">We'll get back to you shortly.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
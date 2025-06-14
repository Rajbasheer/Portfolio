import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Send, MapPin, AtSign, Phone, Linkedin, CheckCircle, ExternalLink, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface FormState {
  name: string;
  email: string;
  project: string;
  message: string;
}

const ContactSection = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!publicKey) {
        throw new Error('EmailJS public key is not configured');
      }

      if (!formRef.current) {
        throw new Error('Form reference is not available');
      }

      await emailjs.sendForm(
        'service_0v3fk6b',
        'template_b3anzxk',
        formRef.current,
        publicKey
      );

      setFormStatus('success');
      setFormState({ name: '', email: '', project: '', message: '' });
      
      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setFormStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
      
      // Reset error state after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
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
          className="mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple text-transparent bg-clip-text mb-2">
            LET'S BUILD YOUR AI FUTURE
          </h2>
          <p className="text-sm md:text-base text-white/70 mb-4">
            Ready to 10X your capabilities? Get your free AI strategy session.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="contact-grid">
          {/* Left Column - Quick Connect */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="contact-inner-grid">
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
                    <div className="text-xs text-white/70">Quick Response</div>
                  </div>
                  <ExternalLink size={14} className="text-neon-cyan" />
                </div>
              </motion.a>
            </div>

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

            <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/20">
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={16} className="text-neon-purple" />
                <span className="text-white font-medium text-sm">New York Metropolitan Area</span>
              </div>
              <div className="text-xs text-white/70">Remote & On-site Available</div>
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              {['Free consultation', 'Proven ROI results', 'Enterprise solutions'].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-white/80">
                  <CheckCircle size={12} className="text-neon-cyan" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Right Column - Form */}
          <motion.div
            className="bg-deep-space/80 backdrop-blur-md border border-neon-blue/20 rounded-xl p-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-bold text-white mb-6">GET YOUR FREE AI STRATEGY SESSION</h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  rows={4}
                  className="w-full bg-deep-space/60 border border-neon-blue/30 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 resize-none"
                  placeholder="Tell me about your project goals..."
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <motion.button
                  type="submit"
                  className={`flex-1 px-4 py-3 rounded-lg text-deep-space font-bold text-sm ${
                    formStatus === 'submitting' 
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90'
                  }`}
                  whileHover={formStatus !== 'submitting' ? { scale: 1.02 } : {}}
                  whileTap={formStatus !== 'submitting' ? { scale: 0.98 } : {}}
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'idle' && (
                    <span className="flex items-center justify-center gap-2">
                      GET FREE CONSULTATION
                      <Send size={16} />
                    </span>
                  )}
                  {formStatus === 'submitting' && 'SENDING...'}
                  {formStatus === 'success' && 'REQUEST SENT! 🚀'}
                  {formStatus === 'error' && 'FAILED TO SEND'}
                </motion.button>

                <motion.a
                  href="tel:+18624052051"
                  className="sm:w-1/3 text-center px-4 py-3 rounded-lg border-2 border-neon-purple text-neon-purple hover:bg-neon-purple/10 transition-all duration-300 font-bold text-sm"
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
                      <p className="text-xs text-white/80">We'll get back to you shortly.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 bg-red-500/20 border border-red-500/40 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle size={14} className="text-red-500" />
                    <div>
                      <h4 className="font-bold text-white text-xs">Error</h4>
                      <p className="text-xs text-white/80">{errorMessage}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
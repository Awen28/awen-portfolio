import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const contactLinks = [
  { icon: Mail, label: 'Email', value: 'info@awen28.com', href: 'mailto:info@awen28.com' },
  { icon: Phone, label: 'Phone', value: '+43 677 64059711', href: 'tel:+4367764059711' },
  { icon: MapPin, label: 'Location', value: 'Tirol, Austria', href: '#' },
];

// EmailJS configuration
// TODO: Replace these with your actual EmailJS credentials
const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID',     // e.g., 'service_abc123'
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',   // e.g., 'template_xyz789'
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',     // e.g., 'user_123abc'
};

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if EmailJS is configured
    if (EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID') {
      alert('EmailJS is not configured yet. Please check SETUP_EMAILJS.md for instructions.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current!,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', project: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 px-8"
      style={{ background: '#F5F3F0' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.15, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #E9CFB9 0%, transparent 70%)',
          }}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #B29F86 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-sm tracking-[0.3em] block mb-6"
            style={{ color: '#B29F86' }}
          >
            Get In Touch
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl leading-tight mb-6"
            style={{ color: '#525048' }}
          >
            Let us create
            <br />
            <span 
              className="italic"
              style={{ color: '#B29F86' }}
            >
              something amazing
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'rgba(82, 80, 72, 0.6)' }}
          >
            Whether you have a project in mind or just want to say hello, we would love to hear from you.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-serif text-3xl mb-10"
              style={{ color: '#525048' }}
            >
              Contact Information
            </motion.h3>
            <div className="space-y-6">
              {contactLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="group flex items-center gap-6 p-6 rounded-2xl transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(82, 80, 72, 0.06)',
                  }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ 
                      background: 'linear-gradient(135deg, #E9CFB920 0%, #B29F8615 100%)',
                      border: '1px solid rgba(178, 159, 134, 0.2)',
                    }}
                  >
                    <link.icon className="w-6 h-6" style={{ color: '#B29F86' }} />
                  </div>
                  <div>
                    <p 
                      className="text-sm mb-1"
                      style={{ color: 'rgba(82, 80, 72, 0.5)' }}
                    >
                      {link.label}
                    </p>
                    <p 
                      className="text-lg"
                      style={{ color: '#525048' }}
                    >
                      {link.value}
                    </p>
                  </div>
                  <ArrowRight 
                    className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                    style={{ color: '#B29F86' }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Quick response note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 p-6 rounded-2xl"
              style={{
                background: 'rgba(233, 207, 185, 0.2)',
                border: '1px solid rgba(178, 159, 134, 0.2)',
              }}
            >
              <p className="text-sm" style={{ color: 'rgba(82, 80, 72, 0.7)' }}>
                <strong>Quick Response Time:</strong> We typically reply within 24 hours during business days.
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="p-8 rounded-3xl"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(82, 80, 72, 0.06)',
                boxShadow: '0 30px 60px rgba(82, 80, 72, 0.06)',
              }}
            >
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl flex items-center gap-3"
                  style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' }}
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-green-700">
                    Message sent successfully! We will get back to you soon.
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl flex items-center gap-3"
                  style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                >
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm text-red-700">
                    Something went wrong. Please try again or email us directly.
                  </p>
                </motion.div>
              )}

              <div className="space-y-5">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm mb-2"
                    style={{ color: 'rgba(82, 80, 72, 0.6)' }}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl text-base transition-all duration-300 focus:outline-none"
                    style={{
                      background: 'rgba(82, 80, 72, 0.03)',
                      border: '1px solid rgba(82, 80, 72, 0.1)',
                      color: '#525048',
                    }}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm mb-2"
                    style={{ color: 'rgba(82, 80, 72, 0.6)' }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl text-base transition-all duration-300 focus:outline-none"
                    style={{
                      background: 'rgba(82, 80, 72, 0.03)',
                      border: '1px solid rgba(82, 80, 72, 0.1)',
                      color: '#525048',
                    }}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label 
                    htmlFor="project" 
                    className="block text-sm mb-2"
                    style={{ color: 'rgba(82, 80, 72, 0.6)' }}
                  >
                    Project Type *
                  </label>
                  <select
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl text-base transition-all duration-300 focus:outline-none cursor-pointer"
                    style={{
                      background: 'rgba(82, 80, 72, 0.03)',
                      border: '1px solid rgba(82, 80, 72, 0.1)',
                      color: '#525048',
                    }}
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="iOS App Development">iOS App Development</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Brand Identity">Brand Identity</option>
                    <option value="AI Integration">AI Integration</option>
                    <option value="Backend Development">Backend Development</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm mb-2"
                    style={{ color: 'rgba(82, 80, 72, 0.6)' }}
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-5 py-3.5 rounded-xl text-base transition-all duration-300 focus:outline-none resize-none"
                    style={{
                      background: 'rgba(82, 80, 72, 0.03)',
                      border: '1px solid rgba(82, 80, 72, 0.1)',
                      color: '#525048',
                    }}
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 py-4 rounded-xl flex items-center justify-center gap-3 text-base transition-all duration-300 disabled:opacity-70"
                style={{
                  background: '#525048',
                  color: '#FAF9F7',
                }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

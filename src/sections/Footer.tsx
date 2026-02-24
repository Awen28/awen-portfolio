import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer
      ref={sectionRef}
      className="relative pt-24 pb-8 px-8 overflow-hidden"
      style={{ background: '#E8E5E0' }}
    >
      {/* Large Background Text */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 right-0 text-center pointer-events-none select-none"
      >
        <span
          className="font-serif text-[18vw] leading-none block"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px rgba(82, 80, 72, 0.06)',
          }}
        >
          AWEN28
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto relative">
        {/* Top Section */}
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
              className="inline-block mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span 
                className="font-serif text-4xl tracking-tight"
                style={{ color: '#525048' }}
              >
                AWEN<span style={{ color: '#B29F86' }}>28</span>
              </span>
            </motion.a>
            <p 
              className="text-lg max-w-md mb-6"
              style={{ color: 'rgba(82, 80, 72, 0.6)' }}
            >
              Crafting exceptional digital experiences. From award-winning iOS apps to 
              conversion-focused websites and compelling brand identities.
            </p>
            <motion.a
              href="mailto:info@awen28.com"
              className="inline-flex items-center gap-2 text-lg transition-colors"
              style={{ color: '#B29F86' }}
              whileHover={{ x: 5 }}
            >
              info@awen28.com
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Navigation */}
          <div>
            <h4 
              className="text-sm tracking-widest uppercase mb-6"
              style={{ color: 'rgba(82, 80, 72, 0.4)' }}
            >
              Navigation
            </h4>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="block text-lg"
                  style={{ color: 'rgba(82, 80, 72, 0.7)' }}
                  whileHover={{ x: 5, color: '#525048' }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 
              className="text-sm tracking-widest uppercase mb-6"
              style={{ color: 'rgba(82, 80, 72, 0.4)' }}
            >
              Services
            </h4>
            <nav className="space-y-3">
              {['iOS Development', 'Web Design', 'Brand Identity', 'AI Integration', 'Backend'].map((service) => (
                <motion.a
                  key={service}
                  href="#services"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#services'); }}
                  className="block text-lg"
                  style={{ color: 'rgba(82, 80, 72, 0.7)' }}
                  whileHover={{ x: 5, color: '#525048' }}
                >
                  {service}
                </motion.a>
              ))}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div 
          className="h-px mb-8"
          style={{ background: 'rgba(82, 80, 72, 0.1)' }}
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p 
            className="text-sm"
            style={{ color: 'rgba(82, 80, 72, 0.4)' }}
          >
            © {new Date().getFullYear()} AWEN28. All rights reserved.
          </p>
          {/* Legal Links - Small and unobtrusive */}
          <div className="flex items-center gap-4 text-[10px] tracking-wide">
            <Link
              to="/impressum"
              className="transition-colors hover:text-[#525048]"
              style={{ color: 'rgba(82, 80, 72, 0.35)' }}
            >
              Impressum
            </Link>
            <span style={{ color: 'rgba(82, 80, 72, 0.2)' }}>|</span>
            <Link
              to="/datenschutz"
              className="transition-colors hover:text-[#525048]"
              style={{ color: 'rgba(82, 80, 72, 0.35)' }}
            >
              Datenschutz
            </Link>
            <span style={{ color: 'rgba(82, 80, 72, 0.2)' }}>|</span>
            <Link
              to="/cookies"
              className="transition-colors hover:text-[#525048]"
              style={{ color: 'rgba(82, 80, 72, 0.35)' }}
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

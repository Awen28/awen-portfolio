import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUp, Heart } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { label: 'Home', href: '#hero' },
        { label: 'Apps', href: '#apps' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
      ]
    },
    {
      title: 'Apps',
      links: [
        { label: 'NumiStellar', href: 'https://www.awen28.com/awenya' },
        { label: 'Awenya', href: 'https://www.awen28.com/awenya' },
        { label: 'VisAI', href: 'https://www.awen28.com/visai' },
        { label: 'SureMate', href: 'https://www.awen28.com/suremate-pro' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Impressum', href: '/impressum' },
        { label: 'Datenschutz', href: '/datenschutz' },
        { label: 'Cookie Policy', href: '/cookie-policy' },
      ]
    },
    {
      title: 'Connect',
      links: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thomas-mayrl-719267bb' },
        { label: 'E-Mail', href: 'mailto:info@awen28.com' },
      ]
    }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-border/30">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="inline-block text-3xl font-light tracking-[0.3em] text-primary mb-6"
              whileHover={{ scale: 1.05 }}
            >
              AWEN28
            </motion.a>
            <p className="text-muted-foreground leading-relaxed max-w-sm mb-6">
              Independent developer creating innovative experiences 
              that inspire, empower, and transform everyday life.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>and lots of coffee</span>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="text-sm font-medium text-foreground uppercase tracking-wider mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors line-animate"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="text-muted-foreground hover:text-primary transition-colors line-animate"
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border/30 gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} AWEN28. All rights reserved.
          </p>

          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Back to top</span>
            <motion.div
              className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center group-hover:border-primary/50 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUp className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </footer>
  );
};

export default Footer;

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ChevronDown, Sparkles } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animation
      gsap.fromTo('.logo-letter',
        { opacity: 0, y: 50, rotateX: -90 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
          delay: 0.5
        }
      );

      // Subtitle animation
      gsap.fromTo('.hero-subtitle',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: 'power3.out',
          delay: 1.5
        }
      );

      // Decorative elements
      gsap.fromTo('.hero-decoration',
        { opacity: 0, scale: 0 },
        { 
          opacity: 1, 
          scale: 1,
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
          delay: 2
        }
      );

      // Floating orbs
      gsap.to('.floating-orb', {
        y: -30,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const appsSection = document.querySelector('#apps');
    if (appsSection) {
      appsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="floating-orb absolute top-1/4 left-1/4 w-4 h-4 bg-primary/30 rounded-full blur-sm" />
        <div className="floating-orb absolute top-1/3 right-1/3 w-6 h-6 bg-primary/20 rounded-full blur-sm" />
        <div className="floating-orb absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary/40 rounded-full blur-sm" />
        <div className="floating-orb absolute top-2/3 right-1/4 w-5 h-5 bg-primary/25 rounded-full blur-sm" />
        
        {/* Gradient rings */}
        <motion.div 
          className="hero-decoration absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="hero-decoration absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="hero-decoration absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/15 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 text-center px-4"
        style={{ opacity, scale, y }}
      >
        {/* Logo */}
        <div ref={logoRef} className="mb-8 perspective-1000">
          <div className="flex items-center justify-center gap-1 text-6xl sm:text-8xl md:text-9xl font-extralight tracking-tight">
            {'AWEN28'.split('').map((letter, index) => (
              <motion.span
                key={index}
                className={`logo-letter inline-block ${
                  letter === '2' || letter === '8' 
                    ? 'text-primary' 
                    : 'text-foreground'
                }`}
                style={{ 
                  textShadow: '0 0 80px rgba(212, 197, 176, 0.3)',
                }}
                whileHover={{ 
                  scale: 1.1, 
                  color: '#d4c5b0',
                  transition: { duration: 0.2 }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <motion.div 
          className="hero-subtitle flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex items-center gap-3 text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm tracking-[0.3em] uppercase">Independent Developer</span>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          
          <p className="max-w-xl text-lg text-muted-foreground/80 font-light leading-relaxed">
            Creating innovative experiences that inspire, 
            <br className="hidden sm:block" />
            empower, and transform everyday life.
          </p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <motion.a
              href="#apps"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#apps')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-8 py-4 bg-primary text-background font-medium rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Explore the Apps</span>
              <motion.div
                className="absolute inset-0 bg-foreground"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border border-primary/30 text-primary font-medium rounded-full hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        onClick={handleScrollDown}
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l border-t border-primary/20" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r border-t border-primary/20" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l border-b border-primary/20" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r border-b border-primary/20" />
    </section>
  );
};

export default Hero;

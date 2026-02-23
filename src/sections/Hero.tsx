import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const words = ['AWEN', 'DIGITAL', 'STUDIO'];
const subtitleWords = ['iOS', 'Web', 'Brand', 'AI'];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation for mouse
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  // Title rotation follows mouse
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);

  // 28 shadow moves OPPOSITE to title (parallax)
  const shadowX = useTransform(smoothMouseX, [-0.5, 0.5], [35, -35]);
  const shadowY = useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]);
  const shadowRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [-3, 3]);
  const shadowRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [3, -3]);

  // Background parallax
  const bgX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const bgY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!e.beta || !e.gamma) return;
      const x = Math.min(Math.max(e.gamma / 45, -0.5), 0.5);
      const y = Math.min(Math.max(e.beta / 45, -0.5), 0.5);
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [mouseX, mouseY]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#FAF9F7' }}
    >
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ x: bgX, y: bgY }}
      >
        <motion.div 
          className="absolute top-[15%] left-[15%] w-[400px] h-[400px] rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: 'radial-gradient(circle, rgba(233,207,185,0.4) 0%, transparent 70%)',
          }}
        />
        <motion.div 
          className="absolute bottom-[25%] right-[10%] w-[350px] h-[350px] rounded-full"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{
            background: 'radial-gradient(circle, rgba(178,159,134,0.3) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 right-20 w-16 h-16 rounded-full border-2 opacity-15"
        style={{ 
          borderColor: '#B29F86',
          x: useTransform(smoothMouseX, [-0.5, 0.5], [15, -15]),
          y: useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]),
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <span 
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm tracking-wider uppercase"
            style={{ 
              background: 'rgba(178, 159, 134, 0.1)',
              color: '#B29F86',
              border: '1px solid rgba(178, 159, 134, 0.2)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#B29F86] animate-pulse" />
            Full-service Digital Studio
          </span>
        </motion.div>

        {/* Main Title with 28 - Stamped/Embossed Effect */}
        <div className="relative mb-6" style={{ perspective: '1000px' }}>
          {/* 28 - Claymorphism Extruded/Stamped Effect - Coming OUT of background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              x: shadowX,
              y: shadowY,
              rotateX: shadowRotateX,
              rotateY: shadowRotateY,
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          >
            <span
              className="font-serif text-[18rem] md:text-[22rem] lg:text-[26rem] font-bold"
              style={{
                color: '#F5F3F0',
                // Extruded/Coming out of background effect with Claymorphism
                textShadow: `
                  /* Multiple shadow layers for depth - coming OUT */
                  /* Deepest shadow */
                  2px 2px 0px rgba(82, 80, 72, 0.03),
                  4px 4px 0px rgba(82, 80, 72, 0.03),
                  /* Main clay shadow */
                  8px 8px 16px rgba(82, 80, 72, 0.12),
                  12px 12px 24px rgba(82, 80, 72, 0.08),
                  16px 16px 32px rgba(82, 80, 72, 0.04),
                  /* Soft outer glow */
                  20px 20px 40px rgba(82, 80, 72, 0.02),
                  /* Inner clay highlight - top left (extruded feel) */
                  -2px -2px 4px rgba(255, 255, 255, 0.95),
                  -4px -4px 8px rgba(255, 255, 255, 0.7),
                  /* Subtle inner shadow for thickness */
                  inset -2px -2px 4px rgba(82, 80, 72, 0.05),
                  inset 2px 2px 4px rgba(255, 255, 255, 0.9)
                `,
                opacity: 0.98,
              }}
            >
              28
            </span>
          </motion.div>

          {/* Main Title AWEN */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="overflow-hidden">
              {words.map((word, wordIndex) => (
                <div key={wordIndex} className="flex justify-center gap-1 md:gap-3 mb-1">
                  {word.split('').map((letter, letterIndex) => (
                    <motion.span
                      key={letterIndex}
                      initial={{ y: 100, opacity: 0 }}
                      animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                      transition={{
                        duration: 0.7,
                        delay: 0.3 + wordIndex * 0.08 + letterIndex * 0.04,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      whileHover={{
                        scale: 1.15,
                        color: '#B29F86',
                        transition: { duration: 0.2 },
                      }}
                      className="font-serif text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11rem] font-light cursor-default inline-block"
                      style={{ 
                        color: '#525048',
                        textShadow: '0 20px 40px rgba(82, 80, 72, 0.08)',
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Animated Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-3 md:gap-5 mb-10"
        >
          {subtitleWords.map((word, idx) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, x: -15 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 + idx * 0.1 }}
              whileHover={{ 
                scale: 1.1, 
                color: '#B29F86',
                transition: { duration: 0.2 }
              }}
              className="text-lg md:text-xl font-light cursor-default px-3 py-1 rounded-full transition-colors"
              style={{ color: '#525048' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Description with highlighted keywords */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          style={{ color: '#525048' }}
        >
          We craft exceptional{' '}
          <span 
            className="font-medium px-2 py-0.5 rounded-md mx-1"
            style={{ 
              background: 'rgba(178, 159, 134, 0.12)',
            }}
          >
            iOS apps
          </span>
          ,{' '}
          <span 
            className="font-medium px-2 py-0.5 rounded-md mx-1"
            style={{ 
              background: 'rgba(233, 207, 185, 0.4)',
            }}
          >
            websites
          </span>
          , and{' '}
          <span 
            className="font-medium px-2 py-0.5 rounded-md mx-1"
            style={{ 
              background: 'rgba(232, 229, 224, 0.7)',
            }}
          >
            brand identities
          </span>
          {' '}that drive growth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => handleNavClick('#contact')}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(82, 80, 72, 0.12)' }}
            whileTap={{ scale: 0.98 }}
            className="group px-8 py-4 rounded-full flex items-center gap-3 text-sm tracking-wider uppercase transition-all duration-300"
            style={{
              background: '#525048',
              color: '#FAF9F7',
            }}
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button
            onClick={() => handleNavClick('#work')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full text-sm tracking-wider uppercase transition-all duration-300 border-2"
            style={{
              borderColor: 'rgba(82, 80, 72, 0.2)',
              color: '#525048',
            }}
          >
            View Our Work
          </motion.button>
        </motion.div>

        {/* Service Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-wrap justify-center gap-3 mt-14"
        >
          {['iOS Development', 'Web Design', 'Brand Identity', 'AI Integration', 'Backend'].map((service, idx) => (
            <motion.span
              key={service}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.8 + idx * 0.08 }}
              whileHover={{ 
                scale: 1.08, 
                y: -2,
                background: 'rgba(178, 159, 134, 0.12)',
                transition: { duration: 0.2 }
              }}
              style={{
                background: 'rgba(82, 80, 72, 0.03)',
                color: '#525048',
                border: '1px solid rgba(82, 80, 72, 0.06)',
              }}
              className="px-4 py-2 rounded-full text-xs cursor-default backdrop-blur-sm"
            >
              {service}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => handleNavClick('#services')}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          className="flex flex-col items-center gap-2 group"
        >
          <span 
            className="text-xs tracking-widest uppercase opacity-35 group-hover:opacity-60 transition-opacity"
            style={{ color: '#525048' }}
          >
            Scroll
          </span>
          <ChevronDown 
            className="w-5 h-5 transition-colors"
            style={{ color: '#B29F86' }}
          />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;

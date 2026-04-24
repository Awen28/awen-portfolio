import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Rocket, Star, Zap, Target, Globe, ChevronRight, Download, Sparkles, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const features = [
  {
    icon: Rocket,
    title: 'Epic Space Journey',
    description: 'Navigate through stunning cosmic environments. Dodge asteroids and collect power-ups.',
  },
  {
    icon: Target,
    title: 'Precision Controls',
    description: 'Intuitive one-touch controls. Easy to learn, challenging to master.',
  },
  {
    icon: Zap,
    title: 'Power-Ups',
    description: 'Collect shields, speed boosts, and special abilities to survive longer.',
  },
  {
    icon: Star,
    title: 'High Scores',
    description: 'Compete with friends and climb the global leaderboard.',
  },
  {
    icon: Globe,
    title: 'Infinite Levels',
    description: 'Procedurally generated levels. Every run is a new adventure.',
  },
  {
    icon: Sparkles,
    title: 'Stunning Visuals',
    description: 'Beautiful space graphics with particle effects and smooth animations.',
  },
];

// Easter egg components
const FloatingStar = ({ delay, size = 'small' }: { delay: number; size?: 'small' | 'medium' | 'large' }) => {
  const sizeClass = size === 'small' ? 'w-2 h-2' : size === 'medium' ? 'w-3 h-3' : 'w-4 h-4';
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: [0, 1, 0],
        y: [0, -100],
        x: [0, Math.random() * 40 - 20],
        scale: [0.5, 1, 0.5],
      }}
      transition={{ 
        duration: 4 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "easeOut"
      }}
      className="absolute pointer-events-none z-10"
      style={{ left: `${Math.random() * 100}%`, top: '80%' }}
    >
      <Star className={sizeClass} style={{ color: '#B29F86', fill: '#B29F86' }} />
    </motion.div>
  );
};

const OrbitingPlanet = ({ size, color, duration, delay }: { size: number; color: string; duration: number; delay: number }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    className="absolute pointer-events-none"
    style={{ 
      left: `${10 + Math.random() * 80}%`, 
      top: `${10 + Math.random() * 80}%`,
    }}
  >
    <div 
      className="rounded-full"
      style={{ 
        width: size, 
        height: size, 
        background: color,
        boxShadow: `0 0 ${size}px ${color}`,
      }}
    />
  </motion.div>
);

const ShootingStar = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -100, y: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      x: [-100, 300],
      y: [0, 150],
    }}
    transition={{ 
      duration: 2,
      delay,
      repeat: Infinity,
      repeatDelay: 5,
    }}
    className="absolute pointer-events-none z-10"
    style={{ left: '10%', top: '20%' }}
  >
    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />
  </motion.div>
);

const Orbit = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBackClick = () => {
    sessionStorage.setItem('orbitScrollPosition', window.scrollY.toString());
  };

  return (
    <div className="min-h-screen" style={{ background: '#FAF9F7' }}>
      <SEO 
        title="Orbit | Space Adventure Game"
        description="Orbit - An epic space journey. Navigate through stunning cosmic environments, dodge asteroids, and collect power-ups. The ultimate mobile space game."
        keywords="space game, mobile game, iOS game, arcade game, space adventure, orbit game, cosmic journey"
        ogImage="/apps/orbit_gameplay1.png"
        appName="Orbit"
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-8 backdrop-blur-md" style={{ background: 'rgba(250, 249, 247, 0.9)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" onClick={handleBackClick} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(82, 80, 72, 0.6)' }}>
            <ArrowLeft className="w-4 h-4" />
            Back to AWEN28
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
              <Circle className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl" style={{ color: '#525048' }}>Orbit</span>
          </div>
        </div>
      </header>

      {/* Hero with Easter Eggs */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-32 pb-20 px-6 md:px-8 overflow-hidden min-h-screen flex items-center"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f1e 100%)' }} />
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(178, 159, 134, 0.3) 0%, transparent 70%)' }}
          />
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(233, 207, 185, 0.2) 0%, transparent 70%)' }}
          />
        </div>

        {/* Easter Eggs - Stars */}
        {[...Array(15)].map((_, i) => (
          <FloatingStar key={i} delay={i * 0.3} size={i % 3 === 0 ? 'large' : i % 2 === 0 ? 'medium' : 'small'} />
        ))}

        {/* Easter Eggs - Planets */}
        <OrbitingPlanet size={60} color="rgba(178, 159, 134, 0.3)" duration={20} delay={0} />
        <OrbitingPlanet size={40} color="rgba(233, 207, 185, 0.2)" duration={30} delay={5} />
        <OrbitingPlanet size={80} color="rgba(82, 80, 72, 0.15)" duration={25} delay={10} />

        {/* Easter Eggs - Shooting Stars */}
        <ShootingStar delay={0} />
        <ShootingStar delay={7} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-serif italic text-sm tracking-[0.3em] block mb-4" 
                style={{ color: '#B29F86' }}
              >
                iOS Game
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-5xl md:text-7xl leading-tight mb-6 text-white"
              >
                Your Epic
                <br />
                <motion.span 
                  className="italic"
                  style={{ color: '#B29F86' }}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Space Journey
                </motion.span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl mb-8 max-w-lg text-white/70"
              >
                Navigate through stunning cosmic environments. Dodge asteroids, collect power-ups, 
                and survive as long as you can in this addictive space adventure.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="https://apps.apple.com/at/app/orbit/idXXXXXXXXX"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{ background: '#B29F86', color: 'white' }}
                >
                  <Download className="w-5 h-5" />
                  Download on App Store
                </a>
                <Link
                  to="/#work"
                  onClick={handleBackClick}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105 border border-white/20 text-white"
                >
                  View More Apps
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Phone Mockup with parallax */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 60px rgba(178, 159, 134, 0.3)',
                    '0 0 80px rgba(178, 159, 134, 0.5)',
                    '0 0 60px rgba(178, 159, 134, 0.3)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative p-4 rounded-[50px]"
                style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}
              >
                <div className="relative rounded-[40px] overflow-hidden" style={{ aspectRatio: '9/19.5', maxWidth: '280px' }}>
                  <img 
                    src="/apps/orbit_gameplay1.png" 
                    alt="Orbit Gameplay"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <section ref={sectionRef} className="py-20 px-6 md:px-8" style={{ background: '#E8E5E0' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="font-serif italic text-sm tracking-[0.3em] block mb-4"
              style={{ color: '#B29F86' }}
            >
              Features
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="font-serif text-4xl md:text-5xl"
              style={{ color: '#525048' }}
            >
              Explore the Cosmos
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="p-8 rounded-3xl group cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(82, 80, 72, 0.06)',
                  boxShadow: '0 30px 60px rgba(82, 80, 72, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                }}
              >
                <motion.div 
                  whileHover={{ rotate: 10 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ 
                    background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                    boxShadow: '0 8px 20px rgba(26, 26, 46, 0.25)',
                  }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="font-serif text-xl mb-3" style={{ color: '#525048' }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(82, 80, 72, 0.6)' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery with Easter Eggs */}
      <section className="relative py-20 px-6 md:px-8 overflow-hidden">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none z-0"
          style={{ background: 'radial-gradient(circle, rgba(178, 159, 134, 0.4) 0%, transparent 60%)' }}
        />

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 2 + i * 0.3, delay: i * 0.2, repeat: Infinity }}
            className="absolute w-3 h-3 rounded-full pointer-events-none z-10"
            style={{ 
              background: '#B29F86',
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
              boxShadow: '0 0 10px rgba(178, 159, 134, 0.5)',
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.span className="font-serif italic text-sm tracking-[0.3em] block mb-4" style={{ color: '#B29F86' }}>
              Gameplay
            </motion.span>
            <motion.h2 className="font-serif text-4xl md:text-5xl" style={{ color: '#525048' }}>
              Action-Packed Adventure
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { src: '/apps/orbit_gameplay1.png', alt: 'Epic Space Journey' },
              { src: '/apps/orbit_gameplay2.png', alt: 'Dodge Asteroids' },
              { src: '/apps/orbit_gameplay3.png', alt: 'Collect Power-ups' },
            ].map((screenshot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="relative rounded-2xl overflow-hidden group"
                style={{ 
                  aspectRatio: '9/16',
                  maxHeight: '400px',
                  boxShadow: '0 20px 40px rgba(82, 80, 72, 0.08), 0 4px 8px rgba(82, 80, 72, 0.04)',
                  border: '1px solid rgba(82, 80, 72, 0.06)',
                }}
              >
                <img 
                  src={screenshot.src} 
                  alt={screenshot.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-sm font-medium">{screenshot.alt}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-8" style={{ background: '#E8E5E0' }}>
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-16 rounded-[40px] overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f1e 100%)' }}
          >
            <div className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(ellipse at top, rgba(178, 159, 134, 0.3), transparent 50%)' }} />
            
            <motion.div
              animate={{ boxShadow: ['inset 0 0 30px rgba(178, 159, 134, 0.1)', 'inset 0 0 60px rgba(178, 159, 134, 0.2)', 'inset 0 0 30px rgba(178, 159, 134, 0.1)'] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-[40px]"
            />

            <div className="relative z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #B29F86, #E9CFB9)' }}
              >
                <Rocket className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
                Start Your Journey
              </h2>
              <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
                Download Orbit now and begin your epic space adventure. 
                How long can you survive?
              </p>
              <motion.a
                href="https://apps.apple.com/at/app/orbit/idXXXXXXXXX"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all"
                style={{ background: 'white', color: '#1a1a2e' }}
              >
                <Download className="w-5 h-5" />
                Get Orbit
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-8" style={{ background: '#E8E5E0' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
              <Circle className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl" style={{ color: '#525048' }}>Orbit</span>
          </div>
          <p className="text-sm" style={{ color: 'rgba(82, 80, 72, 0.5)' }}>
            © 2026 Orbit. A product by AWEN28.
          </p>
          <Link to="/" onClick={handleBackClick} className="flex items-center gap-2 text-sm" style={{ color: '#2a2a2a' }}>
            Visit AWEN28
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Orbit;

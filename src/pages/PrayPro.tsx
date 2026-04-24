import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles, BookOpen, Moon, Sun, ChevronRight, Download, Cross, Church, Bird } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const features = [
  {
    icon: Heart,
    title: 'Personal Prayers',
    description: 'Create and save your own prayers. Keep track of your spiritual journey.',
  },
  {
    icon: BookOpen,
    title: 'Bible Verses',
    description: 'Daily inspiring Bible verses to guide your prayer time and meditation.',
  },
  {
    icon: Moon,
    title: 'Evening Reflections',
    description: 'End your day with guided evening prayers and peaceful meditation.',
  },
  {
    icon: Sun,
    title: 'Morning Blessings',
    description: 'Start each day with uplifting morning prayers and divine inspiration.',
  },
  {
    icon: Cross,
    title: 'Sacred Collection',
    description: 'Curated collection of traditional prayers, psalms, and blessings.',
  },
  {
    icon: Sparkles,
    title: 'Beautiful Art',
    description: 'Stunning religious artwork and angelic imagery to inspire devotion.',
  },
];

// Easter egg particles
const FloatingCross = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ 
      opacity: [0, 1, 0],
      y: [0, -150],
      x: [0, Math.random() * 60 - 30],
    }}
    transition={{ 
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeOut"
    }}
    className="absolute pointer-events-none z-10"
    style={{ left: `${10 + Math.random() * 80}%`, top: '70%' }}
  >
    <Cross className="w-6 h-6" style={{ color: '#B29F86', opacity: 0.6 }} />
  </motion.div>
);

const FloatingBird = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ 
      opacity: [0, 0.8, 0],
      x: [-100, 400],
      y: [0, Math.random() * 50 - 25],
    }}
    transition={{ 
      duration: 10,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
    className="absolute pointer-events-none z-10"
    style={{ left: '0%', top: `${15 + Math.random() * 50}%` }}
  >
    <Bird className="w-8 h-8" style={{ color: '#E9CFB9', opacity: 0.5 }} />
  </motion.div>
);

// Light ray effect
const LightRay = ({ angle, delay }: { angle: number; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scaleY: 0 }}
    animate={{ 
      opacity: [0, 0.4, 0],
      scaleY: [0, 1, 0.9],
    }}
    transition={{ 
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute top-0 pointer-events-none origin-top z-0"
    style={{ 
      left: '50%',
      width: '3px',
      height: '50vh',
      background: 'linear-gradient(to bottom, rgba(233, 207, 185, 0.8), transparent)',
      transform: `rotate(${angle}deg)`,
      transformOrigin: 'top center',
      filter: 'blur(1px)',
    }}
  />
);

const PrayPro = () => {
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
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  // Restore scroll position when returning
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('prayproScrollPosition');
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
      sessionStorage.removeItem('prayproScrollPosition');
    }
  }, []);

  const handleBackClick = () => {
    sessionStorage.setItem('prayproScrollPosition', window.scrollY.toString());
  };

  // Parallax mouse effect
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

  return (
    <div className="min-h-screen" style={{ background: '#FAF9F7' }}>
      <SEO 
        title="PrayPro | Your Daily Prayer Companion"
        description="PrayPro - Deepen your faith with daily prayers, Bible verses, and beautiful sacred art. Your personal companion for spiritual growth."
        keywords="prayer app, daily prayer, Bible verses, Christian app, meditation, spiritual growth, faith"
        ogImage="/apps/pray_home.png"
        appName="PrayPro"
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-8 backdrop-blur-md" style={{ background: 'rgba(250, 249, 247, 0.9)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            onClick={handleBackClick}
            className="flex items-center gap-2 text-sm"
            style={{ color: 'rgba(82, 80, 72, 0.6)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to AWEN28
          </Link>
          <div className="flex items-center gap-3">
            <img src="/apps/praypro_logo.png" alt="PrayPro" className="w-8 h-8 rounded-lg" />
            <span className="font-serif text-xl" style={{ color: '#525048' }}>PrayPro</span>
          </div>
        </div>
      </header>

      {/* Hero with Easter Eggs */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative pt-32 pb-20 px-6 md:px-8 overflow-hidden"
      >
        {/* Light rays Easter Egg */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <LightRay angle={-15} delay={0} />
          <LightRay angle={-5} delay={0.5} />
          <LightRay angle={0} delay={1} />
          <LightRay angle={5} delay={1.5} />
          <LightRay angle={15} delay={2} />
        </div>

        {/* Floating crosses Easter Egg */}
        {[...Array(8)].map((_, i) => (
          <FloatingCross key={i} delay={i * 1.5} />
        ))}

        {/* Floating birds Easter Egg */}
        {[...Array(5)].map((_, i) => (
          <FloatingBird key={i} delay={i * 3} />
        ))}

        <div className="max-w-7xl mx-auto relative">
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
                iOS App
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-5xl md:text-7xl leading-tight mb-6" 
                style={{ color: '#525048' }}
              >
                Your Daily
                <br />
                <motion.span 
                  className="italic" 
                  style={{ color: '#B29F86' }}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Prayer Companion
                </motion.span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl mb-8 max-w-lg" 
                style={{ color: 'rgba(82, 80, 72, 0.7)' }}
              >
                Deepen your faith with daily prayers, Bible verses, and beautiful sacred art. 
                Your personal space for spiritual growth and devotion.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="https://apps.apple.com/us/app/praypro/id6761731709"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{ background: '#525048', color: '#FAF9F7' }}
                >
                  <Download className="w-5 h-5" />
                  Download on App Store
                </a>
                <Link
                  to="/#work"
                  onClick={handleBackClick}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{ background: 'transparent', color: '#525048', border: '1px solid rgba(82, 80, 72, 0.2)' }}
                >
                  View More Apps
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Single Phone Mockup with parallax */}
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
              {/* Claymorphism layers */}
              <motion.div
                animate={{ 
                  boxShadow: [
                    '20px 20px 60px rgba(178, 159, 134, 0.2), -20px -20px 60px rgba(255, 255, 255, 0.8)',
                    '25px 25px 70px rgba(178, 159, 134, 0.25), -25px -25px 70px rgba(255, 255, 255, 0.9)',
                    '20px 20px 60px rgba(178, 159, 134, 0.2), -20px -20px 60px rgba(255, 255, 255, 0.8)',
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative p-4 rounded-[50px]"
                style={{ background: '#FAF9F7' }}
              >
                {/* Outer glow */}
                <div 
                  className="absolute -inset-4 rounded-[60px] -z-10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(233, 207, 185, 0.4), rgba(178, 159, 134, 0.2))',
                    filter: 'blur(30px)',
                  }}
                />
                <div className="relative rounded-[40px] overflow-hidden" style={{ aspectRatio: '9/19.5', maxWidth: '280px' }}>
                  <img 
                    src="/apps/pray_home.png" 
                    alt="PrayPro Home Screen"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features with better Claymorphism */}
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
              Nourish Your Soul
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
                  boxShadow: `
                    0 30px 60px rgba(82, 80, 72, 0.06),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8)
                  `,
                }}
              >
                <motion.div 
                  whileHover={{ rotate: 10 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ 
                    background: 'linear-gradient(135deg, #E9CFB9, #B29F86)',
                    boxShadow: '0 8px 20px rgba(178, 159, 134, 0.25)',
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
        {/* Background glow Easter Egg */}
        <motion.div
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle, rgba(233, 207, 185, 0.6) 0%, transparent 60%)',
          }}
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{ 
              duration: 2 + i * 0.3,
              delay: i * 0.2,
              repeat: Infinity,
            }}
            className="absolute w-3 h-3 rounded-full pointer-events-none z-10"
            style={{ 
              background: '#B29F86',
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
              boxShadow: '0 0 10px rgba(178, 159, 134, 0.5)',
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif italic text-sm tracking-[0.3em] block mb-4" 
              style={{ color: '#B29F86' }}
            >
              Sacred Art
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl" 
              style={{ color: '#525048' }}
            >
              Inspired by the Divine
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {[
              { src: '/apps/pray_home.png', alt: 'Home' },
              { src: '/apps/pray_dailyverse.png', alt: 'Verse' },
              { src: '/apps/pray_collection.png', alt: 'Collection' },
              { src: '/apps/pray_detailview.png', alt: 'Detail' },
              { src: '/apps/pray_create_prayer.png', alt: 'Create' },
              { src: '/apps/pray_createverse_image.png', alt: 'Verse+' },
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
                  maxHeight: '280px',
                  boxShadow: `
                    0 20px 40px rgba(82, 80, 72, 0.08),
                    0 4px 8px rgba(82, 80, 72, 0.04)
                  `,
                  border: '1px solid rgba(82, 80, 72, 0.06)',
                }}
              >
                <img 
                  src={screenshot.src} 
                  alt={screenshot.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-medium">{screenshot.alt}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with Easter Eggs */}
      <section className="py-20 px-6 md:px-8" style={{ background: '#E8E5E0' }}>
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Church silhouette Easter Egg */}
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-0"
          >
            <Church className="w-40 h-40" style={{ color: '#B29F86', opacity: 0.3 }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-16 rounded-[40px] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #2a2a2a 0%, #3d3d3d 50%, #2a2a2a 100%)',
            }}
          >
            {/* Inner glow */}
            <div 
              className="absolute inset-0 opacity-50"
              style={{
                background: 'radial-gradient(ellipse at top, rgba(178, 159, 134, 0.3), transparent 50%)',
              }}
            />
            
            {/* Animated border glow */}
            <motion.div
              animate={{ 
                boxShadow: [
                  'inset 0 0 30px rgba(178, 159, 134, 0.1)',
                  'inset 0 0 60px rgba(178, 159, 134, 0.2)',
                  'inset 0 0 30px rgba(178, 159, 134, 0.1)',
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-[40px]"
            />

            <div className="relative z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #B29F86, #E9CFB9)',
                }}
              >
                <Cross className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
                Begin Your Journey
              </h2>
              <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
                Start your daily prayer practice today. Find peace, guidance, and inspiration with PrayPro.
              </p>
              <motion.a
                href="https://apps.apple.com/us/app/praypro/id6761731709"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all"
                style={{
                  background: 'white',
                  color: '#2a2a2a',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                }}
              >
                <Download className="w-5 h-5" />
                Get PrayPro
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-8" style={{ background: '#E8E5E0' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg overflow-hidden" style={{ background: '#6b6b6b' }}>
              <img src="/apps/praypro_logo.png" alt="PrayPro" className="w-8 h-8 object-cover" />
            </div>
            <span className="font-serif text-xl" style={{ color: '#525048' }}>PrayPro</span>
          </div>
          <p className="text-sm" style={{ color: 'rgba(82, 80, 72, 0.5)' }}>
            © 2025 PrayPro. A product by AWEN28.
          </p>
          <Link 
            to="/" 
            onClick={handleBackClick}
            className="flex items-center gap-2 text-sm" 
            style={{ color: '#2a2a2a' }}
          >
            Visit AWEN28
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default PrayPro;

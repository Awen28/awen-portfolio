import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Sparkles, MapPin, Brain, ChevronRight, Download, Star, Sun, Orbit } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SEO, generateAppStructuredData } from '../components/SEO';

const features = [
  {
    icon: Brain,
    title: 'Energy Chat',
    description: 'Ask your higher self anything. Our AI combines astrology, numerology, and cosmic energy to provide personalized guidance.',
  },
  {
    icon: MapPin,
    title: 'Astrocartography',
    description: 'Discover where your energies work best on Earth. Find your power spots for love, career, and personal growth.',
  },
  {
    icon: Sparkles,
    title: 'Real-time Cosmic Data',
    description: 'Live Schumann resonance readings, solar activity monitoring, and current planetary positions with aspects.',
  },
];

// Zodiac symbols for easter eggs
const zodiacSymbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];


// Using exact filenames as provided
const screenshots = [
  { src: '/apps/numistellar_home1.png', alt: 'Home Screen' },
  { src: '/apps/numistellar_home2.png', alt: 'Home Screen More' },
  { src: '/apps/numistellar_chat.png', alt: 'Energy Chat' },
  { src: '/apps/numistellar_astrocartography.png', alt: 'Astrocartography' },
  { src: '/apps/numistellar_schumann.png', alt: 'Daily Energy' },
  { src: '/apps/numistellar_realtime1.png', alt: 'Stars Real-time' },
  { src: '/apps/numistellar_realtime2.png', alt: 'Numerology & Retrograde' },
  { src: '/apps/numistellar_birthchart1.png', alt: 'Birth Chart' },
  { src: '/apps/numistellar_birthchart2.png', alt: 'Houses' },
  { src: '/apps/numistellar_widgets.png', alt: 'Home Screen Widgets' },
];

// Floating planet component
const FloatingPlanet = ({ color, size, delay, x, y }: { color: string; size: number; delay: number; x: string; y: string }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: `radial-gradient(circle at 30% 30%, ${color}, ${color}88)`,
      boxShadow: `0 0 ${size}px ${color}40`,
    }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 8 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  />
);

// Shooting star component
const ShootingStar = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-white rounded-full"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 50}%`,
    }}
    animate={{
      x: [0, 300],
      y: [0, 150],
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatDelay: 5 + delay * 2,
      delay: delay * 3,
      ease: "easeOut",
    }}
  >
    <motion.div
      className="absolute inset-0 w-20 h-px bg-gradient-to-r from-white to-transparent"
      style={{ transform: 'rotate(25deg)', transformOrigin: 'left center' }}
    />
  </motion.div>
);

// Zodiac floating symbol
const ZodiacFloat = ({ symbol, delay, x, y }: { symbol: string; delay: number; x: string; y: string }) => (
  <motion.div
    className="absolute text-2xl opacity-20 select-none pointer-events-none"
    style={{ left: x, top: y, color: '#8B5CF6' }}
    animate={{
      y: [-15, 15, -15],
      rotate: [0, 10, -10, 0],
      opacity: [0.1, 0.3, 0.1],
    }}
    transition={{
      duration: 6 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  >
    {symbol}
  </motion.div>
);

// Orbit ring animation
const OrbitRing = ({ size, duration, delay }: { size: number; duration: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full border border-violet-500/10"
    style={{
      width: size,
      height: size,
      left: '50%',
      top: '50%',
      marginLeft: -size / 2,
      marginTop: -size / 2,
    }}
    animate={{ rotate: 360 }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: "linear",
      delay: delay,
    }}
  >
    <motion.div
      className="absolute w-3 h-3 rounded-full"
      style={{
        background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
        top: -6,
        left: '50%',
        marginLeft: -6,
        boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
      }}
    />
  </motion.div>
);

const NumiStellar = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    if (location.pathname === '/numistellar') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [location]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePos({ x, y });
  };

  // SEO Structured Data
  const structuredData = generateAppStructuredData(
    'NumiStellar',
    'NumiStellar vereint Astrologie, Numerologie und kosmische Energie. Echtzeit Planetenpositionen, Schumann Resonanz, Astrocartographie und AI Energy Chat.',
    'https://www.awen28.com/apps/numistellar_home1.png',
    'https://apps.apple.com/at/app/numistellar/id6736651629',
    'LifestyleApplication',
    '4.9',
    '1000'
  );

  return (
    <>
      <SEO
        title="NumiStellar 2024 - Astrologie, Numerologie & Kosmische Energie | AWEN28"
        description="NumiStellar: Die beste Astrologie App mit Echtzeit Planetenpositionen, Schumann Resonanz, Astrocartographie und AI Energy Chat. Dein persönlicher kosmischer Guide."
        keywords="Astrologie App, Numerologie App, Horoskop App, Schumann Resonanz, Astrocartographie, Geburtshoroskop, Planetenpositionen, kosmische Energie, Spirituelle App, Tierkreiszeichen App, Engelzahlen"
        canonical="https://www.awen28.com/numistellar"
        ogImage="https://www.awen28.com/apps/numistellar_home1.png"
        ogType="product"
        appName="NumiStellar"
        appCategory="Lifestyle"
        structuredData={structuredData}
      />
    <div ref={containerRef} className="relative min-h-screen" style={{ background: '#0f0f1a' }}>
      {/* Cosmic Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Stars field */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Floating Planets */}
        <FloatingPlanet color="#8B5CF6" size={60} delay={0} x="10%" y="20%" />
        <FloatingPlanet color="#06B6D4" size={40} delay={2} x="85%" y="15%" />
        <FloatingPlanet color="#EC4899" size={30} delay={1} x="75%" y="70%" />
        <FloatingPlanet color="#F59E0B" size={50} delay={3} x="5%" y="60%" />
        <FloatingPlanet color="#10B981" size={25} delay={1.5} x="90%" y="45%" />

        {/* Zodiac Symbols */}
        {zodiacSymbols.slice(0, 8).map((symbol, i) => (
          <ZodiacFloat
            key={`zodiac-${i}`}
            symbol={symbol}
            delay={i * 0.5}
            x={`${10 + i * 10}%`}
            y={`${15 + (i % 3) * 25}%`}
          />
        ))}

        {/* Shooting Stars */}
        {[...Array(3)].map((_, i) => (
          <ShootingStar key={`shooting-${i}`} delay={i} />
        ))}

        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.path
            d="M100,100 L200,150 L300,100 L400,180"
            stroke="url(#constellation)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.path
            d="M800,200 L900,250 L1000,220 L1100,280"
            stroke="url(#constellation)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
          <defs>
            <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              border: '1px solid rgba(139, 92, 246, 0.2)',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to AWEN28
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden">
        {/* Orbit rings in hero */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          <OrbitRing size={300} duration={20} delay={0} />
          <OrbitRing size={400} duration={30} delay={2} />
          <OrbitRing size={500} duration={40} delay={4} />
        </div>

        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ y: bgY }}
        >
          <div 
            className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            }}
          />
          <div 
            className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
            }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                  boxShadow: '0 8px 32px rgba(147, 112, 219, 0.4)',
                }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8" style={{ color: '#9370DB' }} />
              </motion.div>
              <div>
                <h1 className="font-serif text-3xl text-white">NumiStellar</h1>
                <p className="text-sm text-white/50">Cosmic Energy Guide</p>
              </div>
            </motion.div>

            <motion.h2 
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Discover your
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                cosmic energy
              </span>
            </motion.h2>

            <motion.p 
              className="text-lg mb-8 max-w-md text-white/60"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              NumiStellar unites astrology, numerology, and Schumann resonance data to help you 
              understand your unique energetic imprint and navigate life with cosmic wisdom.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.a
                href="https://apps.apple.com/at/app/numistellar/id6736651629"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all"
                style={{
                  background: '#9370DB',
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(147, 112, 219, 0.3)',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(147, 112, 219, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                Download App
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center md:justify-end relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          >
            {/* Moon decoration */}
            <motion.div
              className="absolute -top-10 -right-10 text-6xl opacity-30"
              animate={{ rotate: [0, 10, -10, 0], y: [-5, 5, -5] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              🌙
            </motion.div>
            
            {/* Sun decoration */}
            <motion.div
              className="absolute -bottom-5 -left-5 text-5xl opacity-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <Sun className="w-12 h-12 text-yellow-400" />
            </motion.div>

            <motion.div
              className="relative p-4 md:p-6 rounded-[40px]"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
                transition: 'transform 0.3s ease-out',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
              }}
            >
              <div
                className="p-3 rounded-[28px]"
                style={{
                  background: 'rgba(0,0,0,0.2)',
                }}
              >
                <img
                  src="/apps/numistellar_home1.png"
                  alt="NumiStellar App Home"
                  className="w-[260px] md:w-[300px] h-auto rounded-[24px]"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 md:px-8" style={{ background: 'rgba(15,15,26,0.8)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span 
              className="font-serif italic text-sm tracking-[0.3em] block mb-6"
              style={{ color: '#9370DB' }}
            >
              ✨ Cosmic Features ✨
            </motion.span>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              Your manifestation toolkit
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 rounded-[32px] relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Background glow */}
                <motion.div
                  className="absolute inset-0 opacity-0"
                  whileHover={{ opacity: 1 }}
                  style={{
                    background: `radial-gradient(circle at center, ${idx === 0 ? '#8B5CF620' : idx === 1 ? '#06B6D420' : '#EC489920'}, transparent)`,
                  }}
                />
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
                  }}
                >
                  <feature.icon className="w-7 h-7 text-violet-400" />
                </div>
                <h3 className="font-serif text-2xl mb-4 text-white relative z-10">
                  {feature.title}
                </h3>
                <p className="text-white/50 relative z-10">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase - Screenshots */}
      <section className="py-32 px-6 md:px-8" style={{ background: '#0f0f1a' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span 
              className="font-serif italic text-sm tracking-[0.3em] block mb-6"
              style={{ color: '#9370DB' }}
            >
              🌌 Explore the Cosmos 🌌
            </motion.span>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              Ancient wisdom meets AI
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {screenshots.map((screenshot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                whileHover={{ y: -10, scale: 1.02, rotate: idx % 2 === 0 ? -2 : 2 }}
                className="p-3 rounded-[24px] cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  className="w-full h-auto rounded-[16px]"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits List */}
      <section className="py-32 px-6 md:px-8" style={{ background: 'rgba(15,15,26,0.8)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl mb-8 text-white">
                Why NumiStellar?
              </h2>
              <div className="space-y-6">
                {[
                  'Personal birth chart analysis',
                  'Real-time planetary positions',
                  'Schumann resonance monitoring',
                  'Solar activity tracking',
                  'Astrocartography maps',
                  'AI-powered Energy Chat',
                  'Home screen widgets',
                  'Angel numbers interpretation',
                  'Daily & weekly horoscopes',
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <motion.div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(139, 92, 246, 0.15)',
                      }}
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Star className="w-4 h-4 text-violet-400" />
                    </motion.div>
                    <span className="text-white/70">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center relative"
            >
              {/* Orbiting decoration */}
              <motion.div
                className="absolute w-64 h-64 rounded-full border border-violet-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute -top-2 left-1/2 w-4 h-4 rounded-full bg-violet-400 shadow-lg shadow-violet-400/50" />
              </motion.div>

              <div
                className="p-4 rounded-[40px] relative z-10"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
                }}
              >
                <img
                  src="/apps/numistellar_chat.png"
                  alt="Energy Chat Feature"
                  className="w-[280px] h-auto rounded-[24px]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-8" style={{ background: '#0f0f1a' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative"
        >
          {/* Floating zodiac around CTA */}
          <motion.div
            className="absolute -top-10 left-10 text-3xl opacity-20"
            animate={{ y: [-10, 10, -10], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            ♈
          </motion.div>
          <motion.div
            className="absolute -bottom-5 right-10 text-3xl opacity-20"
            animate={{ y: [10, -10, 10], rotate: [0, -15, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            ♎
          </motion.div>
          <motion.div
            className="absolute top-1/2 -left-5 text-2xl opacity-15"
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ✦
          </motion.div>

          <div
            className="p-12 md:p-16 rounded-[40px] relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #9370DB 100%)',
              boxShadow: '0 32px 64px rgba(147, 112, 219, 0.3)',
            }}
          >
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 opacity-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <Orbit className="w-full h-full text-white" />
            </motion.div>

            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 relative z-10">
              Start your cosmic journey
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto relative z-10">
              Join thousands who have transformed their lives with cosmic wisdom. 
              Your stars are waiting to guide you.
            </p>
            <motion.a
              href="https://apps.apple.com/at/app/numistellar/id6736651629"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium relative z-10"
              style={{
                background: 'white',
                color: '#9370DB',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              Get NumiStellar on the App Store
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-8" style={{ background: '#0a0a12' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #9370DB 100%)' }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <span className="font-serif text-xl text-white">NumiStellar</span>
          </div>
          <p className="text-sm text-white/40">
            © 2024 NumiStellar. A product by AWEN28.
          </p>
          <Link 
            to="/"
            className="flex items-center gap-2 text-sm text-violet-400"
          >
            Visit AWEN28
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
    </>
  );
};

export default NumiStellar;

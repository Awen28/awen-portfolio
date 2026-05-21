import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Smartphone, Gamepad2, Music, Trophy, ChevronRight, Download, Star, Keyboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO, generateAppStructuredData, generateBreadcrumbData, generateFAQData } from '../components/SEO';

const features = [
  {
    icon: Keyboard,
    title: 'T9 Multi-Tap',
    description: 'Authentic T9 typing on 6 nostalgic 2004 phone skins with unique geometry, brand look, and antenna.',
  },
  {
    icon: Gamepad2,
    title: '4 Game Modes',
    description: 'Normal, Reverse (backwards), Blind (no display), and Practice modes for every skill level.',
  },
  {
    icon: Trophy,
    title: '75 Levels',
    description: '75 levels with increasing difficulty, 3 stars per level, and unlockable content to keep you engaged.',
  },
  {
    icon: Music,
    title: 'Ringtone Composer',
    description: 'Compose ringtones by entering notes via keypad, play them back, and export as WAV files.',
  },
  {
    icon: Smartphone,
    title: 'Classic Snake',
    description: 'The legendary Snake game with keypad controls - just like on your old Nokia!',
  },
  {
    icon: Star,
    title: 'Daily Challenges',
    description: 'Daily challenges with chat streaks. Unlock new skins at 3, 7, and 14 day streaks!',
  },
];

// Retro pixel Easter egg
const PixelParticle = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ 
      opacity: [0, 0.8, 0],
      y: [0, -100],
      x: [0, Math.random() * 40 - 20],
    }}
    transition={{ 
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeOut"
    }}
    className="absolute pointer-events-none z-10"
    style={{ left: `${Math.random() * 100}%`, top: '80%' }}
  >
    <div className="w-2 h-2 rounded-sm" style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
  </motion.div>
);

const SnakeSegment = ({ delay, size }: { delay: number; size: number }) => (
  <motion.div
    animate={{ 
      x: [0, 50, 50, 0, -50, -50, 0],
      y: [0, 0, 50, 50, 50, 0, 0],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{ 
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
    className="absolute pointer-events-none z-0"
    style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%` }}
  >
    <div 
      className="rounded-sm"
      style={{ 
        width: size, 
        height: size, 
        background: '#4ade80',
        boxShadow: '0 0 10px rgba(74, 222, 128, 0.3)',
      }}
    />
  </motion.div>
);

// Retro grid background
const RetroGrid = () => (
  <div 
    className="absolute inset-0 pointer-events-none opacity-10"
    style={{
      backgroundImage: `
        linear-gradient(rgba(74, 222, 128, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(74, 222, 128, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
    }}
  />
);

const SMS2004 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
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
      setMousePos({
        x: (clientX / innerWidth - 0.5) * 15,
        y: (clientY / innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBackClick = () => {
    sessionStorage.setItem('sms2004ScrollPosition', window.scrollY.toString());
  };

  const appStructuredData = generateAppStructuredData(
    "SMS 2004",
    "Nostalgic phone simulator with T9 typing, 6 authentic 2004 skins, classic Snake game, ringtone composer with WAV export, 75 levels across 4 game modes, and daily challenges. Best retro iOS game 2026.",
    "https://www.awen28.com/apps/sms_home.png",
    "https://apps.apple.com/us/app/sms-2004/id6770360397",
    "GameApplication",
    "5.0",
    "50",
    ["T9 Multi-Tap Typing", "6 Authentic Phone Skins", "Classic Snake Game", "Ringtone Composer", "75 Levels", "4 Game Modes", "Game Center Leaderboard", "Daily Challenges"],
    ["/apps/sms_home.png", "/apps/sms_gameplay.png", "/apps/sms_snake.png", "/apps/sms_composer.png", "/apps/sms_levels.png"],
    "2026-04-01",
    "45MB",
    "4+"
  );

  const breadcrumbData = generateBreadcrumbData([
    { name: "Home", url: "https://www.awen28.com/" },
    { name: "SMS 2004", url: "https://www.awen28.com/sms2004" }
  ]);

  const faqData = generateFAQData([
    { question: "What is SMS 2004?", answer: "SMS 2004 is a nostalgic phone simulator game for iOS that recreates the authentic 2004 mobile phone experience with T9 typing, Snake, ringtone composer, and 75 levels." },
    { question: "How does T9 typing work in SMS 2004?", answer: "T9 multi-tap typing works just like on classic 2004 phones - press number keys multiple times to cycle through letters. The game challenges you to type phrases as fast as possible." },
    { question: "Is SMS 2004 free?", answer: "Yes, SMS 2004 is free to download on the App Store with optional in-app purchases for additional phone skins." },
    { question: "What game modes does SMS 2004 have?", answer: "SMS 2004 features 4 game modes: Normal, Reverse (typing backwards), Blind (no display), and Practice mode for beginners." },
    { question: "Can I compose ringtones in SMS 2004?", answer: "Yes! SMS 2004 includes a ringtone composer where you can create custom ringtones using the keypad and export them as WAV files." },
  ]);

  return (
    <div className="min-h-screen" style={{ background: '#1a1a1a' }}>
      <SEO 
        title="SMS 2004 | Best Retro iOS Game 2026 - Nostalgic Phone Simulator"
        description="SMS 2004 - The ultimate nostalgic phone simulator game for iOS. T9 typing, classic Snake, ringtone composer, 75 levels, 4 game modes, and 6 authentic 2004 phone skins. Free on App Store!"
        keywords="SMS 2004, best retro iOS game 2026, nostalgic phone game, T9 typing simulator, Snake game iPhone, 2004 phone simulator, Nokia game replica, pixel art mobile game, vintage mobile game, retro arcade game, best iPhone game 2026, phone simulator app, T9 text game, classic phone game"
        ogImage="https://www.awen28.com/apps/sms_home.png"
        ogType="product"
        canonical="https://www.awen28.com/sms2004"
        structuredData={[appStructuredData, breadcrumbData, faqData]}
        appName="SMS 2004"
        appCategory="GameApplication"
        rating="5.0"
        reviewCount="50"
        language="en-US"
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-8" style={{ background: 'rgba(26, 26, 26, 0.9)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" onClick={handleBackClick} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to AWEN28
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#4ade80' }}>
              <Smartphone className="w-6 h-6 text-black" />
            </div>
            <span className="font-mono text-2xl text-white tracking-wider">SMS 2004</span>
          </div>
        </div>
      </header>

      {/* Hero with Easter Eggs */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-32 pb-20 px-6 md:px-8 overflow-hidden min-h-screen flex items-center"
      >
        <RetroGrid />
        
        {/* Easter Eggs */}
        {[...Array(15)].map((_, i) => (
          <PixelParticle key={i} delay={i * 0.3} />
        ))}
        {[...Array(5)].map((_, i) => (
          <SnakeSegment key={i} delay={i * 1.5} size={8 + i * 2} />
        ))}

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
                className="font-mono text-sm tracking-[0.3em] block mb-4 text-[#4ade80]"
              >
                iOS GAME
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-mono text-5xl md:text-7xl leading-tight mb-6 text-white"
              >
                SMS
                <br />
                <motion.span 
                  className="text-[#4ade80]"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  2004
                </motion.span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl mb-8 max-w-lg text-white/60"
              >
                Nostalgic phone simulator with T9 typing, classic Snake, ringtone composer, 
                and authentic 2004 phone skins. Relive the golden age of mobile phones.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="https://apps.apple.com/us/app/sms-2004/id6770360397"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{ background: '#4ade80', color: '#000' }}
                >
                  <Download className="w-5 h-5" />
                  Download on App Store
                </a>
                <Link
                  to="/#work"
                  onClick={handleBackClick}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105 border border-white/20 text-white hover:bg-white/5"
                >
                  View More Apps
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
              style={{
                transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 60px rgba(74, 222, 128, 0.2)',
                    '0 0 80px rgba(74, 222, 128, 0.3)',
                    '0 0 60px rgba(74, 222, 128, 0.2)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative p-4 rounded-[40px]"
                style={{ background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="relative rounded-[32px] overflow-hidden" style={{ aspectRatio: '9/19.5', maxWidth: '280px' }}>
                  <img 
                    src="/apps/sms_home.png" 
                    alt="SMS 2004 Home Screen"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <section ref={sectionRef} className="py-24 px-6 md:px-8 relative" style={{ background: '#1a1a1a' }}>
        <RetroGrid />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="font-mono text-sm tracking-[0.3em] block mb-4 text-[#4ade80]"
            >
              FEATURES
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="font-mono text-4xl md:text-5xl text-white"
            >
              Back to 2004
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <div 
                  className="p-8 rounded-2xl h-full"
                  style={{
                    background: '#2a2a2a',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  }}
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ 
                      background: '#4ade80',
                      boxShadow: '0 10px 30px rgba(74, 222, 128, 0.2)',
                    }}
                  >
                    <feature.icon className="w-7 h-7 text-black" />
                  </motion.div>
                  <h3 className="font-mono text-xl mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/50">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 px-6 md:px-8 relative" style={{ background: '#1a1a1a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span className="font-mono text-sm tracking-[0.3em] block mb-4 text-[#4ade80]">
              SCREENSHOTS
            </motion.span>
            <motion.h2 className="font-mono text-4xl md:text-5xl text-white">
              Pixel Perfect Nostalgia
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { src: '/apps/sms_home.png', alt: 'Home' },
              { src: '/apps/sms_gameplay.png', alt: 'Gameplay' },
              { src: '/apps/sms_snake.png', alt: 'Snake' },
              { src: '/apps/sms_composer.png', alt: 'Composer' },
              { src: '/apps/sms_levels.png', alt: 'Levels' },
            ].map((screenshot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="relative group"
              >
                <div 
                  className="p-2 rounded-2xl"
                  style={{
                    background: '#2a2a2a',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="rounded-xl overflow-hidden" style={{ aspectRatio: '9/16' }}>
                    <img 
                      src={screenshot.src} 
                      alt={screenshot.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                <p className="text-center mt-3 text-sm text-white/50">{screenshot.alt}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-8 relative" style={{ background: '#1a1a1a' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-16 rounded-[40px] overflow-hidden"
            style={{
              background: '#2a2a2a',
              border: '1px solid rgba(74, 222, 128, 0.2)',
            }}
          >
            <motion.div
              animate={{ 
                boxShadow: [
                  'inset 0 0 40px rgba(74, 222, 128, 0.1)',
                  'inset 0 0 60px rgba(74, 222, 128, 0.15)',
                  'inset 0 0 40px rgba(74, 222, 128, 0.1)',
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
                style={{ background: '#4ade80' }}
              >
                <Gamepad2 className="w-8 h-8 text-black" />
              </motion.div>
              <h2 className="font-mono text-4xl md:text-5xl text-white mb-6">
                Ready to Text?
              </h2>
              <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
                Download SMS 2004 now and experience the nostalgia of classic mobile phones. 
                T9 typing, Snake, and retro vibes await!
              </p>
              <motion.a
                href="https://apps.apple.com/us/app/sms-2004/id6770360397"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-10 py-5 rounded-full text-sm font-medium transition-all"
                style={{ background: '#4ade80', color: '#000' }}
              >
                <Download className="w-5 h-5" />
                Get SMS 2004
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-8" style={{ background: '#111', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#4ade80' }}>
              <Smartphone className="w-6 h-6 text-black" />
            </div>
            <span className="font-mono text-2xl text-white">SMS 2004</span>
          </div>
          <p className="text-sm text-white/40">
            © 2026 SMS 2004. A product by AWEN28.
          </p>
          <Link to="/" onClick={handleBackClick} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            Visit AWEN28
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default SMS2004;

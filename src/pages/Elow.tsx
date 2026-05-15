import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Zap, Layers, ChevronRight, Download, Volume2, Radio, Headphones, Mic2, Music, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SEO, generateAppStructuredData } from '../components/SEO';

const features = [
  {
    icon: Zap,
    title: 'AI Song Creation',
    description: 'Create original songs with AI. Choose from normal creation, mood-based generation, or genre mashup modes.',
  },
  {
    icon: Headphones,
    title: 'Mood-Based Songs',
    description: 'Songs created based on your current mood and life situation. Your personal companion for every phase.',
  },
  {
    icon: Layers,
    title: 'Genre Mashup',
    description: 'Combine different genres to create unique soundscapes. Mix styles and create something new.',
  },
  {
    icon: Volume2,
    title: 'Personal Soundtrack',
    description: 'Whether focus music, workout beats, or chill vibes - Elow generates the perfect soundtrack.',
  },
  {
    icon: Radio,
    title: 'Smart Library',
    description: 'Organize your AI-generated songs in playlists. Access your collection anytime, anywhere.',
  },
  {
    icon: Mic2,
    title: 'Multiple Languages',
    description: 'Create songs in different languages to match your preferences and mood perfectly.',
  },
];

// Beige/earth tone colors matching AWEN28 design
const colors = {
  cream: '#FAF9F7',
  beige: '#E9CFB9',
  taupe: '#B29F86',
  dark: '#525048',
  light: '#F5F3F0',
};

// Easter egg components
const FloatingNote = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ 
      opacity: [0, 0.6, 0],
      y: [0, -100],
      x: [0, Math.random() * 40 - 20],
      rotate: [0, 360],
    }}
    transition={{ 
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeOut"
    }}
    className="absolute pointer-events-none z-10"
    style={{ left: `${Math.random() * 100}%`, top: '80%' }}
  >
    <Music className="w-5 h-5" style={{ color: colors.taupe, opacity: 0.4 }} />
  </motion.div>
);

const PulseCircle = ({ delay, size, leftVal, topVal }: { delay: number; size: number; leftVal: number; topVal: number }) => (
  <motion.div
    animate={{ 
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.4, 0.2],
    }}
    transition={{ 
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute rounded-full pointer-events-none"
    style={{ 
      width: size, 
      height: size, 
      background: `radial-gradient(circle, ${colors.beige}40 0%, transparent 70%)`,
      left: `${leftVal}%`,
      top: `${topVal}%`,
    }}
  />
);

const Elow = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    if (location.pathname === '/elow') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location]);

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
    sessionStorage.setItem('elowScrollPosition', window.scrollY.toString());
  };

  const appStructuredData = generateAppStructuredData(
    'Elow',
    'Transform your emotions into original music with AI. Create personalized soundscapes for every mood and moment.',
    'https://www.awen28.com/apps/elow_homescreen.png',
    'https://apps.apple.com/at/app/elow-generate-music/id6759220861',
    'MusicApplication',
    '4.8',
    '800'
  );

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden" style={{ background: colors.cream }}>
      <SEO 
        title="Elow | AI Music Generator - Create Your Soundtrack"
        description="Transform your emotions into original music with Elow. AI-powered music creation for focus, relaxation, workouts, and every mood. Available on iOS."
        keywords="AI music generator, create music with AI, personalized soundtrack, focus music, relaxation music, workout music, iOS music app, AI composer, Elow app"
        ogImage="/apps/elow_homescreen.png"
        structuredData={appStructuredData}
        appName="Elow"
      />

      {/* Background Pattern */}
      <motion.div 
        style={{ y: bgY }}
        className="fixed inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(ellipse at 20% 30%, ${colors.beige}30 0%, transparent 50%)` }} />
        <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(ellipse at 80% 70%, ${colors.taupe}20 0%, transparent 50%)` }} />
      </motion.div>

      {/* Easter Eggs */}
      {[...Array(8)].map((_, i) => (
        <FloatingNote key={i} delay={i * 0.8} />
      ))}
      {[...Array(5)].map((_, i) => (
        <PulseCircle key={i} delay={i * 0.5} size={100 + i * 50} leftVal={15 + i * 15} topVal={20 + i * 12} />
      ))}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-8" style={{ background: 'rgba(250, 249, 247, 0.9)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" onClick={handleBackClick} className="flex items-center gap-2 text-sm" style={{ color: `${colors.dark}99` }}>
            <ArrowLeft className="w-4 h-4" />
            Back to AWEN28
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: colors.dark }}>
              <Music className="w-6 h-6 text-white" />
            </div>
            <span className="font-serif text-2xl" style={{ color: colors.dark }}>Elow</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto w-full">
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
                style={{ color: colors.taupe }}
              >
                AI Music Generator
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-5xl md:text-7xl leading-tight mb-6"
                style={{ color: colors.dark }}
              >
                Create Your
                <br />
                <motion.span 
                  className="italic"
                  style={{ color: colors.taupe }}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Soundtrack
                </motion.span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl mb-8 max-w-lg"
                style={{ color: `${colors.dark}99` }}
              >
                Transform your emotions into original music. Create personalized soundscapes 
                for focus, relaxation, workouts, and every moment of your life.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="https://apps.apple.com/at/app/elow-generate-music/id6759220861"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{ background: colors.dark, color: colors.cream }}
                >
                  <Download className="w-5 h-5" />
                  Download on App Store
                </a>
                <Link
                  to="/#work"
                  onClick={handleBackClick}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{ background: 'transparent', color: colors.dark, border: `1px solid ${colors.dark}20` }}
                >
                  View More Apps
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Phone Mockup with Claymorphism */}
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
              {/* Claymorphism container */}
              <motion.div
                animate={{ 
                  boxShadow: [
                    `20px 20px 60px ${colors.dark}15, -20px -20px 60px #ffffff`,
                    `25px 25px 70px ${colors.dark}20, -25px -25px 70px #ffffff`,
                    `20px 20px 60px ${colors.dark}15, -20px -20px 60px #ffffff`,
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative p-6 rounded-[50px]"
                style={{ background: colors.cream }}
              >
                {/* Inner highlight */}
                <div className="absolute inset-0 rounded-[50px] opacity-50" style={{ background: `linear-gradient(135deg, #ffffff 0%, transparent 50%, ${colors.beige}20 100%)` }} />
                
                <div className="relative rounded-[40px] overflow-hidden" style={{ aspectRatio: '9/19.5', maxWidth: '280px' }}>
                  <img 
                    src="/apps/elow_homescreen.png" 
                    alt="Elow Home Screen"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 md:px-8 relative" style={{ background: colors.light }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif italic text-sm tracking-[0.3em] block mb-4"
              style={{ color: colors.taupe }}
            >
              Features
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl"
              style={{ color: colors.dark }}
            >
              Music Made For You
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
              >
                {/* Claymorphism card */}
                <div 
                  className="relative p-8 rounded-3xl h-full"
                  style={{
                    background: colors.cream,
                    boxShadow: `20px 20px 60px ${colors.dark}08, -20px -20px 60px #ffffff`,
                    border: '1px solid rgba(255,255,255,0.8)',
                  }}
                >
                  {/* Hover glow */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute -inset-1 rounded-3xl -z-10 transition-opacity duration-300"
                    style={{ background: `linear-gradient(135deg, ${colors.beige}50, transparent 60%)` }}
                  />

                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.taupe}, ${colors.beige})`,
                      boxShadow: `0 10px 30px ${colors.taupe}40`,
                    }}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="font-serif text-xl mb-3" style={{ color: colors.dark }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: `${colors.dark}99` }}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6 md:px-8 relative" style={{ background: colors.cream }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif italic text-sm tracking-[0.3em] block mb-4"
              style={{ color: colors.taupe }}
            >
              Screenshots
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl"
              style={{ color: colors.dark }}
            >
              Create Your Music
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { src: '/apps/elow_homescreen.png', alt: 'Home' },
              { src: '/apps/elow_create.PNG', alt: 'Create Modes' },
              { src: '/apps/elow_moodSong.PNG', alt: 'Mood Songs' },
              { src: '/apps/elow_genre.PNG', alt: 'Genres' },
              { src: '/apps/elow_details.PNG', alt: 'Details' },
              { src: '/apps/elow_player.PNG', alt: 'Player' },
              { src: '/apps/elow_library.PNG', alt: 'Library' },
              { src: '/apps/elow_playlists.PNG', alt: 'Playlists' },
            ].map((screenshot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative group"
              >
                {/* Claymorphism frame */}
                <div 
                  className="relative p-3 rounded-2xl"
                  style={{
                    background: colors.cream,
                    boxShadow: `15px 15px 40px ${colors.dark}08, -15px -15px 40px #ffffff`,
                    border: '1px solid rgba(255,255,255,0.8)',
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
                <p className="text-center mt-3 text-sm" style={{ color: `${colors.dark}80` }}>{screenshot.alt}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-8 relative" style={{ background: colors.light }}>
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-16 rounded-[40px]"
            style={{
              background: colors.cream,
              boxShadow: `30px 30px 60px ${colors.dark}08, -30px -30px 60px #ffffff`,
              border: '1px solid rgba(255,255,255,0.8)',
            }}
          >
            {/* Inner highlight */}
            <div className="absolute inset-0 rounded-[40px] opacity-50" style={{ background: `linear-gradient(135deg, #ffffff 0%, transparent 50%, ${colors.beige}30 100%)` }} />
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center relative z-10"
              style={{ 
                background: `linear-gradient(135deg, ${colors.taupe}, ${colors.beige})`,
                boxShadow: `0 0 40px ${colors.taupe}40`,
              }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="font-serif text-4xl md:text-5xl mb-6 relative z-10" style={{ color: colors.dark }}>
              Start Creating
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto relative z-10" style={{ color: `${colors.dark}99` }}>
              Download Elow now and transform your emotions into original music. 
              Your personal AI composer awaits.
            </p>
            <motion.a
              href="https://apps.apple.com/at/app/elow-generate-music/id6759220861"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full text-sm font-medium transition-all relative z-10"
              style={{ background: colors.dark, color: colors.cream }}
            >
              <Download className="w-5 h-5" />
              Get Elow
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-8" style={{ background: colors.light, borderTop: `1px solid ${colors.dark}10` }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: colors.dark }}>
              <Music className="w-6 h-6 text-white" />
            </div>
            <span className="font-serif text-2xl" style={{ color: colors.dark }}>Elow</span>
          </div>
          <p className="text-sm" style={{ color: `${colors.dark}60` }}>
            © 2026 Elow. A product by AWEN28.
          </p>
          <Link to="/" onClick={handleBackClick} className="flex items-center gap-2 text-sm" style={{ color: colors.dark }}>
            Visit AWEN28
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Elow;

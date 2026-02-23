import { useRef, useState, useEffect, Fragment } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Wind, Moon, Heart, ChevronRight, Download, Waves } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SEO, generateAppStructuredData } from '../components/SEO';

const features = [
  {
    icon: Wind,
    title: 'AI-Guided Meditations',
    description: 'Personalized meditation experiences crafted by AI. Each session adapts to your mood, energy, and intention for the day.',
  },
  {
    icon: Moon,
    title: 'Sleep Stories & Sounds',
    description: 'Drift into peaceful sleep with carefully crafted sleep stories, nature sounds, and soothing ambient soundscapes.',
  },
  {
    icon: Waves,
    title: 'Solfeggio Frequencies',
    description: 'Experience the ancient healing power of Solfeggio frequencies. Each tone tuned to restore balance and harmony.',
  },
];

const benefits = [
  'Reduce stress and anxiety',
  'Improve sleep quality',
  'Enhance focus and clarity',
  'Build consistent meditation practice',
  'Personalized breathing exercises',
  'Meditation timer with singing bowls',
  'Offline access to your favorites',
  'Daily mindfulness reminders',
];

// Using exact filenames as provided
const screenshots = [
  { src: '/apps/Awenye_en_homescreen.png', alt: 'Home' },
  { src: '/apps/Awenye_en_generalMeditation.png', alt: 'General Meditation' },
  { src: '/apps/Awenye_en_createMeditation.png', alt: 'Create Meditation' },
  { src: '/apps/Awenye_en_library.png', alt: 'Library' },
  { src: '/apps/Awenye_en_solfeggio.png', alt: 'Solfeggio' },
  { src: '/apps/Awenye_en_meditationTimer.png', alt: 'Meditation Timer' },
  { src: '/apps/Awenye_en_breathReminder.png', alt: 'Breath Reminder' },
  { src: '/apps/Awenye_en_more.png', alt: 'More' },
];

const breatheAnimation = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.4, 0.7, 0.4],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    }
  }
};

const Awenya = () => {
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
    if (location.pathname === '/awenya') {
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
    'Awenya',
    'Awenya ist dein persönliches Heiligtum für Achtsamkeit. AI-geführte Meditationen, Sleep Stories und Solfeggio Frequenzen für besseren Schlaf.',
    'https://www.awen28.com/apps/Awenye_en_homescreen.png',
    'https://apps.apple.com/at/app/awenya/id6736651631',
    'HealthApplication',
    '4.8',
    '800'
  );

  return (
    <Fragment>
      <SEO
        title="Awenya 2024 - Meditation & Sleep Stories App | Einschlafhilfe | AWEN28"
        description="Awenya: Deine Meditations-App mit AI-geführten Meditationen, Sleep Stories und Solfeggio Frequenzen. Bessere Schlafqualität & weniger Stress. Jetzt downloaden!"
        keywords="Meditation App, Sleep Stories, Einschlafhilfe App, Solfeggio Frequenzen, Achtsamkeit App, Entspannung App, Stressabbau, Schlaf App Österreich, Atemübungen"
        canonical="https://www.awen28.com/awenya"
        ogImage="https://www.awen28.com/apps/Awenye_en_homescreen.png"
        ogType="product"
        appName="Awenya"
        appCategory="Health & Fitness"
        structuredData={structuredData}
      />
      <div ref={containerRef} className="relative min-h-screen" style={{ background: '#E8E5E0' }}>
      {/* Breathing circles background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(178, 159, 134, 0.15) 0%, transparent 70%)' }}
          variants={breatheAnimation}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(233, 207, 185, 0.2) 0%, transparent 70%)' }}
          variants={breatheAnimation}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(200, 180, 160, 0.12) 0%, transparent 70%)' }}
          variants={breatheAnimation}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
            style={{ 
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              color: '#525048',
              boxShadow: '0 4px 12px rgba(82, 80, 72, 0.08)',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to AWEN28
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden">
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ y: bgY }}
        >
          <div 
            className="absolute top-[15%] left-[5%] w-[600px] h-[600px] rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(178, 159, 134, 0.3) 0%, transparent 70%)',
            }}
          />
          <div 
            className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full opacity-35"
            style={{
              background: 'radial-gradient(circle, rgba(233, 207, 185, 0.35) 0%, transparent 70%)',
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
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #B29F86 0%, #E9CFB9 100%)',
                  boxShadow: '0 8px 32px rgba(178, 159, 134, 0.3)',
                }}
              >
                <Wind className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-serif text-3xl" style={{ color: '#525048' }}>Awenya</h1>
                <p className="text-sm" style={{ color: 'rgba(82, 80, 72, 0.6)' }}>Your Personal Sanctuary</p>
              </div>
            </motion.div>

            <motion.h2 
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
              style={{ color: '#525048' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Breathe.
              <br />
              <span style={{ color: '#B29F86' }}>Find peace.</span>
            </motion.h2>

            <motion.p 
              className="text-lg mb-8 max-w-md"
              style={{ color: 'rgba(82, 80, 72, 0.7)' }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your personal sanctuary for mindfulness and relaxation. Awenya combines 
              AI-powered meditations, sleep stories, and healing frequencies to help you 
              find calm in the chaos of everyday life.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <a
                href="https://apps.apple.com/at/app/awenya/id6736651631"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: '#B29F86',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(178, 159, 134, 0.3)',
                }}
              >
                <Download className="w-4 h-4" />
                Download Awenya
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          >
            <motion.div
              className="relative p-4 md:p-6 rounded-[40px]"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
                transition: 'transform 0.3s ease-out',
                background: '#F5F3F0',
                boxShadow: `
                  inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                  inset -3px -3px 6px rgba(82, 80, 72, 0.05),
                  20px 20px 40px rgba(178, 159, 134, 0.15),
                  -20px -20px 40px rgba(255, 255, 255, 0.9)
                `,
              }}
            >
              <div
                className="p-3 rounded-[28px]"
                style={{
                  background: '#FAF9F7',
                  boxShadow: `
                    inset 2px 2px 4px rgba(82, 80, 72, 0.04),
                    inset -2px -2px 4px rgba(255, 255, 255, 0.8)
                  `,
                }}
              >
                <img
                  src="/apps/Awenye_en_homescreen.png"
                  alt="Awenya App"
                  className="w-[260px] md:w-[300px] h-auto rounded-[24px]"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 md:px-8" style={{ background: '#F5F3F0' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span 
              className="font-serif italic text-sm tracking-[0.3em] block mb-6"
              style={{ color: '#B29F86' }}
            >
              Features
            </span>
            <h2 
              className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{ color: '#525048' }}
            >
              Your path to mindfulness
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
                className="p-8 rounded-[32px]"
                style={{
                  background: '#FAF9F7',
                  boxShadow: `
                    inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                    inset -2px -2px 4px rgba(82, 80, 72, 0.04),
                    8px 8px 16px rgba(82, 80, 72, 0.06),
                    -8px -8px 16px rgba(255, 255, 255, 0.9)
                  `,
                }}
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: 'rgba(178, 159, 134, 0.12)',
                  }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: '#B29F86' }} />
                </div>
                <h3 
                  className="font-serif text-2xl mb-4"
                  style={{ color: '#525048' }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: 'rgba(82, 80, 72, 0.6)' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase */}
      <section className="py-32 px-6 md:px-8" style={{ background: '#E8E5E0' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span 
              className="font-serif italic text-sm tracking-[0.3em] block mb-6"
              style={{ color: '#B29F86' }}
            >
              App Screenshots
            </span>
            <h2 
              className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{ color: '#525048' }}
            >
              Explore your sanctuary
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {screenshots.map((screenshot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-3 rounded-[24px] cursor-pointer"
                style={{
                  background: '#F5F3F0',
                  boxShadow: `
                    inset 2px 2px 4px rgba(255, 255, 255, 0.9),
                    inset -2px -2px 4px rgba(82, 80, 72, 0.04),
                    6px 6px 12px rgba(82, 80, 72, 0.06),
                    -6px -6px 12px rgba(255, 255, 255, 0.9)
                  `,
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

      {/* Benefits Section */}
      <section className="py-32 px-6 md:px-8" style={{ background: '#F5F3F0' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 
                className="font-serif text-4xl md:text-5xl mb-8"
                style={{ color: '#525048' }}
              >
                Why Awenya?
              </h2>
              <div className="space-y-5">
                {benefits.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(178, 159, 134, 0.12)',
                      }}
                    >
                      <Heart className="w-4 h-4" style={{ color: '#B29F86' }} />
                    </div>
                    <span style={{ color: 'rgba(82, 80, 72, 0.8)' }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div
                className="p-4 rounded-[40px]"
                style={{
                  background: '#FAF9F7',
                  boxShadow: `
                    inset 3px 3px 6px rgba(255, 255, 255, 0.9),
                    inset -3px -3px 6px rgba(82, 80, 72, 0.04),
                    16px 16px 32px rgba(178, 159, 134, 0.1),
                    -16px -16px 32px rgba(255, 255, 255, 0.9)
                  `,
                }}
              >
                <img
                  src="/apps/Awenye_en_createMeditation.png"
                  alt="Create Your Meditation"
                  className="w-[280px] h-auto rounded-[24px]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-8" style={{ background: '#E8E5E0' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div
            className="p-12 md:p-16 rounded-[40px]"
            style={{
              background: 'linear-gradient(135deg, #B29F86 0%, #E9CFB9 100%)',
              boxShadow: '0 32px 64px rgba(178, 159, 134, 0.3)',
            }}
          >
            <h2 
              className="font-serif text-4xl md:text-5xl text-white mb-6"
            >
              Begin your journey to calm
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
              Download Awenya today and discover the power of mindful breathing, 
              guided meditation, and restorative sleep.
            </p>
            <a
              href="https://apps.apple.com/at/app/awenya/id6736651631"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{
                background: 'white',
                color: '#B29F86',
              }}
            >
              <Download className="w-5 h-5" />
              Get Awenya on the App Store
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-8" style={{ background: '#D8D5D0' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #B29F86 0%, #E9CFB9 100%)' }}
            >
              <Wind className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif text-xl" style={{ color: '#525048' }}>Awenya</span>
          </div>
          <p className="text-sm" style={{ color: 'rgba(82, 80, 72, 0.5)' }}>
            © 2024 Awenya. A product by AWEN28.
          </p>
          <Link 
            to="/"
            className="flex items-center gap-2 text-sm"
            style={{ color: '#B29F86' }}
          >
            Visit AWEN28
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
    </Fragment>
  );
};

export default Awenya;

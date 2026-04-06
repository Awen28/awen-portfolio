import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles, BookOpen, Moon, Sun, ChevronRight, Download } from 'lucide-react';
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
    description: 'Daily inspiring Bible verses to guide your prayer time.',
  },
  {
    icon: Moon,
    title: 'Evening Reflections',
    description: 'End your day with guided evening prayers and meditation.',
  },
  {
    icon: Sun,
    title: 'Morning Blessings',
    description: 'Start each day with uplifting morning prayers.',
  },
  {
    icon: Sparkles,
    title: 'Beautiful Art',
    description: 'Stunning religious artwork to inspire your devotion.',
  },
];

const screenshots = [
  { src: '/apps/pray_home.png', alt: 'Home Screen' },
  { src: '/apps/pray_dailyverse.png', alt: 'Daily Bible Verse' },
  { src: '/apps/pray_collection.png', alt: 'Prayer Collection' },
  { src: '/apps/pray_detailview.png', alt: 'Prayer Detail View' },
  { src: '/apps/pray_create_prayer.png', alt: 'Create Prayer' },
  { src: '/apps/pray_createverse_image.png', alt: 'Create Verse with Image' },
];

const PrayPro = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="min-h-screen" style={{ background: '#FAF9F7' }}>
      <SEO 
        title="PrayPro | Your Daily Prayer Companion"
        description="PrayPro - Deepen your faith with daily prayers, Bible verses, and beautiful sacred art. Your personal companion for spiritual growth."
        keywords="prayer app, daily prayer, Bible verses, Christian app, meditation, spiritual growth, faith"
        ogImage="/apps/praypro_1.png"
        appName="PrayPro"
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-8 backdrop-blur-md" style={{ background: 'rgba(250, 249, 247, 0.9)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm" style={{ color: 'rgba(82, 80, 72, 0.6)' }}>
            <ArrowLeft className="w-4 h-4" />
            Back to AWEN28
          </Link>
          <div className="flex items-center gap-3">
            <img src="/apps/praypro_logo.png" alt="PrayPro" className="w-8 h-8 rounded-lg" />
            <span className="font-serif text-xl" style={{ color: '#525048' }}>PrayPro</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-serif italic text-sm tracking-[0.3em] block mb-4" style={{ color: '#B29F86' }}>
                iOS App
              </span>
              <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6" style={{ color: '#525048' }}>
                Your Daily
                <br />
                <span className="italic" style={{ color: '#B29F86' }}>Prayer Companion</span>
              </h1>
              <p className="text-xl mb-8 max-w-lg" style={{ color: 'rgba(82, 80, 72, 0.7)' }}>
                Deepen your faith with daily prayers, Bible verses, and beautiful sacred art. 
                Your personal space for spiritual growth and devotion.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://apps.apple.com/at/app/praypro/idXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{ background: '#525048', color: '#FAF9F7' }}
                >
                  <Download className="w-5 h-5" />
                  Download on App Store
                </a>
                <Link
                  to="/#work"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{ background: 'transparent', color: '#525048', border: '1px solid rgba(82, 80, 72, 0.2)' }}
                >
                  View More Apps
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[9/16] max-w-sm mx-auto rounded-[40px] overflow-hidden shadow-2xl">
                <img 
                  src={screenshots[activeImage].src} 
                  alt={screenshots[activeImage].alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center gap-2 mt-6">
                {screenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{ 
                      background: idx === activeImage ? '#B29F86' : 'rgba(82, 80, 72, 0.2)',
                      transform: idx === activeImage ? 'scale(1.3)' : 'scale(1)'
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
              Nourish Your Soul
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(82, 80, 72, 0.06)',
                }}
              >
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: 'linear-gradient(135deg, #E9CFB9, #B29F86)' }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-xl mb-3" style={{ color: '#525048' }}>
                  {feature.title}
                </h3>
                <p className="text-sm" style={{ color: 'rgba(82, 80, 72, 0.6)' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-serif italic text-sm tracking-[0.3em] block mb-4" style={{ color: '#B29F86' }}>
              Sacred Art
            </span>
            <h2 className="font-serif text-4xl md:text-5xl" style={{ color: '#525048' }}>
              Inspired by the Divine
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {screenshots.map((screenshot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="aspect-[9/16] rounded-3xl overflow-hidden"
                style={{ boxShadow: '0 20px 40px rgba(82, 80, 72, 0.1)' }}
              >
                <img 
                  src={screenshot.src} 
                  alt={screenshot.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-8" style={{ background: '#E8E5E0' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 md:p-16 rounded-[40px]"
            style={{
              background: 'linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 100%)',
              boxShadow: '0 32px 64px rgba(0, 0, 0, 0.25)',
            }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              Begin Your Journey
            </h2>
            <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
              Start your daily prayer practice today. Find peace, guidance, and inspiration with PrayPro.
            </p>
            <a
              href="https://apps.apple.com/at/app/praypro/idXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{
                background: 'white',
                color: '#2a2a2a',
              }}
            >
              <Download className="w-5 h-5" />
              Get PrayPro
            </a>
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
          <Link to="/" className="flex items-center gap-2 text-sm" style={{ color: '#2a2a2a' }}>
            Visit AWEN28
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default PrayPro;

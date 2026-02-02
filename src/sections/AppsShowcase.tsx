import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  BookOpen,
  Eye,
  Moon,
  Shield,
  Shirt,
  Search,
  Star,
  ExternalLink
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface App {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: string;
  href: string;
  featured?: boolean;
  platforms: Array<'ios' | 'android'>;
  iosUrl?: string;
  androidUrl?: string;
}

const apps: App[] = [
  {
    id: 'numistellar',
    name: 'NumiStellar',
    subtitle: 'Your Spiritual Guide',
    description: 'Discover insights through numerology and astrology. Unlock the secrets of your personal numbers and celestial influences.',
    icon: Star,
    color: '#d4c5b0',
    href: 'https://www.awen28.com/numistellar',
    featured: true,
    platforms: ['ios']
  },
  {
    id: 'awenya',
    name: 'Awenya',
    subtitle: 'Find your calm. Anywhere. Anytime.',
    description: 'Meditation and mindfulness companion for your daily wellness journey. Breathe, relax, and find inner peace.',
    icon: Moon,
    color: '#a8b5a0',
    href: 'https://www.awen28.com/awenya',
    platforms: ['ios']
  },
  {
    id: 'kibook',
    name: 'kiBook',
    subtitle: "Create Books with your Child's fantasy",
    description: 'Transform your child\'s imagination into beautiful illustrated stories. AI-powered storytelling for families.',
    icon: BookOpen,
    color: '#c5b8d4',
    href: 'https://www.awen28.com/kibook',
    platforms: ['ios']
  },
  {
    id: 'visai',
    name: 'VisAI',
    subtitle: 'AI Powered Vision Board',
    description: 'Manifest your dreams with AI-generated vision boards. Visualize your goals and track your progress.',
    icon: Eye,
    color: '#b8c5d4',
    href: 'https://www.awen28.com/visai',
    platforms: ['ios']
  },
  {
    id: '369',
    name: '369',
    subtitle: 'Manifestation & Meditation Assistant',
    description: 'Harness the power of the 369 manifestation method. Daily affirmations and guided meditations.',
    icon: Sparkles,
    color: '#d4b8c5',
    href: 'https://www.awen28.com/369-manifestation-app',
    platforms: ['ios']
  },
  {
    id: 'suremate',
    name: 'SureMate',
    subtitle: 'Your Assistant for Insurance Claims',
    description: 'Simplify insurance claims with AI guidance. Navigate the complex world of insurance with confidence.',
    icon: Shield,
    color: '#b8d4c5',
    href: 'https://www.awen28.com/suremate',
    platforms: ['ios']
  },
  {
    id: 'suremate-pro',
    name: 'SureMate Pro',
    subtitle: 'SureMate for Agents',
    description: 'Professional tools for insurance agents. Streamline client management and claims processing.',
    icon: Shield,
    color: '#90c5a8',
    href: 'https://www.awen28.com/suremate-pro',
    platforms: ['ios']
  },
  {
    id: 'istyle',
    name: 'I STYLE YOU DAILY',
    subtitle: 'AI Powered Virtual Closet',
    description: 'Your personal AI stylist. Get daily outfit recommendations based on your wardrobe and preferences.',
    icon: Shirt,
    color: '#d4c5a0',
    href: 'https://www.awen28.com/i-style-you-daily',
    platforms: ['ios']
  },
  {
    id: 'findimal',
    name: 'FINDIMAL',
    subtitle: 'Lost & Found Pets',
    description: 'Community-powered pet recovery platform. Connect with neighbors to find lost pets and reunite families.',
    icon: Search,
    color: '#c5d4b8',
    href: 'https://www.awen28.com/findimal',
    platforms: ['ios']
  }
];

const AppCard = ({ app, index }: { app: App; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const navigate = useNavigate();
  const Icon = app.icon;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: isMobile ? 20 : 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: isMobile ? 0.4 : 0.8,
        delay: isMobile ? 0 : index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="group relative"
    >
      <div
        className="block cursor-pointer"
        onClick={() => navigate(`/app/${app.id}`)}
      >
        <motion.div
          className={`app-card relative overflow-hidden rounded-3xl bg-secondary/50 border border-border/50 p-8 h-full ${
            app.featured ? 'md:col-span-2 md:row-span-2' : ''
          }`}
          whileHover={isMobile ? {} : {
            borderColor: app.color,
            y: -8,
            scale: 1.02,
            transition: { duration: 0.3, ease: 'easeOut' }
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Glow effect on hover */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${app.color}15, transparent 60%)`
            }}
          />

          {/* Featured badge */}
          {app.featured && (
            <div className="absolute top-6 right-6">
              <span 
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{ 
                  backgroundColor: `${app.color}20`,
                  color: app.color
                }}
              >
                Featured
              </span>
            </div>
          )}

          {/* Icon */}
          <motion.div 
            className={`relative mb-6 w-16 h-16 rounded-2xl flex items-center justify-center ${
              app.featured ? 'md:w-20 md:h-20' : ''
            }`}
            style={{ backgroundColor: `${app.color}15` }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Icon 
              className={`${app.featured ? 'md:w-10 md:h-10' : ''}`}
              style={{ color: app.color }} 
              size={app.featured ? 32 : 28} 
            />
          </motion.div>

          {/* Content */}
          <div className="relative">
            <h3 className={`font-semibold text-foreground mb-2 ${
              app.featured ? 'text-3xl md:text-4xl' : 'text-xl'
            }`}>
              {app.name}
            </h3>
            <p
              className={`text-sm mb-4 ${
                app.featured ? 'text-lg md:text-xl' : ''
              }`}
              style={{ color: app.color }}
            >
              {app.subtitle}
            </p>
            <p className={`text-muted-foreground leading-relaxed ${
              app.featured ? 'text-base md:text-lg max-w-xl' : 'text-sm'
            }`}>
              {app.description}
            </p>
          </div>

          {/* Link indicator */}
          <motion.div 
            className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            <ExternalLink className="w-5 h-5" style={{ color: app.color }} />
          </motion.div>

          {/* Bottom gradient line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${app.color}, transparent)`,
              opacity: 0
            }}
            whileHover={{ opacity: 1 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const AppsShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // Skip GSAP animations on mobile

    const ctx = gsap.context(() => {
      gsap.fromTo('.section-title-line',
        { width: 0 },
        {
          width: '100%',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="apps" 
      className="relative py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Section header */}
      <div ref={titleRef} className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-6">
            <span className="gradient-text">Apps</span>
          </h2>
          <div className="section-title-line h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent max-w-md mx-auto" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg">
            A collection of innovative applications designed to enhance your daily life, 
            from wellness and creativity to productivity and beyond.
          </p>
        </motion.div>
      </div>

      {/* Apps grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, index) => (
            <AppCard key={app.id} app={app} index={index} />
          ))}
        </div>
      </div>

      {/* Stats */}
      <motion.div 
        className="max-w-4xl mx-auto mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {[
          { value: '9', label: 'Apps Published' },
          { value: '10K+', label: 'Downloads' },
          { value: '4.4', label: 'Average Rating' },
          { value: '50+', label: 'Countries' },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl md:text-5xl font-light text-primary mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default AppsShowcase;

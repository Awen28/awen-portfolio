import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ExternalLink, Check } from 'lucide-react';
import { SEO } from '../components/SEO';
import { softwareAppSchema, breadcrumbSchema } from '../lib/structured-data';

gsap.registerPlugin(ScrollTrigger);

// Import app data
import {
  Sparkles,
  BookOpen,
  Eye,
  Moon,
  Shield,
  Shirt,
  Search,
  Star as StarIcon,
} from 'lucide-react';

interface AppData {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  icon: React.ElementType;
  color: string;
  href: string;
  platforms: Array<'ios' | 'android'>;
  iosUrl?: string;
  androidUrl?: string;
  features: string[];
  category: string;
}

const appsData: Record<string, AppData> = {
  numistellar: {
    id: 'numistellar',
    name: 'NumiStellar',
    subtitle: 'Your Spiritual Guide',
    description: 'Discover insights through numerology and astrology.',
    fullDescription: 'NumiStellar combines ancient wisdom with modern technology to provide personalized numerological and astrological insights. Unlock the secrets of your personal numbers and celestial influences to gain deeper understanding of your life path, relationships, and destiny.',
    icon: StarIcon,
    color: '#d4c5b0',
    href: 'https://www.awen28.com/numistellar',
    platforms: ['ios'],
    iosUrl: 'https://apps.apple.com/app/numistellar/id6738997854',
    category: 'Lifestyle & Spirituality',
    features: [
      'Personalized numerology readings',
      'Astrological chart analysis',
      'Daily spiritual guidance',
      'Compatibility insights',
      'Life path number calculator',
      'Beautiful, intuitive interface',
    ],
  },
  awenya: {
    id: 'awenya',
    name: 'Awenya',
    subtitle: 'Find your calm. Anywhere. Anytime.',
    description: 'Meditation and mindfulness companion.',
    fullDescription: 'Awenya is your personal meditation and mindfulness companion designed to help you find inner peace in the midst of daily chaos. With guided meditations, breathing exercises, and calming soundscapes, Awenya makes wellness accessible anywhere, anytime.',
    icon: Moon,
    color: '#a8b5a0',
    href: 'https://www.awen28.com/awenya',
    platforms: ['ios'],
    category: 'Health & Wellness',
    features: [
      'Guided meditation sessions',
      'Breathing exercises',
      'Calming soundscapes',
      'Progress tracking',
      'Customizable sessions',
      'Sleep stories',
    ],
  },
  kibook: {
    id: 'kibook',
    name: 'kiBook',
    subtitle: "Create Books with your Child's fantasy",
    description: 'Transform imagination into illustrated stories.',
    fullDescription: 'kiBook brings your child\'s wildest dreams to life through AI-powered storytelling. Create personalized, beautifully illustrated books featuring your child as the main character. Perfect for bedtime stories, educational content, or simply nurturing creativity.',
    icon: BookOpen,
    color: '#c5b8d4',
    href: 'https://www.awen28.com/kibook',
    platforms: ['ios'],
    category: 'Family & Education',
    features: [
      'AI-generated stories',
      'Custom illustrations',
      'Personalized characters',
      'Print-ready format',
      'Story templates',
      'Share with family',
    ],
  },
  visai: {
    id: 'visai',
    name: 'VisAI',
    subtitle: 'AI Powered Vision Board',
    description: 'Manifest your dreams with AI.',
    fullDescription: 'VisAI revolutionizes goal-setting with AI-generated vision boards that inspire and motivate. Visualize your dreams, set meaningful goals, and track your progress with beautiful, personalized imagery that keeps you focused on what matters most.',
    icon: Eye,
    color: '#b8c5d4',
    href: 'https://www.awen28.com/visai',
    platforms: ['ios'],
    category: 'Productivity & Goal Setting',
    features: [
      'AI-generated vision boards',
      'Goal tracking',
      'Affirmation reminders',
      'Progress visualization',
      'Custom categories',
      'Inspiration feed',
    ],
  },
  '369': {
    id: '369',
    name: '369',
    subtitle: 'Manifestation & Meditation Assistant',
    description: 'Harness the 369 manifestation method.',
    fullDescription: 'Based on the powerful 369 manifestation technique, this app combines ancient wisdom with modern practice. Daily affirmations, guided meditations, and manifestation tracking help you align your thoughts and actions with your deepest desires.',
    icon: Sparkles,
    color: '#d4b8c5',
    href: 'https://www.awen28.com/369-manifestation-app',
    platforms: ['ios'],
    category: 'Lifestyle & Spirituality',
    features: [
      '369 manifestation method',
      'Daily affirmations',
      'Guided meditations',
      'Manifestation journal',
      'Reminder notifications',
      'Progress insights',
    ],
  },
  suremate: {
    id: 'suremate',
    name: 'SureMate',
    subtitle: 'Your Assistant for Insurance Claims',
    description: 'Simplify insurance claims with AI.',
    fullDescription: 'SureMate makes navigating insurance claims simple and stress-free. With AI-powered guidance, document management, and step-by-step support, you can handle any claim with confidence and clarity.',
    icon: Shield,
    color: '#b8d4c5',
    href: 'https://www.awen28.com/suremate',
    platforms: ['ios'],
    category: 'Finance & Insurance',
    features: [
      'AI claim assistance',
      'Document scanner',
      'Claim tracking',
      'Insurance glossary',
      'Provider directory',
      'Secure storage',
    ],
  },
  'suremate-pro': {
    id: 'suremate-pro',
    name: 'SureMate Pro',
    subtitle: 'SureMate for Agents',
    description: 'Professional tools for insurance agents.',
    fullDescription: 'SureMate Pro is the professional version designed specifically for insurance agents. Streamline client management, process claims faster, and provide better service with powerful tools built for professionals.',
    icon: Shield,
    color: '#90c5a8',
    href: 'https://www.awen28.com/suremate-pro',
    platforms: ['ios'],
    category: 'Business & Productivity',
    features: [
      'Client management',
      'Bulk claim processing',
      'Analytics dashboard',
      'Commission tracking',
      'Team collaboration',
      'White-label options',
    ],
  },
  istyle: {
    id: 'istyle',
    name: 'I STYLE YOU DAILY',
    subtitle: 'AI Powered Virtual Closet',
    description: 'Your personal AI stylist.',
    fullDescription: 'I STYLE YOU DAILY is your personal AI stylist that learns your style preferences and creates perfect outfit combinations from your wardrobe. Get daily outfit recommendations, organize your closet digitally, and never wonder what to wear again.',
    icon: Shirt,
    color: '#d4c5a0',
    href: 'https://www.awen28.com/i-style-you-daily',
    platforms: ['ios'],
    category: 'Fashion & Lifestyle',
    features: [
      'AI outfit recommendations',
      'Virtual closet organization',
      'Style profile creation',
      'Weather-based suggestions',
      'Occasion planning',
      'Shopping lists',
    ],
  },
  findimal: {
    id: 'findimal',
    name: 'FINDIMAL',
    subtitle: 'Lost & Found Pets',
    description: 'Community-powered pet recovery.',
    fullDescription: 'FINDIMAL connects pet owners with their community to help lost pets find their way home. With real-time alerts, location-based searching, and a supportive community, FINDIMAL increases the chances of happy reunions.',
    icon: Search,
    color: '#c5d4b8',
    href: 'https://www.awen28.com/findimal',
    platforms: ['ios'],
    category: 'Lifestyle & Community',
    features: [
      'Lost pet alerts',
      'Location-based search',
      'Pet profiles',
      'Community sightings',
      'QR code tags',
      'Success stories',
    ],
  },
};

const AppDetail = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);

  const app = appId ? appsData[appId] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [appId]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fade-in-section',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [app]);

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-light text-foreground mb-4">App not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:underline"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  const Icon = app.icon;

  const appStructuredData = softwareAppSchema({
    name: app.name,
    description: app.fullDescription,
    category: app.category,
    url: app.href,
  });

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://awen28.com' },
    { name: 'Apps', url: 'https://awen28.com/#apps' },
    { name: app.name, url: `https://awen28.com/app/${app.id}` },
  ]);

  return (
    <>
      <SEO
        title={`${app.name} - ${app.subtitle}`}
        description={app.fullDescription}
        keywords={`${app.name}, ${app.category}, iOS App, Mobile App, ${app.features.join(', ')}, AWEN28, Thomas Mayrl`}
        url={`https://awen28.com/app/${app.id}`}
        type="article"
        structuredData={[appStructuredData, breadcrumbs]}
      />
      <div ref={sectionRef} className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[150px] opacity-30"
            style={{ backgroundColor: app.color }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[150px] opacity-20"
            style={{ backgroundColor: app.color }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate('/')}
            className="absolute top-8 left-8 p-3 rounded-full bg-secondary/50 border border-border/50 hover:border-primary/30 transition-all"
            whileHover={{ scale: 1.05, x: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>

          {/* App Icon */}
          <motion.div
            className="fade-in-section mb-8 inline-flex items-center justify-center w-24 h-24 rounded-3xl"
            style={{ backgroundColor: `${app.color}20` }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: 'backOut' }}
          >
            <Icon size={48} style={{ color: app.color }} />
          </motion.div>

          {/* App Name & Subtitle */}
          <motion.h1
            className="fade-in-section text-5xl md:text-7xl font-light text-foreground mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {app.name}
          </motion.h1>
          <motion.p
            className="fade-in-section text-2xl md:text-3xl mb-6"
            style={{ color: app.color }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {app.subtitle}
          </motion.p>

          {/* Category */}
          <motion.span
            className="fade-in-section inline-block px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {app.category}
          </motion.span>

          {/* Learn More Link */}
          <motion.div
            className="fade-in-section flex justify-center mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-background hover:bg-primary/90 transition-all font-medium"
            >
              <span>Learn More</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Description & Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Description */}
            <div className="fade-in-section">
              <h2 className="text-3xl font-light text-foreground mb-6">
                About <span style={{ color: app.color }}>{app.name}</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {app.fullDescription}
              </p>
            </div>

            {/* Features */}
            <div className="fade-in-section">
              <h3 className="text-3xl font-light text-foreground mb-6">Features</h3>
              <ul className="space-y-4">
                {app.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div
                      className="mt-1 p-1 rounded-full"
                      style={{ backgroundColor: `${app.color}20` }}
                    >
                      <Check className="w-4 h-4" style={{ color: app.color }} />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            className="fade-in-section mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h3 className="text-3xl font-light text-foreground mb-6">
              Ready to get started?
            </h3>
            <a
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-background hover:bg-primary/90 transition-all font-medium"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Back to Apps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-5xl mx-auto text-center">
          <motion.button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-secondary/50 border border-border/50 hover:border-primary/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to All Apps</span>
          </motion.button>
        </div>
      </section>
    </div>
    </>
  );
};

export default AppDetail;

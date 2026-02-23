import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const apps = [
  {
    id: 'numistellar',
    name: 'NumiStellar',
    category: 'Spiritual Tech',
    description: 'Numerologie & Astrologie mit KI-Power. Tägliche Einblicke und persönliche Berechnungen.',
    image: '/apps/Awenya_homescree.png',
    icon: '/apps/lumiStellar_Logo.png',
    color: '#c084fc',
    stats: { rating: '4.9', downloads: '5.2K' },
  },
  {
    id: 'awenya',
    name: 'Awenya',
    category: 'Health & Wellness',
    description: 'Meditation für den Alltag. Geführte Sessions, Atemübungen und Schlafgeschichten.',
    image: '/apps/kiBook_homescreen.png',
    icon: '/apps/awenya_app_icon.png',
    color: '#06b6d4',
    stats: { rating: '4.8', downloads: '3.8K' },
  },
  {
    id: 'kibook',
    name: 'kiBook',
    category: 'AI & Education',
    description: 'KI-gestützte Kinderbücher. Verwandle Fantasie in illustrierte Geschichten.',
    image: '/apps/visAI_homescreen.png',
    icon: '/apps/kiBook_Logo_gelb.png',
    color: '#fbbf24',
    stats: { rating: '4.7', downloads: '2.5K' },
  },
  {
    id: 'visai',
    name: 'VisAI',
    category: 'Productivity',
    description: 'KI-generierte Vision Boards. Manifestiere deine Träume visuell.',
    image: '/apps/369_homescree.png',
    icon: '/apps/369_logo.png',
    color: '#ff6b9d',
    stats: { rating: '4.6', downloads: '1.8K' },
  },
  {
    id: 'suremate',
    name: 'SureMate',
    category: 'InsurTech',
    description: 'Versicherungs-Assistent mit KI. Schadensabwicklung vereinfacht.',
    image: '/apps/Suremate_home.png',
    icon: '/apps/logo_suremate_new.png',
    color: '#6366f1',
    stats: { rating: '4.7', downloads: '1.2K' },
  },

  {
    id: 'elow',
    name: 'Elow',
    category: 'Productivity',
    description: 'Flow-State Timer für maximale Produktivität. Intelligente Fokus-Zeiten.',
    image: '/apps/elow_homescreen.png',
    icon: '/apps/Elow Logo.png',
    color: '#3b82f6',
    stats: { rating: '4.8', downloads: '800' },
  },
  {
    id: 'suremate-pro',
    name: 'SureMate Pro',
    category: 'B2B',
    description: 'Professional-Version für Versicherungsvertreter mit CRM.',
    image: '/apps/Suremate_pro_home.png',
    icon: '/apps/SureMatePro_logo_2 2.jpg',
    color: '#10b981',
    stats: { rating: '4.9', downloads: '200' },
  },
];

const AppCarousel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const cards = cardsRef.current;

    if (!section || !container || !cards) return;

    const cardElements = cards.querySelectorAll('.carousel-card');
    const totalCards = cardElements.length;
    const angleStep = 360 / totalCards;

    // Position cards in a circle
    cardElements.forEach((card, index) => {
      const angle = angleStep * index;
      const radian = (angle * Math.PI) / 180;
      const radius = 400; // Distance from center
      
      gsap.set(card, {
        x: Math.sin(radian) * radius,
        z: Math.cos(radian) * radius - radius,
        rotateY: angle,
        opacity: index === 0 ? 1 : 0.3,
        scale: index === 0 ? 1 : 0.8,
      });
    });

    // Scroll-driven rotation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${totalCards * 100}%`,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (totalCards - 1),
          duration: 0.5,
          ease: 'power2.inOut',
        },
      },
    });

    // Rotate the entire carousel
    tl.to(cards, {
      rotateY: 360,
      duration: totalCards,
      ease: 'none',
    });

    // Update individual card opacity/scale based on position
    cardElements.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${totalCards * 100}%`,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress * totalCards;
          const cardProgress = (progress - index + totalCards) % totalCards;
          const normalizedProgress = Math.min(cardProgress, totalCards - cardProgress);
          
          const opacity = Math.max(0.2, 1 - normalizedProgress * 0.4);
          const scale = Math.max(0.7, 1 - normalizedProgress * 0.15);
          
          gsap.to(card, {
            opacity,
            scale,
            duration: 0.1,
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="apps"
      className="relative w-full h-screen overflow-hidden bg-[#020202]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Header */}
      <div className="absolute top-12 left-0 right-0 z-20 text-center">
        <span className="inline-block px-4 py-2 rounded-full glass text-sm text-white/50 mb-4">
          Unsere Apps
        </span>
        <h2 className="text-4xl md:text-5xl font-light">
          <span className="text-white">Projekte in </span>
          <span className="gradient-aurora">360°</span>
        </h2>
        <p className="text-white/40 mt-2">Scroll für die nächste App</p>
      </div>

      {/* 3D Carousel Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center perspective-2000"
      >
        <div
          ref={cardsRef}
          className="relative transform-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {apps.map((app) => (
            <div
              key={app.id}
              className="carousel-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[320px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card Content */}
              <div className="glass-strong rounded-3xl p-6">
                {/* Screenshot - Smaller */}
                <div 
                  className="relative rounded-2xl overflow-hidden mb-4"
                  style={{
                    boxShadow: `0 20px 60px -20px ${app.color}50`,
                  }}
                >
                  <img
                    src={app.image}
                    alt={app.name}
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: '9/16', maxHeight: '280px' }}
                  />
                </div>

                {/* Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl overflow-hidden"
                    style={{ boxShadow: `0 4px 16px ${app.color}40` }}
                  >
                    <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{app.name}</h3>
                    <p className="text-xs text-white/40">{app.category}</p>
                  </div>
                </div>

                <p className="text-sm text-white/50 mb-4 line-clamp-2">
                  {app.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4" style={{ color: app.color }} />
                      {app.stats.rating}
                    </span>
                    <span className="text-sm text-white/40">
                      {app.stats.downloads}
                    </span>
                  </div>
                  <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                    <ExternalLink className="w-4 h-4 text-white/60" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-2">
          {apps.map((_, idx) => (
            <div
              key={idx}
              className="w-2 h-2 rounded-full bg-white/20 carousel-dot"
              data-index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppCarousel;

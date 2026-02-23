import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Download, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const apps = [
  {
    id: 'numistellar',
    name: 'NumiStellar',
    tagline: 'Dein spiritueller Guide',
    description: 'Numerologie und Astrologie vereint. Entdecke tiefgehende Einblicke in deine Persönlichkeit und deinen Lebensweg.',
    image: '/apps/Awenya_homescree.png',
    icon: '/apps/lumiStellar_Logo.png',
    color: '#c084fc',
    stats: { rating: '4.9', downloads: '5.2K' },
  },
  {
    id: 'awenya',
    name: 'Awenya',
    tagline: 'Finde deine innere Ruhe',
    description: 'Meditation und Achtsamkeit für den Alltag. Geführte Sessions, Atemübungen und Schlafgeschichten.',
    image: '/apps/kiBook_homescreen.png',
    icon: '/apps/awenya_app_icon.png',
    color: '#06b6d4',
    stats: { rating: '4.8', downloads: '3.8K' },
  },
  {
    id: 'kibook',
    name: 'kiBook',
    tagline: 'Magische Geschichten',
    description: 'KI-gestützte Kinderbücher. Verwandle die Fantasie deines Kindes in wunderschön illustrierte Abenteuer.',
    image: '/apps/visAI_homescreen.png',
    icon: '/apps/kiBook_Logo_gelb.png',
    color: '#fbbf24',
    stats: { rating: '4.7', downloads: '2.5K' },
  },
  {
    id: 'visai',
    name: 'VisAI',
    tagline: 'Vision Boards neu gedacht',
    description: 'KI-generierte Vision Boards. Manifestiere deine Träume mit intelligenter Bildgenerierung.',
    image: '/apps/369_homescree.png',
    icon: '/apps/369_logo.png',
    color: '#ff6b9d',
    stats: { rating: '4.6', downloads: '1.8K' },
  },
];

const AppShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    // Header reveal
    gsap.fromTo(
      header,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
        },
      }
    );

    // Each app section pinning
    const appSections = section.querySelectorAll('.app-section');
    
    appSections.forEach((appSection) => {
      const phone = appSection.querySelector('.app-phone');
      const content = appSection.querySelector('.app-content');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: appSection,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 1,
        },
      });

      // Entry animation
      tl.fromTo(
        phone,
        { scale: 0.8, opacity: 0, y: 100 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3 }
      )
      .fromTo(
        content,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3 },
        '<'
      )
      // Hold
      .to({}, { duration: 0.4 })
      // Exit animation - phone zooms past camera
      .to(phone, {
        scale: 2,
        y: -200,
        opacity: 0,
        duration: 0.3,
      })
      .to(
        content,
        {
          x: -100,
          opacity: 0,
          duration: 0.3,
        },
        '<'
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="apps"
      className="relative bg-[#020202]"
    >
      {/* Section Header */}
      <div ref={headerRef} className="py-32 px-4 text-center">
        <span className="inline-block px-4 py-2 rounded-full glass text-sm text-white/50 mb-8">
          Unsere Apps
        </span>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-light">
          <span className="gradient-indigo">Innovation</span>
          <br />
          <span className="text-white/90">in deiner Hand</span>
        </h2>
      </div>

      {/* App Sections */}
      {apps.map((app, index) => (
        <div
          key={app.id}
          className="app-section relative w-full h-screen overflow-hidden"
        >
          {/* Background Glow */}
          <div
            className="app-bg absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${app.color}20 0%, transparent 60%)`,
            }}
          />

          {/* Content Grid */}
          <div className="relative z-10 h-full max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className={`app-content ${index % 2 === 1 ? 'md:order-2' : ''}`}>
              <div className="glass-strong rounded-3xl p-8 md:p-12 max-w-lg">
                {/* Icon & Name */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl overflow-hidden"
                    style={{ boxShadow: `0 8px 32px ${app.color}40` }}
                  >
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-light text-white">
                      {app.name}
                    </h3>
                    <p className="text-white/50" style={{ color: app.color }}>
                      {app.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  {app.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-8 mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5" style={{ color: app.color }} />
                    <span className="text-2xl font-light text-white">{app.stats.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-white/40" />
                    <span className="text-2xl font-light text-white">{app.stats.downloads}</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  className="btn-2026 flex items-center gap-2 group"
                  style={{
                    background: `linear-gradient(135deg, ${app.color}20, transparent)`,
                    borderColor: `${app.color}50`,
                  }}
                >
                  <span>App ansehen</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Phone */}
            <div className={`flex justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
              <div
                className="app-phone"
                style={{
                  boxShadow: `0 50px 100px -20px ${app.color}30`,
                }}
              >
                <div className="iphone-2026 w-[240px] md:w-[300px] lg:w-[340px]">
                  <div className="iphone-2026-inner">
                    <img
                      src={app.image}
                      alt={app.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AppShowcase;

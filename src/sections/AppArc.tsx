import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const apps = [
  {
    id: '369',
    name: '369',
    description: 'Manifest your dreams into reality. The 369 method combined with guided meditation helps you focus your energy and attract what you truly desire.',
    image: '/apps/369_homescree.png',
    icon: '/apps/369_logo.png',
    color: '#ff6b9d',
    stats: { rating: '4.8', downloads: '12K' },
  },
  {
    id: 'numistellar',
    name: 'NumiStellar',
    description: 'Discover your cosmic energy. Astrology, numerology, and Schumann resonance come together to reveal your true potential and daily guidance.',
    image: '/apps/892_1x_shots_so Kopie.png',
    icon: '/apps/lumiStellar_Logo.png',
    color: '#c084fc',
    stats: { rating: '4.9', downloads: '8.5K' },
  },
  {
    id: 'elow',
    name: 'Elow',
    description: 'Create your unique sound. Our AI transforms your ideas into original songs. Just describe your mood and let the music flow.',
    image: '/apps/elow_homescreen.png',
    icon: '/apps/Elow Logo.png',
    color: '#3b82f6',
    stats: { rating: '4.7', downloads: '5.2K' },
  },
  {
    id: 'kibook',
    name: 'kiBook',
    description: 'Magic stories in seconds. Transform your child\'s imagination into beautifully illustrated books with the power of AI storytelling.',
    image: '/apps/kiBook_homescreen.png',
    icon: '/apps/kiBook_Logo_gelb.png',
    color: '#fbbf24',
    stats: { rating: '4.9', downloads: '15K' },
  },
  {
    id: 'awenya',
    name: 'Awenya',
    description: 'Your personal sanctuary. Guided meditations, breathing exercises, and sleep stories designed to bring peace to your daily life.',
    image: '/apps/Awenya_homescree.png',
    icon: '/apps/awenya_app_icon.png',
    color: '#06b6d4',
    stats: { rating: '4.9', downloads: '22K' },
  },
  {
    id: 'visai',
    name: 'VisAI',
    description: 'Dream it, see it, achieve it. AI-powered vision boards that transform your goals into stunning visual realities. Manifest your future.',
    image: '/apps/visAI_homescreen.png',
    icon: '/apps/369_logo.png',
    color: '#6366f1',
    stats: { rating: '4.6', downloads: '3.8K' },
  },
];

const AppArc = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const screens = container.querySelectorAll('.arc-screen');
    const infos = container.querySelectorAll('.arc-info');
    const totalApps = apps.length;

    // Create scroll timeline for each app
    screens.forEach((screen, index) => {
      const info = infos[index];
      
      // Arc path animation:
      // 0%: bottom left (outside viewport)
      // 50%: center (full opacity, info visible)
      // 100%: bottom right (outside viewport)
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: `${(index / totalApps) * 100}% top`,
          end: `${((index + 1) / totalApps) * 100}% top`,
          scrub: 1,
          snap: {
            snapTo: 0.5,
            duration: 0.3,
            ease: 'power2.inOut',
          },
        },
      });

      // Start: bottom left, small, hidden
      tl.fromTo(
        screen,
        {
          x: '-30vw',
          y: '40vh',
          scale: 0.5,
          opacity: 0,
          rotation: -15,
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          rotation: 0,
          ease: 'none',
          duration: 1,
        },
        0
      );

      // Info appears when centered
      tl.fromTo(
        info,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'none',
          duration: 0.4,
        },
        0.3
      );

      // Exit: bottom right, small, hidden
      tl.to(
        screen,
        {
          x: '30vw',
          y: '40vh',
          scale: 0.5,
          opacity: 0,
          rotation: 15,
          ease: 'none',
          duration: 1,
        },
        0.5
      );

      // Info disappears
      tl.to(
        info,
        {
          opacity: 0,
          y: -30,
          scale: 0.9,
          ease: 'none',
          duration: 0.4,
        },
        0.6
      );
    });

    // Pin the section for the entire duration
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${totalApps * 100}%`,
      pin: true,
      pinSpacing: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 60%)',
            filter: 'blur(120px)',
          }}
        />
      </div>

      {/* Header */}
      <div className="absolute top-8 left-0 right-0 z-30 text-center">
        <span className="inline-block px-4 py-2 rounded-full glass text-sm text-white/50 mb-4">
          Unsere Apps
        </span>
        <h2 className="text-4xl md:text-5xl font-light">
          <span className="text-white">Ausgewählte </span>
          <span className="gradient-aurora">Projekte</span>
        </h2>
      </div>

      {/* Arc Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {apps.map((app, index) => (
          <div
            key={app.id}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: apps.length - index }}
          >
            {/* Screenshot - Center */}
            <div 
              className="arc-screen pointer-events-auto"
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              <div 
                className="relative rounded-3xl overflow-hidden bg-black/50"
                style={{
                  width: '260px',
                  height: '520px',
                  boxShadow: `0 30px 100px -20px ${app.color}60, 0 0 0 1px rgba(255,255,255,0.1)`,
                }}
              >
                <img
                  src={app.image}
                  alt={app.name}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Info - Bottom center */}
            <div 
              className="arc-info absolute bottom-24 left-0 right-0 flex justify-center pointer-events-auto"
              style={{ opacity: 0 }}
            >
              <div className="glass-strong rounded-2xl p-6 max-w-md mx-4 text-center">
                {/* Icon & Name */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl overflow-hidden"
                    style={{ boxShadow: `0 4px 20px ${app.color}40` }}
                  >
                    <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-medium text-white">{app.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4" style={{ color: app.color }} />
                      <span className="text-white/60">{app.stats.rating}</span>
                      <span className="text-white/30">•</span>
                      <span className="text-white/40">{app.stats.downloads}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {app.description}
                </p>

                {/* CTA */}
                <button
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                  style={{
                    background: `${app.color}20`,
                    color: app.color,
                    border: `1px solid ${app.color}40`,
                  }}
                >
                  <span>Mehr erfahren</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="absolute bottom-8 left-0 right-0 z-30">
        <div className="flex items-center justify-center gap-2">
          {apps.map((_, idx) => (
            <div
              key={idx}
              className="w-1.5 h-1.5 rounded-full bg-white/20"
            />
          ))}
        </div>
        <p className="text-center text-white/30 text-sm mt-4">Scroll für mehr</p>
      </div>
    </section>
  );
};

export default AppArc;

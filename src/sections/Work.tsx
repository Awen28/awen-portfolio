import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Alle Apps als Projekte
const projects = [
  {
    id: 'numistellar',
    name: 'NumiStellar',
    category: 'iOS App • Spirituelle Technologie',
    description: 'Eine spirituelle Guide-App mit Numerologie und Astrologie. KI-gestützte Berechnungen und personalisierte Einblicke.',
    image: '/apps/Awenya_homescree.png',
    icon: '/apps/lumiStellar_Logo.png',
    color: '#c084fc',
    stats: { rating: '4.9', downloads: '5.2K' },
    tags: ['SwiftUI', 'KI', 'iOS'],
  },
  {
    id: 'awenya',
    name: 'Awenya',
    category: 'iOS App • Gesundheit',
    description: 'Meditation und Achtsamkeit für den Alltag. Mit geführten Sessions, Atemübungen und Schlafgeschichten.',
    image: '/apps/kiBook_homescreen.png',
    icon: '/apps/awenya_app_icon.png',
    color: '#06b6d4',
    stats: { rating: '4.8', downloads: '3.8K' },
    tags: ['HealthKit', 'SwiftUI', 'Audio'],
  },
  {
    id: 'kibook',
    name: 'kiBook',
    category: 'iOS App • KI & Bildung',
    description: 'KI-gestützte Kinderbücher. Verwandelt die Fantasie von Kindern in wunderschön illustrierte Geschichten.',
    image: '/apps/visAI_homescreen.png',
    icon: '/apps/kiBook_Logo_gelb.png',
    color: '#fbbf24',
    stats: { rating: '4.7', downloads: '2.5K' },
    tags: ['OpenAI', 'Image Gen', 'iOS'],
  },
  {
    id: 'visai',
    name: 'VisAI',
    category: 'iOS App • Produktivität',
    description: 'KI-generierte Vision Boards mit intelligenter Bildgenerierung. Manifestiere deine Träume visuell.',
    image: '/apps/369_homescree.png',
    icon: '/apps/369_logo.png',
    color: '#ff6b9d',
    stats: { rating: '4.6', downloads: '1.8K' },
    tags: ['DALL-E', 'SwiftUI', 'iOS'],
  },
  {
    id: 'suremate',
    name: 'SureMate',
    category: 'iOS App • Fintech',
    description: 'Versicherungs-Assistent mit KI-Unterstützung. Schadensabwicklung und Dokumentenmanagement vereinfacht.',
    image: '/apps/Suremate_home.png',
    icon: '/apps/logo_suremate_new.png',
    color: '#6366f1',
    stats: { rating: '4.7', downloads: '1.2K' },
    tags: ['Fintech', 'OCR', 'iOS'],
  },
  {
    id: 'isyd',
    name: 'I Style You Daily',
    category: 'iOS App • Fashion Tech',
    description: 'KI-Stylist für deinen Kleiderschrank. Tägliche Outfit-Empfehlungen basierend auf Wetter und Stil.',
    image: '/apps/isyd_Homescreen.png',
    icon: '/apps/ISYDLOGO.png',
    color: '#f59e0b',
    stats: { rating: '4.5', downloads: '1.1K' },
    tags: ['Vision API', 'Weather API', 'iOS'],
  },
  {
    id: 'elow',
    name: 'Elow',
    category: 'iOS App • Produktivität',
    description: 'Flow-State Timer für maximale Produktivität. Intelligente Pausen- und Fokus-Zeiten.',
    image: '/apps/Elow_homescreen.png',
    icon: '/apps/Elow Logo.png',
    color: '#3b82f6',
    stats: { rating: '4.8', downloads: '800' },
    tags: ['Timer', 'Focus', 'iOS'],
  },
  {
    id: 'suremate-pro',
    name: 'SureMate Pro',
    category: 'iOS App • B2B',
    description: 'Professional-Version für Versicherungsvertreter. Kundenmanagement und optimierte Schadensabwicklung.',
    image: '/apps/Suremate_pro_home.png',
    icon: '/apps/SureMatePro_logo_2 2.jpg',
    color: '#10b981',
    stats: { rating: '4.9', downloads: '200' },
    tags: ['B2B', 'CRM', 'iOS'],
  },
];

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.project-item');
    
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-32 px-4 bg-[#020202]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-white/50 mb-8">
            Ausgewählte Projekte
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6">
            <span className="text-white">Unsere </span>
            <span className="gradient-indigo">Arbeit</span>
          </h2>
            <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Eine Auswahl unserer erfolgreichsten Projekte. Jedes davon wurde von uns konzipiert, designt und entwickelt.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-24">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`project-item grid lg:grid-cols-2 gap-12 items-center ${
                idx % 2 === 1 ? 'lg:[direction:rtl]' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-6 ${idx % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                {/* Icon & Category */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl overflow-hidden"
                    style={{ boxShadow: `0 8px 32px ${project.color}40` }}
                  >
                    <img
                      src={project.icon}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-sm text-white/40">{project.category}</span>
                  </div>
                </div>

                {/* Name & Description */}
                <div>
                  <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
                    {project.name}
                  </h3>
                  <p className="text-white/50 text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs bg-white/5 text-white/60 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats & CTA */}
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5" style={{ color: project.color }} />
                      <span className="text-2xl font-light text-white">{project.stats.rating}</span>
                    </div>
                    <div className="text-white/40 text-sm">
                      {project.stats.downloads} Downloads
                    </div>
                  </div>
                  <button
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                    style={{ color: project.color }}
                  >
                    <span>Details ansehen</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Screenshot - Clean without heavy frame */}
              <div className={`relative ${idx % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                <div className="relative group">
                  {/* Glow */}
                  <div
                    className="absolute -inset-4 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    style={{ background: project.color }}
                  />
                  
                  {/* Screenshot Container - Clean rounded corners */}
                  <div 
                    className="relative rounded-3xl overflow-hidden bg-black/50"
                    style={{
                      boxShadow: `
                        0 25px 80px -20px rgba(0,0,0,0.6),
                        0 0 0 1px rgba(255,255,255,0.05)
                      `,
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-auto object-cover"
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;

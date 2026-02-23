import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Smartphone, Globe, Palette, Brain, Database, LineChart, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Smartphone,
    title: 'iOS App Development',
    description: 'Native SwiftUI applications crafted for performance, elegance, and seamless user experience.',
    features: ['SwiftUI', 'SwiftData', 'HealthKit'],
    color: '#B29F86',
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Modern, performant websites and web applications built with cutting-edge technologies.',
    features: ['React', 'Next.js', 'TypeScript'],
    color: '#E9CFB9',
  },
  {
    icon: Palette,
    title: 'Brand Identity',
    description: 'Comprehensive brand systems including logo design, visual identity, and guidelines.',
    features: ['Logo Design', 'Visual Identity', 'Print'],
    color: '#525048',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Intelligent features powered by GPT, computer vision, and machine learning.',
    features: ['OpenAI', 'Computer Vision', 'Automation'],
    color: '#B29F86',
  },
  {
    icon: Database,
    title: 'Backend Systems',
    description: 'Scalable backend solutions, APIs, and cloud infrastructure architecture.',
    features: ['Firebase', 'Node.js', 'REST APIs'],
    color: '#E9CFB9',
  },
  {
    icon: LineChart,
    title: 'Digital Strategy',
    description: 'Data-driven strategy, SEO optimization, and growth consulting.',
    features: ['SEO', 'ASO', 'Analytics'],
    color: '#525048',
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease-out',
      }}
      className="group h-full cursor-default"
    >
      {/* Claymorphism Card */}
      <div
        className="h-full p-8 rounded-[32px] relative overflow-hidden"
        style={{
          background: '#FAF9F7',
          // Multiple layered shadows for clay effect
          boxShadow: `
            inset 2px 2px 4px rgba(255, 255, 255, 0.8),
            inset -2px -2px 4px rgba(82, 80, 72, 0.05),
            8px 8px 16px rgba(82, 80, 72, 0.08),
            -8px -8px 16px rgba(255, 255, 255, 0.9),
            1px 1px 0 rgba(255, 255, 255, 1)
          `,
        }}
      >
        {/* Soft inner glow on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${service.color}15 0%, transparent 70%)`,
          }}
        />

        {/* Icon */}
        <motion.div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10"
          style={{ 
            background: '#FAF9F7',
            boxShadow: `
              inset 1px 1px 2px rgba(255, 255, 255, 0.9),
              inset -1px -1px 2px rgba(82, 80, 72, 0.06),
              4px 4px 8px rgba(82, 80, 72, 0.08),
              -4px -4px 8px rgba(255, 255, 255, 0.95)
            `,
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <service.icon 
            className="w-6 h-6" 
            style={{ color: service.color }}
          />
        </motion.div>

        {/* Content */}
        <h3 
          className="font-serif text-2xl mb-3 relative z-10"
          style={{ color: '#525048' }}
        >
          {service.title}
        </h3>
        <p 
          className="text-sm leading-relaxed mb-6 relative z-10"
          style={{ color: 'rgba(82, 80, 72, 0.6)' }}
        >
          {service.description}
        </p>

        {/* Features - Clay tags */}
        <div className="flex flex-wrap gap-2 mb-6 relative z-10">
          {service.features.map((feature, i) => (
            <span
              key={i}
              className="px-3 py-1.5 text-xs rounded-xl"
              style={{ 
                background: '#FAF9F7',
                color: 'rgba(82, 80, 72, 0.7)',
                boxShadow: `
                  inset 1px 1px 1px rgba(255, 255, 255, 0.9),
                  inset -1px -1px 1px rgba(82, 80, 72, 0.04),
                  2px 2px 4px rgba(82, 80, 72, 0.06),
                  -2px -2px 4px rgba(255, 255, 255, 0.9)
                `,
              }}
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Link */}
        <motion.a 
          href="#contact" 
          className="inline-flex items-center gap-2 text-sm relative z-10"
          style={{ color: service.color }}
          whileHover={{ x: 5 }}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>Discuss your project</span>
          <ArrowUpRight className="w-4 h-4" />
        </motion.a>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 px-8"
      style={{ background: '#F5F3F0' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-sm tracking-[0.3em] block mb-6"
            style={{ color: '#B29F86' }}
          >
            What We Do
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6"
            style={{ color: '#525048' }}
          >
            Full-service{' '}
            <span 
              className="italic"
              style={{ color: '#B29F86' }}
            >
              studio
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'rgba(82, 80, 72, 0.6)' }}
          >
            From concept to launch. We architect, design, and build digital 
            experiences that stand out.
          </motion.p>
        </div>

        {/* Services Grid - Claymorphism Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

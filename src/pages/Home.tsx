import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEO } from '../components/SEO';
import { organizationSchema, personSchema, websiteSchema } from '../lib/structured-data';
import Hero from '../sections/Hero';
import AppsShowcase from '../sections/AppsShowcase';
import About from '../sections/About';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    // Initialize GSAP ScrollTrigger for sections
    const sections = gsap.utils.toArray<HTMLElement>('.gsap-section');

    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0.8, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <SEO
        title="App Entwickler & Webagentur Tirol"
        description="AWEN28 - Professionelle iOS App-Entwicklung, Website-Erstellung, KI-Integrationen und Logo-Design in Tirol. Ich erstelle iOS Apps aller Art und Websites, KI-Integrationen in Apps, Websites und interne Arbeitsabläufe. Ihre komplette Medienagentur in Tirol."
        keywords="App entwickler tirol, website erstellen tirol, Webagentur, KI agentur tirol, iOS App Entwicklung, Mobile Apps, Web Development, SwiftUI, React, AI Integration, Logo Design, Tirol, Österreich"
        url="https://awen28.com"
        structuredData={[organizationSchema, personSchema, websiteSchema]}
      />
      <div ref={containerRef} className="relative min-h-screen overflow-x-hidden">
        {/* Animated Background */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          style={{ y: backgroundY }}
        >
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[100px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(212, 197, 176, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(212, 197, 176, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </motion.div>

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <AppsShowcase />
        <About />
        <Contact />
        <Footer />
      </main>
    </div>
    </>
  );
}

export default Home;

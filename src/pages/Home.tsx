import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEO, generateLocalBusinessData } from '../components/SEO';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import AppShowcase from '../sections/AppShowcase';
import About from '../sections/About';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  useEffect(() => {
    // Faster refresh for better loading performance
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const structuredData = generateLocalBusinessData();

  return (
    <>
      <SEO
        title="AWEN28 | Premium iOS App Entwicklung & Webdesign Tirol Österreich"
        description="AWEN28 - Premium Digital Studio aus Tirol. Entwickler Thomas Mayrl. iOS Apps mit KI-Integration, Webentwicklung, UI/UX Design. 369, NumiStellar, kiBook, Elow, Awenya."
        keywords="iOS App Entwicklung Tirol, App Entwickler Österreich, Webdesign Tirol, Webentwicklung Österreich, Thomas Mayrl, App Developer Austria, KI Apps, Manifestation App, Astrologie App, Meditation App, Kinderbuch App, AI Musik Generator"
        canonical="https://www.awen28.com/"
        ogType="website"
        structuredData={structuredData}
      />
      <main className="relative" style={{ background: '#FAF9F7' }}>
      <Hero />
      <Services />
      <AppShowcase />
      <About />
      <Contact />
      <Footer />
    </main>
    </>
  );
}

export default Home;

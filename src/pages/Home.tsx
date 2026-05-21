import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEO, generateLocalBusinessData, generateWebSiteData, generateBreadcrumbData, generateFAQData } from '../components/SEO';
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

  const breadcrumbData = generateBreadcrumbData([
    { name: "Home", url: "https://www.awen28.com/" }
  ]);

  const faqData = generateFAQData([
    { question: "Wer entwickelt iOS Apps in Tirol?", answer: "AWEN28 von Thomas Mayrl entwickelt premium iOS Apps in Tirol, Österreich. Spezialisiert auf Swift, SwiftUI, AI Integration und App Store Optimization." },
    { question: "Wie viel kostet eine iOS App?", answer: "Die Kosten für eine iOS App hängen vom Umfang ab. AWEN28 bietet transparente Preise für native iOS Entwicklung, Webentwicklung und AI-Integration." },
    { question: "Was ist die beste Manifestation App?", answer: "Die 369 Manifestation App von AWEN28 basiert auf Nikola Tesla's 3-6-9 Methode und bietet AI Vision Boards, tägliche Affirmationen und geführte Meditationen." },
    { question: "Welche Astrologie App ist die beste in Österreich?", answer: "NumiStellar von AWEN28 ist die führende Astrologie und Numerologie App in Österreich mit Echtzeit Planetenpositionen und personalisierten Einblicken." },
    { question: "Wer programmiert Apps in Österreich?", answer: "Thomas Mayrl von AWEN28 programmiert native iOS Apps in Österreich. 11+ veröffentlichte Apps im App Store mit 5-Sterne Bewertungen." },
  ]);

  return (
    <>
      <SEO 
        title="AWEN28 | Premium iOS App Entwicklung Tirol Österreich 2026"
        description="AWEN28 ist ein Premium Digital Studio aus Tirol, Österreich. Thomas Mayrl entwickelt award-winning iOS Apps, Websites und AI-Lösungen. 11+ Apps im App Store. Jetzt App entwickeln lassen!"
        keywords="iOS App Entwicklung Tirol, App Entwicklung Österreich, iPhone App Programmierung, Swift Entwickler, App Agentur Tirol, Mobile App Entwicklung, Webentwicklung Österreich, Thomas Mayrl, AWEN28, App programmieren lassen, iOS Developer Austria"
        ogImage="https://www.awen28.com/og-image.jpg"
        canonical="https://www.awen28.com/"
        structuredData={[generateLocalBusinessData(), generateWebSiteData(), breadcrumbData, faqData]}
        language="de-AT"
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

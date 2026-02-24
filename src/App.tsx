import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home from './pages/Home';
import Suremate from './pages/Suremate';
import SurematePro from './pages/SurematePro';
import VisAI from './pages/VisAI';
import ThreeSixNine from './pages/ThreeSixNine';
import NumiStellar from './pages/NumiStellar';
import KiBook from './pages/KiBook';
import Elow from './pages/Elow';
import Awenya from './pages/Awenya';
import AgentRegister from './pages/AgentRegister';
import CreateAgent from './pages/CreateAgent';
import ForgotCode from './pages/ForgotCode';
import DownloadSurematePro from './pages/DownloadSurematePro';
import AgentPortal from './pages/AgentPortal';
import Callback from './pages/Callback';
import NotFound from './pages/NotFound';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import PrivacyApps from './pages/PrivacyApps';
import Cookies from './pages/Cookies';
import Navigation from './sections/Navigation';
import CookieConsent from './components/CookieConsent';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();
  const isAppPage = ['/suremate', '/suremate-pro', '/visai', '/369', '/numistellar', '/kibook', '/elow', '/awenya', '/agentregister', '/createAgent', '/forgotcode', '/download-suremate-pro', '/agentportal', '/callback'].includes(location.pathname);

  useEffect(() => {
    // Faster refresh for better performance
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timer);
  }, [location]);

  // Update document title based on route
  useEffect(() => {
    const titles: { [key: string]: string } = {
      '/': 'AWEN28 | Premium iOS Apps & Web Development Tirol Österreich',
      '/369': '369 Manifestation App - AI Vision Board & Meditation | AWEN28',
      '/numistellar': 'NumiStellar - Astrology & Numerology App | AWEN28',
      '/kibook': 'kiBook - AI Story Generator for Kids | AWEN28',
      '/elow': 'Elow - AI Music Generator | AWEN28',
      '/awenya': 'Awenya - Meditation & Sleep Stories App | AWEN28',
      '/suremate': 'Suremate - Smart Insurance Management | AWEN28',
      '/suremate-pro': 'Suremate Pro - Insurance Agent Tools | AWEN28',
      '/agentregister': 'Suremate Pro - Agent Registration | AWEN28',
      '/createAgent': 'Suremate Pro - Create Agent Profile | AWEN28',
      '/forgotcode': 'Suremate Pro - Forgot Agent Code | AWEN28',
      '/download-suremate-pro': 'Download Suremate Pro | iOS App',
      '/visai': 'VisAI - AI Vision Board App | AWEN28',
    };
    
    const defaultTitle = 'AWEN28 | Premium iOS Apps & Web Development Tirol';
    document.title = titles[location.pathname] || defaultTitle;
    
    // Update meta description based on route
    const descriptions: { [key: string]: string } = {
      '/': 'AWEN28 ist ein Premium Digital Studio aus Tirol, Österreich. Entwickler Thomas Mayrl. Spezialisiert auf AI-gestützte iOS Apps und Webentwicklung.',
      '/369': '369 Manifestation App mit AI Vision Board, täglichen Affirmationen und Meditationen. Die 369 Methode für Manifestation - Morgens 3x, Mittags 6x, Abends 9x.',
      '/numistellar': 'NumiStellar vereint Astrologie, Numerologie und kosmische Energie. Echtzeit Planetenpositionen, Schumann Resonanz und Astrocartographie.',
      '/kibook': 'kiBook verwandelt Ideen in wunderschön illustrierte Geschichten. AI Story Generator für Kinder mit verschiedenen Kunststilen.',
      '/elow': 'Elow ist ein AI Music Generator der Emotionen in Musik verwandelt. Erstelle einzigartige Soundscapes für jede Stimmung und jeden Anlass.',
      '/awenya': 'Awenya ist dein persönliches Heiligtum für Achtsamkeit. AI-geführte Meditationen, Sleep Stories und Solfeggio Frequenzen.',
      '/suremate': 'Suremate - Smartes Versicherungsmanagement für Verbraucher. Schadensfälle verfolgen, Policen verwalten.',
      '/suremate-pro': 'Suremate Pro - Professionelle Versicherungstools für Agenten. Kundenmanagement und Analytik.',
      '/agentregister': 'Registriere dich als Suremate Pro Agent. Professionelle Versicherungs-Tools mit Kundenmanagement, Analytik und PDF-Reports.',
      '/createAgent': 'Erstelle dein Suremate Pro Agenten-Profil und erhalte deinen einzigartigen Agent-Code.',
      '/forgotcode': 'Finde deinen Suremate Pro Agent-Code per E-Mail. Einfach E-Mail eingeben und Code anzeigen lassen.',
      '/download-suremate-pro': 'Lade Suremate Pro für iOS herunter. Die professionelle Versicherungs-App für Agenten.',
      '/visai': 'VisAI - Erstelle Vision Boards mit KI-Unterstützung. Visualisiere deine Ziele und Träume.',
    };
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[location.pathname] || descriptions['/']);
    }
  }, [location]);

  return (
    <HelmetProvider>
      <div className="relative min-h-screen" style={{ background: '#FAF9F7' }}>
        {!isAppPage && <Navigation />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/suremate" element={<Suremate />} />
          <Route path="/suremate-pro" element={<SurematePro />} />
          <Route path="/visai" element={<VisAI />} />
          <Route path="/369" element={<ThreeSixNine />} />
          <Route path="/numistellar" element={<NumiStellar />} />
          <Route path="/kibook" element={<KiBook />} />
          <Route path="/elow" element={<Elow />} />
          <Route path="/awenya" element={<Awenya />} />
          <Route path="/agentregister" element={<AgentRegister />} />
          <Route path="/createAgent" element={<CreateAgent />} />
          <Route path="/forgotcode" element={<ForgotCode />} />
          <Route path="/download-suremate-pro" element={<DownloadSurematePro />} />
          <Route path="/agentportal" element={<AgentPortal />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/privacy-apps" element={<PrivacyApps />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>
        <CookieConsent />
      </div>
    </HelmetProvider>
  );
}

export default App;
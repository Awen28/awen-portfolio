import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navigation from './sections/Navigation';
import Home from './pages/Home';
import AppDetail from './pages/AppDetail';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import CookiePolicy from './pages/CookiePolicy';
import { CookieConsent } from './components/CookieConsent';

function App() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="relative min-h-screen bg-background">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Navigation - only show on homepage after scroll */}
      {isHome && <Navigation />}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app/:appId" element={<AppDetail />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
}

export default App;

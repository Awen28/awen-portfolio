import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-7xl">
            <div className="relative rounded-lg border border-border bg-background/95 p-6 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80">
              <button
                onClick={handleDecline}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Schließen</span>
              </button>

              <div className="pr-8">
                <h3 className="mb-2 text-lg font-semibold">
                  🍪 Cookie-Hinweis
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Diese Website verwendet nur technisch notwendige Cookies, um
                  grundlegende Funktionen wie die Speicherung Ihrer
                  Theme-Präferenz (Hell/Dunkel-Modus) zu ermöglichen. Es werden
                  keine Tracking- oder Marketing-Cookies verwendet. Durch die
                  Nutzung dieser Website stimmen Sie der Verwendung dieser
                  notwendigen Cookies zu.
                </p>
                <p className="mb-4 text-sm text-muted-foreground">
                  Weitere Informationen finden Sie in unserer{' '}
                  <a
                    href="/datenschutz"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Datenschutzerklärung
                  </a>{' '}
                  und{' '}
                  <a
                    href="/cookie-policy"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Cookie-Policy
                  </a>
                  .
                </p>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    onClick={handleAccept}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Alle akzeptieren
                  </button>
                  <button
                    onClick={handleDecline}
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Nur notwendige
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

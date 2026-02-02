import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

function CookiePolicy() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Cookie-Policy"
        description="Informationen zur Verwendung von Cookies auf AWEN28"
        url="https://awen28.com/cookie-policy"
      />
      <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate('/')}
            className="mb-8 inline-flex items-center gap-2 p-3 rounded-full bg-secondary/50 border border-border/50 hover:border-primary/30 transition-all"
            whileHover={{ scale: 1.05, x: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Zurück</span>
          </motion.button>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert max-w-none"
          >
            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-8">
              Cookie-Policy
            </h1>

            <div className="space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  Was sind Cookies?
                </h2>
                <p className="leading-relaxed">
                  Cookies sind kleine Textdateien, die auf Ihrem Endgerät
                  (Computer, Tablet, Smartphone) gespeichert werden, wenn Sie eine
                  Website besuchen. Sie ermöglichen es der Website, Ihre Aktionen
                  und Einstellungen über einen bestimmten Zeitraum zu speichern,
                  damit Sie diese nicht bei jedem Besuch der Website oder beim
                  Navigieren zwischen den Seiten erneut eingeben müssen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  Wie verwenden wir Cookies?
                </h2>
                <p className="leading-relaxed">
                  Diese Website verwendet ausschließlich{' '}
                  <strong>technisch notwendige Cookies</strong>, die für die
                  grundlegende Funktionalität der Website erforderlich sind. Wir
                  verwenden <strong>keine</strong> Tracking-Cookies,
                  Marketing-Cookies oder Cookies von Drittanbietern.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  Welche Cookies verwenden wir?
                </h2>

                <div className="mt-6 space-y-6">
                  <div className="p-6 rounded-lg bg-secondary/30 border border-border/50">
                    <h3 className="text-xl font-light text-foreground mb-3">
                      1. Cookie-Consent
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Name:</strong> cookie-consent
                      </li>
                      <li>
                        <strong>Typ:</strong> LocalStorage
                      </li>
                      <li>
                        <strong>Zweck:</strong> Speichert Ihre Zustimmung zum
                        Cookie-Banner
                      </li>
                      <li>
                        <strong>Speicherdauer:</strong> Permanent (bis zur
                        manuellen Löschung durch den Nutzer)
                      </li>
                      <li>
                        <strong>Kategorie:</strong> Technisch notwendig
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-lg bg-secondary/30 border border-border/50">
                    <h3 className="text-xl font-light text-foreground mb-3">
                      2. Theme-Präferenz
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Name:</strong> awen28-ui-theme
                      </li>
                      <li>
                        <strong>Typ:</strong> LocalStorage
                      </li>
                      <li>
                        <strong>Zweck:</strong> Speichert Ihre bevorzugte
                        Theme-Einstellung (Hell-/Dunkel-Modus)
                      </li>
                      <li>
                        <strong>Speicherdauer:</strong> Permanent (bis zur
                        manuellen Löschung durch den Nutzer)
                      </li>
                      <li>
                        <strong>Kategorie:</strong> Technisch notwendig
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  Rechtsgrundlage
                </h2>
                <p className="leading-relaxed">
                  Die Verwendung technisch notwendiger Cookies erfolgt auf
                  Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                  Interesse). Unser berechtigtes Interesse besteht darin, die
                  Funktionalität unserer Website zu gewährleisten und Ihnen eine
                  optimale Nutzererfahrung zu bieten.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  Kontrolle über Cookies
                </h2>
                <p className="leading-relaxed">
                  Sie können die Cookies jederzeit über Ihre Browser-Einstellungen
                  löschen oder die Speicherung von Cookies generell deaktivieren.
                  Bitte beachten Sie, dass das Deaktivieren von Cookies die
                  Funktionalität dieser Website beeinträchtigen kann.
                </p>

                <h3 className="text-xl font-light text-foreground mb-3 mt-6">
                  Browser-Einstellungen
                </h3>
                <p className="leading-relaxed">
                  Die meisten Browser akzeptieren Cookies automatisch. Sie können
                  Ihren Browser jedoch so konfigurieren, dass er Cookies ablehnt
                  oder Sie benachrichtigt, wenn Cookies gesendet werden. Hier
                  finden Sie Anleitungen für gängige Browser:
                </p>
                <ul className="list-disc list-inside leading-relaxed mt-4 space-y-2">
                  <li>
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.apple.com/de-at/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Safari
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.microsoft.com/de-de/microsoft-edge/cookies-in-microsoft-edge-l%C3%B6schen-63947406-40ac-c3b8-57b9-2a946a29ae09"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Microsoft Edge
                    </a>
                  </li>
                </ul>

                <h3 className="text-xl font-light text-foreground mb-3 mt-6">
                  LocalStorage löschen
                </h3>
                <p className="leading-relaxed">
                  Um die von dieser Website gespeicherten LocalStorage-Daten zu
                  löschen, können Sie die Entwicklertools Ihres Browsers öffnen:
                </p>
                <ol className="list-decimal list-inside leading-relaxed mt-4 space-y-2">
                  <li>
                    Öffnen Sie die Entwicklertools (F12 oder Rechtsklick →
                    "Untersuchen")
                  </li>
                  <li>Wechseln Sie zum Tab "Application" oder "Speicher"</li>
                  <li>Wählen Sie "Local Storage" in der linken Sidebar</li>
                  <li>Klicken Sie auf "awen28.com"</li>
                  <li>
                    Löschen Sie die Einträge "cookie-consent" und
                    "awen28-ui-theme"
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  Keine Drittanbieter-Cookies
                </h2>
                <p className="leading-relaxed">
                  <strong>Wichtig:</strong> Diese Website verwendet{' '}
                  <strong>keine</strong> Cookies von Drittanbietern. Es werden
                  keine Daten an externe Marketing- oder Tracking-Services
                  weitergegeben.
                </p>
                <p className="leading-relaxed mt-4">
                  Wir verwenden <strong>keine</strong>:
                </p>
                <ul className="list-disc list-inside leading-relaxed mt-4 space-y-2">
                  <li>Google Analytics oder andere Analyse-Tools</li>
                  <li>Facebook Pixel oder andere Social Media Tracking-Pixel</li>
                  <li>Werbe-Cookies oder Retargeting-Cookies</li>
                  <li>Cookies von Content Delivery Networks (außer für Hosting)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  Kontakt
                </h2>
                <p className="leading-relaxed">
                  Wenn Sie Fragen zu unserer Cookie-Policy haben, können Sie uns
                  jederzeit kontaktieren:
                </p>
                <p className="leading-relaxed mt-4">
                  Thomas Mayrl<br />
                  Johannesfeldstrasse 44<br />
                  6111 Volders<br />
                  Österreich
                </p>
                <p className="leading-relaxed mt-4">
                  E-Mail:{' '}
                  <a
                    href="mailto:info@awen28.com"
                    className="text-primary hover:underline"
                  >
                    info@awen28.com
                  </a>
                  <br />
                  Telefon:{' '}
                  <a
                    href="tel:+43677640597110"
                    className="text-primary hover:underline"
                  >
                    +43 677 64059711
                  </a>
                </p>
              </section>

              <section className="pt-8 border-t border-border/50">
                <p className="text-sm">
                  Diese Cookie-Policy wurde erstellt in Anlehnung an die
                  Datenschutz-Grundverordnung (DSGVO) und die
                  ePrivacy-Richtlinie.
                </p>
                <p className="text-sm mt-2">
                  Stand: Februar 2026<br />
                  Verantwortlich: Thomas Mayrl
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default CookiePolicy;

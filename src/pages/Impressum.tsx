import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

function Impressum() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Impressum"
        description="Impressum und rechtliche Informationen von AWEN28 - Thomas Mayrl"
        url="https://awen28.com/impressum"
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
              Impressum
            </h1>

            <div className="space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  Angaben gemäß § 5 TMG / § 14 UGB
                </h2>
                <p className="leading-relaxed">
                  Thomas Mayrl<br />
                  Johannesfeldstrasse 44<br />
                  6111 Volders<br />
                  Österreich
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  Kontakt
                </h2>
                <p className="leading-relaxed">
                  <strong>Telefon:</strong>{' '}
                  <a
                    href="tel:+43677640597110"
                    className="text-primary hover:underline"
                  >
                    +43 677 64059711
                  </a>
                  <br />
                  <strong>E-Mail:</strong>{' '}
                  <a
                    href="mailto:info@awen28.com"
                    className="text-primary hover:underline"
                  >
                    info@awen28.com
                  </a>
                  <br />
                  <strong>Website:</strong>{' '}
                  <a
                    href="https://awen28.com"
                    className="text-primary hover:underline"
                  >
                    https://awen28.com
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  Berufsbezeichnung
                </h2>
                <p className="leading-relaxed">
                  Freiberuflicher App-Entwickler und Web-Entwickler
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  EU-Streitschlichtung
                </h2>
                <p className="leading-relaxed">
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit:{' '}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                  <br />
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  Verbraucherstreitbeilegung / Universalschlichtungsstelle
                </h2>
                <p className="leading-relaxed">
                  Wir sind nicht bereit oder verpflichtet, an
                  Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                  teilzunehmen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  Haftung für Inhalte
                </h2>
                <p className="leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
                  Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                  verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                  gespeicherte fremde Informationen zu überwachen oder nach
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                  hinweisen.
                </p>
                <p className="leading-relaxed mt-4">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                  Informationen nach den allgemeinen Gesetzen bleiben hiervon
                  unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
                  Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
                  Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden
                  wir diese Inhalte umgehend entfernen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  Haftung für Links
                </h2>
                <p className="leading-relaxed">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf
                  deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                  diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                  Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                  oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
                  wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
                  überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
                  Verlinkung nicht erkennbar.
                </p>
                <p className="leading-relaxed mt-4">
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
                  jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
                  zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
                  derartige Links umgehend entfernen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  Urheberrecht
                </h2>
                <p className="leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                  diesen Seiten unterliegen dem österreichischen Urheberrecht. Die
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
                  schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  Downloads und Kopien dieser Seite sind nur für den privaten,
                  nicht kommerziellen Gebrauch gestattet.
                </p>
                <p className="leading-relaxed mt-4">
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
                  wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
                  werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
                  trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
                  bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
                  Rechtsverletzungen werden wir derartige Inhalte umgehend
                  entfernen.
                </p>
              </section>

              <section className="pt-8 border-t border-border/50">
                <p className="text-sm">
                  Quelle: Erstellt mit dem Impressum-Generator in Anlehnung an die
                  österreichischen Rechtsvorschriften (UGB, E-Commerce-Gesetz,
                  DSGVO)
                </p>
                <p className="text-sm mt-2">Stand: Februar 2026</p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Impressum;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

function Datenschutz() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Datenschutzerklärung"
        description="Datenschutzerklärung und Informationen zum Datenschutz gemäß DSGVO für AWEN28"
        url="https://awen28.com/datenschutz"
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
              Datenschutzerklärung
            </h1>

            <div className="space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  1. Datenschutz auf einen Blick
                </h2>
                <h3 className="text-xl font-light text-foreground mb-3">
                  Allgemeine Hinweise
                </h3>
                <p className="leading-relaxed">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber,
                  was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
                  Website besuchen. Personenbezogene Daten sind alle Daten, mit
                  denen Sie persönlich identifiziert werden können. Ausführliche
                  Informationen zum Thema Datenschutz entnehmen Sie unserer unter
                  diesem Text aufgeführten Datenschutzerklärung.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  2. Verantwortlicher
                </h2>
                <p className="leading-relaxed">
                  Verantwortlicher für die Datenverarbeitung auf dieser Website
                  ist:
                </p>
                <p className="leading-relaxed mt-4">
                  Thomas Mayrl<br />
                  Johannesfeldstrasse 44<br />
                  6111 Volders<br />
                  Österreich
                </p>
                <p className="leading-relaxed mt-4">
                  Telefon:{' '}
                  <a
                    href="tel:+43677640597110"
                    className="text-primary hover:underline"
                  >
                    +43 677 64059711
                  </a>
                  <br />
                  E-Mail:{' '}
                  <a
                    href="mailto:info@awen28.com"
                    className="text-primary hover:underline"
                  >
                    info@awen28.com
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  3. Datenerfassung auf dieser Website
                </h2>

                <h3 className="text-xl font-light text-foreground mb-3">
                  3.1 Server-Log-Dateien
                </h3>
                <p className="leading-relaxed">
                  Der Provider der Seiten erhebt und speichert automatisch
                  Informationen in so genannten Server-Log-Dateien, die Ihr
                  Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc list-inside leading-relaxed mt-4 space-y-2">
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen wird
                  nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf
                  Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber
                  hat ein berechtigtes Interesse an der technisch fehlerfreien
                  Darstellung und der Optimierung seiner Website – hierzu müssen
                  die Server-Log-Files erfasst werden.
                </p>

                <h3 className="text-xl font-light text-foreground mb-3 mt-6">
                  3.2 Kontaktformular
                </h3>
                <p className="leading-relaxed">
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen,
                  werden Ihre Angaben aus dem Anfrageformular inklusive der von
                  Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
                  Anfrage und für den Fall von Anschlussfragen bei uns
                  gespeichert.
                </p>
                <p className="leading-relaxed mt-4">
                  Diese Daten werden über den Dienst{' '}
                  <strong>Web3Forms</strong> verarbeitet und an unsere E-Mail-Adresse
                  weitergeleitet. Web3Forms speichert Ihre Daten nur
                  vorübergehend zur Zustellung der E-Mail. Weitere Informationen
                  finden Sie in der{' '}
                  <a
                    href="https://web3forms.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Datenschutzerklärung von Web3Forms
                  </a>
                  .
                </p>
                <p className="leading-relaxed mt-4">
                  Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6
                  Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines
                  Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
                  Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die
                  Verarbeitung auf unserem berechtigten Interesse an der
                  effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6
                  Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1
                  lit. a DSGVO).
                </p>
                <p className="leading-relaxed mt-4">
                  Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben
                  bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung
                  zur Speicherung widerrufen oder der Zweck für die
                  Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen –
                  insbesondere Aufbewahrungsfristen – bleiben unberührt.
                </p>

                <h3 className="text-xl font-light text-foreground mb-3 mt-6">
                  3.3 Cookies
                </h3>
                <p className="leading-relaxed">
                  Diese Website verwendet ausschließlich technisch notwendige
                  Cookies. Diese Cookies sind erforderlich, um grundlegende
                  Funktionen der Website bereitzustellen, wie z.B. die Speicherung
                  Ihrer Theme-Präferenz (Hell-/Dunkel-Modus).
                </p>
                <p className="leading-relaxed mt-4">
                  <strong>Verwendete Cookies:</strong>
                </p>
                <ul className="list-disc list-inside leading-relaxed mt-4 space-y-2">
                  <li>
                    <strong>cookie-consent:</strong> Speichert Ihre Zustimmung zum
                    Cookie-Banner (LocalStorage)
                  </li>
                  <li>
                    <strong>awen28-ui-theme:</strong> Speichert Ihre
                    Theme-Präferenz (LocalStorage)
                  </li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Diese technisch notwendigen Cookies werden auf Grundlage von
                  Art. 6 Abs. 1 lit. f DSGVO gespeichert. Sie können Ihren Browser
                  so einstellen, dass Sie über das Setzen von Cookies informiert
                  werden und Cookies nur im Einzelfall erlauben.
                </p>
                <p className="leading-relaxed mt-4">
                  <strong>Wichtig:</strong> Es werden keine Tracking-Cookies,
                  Marketing-Cookies oder Cookies von Drittanbietern verwendet.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  4. Ihre Rechte
                </h2>
                <p className="leading-relaxed">
                  Sie haben gemäß DSGVO folgende Rechte:
                </p>
                <ul className="list-disc list-inside leading-relaxed mt-4 space-y-2">
                  <li>
                    <strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie haben das
                    Recht, Auskunft über Ihre von uns verarbeiteten
                    personenbezogenen Daten zu verlangen.
                  </li>
                  <li>
                    <strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie haben
                    das Recht, unverzüglich die Berichtigung unrichtiger oder
                    Vervollständigung Ihrer bei uns gespeicherten
                    personenbezogenen Daten zu verlangen.
                  </li>
                  <li>
                    <strong>Löschungsrecht (Art. 17 DSGVO):</strong> Sie haben das
                    Recht, die Löschung Ihrer bei uns gespeicherten
                    personenbezogenen Daten zu verlangen.
                  </li>
                  <li>
                    <strong>
                      Einschränkung der Verarbeitung (Art. 18 DSGVO):
                    </strong>{' '}
                    Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
                    personenbezogenen Daten zu verlangen.
                  </li>
                  <li>
                    <strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie
                    haben das Recht, Ihre Daten in einem strukturierten, gängigen
                    und maschinenlesbaren Format zu erhalten.
                  </li>
                  <li>
                    <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie haben
                    das Recht, aus Gründen, die sich aus Ihrer besonderen
                    Situation ergeben, jederzeit gegen die Verarbeitung Ihrer
                    personenbezogenen Daten Widerspruch einzulegen.
                  </li>
                  <li>
                    <strong>Widerruf der Einwilligung (Art. 7 Abs. 3 DSGVO):</strong>{' '}
                    Sie haben das Recht, Ihre einmal erteilte Einwilligung
                    jederzeit zu widerrufen.
                  </li>
                  <li>
                    <strong>Beschwerderecht:</strong> Sie haben das Recht, sich
                    bei einer Aufsichtsbehörde zu beschweren. Zuständige
                    Aufsichtsbehörde in Österreich ist die Österreichische
                    Datenschutzbehörde ({' '}
                    <a
                      href="https://www.dsb.gv.at"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      www.dsb.gv.at
                    </a>
                    ).
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  5. Datensicherheit
                </h2>
                <p className="leading-relaxed">
                  Wir verwenden innerhalb des Website-Besuchs das verbreitete
                  SSL-Verfahren (Secure Socket Layer) in Verbindung mit der
                  jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser
                  unterstützt wird. In der Regel handelt es sich dabei um eine
                  256-Bit-Verschlüsselung. Falls Ihr Browser keine
                  256-Bit-Verschlüsselung unterstützt, greifen wir stattdessen auf
                  128-Bit-v3-Technologie zurück. Ob eine einzelne Seite unseres
                  Internetauftrittes verschlüsselt übertragen wird, erkennen Sie
                  an der geschlossenen Darstellung des Schüssel- beziehungsweise
                  Schloss-Symbols in der unteren Statusleiste Ihres Browsers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  6. Drittanbieter und externe Links
                </h2>
                <p className="leading-relaxed">
                  Diese Website kann Links zu Websites Dritter enthalten. Wir
                  haben keinen Einfluss auf deren Datenschutzpraktiken. Bitte
                  informieren Sie sich auf den jeweiligen Websites über deren
                  Datenschutzrichtlinien.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  7. Datenschutz in unseren Apps
                </h2>
                <p className="leading-relaxed">
                  Die auf dieser Website vorgestellten Apps (NumiStellar, Awenya,
                  kiBook, VisAI, 369, SureMate, SureMate Pro, I STYLE YOU DAILY,
                  FINDIMAL) verfügen über eigene Datenschutzrichtlinien, die in
                  den jeweiligen Apps und App Stores einsehbar sind. Diese Website
                  sammelt keine Daten aus diesen Apps.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-foreground mb-4">
                  8. Änderungen dieser Datenschutzerklärung
                </h2>
                <p className="leading-relaxed">
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen,
                  damit sie stets den aktuellen rechtlichen Anforderungen
                  entspricht oder um Änderungen unserer Leistungen in der
                  Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt
                  dann die neue Datenschutzerklärung.
                </p>
              </section>

              <section className="pt-8 border-t border-border/50">
                <p className="text-sm">
                  Diese Datenschutzerklärung wurde erstellt in Anlehnung an die
                  Datenschutz-Grundverordnung (DSGVO) und das österreichische
                  Datenschutzgesetz (DSG).
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

export default Datenschutz;

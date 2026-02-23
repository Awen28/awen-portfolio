# EmailJS Setup Anleitung 📧

Damit das Kontaktformular funktioniert, musst du EmailJS einrichten. Das ist kostenlos und dauert nur 5 Minuten!

## Schritt 1: EmailJS Account erstellen

1. Gehe zu https://www.emailjs.com/
2. Klicke auf "Sign Up" (kostenlos)
3. Wähle "Web Developer"
4. Gib deine E-Mail-Adresse ein (z.B. info@awen28.com)

## Schritt 2: Email Service hinzufügen

1. Im EmailJS Dashboard → "Email Services" klicken
2. "Add New Service" klicken
3. Wähle deinen Email-Provider:
   - **Gmail** (empfohlen für info@awen28.com)
   - **Outlook**
   - **Yahoo**
   - Oder "Other" für eigene Domain

4. Für Gmail:
   - Klicke "Connect Account"
   - Logge dich mit info@awen28.com ein
   - Erlaube EmailJS Zugriff

5. Kopiere die **Service ID** (z.B. `service_abc123`)

## Schritt 3: Email Template erstellen

1. Gehe zu "Email Templates"
2. Klicke "Create New Template"
3. Gib dem Template einen Namen: "AWEN28 Contact Form"
4. Füge diesen Inhalt ein:

```
Subject: Neue Nachricht von {{name}} - {{project}}

Hallo Thomas,

du hast eine neue Nachricht über das AWEN28 Kontaktformular erhalten:

---

Name: {{name}}
Email: {{email}}
Projekttyp: {{project}}

Nachricht:
{{message}}

---

Diese Nachricht wurde über awen28.com gesendet.
```

5. Klicke "Save"
6. Kopiere die **Template ID** (z.B. `template_xyz789`)

## Schritt 4: Public Key holen

1. Gehe zu "Account" → "General"
2. Kopiere deinen **Public Key** (z.B. `user_123abc`)

## Schritt 5: In den Code einfügen

Öffne: `src/sections/Contact.tsx`

Ersetze diese Zeilen (Zeile 12-16):

```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID',     // z.B. 'service_abc123'
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',   // z.B. 'template_xyz789'
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',     // z.B. 'user_123abc'
};
```

Mit deinen echten Werten:

```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_deinServiceId',
  TEMPLATE_ID: 'template_deinTemplateId',
  PUBLIC_KEY: 'deinPublicKey',
};
```

## Schritt 6: Testen

1. Starte den Development Server:
   ```bash
   npm run dev
   ```

2. Gehe zu http://localhost:5173

3. Scrolle zum Kontaktformular

4. Fülle das Formular aus und sende eine Testnachricht

5. Prüfe dein E-Mail-Postfach (info@awen28.com)

## Fehlerbehebung

### "EmailJS is not configured yet" Alert
→ Die Config-Werte sind noch auf die Platzhalter eingestellt. Führe Schritt 5 durch.

### E-Mail kommt nicht an
1. Prüfe den Spam-Ordner
2. Stelle sicher, dass der Gmail-Account richtig verbunden ist
3. Prüfe die Template-Variablen (müssen {{name}}, {{email}}, etc. heißen)

### CORS-Fehler im Browser
→ Das passiert manchmal bei lokaler Entwicklung. Nach dem Deployment funktioniert es.

## Limits (kostenlos)

- **200 E-Mails pro Monat** (mehr als genug für den Anfang)
- Max. 2 Email Services
- Max. 5 Templates

Falls du mehr brauchst: Premium kostet $5/Monat für 5.000 E-Mails.

## Sicherheit

⚠️ **Wichtig**: Der Public Key ist öffentlich sichtbar - das ist absichtlich so und sicher!

EmailJS validiert:
- Die Domain (nur awen28.com kann senden)
- Rate Limiting (kein Spam)
- Template-Struktur

## Template Variablen

Diese Variablen stehen im Template zur Verfügung:

| Variable | Beschreibung |
|----------|--------------|
| `{{name}}` | Name des Absenders |
| `{{email}}` | E-Mail-Adresse |
| `{{project}}` | Projekttyp (z.B. "iOS App Development") |
| `{{message}}` | Die Nachricht |

Du kannst auch eigene Variablen hinzufügen!

## Nächste Schritte

1. ✅ EmailJS einrichten
2. ✅ Template erstellen
3. ✅ Config-Werte einfügen
4. ✅ Testnachricht senden
5. ✅ Auf Vercel deployen
6. ✅ Live-Test auf awen28.com

---

**Hilfe benötigt?**
- EmailJS Docs: https://www.emailjs.com/docs/
- Troubleshooting: https://www.emailjs.com/docs/user-guide/troubleshooting/

**Fertig!** 🎉 Das Kontaktformular funktioniert dann zu 100%!

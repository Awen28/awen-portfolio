# GitHub Auto-Deployment zu Vercel

## Setup (einmalig)

### 1. Vercel mit GitHub verbinden
- Gehe zu deinem Vercel Dashboard: https://vercel.com/
- Stelle sicher, dass das Projekt mit GitHub verbunden ist
- In den Project Settings → Git sollte dein GitHub Repository verbunden sein

### 2. Environment Variable setzen
- Gehe zu Project Settings → Environment Variables
- Füge hinzu:
  - **Name**: `VITE_WEB3FORMS_ACCESS_KEY`
  - **Value**: `64b0ac3c-c692-4110-b2ad-4e797a4288f3`
  - **Environments**: Production, Preview, Development (alle auswählen)

### 3. GitHub App Permissions prüfen
- Gehe zu: https://github.com/settings/installations
- Finde "Vercel" in der Liste
- Klicke auf "Configure"
- Stelle sicher, dass `Awen28/awen-portfolio` Repository Zugriff hat

## Normaler Workflow (bei jeder Änderung)

```bash
# Änderungen committen
git add .
git commit -m "Deine Commit Message"

# Zu GitHub pushen
git push origin main
```

**Das war's!** Vercel deployt automatisch nach jedem Push zu `main`.

## Status prüfen

- Vercel Dashboard → Deployments
- Dort siehst du alle Deployments und deren Status
- Jeder neue Commit auf `main` sollte ein neues Deployment triggern

## Wichtige Dateien

- `.env.local` - Environment Variables (nur lokal, NICHT committen!)
- `.gitignore` - Stellt sicher, dass `.env.local` nicht zu Git kommt

## Falls Probleme auftreten

1. Prüfe Vercel Dashboard → Deployments auf Fehler
2. Prüfe ob GitHub Integration verbunden ist (Project Settings → Git)
3. Prüfe Environment Variables in Vercel
4. Bei Build-Fehlern: Schau dir die Logs im Vercel Dashboard an

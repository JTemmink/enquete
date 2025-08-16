# Project Planning: Enquête Website met Next.js, Supabase, GitHub en Vercel

Dit document biedt een gedetailleerde, stap-voor-stap planning voor het ontwikkelen van een mobiel-geoptimaliseerde enquête-website met Next.js, Tailwind CSS, en Supabase. De planning is ontworpen voor gebruik met Cursor, met checklists (`[ ]` voor open, `[x]` voor voltooid) om voortgang bij te houden. Alle pagina's hebben een consistente look-and-feel (achtergrondkleur `#f7edd9`), en antwoorden worden opgeslagen in Supabase.

## Projectoverzicht
- **Technologieën:** Next.js (App Router), Tailwind CSS, Supabase (anonieme inserts), React Hook Form (voor formulieren), GitHub, Vercel.
- **Doel:** Een enquête-website waar gebruikers vragen beantwoorden, met antwoorden opgeslagen in Supabase. Geoptimaliseerd voor mobiel met touch-friendly buttons (min. 48px hoog, ruime padding).
- **Navigatie:** Gebruik Next.js `Link` of `useRouter` voor pagina-overgangen.
- **State Management:** Gebruik `useContext` voor tijdelijke opslag van antwoorden tijdens de sessie. Geen lokale opslag (bijv. localStorage).
- **Supabase:** Anonieme inserts in tabel `enquete_antwoorden` met kolommen: `id` (uuid), `interesse` (boolean), `bestellingen` (jsonb, nullable), `tijd` (text, nullable), `straat` (text, nullable), `huisnummer` (integer, nullable), `voornaam` (text), `achternaam` (text), `email` (text), `telefoon` (text, nullable), `created_at` (timestamptz).
- **Assumptions:**
  - Next.js project is geïnstalleerd met App Router.
  - Supabase, GitHub, en Vercel MCPs zijn geconfigureerd in Cursor.
  - Logo `Bakkeraandedeurlogo.png` wordt geüpload naar `/public/images/`.
  - Bestellingen (vraag 2) opgeslagen als JSON (bijv. `{croissant: 2, stokbrood: 0, ...}`).
  - Error handling: Toon alerts bij Supabase insert-fouten.
  - Deployment via Vercel met GitHub integratie.

## Stap-voor-Stap Plan

### Fase 1: Project Setup en Initialisatie
- [x] Controleer of Next.js project bestaat met App Router; zo niet, maak nieuw project aan met `npx create-next-app@latest` (selecteer App Router en Tailwind CSS).
- [x] Installeer dependencies:
  - [x] Tailwind CSS: `npm install -D tailwindcss postcss autoprefixer` en run `npx tailwindcss init -p`.
  - [x] Supabase client: `npm install @supabase/supabase-js`.
  - [x] React Hook Form: `npm install react-hook-form`.
  - [x] Controleer `package.json` en run `npm install`.
- [x] Configureer Tailwind:
  - [x] Voeg content paths toe in `tailwind.config.js`: `['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}']`.
  - [x] Extend theme met achtergrondkleur: `primaryBg: '#f7edd9'`.
- [x] Creëer root layout in `/app/layout.tsx`:
  - [x] Maak `<html>` en `<body>` met `bg-primaryBg min-h-screen flex flex-col items-center justify-center`.
  - [x] Voeg viewport meta toe: `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`.
  - [x] Gebruik een font (bijv. Inter via `next/font/google`).
  - [x] Voeg logo toe aan alle pagina's via layout.
- [x] Plaats logo:
  - [x] Creëer `/public/images/` map.
  - [x] Upload `Bakkeraandedeurlogo.png` naar `/public/images/`.
- [x] Configureer Supabase:
  - [x] Creëer (of gebruik bestaande) Supabase project via Cursor MCP.
  - [x] Maak tabel `enquete_antwoorden` met kolommen: `id` (uuid, primary key), `interesse` (boolean), `bestellingen` (jsonb, nullable), `tijd` (text, nullable), `straat` (text, nullable), `huisnummer` (integer, nullable), `voornaam` (text), `achternaam` (text), `email` (text), `telefoon` (text, nullable), `created_at` (timestamptz, default now()).
  - [x] Enable RLS en stel policy in voor anonieme inserts: `CREATE POLICY "Allow public insert" ON enquete_antwoorden FOR INSERT WITH CHECK (true);`.
  - [x] Creëer `/app/lib/supabaseClient.ts` met `createClient` en gebruik env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
  - [x] Voeg env vars toe aan `.env.local` en werk `.gitignore` bij.
- [ ] Initialiseer Git:
  - [ ] Run `git init`, `git add .`, `git commit -m "Initial setup"`.
  - [ ] Push naar GitHub repo via Cursor MCP.
- [ ] Configureer Vercel:
  - [ ] Link project aan Vercel via Cursor MCP.
  - [ ] Voeg Supabase env vars toe in Vercel dashboard.

### Fase 2: Creëer Componenten en Context ✅ VOLTOOID
- [x] Maak Enquête Context:
  - [x] Creëer `/contexts/EnqueteContext.tsx` met `createContext`, `useState` voor antwoorden (`interesse`, `bestellingen`, `tijd`, `straat`, `huisnummer`, `voornaam`, `achternaam`, `email`, `telefoon`), en functie `updateAnswer`.
  - [x] Voeg `EnqueteProvider` en `useEnquete` hook toe.
- [x] Creëer Reusable Componenten:
  - [x] `/components/Button.tsx`: Maak touch-friendly button (min. 48px hoog, `py-3 px-6`, `bg-blue-500 text-white rounded-lg`) met props voor `children`, `onClick`, `disabled`, `className`.
  - [x] `/components/InputField.tsx`: Maak input component voor text/number met label, props voor `type`, `name`, `value`, `onChange`, `required`.
  - [x] `/components/QuestionWrapper.tsx`: Maak wrapper voor vragen met consistente styling (`max-w-md mx-auto p-4 flex flex-col items-center`), prop voor `question`.
  - [x] `/lib/utils.ts`: Voeg Tailwind `cn` helper toe met `clsx` en `tailwind-merge`.
- [x] Creëer Enquête Layout:
  - [x] Maak `/app/enquete/layout.tsx` en wrap inhoud in `EnqueteProvider`.

### Fase 3: Bouw Pagina's
- [x] Landingspagina (`/app/page.tsx`):
  - [x] Voeg logo toe (`<Image src="/images/Bakkeraandedeurlogo.png" width={200} height={100} />`).
  - [x] Voeg tekst toe: "Help jij mee dit mogelijk te maken vul dan deze enquete in! Alvast bedankt!".
  - [x] Voeg twee buttons toe (flex row, stack op mobiel):
    - [x] "Enquête beginnen" (link naar `/enquete/vraag1`).
    - [x] "Over mij en dit project" (link naar `/over-mij`).
  - [x] Gebruik `max-w-md` voor responsieve centrering.
- [x] Over Mij (`/app/over-mij/page.tsx`):
  - [x] Voeg placeholder tekst toe: "Over mij en dit project...".
  - [x] Voeg button "Enquête beginnen" toe (link naar `/enquete/vraag1`).
  - [x] Gebruik `max-w-md` voor centrering.
- [x] Enquête Vraag 1 (`/app/enquete/vraag1/page.tsx`):
  - [x] Vraag: "Zou u interesse hebben in een thuisgebracht lekker ontbijt, brunch of lunch, vers van de bakker op de zondag morgen?".
  - [x] Voeg buttons "Ja" en "Nee" toe (update `interesse` in context).
  - [x] Voeg "Volgende" button toe, disabled tot keuze gemaakt.
  - [x] Navigeer naar `/enquete/vraag2` (Ja) of `/enquete/bedankt-nee` (Nee).
- [x] Bedankt Nee (`/app/enquete/bedankt-nee/page.tsx`):
  - [x] Toon tekst: "Bedankt voor het invullen van de enquête!".
  - [x] Sla antwoord op in Supabase (`interesse: false`) bij mount.
  - [x] Voeg error handling toe (alert bij Supabase falen).
- [x] Vraag 2 (`/app/enquete/vraag2/page.tsx`):
  - [x] Vraag: "Geef een schatting wat u verwacht te bestellen voor ontbijt, brunch of lunch?".
  - [x] Voeg number inputs toe voor: "croissant", "stokbrood", "pistolet", "half brood", "harde broodjes", "zachte broodjes" (default 0, gebruik React Hook Form).
  - [x] Voeg "Volgende" button toe, navigeer naar `/enquete/vraag3`, sla antwoorden op in context.
- [x] Vraag 3 (`/app/enquete/vraag3/page.tsx`):
  - [x] Vraag: "Voor welke tijd wilt u de broodjes uiterlijk hebben?".
  - [x] Voeg buttons toe voor: "9:00", "9:30", "10:00", "10:30", "11:00", "11:30".
  - [x] Navigeer naar `/enquete/vraag4`, sla keuze op in context.
- [x] Vraag 4 (`/app/enquete/vraag4/page.tsx`):
  - [x] Vraag: "In welke straat woont u?".
  - [x] Voeg buttons of dropdown toe voor: "Csardasstraat", "Menuetstraat", "Etudestraat", "Polkastraat".
  - [x] Navigeer naar `/enquete/vraag5`, sla keuze op in context.
- [x] Vraag 5 (`/app/enquete/vraag5/page.tsx`):
  - [x] Vraag: "Wat is uw huisnummer?".
  - [x] Voeg number input toe (positief getal, required).
  - [x] Voeg "Volgende" button toe, navigeer naar `/enquete/vraag6`, sla antwoord op.
- [x] Vraag 6 (`/app/enquete/vraag6/page.tsx`):
  - [x] Vraag: "Nu heb ik alleen uw contactgegevens nog nodig, we zullen alleen contact opnemen als we van start gaan of om uw eventuele vragen te beantwoorden.".
  - [x] Voeg inputs toe: "Voornaam" (required), "Achternaam" (required), "Emailadres" (required, email format), "Telefoonnummer" (optioneel).
  - [x] Gebruik React Hook Form voor validatie.
  - [x] Voeg "Verzenden" button toe, sla alle antwoorden op in Supabase, navigeer naar `/enquete/bedankt`.
  - [x] Voeg error handling toe (alert bij falen).
- [x] Bedankt (`/app/enquete/bedankt/page.tsx`):
  - [x] Toon tekst: "Dank u wel voor het invullen van de enquête! Ik laat het u weten wanneer we van start kunnen gaan met de eerste bezorging! Heeft u nog vragen of opmerkingen dan kunt u deze stellen op broodaandedeur@gmail.com" (email als link).
  - [x] Gebruik `max-w-md` voor centrering.

### Fase 4: Mobiele Optimalisatie en Testen
- [x] Optimaliseer voor mobiel:
  - [x] Zorg dat buttons touch-friendly zijn (min. 48px hoog, `py-3 px-6`).
  - [x] Gebruik `max-w-md` voor content wrappers.
  - [x] Test met Chrome DevTools (iPhone/Android simulaties).
- [x] Test volledige flow:
  - [x] Run `npm run dev` en test:
    - [x] Navigatie van landing naar enquête en over-mij.
    - [x] Alle enquête vragen (Ja/Nee flow, formulieren, Supabase opslag).
    - [x] Error handling bij Supabase falen.
  - [x] Controleer consistente achtergrondkleur `#f7edd9`.
- [x] Valideer formulieren:
  - [x] Controleer required velden en email formaat in vraag 6.
  - [x] Zorg dat "Volgende" buttons disabled zijn tot keuze gemaakt waar nodig.

### Fase 5: Deployment
- [ ] Commit naar GitHub:
  - [ ] Commit alle wijzigingen: `git add .`, `git commit -m "Complete enquête website"`.
  - [ ] Push naar GitHub via Cursor MCP.
- [ ] Deploy naar Vercel:
  - [ ] Deploy via Cursor MCP.
  - [ ] Controleer env vars in Vercel dashboard.
  - [ ] Test live site op mobiel en desktop.
- [ ] Finale check:
  - [ ] Bevestig consistente look-and-feel op alle pagina's.
  - [ ] Controleer Supabase dashboard voor opgeslagen antwoorden.
  - [ ] Test touch interacties op een echt mobiel apparaat.

### Fase 6: Toekomstige Taken
- [ ] Voeg later echt 'Over mij' verhaal toe in `/app/over-mij/page.tsx`.
- [ ] Optioneel: Voeg analytics toe (bijv. Google Analytics) voor tracking.

## Geschatte Tijd
- Fase 1: 1 uur
- Fase 2: 1 uur
- Fase 3: 2-3 uur
- Fase 4: 1 uur
- Fase 5: 0.5 uur
- **Totaal:** 5.5-6.5 uur

## Instructies voor Cursor
- Voltooi taken sequentieel en vink af (`[x]`) in dit bestand.
- Commit regelmatig naar GitHub met duidelijke berichten.
- Test na elke fase met `npm run dev`.
- Debug errors met console.logs en vraag hulp indien nodig.
- Werk dit `.md` bestand bij na elke voltooide taak.
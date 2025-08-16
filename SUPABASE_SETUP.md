# Supabase Setup Instructies

## Stap 1: Maak een Supabase Project

1. Ga naar [supabase.com](https://supabase.com) en log in
2. Klik op "New Project"
3. Kies je organisatie en geef het project een naam (bijv. "enquete-bakker")
4. Kies een database wachtwoord (bewaar dit goed!)
5. Kies een regio dicht bij je gebruikers
6. Klik op "Create new project"

## Stap 2: Maak de Database Tabel

Nadat je project is aangemaakt, ga naar de SQL Editor en voer dit uit:

```sql
-- Maak de enquete_antwoorden tabel
CREATE TABLE enquete_antwoorden (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  interesse BOOLEAN NOT NULL,
  bestellingen JSONB,
  tijd TEXT,
  straat TEXT,
  huisnummer INTEGER,
  voornaam TEXT NOT NULL,
  achternaam TEXT NOT NULL,
  email TEXT NOT NULL,
  telefoon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE enquete_antwoorden ENABLE ROW LEVEL SECURITY;

-- Maak een policy voor anonieme inserts
CREATE POLICY "Allow public insert" ON enquete_antwoorden 
FOR INSERT WITH CHECK (true);
```

## Stap 3: Haal de API Keys op

1. Ga naar Settings > API in je Supabase project
2. Kopieer de "Project URL" (dit is je `NEXT_PUBLIC_SUPABASE_URL`)
3. Kopieer de "anon public" key (dit is je `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Stap 4: Maak .env.local aan

Maak een bestand aan genaamd `.env.local` in de root van je project met:

```env
NEXT_PUBLIC_SUPABASE_URL=je_project_url_hier
NEXT_PUBLIC_SUPABASE_ANON_KEY=je_anon_key_hier
```

## Stap 5: Test de Connectie

Start je development server opnieuw op met `npm run dev` en test de enquête. De antwoorden zouden nu moeten worden opgeslagen in Supabase.

## Stap 6: Controleer de Data

Ga naar je Supabase dashboard > Table Editor > enquete_antwoorden om te zien of de data correct wordt opgeslagen.

## Troubleshooting

- **"Invalid API key"**: Controleer of je de juiste anon key gebruikt
- **"Table doesn't exist"**: Controleer of je de SQL hebt uitgevoerd
- **"RLS policy violation"**: Controleer of je de policy hebt aangemaakt
- **CORS errors**: Controleer of je de juiste URL gebruikt


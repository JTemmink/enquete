-- SQL Script om de enquete_antwoorden tabel aan te maken
-- Voer dit uit in je Supabase SQL Editor

-- Maak de enquete_antwoorden tabel aan
CREATE TABLE IF NOT EXISTS public.enquete_antwoorden (
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
ALTER TABLE public.enquete_antwoorden ENABLE ROW LEVEL SECURITY;

-- Maak policy aan voor anonieme inserts
CREATE POLICY "Allow public insert" ON public.enquete_antwoorden 
FOR INSERT WITH CHECK (true);

-- Maak index aan voor betere performance
CREATE INDEX IF NOT EXISTS idx_enquete_antwoorden_created_at 
ON public.enquete_antwoorden(created_at);

-- Voeg comment toe aan de tabel
COMMENT ON TABLE public.enquete_antwoorden IS 'Enquête antwoorden voor bakkeraandedeur project';

-- Controleer of de tabel is aangemaakt
SELECT 
    table_name,
    table_schema,
    table_type
FROM information_schema.tables 
WHERE table_name = 'enquete_antwoorden';

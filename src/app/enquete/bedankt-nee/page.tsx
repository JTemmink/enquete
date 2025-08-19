'use client';

import { useEffect, useState } from 'react';
import { useEnquete } from '@/contexts/EnqueteContext';
import { supabase, isSupabaseAvailable } from '@/lib/supabaseClient';

export default function BedanktNee() {
  const { antwoorden, isSubmitted, setSubmitted } = useEnquete();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saveAnswer = async () => {
      // Voorkom dubbele submits
      if (isSubmitted || !antwoorden.interesse || !isSupabaseAvailable()) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const { error: supabaseError } = await supabase!
          .from('enquete_antwoorden')
          .insert({
            interesse: false,
            bestellingen: null,
            tijd: null,
            straat: null,
            huisnummer: null,
            voornaam: '',
            achternaam: '',
            email: '',
            telefoon: null,
          });

        if (supabaseError) {
          console.error('Supabase error:', supabaseError);
          if (supabaseError.code === '23505') {
            setError('U heeft deze enquête al ingevuld. Bedankt voor uw interesse!');
          } else {
            setError('Er is een fout opgetreden bij het opslaan van uw antwoord.');
          }
        } else {
          // Markeer als succesvol opgeslagen
          setSubmitted(true);
        }
      } catch (err) {
        console.error('Error saving answer:', err);
        setError('Er is een fout opgetreden bij het opslaan van uw antwoord.');
      } finally {
        setIsLoading(false);
      }
    };

    saveAnswer();
  }, [antwoorden.interesse, isSubmitted, setSubmitted]);

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Bedankt!</h1>
      
      <p className="text-lg text-gray-700 mb-4">
        Bedankt voor het invullen van de enquête!
      </p>
      
      {isLoading && (
        <p className="text-blue-600">Antwoord wordt opgeslagen...</p>
      )}
      
      {error && (
        <p className="text-red-600">{error}</p>
      )}
      
      {isSubmitted && !error && (
        <p className="text-green-600">Uw antwoord is succesvol opgeslagen!</p>
      )}
    </div>
  );
}

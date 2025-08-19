'use client';

import { useEffect, useState } from 'react';
import { useEnquete } from '@/contexts/EnqueteContext';
import { supabase, isSupabaseAvailable } from '@/lib/supabaseClient';

export default function Bedankt() {
  const { antwoorden, isSubmitted, setSubmitted } = useEnquete();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saveAllAnswers = async () => {
      // Voorkom dubbele submits
      if (isSubmitted || !antwoorden.interesse || !isSupabaseAvailable()) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const { error: supabaseError } = await supabase!
          .from('enquete_antwoorden')
          .insert({
            interesse: antwoorden.interesse,
            bestellingen: antwoorden.bestellingen,
            tijd: antwoorden.tijd,
            straat: antwoorden.straat,
            huisnummer: antwoorden.huisnummer,
            voornaam: antwoorden.voornaam,
            achternaam: antwoorden.achternaam,
            email: antwoorden.email,
            telefoon: antwoorden.telefoon,
          });

        if (supabaseError) {
          console.error('Supabase error:', supabaseError);
          if (supabaseError.code === '23505') {
            setError('U heeft deze enquête al ingevuld. Bedankt voor uw interesse!');
          } else {
            setError('Er is een fout opgetreden bij het opslaan van uw antwoorden.');
          }
        } else {
          // Markeer als succesvol opgeslagen
          setSubmitted(true);
        }
      } catch (err) {
        console.error('Error saving answers:', err);
        setError('Er is een fout opgetreden bij het opslaan van uw antwoorden.');
      } finally {
        setIsLoading(false);
      }
    };

    saveAllAnswers();
  }, [antwoorden, isSubmitted, setSubmitted]);

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Bedankt!</h1>
      
      <p className="text-lg text-gray-700 mb-4">
        Dank u wel voor het invullen van de enquête! Ik laat het u weten wanneer we van start kunnen gaan met de eerste bezorging!
      </p>
      
      <p className="text-lg text-gray-700 mb-4">
        Heeft u nog vragen of opmerkingen dan kunt u deze stellen op{' '}
        <a 
          href="mailto:broodaandedeur@gmail.com" 
          className="text-blue-600 hover:text-blue-800 underline"
        >
          broodaandedeur@gmail.com
        </a>
      </p>
      
      {isLoading && (
        <p className="text-blue-600">Antwoorden worden opgeslagen...</p>
      )}
      
      {error && (
        <p className="text-red-600">{error}</p>
      )}
      
      {isSubmitted && !error && (
        <p className="text-green-600">Uw antwoorden zijn succesvol opgeslagen!</p>
      )}
    </div>
  );
}

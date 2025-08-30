'use client';

import { useRouter } from 'next/navigation';
import { useEnquete } from '@/contexts/EnqueteContext';
import Button from '@/components/Button';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Vraag1() {
  const router = useRouter();
  const { antwoorden, updateAnswer } = useEnquete();

  const handleJa = () => {
    updateAnswer('interesse', true);
  };

  const handleNee = async () => {
    updateAnswer('interesse', false);
    
    // Direct naar Supabase sturen wanneer iemand 'nee' kiest
    try {
      const { error } = await supabase
        .from('enquete_antwoorden')
        .insert([
          {
            interesse: false,
            voornaam: 'Nee respondent',
            achternaam: 'Enquete',
            email: `nee-${Date.now()}@enquete.local`
          }
        ]);

      if (error) {
        console.error('Error saving to Supabase:', error);
      } else {
        console.log('Nee response saved to Supabase successfully');
      }
    } catch (error) {
      console.error('Error saving to Supabase:', error);
    }
  };

  // Automatisch doorsturen zodra er een keuze is gemaakt
  useEffect(() => {
    if (antwoorden.interesse === true) {
      router.push('/enquete/vraag2');
    } else if (antwoorden.interesse === false) {
      router.push('/enquete/bedankt-nee');
    }
  }, [antwoorden.interesse, router]);

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-xl font-semibold mb-6 text-gray-800">
        Zou u (zo nu en dan) interesse hebben in thuisgebrachte lekkere broodjes voor ontbijt, brunch of lunch, vers van de bakker op de zondag morgen?
      </h1>
      
      <div className="flex flex-col gap-4 w-full">
        <Button
          onClick={handleJa}
          className={`w-full ${
            antwoorden.interesse === true
              ? 'bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-700 hover:via-green-600 hover:to-green-700'
              : 'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 hover:from-gray-400 hover:via-gray-300 hover:to-gray-400 text-gray-700'
          }`}
        >
          Ja
        </Button>
        
        <Button
          onClick={handleNee}
          className={`w-full ${
            antwoorden.interesse === false
              ? 'bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-700 hover:via-red-600 hover:to-red-700'
              : 'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 hover:from-gray-400 hover:via-gray-300 hover:to-gray-400 text-gray-700'
          }`}
        >
          Nee
        </Button>
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useEnquete } from '@/contexts/EnqueteContext';
import Button from '@/components/Button';
import { useEffect } from 'react';

export default function Vraag3() {
  const router = useRouter();
  const { antwoorden, updateAnswer } = useEnquete();

  const frequenties = [
    'Elke week',
    'Elke 2 weken', 
    'Elke 3 weken',
    'Elke 4 weken',
    'Enkele keer per jaar'
  ];

  const handleFrequentieSelectie = (frequentie: string) => {
    updateAnswer('frequentie', frequentie);
  };

  // Automatisch doorsturen zodra er een frequentie is geselecteerd
  useEffect(() => {
    if (antwoorden.frequentie) {
      router.push('/enquete/vraag4');
    }
  }, [antwoorden.frequentie, router]);

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-xl font-semibold mb-6 text-gray-800 px-4">
        Hoe vaak denkt u te gaan bestellen?
      </h1>
      
      <div className="flex flex-col gap-3 w-full px-4">
        {frequenties.map((frequentie) => (
          <Button
            key={frequentie}
            onClick={() => handleFrequentieSelectie(frequentie)}
            className={`${
              antwoorden.frequentie === frequentie
                ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700'
                : 'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 hover:from-gray-400 hover:via-gray-300 hover:to-gray-400 text-gray-700'
            }`}
          >
            {frequentie}
          </Button>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useEnquete } from '@/contexts/EnqueteContext';
import Button from '@/components/Button';
import { useState } from 'react';

export default function Vraag6() {
  const router = useRouter();
  const { antwoorden, updateAnswer } = useEnquete();
  const [huisnummer, setHuisnummer] = useState<string>('');

  const handleInputChange = (value: string) => {
    // Alleen cijfers toestaan
    const numericValue = value.replace(/[^0-9]/g, '');
    setHuisnummer(numericValue);
    
    if (numericValue) {
      updateAnswer('huisnummer', parseInt(numericValue));
    } else {
      updateAnswer('huisnummer', null);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    // Selecteer automatisch alle tekst wanneer je op het veld klikt
    if (event.target.value) {
      event.target.select();
    }
  };

  const handleVolgende = () => {
    if (antwoorden.huisnummer && antwoorden.huisnummer > 0) {
      router.push('/enquete/vraag7');
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-xl font-semibold mb-6 text-gray-800 px-4">
        Wat is uw huisnummer?
      </h1>
      
      <div className="w-full mb-6 px-4">
        <input
          type="text"
          min="1"
          max="9999"
          step="1"
          value={huisnummer}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleFocus}
          placeholder="Voer huisnummer in"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
        />
      </div>
      
      <p className="text-sm text-gray-600 mb-6 px-4">
        Voer uw huisnummer in (alleen cijfers)
      </p>
      
      <Button
        onClick={handleVolgende}
        disabled={!antwoorden.huisnummer || antwoorden.huisnummer <= 0}
        className="w-full max-w-sm"
      >
        Volgende
      </Button>
    </div>
  );
}

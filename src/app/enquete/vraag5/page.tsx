'use client';

import { useRouter } from 'next/navigation';
import { useEnquete } from '@/contexts/EnqueteContext';
import { useState } from 'react';

export default function Vraag5() {
  const router = useRouter();
  const { antwoorden, updateAnswer } = useEnquete();
  const [huisnummer, setHuisnummer] = useState<number | ''>('');

  const handleInputChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      setHuisnummer(num);
      updateAnswer('huisnummer', num);
    } else {
      setHuisnummer('');
      updateAnswer('huisnummer', null);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    // Selecteer automatisch alle tekst wanneer je op het veld klikt
    event.target.select();
  };

  const handleVolgende = () => {
    if (antwoorden.huisnummer) {
      router.push('/enquete/vraag6');
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-xl font-semibold mb-6 text-gray-800">
        Wat is uw huisnummer?
      </h1>
      
      <div className="w-full mb-6">
        <input
          type="number"
          min="1"
          max="9999"
          step="1"
          value={huisnummer}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleFocus}
          placeholder="Voer huisnummer in"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg"
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </div>
      
      <button
        onClick={handleVolgende}
        disabled={!antwoorden.huisnummer}
        className={`py-3 px-6 rounded-lg transition-colors min-h-[48px] w-full ${
          !antwoorden.huisnummer
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Volgende
      </button>
    </div>
  );
}

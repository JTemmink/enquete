'use client';

import { useRouter } from 'next/navigation';
import { useEnquete } from '@/contexts/EnqueteContext';
import { useState } from 'react';

export default function Vraag2() {
  const router = useRouter();
  const { updateAnswer } = useEnquete();
  const [bestellingen, setBestellingen] = useState({
    croissant: 0,
    stokbrood: 0,
    pistolet: 0,
    halfBrood: 0,
    hardeBroodjes: 0,
    zachteBroodjes: 0,
  });

  const handleInputChange = (product: string, value: number) => {
    setBestellingen(prev => ({
      ...prev,
      [product]: Math.max(0, value),
    }));
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    // Selecteer automatisch alle tekst wanneer je op het veld klikt
    if (event.target.value) {
      event.target.select();
    }
  };

  const handleVolgende = () => {
    updateAnswer('bestellingen', bestellingen);
    router.push('/enquete/vraag3');
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-xl font-semibold mb-6 text-gray-800">
        Geef een schatting wat u verwacht te bestellen voor ontbijt, brunch of lunch?
      </h1>
      
      <div className="w-full space-y-4 mb-6">
        {Object.entries(bestellingen).map(([product, amount]) => (
          <div key={product} className="flex items-center justify-between">
            <label className="text-gray-700 capitalize">
              {product === 'halfBrood' ? 'Half brood' : 
               product === 'hardeBroodjes' ? 'Harde broodjes' :
               product === 'zachteBroodjes' ? 'Zachte broodjes' :
               product}
            </label>
            <input
              type="number"
              min="0"
              max="99"
              step="1"
              value={amount}
              onChange={(e) => handleInputChange(product, parseInt(e.target.value) || 0)}
              onFocus={handleFocus}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center text-lg"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
        ))}
      </div>
      
      <button
        onClick={handleVolgende}
        className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors min-h-[48px] w-full"
      >
        Volgende
      </button>
    </div>
  );
}

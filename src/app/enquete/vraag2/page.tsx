'use client';

import { useRouter } from 'next/navigation';
import { useEnquete } from '@/contexts/EnqueteContext';
import { useState } from 'react';
import Button from '@/components/Button';

type ProductKey = 'croissant' | 'stokbrood' | 'pistolet' | 'hardeZachteBroodjes' | 'halfBrood';

export default function Vraag2() {
  const router = useRouter();
  const { updateAnswer } = useEnquete();
  const [bestellingen, setBestellingen] = useState({
    croissant: 0,
    stokbrood: 0,
    pistolet: 0,
    hardeZachteBroodjes: 0,
    halfBrood: 0,
  });

  const handleInputChange = (product: ProductKey, value: number) => {
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
      <h1 className="text-xl font-semibold mb-6 text-gray-800 px-4">
        Geef een schatting wat u verwacht te bestellen voor ontbijt, brunch of lunch?
      </h1>
      
      <div className="w-full space-y-4 mb-6 px-4">
        {Object.entries(bestellingen).map(([product, amount]) => (
          <div key={product} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <label className="text-gray-700 capitalize text-base sm:text-lg font-semibold sm:flex-1 text-center sm:text-left">
              {product === 'halfBrood' ? 'Half brood' : 
               product === 'hardeZachteBroodjes' ? 'Harde/zachte broodjes, krentenbollen, e.d.' :
               product}
            </label>
            <div className="flex items-center justify-center sm:justify-end gap-2 sm:w-32">
              <button
                onClick={() => handleInputChange(product as ProductKey, Math.max(0, amount - 1))}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-lg flex items-center justify-center transition-colors"
              >
                -
              </button>
              <input
                type="text"
                min="0"
                max="99"
                step="1"
                value={amount}
                onChange={(e) => handleInputChange(product as ProductKey, parseInt(e.target.value) || 0)}
                onFocus={handleFocus}
                className="w-16 sm:w-20 px-2 py-2 border border-gray-300 rounded-lg text-center text-lg"
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <button
                onClick={() => handleInputChange(product as ProductKey, amount + 1)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-lg flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <Button
        onClick={handleVolgende}
        className="w-full max-w-sm"
      >
        Volgende
      </Button>
    </div>
  );
}

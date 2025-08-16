'use client';

import { useRouter } from 'next/navigation';
import { useEnquete } from '@/contexts/EnqueteContext';

export default function Vraag1() {
  const router = useRouter();
  const { antwoorden, updateAnswer } = useEnquete();

  const handleJa = () => {
    updateAnswer('interesse', true);
  };

  const handleNee = () => {
    updateAnswer('interesse', false);
  };

  const handleVolgende = () => {
    if (antwoorden.interesse === true) {
      router.push('/enquete/vraag2');
    } else if (antwoorden.interesse === false) {
      router.push('/enquete/bedankt-nee');
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-xl font-semibold mb-6 text-gray-800">
        Zou u interesse hebben in een thuisgebracht lekker ontbijt, brunch of lunch, vers van de bakker op de zondag morgen?
      </h1>
      
      <div className="flex flex-col gap-4 w-full mb-6">
        <button
          onClick={handleJa}
          className={`py-3 px-6 rounded-lg transition-colors min-h-[48px] ${
            antwoorden.interesse === true
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Ja
        </button>
        
        <button
          onClick={handleNee}
          className={`py-3 px-6 rounded-lg transition-colors min-h-[48px] ${
            antwoorden.interesse === false
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Nee
        </button>
      </div>
      
      <button
        onClick={handleVolgende}
        disabled={antwoorden.interesse === null}
        className={`py-3 px-6 rounded-lg transition-colors min-h-[48px] w-full ${
          antwoorden.interesse === null
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Volgende
      </button>
    </div>
  );
}

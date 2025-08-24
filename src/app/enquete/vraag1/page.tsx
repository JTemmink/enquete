'use client';

import { useRouter } from 'next/navigation';
import { useEnquete } from '@/contexts/EnqueteContext';
import Button from '@/components/Button';

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
      
      <Button
        onClick={handleVolgende}
        disabled={antwoorden.interesse === null}
        className="w-full"
      >
        Volgende
      </Button>
    </div>
  );
}

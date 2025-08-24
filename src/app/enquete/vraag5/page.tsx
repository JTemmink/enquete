'use client';

import { useRouter } from 'next/navigation';
import { useEnquete } from '@/contexts/EnqueteContext';
import Button from '@/components/Button';

export default function Vraag5() {
  const router = useRouter();
  const { antwoorden, updateAnswer } = useEnquete();

  const huizen = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

  const handleHuisSelectie = (huis: string) => {
    updateAnswer('huisnummer', parseInt(huis));
  };

  const handleVolgende = () => {
    if (antwoorden.huisnummer) {
      router.push('/enquete/vraag6');
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-xl font-semibold mb-6 text-gray-800">
        Welk huisnummer heeft u?
      </h1>
      
      <div className="grid grid-cols-5 gap-2 w-full mb-6">
        {huizen.map((huis) => (
          <Button
            key={huis}
            onClick={() => handleHuisSelectie(huis)}
            className={`${
              antwoorden.huisnummer === parseInt(huis)
                ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700'
                : 'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 hover:from-gray-400 hover:via-gray-300 hover:to-gray-400 text-gray-700'
            }`}
          >
            {huis}
          </Button>
        ))}
      </div>
      
      <Button
        onClick={handleVolgende}
        disabled={!antwoorden.huisnummer}
        className="w-full"
      >
        Volgende
      </Button>
    </div>
  );
}

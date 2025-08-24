'use client';

import { useRouter } from 'next/navigation';
import { useEnquete } from '@/contexts/EnqueteContext';
import Button from '@/components/Button';

export default function Vraag4() {
  const router = useRouter();
  const { antwoorden, updateAnswer } = useEnquete();

  const straten = ['Csardasstraat', 'Menuetstraat', 'Etudestraat', 'Polkastraat'];

  const handleStraatSelectie = (straat: string) => {
    updateAnswer('straat', straat);
  };

  const handleVolgende = () => {
    if (antwoorden.straat) {
      router.push('/enquete/vraag5');
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-xl font-semibold mb-6 text-gray-800">
        In welke straat woont u?
      </h1>
      
      <div className="flex flex-col gap-3 w-full mb-6">
        {straten.map((straat) => (
          <Button
            key={straat}
            onClick={() => handleStraatSelectie(straat)}
            className={`${
              antwoorden.straat === straat
                ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700'
                : 'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 hover:from-gray-400 hover:via-gray-300 hover:to-gray-400 text-gray-700'
            }`}
          >
            {straat}
          </Button>
        ))}
      </div>
      
      <Button
        onClick={handleVolgende}
        disabled={!antwoorden.straat}
        className="w-full"
      >
        Volgende
      </Button>
    </div>
  );
}

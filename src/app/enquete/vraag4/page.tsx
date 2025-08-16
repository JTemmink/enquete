'use client';

import { useRouter } from 'next/navigation';
import { useEnquete } from '@/contexts/EnqueteContext';

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
          <button
            key={straat}
            onClick={() => handleStraatSelectie(straat)}
            className={`py-3 px-4 rounded-lg transition-colors min-h-[48px] ${
              antwoorden.straat === straat
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {straat}
          </button>
        ))}
      </div>
      
      <button
        onClick={handleVolgende}
        disabled={!antwoorden.straat}
        className={`py-3 px-6 rounded-lg transition-colors min-h-[48px] w-full ${
          !antwoorden.straat
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Volgende
      </button>
    </div>
  );
}

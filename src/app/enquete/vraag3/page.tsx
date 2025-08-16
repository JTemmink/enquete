'use client';

import { useRouter } from 'next/navigation';
import { useEnquete } from '@/contexts/EnqueteContext';

export default function Vraag3() {
  const router = useRouter();
  const { antwoorden, updateAnswer } = useEnquete();

  const tijden = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30'];

  const handleTijdSelectie = (tijd: string) => {
    updateAnswer('tijd', tijd);
  };

  const handleVolgende = () => {
    if (antwoorden.tijd) {
      router.push('/enquete/vraag4');
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-xl font-semibold mb-6 text-gray-800">
        Voor welke tijd wilt u de broodjes uiterlijk hebben?
      </h1>
      
      <div className="grid grid-cols-2 gap-3 w-full mb-6">
        {tijden.map((tijd) => (
          <button
            key={tijd}
            onClick={() => handleTijdSelectie(tijd)}
            className={`py-3 px-4 rounded-lg transition-colors min-h-[48px] ${
              antwoorden.tijd === tijd
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tijd}
          </button>
        ))}
      </div>
      
      <button
        onClick={handleVolgende}
        disabled={!antwoorden.tijd}
        className={`py-3 px-6 rounded-lg transition-colors min-h-[48px] w-full ${
          !antwoorden.tijd
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Volgende
      </button>
    </div>
  );
}

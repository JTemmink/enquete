'use client';

import { useRouter } from 'next/navigation';
import { useEnquete } from '@/contexts/EnqueteContext';
import Button from '@/components/Button';

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
          <Button
            key={tijd}
            onClick={() => handleTijdSelectie(tijd)}
            className={`${
              antwoorden.tijd === tijd
                ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700'
                : 'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 hover:from-gray-400 hover:via-gray-300 hover:to-gray-400 text-gray-700'
            }`}
          >
            {tijd}
          </Button>
        ))}
      </div>
      
      <Button
        onClick={handleVolgende}
        disabled={!antwoorden.tijd}
        className="w-full"
      >
        Volgende
      </Button>
    </div>
  );
}

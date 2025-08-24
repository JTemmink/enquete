'use client';

import { useRouter } from 'next/navigation';
import { useEnquete } from '@/contexts/EnqueteContext';
import Button from '@/components/Button';

export default function Vraag6() {
  const router = useRouter();
  const { antwoorden } = useEnquete();

  const handleSubmit = () => {
    // Stuur direct door naar bedankt pagina
    router.push('/enquete/bedankt');
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-xl font-semibold mb-6 text-gray-800">
        Bedankt voor het invullen van de enquête!
      </h1>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-6 w-full">
        <h2 className="text-lg font-medium mb-4 text-gray-700">Samenvatting van uw antwoorden:</h2>
        <div className="text-left space-y-2 text-gray-600">
          <p><strong>Interesse:</strong> {antwoorden.interesse ? 'Ja' : 'Nee'}</p>
          {antwoorden.bestellingen && (
            <div>
              <strong>Bestellingen:</strong>
              <ul className="ml-4 mt-1">
                {Object.entries(antwoorden.bestellingen).map(([product, amount]) => (
                  <li key={product}>
                    {product === 'halfBrood' ? 'Half brood' : 
                     product === 'hardeBroodjes' ? 'Harde broodjes' :
                     product === 'zachteBroodjes' ? 'Zachte broodjes' :
                     product}: {amount}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p><strong>Tijd:</strong> {antwoorden.tijd}</p>
          <p><strong>Adres:</strong> {antwoorden.straat} {antwoorden.huisnummer}</p>
        </div>
      </div>
      
      <Button
        onClick={handleSubmit}
        className="w-full"
      >
        Enquête versturen
      </Button>
    </div>
  );
}

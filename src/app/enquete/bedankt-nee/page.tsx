'use client';

import Link from 'next/link';
import Button from '@/components/Button';

export default function BedanktNee() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Bedankt voor uw tijd!
      </h1>
      
      <p className="text-lg mb-8 text-gray-700">
        We begrijpen dat dit niet iets is waar u op dit moment interesse in heeft. 
        Bedankt dat u de tijd heeft genomen om de enquête in te vullen!
      </p>
      
      <Link href="/">
        <Button>
          Terug naar home
        </Button>
      </Link>
    </div>
  );
}

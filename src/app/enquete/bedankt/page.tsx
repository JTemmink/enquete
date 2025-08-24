'use client';

import Link from 'next/link';
import Button from '@/components/Button';

export default function Bedankt() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Bedankt voor het invullen van de enquête!
      </h1>
      
      <p className="text-lg mb-8 text-gray-700">
        We hebben uw antwoorden ontvangen en zullen deze zorgvuldig bekijken. 
        Als we van start gaan met de bezorgservice, nemen we contact met u op!
      </p>
      
      <Link href="/">
        <Button>
          Terug naar home
        </Button>
      </Link>
    </div>
  );
}

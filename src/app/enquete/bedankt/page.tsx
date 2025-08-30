'use client';

import Link from 'next/link';
import Button from '@/components/Button';

export default function Bedankt() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Bedankt voor het invullen van de enquête!
      </h1>
      
      <p className="text-lg mb-6 text-gray-700">
        We hebben uw antwoorden ontvangen en zullen deze zorgvuldig bekijken. 
        Als we van start gaan met de bezorgservice, nemen we contact met u op!
      </p>
      
      <p className="text-base mb-8 text-gray-600">
        Heeft u vragen, opmerkingen of ideeën? Neem dan contact op via{' '}
        <a 
          href="mailto:bakkeraandedeurnijmegen@gmail.com" 
          className="text-blue-600 hover:text-blue-800 underline font-medium"
        >
          bakkeraandedeur@gmail.com
        </a>
      </p>
      
      <Link href="/">
        <Button>
          Terug naar home
        </Button>
      </Link>
    </div>
  );
}

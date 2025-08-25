'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EnqueteAntwoorden {
  interesse: boolean | null;
  bestellingen: Record<string, number> | null;
  frequentie: string | null;
  tijd: string | null;
  straat: string | null;
  huisnummer: number | null;
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon: string | null;
}

interface EnqueteContextType {
  antwoorden: EnqueteAntwoorden;
  isSubmitted: boolean;
  updateAnswer: (field: keyof EnqueteAntwoorden, value: EnqueteAntwoorden[keyof EnqueteAntwoorden]) => void;
  resetAntwoorden: () => void;
  setSubmitted: (submitted: boolean) => void;
}

const EnqueteContext = createContext<EnqueteContextType | undefined>(undefined);

const initialAntwoorden: EnqueteAntwoorden = {
  interesse: null,
  bestellingen: null,
  frequentie: null,
  tijd: null,
  straat: null,
  huisnummer: null,
  voornaam: '',
  achternaam: '',
  email: '',
  telefoon: null,
};

export function EnqueteProvider({ children }: { children: ReactNode }) {
  const [antwoorden, setAntwoorden] = useState<EnqueteAntwoorden>(initialAntwoorden);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateAnswer = (field: keyof EnqueteAntwoorden, value: EnqueteAntwoorden[keyof EnqueteAntwoorden]) => {
    setAntwoorden(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetAntwoorden = () => {
    setAntwoorden(initialAntwoorden);
    setIsSubmitted(false);
  };

  const setSubmitted = (submitted: boolean) => {
    setIsSubmitted(submitted);
  };

  return (
    <EnqueteContext.Provider value={{ antwoorden, isSubmitted, updateAnswer, resetAntwoorden, setSubmitted }}>
      {children}
    </EnqueteContext.Provider>
  );
}

export function useEnquete() {
  const context = useContext(EnqueteContext);
  if (context === undefined) {
    throw new Error('useEnquete must be used within an EnqueteProvider');
  }
  return context;
}

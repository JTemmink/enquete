'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EnqueteAntwoorden {
  interesse: boolean | null;
  bestellingen: Record<string, number> | null;
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
  updateAnswer: (field: keyof EnqueteAntwoorden, value: any) => void;
  resetAntwoorden: () => void;
}

const EnqueteContext = createContext<EnqueteContextType | undefined>(undefined);

const initialAntwoorden: EnqueteAntwoorden = {
  interesse: null,
  bestellingen: null,
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

  const updateAnswer = (field: keyof EnqueteAntwoorden, value: any) => {
    setAntwoorden(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetAntwoorden = () => {
    setAntwoorden(initialAntwoorden);
  };

  return (
    <EnqueteContext.Provider value={{ antwoorden, updateAnswer, resetAntwoorden }}>
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

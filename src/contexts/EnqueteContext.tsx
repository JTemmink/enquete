'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface EnqueteAntwoorden {
  interesse: boolean | null
  bestellingen: Record<string, number> | null
  tijd: string | null
  straat: string | null
  huisnummer: number | null
  voornaam: string
  achternaam: string
  email: string
  telefoon: string | null
}

interface EnqueteContextType {
  antwoorden: EnqueteAntwoorden
  updateAnswer: (field: keyof EnqueteAntwoorden, value: EnqueteAntwoorden[keyof EnqueteAntwoorden]) => void
}

const defaultAntwoorden: EnqueteAntwoorden = {
  interesse: null,
  bestellingen: null,
  tijd: null,
  straat: null,
  huisnummer: null,
  voornaam: '',
  achternaam: '',
  email: '',
  telefoon: null
}

const EnqueteContext = createContext<EnqueteContextType | undefined>(undefined)

export function EnqueteProvider({ children }: { children: ReactNode }) {
  const [antwoorden, setAntwoorden] = useState<EnqueteAntwoorden>(defaultAntwoorden)

  const updateAnswer = (field: keyof EnqueteAntwoorden, value: EnqueteAntwoorden[keyof EnqueteAntwoorden]) => {
    setAntwoorden(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <EnqueteContext.Provider value={{ antwoorden, updateAnswer }}>
      {children}
    </EnqueteContext.Provider>
  )
}

export function useEnquete() {
  const context = useContext(EnqueteContext)
  if (context === undefined) {
    throw new Error('useEnquete must be used within an EnqueteProvider')
  }
  return context
}
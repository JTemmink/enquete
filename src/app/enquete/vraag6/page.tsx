'use client';

import { useRouter } from 'next/navigation';
import { useEnquete } from '@/contexts/EnqueteContext';
import { useState } from 'react';

export default function Vraag6() {
  const router = useRouter();
  const { updateAnswer } = useEnquete();
  const [formData, setFormData] = useState({
    voornaam: '',
    achternaam: '',
    email: '',
    telefoon: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.voornaam.trim()) {
      newErrors.voornaam = 'Voornaam is verplicht';
    }
    
    if (!formData.achternaam.trim()) {
      newErrors.achternaam = 'Achternaam is verplicht';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is verplicht';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Voer een geldig emailadres in';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Update context
    if (field === 'voornaam' || field === 'achternaam' || field === 'email' || field === 'telefoon') {
      updateAnswer(field, value);
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleVerzenden = () => {
    if (validateForm()) {
      // Alle antwoorden zijn al opgeslagen in context
      router.push('/enquete/bedankt');
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-xl font-semibold mb-6 text-gray-800">
        Nu heb ik alleen uw contactgegevens nog nodig, we zullen alleen contact opnemen als we van start gaan of om uw eventuele vragen te beantwoorden.
      </h1>
      
      <div className="w-full space-y-4 mb-6">
        <div>
          <input
            type="text"
            placeholder="Voornaam *"
            value={formData.voornaam}
            onChange={(e) => handleInputChange('voornaam', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg text-center ${
              errors.voornaam ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.voornaam && (
            <p className="text-red-500 text-sm mt-1">{errors.voornaam}</p>
          )}
        </div>
        
        <div>
          <input
            type="text"
            placeholder="Achternaam *"
            value={formData.achternaam}
            onChange={(e) => handleInputChange('achternaam', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg text-center ${
              errors.achternaam ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.achternaam && (
            <p className="text-red-500 text-sm mt-1">{errors.achternaam}</p>
          )}
        </div>
        
        <div>
          <input
            type="email"
            placeholder="Emailadres *"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg text-center ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        
        <div>
          <input
            type="tel"
            placeholder="Telefoonnummer (optioneel)"
            value={formData.telefoon}
            onChange={(e) => handleInputChange('telefoon', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center"
          />
        </div>
      </div>
      
      <button
        onClick={handleVerzenden}
        className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors min-h-[48px] w-full"
      >
        Verzenden
      </button>
    </div>
  );
}

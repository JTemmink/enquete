'use client';

import { useRouter } from 'next/navigation';
import { useEnquete } from '@/contexts/EnqueteContext';
import Button from '@/components/Button';
import { useState } from 'react';

export default function Vraag6() {
  const router = useRouter();
  const { antwoorden, updateAnswer } = useEnquete();
  const [formData, setFormData] = useState({
    voornaam: antwoorden.voornaam || '',
    achternaam: antwoorden.achternaam || '',
    email: antwoorden.email || '',
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
    updateAnswer(field as keyof typeof antwoorden, value);
    
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
      // Stuur door naar bedankt pagina
      router.push('/enquete/bedankt');
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-xl font-semibold mb-6 text-gray-800">
        Nu heb ik alleen uw contactgegevens nog nodig
      </h1>
      
      <p className="text-lg mb-6 text-gray-700">
        We zullen alleen contact opnemen als we van start gaan of om uw eventuele vragen te beantwoorden.
      </p>
      
      <div className="w-full space-y-4 mb-6">
        <div>
          <input
            type="text"
            placeholder="Voornaam *"
            value={formData.voornaam}
            onChange={(e) => handleInputChange('voornaam', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg text-center text-lg transition-colors ${
              errors.voornaam ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }`}
          />
          {errors.voornaam && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.voornaam}</p>
          )}
        </div>
        
        <div>
          <input
            type="text"
            placeholder="Achternaam *"
            value={formData.achternaam}
            onChange={(e) => handleInputChange('achternaam', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg text-center text-lg transition-colors ${
              errors.achternaam ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }`}
          />
          {errors.achternaam && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.achternaam}</p>
          )}
        </div>
        
        <div>
          <input
            type="email"
            placeholder="Emailadres *"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg text-center text-lg transition-colors ${
              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.email}</p>
          )}
        </div>
      </div>
      
      <Button
        onClick={handleVerzenden}
        className="w-full"
      >
        Verzenden
      </Button>
    </div>
  );
}

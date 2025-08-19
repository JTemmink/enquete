'use client';

import { useRouter } from 'next/navigation';
import { useEnquete } from '@/contexts/EnqueteContext';
import { useState } from 'react';
import { supabase, isSupabaseAvailable } from '@/lib/supabaseClient';

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
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

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

  const checkEmailExists = async (email: string): Promise<boolean> => {
    if (!isSupabaseAvailable()) return false;
    
    try {
      const { data, error } = await supabase!
        .from('enquete_antwoorden')
        .select('email')
        .eq('email', email)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking email:', error);
        return false;
      }
      
      return !!data; // true als email bestaat, false als niet
    } catch (err) {
      console.error('Error checking email:', err);
      return false;
    }
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

  const handleVerzenden = async () => {
    if (!validateForm()) return;
    
    setIsCheckingEmail(true);
    
    try {
      // Controleer of email al bestaat
      const emailExists = await checkEmailExists(formData.email);
      
      if (emailExists) {
        setErrors({ email: 'Dit emailadres is al gebruikt voor een eerdere enquête.' });
        setIsCheckingEmail(false);
        return;
      }
      
      // Email is uniek, ga door naar bedankt pagina
      router.push('/enquete/bedankt');
    } catch (err) {
      console.error('Error during submission:', err);
      setErrors({ email: 'Er is een fout opgetreden. Probeer het opnieuw.' });
    } finally {
      setIsCheckingEmail(false);
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
        disabled={isCheckingEmail}
        className={`py-3 px-6 rounded-lg transition-colors min-h-[48px] w-full ${
          isCheckingEmail
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isCheckingEmail ? 'Bezig met controleren...' : 'Verzenden'}
      </button>
    </div>
  );
}

'use client'

import { useEnquete } from '@/contexts/EnqueteContext'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Button from '@/components/Button'
import QuestionWrapper from '@/components/QuestionWrapper'
import { supabase } from '@/lib/supabaseClient'

interface ContactForm {
  voornaam: string
  achternaam: string
  email: string
  telefoon: string
}

export default function Vraag6() {
  const { antwoorden, updateAnswer } = useEnquete()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>()

  const onSubmit = async (data: ContactForm) => {
    try {
      // Update alle antwoorden met contactgegevens
      const completeAntwoorden = {
        ...antwoorden,
        voornaam: data.voornaam,
        achternaam: data.achternaam,
        email: data.email,
        telefoon: data.telefoon || null
      }

      // Sla op in Supabase
      const { error } = await supabase
        .from('enquete_antwoorden')
        .insert([completeAntwoorden])

      if (error) {
        alert('Er is een fout opgetreden bij het opslaan van je antwoorden. Probeer het opnieuw.')
        console.error('Supabase error:', error)
        return
      }

      // Navigeer naar bedankt pagina
      router.push('/enquete/bedankt')
    } catch (error) {
      alert('Er is een fout opgetreden. Probeer het opnieuw.')
      console.error('Error:', error)
    }
  }

  return (
    <QuestionWrapper question="Nu heb ik alleen uw contactgegevens nog nodig, we zullen alleen contact opnemen als we van start gaan of om uw eventuele vragen te beantwoorden.">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Voornaam *</label>
          <input
            type="text"
            {...register('voornaam', { required: 'Voornaam is verplicht' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.voornaam && (
            <p className="text-red-500 text-sm mt-1">{errors.voornaam.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Achternaam *</label>
          <input
            type="text"
            {...register('achternaam', { required: 'Achternaam is verplicht' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.achternaam && (
            <p className="text-red-500 text-sm mt-1">{errors.achternaam.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Emailadres *</label>
          <input
            type="email"
            {...register('email', { 
              required: 'Email is verplicht',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Voer een geldig emailadres in'
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Telefoonnummer (optioneel)</label>
          <input
            type="tel"
            {...register('telefoon')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button type="submit" className="w-full">
          Verzenden
        </Button>
      </form>
    </QuestionWrapper>
  )
}
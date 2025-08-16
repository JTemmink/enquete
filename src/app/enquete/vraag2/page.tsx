'use client'

import { useEnquete } from '@/contexts/EnqueteContext'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Button from '@/components/Button'
import QuestionWrapper from '@/components/QuestionWrapper'

interface BestellingenForm {
  croissant: number
  stokbrood: number
  pistolet: number
  halfBrood: number
  hardeBroodjes: number
  zachteBroodjes: number
}

export default function Vraag2() {
  const { updateAnswer } = useEnquete()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<BestellingenForm>({
    defaultValues: {
      croissant: 0,
      stokbrood: 0,
      pistolet: 0,
      halfBrood: 0,
      hardeBroodjes: 0,
      zachteBroodjes: 0
    }
  })

  const onSubmit = (data: BestellingenForm) => {
    updateAnswer('bestellingen', data)
    router.push('/enquete/vraag3')
  }

  return (
    <QuestionWrapper question="Geef een schatting wat u verwacht te bestellen voor ontbijt, brunch of lunch?">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Croissant</label>
            <input
              type="number"
              min="0"
              {...register('croissant', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stokbrood</label>
            <input
              type="number"
              min="0"
              {...register('stokbrood', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pistolet</label>
            <input
              type="number"
              min="0"
              {...register('pistolet', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Half Brood</label>
            <input
              type="number"
              min="0"
              {...register('halfBrood', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Harde Broodjes</label>
            <input
              type="number"
              min="0"
              {...register('hardeBroodjes', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zachte Broodjes</label>
            <input
              type="number"
              min="0"
              {...register('zachteBroodjes', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full">
          Volgende
        </Button>
      </form>
    </QuestionWrapper>
  )
}
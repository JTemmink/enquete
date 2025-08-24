import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/Button'

export default function Home() {
  // Check if Supabase environment variables are available
  const hasSupabaseConfig = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Welkom bij Bakker aan de deur!
      </h1>
      
      <p className="text-lg mb-8 text-gray-700 leading-relaxed">
        Help jij mee dit mogelijk te maken? Vul dan deze enquête in! Alvast bedankt!
      </p>

      {!hasSupabaseConfig && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong>⚠️ Configuratie Probleem:</strong>
          <br />
          Supabase environment variables zijn niet ingesteld.
          <br />
          <small>De enquête functionaliteit werkt niet zonder deze configuratie.</small>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Link href="/enquete/vraag1">
          <Button 
            disabled={!hasSupabaseConfig}
            className="w-full"
          >
            {hasSupabaseConfig ? 'Enquête beginnen' : 'Enquête (niet beschikbaar)'}
          </Button>
        </Link>
        
        <Link href="/over-mij">
          <Button className="w-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 hover:from-gray-700 hover:via-gray-600 hover:to-gray-700">
            Over mij en dit project
          </Button>
        </Link>
      </div>

      {!hasSupabaseConfig && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">🔧 Setup Instructies:</h3>
          <ol className="text-sm text-blue-700 text-left space-y-1">
            <li>1. Ga naar je Vercel dashboard</li>
            <li>2. Voeg environment variables toe:</li>
            <li>   • NEXT_PUBLIC_SUPABASE_URL</li>
            <li>   • NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
            <li>3. Redeploy je project</li>
          </ol>
        </div>
      )}
    </div>
  )
}
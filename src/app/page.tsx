import Link from 'next/link'
import Card from '@/components/Card'

export default function Home() {
  // Check if Supabase environment variables are available
  const hasSupabaseConfig = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <Card padding="lg" shadow="none" border={false}>
          <Card.Header>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
              Welkom bij Bakkeraandedeur
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed">
              Help jij mee dit mogelijk te maken? Vul dan deze enquête in! Alvast bedankt!
            </p>
          </Card.Header>
        </Card>

        {!hasSupabaseConfig && (
          <Card className="mt-8" padding="md">
            <Card.Content>
              <div className="bg-error-50 border border-error-200 text-error-700 px-6 py-4 rounded-xl">
                <strong className="block mb-2">⚠️ Configuratie Probleem:</strong>
                <span className="text-sm">
                  Supabase environment variables zijn niet ingesteld.
                  <br />
                  De enquête functionaliteit werkt niet zonder deze configuratie.
                </span>
              </div>
            </Card.Content>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-6 w-full my-12">
          <Link 
            href="/enquete/vraag1" 
            className={`flex-1 py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 ${
              hasSupabaseConfig 
                ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-medium hover:shadow-large transform hover:-translate-y-0.5' 
                : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
            }`}
            {...(hasSupabaseConfig ? {} : { onClick: (e) => e.preventDefault() })}
          >
            {hasSupabaseConfig ? 'Enquête beginnen' : 'Enquête (niet beschikbaar)'}
          </Link>
          
          <Link 
            href="/over-mij" 
            className="flex-1 py-4 px-8 bg-secondary-500 hover:bg-secondary-600 text-white rounded-xl font-semibold text-lg transition-all duration-200 shadow-medium hover:shadow-large transform hover:-translate-y-0.5"
          >
            Over mij en dit project
          </Link>
        </div>

        {!hasSupabaseConfig && (
          <Card className="mt-8">
            <Card.Header>
              <h3 className="font-semibold text-primary-800 mb-4 text-lg">🔧 Setup Instructies:</h3>
            </Card.Header>
            <Card.Content>
              <ol className="text-primary-700 text-left space-y-2 text-base">
                <li className="flex items-start">
                  <span className="font-medium mr-2">1.</span>
                  <span>Ga naar je Vercel dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">2.</span>
                  <span>Voeg environment variables toe:</span>
                </li>
                <li className="flex items-start ml-6">
                  <span className="font-medium mr-2">•</span>
                  <span>NEXT_PUBLIC_SUPABASE_URL</span>
                </li>
                <li className="flex items-start ml-6">
                  <span className="font-medium mr-2">•</span>
                  <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">3.</span>
                  <span>Redeploy je project</span>
                </li>
              </ol>
            </Card.Content>
          </Card>
        )}
      </div>
    </div>
  )
}
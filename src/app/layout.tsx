import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bakkeraandedeur - Enquête',
  description: 'Help jij mee dit mogelijk te maken? Vul dan deze enquête in!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if Supabase environment variables are available
  const hasSupabaseConfig = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <html lang="nl">
      <body className={`${inter.className} bg-primaryBg min-h-screen flex flex-col items-center justify-center`}>
        <div className="max-w-md mx-auto p-4 flex flex-col items-center">
          <Image 
            src="/images/bakkeraandedeurlogo.png" 
            alt="Bakkeraandedeur Logo" 
            width={200} 
            height={100}
            priority
          />
          
          {!hasSupabaseConfig && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              <strong>Configuratie Waarschuwing:</strong> Supabase environment variables zijn niet ingesteld.
              <br />
              <small>De enquête functionaliteit werkt mogelijk niet correct.</small>
            </div>
          )}
          
          {children}
        </div>
      </body>
    </html>
  )
}
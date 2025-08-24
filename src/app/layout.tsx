import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import { ToastProvider } from '@/components/Toast'
import ErrorBoundary from '@/components/ErrorBoundary'

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
      <body className={`${inter.className} min-h-screen`}>
        <ErrorBoundary>
          <ToastProvider>
            <div className="min-h-screen bg-primary-50 flex flex-col">
              <header className="py-8 px-6 bg-white shadow-soft">
                <div className="container mx-auto flex justify-center">
                  <Image 
                    src="/images/bakkeraandedeurlogo.png" 
                    alt="Bakkeraandedeur Logo" 
                    width={200} 
                    height={100}
                    priority
                    className="h-auto"
                  />
                </div>
              </header>
              
              {!hasSupabaseConfig && (
                <div className="bg-warning-50 border border-warning-200 text-warning-700 px-6 py-4 mx-6 mt-4 rounded-xl shadow-soft">
                  <strong className="block mb-2">Configuratie Waarschuwing:</strong>
                  <span className="text-sm">
                    Supabase environment variables zijn niet ingesteld.
                    <br />
                    De enquête functionaliteit werkt mogelijk niet correct.
                  </span>
                </div>
              )}
              
              <main className="flex-1">
                {children}
              </main>
            </div>
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
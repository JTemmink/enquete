import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-lg mb-8 text-gray-800">
        Help jij mee dit mogelijk te maken vul dan deze enquete in! Alvast bedankt!
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Link 
          href="/enquete/vraag1" 
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors min-h-[48px] flex items-center justify-center"
        >
          Enquête beginnen
        </Link>
        
        <Link 
          href="/over-mij" 
          className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors min-h-[48px] flex items-center justify-center"
        >
          Over mij en dit project
        </Link>
      </div>
    </div>
  );
}

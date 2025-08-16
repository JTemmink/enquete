import Link from 'next/link';

export default function OverMij() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Over mij en dit project</h1>
      
      <p className="text-lg mb-8 text-gray-700">
        Over mij en dit project...
      </p>
      
      <Link 
        href="/enquete/vraag1" 
        className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors min-h-[48px] flex items-center justify-center"
      >
        Enquête beginnen
      </Link>
    </div>
  );
}

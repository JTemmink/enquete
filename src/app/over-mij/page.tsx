import Link from 'next/link';

export default function OverMij() {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Over het project</h1>
      
      <div className="text-lg mb-8 text-gray-700 space-y-6">
        <p>
          Hoi allemaal! Ik heb een ontzettend leuk plan: een bezorgservice voor de allerlekkerste ontbijtjes, brunches en lunches, speciaal voor de zondagochtend! Zondag is dé dag dat veel gezinnen gezellig samen eten, en ik wil dat moment nóg specialer maken met verse broodjes en andere lekkere producten.
        </p>
        
        <p>
          Omdat de meeste bakkers in de stad op zondag dicht zijn, wil ik in samenwerking met een bakker die wel op zondag open is broodjes gewoon aan jou deur te bezorgen. Geen gedoe, alleen maar genieten van een heerlijke start van je dag! Ik ben benieuwd of jullie dit ook zo'n tof idee vinden, dus vul mijn korte enquête in op de website en laat het me weten!
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">Over mij</h2>
      
      <div className="text-lg mb-8 text-gray-700 space-y-6">
        <p>
          Ik ben Ilaria, een 12-jarige meid en het zou me super leuk lijken om dit plan van start te kunnen laten gaan. Dit bezorgservice-idee is mijn eigen project, en ik zet me volledig in om het tot een succes te maken.
        </p>
        
        <p>
          Ik zorg ervoor dat alles zorgvuldig wordt geregeld, van het ophalen van verse producten bij de bakker tot het bezorgen aan jouw deur. Mijn doel is om jouw zondagochtend te verrijken met een geweldige ervaring. Ik hoop dat je net zo enthousiast bent over dit plan als ik!
        </p>
      </div>
      
      <Link 
        href="/enquete/vraag1" 
        className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors min-h-[48px] flex items-center justify-center"
      >
        Enquête beginnen
      </Link>
    </div>
  );
}

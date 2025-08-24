import Link from 'next/link';
import Header from '@/components/Header';
import Card, { CardContent } from '@/components/Card';

export default function OverMij() {
  return (
    <>
      <Header currentPage="/over-mij" />
      <main className="container mx-auto py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Over het project
            </h1>
          </div>
          
          <div className="space-y-8 mb-16">
            <Card variant="elevated" padding="lg">
              <CardContent>
                <p className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-6">
                  Hoi allemaal! Ik heb een ontzettend leuk plan: een bezorgservice voor de allerlekkerste ontbijtjes, brunches en lunches, speciaal voor de zondagochtend! Zondag is dé dag dat veel gezinnen gezellig samen eten, en ik wil dat moment nóg specialer maken met verse broodjes en andere lekkere producten.
                </p>
                
                <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
                  Omdat de meeste bakkers in de stad op zondag dicht zijn, wil ik in samenwerking met een bakker die wel op zondag open is broodjes gewoon aan jou deur te bezorgen. Geen gedoe, alleen maar genieten van een heerlijke start van je dag! Ik ben benieuwd of jullie dit ook zo&apos;n tof idee vinden, dus vul mijn korte enquête in op de website en laat het me weten!
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
              Over mij
            </h2>
          </div>
          
          <div className="space-y-8 mb-16">
            <Card variant="elevated" padding="lg">
              <CardContent>
                <p className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-6">
                  Ik ben Ilaria, een 12-jarige meid en het zou me super leuk lijken om dit plan van start te kunnen laten gaan. Dit bezorgservice-idee is mijn eigen project, en ik zet me volledig in om het tot een succes te maken.
                </p>
                
                <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
                  Ik zorg ervoor dat alles zorgvuldig wordt geregeld, van het ophalen van verse producten bij de bakker tot het bezorgen aan jouw deur. Mijn doel is om jouw zondagochtend te verrijken met een geweldige ervaring. Ik hoop dat je net zo enthousiast bent over dit plan als ik!
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Link 
              href="/enquete/vraag1" 
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold text-lg rounded-xl shadow-medium hover:shadow-large transform hover:-translate-y-0.5 transition-all duration-200 min-h-[56px]"
            >
              Enquête beginnen
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

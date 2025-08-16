import { EnqueteProvider } from '@/contexts/EnqueteContext';

export default function EnqueteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EnqueteProvider>
      {children}
    </EnqueteProvider>
  );
}

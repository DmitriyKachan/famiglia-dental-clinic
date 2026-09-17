import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Famiglia — Стоматологія твоєї сімʼї | Львів',
  description:
    'Авторська сімейна стоматологічна клініка Famiglia у Львові на вул. Бойківська, 2. Безболісне лікування, естетична реставрація, ортодонтія, дитяча стоматологія.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className="bg-[#0d0d0d] text-cream font-hn antialiased selection:bg-cream selection:text-black min-h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}

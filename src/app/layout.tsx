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
      <body className="bg-brand-bg text-brand-dark antialiased selection:bg-brand-gold/30 selection:text-brand-dark min-h-screen">
        {children}
      </body>
    </html>
  );
}

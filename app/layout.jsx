import { Inter as FontSans } from 'next/font/google';

import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Panel de Administración',
  description:
    'Panel de Administración para facilitar la gestión y supervisión de diversas operaciones dentro de la organización.',
};

export default function LoginLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased w-full m-0 p-0',
          fontSans.variable
        )}
      >
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}

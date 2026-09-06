import type { Metadata, Viewport } from 'next';
import { ModeProvider } from '@/context/mode-context';
import { ToastProvider } from '@/components/ui/toast';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'QORGAN — цифровая безопасность',
  description: 'Спокойная и понятная цифровая защита для пользователей Казахстана.',
  manifest: '/manifest.json',
  openGraph: {
    title: 'QORGAN — цифровая безопасность',
    description: 'Цифровая безопасность — спокойно и понятно.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'QORGAN' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QORGAN — цифровая безопасность',
    description: 'Цифровая безопасность — спокойно и понятно.',
    images: ['/og.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'QORGAN',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#f7f8f4',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kk" className="h-full" data-mode="standard">
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <ModeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ModeProvider>
      </body>
    </html>
  );
}

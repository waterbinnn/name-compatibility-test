import type { Metadata } from 'next';
import '@/styles/globals.scss';

import localFont from 'next/font/local';
import { GoogleAnalytics } from '@/lib';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'sans-serif',
  ],
});

export const metadata: Metadata = {
  title: '우리의 이름 궁합은?',
  description: '재미로 보는 이름 궁합',
  icons: '/assets/cat.png',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className={pretendard.className}>
      <GoogleAnalytics />
      <body>{children}</body>
    </html>
  );
}

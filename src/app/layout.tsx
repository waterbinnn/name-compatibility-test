import type { Metadata } from 'next';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: '우리의 이름 궁합은?',
  description: '재미로 보는 이름 궁합',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        {modal}
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import Header from '@/components/shared/Header';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Next Pizza v2 | Главная',
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <main className="min-h-screen">
        <Suspense>
          <Header />
        </Suspense>
        {modal}
        {children}
      </main>
    </html>
  );
}

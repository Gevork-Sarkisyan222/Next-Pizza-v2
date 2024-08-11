import { Container } from '@/components/shared/Container';
import Header from '@/components/shared/Header';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Next Pizza v2 | Заказы',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <body className="bg-[#F4F1EE]">
      <main className="min-h-screen">
        <Container>
          <Suspense>
            <Header checkoutPage={true} />
          </Suspense>
          {children}
        </Container>
      </main>
    </body>
  );
}

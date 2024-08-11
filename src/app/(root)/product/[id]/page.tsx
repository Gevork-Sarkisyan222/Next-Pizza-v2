import { notFound } from 'next/navigation';
import { prisma } from '../../../../../prisma/prisma-client';
import ProductForm from '@/components/shared/ProductForm';

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  return <ProductForm product={product} isModal={false} />;
}

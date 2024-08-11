'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ProductWithRelations } from '../../../../@types/prisma';
import ProductForm from '../ProductForm';

type Props = {
  product: ProductWithRelations;
};

const ChooseProductModal: React.FC<Props> = ({ product }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden">
        <ProductForm product={product} isModal={true} />
      </DialogContent>
    </Dialog>
  );
};

export default ChooseProductModal;

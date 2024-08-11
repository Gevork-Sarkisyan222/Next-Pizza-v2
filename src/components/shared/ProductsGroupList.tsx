'use client';

import React, { useRef } from 'react';
import ProductCard from './ProductCard';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/category';
import { ProductWithRelations } from '../../../@types/prisma';

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
}

const ProductsGroupList: React.FC<Props> = ({ title, items, categoryId }) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);

  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div id={title} ref={intersectionRef}>
      <h1 className="font-extrabold mb-5 text-[36px]">{title}</h1>

      <div className="grid grid-cols-3 gap-[60px]">
        {items.map((product, index) => (
          <ProductCard
            key={index}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={String(product.items[0].price)}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGroupList;

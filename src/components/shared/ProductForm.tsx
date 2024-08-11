'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';
import { Container } from './Container';
import { ProductWithRelations } from '../../../@types/prisma';
import ChoosePizzaForm from './ChoosePizzaForm';
import ChooseProductForm from './ChooseProductForm';

interface Props {
  product: ProductWithRelations;
  isModal?: boolean;
}

const ProductForm: React.FC<Props> = ({ product, isModal }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);

  const onAddProduct = async () => {
    try {
      await addCartItem({ productItemId: firstItem.id });
      toast.success(`${product.name} добавлен в корзину`);
      router.back();
    } catch (error) {
      console.error(error);
      toast.error('Не удалось добавить продукт в корзину');
    }
  };

  const onAddPizza = async (productItemId: number, ingredients: number[]) => {
    try {
      await addCartItem({ productItemId, ingredients });
      toast.success(`Пицца ${product.name} добавлена в корзину`);
      router.back();
    } catch (error) {
      console.error(error);
      toast.error('Не удалось добавить пиццу в корзину');
    }
  };

  if (isPizzaForm) {
    return !isModal ? (
      <Container className="flex flex-1 my-5">
        <ChoosePizzaForm
          imageUrl={product.imageUrl}
          name={product.name}
          ingredients={product.ingredients}
          items={product.items}
          onSubmit={onAddPizza}
          loading={loading}
        />
      </Container>
    ) : (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onAddPizza}
        loading={loading}
      />
    );
  }

  return !isModal ? (
    <Container className="flex flex-1 my-5">
      <ChooseProductForm
        imageUrl={product.imageUrl}
        name={product.name}
        onSubmit={onAddProduct}
        price={firstItem.price}
        loading={loading}
      />
    </Container>
  ) : (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onAddProduct}
      price={firstItem.price}
      loading={loading}
    />
  );
};

export default ProductForm;

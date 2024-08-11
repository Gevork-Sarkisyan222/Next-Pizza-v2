import { Variant } from '@/components/shared/GroupVariants';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { getAvailablePizzaSizes } from '@/lib/get-available-pizza-sizes';
import { ProductItem } from '@prisma/client';
import React, { useState } from 'react';
import { useSet } from 'react-use';

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availablePizzaSizes: Variant[];
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredients: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredients }] = useSet(new Set<number>([]));

  // new putted
  const availablePizzaSizes = items ? getAvailablePizzaSizes(items, type) : [];

  const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

  React.useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find(
      (item) => Number(item.value) === size && !item.disabled,
    );
    const availableSize = availablePizzaSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    availablePizzaSizes,
    currentItemId,
    setSize,
    setType,
    addIngredients,
  };
};

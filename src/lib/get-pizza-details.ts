import { mapPizzaType, PizzaSize, PizzaType } from '@/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { calcTotalPizzaPrice } from './calc-total-pizza-price';

interface ReturnProps {
  totalPrice: number;
  textDetails: string;
}

export const getPizzaDetails = (
  items: ProductItem[],
  ingredients: Ingredient[],
  type: PizzaType,
  size: PizzaSize,
  selectedIngredients: Set<number>,
): ReturnProps => {
  const totalPrice =
    items && ingredients
      ? calcTotalPizzaPrice(items, ingredients, type, size, selectedIngredients)
      : 0;

  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

  return {
    totalPrice,
    textDetails,
  };
};

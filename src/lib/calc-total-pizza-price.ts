import { PizzaSize, PizzaType } from '@/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';

/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 *
 * @returns number общую стоимость
 */
export const calcTotalPizzaPrice = (
  items: ProductItem[],
  ingredients: Ingredient[],
  type: PizzaType,
  size: PizzaSize,
  selectedIngredients: Set<number>,
): number => {
  const pizzaPrice =
    items?.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
  const totalIngredientsPrice = ingredients
    ?.filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return Number(pizzaPrice) + Number(totalIngredientsPrice);
};

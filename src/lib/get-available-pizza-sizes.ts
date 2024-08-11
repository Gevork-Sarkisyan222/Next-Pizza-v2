import { Variant } from '@/components/shared/GroupVariants';
import { pizzaSizes, PizzaType } from '@/constants/pizza';
import { ProductItem } from '@prisma/client';

export const getAvailablePizzaSizes = (items: ProductItem[], type: PizzaType): Variant[] => {
  //   vernor ka products items in mej u state type
  const filteredPizzasByType = items?.filter((item) => item.pizzaType === type);

  //   istex aysinqn ka tag@
  const availablePizzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    // t@ havasar che gli true
    disabled: !filteredPizzasByType?.some((pizza) => Number(pizza.size) === Number(item.value)),
  }));

  return availablePizzaSizes;
};

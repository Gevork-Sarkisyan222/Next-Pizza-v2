// type returnProps = {
//   totalPrice: number;
// };

import { CartItemDto } from '../../services/dto/cart.dto';

// export const calcCartItemTotalPrice = (
//   price: number,
//   quantity: number,
//   ingredientsPrice: number,
// ): returnProps => {
//   const totalPrice = price * quantity + ingredientsPrice;

//   return { totalPrice };
// };

export const calcCartItemTotalPrice = (item: CartItemDto): number => {
  const price = item.productItem.price;
  const quantity = item.quantity;
  const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

  return (ingredientsPrice + price) * quantity;
};

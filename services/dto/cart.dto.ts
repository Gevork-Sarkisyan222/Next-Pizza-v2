import { Cart, CartItem, Ingredient, Product, ProductItem } from '@prisma/client';

export type CartItemDto = CartItem & {
  productItem: ProductItem & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export interface CartDto extends Cart {
  items: CartItemDto[];
}

export interface CreateCartItemValues {
  productItemId: number;
  ingredients?: number[];
}

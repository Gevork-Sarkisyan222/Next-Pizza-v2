import { Ingredient, Product, ProductItem } from '@prisma/client';

export type ProductWithRelations = Product & { items: ProductItem[]; ingredients: Ingredient[] };

export interface CartItemProps {
  id: number;
  imageUrl: string;
  details: string;
  name: string;
  price: number;
  quantity: number;
  disbaled?: boolean;
}

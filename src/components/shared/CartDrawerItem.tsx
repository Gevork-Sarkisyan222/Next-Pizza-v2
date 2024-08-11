'use client';

import React, { useEffect, useMemo } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { CircleMinus, CirclePlus, Minus, Plus, Trash2Icon } from 'lucide-react';
import { mapPizzaType, PizzaSize, PizzaType } from '@/constants/pizza';
import { Ingredient } from '@prisma/client';
import { getPizzaDetails } from '@/lib/get-pizza-details';
import { getCartItemDetails } from '@/lib/get-cart-item-details';
import { useCartStore } from '@/store/cart';
import Image from 'next/image';

interface Props {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  pizzaSize: PizzaSize;
  pizzaType: PizzaType;
  ingredients: Ingredient[];
  disabled?: boolean;
}
const CartDrawerItem: React.FC<Props> = ({
  id,
  imageUrl,
  name,
  price,
  quantity,
  pizzaSize,
  pizzaType,
  ingredients,
  disabled,
}) => {
  const [updateItemQuantity, removeCartItem] = useCartStore((state) => [
    state.updateItemQuantity,
    state.removeCartItem,
  ]);

  const details = getCartItemDetails(pizzaSize, pizzaType, ingredients);
  const [quantityState, setQuantityState] = React.useState(quantity);

  useEffect(() => {
    setQuantityState(quantity);
  }, [quantity]);

  const handleUpdateQuantity = (quantity: number) => {
    setQuantityState(quantity);
    updateItemQuantity(id, quantity);
  };

  const onClickCountButton = (type: 'minus' | 'plus') => {
    type === 'plus'
      ? handleUpdateQuantity(quantityState + 1)
      : quantityState > 0 && handleUpdateQuantity(quantityState - 1);
    {
    }
  };

  const onClickRemoveItem = () => {
    window.confirm('Вы уверены, что хотите удалить этот продукт из корзины?') && removeCartItem(id);
  };

  return (
    <div
      className={`p-[20px] bg-[#FFFFFF] w-[full] h-[100%] ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      }`}>
      <div className="flex gap-[24px]">
        <div className="object-cover">
          <Image width={65} height={65} src={imageUrl} alt="pizza image" />
        </div>

        <div>
          <h2 className="font-[700] mb-[3px]">{name}</h2>
          <p className="text-[#A1A1A1] font-[400] text-[14px] border-b border-gray-300 pb-2 mb-[12px]">
            {details}
          </p>

          <div className="flex items-center justify-between w-[220px]">
            <div className="flex gap-[10px] items-center">
              <Button
                onClick={() => onClickCountButton('minus')}
                variant="outline"
                type="button"
                className={`p-0 hover:bg-primary hover:text-white w-[30px] h-[30px] rounded-[10px] ${
                  quantity === 1 && 'opacity-50 pointer-events-none border-gray-400 text-gray-400'
                }`}>
                <Minus />
              </Button>

              <b className="text-[16px] font-[700]">{quantity}</b>

              <Button
                onClick={() => onClickCountButton('plus')}
                variant="outline"
                type="button"
                className="p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400 w-[30px] h-[30px] rounded-[10px]">
                <Plus />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <p className="font-[700]">{price} ₽</p>

              <Trash2Icon
                onClick={onClickRemoveItem}
                size={16}
                className="cursor-pointer text-gray-400 hover:text-gray-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawerItem;

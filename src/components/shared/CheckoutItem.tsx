import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { Minus, Plus, X } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { Ingredient } from '@prisma/client';
import { getCartItemDetails } from '@/lib/get-cart-item-details';
import Image from 'next/image';

type Props = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  pizzaSize?: PizzaSize;
  pizzaType?: PizzaType;
  ingredients: Ingredient[];
  disabled?: boolean;
};

const CheckoutItem: React.FC<Props> = ({
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

  const handleUpdateQuantity = (quantity: number) => {
    updateItemQuantity(id, quantity);
  };

  const onClickCountButton = (type: 'minus' | 'plus') => {
    type === 'plus'
      ? handleUpdateQuantity(quantity + 1)
      : quantity > 0 && handleUpdateQuantity(quantity - 1);
    {
    }
  };

  const onClickRemoveItem = () => {
    window.confirm('Вы уверены, что хотите удалить этот продукт из корзины?') && removeCartItem(id);
  };

  return (
    <div
      className={`w-full flex items-center justify-between relative ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      }`}>
      <div className="flex gap-[20px] items-center">
        <Image width={65} height={65} src={imageUrl} alt="pizza image" />

        <div>
          <h2 className="font-[700] mb-[3px]">{name}</h2>
          <p className="text-[#A1A1A1] font-[400] text-[14px] pb-2 mb-[12px] w-[90%]">{details}</p>
        </div>
        <hr className="w-full border-b border-[#F6F6F6] absolute bottom-[-15px]" />
      </div>

      <p className="font-[700] whitespace-nowrap">{price} ₽ </p>

      <div className="flex gap-[10px] items-center ml-[35px]">
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

        <button type="button" onClick={onClickRemoveItem}>
          <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
        </button>
      </div>
    </div>
  );
};

export default CheckoutItem;

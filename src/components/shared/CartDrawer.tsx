'use client';

import React, { useEffect } from 'react';
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
import CartDrawerItem from './CartDrawerItem';
import { ArrowLeft, ArrowRight, Link } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { Ingredient } from '@prisma/client';
import emptyIcon from '../../../public/assets/images/empty-box.png';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {}
const CartDrawer: React.FC<Props> = () => {
  const [totalAmount, fetchCartItems, items] = useCartStore((state) => [
    state.totalAmount,
    state.fetchCartItems,
    state.items,
  ]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const router = useRouter();

  const [redirecting, setRedirecting] = React.useState(false);

  const handleWentToCheckout = () => {
    setRedirecting(true);
    router.push('/checkout');
  };

  return (
    <SheetContent className="bg-[#F4F1EE] p-0 flex flex-col justify-between">
      {items.length === 0 ? (
        <article className="h-screen relative flex justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center w-[285px]">
            <Image className="mb-[20px]" width={120} height={120} src={emptyIcon} alt="emptyIcon" />
            <h2 className="mb-[6px] text-[22px] font-[600]">Корзина пустая</h2>
            <p className="text-[15px] text-[#000000] mb-[35px]">
              Добавьте хотя бы одну пиццу, чтобы совершить заказ
            </p>
            <SheetClose>
              <Button className="w-[230px] h-[55px]" variant="default">
                <ArrowLeft className="w-5 mr-2" />
                Вернуться назад
              </Button>
            </SheetClose>
          </div>
        </article>
      ) : (
        <>
          <div>
            <SheetHeader>
              <SheetTitle className="my-[20px] ml-[20px]">
                В корзине <b className="font-[700]">{items.length} товара</b>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-[20px] max-h-[450px] overflow-auto scrollbar">
              {items.map((item) => (
                <CartDrawerItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  pizzaSize={item.pizzaSize as PizzaSize}
                  pizzaType={item.pizzaType as PizzaType}
                  ingredients={item.ingredients as Ingredient[]}
                  disabled={item.disabled}
                />
              ))}
            </div>
          </div>

          <SheetFooter className="w-full h-[207px] p-[35px] bg-[#FFFFFF]">
            <div className="flex flex-col items-center w-[325px]">
              <div className="flex flex-col mb-4 gap-[13px] w-full">
                <div className="flex justify-between">
                  <p>Итого: </p>
                  <span className="font-bold text-lg">{totalAmount} ₽</span>
                </div>

                <div className="flex justify-between">
                  <p>Налог 5%: </p>
                  <span className="font-bold text-lg">112 ₽</span>
                </div>
              </div>

              <Button
                loading={redirecting}
                onClick={handleWentToCheckout}
                type="submit"
                className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </div>
          </SheetFooter>
        </>
      )}
    </SheetContent>
  );
};

export default CartDrawer;

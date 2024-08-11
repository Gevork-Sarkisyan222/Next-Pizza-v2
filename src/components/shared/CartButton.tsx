'use client';

import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import CartDrawer from './CartDrawer';
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
import { useCartStore } from '@/store/cart';
import { cn } from '@/lib/utils';

interface Props {}
const CartButton: React.FC<Props> = () => {
  const [totalAmount, loading, items] = useCartStore((state) => [
    state.totalAmount,
    state.loading,
    state.items,
  ]);

  return (
    <>
      <Sheet>
        <CartDrawer />

        <SheetTrigger className="flex items-center gap-[8px] transition duration-300 opacity-1 group-hover:opacity-0">
          <Button
            loading={loading}
            className={cn('group relative', { 'w-[105px]': loading })}
            variant="default">
            <b className="font-[600]">{totalAmount} ₽</b>
            <span className="h-[25px] w-[1px] bg-[#FFFFFF40] mx-[7px]"></span>
            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
              <ShoppingCart size={16} className="relative" strokeWidth={2} />
              <b>{items.length}</b>
            </div>

            <ArrowRight
              size={20}
              className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </Button>
        </SheetTrigger>
      </Sheet>
    </>
  );
};

export default CartButton;

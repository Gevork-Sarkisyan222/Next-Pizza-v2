import React from 'react';
import WhiteBlock from '../WhiteBlock';
import CheckoutItem from '../CheckoutItem';
import { CartStateItem } from '@/lib/get-cart-details';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckoutItemSkeleton } from '../CheckoutItemSkeleton';

type Props = {
  items: CartStateItem[];
  className?: string;
  loading?: boolean;
};

const CheckoutCart: React.FC<Props> = ({ items, className, loading }) => {
  return (
    <WhiteBlock className={className} title="1. Корзина" endEdorment="Очистить корзину">
      <div className="flex flex-col gap-[30px] mb-[30px] h-full">
        {loading
          ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} className="h-20" />)
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                pizzaSize={item.pizzaSize}
                pizzaType={item.pizzaType}
                ingredients={item.ingredients}
                disabled={item.disabled}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};

export default CheckoutCart;

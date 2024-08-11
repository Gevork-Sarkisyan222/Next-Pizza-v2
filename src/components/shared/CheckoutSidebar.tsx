import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import React from 'react';
import CheckoutItemDetails from './CheckoutItemDetails';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

type Props = {
  totalAmount: number;
  loading?: boolean;
};

const VAT = 15;
const DELIVERY_PRICE = 250;

const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading }) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

  return (
    <div className="w-[450px] h-[490px] bg-[#FFFFFF] rounded-[30px] p-[35px] sticky top-10">
      <h2 className='font-[400] text-[22px]"'>Итого:</h2>
      {loading ? (
        <Skeleton className="w-[200px] h-[45px] my-3" />
      ) : (
        <h1 className="h-11 font-[800] text-[34px] mb-[25px]">{totalPrice} ₽</h1>
      )}

      <hr className="w-full h-[1px] bg-[#F6F6F6]" />

      <CheckoutItemDetails
        title={
          <div className="flex items-center gap-4">
            <Package size={18} className="text-gray-400" />
            Стоимость корзины:
          </div>
        }
        value={loading ? <Skeleton className="w-16 h-6 rounded-[6px]" /> : `${totalAmount} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center gap-4">
            <Percent size={18} className="text-gray-400" />
            Налоги:
          </div>
        }
        value={loading ? <Skeleton className="w-16 h-6 rounded-[6px]" /> : `${vatPrice} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center gap-4">
            <Truck size={18} className="text-gray-400" />
            Доставка:
          </div>
        }
        value={loading ? <Skeleton className="w-16 h-6 rounded-[6px]" /> : `${DELIVERY_PRICE} ₽`}
      />

      <hr className="w-full h-[1px] bg-[#F6F6F6] mt-[40px]" />

      <Button
        loading={loading}
        type="submit"
        className="w-full h-[60px] mt-[40px] flex items-center gap-2"
        variant="default">
        Перейти к оплате <ArrowRight />
      </Button>
    </div>
  );
};

export default CheckoutSidebar;

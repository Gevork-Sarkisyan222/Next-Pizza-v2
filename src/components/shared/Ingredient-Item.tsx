import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface Props {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClickAdd: (id: number) => void;
}

const IngredientItem: React.FC<Props> = ({ id, imageUrl, name, price, active, onClickAdd }) => {
  return (
    <div
      onClick={() => onClickAdd(id)}
      className={cn(
        'w-[130px] h-[195px] rounded-[15px] flex justify-center text-center items-center flex-col cursor-pointer bg-[#FFFFFF] shadow-md relative',
        {
          'border-[#FE5F00] border-[1px] rounded-[15px]': active,
        },
      )}>
      <Image width={110} height={110} className="mb-[5px] mt-[10px]" src={imageUrl} alt={name} />
      <p className="text-[12px] font-[400] mb-[21px]">{name}</p>
      <p className="text-[14px] font-[600] mb-[10px]">{price} ₽</p>

      {active && <CircleCheck className="absolute right-[7px] top-[7px] text-primary" />}
    </div>
  );
};

export default IngredientItem;

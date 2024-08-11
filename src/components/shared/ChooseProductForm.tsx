'use client';

import { Ingredient, ProductItem } from '@prisma/client';
import React from 'react';
import ProductImage from './PizzaImage';
import GroupVariants from './GroupVariants';
import { Button } from '../ui/button';
import Image from 'next/image';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  onSubmit?: VoidFunction;
  loading: boolean;
}

const ChooseProductForm: React.FC<Props> = ({ imageUrl, name, price, onSubmit, loading }) => {
  return (
    <div className="flex flex-1 items-center">
      <div className="flex items-center justify-center flex-1 relative w-full">
        <Image
          width={350}
          height={350}
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300"
        />
      </div>

      <div className="w-[490px] h-full bg-[#f7f6f5] p-7">
        <h1 className="font-[800] text-[#000000] text-[36px] mb-[20px]">{name}</h1>

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          variant="default"
          className={`h-[50px] rounded-[18px] w-full px-10 text-base mt-10 ${
            loading ? 'bg-gray-300 cursor-progress' : ''
          }`}>
          Добавить в корзину {price} ₽
        </Button>
      </div>
    </div>
  );
};

export default ChooseProductForm;

import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { Ingredient } from '@prisma/client';

interface PropsTypes {
  id: number;
  name: string;
  imageUrl: string;
  price: string;
  ingredients: Ingredient[];
}

const ProductCard: React.FC<PropsTypes> = ({ id, name, imageUrl, price, ingredients }) => {
  return (
    <div className="w-[285px] h-[430px] mb-[50px] relative">
      <Link href={`/product/${id}`}>
        <div className="w-full h-[260px] bg-[#FFF7EE] rounded-[15px] flex justify-center items-center mb-[15px]">
          <Image width={210} height={210} src={imageUrl} alt={`pizza image - ${name}`} />
        </div>
      </Link>

      <h2 className="font-[700] mb-[7px]">{name}</h2>
      <p className="font-[400] text-[#B1B1B1] mb-[17px]">
        {ingredients.map((ingredient) => ingredient.name).join(', ')}
      </p>

      <div className="flex justify-between items-center">
        <span className="font-[700]">
          от <b className="font-bold">{price} ₽</b>
        </span>

        <Link href={`/product/${id}`}>
          <Button
            variant="outline"
            className="bg-[#FFFAF4] text-[#FE5F00] flex items-center gap-[10px] border-none hover:bg-[#ffedd7]">
            <Plus /> Добавить
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

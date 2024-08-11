import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

type PizzaImageProps = {
  imageUrl: string;
  size: 20 | 30 | 40;
};

export default function PizzaImage({ imageUrl, size }: PizzaImageProps) {
  return (
    <div className={'flex items-center justify-center flex-1 relative w-full h-full'}>
      <Image
        src={imageUrl}
        alt="Logo"
        className={cn('relative left-2 top-2 transition-all z-10 duration-300', {
          'w-[300px] h-[300px]': size === 20,
          'w-[400px] h-[400px]': size === 30,
          'w-[500px] h-[500px]': size === 40,
        })}
        width={size === 20 ? 300 : size === 30 ? 400 : 500}
        height={size === 20 ? 300 : size === 30 ? 400 : 500}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
    </div>
  );
}

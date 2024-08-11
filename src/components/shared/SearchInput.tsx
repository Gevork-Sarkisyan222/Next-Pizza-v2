'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useClickAway, useDebounce } from 'react-use';
import { Api } from '../../../services/api-client';
import { Product } from '@prisma/client';

type Props = {};

function SearchInput({}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [focused, setFocused] = useState<boolean>(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(searchValue);
        setProducts(response);
      } catch (err) {
        console.error(err);
      }
    },
    250,
    [searchValue],
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchValue('');
    setProducts([]);
  };

  return (
    <>
      {focused && (
        <div
          //   onClick={() => setFocused(false)} навсяки
          className="fixed left-0 right-0 top-0 bottom-0 bg-black/50 z-30"></div>
      )}

      <div ref={ref} className="w-full flex justify-between relative h-[50px] rounded-2xl z-30">
        <Search color="#ADADAD" size={20} className="absolute top-[14px] left-[16px]" />
        <input
          className="text-[black] placeholder-[#C0C0C0] w-full h-[50px] rounded-[15px] text-[16px] pl-[50px] outline-none border-none bg-[#F9F9F9]"
          type="text"
          placeholder="Поиск пиццы..."
          onFocus={() => setFocused(true)}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={`bg-[white] absolute w-full rounded-xl py-[13px] shadow-md  ${
              focused ? 'top-[55px]' : 'top-[50px]'
            } transition-all duration-300 ${focused ? 'visible' : 'invisible'} ${
              focused ? 'opacity-1' : 'opacity-0'
            } z-30`}>
            {products.map((product) => (
              <Link onClick={onClickItem} key={product.id} href={`/product/${product.id}`}>
                <div className="px-[19px] py-[10px] hover:bg-primary/50 flex items-center">
                  <Image
                    width={30}
                    height={30}
                    className="mr-[12px]"
                    src={product.imageUrl}
                    alt="product image"
                  />
                  <span className="font-[700] text-[16px] mr-[14px]">{product.name}</span>
                  {/* <p className="text-[#858585] font-[400] text-[14px]">179₽</p> */}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchInput;

'use client';

import { useCategoryStore } from '@/store/category';
import { Category } from '@prisma/client';
import React from 'react';

function Categories({ items }: { items: Category[] }) {
  const activeCategoryId = useCategoryStore((state) => state.activeId);

  return (
    <div
      style={{ width: 'max-content' }}
      className="h-[55px] bg-[#F9FAFB] rounded-[15px] justify-between flex gap-[5px] p-[5px] items-center">
      {items.map(({ id, name }, index) => (
        <a
          href={`/#${name}`}
          className={`h-[43px] font-[500] py-[10px] px-[25px] rounded-[15px] cursor-pointer ${
            activeCategoryId === id && 'bg-[#FFFFFF] text-[#FE5F00]'
          }`}
          key={index}>
          <h3 className="text-[16px] font-[500] whitespace-nowrap">{name}</h3>
        </a>
      ))}
    </div>
  );
}

export default Categories;

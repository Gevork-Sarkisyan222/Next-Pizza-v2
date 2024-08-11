'use client';

import React, { useState } from 'react';
import { FilterChecboxProps, FilterCheckbox } from './FilterCheckbox';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import { useSet } from 'react-use';

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  name: string;
  selected: Set<string>;
}

const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit,
  loading,
  searchInputPlaceholder,
  onClickCheckbox,
  defaultValue,
  selected,
  name,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchItem, setSearchItem] = useState('');

  const handleSearchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  if (loading) {
    return (
      <div>
        <h2 className="text-[16px] font-[700] mb-[20px]">{title}</h2>

        {...Array(limit)
          .fill(0)
          .map(() => <Skeleton className="mb-4 h-6 rounded-[8px]" />)}

        <Skeleton className="w-[100px] h-6 rounded-[8px]" />
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) => item.text?.toLowerCase().includes(searchItem.toLowerCase()))
    : (defaultItems || items).slice(0, limit);

  return (
    <div className="mt-[30px]">
      <h2 className="text-[16px] font-[700] mb-[20px]">{title}</h2>

      {showAll && (
        <div className="mb-5">
          <Input
            value={searchItem}
            onChange={handleSearchItem}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name={name}
          />
        ))}
        {items.length > limit && (
          <div className="mt-[20px]">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-[#FE5F00] text-[16px] hover:text-[#fb85408e]">
              {showAll ? 'Скрыть' : '+ Показать всё'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckboxFiltersGroup;

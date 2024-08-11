'use client';

import React, { useEffect, useState } from 'react';
import { FilterCheckbox } from './FilterCheckbox';
import { Input } from '../ui/input';
import { RangeSlider } from './RangeSlider';
import CheckboxFiltersGroup from './CheckboxFiltersGroup';
// import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { useSet } from 'react-use';
import qs from 'qs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFilters, useIngredients, useQueryFilters } from '@/hooks';

export interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

function Filters() {
  const router = useRouter();
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div>
      <h2 className="text-[22px] font-[700] mb-[30px]">Фильтрация</h2>

      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaType"
        selected={filters.pizzaTypes}
        limit={2}
        onClickCheckbox={filters.setPizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          {
            text: 'Традиционное',
            value: '2',
          },
        ]}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        selected={filters.sizes}
        limit={3}
        onClickCheckbox={filters.setSizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />

      <div className="mt-[30px] border-y border-neutral-100 py-6 pb-7">
        <h2 className="text-[16px] font-[700] mb-[20px]">Цена от и до:</h2>

        <div className="flex mb-[20px] gap-[15px]">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ингредиенты:"
        defaultItems={items.slice(0, 6)}
        items={items}
        limit={6}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        searchInputPlaceholder="Найти..."
        name="ingredients"
        selected={filters.selectedIngredients}
      />
    </div>
  );
}

export default Filters;

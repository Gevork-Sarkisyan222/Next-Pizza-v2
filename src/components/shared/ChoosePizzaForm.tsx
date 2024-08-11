'use client';

import { Ingredient, ProductItem } from '@prisma/client';
import React, { useState } from 'react';
import GroupVariants from './GroupVariants';
import { Button } from '../ui/button';
import PizzaImage from './PizzaImage';
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/constants/pizza';
import IngredientItem from './Ingredient-Item';
import { useSet } from 'react-use';
import { calcTotalPizzaPrice } from '@/lib/calc-total-pizza-price';
import { getAvailablePizzaSizes } from '@/lib/get-available-pizza-sizes';
import { usePizzaOptions } from '@/hooks/usePizzaOptions';
import { getPizzaDetails } from '@/lib/get-pizza-details';

interface Props {
  imageUrl: string;
  name: string;
  ingredients?: Ingredient[];
  items?: ProductItem[];
  onSubmit: (itemId: number, ingredients: number[]) => void;
  loading: boolean;
}

const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  onSubmit,
  loading,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    availablePizzaSizes,
    currentItemId,
    setSize,
    setType,
    addIngredients,
  } = usePizzaOptions(items ? items : []);

  const { totalPrice, textDetails } = getPizzaDetails(
    items ? items : [],
    ingredients ?? [],
    type,
    size,
    selectedIngredients,
  );

  const handleClickAdd = () => {
    currentItemId && onSubmit(currentItemId, Array.from(selectedIngredients));
  };

  return (
    <div className="flex flex-1 items-center">
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <h1 className="font-[800] text-[#000000] text-[36px] mb-[20px]">{name}</h1>
        <p className="text-gray-400 mb-[25px]">{textDetails}</p>

        <GroupVariants
          items={availablePizzaSizes}
          value={String(size)}
          onClick={(value) => setSize(Number(value) as PizzaSize)}
        />

        <GroupVariants
          items={pizzaTypes}
          value={String(type)}
          onClick={(value) => setType(Number(value) as PizzaType)}
        />

        <h2 className="text-[18px] font-[600] mb-[16px]">Добавить по вкусу</h2>

        <div className="bg-gray-50  rounded-mt max-h-[250px] overflow-y-auto scrollbar">
          <div className="flex gap-[14px] flex-wrap w-[418px]">
            {ingredients?.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                id={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
                onClickAdd={(id: number) => addIngredients(id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          variant="default"
          className={`h-[50px] rounded-[18px] w-full px-10 text-base mt-10 ${
            loading ? 'bg-gray-300 cursor-progress' : ''
          }`}>
          Добавить в корзину {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};

export default ChoosePizzaForm;

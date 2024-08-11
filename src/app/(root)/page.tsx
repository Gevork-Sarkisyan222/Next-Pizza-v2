import Categories from '@/components/shared/Categories';
import SortPopup from '@/components/shared/SortPopup';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import TopBar from '@/components/shared/TopBar';
import Filters from '@/components/shared/Filters';
import ProductCard from '@/components/shared/ProductCard';
import ProductsGroupList from '@/components/shared/ProductsGroupList';
import { prisma } from '../../../prisma/prisma-client';
import { Suspense } from 'react';
import { findPizzas, GetSearchParams } from '@/lib/find-pizzas';
import Stories from '@/components/shared/Stories';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container className="mt-[41px]">
        <h1 className="font-[800] text-[#000000] text-[36px] mb-[20px]">Все пиццы</h1>
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Stories />

      <Container className="mt-[40px] pb-14">
        <div className="flex gap-[80px]">
          {/* left */}
          <div className="w-[244px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* right */}
          <div className="flex-1">
            {categories.map(
              (category) =>
                category.products.length > 0 && (
                  <ProductsGroupList
                    key={category.id}
                    title={category.name}
                    categoryId={category.id}
                    items={category.products}
                  />
                ),
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

import React from 'react';
import SortPopup from './SortPopup';
import Categories from './Categories';
import { Container } from './Container';
import { Category } from '@prisma/client';

function TopBar({ categories }: { categories: Category[] }) {
  return (
    <div className="sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10">
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  );
}

export default TopBar;

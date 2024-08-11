import { Product } from '@prisma/client';
import { axiosInstance } from './instance';
import { NextResponse } from 'next/server';
import { ApiRoutes } from './constants';

export const search = async (query: string): Promise<Product[]> => {
  return (await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query } }))
    .data;
};

import { Ingredient, Product } from '@prisma/client';
import { axiosInstance } from './instance';
import { NextResponse } from 'next/server';
import { ApiRoutes } from './constants';

export const getAll = async (): Promise<Ingredient[]> => {
  return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
};

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma/prisma-client';

export async function GET(req: NextRequest) {
  let query = req.nextUrl.searchParams.get('query') || '';
  query = query.toLowerCase();

  const product = await prisma.product.findMany({
    where: {
      name: {
        contains: query.toLowerCase(),
        mode: 'insensitive',
      },
    },
    take: 5,
  });

  return NextResponse.json(product);
}

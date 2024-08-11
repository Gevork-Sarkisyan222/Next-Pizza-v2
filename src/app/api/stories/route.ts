import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

export async function GET() {
  try {
    const stories = await prisma.story.findMany({
      include: {
        items: true,
      },
    });

    if (!stories) {
      return NextResponse.json({ message: 'Stories not found' }, { status: 404 });
    }

    return NextResponse.json(stories);
  } catch (err) {
    console.error(err);
  }
}

import { getServerSession } from 'next-auth';
import { prisma } from '../../../../../prisma/prisma-client';
import { authOptions } from '@/constants/auth-options';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(session?.user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 });
  }
}

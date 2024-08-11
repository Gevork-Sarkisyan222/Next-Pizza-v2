import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { prisma } from '../../../../prisma/prisma-client';
import { authOptions } from '@/constants/auth-options';
import ProfileForm from '@/components/shared/ProfileForm';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/not-auth');
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session.user.id),
    },
  });

  if (!user) {
    redirect('/not-auth');
  }

  return <ProfileForm data={user} />;
}

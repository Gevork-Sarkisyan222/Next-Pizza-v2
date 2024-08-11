import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui/button';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';

function ProfileButton({ onClickSignIn }: { onClickSignIn: () => void }) {
  const { data: session } = useSession();

  return (
    <>
      {!session ? (
        <Button onClick={onClickSignIn} className="flex items-center gap-[5px]" variant="outline">
          <User size={16} /> <p className="font-[600]">Войти</p>
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </>
  );
}

export default ProfileButton;

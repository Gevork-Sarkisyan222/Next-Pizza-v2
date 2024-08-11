'use client';

import React, { useEffect } from 'react';
import { Container } from './Container';
import logo from '../../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import SearchInput from './SearchInput';
import CartButton from './CartButton';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import ProfileButton from './ProfileButton';
import AuthModal from './modals/auth-modal/AuthModal';

function Header({ checkoutPage }: { checkoutPage?: boolean }) {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  console.log(session);

  useEffect(() => {
    if (searchParams.has('paid')) {
      setTimeout(() => {
        toast.success('Заказ успешно оплачен! Информация отправлена на почту.');

        // Удаление параметра из URL
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('paid');

        // Обновление URL без перезагрузки страницы
        window.history.replaceState({}, '', newUrl.toString());
      }, 500);
    }

    if (searchParams.has('verified')) {
      setTimeout(() => {
        toast.success('Почта успешно подтвержден');

        // Удаление параметра из URL
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('verified');

        // Обновление URL без перезагрузки страницы
        window.history.replaceState({}, '', newUrl.toString());
      }, 500);
    }
  }, []);

  return (
    <header className={`border-b ${checkoutPage ? 'border-[##DEDEDE]' : ''}`}>
      <Container className="flex items-center justify-between py-8">
        {/* left */}
        <Link href="/">
          <div className="flex gap-[15px] items-center">
            <Image className="cursor-pointer" width={35} height={35} src={logo} alt="logo" />
            <div>
              <h2 className="font-[900] text-[24px] color-[#000000]">NEXT PIZZA</h2>
              <p className="font-400 text-[#7B7B7B]">вкусней уже некуда</p>
            </div>
          </div>
        </Link>

        {!checkoutPage && (
          <div className="mx-[50px] flex-1">
            <SearchInput />
          </div>
        )}

        {/* right */}
        <div className="flex items-center gap-[15px]">
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {!checkoutPage && <CartButton />}
        </div>
      </Container>
    </header>
  );
}

export default Header;

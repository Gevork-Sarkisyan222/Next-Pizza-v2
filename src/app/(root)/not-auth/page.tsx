import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import lockImage from '../../../../public/assets/images/lock.png';
import Link from 'next/link';

export default function NotAuth() {
  return (
    <div className="flex mt-40 justify-center gap-[85px] items-center">
      <div className="flex flex-col w-[445px]">
        <h1 className="mb-[10px] font-[800] text-[40px]">Доступ запрещён</h1>
        <p className="mb-[45px] font-[400] text-[#999999] leading-[27px]">
          Данную страницу могут просматривать только авторизованные пользователи
        </p>

        <div className="flex gap-[20px]">
          <Link href={'/'}>
            <Button variant={'outline'} className="flex items-center mr-[12px] gap-[12px]">
              <ArrowLeft size={14} className="text-[#FE5F00]" />
              На главную
            </Button>
          </Link>
          <Button
            variant={'outline'}
            className="flex items-center mr-[12px] gap-[12px] border-[#C7C7C7] text-[#898989]">
            Обновить
          </Button>
        </div>
      </div>
      <picture>
        <Image width={320} height={370} src={lockImage} alt="lock image" />
      </picture>
    </div>
  );
}

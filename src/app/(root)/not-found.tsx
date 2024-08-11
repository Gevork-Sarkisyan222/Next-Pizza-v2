import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import notFoundImage from '../../../public/assets/images/not-found.png';

export default function NotFoundPage() {
  return (
    <div className="flex mt-40 justify-center gap-[85px] items-center">
      <div className="flex flex-col w-[445px]">
        <h1 className="mb-[10px] font-[800] text-[40px]">Страница не найдена</h1>
        <p className="mb-[45px] font-[400] text-[#999999] leading-[27px]">
          Проверьте корректность введённого адреса или повторите попытку позже
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
        <Image width={320} height={370} src={notFoundImage} alt="lock image" />
      </picture>
    </div>
  );
}

import { Repeat2 } from 'lucide-react';
import React from 'react';
import sortIcon from '../../../public/assets/images/sort-icon.svg';
import Image from 'next/image';

function SortPopup() {
  return (
    <div
      style={{ width: 'max-content' }}
      className="h-[55px] bg-[#F9FAFB] rounded-[15px] justify-between flex gap-[5px] py-[15px] px-[22px] items-center cursor-pointer">
      <Image className="mr-[7px]" src={sortIcon} alt="icon" />
      <b className="text-[#202020] font-[400]">Сортировка:</b>
      <b className="text-[#FE5F00] font-[400]">рейтингу</b>
    </div>
  );
}

export default SortPopup;

import { cn } from '@/lib/utils';
import { Trash2Icon } from 'lucide-react';
import React from 'react';

interface Props {
  className?: string;
  children: React.ReactNode;
  title: string;
  endEdorment?: string;
}

const WhiteBlock: React.FC<Props> = ({ className, children, title, endEdorment }) => {
  return (
    <div
      className={cn('w-[752px] h-full mb-[45px] bg-[#FFFFFF] rounded-[30px] p-[35px]', className)}>
      <article className="flex justify-between items-center mb-[25px]">
        <h1 className="text-[24px] font-[700] cursor-pointer">{title}</h1>
        {endEdorment && (
          <div className="flex items-center gap-[7px]">
            <Trash2Icon size={14} color="#999999" className="cursor-pointer" />
            <p className="text-[#999999] text-[16px] cursor-pointer hover:text-[#6f6f6f]">
              {endEdorment}
            </p>
          </div>
        )}
      </article>
      <hr className="w-full h-[1px] bg-[#F6F6F6]" />

      <div className="mt-[35px]">{children}</div>
    </div>
  );
};

export default WhiteBlock;

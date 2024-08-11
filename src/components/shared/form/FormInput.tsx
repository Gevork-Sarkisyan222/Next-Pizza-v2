'use client';

import { Input } from '@/components/ui/input';
import { RequiredSymbol } from '../RequiredSymbol';
import { ErrorText } from '../ErrorText';
import { X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
}

export const FormInput: React.FC<Props> = ({ name, label, required, type }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <div>
      <h2 className="mb-[5px] font-[700]">
        {label} {!value && required && <RequiredSymbol />}
      </h2>
      <div className="relative">
        <Input
          {...register(name)}
          name={name}
          type={type}
          placeholder={label}
          className="mb-[25px] text-base"
        />

        {value && (
          <button
            onClick={onClickClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};

export default FormInput;

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LoginFormSchema, TFormLoginValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import phoneIcon from '../.././../../../../public/assets/images/phone-icon.png';
import Image from 'next/image';
import FormInput from '@/components/shared/form/FormInput';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { assert } from 'console';
import { signIn } from 'next-auth/react';

interface Props {
  onClose?: VoidFunction;
}

const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success('Вы вошли в аккаунт', {
        icon: '✅',
      });

      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.log('Error [LOGIN]', err);
      toast.error('Не удалось войти в аккаунт', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <h2 className="font-bold">Вход в аккаунт</h2>
            <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
          </div>
          <Image src={phoneIcon} alt="phone-icon" width={60} height={60} />
        </div>

        <FormInput name="email" label="E-Mail" required={true} />
        <FormInput name="password" label="Пароль" required={true} type="password" />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;

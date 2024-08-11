import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RegisterFormSchema, TRegisterFormValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import phoneIcon from '../.././../../../../public/assets/images/phone-icon.png';
import Image from 'next/image';
import FormInput from '@/components/shared/form/FormInput';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { assert } from 'console';
import { signIn } from 'next-auth/react';
import { registerUser } from '@/app/actions';

interface Props {
  onClose?: VoidFunction;
}

const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TRegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TRegisterFormValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('Регистрация успешна 📝. Подтвердите свою почту', {
        icon: '✅',
      });

      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.log('Error [REGISTER]', err);
      toast.error('Не удалось cоздать аккаунт', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <FormInput name="email" label="E-Mail" required={true} />
          <FormInput name="fullName" label="Полное имя" required={true} />

          <FormInput name="password" label="Пароль" required={true} type="password" />
          <FormInput
            name="confirmPassword"
            label="Повторите пароль"
            required={true}
            type="password"
          />
        </div>

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RegisterFormSchema, TRegisterFormValues } from './modals/auth-modal/forms/schemas';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container } from './Container';
import FormInput from './form/FormInput';
import { Button } from '../ui/button';
import { updateUserInfo } from '@/app/actions';

interface Props {
  data: User;
}

const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TRegisterFormValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('Данные обновлены 📝', {
        icon: '✅',
      });
    } catch (error) {
      return toast.error('Ошибка при обновлении данных', {
        icon: '❌',
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Container className="my-10">
      <h1 className="text-[30px] mb-[28px]">Персональные данные</h1>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[16px] max-w-[350px]">
          <FormInput name="email" label="E-Mail" type="email" required />
          <FormInput name="fullName" label="Полное Имя" required />

          <FormInput name="password" label="Новый пароль" type="password" />
          <FormInput name="confirmPassword" label="Повторите пароль" type="password" />

          <Button disabled={form.formState.isSubmitting} type="submit" className="text-base mt-10">
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant={'secondary'}
            disabled={form.formState.isSubmitting}
            type="button"
            className="text-base">
            Выйти из аккаунта
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};

export default ProfileForm;

'use client';

import React from 'react';
import { Container } from '@/components/shared/Container';
import WhiteBlock from '@/components/shared/WhiteBlock';
import { Input } from '@/components/ui/input';
import timeIcon from '../../../../public/assets/images/timeIcon.svg';
import Image from 'next/image';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CheckoutItem from '@/components/shared/CheckoutItem';
import { Textarea } from '@/components/ui/textarea';
import CheckoutItemDetails from '@/components/shared/CheckoutItemDetails';
import { CheckoutItemSkeleton } from '@/components/shared/CheckoutItemSkeleton';
import { useCartStore } from '@/store/cart';
import { useEffect } from 'react';
import { CartItem, User } from '@prisma/client';
import CheckoutSidebar from '@/components/shared/CheckoutSidebar';
import FormInput from '@/components/shared/form/FormInput';

import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CheckoutCart from '@/components/shared/checkout/CheckoutCart';
import CheckoutPersonalForm from '@/components/shared/checkout/CheckoutPersonalForm';
import { checkoutFormSchema, CheckoutFormValues } from '@/constants/checkout-form-schema';
import { FormTextarea } from '@/components/shared/form/FormTextArea';
import { AdressInput } from '@/components/shared/AdressInput';
import { ErrorText } from '@/components/shared/ErrorText';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { Api } from '../../../../services/api-client';
import { redirect } from 'next/navigation';

export default function CheckoutPage() {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = React.useState(false);

  const [totalAmount, fetchCartItems, items, loading] = useCartStore((state) => [
    state.totalAmount,
    state.fetchCartItems,
    state.items,
    state.loading,
  ]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);

      toast.success('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      });

      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
  };

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  useEffect(() => {
    if (items.length === 0) {
      redirect('/');
    }
  }, [items]);

  return (
    <Container className="my-[50px]">
      <h1 className="text-[35px] font-[800] mb-[50px]">Оформление заказа</h1>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-[45px]">
            {/* first from */}
            <div className="flex flex-col">
              {/* 1 */}
              <CheckoutCart items={items} loading={loading} />

              {/* 2 */}
              <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

              {/* 3 */}
              <WhiteBlock
                className={loading ? 'opacity-40 pointer-events-none' : ''}
                title="3. Адрес доставки">
                <Controller
                  control={form.control}
                  name="address"
                  render={({ field, fieldState }) => (
                    <>
                      <AdressInput onChange={field.onChange} />
                      {fieldState.error?.message && (
                        <ErrorText text={fieldState.error?.message} className="mt-2" />
                      )}
                    </>
                  )}
                />

                <FormTextarea
                  name="comment"
                  label="Комментарий к заказу"
                  required={false}
                  className="mb-[25px] text-base placeholder:text-[#999999] mt-[10px]"
                />

                <div>
                  <h2 className="mb-[10px] font-[700]">Время доставки</h2>
                  <article className="flex items-center gap-[8px]">
                    <Image width={17} height={17} src={timeIcon} alt="time icon" />
                    <h3 className='font-[400] text-[16px]"'>Доставка в 11:00</h3>
                  </article>
                </div>
              </WhiteBlock>
            </div>

            {/* second from */}
            <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}

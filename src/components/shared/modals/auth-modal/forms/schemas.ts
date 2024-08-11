import { z } from 'zod';

export const PasswordSchema = z.string().min(4, { message: 'Введите корректный пароль' });

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Введите корректную почту' }),
  password: PasswordSchema,
});

export const RegisterFormSchema = LoginFormSchema.merge(
  z.object({
    fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
    confirmPassword: PasswordSchema,
  }),
).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
});

export type TFormLoginValues = z.infer<typeof LoginFormSchema>;
export type TRegisterFormValues = z.infer<typeof RegisterFormSchema>;

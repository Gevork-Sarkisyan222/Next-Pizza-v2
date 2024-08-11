import { axiosInstance } from './instance';
import { CartDto, CreateCartItemValues } from './dto/cart.dto';

export const getCart = async (): Promise<CartDto> => {
  const { data } = await axiosInstance.get<CartDto>('/cart');

  return data;
};

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDto> => {
  return (await axiosInstance.patch<CartDto>(`/cart/${itemId}`, { quantity })).data;
};

export const removeCartItem = async (itemId: number): Promise<CartDto> => {
  return (await axiosInstance.delete<CartDto>(`/cart/${itemId}`)).data;
};

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDto> => {
  const { data } = await axiosInstance.post<CartDto>('/cart', values);

  return data;
};

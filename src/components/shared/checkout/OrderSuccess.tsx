import React from 'react';
import { CartItemDto } from '../../../../services/dto/cart.dto';

type Props = {
  orderId: number;
  items: CartItemDto[];
};

export default function OrderSuccessTemplate({ orderId, items }: Props) {
  return (
    <div>
      <h1>Спасибо за покупку! 🎉</h1>

      <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>

      <hr />

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.productItem.product.name} | {item.productItem.price} ₽ x {item.quantity} шт. ={' '}
            {item.productItem.price * item.quantity} ₽
          </li>
        ))}
      </ul>
    </div>
  );
}

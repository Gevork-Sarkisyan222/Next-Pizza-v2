import { NextRequest, NextResponse } from 'next/server';
import { PaymentCallbackData } from '../../../../../@types/yookassa';
import { prisma } from '../../../../../prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
import { CartItemDto } from '../../../../../services/dto/cart.dto';
import { sendEmail } from '@/lib/sendEmail';
import OrderSuccessTemplate from '@/components/shared/checkout/OrderSuccess';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    const isSucceeded = body.object.status === 'succeeded';

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDto[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        'Next Pizza / Ваш заказ успешно оформлен 🎉',
        OrderSuccessTemplate({ orderId: order.id, items }),
      );
    } else {
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log('[Checkout Callback] Error:', error);
    return NextResponse.json({ error: 'Server error' });
  }
}

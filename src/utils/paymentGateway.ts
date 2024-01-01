import Razorpay from 'razorpay';
import config from '@src/config/config';

export const createOrderRazorpay = async (
  amount: number,
  currency: string,
  receipt: string,
): Promise<any> => {
  const instance = new Razorpay({
    key_id: config.paymentGateway.razorpay.key_id,
    key_secret: config.paymentGateway.razorpay.key_secret,
  });

  const options = {
    amount: amount * 100,
    currency,
    receipt,
  };

  const order = await instance.orders.create(options);
  return order;
};

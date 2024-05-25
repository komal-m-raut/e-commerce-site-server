import Razorpay from 'razorpay';
import config from '@src/config/config';
import crypto from 'crypto';

export const createRazorPayOrder = async (
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


export const verifyRazorPaySignature = (
  orderId: string,
  paymentId: string,
  signature: string ,
): boolean => {
  // Creating hmac object
  const hmac = crypto.createHmac('sha256', config.paymentGateway.razorpay.key_secret);

  // Passing the data to be hashed
  hmac.update(orderId + '|' + paymentId);

  // Creating the hmac in the required format
  const generatedSignature = hmac.digest('hex');
  // Comparing the signature with the hashed string
  if (signature === generatedSignature) {
    return true;
  } else {
    return false;
  }
};

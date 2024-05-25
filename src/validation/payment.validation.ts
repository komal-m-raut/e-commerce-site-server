import Joi from 'joi';
import { validateObjectId } from './common.validation';

export const createOrderSchema = Joi.object({
  amount: Joi.number().required(),
  currency: Joi.string().required(),
  receipt: Joi.string().required(),
});

export const verifyOrderSchema = Joi.object({
  orderId: Joi.string().required(),
  paymentId: Joi.string().required(),
  roleId:validateObjectId().required(),
});

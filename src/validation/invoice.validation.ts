import Joi from 'joi';

export const createInvoiceSchema = Joi.object({
  //Add fields as per your requirement
});

export const idSchema = Joi.object({
  orderId: Joi.string().required(),
});

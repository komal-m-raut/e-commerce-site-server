import Joi from 'joi';

export const userIdSchema = Joi.object({
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .label('Valid MongoDB ObjectID'),
});

export const productIdSchema = Joi.object({
  productId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .label('Valid MongoDB ObjectID'),
});

export const idSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .label('Valid MongoDB ObjectID'),
});

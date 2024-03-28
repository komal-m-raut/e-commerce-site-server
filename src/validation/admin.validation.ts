import Joi from 'joi';

export const createAdminSchema = Joi.object({
  username: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNo: Joi.number().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateAdminSchema = Joi.object({
  username: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  phoneNo: Joi.number(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  role: Joi.string(),
});

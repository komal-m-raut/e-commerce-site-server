import Joi from 'joi';

export const createOtpSchema = Joi.object({
  userType: Joi.string().valid('admin','tenant', 'user').required(),
  userId: Joi.string().optional(),
  phoneNo: Joi.string().pattern(/^(\+\d{1,3})?\d{10}$/),
  email: Joi.string().email(),
}).or('phoneNo', 'email');

export const validateOtpSchema = Joi.object({
  otp: Joi.string().required(),
  userType: Joi.string().valid('admin','tenant', 'user').required(),
  userId: Joi.string().required(),
});

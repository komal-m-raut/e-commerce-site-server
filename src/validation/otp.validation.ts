import Joi from 'joi';

export const createOtpSchema = Joi.object({
  userType: Joi.string().valid('admin', 'tenant', 'user').required(),
  phoneNo: Joi.number(),
  email: Joi.string().email(),
}).or('phoneNo', 'email');

export const createOtpTypeSchema = Joi.object({
  type: Joi.string().valid('email', 'phoneNo').required(),
});

export const validateOtpSchema = Joi.object({
  otp: Joi.string().required(),
  userType: Joi.string().valid('admin', 'tenant', 'user').required(),
  userId: Joi.string().required(),
});

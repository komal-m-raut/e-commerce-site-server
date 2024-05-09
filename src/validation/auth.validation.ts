import Joi from 'joi';
import { validateObjectId } from './common.validation';

export const createOtpSchema = Joi.object({
  userType: Joi.string().valid('admin', 'tenant', 'user').required(),
  phoneNo: Joi.number(),
  email: Joi.string().email(),
  userId: validateObjectId().optional(),
}).or('phoneNo', 'email');

export const createOtpTypeSchema = Joi.object({
  type: Joi.string().valid('email', 'phoneNo').required(),
});

export const resendOtpSchema = Joi.object({
  userType: Joi.string().valid('admin', 'tenant', 'user').required(),
  userId: validateObjectId().required(),
  category: Joi.string().valid('phoneNo', 'email').required(),
  email: Joi.string().email(),
  phoneNo: Joi.number(),
}).or('phoneNo', 'email');

export const validateOtpSchema = Joi.object({
  otp: Joi.string().required(),
  userType: Joi.string().valid('admin', 'tenant', 'user').required(),
  userId: validateObjectId().required(),
  category: Joi.string().valid('phoneNo', 'email').required(),
});

export const createPasswordResetLinkSchema = Joi.object({
  email: Joi.string().email().required(),
  userType: Joi.string().valid('admin', 'tenant', 'user').required(),
});

export const verifyPasswordResetLinkSchema = Joi.object({
  newPassword: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    )
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required',
      'string.min': 'Password must have at least {{#limit}} characters',
      'any.required': 'Password is required',
      'string.pattern.base':
        'Password must contain at least 1 symbol, 1 lowercase letter, 1 uppercase letter and 1 number',
    }),
});

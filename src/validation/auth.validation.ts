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

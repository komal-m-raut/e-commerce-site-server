import Joi from 'joi';

export const loginTenantSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const createTenantSchema = Joi.object({
  email: Joi.string().email().required(),
  phoneNo: Joi.number().required(),
  password: Joi.string()
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

export const updateTenantSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().allow('').optional(),
});

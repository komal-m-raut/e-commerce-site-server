import Joi from 'joi';
import { validateObjectId } from './common.validation';

export const loginTenantSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const createTenantSchema = Joi.object({
  name: Joi.string().required(),
  phoneNo: Joi.number().required(),
  email: Joi.string().email().required(),
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
  role: validateObjectId().optional(),
});

export const createTenantPasswordSchema = Joi.object({
  name: Joi.string().required(),
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
  userId: validateObjectId(),
});

export const updateDomainSchema = Joi.object({
  domain: Joi.string().optional(),
});

export const homeSectionSchema = Joi.object({
  preset: Joi.string().required(),
  headerTemplate: Joi.string().required(),
  navTemplate: Joi.string().required(),
  sections: Joi.array()
    .items(
      Joi.object({
        cardTemplate: Joi.string().required(),
        heading: Joi.string().required(),
        cards: Joi.array()
          .items(
            Joi.object({
              cssProperties: Joi.object().required(),
            }),
          )
          .required(),
      }),
    )
    .required(),
});

export const marketingPageSchema = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string().required(),
  html: Joi.string().required(),
  status: Joi.string().valid('active', 'inactive').required(),
  seo: Joi.object({
    title: Joi.string().required(),
    keywords: Joi.array().items(Joi.string()).required(),
    description: Joi.string().required(),
  }).required(),
});

export const marketingPageUpdateSchema = Joi.object({
  marketingPageId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .label('Valid MongoDB ObjectID'),
  updatedData: Joi.object({
    title: Joi.string(),
    slug: Joi.string(),
    html: Joi.string(),
    status: Joi.string().valid('active', 'inactive'),
    seo: Joi.object({
      title: Joi.string(),
      keywords: Joi.array().items(Joi.string()),
      description: Joi.string(),
    }),
  }),
});

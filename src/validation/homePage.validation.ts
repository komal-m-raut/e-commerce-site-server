import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createHomePageSchema = Joi.object({
  tenantId: Joi.string()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .required(),
  sections: Joi.array()
    .items(
      Joi.object({
        isActive: Joi.boolean().default(true),
        type: Joi.string().valid('Banner', 'Carousel', 'Section').required(),
        data: Joi.object().required(),
      }),
    )
    .required(),
  seoDetails: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    keywords: Joi.array().items(Joi.string()),
  }),
});

export const updateHomePageSchema = Joi.object({
  sections: Joi.array().items(
    Joi.object({
      isActive: Joi.boolean(),
      type: Joi.string().valid('Banner', 'Carousel', 'Section'),
      data: Joi.object(),
    }),
  ),
  seoDetails: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    keywords: Joi.array().items(Joi.string()),
  }),
});

export const idSchema = Joi.object({
  tenantId: Joi.string()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .required(),
});

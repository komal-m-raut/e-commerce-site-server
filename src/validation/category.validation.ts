import Joi from 'joi';

export const addRootCategoryValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    slug: Joi.string().required(),
  }),
};

export const addMainCategoryValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    slug: Joi.string().required(),
    parentCategoryId: Joi.string().required(),
  }),
};

export const addChildCategoryValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    slug: Joi.string().required(),
    parentCategoryId: Joi.string().required(),
  }),
};

export const addVariantValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    value: Joi.string().required(),
    description: Joi.string(),
    slug: Joi.string().required(),
    applicableTo: Joi.array().items(Joi.string()),
    variantType: Joi.string().required(),
  }),
};

export const addAttributeValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    value: Joi.string().required(),
    description: Joi.string(),
    slug: Joi.string().required(),
    applicableTo: Joi.array().items(Joi.string()),
    attributeType: Joi.string().required(),
  }),
};

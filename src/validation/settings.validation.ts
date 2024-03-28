import Joi from 'joi';

export const createCareInstructionsSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export const updateCareInstructionsSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
});

export const createExchangeRefundSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  duration: Joi.number().required(),
});

export const updateExchangeRefundSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  duration: Joi.number(),
});

export const createFaqSchema = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
});

export const updateFaqSchema = Joi.object({
  question: Joi.string(),
  answer: Joi.string(),
});

export const createProductIncludesSchema = Joi.object({
  itemName: Joi.string().required(),
  dimensions: Joi.object({
    length: Joi.number().required(),
    width: Joi.number().required(),
    height: Joi.number().required(),
  }),
  weight: Joi.number().required(),
});

export const updateProductIncludesSchema = Joi.object({
  itemName: Joi.string(),
  dimensions: Joi.object({
    length: Joi.number(),
    width: Joi.number(),
    height: Joi.number(),
  }),
  weight: Joi.number(),
});

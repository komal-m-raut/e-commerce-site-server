import Joi from 'joi';

export const createApiKeySchema = Joi.object({
  tenant: Joi.string().required(),
  APIKey: Joi.string().required(),
  status: Joi.boolean(),
  validTill: Joi.date(),
});

export const updateApiKeySchema = Joi.object({
  tenant: Joi.string(),
  APIKey: Joi.string(),
  status: Joi.boolean(),
  validTill: Joi.date(),
});

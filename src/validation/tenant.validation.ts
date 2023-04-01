import Joi from "joi";

export const createTenantSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  companyId: Joi.string().required(),
});

export const updateTenantSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().allow('').optional(),
});

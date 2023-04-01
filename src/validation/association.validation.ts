import Joi from 'joi';

export const createAssociationSchema = Joi.object({
  user: Joi.string().required(),
  tenant: Joi.string().required(),
  approval: Joi.boolean().default(false),
});

export const updateAssociationSchema = Joi.object({
  approval: Joi.boolean().required(),
});

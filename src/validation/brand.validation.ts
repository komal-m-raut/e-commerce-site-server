import Joi from 'joi';
import { validateObjectId } from './common.validation';

export const createBrandSchema = Joi.object({
  brandName: Joi.string().required(),
  yearsOfOperation: Joi.number().required(),
  catalogueDetails: Joi.string().required(),
  brandLogo: Joi.string().required(),
  tradeMark: Joi.string().required(),
  manufactureName: Joi.string().required(),
  manufactureAddress: Joi.string().required(),
  manufactureContact: Joi.string().required(),
  packerAddressAndContact: Joi.string().required(),
  earthFriendly: Joi.string().required(),
  rootCategoryClassification: Joi.array().items(validateObjectId()).required(),
  mainCategoryClassification: Joi.array().items(validateObjectId()).required(),
  tenantId: validateObjectId().required(),
  userType: Joi.string().valid('tenant', 'supplier').required(),
  isDisabled: Joi.boolean(),
});

export const updateBrandSchema = Joi.object({
  brandName: Joi.string(),
  yearsOfOperation: Joi.number(),
  catalogueDetails: Joi.string(),
  brandLogo: Joi.string(),
  tradeMark: Joi.string(),
  manufactureName: Joi.string(),
  manufactureAddress: Joi.string(),
  manufactureContact: Joi.string(),
  packerAddress: Joi.string(),
  packerContact: Joi.string(),
  earthFriendly: Joi.string(),
  rootCategoryClassification: Joi.string(),
  mainCategoryClassification: Joi.string(),
});

import Joi from 'joi';
import { validateObjectId } from './common.validation';

export const createTenantBrandSchema = Joi.object({
  brandName: Joi.string().required(),
  yearsOfOperation: Joi.number(),
  catalogueDetails: Joi.string(),
  brandLogo: Joi.string(),
  tradeMark: Joi.string(),
  manufactureName: Joi.string().required(),
  manufactureAddress: Joi.string().required(),
  manufactureContact: Joi.string().required(),
  packerAddressAndContact: Joi.string(),
  earthFriendly: Joi.string(),
  rootCategoryClassification: Joi.array().items(validateObjectId()).required(),
  mainCategoryClassification: Joi.array().items(validateObjectId()).required(),
  companyId: validateObjectId().required(),
  isDisabled: Joi.boolean(),
});

export const updateTenantBrandSchema = Joi.object({
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

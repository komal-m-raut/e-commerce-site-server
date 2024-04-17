import Joi from 'joi';

export const createBrandSchema = Joi.object({
  brandName: Joi.string().required(),
  yearsOfOperation: Joi.number().required(),
  catalogueDetails: Joi.string().required(),
  brandLogo: Joi.string().required(),
  tradeMark: Joi.string().required(),
  manufactureName: Joi.string().required(),
  manufactureAddress: Joi.string().required(),
  manufactureContact: Joi.string().required(),
  packerAddress: Joi.string().required(),
  packerContact: Joi.string().required(),
  earthFriendly: Joi.string().required(),
  rootCategoryClassification: Joi.string().required(),
  mainCategoryClassification: Joi.string().required(),
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



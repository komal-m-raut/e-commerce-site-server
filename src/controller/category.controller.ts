
import catchAsync from '@src/utils/catchAsync';
import { BadRequestError } from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import { RootCategoryModel } from '@src/model/rootCategory.model';
import { MainCategoryModel } from '@src/model/mainCategory.model';
import { ChildCategoryModel } from '@src/model/childCategory.mode';
import { VariantModel } from '@src/model/variant.model';
import { AttributeModel } from '@src/model/attribute.model';

export const addRootCategory = catchAsync(async (req, res, next) => {
  const { name,  slug } = req.body;

  const existingCategory = await RootCategoryModel.findOne({ name, slug }).lean().exec();
  if (existingCategory) {
    throw next(new BadRequestError('Category with this name and slug already exists'));
  }

  const category = new RootCategoryModel(req.body);
  await category.save();

  return new SuccessResponse('Root category created successfully', {
    data: category,
  }).send(res);
});

export const addMainCategory = catchAsync(async (req, res, next) => {
  const { name,  slug, parentCategoryId } = req.body;

  const existingCategory = await MainCategoryModel.findOne({ name, slug, parentCategoryId }).lean().exec();
  if (existingCategory) {
    throw next(new BadRequestError('This main category already exists'));
  }

  const category = new MainCategoryModel(req.body);
  await category.save();

  return new SuccessResponse('Main category created successfully', {
    data: category,
  }).send(res);
});

export const addChildCategory = catchAsync(async (req, res, next) => {
  const { name, slug, parentCategoryId } = req.body;

  const existingCategory = await ChildCategoryModel.findOne({ name, slug, parentCategoryId }).lean().exec();
  if (existingCategory) {
    throw next(new BadRequestError('This child category already exists'));
  }

  const category = new ChildCategoryModel(req.body);
  await category.save();

  return new SuccessResponse('Child category created successfully', {
    data: category,
  }).send(res);
});

export const addVariant = catchAsync(async (req, res, next) => {
  const { name, value} = req.body;

  const existingVariant = await VariantModel.findOne({ name, value }).lean().exec();
  if (existingVariant) {
    throw next(new BadRequestError('Variant with this name and value already exists'));
  }

  const variant = new VariantModel(req.body);
  await variant.save();

  return new SuccessResponse('Variant created successfully', {
    data: variant,
  }).send(res);
});

export const addAttribute = catchAsync(async (req, res, next) => {
  const { name, value } = req.body;

  const existingAttribute = await AttributeModel.findOne({ name, value }).lean().exec();
  if (existingAttribute) {
    throw next(new BadRequestError('Attribute with this name and value already exists'));
  }

  const attribute = new AttributeModel(req.body);
  await attribute.save();

  return new SuccessResponse('Attribute created successfully', {
    data: attribute,
  }).send(res);
});

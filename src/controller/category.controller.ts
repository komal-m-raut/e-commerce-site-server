import catchAsync from '@src/utils/catchAsync';
import {
  BadRequestError,
  NoDataError,
  NotFoundError,
} from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import { RootCategoryModel } from '@src/model/rootCategory.model';
import { MainCategoryModel } from '@src/model/mainCategory.model';
import { ChildCategoryModel } from '@src/model/childCategory.mode';
import { VariantModel } from '@src/model/variant.model';
import { AttributeModel } from '@src/model/attribute.model';

export const addRootCategory = catchAsync(async (req, res, next) => {
  const { name, slug } = req.body;

  const existingCategory = await RootCategoryModel.findOne({ name, slug })
    .lean()
    .exec();
  if (existingCategory) {
    throw next(
      new BadRequestError('Category with this name and slug already exists'),
    );
  }

  const category = new RootCategoryModel(req.body);
  await category.save();

  return new SuccessResponse('Root category created successfully', {
    data: category,
  }).send(res);
});

export const addMainCategory = catchAsync(async (req, res, next) => {
  const { name, slug, parentCategoryIds } = req.body;

  const existingCategory = await MainCategoryModel.findOne({
    name,
    slug,
    parentCategoryIds,
  })
    .lean()
    .exec();
  if (existingCategory) {
    throw next(new BadRequestError('This main category already exists'));
  }
  const category = await MainCategoryModel.create(req.body);
  const updateRoot = await Promise.allSettled(
    parentCategoryIds.map((rootId: string) =>
      RootCategoryModel.findByIdAndUpdate(
        rootId,
        { $push: { children: category._id } },
        { new: true },
      ),
    ),
  );

  return new SuccessResponse('Main category created successfully', {
    category,
    updateRoot,
  }).send(res);
});

export const addChildCategory = catchAsync(async (req, res, next) => {
  const { name, slug, parentCategoryIds } = req.body;

  const existingCategory = await ChildCategoryModel.findOne({
    name,
    slug,
    parentCategoryIds,
  })
    .lean()
    .exec();
  if (existingCategory) {
    throw next(new BadRequestError('This child category already exists'));
  }

  const category = await ChildCategoryModel.create(req.body);
  const updateRoot = await Promise.allSettled(
    parentCategoryIds.map((rootId: string) =>
      MainCategoryModel.findByIdAndUpdate(
        rootId,
        { $push: { children: category._id } },
        { new: true },
      ),
    ),
  );

  return new SuccessResponse('Child category created successfully', {
    category,
    updateRoot,
  }).send(res);
});

export const addVariant = catchAsync(async (req, res, next) => {
  const { name, value } = req.body;

  const existingVariant = await VariantModel.findOne({ name, value })
    .lean()
    .exec();
  if (existingVariant) {
    throw next(
      new BadRequestError('Variant with this name and value already exists'),
    );
  }

  const variant = new VariantModel(req.body);
  await variant.save();

  return new SuccessResponse('Variant created successfully', {
    data: variant,
  }).send(res);
});

export const addAttribute = catchAsync(async (req, res, next) => {
  const { name, value } = req.body;

  const existingAttribute = await AttributeModel.findOne({ name, value })
    .lean()
    .exec();
  if (existingAttribute) {
    throw next(
      new BadRequestError('Attribute with this name and value already exists'),
    );
  }

  const attribute = new AttributeModel(req.body);
  await attribute.save();

  return new SuccessResponse('Attribute created successfully', {
    data: attribute,
  }).send(res);
});

export const getRootCategories = catchAsync(async (req, res, next) => {
  const rootCategories = await RootCategoryModel.find().lean().exec();
  if (!rootCategories) {
    throw next(new NoDataError('Unable to get root categories'));
  }
  return new SuccessResponse('success', rootCategories).send(res);
  // const mainCategories = await ChildCategoryModel.find().lean().exec();
  // const update = await Promise.allSettled(
  //   mainCategories.map((main) =>
  //     ChildCategoryModel.findByIdAndUpdate(
  //       main._id,
  //       {
  //         parentCategoryIds: main.parentCategoryId,
  //         $unset: { parentCategoryId: 1 },
  //       },
  //       { new: true },
  //     ),
  //   ),
  // );
  // return new SuccessResponse('Updated', update).send(res);
});

export const getMainCategories = catchAsync(async (req, res, next) => {
  const { rootId } = req.params;
  const query: { [key: string]: string } = {};
  if (rootId) {
    query.parentCategoryIds = rootId;
  }
  const mainCategory = await MainCategoryModel.find(query).lean().exec();

  if (rootId && mainCategory.length === 0) {
    throw next(
      new NotFoundError(`No main category for ${rootId} as root category`),
    );
  }

  if (!mainCategory) {
    throw next(new NoDataError('Unable to get main categories'));
  }

  return new SuccessResponse('success', mainCategory).send(res);
});

export const getChildCategories = catchAsync(async (req, res, next) => {
  const { mainId } = req.params;
  const query: { [key: string]: string } = {};
  if (mainId) {
    query.parentCategoryIds = mainId;
  }
  const childCategory = await ChildCategoryModel.find(query).lean().exec();

  if (mainId && !childCategory) {
    throw next(
      new NotFoundError(`No child category for ${mainId} as main category`),
    );
  }

  if (!childCategory) {
    throw next(new NoDataError('Unable to get child categories'));
  }

  return new SuccessResponse('success', childCategory).send(res);
});

export const getVariants = catchAsync(async (req, res, next) => {
  const { childId } = req.params;
  const query: { [key: string]: string } = {};
  if (childId) {
    query.applicableTo = childId;
  }
  const variants = await VariantModel.find(query).lean().exec();

  if (childId && !variants) {
    throw next(
      new NotFoundError(`No variant for ${childId} as child category`),
    );
  }

  if (!variants) {
    throw next(new NoDataError('Unable to get variants'));
  }

  return new SuccessResponse('success', variants).send(res);
});

export const getAttributes = catchAsync(async (req, res, next) => {
  const { childId } = req.params;
  const query: { [key: string]: string } = {};
  if (childId) {
    query.applicableTo = childId;
  }
  const attributes = await AttributeModel.find(query).lean().exec();

  if (childId && !attributes) {
    throw next(
      new NotFoundError(`No attribute for ${childId} as child category`),
    );
  }

  if (!attributes) {
    throw next(new NoDataError('Unable to get attributes'));
  }

  return new SuccessResponse('success', attributes).send(res);
});

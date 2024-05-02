import {
  ITenantProduct,
  TenantProductModel,
} from '@src/model/tenantProduct.model';
import {
  BadRequestError,
  InternalError,
  NotFoundError,
} from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';
import { FilterQuery } from 'mongoose';

// Get all products
export const getAllTenantProducts = catchAsync(async (req, res, next) => {
  const itemsPerPage = Number(req.params.itemsPerPage) || 10;
  const pageCount = Number(req.params.pageCount) || 1;
  const skipCount = itemsPerPage * (pageCount - 1);
  const totalProducts = await TenantProductModel.countDocuments().exec();

  const products = await TenantProductModel.find()
    .skip(skipCount)
    .limit(itemsPerPage)
    .lean()
    .exec();

  if (!products || products.length === 0) {
    throw next(new NotFoundError('No product found'));
  }

  return new SuccessResponse('success', {
    products,
    currentPage: pageCount,
    totalProducts,
  }).send(res);
});

//Get single product
export const getTenantProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await TenantProductModel.findById(id).lean().exec();

  if (!product) {
    throw next(new NotFoundError(`Product with id ${id} not found`));
  }

  return new SuccessResponse('success', product).send(res);
});

//Create Tenant product

export const createTenantProduct = catchAsync(async (req, res, next) => {
  const { decoded, productName } = req.body;

  const tenantId = decoded.id;
  const existingProduct = await TenantProductModel.findOne({
    'generalDetails.productName': productName,
    'generalDetails.tenantId': tenantId,
  })
    .lean()
    .exec();

  if (existingProduct) {
    throw next(
      new BadRequestError(
        `Product with name ${productName} and tenant ${tenantId} already exists`,
      ),
    );
  }

  // Create product

  const newProduct = await TenantProductModel.create({
    generalDetails: { ...req.body, tenantId: tenantId },
  });

  if (!newProduct) {
    throw next(new InternalError('Failed to create tenant product'));
  }

  // Send response
  return new SuccessResponse('Tenant Product created', newProduct).send(res);
});

// Update tenant product

export const updateTenantProduct = catchAsync(async (req, res, next) => {
  const updates = req.body;
  const productId = req.params.id;

  // Determine the path from the URL
  let path;
  let updateObject: { [key: string]: any } = {};
  const urlSegments = req.originalUrl.split('/');
  const lastSegment = urlSegments[urlSegments.length - 2];

  switch (lastSegment) {
    case 'general-details':
      path = 'generalDetails';
      break;
    case 'identifiers':
      path = 'productIdentifiers';
      break;
    case 'description':
      path = 'productDescription';
      break;
    case 'instructions':
      path = 'instructions';
      break;
    case 'groups':
      path = 'groups';
      break;
    case 'inventory':
      path = 'inventory';
      break;
    case 'gift-wrapping':
      path = 'giftWrapping';
      break;
    case 'update-product':
      updateObject = updates;
      break;
    default:
      throw next(new Error('Invalid path'));
  }
  console.log('path', path);
  if (path) {
    updateObject[path] = updates;
  }

  // Find the product and update it
  const product = await TenantProductModel.findByIdAndUpdate(
    productId,
    updateObject,
    {
      new: true,
      runValidators: true,
    },
  )
    .lean()
    .exec();

  if (!product) {
    throw next(new NotFoundError('Product not found'));
  }

  return new SuccessResponse('Product updated successfully', product).send(res);
});

//* Tenant controller

export const searchTenantProduct = catchAsync(async (req, res, next) => {
  const { search } = req.query;
  const products = await TenantProductModel.find({
    $or: [
      { 'generalDetails.productName': { $regex: search, $options: 'i' } },
      { 'description.short': { $regex: search, $options: 'i' } },
      { 'description.long': { $regex: search, $options: 'i' } },
    ],
  })
    .lean()
    .exec();
  if (!products) {
    throw next(
      new NotFoundError(
        `Products with ${search} name / description is not available`,
      ),
    );
  }
  return new SuccessResponse('Products found', products).send(res);
});

//test filtered products api once
export const filteredTenantProducts = catchAsync(async (req, res, next) => {
  const { category, manufacturer, minPrice, maxPrice, variants, attributes } =
    req.query;
  const query: FilterQuery<ITenantProduct> = {};

  if (category) {
    query['category.childCategory'] = category as string;
  }

  if (manufacturer) {
    query['supplier.manufacturer'] = manufacturer as string;
  }

  if (minPrice || maxPrice) {
    query['productIdentifiers.sku.price'] = {};

    if (minPrice) {
      query['productIdentifiers.skuId.RetailPricingSchema.sellingPrice'].$gte =
        parseFloat(minPrice as string);
    }

    if (maxPrice) {
      query['productIdentifiers.skuId.RetailPricingSchema.sellingPrice'].$lte =
        parseFloat(maxPrice as string);
    }
  }

  if (variants) {
    query['productIdentifiers.skuId.variant'] = { $in: variants as string[] };
  }

  if (attributes) {
    query['basicDetails.attributes'] = { $in: attributes as string[] };
  }

  const products = await TenantProductModel.find(query).lean().exec();
  if (!products) {
    throw next(new NotFoundError(`Failed while fetching products`));
  }
  return new SuccessResponse('Products found', products).send(res);
});

export const searchAndFilterTenantProducts = catchAsync(
  async (req, res, next) => {
    const {
      search,
      category,
      manufacturer,
      minPrice,
      maxPrice,
      variants,
      attributes,
    } = req.query;

    const query: FilterQuery<ITenantProduct> = {
      $or: [
        { 'generalDetails.productName': { $regex: search, $options: 'i' } },
        { 'description.short': { $regex: search, $options: 'i' } },
        { 'description.long': { $regex: search, $options: 'i' } },
      ],
    };

    if (category) {
      query['category.childCategory'] = category as string;
    }

    if (manufacturer) {
      query['supplier.manufacturer'] = manufacturer as string;
    }

    if (minPrice || maxPrice) {
      query['productIdentifiers.sku.price'] = {};

      if (minPrice) {
        query[
          'productIdentifiers.skuId.RetailPricingSchema.sellingPrice'
        ].$gte = parseFloat(minPrice as string);
      }

      if (maxPrice) {
        query[
          'productIdentifiers.skuId.RetailPricingSchema.sellingPrice'
        ].$lte = parseFloat(maxPrice as string);
      }
    }

    if (variants) {
      query['productIdentifiers.skuId.variant'] = { $in: variants as string[] };
    }

    if (attributes) {
      query['basicDetails.attributes'] = { $in: attributes as string[] };
    }

    const products = await TenantProductModel.find(query).lean().exec();

    if (!products.length) {
      throw next(
        new NotFoundError(
          `No products found for the given search and filter criteria`,
        ),
      );
    }

    return new SuccessResponse('Products found', products).send(res);
  },
);

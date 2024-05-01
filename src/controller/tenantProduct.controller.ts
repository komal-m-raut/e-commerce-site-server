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
  const { decoded, productName, brandName } = req.body;

  const existingProduct = await TenantProductModel.findOne({
    'generalDetails.productName': productName,
    'generalDetails.brandName': brandName,
  })
    .lean()
    .exec();

  if (existingProduct) {
    throw next(
      new BadRequestError(
        `Product with name ${productName} and brand ${brandName} already exists`,
      ),
    );
  }

  // Create product
  const tenantId = decoded.id;

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

  //TODO:Optimize this code
  // Determine the path from the URL
  let path;
  let updateObject: { [key: string]: any } = {};
  if (req.originalUrl.includes('product-general-details')) {
    path = 'generalDetails';
    updateObject[path] = updates;
  } else if (req.originalUrl.includes('product-identifiers')) {
    path = 'productIdentifiers';
    updateObject[path] = updates;
  } else if (req.originalUrl.includes('product-description')) {
    path = 'productDescription';
    updateObject[path] = updates;
  } else if (req.originalUrl.includes('product-instruction')) {
    path = 'instruction';
    updateObject[path] = updates;
  } else if (req.originalUrl.includes('product-visibility')) {
    path = 'visibility';
    updateObject[path] = updates;
  } else if (req.originalUrl.includes('product-groups')) {
    path = 'groups';
    updateObject[path] = updates;
  } else if (req.originalUrl.includes('product-inventory')) {
    path = 'inventory';
    updateObject[path] = updates;
  } else if (req.originalUrl.includes('product-gift-wrapping')) {
    path = 'giftWrapping';
    updateObject[path] = updates;
  } else if (req.originalUrl.includes('/update-product')) {
    updateObject = updates;
  } else {
    throw next(new Error('Invalid path'));
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

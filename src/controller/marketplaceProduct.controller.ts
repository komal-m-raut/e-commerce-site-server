import { IMarketplaceProduct, MarketplaceProductModel } from '@src/model/marketplaceProduct.model';
import { InternalError, NotFoundError } from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';
import { FilterQuery } from 'mongoose';

// Get all products
export const getAllMarketPlaceProducts = catchAsync(async (req, res, next) => {
  const itemsPerPage = Number(req.params.itemsPerPage) || 10;
  const pageCount = Number(req.params.pageCount) || 1;
  const skipCount = itemsPerPage * (pageCount - 1);
  const totalProducts = await MarketplaceProductModel.countDocuments().exec();

  const products = await MarketplaceProductModel.find()
    .skip(skipCount)
    .limit(itemsPerPage)
    .lean()
    .exec();

  if (!products || products.length === 0) {
    throw next(new NotFoundError('No product found'));
  }

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return new SuccessResponse('success', {
    products,
    totalPages,
    currentPage: pageCount,
    totalProducts,
  }).send(res);
});

//Get single product
export const getMarketPlaceProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await MarketplaceProductModel.findById(id).lean().exec();

  if (!product) {
    throw next(new NotFoundError(`Product with id ${id} not found`));
  }

  return new SuccessResponse('success', product).send(res);
});

//Create product

export const createMarketPlaceProduct = catchAsync(async (req, res, next) => {
  const { decoded } = req.body;

  // Create product
  const supplierId = decoded.id;
  const newProduct = await MarketplaceProductModel.create({
    generalDetails: { ...req.body.generalDetails, supplier: supplierId },
  });

  if (!newProduct) {
    throw next(new InternalError('Failed to create product'));
  }
  // Send response
  return new SuccessResponse('Product created', newProduct).send(res);
});

// Update product
export const updateMarketPlaceProduct = catchAsync(async (req, res, next) => {
  const { decoded } = req.body;
  const { productId } = req.params;
  const supplier = decoded.id;
  const updateProduct = await MarketplaceProductModel.findOneAndUpdate(
    { supplier, productId },
    req.body,
    {
      new: true,
    },
  )
    .lean()
    .exec();

  if (!updateProduct) {
    throw next(
      new NotFoundError(
        `Supplier (${supplier}) haven't created product with ${productId}`,
      ),
    );
  }

  return new SuccessResponse('success', updateProduct).send(res);
});

//* Marketplace controller

export const searchMarketPlaceProduct = catchAsync(async (req, res, next) => {
  const { search } = req.query;
  const products = await MarketplaceProductModel.find({
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
export const filteredMarketPlaceProducts = catchAsync(async (req, res, next) => {
  const { category, manufacturer, minPrice, maxPrice, variants, attributes } =
    req.query;
  const query: FilterQuery<IMarketplaceProduct> = {};

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

  const products = await MarketplaceProductModel.find(query).lean().exec();
  if (!products) {
    throw next(new NotFoundError(`Failed while fetching products`));
  }
  return new SuccessResponse('Products found', products).send(res);
});

export const searchAndFilterMarketPlaceProducts = catchAsync(async (req, res, next) => {
  const {
    search,
    category,
    manufacturer,
    minPrice,
    maxPrice,
    variants,
    attributes,
  } = req.query;

  const query: FilterQuery<IMarketplaceProduct> = {
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

  const products = await MarketplaceProductModel.find(query).lean().exec();

  if (!products.length) {
    throw next(
      new NotFoundError(
        `No products found for the given search and filter criteria`,
      ),
    );
  }

  return new SuccessResponse('Products found', products).send(res);
});

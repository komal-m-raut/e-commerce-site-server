import { IProduct, ProductModel } from '@src/model/product.model';
import { ISKU, SKUModel } from '@src/model/sku.model';
import { NotFoundError } from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';
import { FilterQuery } from 'mongoose';

// Get all products
export const getAllProducts = catchAsync(async (req, res, next) => {
  const itemsPerPage = Number(req.params.itemsPerPage) || 10;
  const pageCount = Number(req.params.pageCount) || 1;
  const skipCount = itemsPerPage * (pageCount - 1);
  const totalProducts = await ProductModel.countDocuments().exec();

  const products = await ProductModel.find()
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
export const getProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await ProductModel.findById(id).lean().exec();

  if (!product) {
    throw next(new NotFoundError(`Product with id ${id} not found`));
  }

  return new SuccessResponse('success', product).send(res);
});

//Create product

export const createProduct = catchAsync(async (req, res, next) => {
  const { decoded, SKUs } = req.body;

  // Create SKUs
  const createdSKUs = (await SKUModel.create(SKUs)) as unknown as ISKU[];
  const skuIds: string[] = createdSKUs.map((sku) => sku._id);

  // Create product
  const supplierId = decoded.id;
  const supplier = {
    language: req.body.language,
    manufacturer: req.body.manufacturer,
    supplier: supplierId,
    countryOfOrigin: req.body.countryOfOrigin,
    location: req.body.location,
  };
  const basicDetails = {
    productId: req.body.productId,
    productName: req.body.productName,
    marketplace: req.body.marketplace,
    urlKey: req.body.urlKey,
    shortDescription: req.body.shortDescription,
    longDescription: req.body.longDescription,
    rootCategory: req.body.rootCategory,
    mainCategory: req.body.mainCategory,
    childCategory: req.body.childCategory,
    attributes: req.body.attributes,
  };
  const visibility = {
    editorsChoice: req.body.editorsChoice,
    guestCheckout: req.body.guestCheckout,
  };
  const newProduct = await ProductModel.create({
    supplier,
    basicDetails,
    visibility,
    sku: skuIds,
  });

  // Send response
  return new SuccessResponse('Product created', newProduct).send(res);
});

// Update product
export const updateTenant = catchAsync(async (req, res, next) => {
  const { decoded } = req.body;
  const { productId } = req.params;
  const supplier = decoded.id;
  const updateProduct = await ProductModel.findOneAndUpdate(
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

export const searchProduct = catchAsync(async (req, res, next) => {
  const { search } = req.query;
  const products = await ProductModel.find({
    $or: [
      { productName: { $regex: search, $options: 'i' } },
      { shortDescription: { $regex: search, $options: 'i' } },
      { longDescription: { $regex: search, $options: 'i' } },
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

export const filteredProducts = catchAsync(async (req, res, next) => {
  const { category, manufacturer, minPrice, maxPrice, variants, attributes } =
    req.query;
  const query: FilterQuery<IProduct> = {};

  if (category) {
    query['basicDetails.childCategory'] = category as string;
  }

  if (manufacturer) {
    query['supplier.manufacturer'] = manufacturer as string;
  }

  if (minPrice || maxPrice) {
    query['sku.price'] = {};

    if (minPrice) {
      query['sku.price'].$gte = parseFloat(minPrice as string);
    }

    if (maxPrice) {
      query['sku.price'].$lte = parseFloat(maxPrice as string);
    }
  }

  if (variants) {
    query['sku.variant'] = { $in: variants as string[] };
  }

  if (attributes) {
    query['basicDetails.attributes'] = { $in: attributes as string[] };
  }

  const products = await ProductModel.find(query).lean().exec();
  if (!products) {
    throw next(new NotFoundError(`Failed while fetching products`));
  }
  return new SuccessResponse('Products found', products).send(res);
});

export const searchAndFilterProducts = catchAsync(async (req, res, next) => {
  const {
    search,
    category,
    manufacturer,
    minPrice,
    maxPrice,
    variants,
    attributes,
  } = req.query;

  const query: FilterQuery<IProduct> = {
    $or: [
      { productName: { $regex: search, $options: 'i' } },
      { shortDescription: { $regex: search, $options: 'i' } },
      { longDescription: { $regex: search, $options: 'i' } },
    ],
  };

  if (category) {
    query['basicDetails.childCategory'] = category as string;
  }

  if (manufacturer) {
    query['supplier.manufacturer'] = manufacturer as string;
  }

  if (minPrice || maxPrice) {
    query['sku.price'] = {};

    if (minPrice) {
      query['sku.price'].$gte = parseFloat(minPrice as string);
    }

    if (maxPrice) {
      query['sku.price'].$lte = parseFloat(maxPrice as string);
    }
  }

  if (variants) {
    query['sku.variant'] = { $in: variants as string[] };
  }

  if (attributes) {
    query['basicDetails.attributes'] = { $in: attributes as string[] };
  }

  const products = await ProductModel.find(query).lean().exec();

  if (!products.length) {
    throw next(
      new NotFoundError(
        `No products found for the given search and filter criteria`,
      ),
    );
  }

  return new SuccessResponse('Products found', products).send(res);
});

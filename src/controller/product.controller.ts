import { ProductModel } from '@src/model/product.model';
import { ISKU, SKUModel } from '@src/model/sku.model';
import { InternalError, NotFoundError } from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';

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

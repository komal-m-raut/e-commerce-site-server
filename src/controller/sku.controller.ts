import { ProductModel } from '@src/model/product.model';
import { SKUModel } from '@src/model/sub-product/sku.model';
import { NotFoundError } from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';

export const updateProductVisibility = catchAsync(async (req, res, next) => {
  const { decoded } = req.body;
  const { productId } = req.params;
  const supplier = decoded.id;
  const product = await ProductModel.findOne(
    {
      _id: productId,
      'generalDetails.supplier': supplier,
    },
    { 'productIdentifiers.skuId': 1 },
  ).exec();

  if (!product) {
    throw next(new NotFoundError('Product not found'));
  }
  const updatedSku = await SKUModel.updateMany(
    {
      _id: {
        $in: product.productIdentifiers.map((identifier) => identifier.skuId),
      },
    },
    { $set: { visibility: req.body } },
  ).exec();

  if (!updatedSku) {
    throw next(new NotFoundError('Failed to update product visibility'));
  }

  return new SuccessResponse('Product visibility updated', updatedSku).send(
    res,
  );
});

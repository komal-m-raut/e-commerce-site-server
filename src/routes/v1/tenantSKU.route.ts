import { createTenantSku } from '@src/controller/tenantSKU.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import { productIdSchema } from '@src/validation/common.validation';
import { createTenantSkuSchema } from '@src/validation/tenantSKU.validation';

import { Router } from 'express';

const tenantSkuRouter = Router();

//*POST ROUTE

/**
 * @swagger
 * /v1/tenant/sku/create/{productId}:
 *   post:
 *     tags:
 *       - "Tenant-SKU"
 *     summary: "Create a new SKU"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: "Product ID"
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createTenantSkuSchema'
 *     responses:
 *       200:
 *         description: "SKU created successfully"
 *       400:
 *         description: "Invalid request body"
 *       404:
 *         description: "Product not found"
 *       500:
 *         description: "Failed to create SKU"
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     createTenantSkuSchema:
 *       type: object
 *       required:
 *         - variants
 *       properties:
 *         variants:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - images
 *               - retailPricing
 *               - b2bPricing
 *               - variant
 *               - productIdentifier
 *             properties:
 *               images:
 *                 $ref: '#/components/schemas/Images'
 *               retailPricing:
 *                 $ref: '#/components/schemas/RetailPricing'
 *               b2bPricing:
 *                 $ref: '#/components/schemas/B2BPricing'
 *               visibility:
 *                 $ref: '#/components/schemas/Visibility'
 *               variant:
 *                 type: object
 *                 required:
 *                   - name
 *                   - value
 *                   - applicableTo
 *                 properties:
 *                   name:
 *                     type: string
 *                   value:
 *                     type: array
 *                     items:
 *                       type: string
 *                   applicableTo:
 *                     type: array
 *                     items:
 *                       type: string
 *               productIdentifier:
 *                 type: object
 *                 required:
 *                   - barcode
 *                   - hsnNo
 *                   - manufacturerPartNumber
 *                   - binPickingNumber
 *                   - globalTradeItemNumber
 *                   - searchKeywords
 *                 properties:
 *                   barcode:
 *                     type: string
 *                   hsnNo:
 *                     type: string
 *                   manufacturerPartNumber:
 *                     type: string
 *                   binPickingNumber:
 *                     type: string
 *                   globalTradeItemNumber:
 *                     type: string
 *                   searchKeywords:
 *                     type: array
 *                     items:
 *                       type: string
 */
tenantSkuRouter.post(
  '/create/:productId',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: createTenantSkuSchema, params: productIdSchema }),
  createTenantSku,
);

//*PATCH ROUTE

// tenantSkuRouter.patch(
//   '/update-product-visibility/:productId',
//   validate({ body: tenantSkuVisibilitySchema, params: productIdSchema }),
//   updateTenantProductVisibility,
// );

export default tenantSkuRouter;

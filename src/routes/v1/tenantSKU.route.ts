import { createTenantSku, updateTenantProductVisibility } from '@src/controller/tenantSKU.controller';
import validate from '@src/middleware/validate';
import { productIdSchema } from '@src/validation/common.validation';
import { createTenantSkuSchema, tenantSkuVisibilitySchema } from '@src/validation/tenantSKU.validation';

import { Router } from 'express';

const tenantSkuRouter = Router();

//*POST ROUTE

/**
 * @swagger
 * /v1/tenant-sku/create/{productId}:
 *  post:
 *    tags:
 *      - "Tenant-SKU"
 *    summary: "Create a new SKU"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - variants
 *            properties:
 *              variants:
 *                type: array
 *                items:
 *                  type: object
 *                  required:
 *                    - images
 *                    - retailPricing
 *                    - b2bPricing
 *                    - variant
 *                    - productIdentifier
 *                  properties:
 *                    images:
 *                      $ref: '#/components/schemas/Images'
 *                    retailPricing:
 *                      $ref: '#/components/schemas/RetailPricing'
 *                    b2bPricing:
 *                      $ref: '#/components/schemas/B2BPricing'
 *                    visibility:
 *                      $ref: '#/components/schemas/Visibility'
 *                    variant:
 *                      type: object
 *                      required:
 *                        - name
 *                        - value
 *                        - applicableTo
 *                      properties:
 *                        name:
 *                          type: string
 *                        value:
 *                          type: array
 *                          items:
 *                            type: string
 *                        applicableTo:
 *                          type: array
 *                          items:
 *                            type: string
 *                    productIdentifier:
 *                      type: object
 *                      required:
 *                        - barcode
 *                        - hsnNo
 *                        - manufacturerPartNumber
 *                        - binPickingNumber
 *                        - globalTradeItemNumber
 *                        - searchKeywords
 *                      properties:
 *                        barcode:
 *                          type: string
 *                        hsnNo:
 *                          type: string
 *                        manufacturerPartNumber:
 *                          type: string
 *                        binPickingNumber:
 *                          type: string
 *                        globalTradeItemNumber:
 *                          type: string
 *                        searchKeywords:
 *                          type: array
 *                          items:
 *                            type: string
 */

tenantSkuRouter.post(
  '/create/:productId',
  validate({ body: createTenantSkuSchema, params: productIdSchema }),
  createTenantSku,
);

//*PATCH ROUTE

/**
 * @swagger
 * /v1/tenant-sku/update-product-visibility/{productId}:
 *  patch:
 *    tags:
 *      - "Tenant-SKU"
 *    summary: "Update product visibility"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - guestCheckout
 *              - privateGroup
 *            properties:
 *              guestCheckout:
 *                $ref: '#/components/schemas/Visibility'
 *              privateGroup:
 *                $ref: '#/components/schemas/Visibility'
 * components:
 *   schemas:
 *     Visibility:
 *       type: object
 *       properties:
 *         isEditorsChoice:
 *           type: boolean
 *         isTrendingNow:
 *           type: boolean
 *         isNewArrival:
 *           type: boolean
 *         isProductRecommendation:
 *           type: boolean
 *         isBestSeller:
 *           type: boolean
 *         isBrandAtSlashedPrice:
 *           type: boolean
 *         isMostLoved:
 *           type: boolean
 *         isFeatured:
 *           type: boolean
 *         isOnOurRadar:
 *           type: boolean
 *         isTopPick:
 *           type: boolean
 *         isDealOfTheDay:
 *           type: boolean
 *         isSpecialOffer:
 *           type: boolean
 *         isBudgetPicks:
 *           type: boolean
 *         isYourWardrobeMustHave:
 *           type: boolean
 */

tenantSkuRouter.patch(
  '/update-product-visibility/:productId',
  validate({ body: tenantSkuVisibilitySchema, params: productIdSchema }),
  updateTenantProductVisibility,
);

export default tenantSkuRouter;

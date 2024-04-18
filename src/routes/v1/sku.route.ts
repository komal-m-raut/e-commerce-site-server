import {
  createSku,
  updateProductVisibility,
} from '@src/controller/sku.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import { productIdSchema } from '@src/validation/common.validation';
import {
  createSkuSchema,
  visibilitySchema,
} from '@src/validation/sku.validation';
import { Router } from 'express';

const skuRouter = Router();

//*POST ROUTE

/**
 * @swagger
 * /v1/sku/create/{productId}:
 *  post:
 *    tags:
 *      - "SKU"
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

skuRouter.post(
  '/create/:productId',
  validate({ body: createSkuSchema, params: productIdSchema }),
  createSku,
);

//*PATCH ROUTE

/**
 * @swagger
 * /v1/sku/update-product-visibility/{productId}:
 *  patch:
 *    tags:
 *      - "SKU"
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

skuRouter.patch(
  '/update-product-visibility/:productId',
  validate({ body: visibilitySchema, params: productIdSchema }),
  updateProductVisibility,
);

export default skuRouter;

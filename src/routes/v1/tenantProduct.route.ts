import {
  createTenantProduct,
  filteredTenantProducts,
  getAllTenantProducts,
  getTenantProduct,
  searchAndFilterTenantProducts,
  searchTenantProduct,
  updateTenantProduct,
} from '@src/controller/tenantProduct.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import { idSchema } from '@src/validation/common.validation';
import {
  GeneralDetailsValidationSchema,
  GiftWrappingOptionsSchema,
  GroupsSchema,
  InstructionSchema,
  InventorySchema,
  ProductDescriptionSchema,
  ProductIdentifiersJoiSchema,
  VisibilitySchema,
  filterTenantProductSchema,
  searchAndFilterTenantProductSchema,
  searchTenantProductSchema,
} from '@src/validation/tenantProduct.validation';
import { Router } from 'express';

const tenantProductRouter: Router = Router();

//*POST ROUTE

/**
 * @swagger
 * /v1/tenant/product/create:
 *   post:
 *     tags:
 *       - "Tenant Product"
 *     summary: "Create a new product"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tenantId
 *               - productId
 *               - sellerName
 *               - countryOfOrigin
 *               - importerName
 *               - brandName
 *               - productName
 *               - categoryDetails
 *               - attributeDetails
 *               - manufacturerName
 *               - manufacturerContact
 *               - hsnNo
 *             properties:
 *               tenantId:
 *                 type: string
 *               status:
 *                 type: string
 *               productId:
 *                 type: string
 *               sellerName:
 *                 type: string
 *               language:
 *                 type: string
 *               countryOfOrigin:
 *                 type: string
 *               importerName:
 *                 type: string
 *               brandName:
 *                 type: string
 *               productName:
 *                 type: string
 *               categoryDetails:
 *                 type: object
 *                 properties:
 *                   rootCategory:
 *                     type: string
 *                   mainCategory:
 *                     type: string
 *                   childCategory:
 *                     type: string
 *               attributeDetails:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   value:
 *                     type: string
 *                   slug:
 *                     type: string
 *                   applicableTo:
 *                     type: array
 *                     items:
 *                       type: string
 *               manufacturerName:
 *                 type: string
 *               manufacturerContact:
 *                 type: string
 *               hsnNo:
 *                 type: string
 *               manufacturerPartNo:
 *                 type: string
 *               globalTradeItemNo:
 *                 type: string
 *               searchKeywords:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: "Product created successfully"
 *       400:
 *         description: "Product with this name and brand already exists"
 *       500:
 *         description: "Failed to create product"
 */

tenantProductRouter.post(
  '/create',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: GeneralDetailsValidationSchema }),
  createTenantProduct,
);

// * PATCH ROUTE
/**
 * @swagger
 * /v1/tenant/product/general-details/{id}:
 *   patch:
 *     tags:
 *       - "Tenant Product"
 *     summary: "Update general details of a product"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
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
 *             type: object
 *             required:
 *               - tenantId
 *               - productId
 *               - sellerName
 *               - countryOfOrigin
 *               - importerName
 *               - brandName
 *               - productName
 *               - categoryDetails
 *               - attributeDetails
 *               - manufacturerName
 *               - manufacturerContact
 *               - hsnNo
 *             properties:
 *               tenantId:
 *                 type: string
 *               status:
 *                 type: string
 *               productId:
 *                 type: string
 *               sellerName:
 *                 type: string
 *               language:
 *                 type: string
 *               countryOfOrigin:
 *                 type: string
 *               importerName:
 *                 type: string
 *               brandName:
 *                 type: string
 *               productName:
 *                 type: string
 *               categoryDetails:
 *                 type: object
 *                 properties:
 *                   rootCategory:
 *                     type: string
 *                   mainCategory:
 *                     type: string
 *                   childCategory:
 *                     type: string
 *               attributeDetails:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   value:
 *                     type: string
 *                   slug:
 *                     type: string
 *                   applicableTo:
 *                     type: array
 *                     items:
 *                       type: string
 *               manufacturerName:
 *                 type: string
 *               manufacturerContact:
 *                 type: string
 *               hsnNo:
 *                 type: string
 *               manufacturerPartNo:
 *                 type: string
 *               globalTradeItemNo:
 *                 type: string
 *               searchKeywords:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: "Product updated successfully"
 *       400:
 *         description: "Product with this name and brand already exists"
 *       500:
 *         description: "Failed to update product"
 */

tenantProductRouter.patch(
  '/general-details/:id',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: GeneralDetailsValidationSchema, params: idSchema }),
  updateTenantProduct,
);

/**
 * @swagger
 * /v1/tenant/product/identifiers/{id}:
 *   patch:
 *     tags:
 *       - "Tenant Product"
 *     summary: "Update product identifiers"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
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
 *             type: object
 *             required:
 *               - shelfNumber
 *               - influencerDetails
 *             properties:
 *               shelfNumber:
 *                 type: number
 *               influencerDetails:
 *                 type: object
 *                 required:
 *                   - isReselling
 *                   - commissionReceivedByInfluencer
 *                 properties:
 *                   isReselling:
 *                     type: boolean
 *                   resellerPrice:
 *                     type: number
 *                   cost:
 *                     type: number
 *                   commissionType:
 *                     type: string
 *                     enum:
 *                       - Flat
 *                       - Percentage
 *                   flatCommission:
 *                     type: number
 *                   percentageCommission:
 *                     type: number
 *                   commissionReceivedByInfluencer:
 *                     type: number
 *     responses:
 *       200:
 *         description: "Product identifiers updated successfully"
 *       400:
 *         description: "Invalid request body"
 *       404:
 *         description: "Product not found"
 *       500:
 *         description: "Failed to update product identifiers"
 */

tenantProductRouter.patch(
  '/identifiers/:id',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: ProductIdentifiersJoiSchema, params: idSchema }),
  updateTenantProduct,
);
/**
 * @swagger
 * /v1/tenant/product/description/{id}:
 *   patch:
 *     tags:
 *       - "Tenant Product"
 *     summary: "Update product description"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: "Product ID"
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shortDescription:
 *                 type: string
 *                 description: "Short description of the product"
 *               longDescription:
 *                 type: string
 *                 description: "Long description of the product"
 *               metaTitle:
 *                 type: string
 *                 description: "Meta title for the product"
 *               metaDescription:
 *                 type: string
 *                 description: "Meta description for the product"
 *               metaKeywords:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array of meta keywords for the product"
 *     responses:
 *       200:
 *         description: "Product description updated successfully"
 *       400:
 *         description: "Invalid request body"
 *       404:
 *         description: "Product not found"
 *       500:
 *         description: "Failed to update product description"
 */

tenantProductRouter.patch(
  '/description/:id',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: ProductDescriptionSchema, params: idSchema }),
  updateTenantProduct,
);

/**
 * @swagger
 * /v1/tenant/product/instructions/{id}:
 *   patch:
 *     tags:
 *       - "Tenant Product"
 *     summary: "Update product instructions"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
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
 *             type: object
 *             properties:
 *               isEssential:
 *                 type: boolean
 *                 description: "Whether the product is essential"
 *               isFragile:
 *                 type: boolean
 *                 description: "Whether the product is fragile"
 *               careInstructions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array of care instructions for the product"
 *               sizeChart:
 *                 type: string
 *                 description: "Size chart for the product"
 *               condition:
 *                 type: string
 *                 description: "Condition of the product"
 *               returnAvailable:
 *                 type: boolean
 *                 description: "Whether return is available for the product"
 *               returnDuration:
 *                 type: string
 *                 description: "Return duration for the product"
 *               warranty:
 *                 type: string
 *                 description: "Warranty information for the product"
 *               isAvailableOnline:
 *                 type: boolean
 *                 description: "Whether the product is available online"
 *               questionAndAnswers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                     answer:
 *                       type: string
 *                 description: "Array of questions and answers for the product"
 *               customFields:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     fieldName:
 *                       type: string
 *                     value:
 *                       type: string
 *                 description: "Array of custom fields for the product"
 *               selectMessage:
 *                 type: string
 *                 description: "Select message for the product"
 *     responses:
 *       200:
 *         description: "Product instructions updated successfully"
 *       400:
 *         description: "Invalid request body"
 *       404:
 *         description: "Product not found"
 *       500:
 *         description: "Failed to update product instructions"
 */
tenantProductRouter.patch(
  '/instructions/:id',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: InstructionSchema, params: idSchema }),
  updateTenantProduct,
);

/**
 * @swagger
 * /v1/tenant/product/groups/{id}:
 *   patch:
 *     tags:
 *       - "Tenant Product"
 *     summary: "Update product groups"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
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
 *             type: object
 *             properties:
 *               wholesaleGroups:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array of wholesale group IDs for the product"
 *               retailGroups:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array of retail group IDs for the product"
 *     responses:
 *       200:
 *         description: "Product groups updated successfully"
 *       400:
 *         description: "Invalid request body"
 *       404:
 *         description: "Product not found"
 *       500:
 *         description: "Failed to update product groups"
 */

tenantProductRouter.patch(
  '/groups/:id',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: GroupsSchema, params: idSchema }),
  updateTenantProduct,
);

/**
 * @swagger
 * /v1/tenant/product/inventory/{id}:
 *   patch:
 *     tags:
 *       - "Tenant Product"
 *     summary: "Update product inventory"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
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
 *             type: object
 *             properties:
 *               preBookingSelectDate:
 *                 type: string
 *                 description: "Pre-booking select date for the product"
 *               restockSelectDate:
 *                 type: string
 *                 description: "Restock select date for the product"
 *               trackAvailableQuantity:
 *                 type: boolean
 *                 description: "Whether to track available quantity for the product"
 *               canBePurchasedOnline:
 *                 type: boolean
 *                 description: "Whether the product can be purchased online"
 *               showWhenOutOfStockToCustomers:
 *                 type: boolean
 *                 description: "Whether to show the product when out of stock to customers"
 *               allowOrdersOnOutOfStockProducts:
 *                 type: boolean
 *                 description: "Whether to allow orders on out of stock products"
 *               outOfStockMessage:
 *                 type: string
 *                 description: "Out of stock message for the product"
 *     responses:
 *       200:
 *         description: "Product inventory updated successfully"
 *       400:
 *         description: "Invalid request body"
 *       404:
 *         description: "Product not found"
 *       500:
 *         description: "Failed to update product inventory"
 */
tenantProductRouter.patch(
  '/inventory/:id',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: InventorySchema, params: idSchema }),
  updateTenantProduct,
);

/**
 * @swagger
 * /v1/tenant/product/gift-wrapping/{id}:
 *   patch:
 *     tags:
 *       - "Tenant Product"
 *     summary: "Update product gift wrapping options"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
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
 *             type: object
 *             properties:
 *               useAllGiftWrappingOptions:
 *                 type: boolean
 *                 description: "Whether to use all gift wrapping options for the product"
 *               isGiftWrapping:
 *                 type: boolean
 *                 description: "Whether the product is a gift wrapping"
 *               specifyGiftWrappingOptions:
 *                 type: boolean
 *                 description: "Whether to specify gift wrapping options for the product"
 *               giftWrapping:
 *                 type: string
 *                 description: "Gift wrapping ID for the product"
 *     responses:
 *       200:
 *         description: "Product gift wrapping options updated successfully"
 *       400:
 *         description: "Invalid request body"
 *       404:
 *         description: "Product not found"
 *       500:
 *         description: "Failed to update product gift wrapping options"
 */
tenantProductRouter.patch(
  '/gift-wrapping/:id',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: GiftWrappingOptionsSchema, params: idSchema }),
  updateTenantProduct,
);

//*GET ROUTE

/**
 * @swagger
 * /v1/tenant/product/{itemsPerPage}/{pageCount}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - "Tenant Product"
 *    summary: "Get all products"
 *    parameters:
 *      - in: path
 *        name: itemsPerPage
 *        required: false
 *        description: "Number of items per page. Default is 10."
 *        schema:
 *          type: integer
 *      - in: path
 *        name: pageCount
 *        required: false
 *        description: "Number of pages. Default is 1."
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: "Products fetched successfully"
 *      400:
 *        description: "Invalid query params"
 *      404:
 *        description: "No product found"
 *      500:
 *        description: "Failed to fetch products"
 */

tenantProductRouter.get('/:itemsPerPage/:pageCount', getAllTenantProducts);

/**
 * @swagger
 * /v1/tenant/product/{id}:
 *  get:
 *    tags:
 *      - "Tenant Product"
 *    summary: "Get product by ID"
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: "Product ID"
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: "Product fetched successfully"
 *      404:
 *        description: "Product not found"
 *      500:
 *        description: "Failed to fetch product"
 */

tenantProductRouter.get('/:id', getTenantProduct);

// //*PATCH ROUTE
// tenantProductRouter.patch(
//   '/',
//
//   validate({ body: updateTenantProductSchema }),
//   updateTenantProduct,
// );

// //*DELETE ROUTE
// tenantProductRouter.delete('/:id',  deleteProduct);

//? Tenant routes

/**
 * @swagger
 * /v1/tenant/product/tenant/search:
 *  get:
 *    tags:
 *      - "Tenant Product"
 *    summary: "Search products in tenant"
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: search
 *        required: true
 *        description: "Search query"
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: "Products fetched successfully"
 *      400:
 *        description: "Invalid query params"
 *      404:
 *        description: "Products with ${search} name / description is not available"
 *      500:
 *        description: "Failed to fetch products"
 */

tenantProductRouter.get(
  '/search',
  validate({ query: searchTenantProductSchema }),
  searchTenantProduct,
);

/**
 * @swagger
 * /v1/tenant/product/filter:
 *  get:
 *    tags:
 *      - "Tenant Product"
 *    summary: "Filter products in tenant"
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: category
 *        required: false
 *        description: "Category to filter by"
 *        schema:
 *          type: string
 *      - in: query
 *        name: manufacturer
 *        required: false
 *        description: "Manufacturer to filter by"
 *        schema:
 *          type: string
 *      - in: query
 *        name: minPrice
 *        required: false
 *        description: "Minimum price to filter by"
 *        schema:
 *          type: number
 *          minimum: 0
 *      - in: query
 *        name: maxPrice
 *        required: false
 *        description: "Maximum price to filter by"
 *        schema:
 *          type: number
 *          minimum: 0
 *      - in: query
 *        name: variants
 *        required: false
 *        description: "Variants to filter by"
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *      - in: query
 *        name: attributes
 *        required: false
 *        description: "Attributes to filter by"
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *    responses:
 *      200:
 *        description: "Products fetched successfully"
 *      400:
 *        description: "Invalid query params"
 *      404:
 *        description: "No products found with the given filters"
 *      500:
 *        description: "Failed to fetch products"
 */

tenantProductRouter.get(
  '/filter',
  validate({ query: filterTenantProductSchema }),
  filteredTenantProducts,
);

/**
 * @swagger
 * /v1/tenant/product/search-filter:
 *  get:
 *    tags:
 *      - "Tenant Product"
 *    summary: "Search and filter products in tenant"
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: search
 *        required: true
 *        description: "Search query"
 *        schema:
 *          type: string
 *      - in: query
 *        name: category
 *        required: false
 *        description: "Category to filter by"
 *        schema:
 *          type: string
 *      - in: query
 *        name: manufacturer
 *        required: false
 *        description: "Manufacturer to filter by"
 *        schema:
 *          type: string
 *      - in: query
 *        name: minPrice
 *        required: false
 *        description: "Minimum price to filter by"
 *        schema:
 *          type: number
 *          minimum: 0
 *      - in: query
 *        name: maxPrice
 *        required: false
 *        description: "Maximum price to filter by"
 *        schema:
 *          type: number
 *          minimum: 0
 *      - in: query
 *        name: variants
 *        required: false
 *        description: "Variants to filter by"
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *      - in: query
 *        name: attributes
 *        required: false
 *        description: "Attributes to filter by"
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *    responses:
 *      200:
 *        description: "Products fetched successfully"
 *      400:
 *        description: "Invalid query params"
 *      404:
 *        description: "No products found with the given filters"
 *      500:
 *        description: "Failed to fetch products"
 */
tenantProductRouter.get(
  '/search-filter',
  validate({ query: searchAndFilterTenantProductSchema }),
  searchAndFilterTenantProducts,
);

export default tenantProductRouter;

import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrand,
  updateBrand,
} from '@src/controller/brand.controller';
import {
  createMarketingPage,
  createTenant,
  deleteTenant,
  getAllTenants,
  getTenant,
  homeSection,
  loginTenant,
  updateMarketingPage,
  updateTenant,
} from '@src/controller/tenant.controller';
import {
  createWarehouse,
  deleteWarehouse,
  getAllWarehouses,
  getWarehouse,
  updateWarehouse,
} from '@src/controller/warehouse.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import {
  createBrandSchema,
  updateBrandSchema,
} from '@src/validation/brand.validation';
import { idSchema } from '@src/validation/common.validation';
import {
  createTenantSchema,
  homeSectionSchema,
  loginTenantSchema,
  marketingPageSchema,
  marketingPageUpdateSchema,
  updateTenantSchema,
} from '@src/validation/tenant.validation';
import {
  createWarehouseSchema,
  updateWarehouseSchema,
} from '@src/validation/warehouse.validation';
import { Router } from 'express';

const tenantRouter: Router = Router();

//*POST ROUTE
tenantRouter.post(
  '/register',
  validate({ body: createTenantSchema }),
  createTenant,
);
tenantRouter.post('/login', validate({ body: loginTenantSchema }), loginTenant);
tenantRouter.post(
  '/home-section/:id',
  validate({ body: homeSectionSchema, params: idSchema }),
  homeSection,
);
tenantRouter.post(
  '/marketing-page/:id',
  validate({ body: marketingPageSchema, params: idSchema }),
  createMarketingPage,
);

//*GET ROUTE
tenantRouter.get('/', authMiddleware, getAllTenants);
tenantRouter.get('/:id', authMiddleware, getTenant);

//*PATCH ROUTE
tenantRouter.patch(
  '/:id',
  authMiddleware,
  validate({ body: updateTenantSchema, params: idSchema }),
  updateTenant,
);

tenantRouter.patch(
  '/home-section/:id',
  validate({ body: homeSectionSchema, params: idSchema }),
  homeSection,
);

tenantRouter.patch(
  '/marketing-page/:id',
  validate({ body: marketingPageUpdateSchema, params: idSchema }),
  updateMarketingPage,
);

//*DELETE ROUTE
tenantRouter.delete(
  '/:id',
  authMiddleware,
  validate({ params: idSchema }),
  deleteTenant,
);

// tenantRouter.delete(
//   '/marketing-page/:id',
//   validate({ body: marketingPageIdSchema, params: idSchema }),
//   deleteMarketingPage,
// );

//? Warehouse routes

//*POST ROUTE

/**
 * @swagger
 * /v1/tenant/warehouse/create:
 *   post:
 *     tags:
 *       - Warehouse
 *     summary: Create a new warehouse
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - warehousePinCode
 *               - gstinDetails
 *               - warehouseAddress
 *               - city
 *               - state
 *               - country
 *               - warehouseEmail
 *               - warehouseContact
 *               - operationStartTime
 *               - operationEndTime
 *               - perDayOrderCapacity
 *             properties:
 *               warehousePinCode:
 *                 type: string
 *               gstinDetails:
 *                 type: string
 *               warehouseAddress:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               warehouseEmail:
 *                 type: string
 *                 format: email
 *               warehouseContact:
 *                 type: string
 *               operationStartTime:
 *                 type: string
 *               operationEndTime:
 *                 type: string
 *               perDayOrderCapacity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Warehouse created successfully
 *       500:
 *         description: Failed to create warehouse
 */
tenantRouter.post(
  '/warehouse/create',
  validate({ body: createWarehouseSchema }),
  createWarehouse,
);

//*GET ROUTE

/**
 * @swagger
 * /v1/tenant/warehouse:
 *   get:
 *     tags:
 *       - Warehouse
 *     summary: Get all warehouses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: itemsPerPage
 *         required: false
 *         description: "Number of items per page. Default is 10."
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageCount
 *         required: false
 *         description: "Number of pages. Default is 1."
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of warehouses
 *       400:
 *         description: "Invalid query params"
 *       500:
 *         description: Failed to get warehouses
 */
tenantRouter.get('/warehouse', authMiddleware(), getAllWarehouses);

/**
 * @swagger
 * /v1/tenant/warehouse/{id}:
 *   get:
 *     tags:
 *       - Warehouse
 *     summary: Get a warehouse by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Warehouse id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Warehouse fetched successfully
 *       400:
 *         description: Invalid warehouse id
 *       500:
 *         description: Failed to get warehouse
 */
tenantRouter.get('/warehouse/:id', authMiddleware(), getWarehouse);

//*PATCH ROUTE
/**
 * @swagger
 * /v1/tenant/warehouse/{id}:
 *   patch:
 *     tags:
 *       - Warehouse
 *     summary: Update a warehouse by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Warehouse id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - warehousePinCode
 *               - gstinDetails
 *               - warehouseAddress
 *               - city
 *               - state
 *               - country
 *               - warehouseEmail
 *               - warehouseContact
 *               - operationStartTime
 *               - operationEndTime
 *               - perDayOrderCapacity
 *             properties:
 *               warehousePinCode:
 *                 type: string
 *               gstinDetails:
 *                 type: string
 *               warehouseAddress:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               warehouseEmail:
 *                 type: string
 *                 format: email
 *               warehouseContact:
 *                 type: string
 *               operationStartTime:
 *                 type: string
 *               operationEndTime:
 *                 type: string
 *               perDayOrderCapacity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Warehouse updated successfully
 *       400:
 *         description: Invalid warehouse id
 *       404:
 *         description: Warehouse not found
 *       500:
 *         description: Failed to update warehouse
 */
tenantRouter.patch(
  '/warehouse/:id',
  validate({ body: updateWarehouseSchema, params: idSchema }),
  updateWarehouse,
);

//*DELETE ROUTE

/**
 * @swagger
 * /v1/tenant/warehouse/{id}:
 *   delete:
 *     tags:
 *       - Warehouse
 *     summary: Delete a warehouse by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Warehouse id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Warehouse deleted successfully
 *       400:
 *         description: Invalid warehouse id
 *       404:
 *         description: Warehouse not found
 *       500:
 *         description: Failed to delete warehouse
 */
tenantRouter.delete(
  '/warehouse/:id',
  validate({ params: idSchema }),
  deleteWarehouse,
);

//? Brand routes

//*POST ROUTE

/**
 * @swagger
 * /v1/tenant/brand/create:
 *   post:
 *     tags:
 *       - Brand
 *     summary: Create a new brand
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brandName
 *               - yearsOfOperation
 *               - catalogueDetails
 *               - brandLogo
 *               - tradeMark
 *               - manufactureName
 *               - manufactureAddress
 *               - manufactureContact
 *               - packerAddress
 *               - packerContact
 *               - earthFriendly
 *               - rootCategoryClassification
 *               - mainCategoryClassification
 *             properties:
 *               brandName:
 *                 type: string
 *               yearsOfOperation:
 *                 type: number
 *               catalogueDetails:
 *                 type: string
 *               brandLogo:
 *                 type: string
 *               tradeMark:
 *                 type: string
 *               manufactureName:
 *                 type: string
 *               manufactureAddress:
 *                 type: string
 *               manufactureContact:
 *                 type: string
 *               packerAddress:
 *                 type: string
 *               packerContact:
 *                 type: string
 *               earthFriendly:
 *                 type: string
 *               rootCategoryClassification:
 *                 type: string
 *               mainCategoryClassification:
 *                 type: string
 *     responses:
 *       200:
 *         description: Brand created successfully
 *       400:
 *         description: Brand with this name already exists
 *       500:
 *         description: Failed to create brand
 */
tenantRouter.post(
  '/brand/create',
  validate({ body: createBrandSchema }),
  createBrand,
);

//*GET ROUTE

/**
 * @swagger
 * /v1/tenant/brand:
 *   get:
 *     tags:
 *       - Brand
 *     summary: Get all brands
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: itemsPerPage
 *         required: false
 *         description: "Number of items per page. Default is 10."
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageCount
 *         required: false
 *         description: "Number of pages. Default is 1."
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of brands
 *       400:
 *         description: "Invalid query params"
 *       500:
 *         description: Failed to get brands
 */
tenantRouter.get('/brand', authMiddleware(), getAllBrands);

/**
 * @swagger
 * /v1/tenant/brand/{id}:
 *   get:
 *     tags:
 *       - Brand
 *     summary: Get a brand by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Brand id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brand fetched successfully
 *       400:
 *         description: Invalid brand id
 *       500:
 *         description: Failed to get brand
 */
tenantRouter.get('/brand/:id', authMiddleware(), getBrand);

//*PATCH ROUTE

/**
 * @swagger
 * /v1/tenant/brand/{id}:
 *   patch:
 *     tags:
 *       - Brand
 *     summary: Update a brand by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Brand id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *               yearsOfOperation:
 *                 type: number
 *               catalogueDetails:
 *                 type: string
 *               brandLogo:
 *                 type: string
 *               tradeMark:
 *                 type: string
 *               manufactureName:
 *                 type: string
 *               manufactureAddress:
 *                 type: string
 *               manufactureContact:
 *                 type: string
 *               packerAddress:
 *                 type: string
 *               packerContact:
 *                 type: string
 *               earthFriendly:
 *                 type: string
 *               rootCategoryClassification:
 *                 type: string
 *               mainCategoryClassification:
 *                 type: string
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *       400:
 *         description: Invalid brand id
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Failed to update brand
 */
tenantRouter.patch(
  '/brand/:id',
  validate({ body: updateBrandSchema, params: idSchema }),
  updateBrand,
);

//*DELETE ROUTE

/**
 * @swagger
 * /v1/tenant/brand/{id}:
 *   delete:
 *     tags:
 *       - Brand
 *     summary: Delete a brand by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Brand id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brand deleted successfully
 *       400:
 *         description: Invalid brand id
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Failed to delete brand
 */
tenantRouter.delete('/brand/:id', validate({ params: idSchema }), deleteBrand);

export default tenantRouter;

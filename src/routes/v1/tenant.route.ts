import { createBrand } from '@src/controller/brand.controller';
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
import { createWarehouse } from '@src/controller/warehouse.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import { createBrandSchema } from '@src/validation/brand.validation';
import { idSchema } from '@src/validation/common.validation';
import {
  createTenantSchema,
  homeSectionSchema,
  loginTenantSchema,
  marketingPageSchema,
  marketingPageUpdateSchema,
  updateTenantSchema,
} from '@src/validation/tenant.validation';
import { createWarehouseSchema } from '@src/validation/warehouse.validation';
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
tenantRouter.get(
  '/',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  getAllTenants,
);

tenantRouter.get('/:id', authMiddleware(), getTenant);

//*PATCH ROUTE
tenantRouter.patch(
  '/:id',
  authMiddleware(),
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
  authMiddleware(),
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
 *     security:
 *       - bearerAuth: []
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
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: createWarehouseSchema }),
  createWarehouse,
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
 *     security:
 *       - bearerAuth: []
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
 *               - packerAddressAndContact
 *               - earthFriendly
 *               - rootCategoryClassification
 *               - mainCategoryClassification
 *               - tenantId
 *               - userType
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
 *               packerAddressAndContact:
 *                 type: string
 *               earthFriendly:
 *                 type: string
 *               rootCategoryClassification:
 *                 type: array
 *                 items:
 *                   type: string
 *               mainCategoryClassification:
 *                 type: array
 *                 items:
 *                   type: string
 *               tenantId:
 *                 type: string
 *               userType:
 *                 type: string
 *                 enum: [tenant, supplier]
 *               isDisabled:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Brand created successfully
 *       400:
 *         description: Brand with this name already exists for this tenant
 *       500:
 *         description: Failed to create brand
 */

tenantRouter.post(
  '/brand/create',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: createBrandSchema }),
  createBrand,
);

export default tenantRouter;

const test = {
  brandName: 'Test Brand',
  yearsOfOperation: 10,
  catalogueDetails: 'Test catalogue details',
  brandLogo: 'https://example.com/brand-logo.png',
  tradeMark: 'Test trademark',
  manufactureName: 'Test Manufacturer',
  manufactureAddress: '123 Test Street, Test City, Test Country',
  manufactureContact: 'test@example.com',
  packerAddressAndContact: '456 Test Avenue, Test City, Test Country',
  earthFriendly: 'Eco Friendly',
  rootCategoryClassification: ['648dc4329ff22de1196cf46f'],
  mainCategoryClassification: ['648dd0a89ff22de1196cf47b'],
  tenantId: '662798bd845d60a36d9510f2',
  userType: 'tenant',
  isDisabled: false,
};

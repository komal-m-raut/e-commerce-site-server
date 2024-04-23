import {
  createMarketPlaceProduct,
  filteredMarketPlaceProducts,
  getAllMarketPlaceProducts,
  getMarketPlaceProduct,
  searchAndFilterMarketPlaceProducts,
  searchMarketPlaceProduct,
} from '@src/controller/marketplaceProduct.controller';
import validate from '@src/middleware/validate';
import {
  createMarketplaceProductSchema,
  filterMarketplaceProductSchema,
  searchAndFilterMarketplaceProductSchema,
  searchMarketplaceProductSchema,
} from '@src/validation/marketplaceProduct.validation';
import { Router } from 'express';

const marketplaceProductRouter: Router = Router();

//*POST ROUTE

/**
 * @swagger
 * /v1/marketplace/product/create:
 *  post:
 *    tags:
 *      - "Marketplace Product"
 *    summary: "Create a new product"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - generalDetails
 *            properties:
 *              generalDetails:
 *                type: object
 *                required:
 *                  - status
 *                  - productId
 *                  - language
 *                  - manufacturer
 *                  - countryOfOrigin
 *                  - importerName
 *                  - location
 *                  - productName
 *                  - urlKey
 *                  - isMarketplace
 *                properties:
 *                  status:
 *                    type: string
 *                  productId:
 *                    type: string
 *                  language:
 *                    type: string
 *                  manufacturer:
 *                    type: string
 *                  countryOfOrigin:
 *                    type: string
 *                  importerName:
 *                    type: string
 *                  location:
 *                    type: string
 *                  productName:
 *                    type: string
 *                  urlKey:
 *                    type: string
 *                  isMarketplace:
 *                    type: boolean
 *    responses:
 *      200:
 *        description: "Product created successfully"
 *      400:
 *        description: "Product with this URL key is already registered"
 *      500:
 *        description: "Failed to create product"
 */

marketplaceProductRouter.post(
  '/create',
  validate({ body: createMarketplaceProductSchema }),
  createMarketPlaceProduct,
);

//*GET ROUTE

/**
 * @swagger
 * /v1/marketplace/product/{itemsPerPage}/{pageCount}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - "Marketplace Product"
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

marketplaceProductRouter.get(
  '/:itemsPerPage/:pageCount',

  getAllMarketPlaceProducts,
);

/**
 * @swagger
 * /v1/marketplace/product/{id}:
 *  get:
 *    tags:
 *      - "Marketplace Product"
 *    summary: "Get product by ID"
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
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
marketplaceProductRouter.get('/:id',  getMarketPlaceProduct);

// //*PATCH ROUTE
// marketplaceProductRouter.patch(
//   '/',
//
//   validate({ body: updateMarketplaceProductSchema }),
//   updateMarketPlaceProduct,
// );

// //*DELETE ROUTE
// marketplaceProductRouter.delete('/:id',  deleteProduct);

//? Marketplace routes

/**
 * @swagger
 * /v1/marketplace/product/search:
 *  get:
 *    tags:
 *      - "Marketplace Product"
 *    summary: "Search products in marketplace"
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

marketplaceProductRouter.get(
  '/search',
  validate({ query: searchMarketplaceProductSchema }),
  searchMarketPlaceProduct,
);

/**
 * @swagger
 * /v1/marketplace/product/filter:
 *  get:
 *    tags:
 *      - "Marketplace Product"
 *    summary: "Filter products in marketplace"
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

marketplaceProductRouter.get(
  '/filter',
  validate({ query: filterMarketplaceProductSchema }),
  filteredMarketPlaceProducts,
);

/**
 * @swagger
 * /v1/marketplace/product/search-filter:
 *  get:
 *    tags:
 *      - "Marketplace Product"
 *    summary: "Search and filter products in marketplace"
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

marketplaceProductRouter.get(
  '/search-filter',
  validate({ query: searchAndFilterMarketplaceProductSchema }),
  searchAndFilterMarketPlaceProducts,
);

export default marketplaceProductRouter;

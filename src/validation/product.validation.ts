import Joi from 'joi';

export const createProductSchema = Joi.object({
  SKUs: Joi.array().items(
    Joi.object({
      SKUs: Joi.array()
        .items(
          Joi.object({
            cost: Joi.object({
              currency: Joi.string().required(),
              mrp: Joi.number().required(),
              sellingPrice: Joi.number().required(),
              specialPrice: Joi.object({
                isEnabled: Joi.boolean().required(),
                startDate: Joi.date().required(),
                endDate: Joi.date().required(),
                price: Joi.number().required(),
              }),
            }),
            featuredFrom: Joi.date().required(),
            featuredTo: Joi.date().required(),
            trending: Joi.boolean().required(),
            variant: Joi.array().items(Joi.string()).required(),
            shipping: Joi.object({
              quantity: Joi.number().required(),
              weight: Joi.number().required(),
              dimensions: Joi.object({
                length: Joi.number().required(),
                width: Joi.number().required(),
                height: Joi.number().required(),
              }),
              packingDimensions: Joi.object({
                length: Joi.number().required(),
                width: Joi.number().required(),
                height: Joi.number().required(),
              }),
              codAvailable: Joi.boolean().required(),
              codCharge: Joi.number().required(),
            }),
            slug: Joi.string().required(),
            quantity: Joi.number().required(),
            published: Joi.boolean().required(),
            gallery: Joi.array().items(Joi.string()).required(),
          }),
        )
        .required(),
    }),
  ),
  language: Joi.string().required(),
  manufacturer: Joi.string().required(),
  countryOfOrigin: Joi.string().required(),
  location: Joi.string().required(),
  productId: Joi.string().required(),
  marketplace: Joi.boolean().required(),
  urlKey: Joi.string().required(),
  shortDescription: Joi.string().required(),
  longDescription: Joi.string().required(),
  rootCategory: Joi.string().required(),
  mainCategory: Joi.string().required(),
  childCategory: Joi.string().required(),
  attributes: Joi.string().required(),
  editorChoice: Joi.boolean().required(),
  guestCheckout: Joi.boolean().required(),
});

export const searchProductSchema = Joi.object({
  search: Joi.string().required().label('Search query'),
});

export const filterProductSchema = Joi.object({
  category: Joi.string(),
  manufacturer: Joi.string(),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(Joi.ref('minPrice')),
  variants: Joi.array().items(Joi.string()),
  attributes: Joi.array().items(Joi.string()),
});

export const searchAndFilterSchema = Joi.object({
  search: Joi.string().required(),
  category: Joi.string(),
  manufacturer: Joi.string(),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(Joi.ref('minPrice')),
  variants: Joi.array().items(Joi.string()),
  attributes: Joi.array().items(Joi.string()),
});

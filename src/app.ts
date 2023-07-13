import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import { ApiError, NotFoundError, InternalError } from './utils/apiError';
import { rateLimiter } from './utils/rateLimiter';
import config from './config/config';
import logger from './utils/logger';
import { errorHandler, successHandler } from './config/morgan';
import router from './routes/v1/routes';
import generateInvoice from './template/invoice.template';
// @ts-ignore
import html_to_pdf from 'html-pdf-node';
import { writeFile } from 'fs';

const app = express();

if (config.env !== 'test') {
  app.use(successHandler);
  app.use(errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors({ origin: true, optionsSuccessStatus: 200 }));

// limit repeated failed requests to public endpoints
if (config.env === 'production') {
  app.use('/v1/public/*', rateLimiter);
}

const testFunc = () => {
  const file = {
    content: generateInvoice({
      soldBy: 'krushna saileela',
      shipFrom: 'ware house location address',
      gstin: '24AFSPB6672A2ZL ',
      invoiceNumber: '1',
      orderId: '1',
      orderDate: '05-07-23',
      invoiceDate: '05-07-23',
      companyPan: 'XYZ',
      totalItems: '3',
      billTo: 'Details of person who paid for the products',
      shipTo: 'Shipping person details',
      billingAddress: 'house number 201 pune pincode 2034',
      shippingAddress: 'riddhi shah , kolkota pincode 101',
      products: [
        {
          fsnNo: '123456',
          hsnNo: '711790',
          productName: 'Necklace',
          quantity: '3',
          grossAmount: '1100',
          discount: '250',
          taxableValue: '850',
          cgst: '1.5%',
          sgst: '1.5%',
          warrantyPeriods: '123456',
          imeiNo: '123456',
          csgstAmount: '12.75',
          sgstAmount: '12.75',
          totalAmount: '850',
        },
      ],
      shippingQuantity: '3',
      shippingGrossAmount: '40',
      shippingDiscounts: '40',
      shippingTaxableValue: '0.00',
      shippingCgst: '0.00',
      shippingSgst: '0.00',
      shippingAmount: '0.00',
    }),
  };
  const options = { format: 'A4' };
  html_to_pdf.generatePdf(file, options).then(async (pdfBuffer: any) => {
    writeFile(`testInvoice.pdf`, pdfBuffer, 'base64', function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(`files created successfully`);
      }
    });
  });
};
testFunc();
// v1 api routes
app.use('/v1', router);
app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/images/icons/gear.png', (req, res) => res.status(204));

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new NotFoundError(`Not Found - ${req.originalUrl}`);
  next(error);
});

// global error handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (config.env === 'development') {
      logger.info(err);
    }
    ApiError.handle(new InternalError('An error occurred'), res);
  }
});

export default app;

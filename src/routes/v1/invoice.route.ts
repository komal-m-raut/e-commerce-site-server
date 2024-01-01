import { generateAndSendInvoice } from '@src/controller/invoice.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import {
  createInvoiceSchema,
  idSchema,
} from '@src/validation/invoice.validation';
import { Router } from 'express';

const invoiceRouter: Router = Router();

//* POST ROUTE
invoiceRouter.post(
  '/:orderId',
  authMiddleware,
  validate({ body: createInvoiceSchema, params: idSchema }),
  generateAndSendInvoice,
);

export default invoiceRouter;

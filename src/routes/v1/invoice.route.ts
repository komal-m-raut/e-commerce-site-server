import { generateAndSendInvoice } from '@src/controller/invoice.controller';
import validate from '@src/middleware/validate';
import { createInvoiceSchema } from '@src/validation/invoice.validation';
import { idSchema } from '@src/validation/common.validation';
import { Router } from 'express';

const invoiceRouter: Router = Router();

//* POST ROUTE
invoiceRouter.post(
  '/:id',
  validate({ body: createInvoiceSchema, params: idSchema }),
  generateAndSendInvoice,
);

export default invoiceRouter;

import { Request, Response, NextFunction } from 'express';
import { TransactionModel } from '@src/model/transaction.model';
import catchAsync from '@src/utils/catchAsync';
import { NotFoundError } from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import { generatePdf } from 'html-pdf-node';
import { sendMail } from '@src/utils/sendMail';
import generateInvoice, { IInvoice } from '@src/template/invoice.template';

export const generateAndSendInvoice = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;
    const { email } = req.body.decoded;

    // Fetch transaction data
    const transaction = await TransactionModel.findOne({ orderId })
      .populate('tenantId', 'businessInfo warehouseInfo')
      .populate('productId', 'productName')
      .populate('invoiceId', 'invoiceNumber')
      .exec();
    if (!transaction) {
      return next(
        new NotFoundError(`Transaction with orderId ${orderId} not found`),
      );
    }

    // Prepare invoice data
    const invoiceData: IInvoice = {
      soldBy: transaction.tenantId.businessInfo.name,
      shipFrom: transaction.tenantId.warehouseInfo.address,
      gstin: transaction.tenantId.businessInfo.gstin,
      invoiceNumber: transaction.invoiceId.invoiceNumber,
      orderId: req.params.orderId,
      orderDate: transaction.createdAt.toLocaleDateString(),
      invoiceDate: transaction.createdAt.toLocaleDateString(),
      companyPan: transaction.tenantId.businessInfo.pan,
      totalItems: req.body.totalItems,
      billTo: req.body.billTo,
      shipTo: transaction.shippingAddress,
      billingAddress: transaction.billingAddress,
      shippingAddress: transaction.shippingAddress,
      products: transaction.products.map((product) => ({
        fsnNo: product.productId.fsn,
        hsnNo: product.productId.hsn,
        productName: product.productId.productName,
        quantity: product.quantity.toString(),
        grossAmount: req.body.grossAmount.toString(),
        discount: req.body.discount.toString(),
        taxableValue: req.body.taxableValue.toString(),
        cgst: req.body.cgst.toString(),
        sgst: req.body.sgst.toString(),
        warrantyPeriods: req.body.warrantyPeriods.toString(),
        imeiNo: req.body.imeiNo.toString(),
        csgstAmount: req.body.csgstAmount.toString(),
        sgstAmount: req.body.sgstAmount.toString(),
        totalAmount: req.body.totalAmount.toString(),
      })) as IInvoice['products'],
      shippingQuantity: transaction.quantity.toString(),
      shippingGrossAmount: transaction.total.toString(),
      shippingDiscounts: (transaction.total - transaction.price).toString(),
      shippingTaxableValue: (transaction.total - transaction.price).toString(),
      shippingCgst: req.body.cgst.toString(),
      shippingSgst: req.body.sgst.toString(),
      shippingAmount: req.body.totalAmount.toString(),
    };

    // Generate invoice HTML
    const invoiceHtml = generateInvoice(invoiceData);

    // Convert HTML to PDF
    return generatePdf({ content: invoiceHtml }, {}, async (err, pdfBuffer) => {
      if (err) {
        return next(err);
      }
      await sendMail({
        to: email,
        subject: `Invoice for order: ${orderId}}`,
        html: '<p>Attached is your invoice.</p>',
        text: 'Attached is your invoice.',
        attachments: [
          {
            content: pdfBuffer.toString('base64'),
            filename: 'invoice.pdf',
            type: 'application/pdf',
          },
        ],
      });
      // Send email with PDF attachment
      return new SuccessResponse('Invoice sent successfully', {}).send(res);
    });
  },
);

import { Document, Schema, model } from 'mongoose';

interface IProduct {
  fsnNo: string;
  hsnNo: string;
  productName: string;
  quantity: string;
  grossAmount: string;
  discount: string;
  taxableValue: string;
  cgst: string;
  sgst: string;
  warrantyPeriods: string;
  imeiNo: string;
  csgstAmount: string;
  sgstAmount: string;
  totalAmount: string;
}

interface IInvoice extends Document {
  soldBy: string;
  shipFrom: string;
  gstin: string;
  invoiceNumber: string;
  orderId: string;
  orderDate: string;
  invoiceDate: string;
  companyPan: string;
  totalItems: string;
  billTo: string;
  shipTo: string;
  billingAddress: string;
  shippingAddress: string;
  products: IProduct[];
  shippingQuantity: string;
  shippingGrossAmount: string;
  shippingDiscounts: string;
  shippingTaxableValue: string;
  shippingCgst: string;
  shippingSgst: string;
  shippingAmount: string;
}

const ProductSchema = new Schema<IProduct>({
  fsnNo: String,
  hsnNo: String,
  productName: String,
  quantity: String,
  grossAmount: String,
  discount: String,
  taxableValue: String,
  cgst: String,
  sgst: String,
  warrantyPeriods: String,
  imeiNo: String,
  csgstAmount: String,
  sgstAmount: String,
  totalAmount: String,
});

const InvoiceSchema = new Schema<IInvoice>(
  {
    soldBy: String,
    shipFrom: String,
    gstin: String,
    invoiceNumber: String,
    orderId: String,
    orderDate: String,
    invoiceDate: String,
    companyPan: String,
    totalItems: String,
    billTo: String,
    shipTo: String,
    billingAddress: String,
    shippingAddress: String,
    products: [ProductSchema],
    shippingQuantity: String,
    shippingGrossAmount: String,
    shippingDiscounts: String,
    shippingTaxableValue: String,
    shippingCgst: String,
    shippingSgst: String,
    shippingAmount: String,
  },
  { timestamps: true, versionKey: false },
);

const InvoiceModel = model<IInvoice>('Invoice', InvoiceSchema, 'Invoices');

export { IInvoice, InvoiceModel };

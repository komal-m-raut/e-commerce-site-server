import { Document, model, Schema } from 'mongoose';

interface IProductImports extends Document {
  type: string;
  skus: Schema.Types.ObjectId[]; // Array of SKU Ids
  skuIds: Schema.Types.ObjectId[]; // Array of SKU Ids as strings
  tenant: Schema.Types.ObjectId; // Tenant ID
  product: Schema.Types.ObjectId; // Product ID
  status: boolean;
  override: any; // The type for JSON data can be any or you can define a specific type.
}

const ProductImportsSchema: Schema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    skus: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SKU',
      },
    ],
    skuIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SKU',
      },
    ],
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    override: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

const ProductImports = model<IProductImports>(
  'ProductImports',
  ProductImportsSchema,
);

export default ProductImports;

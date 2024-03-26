import { Schema, model } from 'mongoose';

interface IProductIncludes extends Document {
  itemName: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  weight: number;
  tenantId: Schema.Types.ObjectId;
}

const ProductIncludesSchema = new Schema<IProductIncludes>(
  {
    itemName: { type: String, required: true },
    dimensions: {
      length: { type: Number, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    weight: { type: Number, required: true },
    tenantId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false },
);

ProductIncludesSchema.index({ itemName: 1, tenantId: 1 }, { unique: true });

const ProductIncludesModel = model<IProductIncludes>(
  'ProductIncludes',
  ProductIncludesSchema,
  'ProductIncludes',
);

export { IProductIncludes, ProductIncludesModel };

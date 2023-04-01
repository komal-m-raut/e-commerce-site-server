import { Document, model, Schema } from 'mongoose';

interface IAssociation extends Document {
  user: Schema.Types.ObjectId; // User ID
  tenant: Schema.Types.ObjectId; // Tenant ID
  approval: boolean;
}

const AssociationSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
    },
    approval: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

const Association = model<IAssociation>('Association', AssociationSchema);

export default Association;

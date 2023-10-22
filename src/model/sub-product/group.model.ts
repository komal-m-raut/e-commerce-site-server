import { Document, Schema, model } from 'mongoose';

interface IGroup extends Document {
  name: string;
  type: string;
  discount: number;
}

const GroupSchema = new Schema<IGroup>({
  name: { type: String, unique: true },
  type: { type: String },
  discount: { type: Number },
});

const GroupModel = model<IGroup>('Group', GroupSchema, 'Group');

export { IGroup, GroupModel, GroupSchema };

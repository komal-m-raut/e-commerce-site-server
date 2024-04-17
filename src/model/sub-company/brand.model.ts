import { Schema, model } from 'mongoose';

interface IBrand extends Document {
  brandName: string;
  yearsOfOperation: number;
  catalogueDetails: string;
  brandLogo: string;
  tradeMark: string;
  manufactureName: string;
  manufactureAddress: string;
  manufactureContact: string;
  packerAddress: string;
  packerContact: string;
  earthFriendly: string;
  rootCategoryClassification: string;
  mainCategoryClassification: string;
}

const BrandSchema: Schema<IBrand> = new Schema({
  brandName: String,
  yearsOfOperation: Number,
  catalogueDetails: String,
  brandLogo: String,
  tradeMark: String,
  manufactureName: String,
  manufactureAddress: String,
  manufactureContact: String,
  packerAddress: String,
  packerContact: String,
  earthFriendly: String,
  rootCategoryClassification: String,
  mainCategoryClassification: String,
});

const BrandModel = model<IBrand>('Brand', BrandSchema);

export { BrandModel, IBrand, BrandSchema };

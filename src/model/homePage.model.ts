import { Document, Schema, model } from 'mongoose';

interface ISection {
  isActive: boolean;
  type: 'banner' | 'carousel' | 'section';
  data: unknown;
}

interface ISeo {
  title: string;
  description: string;
  keywords: string[];
}

interface IHomePage extends Document {
  tenantId: Schema.Types.ObjectId;
  sections: ISection[];
  seoDetails: ISeo;
}

const SectionSchema = new Schema<ISection>({
  isActive: { type: Boolean, default: true },
  type: {
    type: String,
    required: true,
    enum: ['banner', 'carousel', 'section'],
  },
  data: { type: Schema.Types.Mixed },
});

const SeoSchema = new Schema<ISeo>({
  title: { type: String },
  description: { type: String },
  keywords: { type: [String] },
});

const HomePageSchema = new Schema<IHomePage>(
  {
    tenantId: { type: Schema.Types.ObjectId, unique: true, required: true },
    sections: { type: [SectionSchema] },
    seoDetails: { type: SeoSchema },
  },
  { timestamps: true, versionKey: false },
);

const HomePageModel = model<IHomePage>('HomePage', HomePageSchema, 'HomePage');

export { IHomePage, HomePageModel };

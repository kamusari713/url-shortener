import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UrlMetricDocument = HydratedDocument<UrlMetric>;

@Schema({ timestamps: true })
export class UrlMetric {
  @Prop({ required: true, index: true })
  hash: string;

  @Prop({ required: true })
  browser: string;

  @Prop({ required: true })
  os: string;

  @Prop({ required: true })
  ip: string;

  @Prop()
  city?: string;

  @Prop()
  country?: string;

  @Prop()
  region?: string;

  @Prop()
  timezone?: string;
}

export const UrlMetricSchema = SchemaFactory.createForClass(UrlMetric);

UrlMetricSchema.index({ hash: 1, createdAt: -1 });
UrlMetricSchema.index({ browser: 1 });
UrlMetricSchema.index({ os: 1 });
UrlMetricSchema.index({ country: 1 });
UrlMetricSchema.index({ city: 1 });

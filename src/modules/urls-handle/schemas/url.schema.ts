import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsHash, IsUrl } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UrlDocument = HydratedDocument<Url>;

@Schema()
export class Url {
  @Prop({ required: true, index: true })
  username: string;

  @IsUrl()
  @Prop({ required: true })
  origin: string;

  @IsHash('sha256')
  @Prop({ required: true, index: true })
  hash: string;

  @IsDate()
  @Prop({ default: Date.now })
  createdAt: Date;

  @IsDate()
  @Prop({ default: 0 })
  expiredAt: Date;
}

export const UrlSchema = SchemaFactory.createForClass(Url);

UrlSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0, sparse: true });

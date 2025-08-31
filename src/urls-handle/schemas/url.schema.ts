import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { IsDate, IsHash, IsUrl } from "class-validator"
import { HydratedDocument } from "mongoose"
import { Metric } from "../types/metric.type"

export type UrlDocument = HydratedDocument<Url>

@Schema()
export class Url {
  @Prop({ required: true })
  username: string

  @IsUrl()
  @Prop({ required: true })
  origin: string

  @IsHash("sha256")
  @Prop({ required: true })
  hash: string

  @IsDate()
  @Prop()
  createdAt: Date

  @IsDate()
  @Prop()
  expiredAt: Date

  @Prop()
  metrics: Metric[]
}

export const UrlSchema = SchemaFactory.createForClass(Url)

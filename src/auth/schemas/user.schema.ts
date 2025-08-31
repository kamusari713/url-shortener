import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { IsHash } from "class-validator"
import { HydratedDocument } from "mongoose"

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop()
  username: string

  @IsHash("sha256")
  @Prop()
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)

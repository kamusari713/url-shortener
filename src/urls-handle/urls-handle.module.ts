import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { MongooseModule } from "@nestjs/mongoose"
import { User, UserSchema } from "src/auth/schemas/user.schema"
import { UserService } from "src/auth/services/user.service"
import { Url, UrlSchema } from "./schemas/url.schema"
import { UrlsHandleController } from "./urls-handle.controller"
import { UrlsHandleService } from "./urls-handle.service"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Url.name, schema: UrlSchema },
    ]),
    JwtModule,
  ],
  controllers: [UrlsHandleController],
  providers: [UrlsHandleService, UserService],
})
export class UrlsHandleModule {}

import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { MongooseModule } from "@nestjs/mongoose"
import { User, UserSchema } from "src/auth/schemas/user.schema"
import { Url, UrlSchema } from "src/urls-handle/schemas/url.schema"
import { UrlsHandleService } from "src/urls-handle/urls-handle.service"
import { UserAnalyticsController } from "./user-analytics.controller"
import { UserAnalyticsService } from "./user-analytics.serice"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Url.name, schema: UrlSchema },
    ]),
    JwtModule,
  ],
  controllers: [UserAnalyticsController],
  providers: [UserAnalyticsService, UrlsHandleService],
})
export class MetricModule {}

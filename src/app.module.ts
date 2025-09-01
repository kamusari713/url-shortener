import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { AuthModule } from "./auth/auth.module"
import { UrlsHandleModule } from "./urls-handle/urls-handle.module"
import { MetricModule } from "./user-analytics/user-analytics.module"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>("DB_URI"),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UrlsHandleModule,
    MetricModule,
  ],
})
export class AppModule {}

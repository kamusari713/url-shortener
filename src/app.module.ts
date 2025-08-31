<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
=======
import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { AuthModule } from "./auth/auth.module"
import { UrlsHandleModule } from "./urls-handle/urls-handle.module."
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
>>>>>>> 4a40b2c (feat: initial working version)
})
export class AppModule {}

import { MongooseConfigService } from './database/mongoose-config.service';
import { AuthModule } from './modules/auth/auth.module';
import { UrlsHandleModule } from './modules/urls-handle/urls-handle.module';
import { UserAnalyticsModule } from './modules/user-analytics/user-analytics.module';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    AuthModule,
    UrlsHandleModule,
    UserAnalyticsModule,
  ],
})
export class AppModule {}

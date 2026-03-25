import { User, UserSchema } from 'src/modules/auth/schemas/user.schema';
import {
  UrlMetric,
  UrlMetricSchema,
} from 'src/modules/urls-handle/schemas/url-metric.schema';
import { Url, UrlSchema } from 'src/modules/urls-handle/schemas/url.schema';
import { UrlMetricRepository } from '../urls-handle/repositories/url-metric.repository';
import { UrlRepository } from '../urls-handle/repositories/url.repository';
import { UserAnalyticsController } from './user-analytics.controller';
import { UserAnalyticsService } from './user-analytics.service';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Url.name, schema: UrlSchema },
      { name: UrlMetric.name, schema: UrlMetricSchema },
    ]),
    JwtModule,
  ],
  controllers: [UserAnalyticsController],
  providers: [UserAnalyticsService, UrlRepository, UrlMetricRepository],
})
export class UserAnalyticsModule {}

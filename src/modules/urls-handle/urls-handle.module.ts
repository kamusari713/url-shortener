import { User, UserSchema } from 'src/modules/auth/schemas/user.schema';
import { UserRepository } from '../auth/repositories/user.repository';
import { UrlMetricRepository } from './repositories/url-metric.repository';
import { UrlRepository } from './repositories/url.repository';
import { UrlMetric, UrlMetricSchema } from './schemas/url-metric.schema';
import { Url, UrlSchema } from './schemas/url.schema';
import { UrlsHandleController } from './urls-handle.controller';
import { UrlsHandleService } from './urls-handle.service';

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
  controllers: [UrlsHandleController],
  providers: [
    UrlsHandleService,
    UserRepository,
    UrlRepository,
    UrlMetricRepository,
  ],
})
export class UrlsHandleModule {}

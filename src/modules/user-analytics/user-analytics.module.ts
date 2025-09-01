import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/auth/schemas/user.schema';
import { Url, UrlSchema } from 'src/modules/urls-handle/schemas/url.schema';
import { UrlRepository } from '../urls-handle/repositories/url.repository';
import { UserAnalyticsController } from './user-analytics.controller';
import { UserAnalyticsService } from './user-analytics.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Url.name, schema: UrlSchema },
    ]),
    JwtModule,
  ],
  controllers: [UserAnalyticsController],
  providers: [UserAnalyticsService, UrlRepository],
})
export class UserAnalyticsModule {}

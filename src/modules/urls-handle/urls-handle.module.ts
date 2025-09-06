import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/auth/schemas/user.schema';
import { UserRepository } from '../auth/repositories/user.repository';
import { Url, UrlSchema } from './schemas/url.schema';
import { UrlsHandleController } from './urls-handle.controller';
import { UrlsHandleService } from './urls-handle.service';
import { UrlRepository } from './repositories/url.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Url.name, schema: UrlSchema },
    ]),
    JwtModule,
  ],
  controllers: [UrlsHandleController],
  providers: [UrlsHandleService, UserRepository, UrlRepository],
})
export class UrlsHandleModule {}

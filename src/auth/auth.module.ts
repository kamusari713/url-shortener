import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"
import { MongooseModule } from "@nestjs/mongoose"
import { AuthController } from "./auth.controller"
import { AuthGuard } from "./guards/auth.guard"
import { User, UserSchema } from "./schemas/user.schema"
import { AuthService } from "./services/auth.service"
import { UserService } from "./services/user.service"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configSerice: ConfigService) => ({
        secret: configSerice.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configSerice.get<string>("JWT_EXPIRED_TIME"),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, UserService],
  exports: [AuthGuard],
})
export class AuthModule {}

import { Body, Controller, Post } from "@nestjs/common"
import { AuthInputDto } from "./dto/auth-input.dto"
import { AuthOutputDto } from "./dto/auth-output.dto"
import { AuthService } from "./services/auth.service"
import { UserDocument } from "./schemas/user.schema"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  async login(
    @Body() authInputDto: AuthInputDto,
  ): Promise<AuthOutputDto | null> {
    return await this.authService.authenticate(authInputDto)
  }

  @Post("/register")
  async register(@Body() authDto: AuthInputDto): Promise<UserDocument> {
    return await this.authService.register(authDto)
  }
}

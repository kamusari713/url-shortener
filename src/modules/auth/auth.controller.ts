import { AuthService } from './auth.service';
import { AuthInputDto } from './dto/auth-input.dto';
import { AuthOutputDto } from './dto/auth-output.dto';
import { UserDocument } from './schemas/user.schema';

import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() authInputDto: AuthInputDto,
  ): Promise<AuthOutputDto | null> {
    return this.authService.authenticate(authInputDto);
  }

  @Post('/register')
  async register(@Body() authDto: AuthInputDto): Promise<UserDocument> {
    return this.authService.register(authDto);
  }
}

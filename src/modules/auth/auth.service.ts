import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import { AuthInputDto } from './dto/auth-input.dto';
import { AuthOutputDto } from './dto/auth-output.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UserRepository } from './repositories/user.repository';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async authenticate(
    authInputDto: AuthInputDto,
  ): Promise<AuthOutputDto | null> {
    const user = await this.verifyUser(authInputDto);

    if (!user) {
      throw new BadRequestException();
    }

    return this.signin(user);
  }

  async verifyUser(authInputDto: AuthInputDto): Promise<SignInDto | void> {
    const user = await this.userRepo.findByUsername(authInputDto.username);
    if (user) {
      const hashedPassword = createHash('sha256')
        .update(authInputDto.password)
        .digest('hex');
      if (hashedPassword === user.password) {
        return {
          id: user.id as string,
          username: user.username,
        };
      }
    }
  }

  async signin(signInDto: SignInDto): Promise<AuthOutputDto> {
    const tokenPayload = {
      sub: signInDto.id,
      username: signInDto.username,
    };
    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      username: signInDto.username,
      accessToken: accessToken,
    };
  }

  async register(authInputDto: AuthInputDto): Promise<UserDocument> {
    const user = await this.verifyUser(authInputDto);

    if (user) {
      throw new ConflictException('Email already in use');
    }

    return this.userRepo.create(authInputDto);
  }
}

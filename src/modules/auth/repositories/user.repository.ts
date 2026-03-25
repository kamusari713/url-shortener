import { AuthInputDto } from '../dto/auth-input.dto';
import { User, UserDocument } from '../schemas/user.schema';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createHash } from 'crypto';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findByUsername(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username: username }).exec();
    if (user) return user;
    throw new NotFoundException();
  }

  async create(authInputDto: AuthInputDto): Promise<UserDocument> {
    const hashedPassword = createHash('sha256')
      .update(authInputDto.password)
      .digest('hex');
    authInputDto.password = hashedPassword;

    const createdUser = await this.userModel.create(authInputDto);
    return createdUser.save();
  }
}

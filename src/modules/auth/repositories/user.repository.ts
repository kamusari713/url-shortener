import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createHash } from 'crypto';
import { Model } from 'mongoose';
import { AuthInputDto } from '../dto/auth-input.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username: username }).exec();
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

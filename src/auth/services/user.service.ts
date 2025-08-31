import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { AuthInputDto } from "../dto/auth-input.dto"
import { User, UserDocument } from "../schemas/user.schema"

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find()
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ username: username }).exec()
  }

  async createUser(authInputDto: AuthInputDto): Promise<UserDocument> {
    const createdUser = await this.userModel.create(authInputDto)
    return createdUser.save()
  }
}

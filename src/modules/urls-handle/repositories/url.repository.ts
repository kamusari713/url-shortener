import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url, UrlDocument } from '../schemas/url.schema';

@Injectable()
export class UrlRepository {
  constructor(@InjectModel(Url.name) private readonly urlModel: Model<Url>) {}

  async findByUsernameAndOrigin(
    origin: string,
    username: string,
  ): Promise<UrlDocument> {
    const url = await this.urlModel
      .findOne({
        origin,
        username,
      })
      .exec();

    if (!url) {
      throw new NotFoundException();
    }

    return this.verifyUrl(url);
  }

  async findByHash(hash: string): Promise<UrlDocument> {
    const url = await this.urlModel.findOne({ hash }).exec();

    if (!url) {
      throw new NotFoundException();
    }

    return this.verifyUrl(url);
  }

  async findByUsername(username: string): Promise<UrlDocument[]> {
    const urls = await this.urlModel.find({ username });

    if (!urls || !urls.length) {
      throw new NotFoundException();
    }

    return urls;
  }

  async create(
    origin: string,
    hash: string,
    username: string,
    lifetime?: string,
  ): Promise<UrlDocument> {
    const createdAt = new Date();
    const expiredAt = lifetime
      ? new Date(createdAt.getTime() + +lifetime * 1000)
      : new Date(0);

    return this.urlModel.create({
      username,
      origin,
      hash,
      createdAt,
      expiredAt,
    });
  }

  private verifyUrl(url: UrlDocument): UrlDocument {
    if (url.expiredAt.getTime() !== 0 && Date.now() > url.expiredAt.getTime()) {
      this.urlModel.findOneAndDelete({ hash: url.hash }).exec();
      throw new NotFoundException();
    }
    return url;
  }
}

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
        origin: origin,
        username: username,
      })
      .exec();

    if (!url) {
      throw new NotFoundException();
    }

    return this.verifyUrl(url);
  }

  async findByHash(hash: string): Promise<UrlDocument> {
    const url = await this.urlModel.findOne({ hash: hash }).exec();

    if (!url) {
      throw new NotFoundException();
    }

    return this.verifyUrl(url);
  }

  async findByHashAndUpdate(hash: string, url: UrlDocument): Promise<void> {
    await this.urlModel.findOneAndUpdate({ hash: hash }, url).exec();
  }

  async findByUsername(username: string): Promise<UrlDocument[]> {
    const urls = await this.urlModel.find({ username: username });

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
  ) {
    const createdAt = Date.now();
    let expiredAt = 0;
    if (lifetime) {
      expiredAt = createdAt + +lifetime * 1000;
    }

    const newUrlEntity = {
      username: username,
      origin: origin,
      hash: hash,
      createdAt: new Date(createdAt),
      expiredAt: new Date(expiredAt),
    };

    const createdUrl = await this.urlModel.create(newUrlEntity);
    return createdUrl.save();
  }

  private async verifyUrl(url: UrlDocument): Promise<UrlDocument> {
    if (url.expiredAt.getTime() != 0 && Date.now() > url.expiredAt.getTime()) {
      return url;
    } else {
      await this.urlModel.findOneAndDelete({ hash: url.hash }).exec();
      throw new NotFoundException();
    }
  }
}

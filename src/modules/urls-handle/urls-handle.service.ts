import { createHash } from 'crypto';
import { RequestMetricsDto } from './dto/request-metric.dto';
import { UrlMetricRepository } from './repositories/url-metric.repository';
import { UrlRepository } from './repositories/url.repository';
import { returnHashLink } from './utils/return-hash-link.util';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlsHandleService {
  constructor(
    private readonly urlRepo: UrlRepository,
    private readonly urlMetricRepo: UrlMetricRepository,
    private readonly configService: ConfigService,
  ) {}

  async getOriginHash(
    origin: string,
    username: string,
    userId: string,
    lifetime?: string,
    length?: string,
  ): Promise<string> {
    const url = await this.urlRepo.findByUsernameAndOrigin(origin, username);
    if (url) {
      return returnHashLink(url.hash, this.configService);
    }

    const hash = this.generateHashByUrl(origin, userId, length);

    const newUrlEntity = await this.urlRepo.create(
      origin,
      hash,
      username,
      lifetime,
    );

    return returnHashLink(newUrlEntity.hash, this.configService);
  }

  async getOriginByHash(
    hash: string,
    requestMetrics: RequestMetricsDto,
  ): Promise<string> {
    const url = await this.urlRepo.findByHash(hash);

    await this.urlMetricRepo.create(hash, requestMetrics);

    return url.origin;
  }

  private generateHashByUrl(
    origin: string,
    userId: string,
    length?: string,
  ): string {
    const hash = createHash('sha256')
      .update(`${origin}+${userId}`)
      .digest('hex');

    if (length) {
      return hash.slice(0, +length);
    }

    return hash.slice(0, origin.length - 1);
  }
}

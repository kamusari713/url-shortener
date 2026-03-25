import { TokenPayload } from 'src/modules/auth/types/token-payload.type';
import { UrlMetricRepository } from '../urls-handle/repositories/url-metric.repository';
import { UrlRepository } from '../urls-handle/repositories/url.repository';
import { MetricAnalyticParam } from './types/metric-analytic-param.type';

import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAnalyticsService {
  constructor(
    private readonly urlRepo: UrlRepository,
    private readonly urlMetricRepo: UrlMetricRepository,
  ) {}

  async getStatisticByParam(
    payload: TokenPayload,
    param: MetricAnalyticParam,
  ): Promise<Record<string, Record<string, number>>> {
    const urls = await this.urlRepo.findByUsername(payload.username);

    const result: Record<string, Record<string, number>> = {};
    for (const url of urls) {
      const metrics = await this.urlMetricRepo.aggregateByParam(
        url.hash,
        param,
      );
      result[url.origin] = metrics.reduce(
        (acc, item) => {
          if (item._id) {
            acc[item._id] = item.count;
          }
          return acc;
        },
        {} as Record<string, number>,
      );
    }

    return result;
  }

  async getUsages(payload: TokenPayload): Promise<Record<string, number>> {
    const urls = await this.urlRepo.findByUsername(payload.username);

    const result: Record<string, number> = {};
    for (const url of urls) {
      const stats = await this.urlMetricRepo.aggregateAll(url.hash);
      result[url.origin] = Object.values(stats.browser || {}).reduce(
        (sum, count) => sum + count,
        0,
      );
    }
    return result;
  }

  async getStatistics(
    payload: TokenPayload,
  ): Promise<Record<string, Record<string, Record<string, number>>>> {
    const urls = await this.urlRepo.findByUsername(payload.username);

    const result: Record<string, Record<string, Record<string, number>>> = {};
    for (const url of urls) {
      result[url.origin] = await this.urlMetricRepo.aggregateAll(url.hash);
    }

    return result;
  }
}

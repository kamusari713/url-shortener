import { Injectable } from '@nestjs/common';
import { TokenPayload } from 'src/modules/auth/types/token-payload.type';
import { UrlRepository } from '../urls-handle/repositories/url.repository';
import { MetricAnalyticParam } from './types/metric-analytic-param.type';
import { MetricStatistic } from './types/metric-statistic.type';
import { StatisticByParam } from './types/statisctic-by-param.type';
import { aggregateMetrics } from './utils/aggregate-metrics.util';
import { pickMetric } from './utils/pick-metric.util';
import { structMetrics } from './utils/struct-metrics.util';

@Injectable()
export class UserAnalyticsService {
  constructor(private readonly urlRepo: UrlRepository) {}

  async getStatisticByParam(
    payload: TokenPayload,
    param: MetricAnalyticParam,
  ): Promise<StatisticByParam | null> {
    const urls = await this.urlRepo.findByUsername(payload.username);

    return pickMetric(structMetrics(urls), param);
  }

  async getUsages(payload: TokenPayload) {
    const urls = await this.urlRepo.findByUsername(payload.username);

    const structedMetrics = structMetrics(urls);
    const result = {};
    for (const key in structedMetrics) {
      result[key] = structedMetrics[key].length;
    }
    return result;
  }

  async getStatistics(payload: TokenPayload): Promise<MetricStatistic> {
    const urls = await this.urlRepo.findByUsername(payload.username);

    const structedMetrics = structMetrics(urls);
    return aggregateMetrics(structedMetrics);
  }
}

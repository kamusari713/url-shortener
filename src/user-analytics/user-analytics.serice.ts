import { Injectable, NotFoundException } from "@nestjs/common"
import { TokenPayload } from "src/auth/types/token-payload.type"
import { UrlsHandleService } from "src/urls-handle/urls-handle.service"
import { MetricStatistic } from "./types/metric-statistic.type"
import { StatisticByParam } from "./types/statisctic-by-param.type"
import { aggregateMetrics } from "./utils/aggregate-metrics.util"
import { pickMetric } from "./utils/pick-metric.util"
import { structMetrics } from "./utils/struct-metrics.util"
import { UrlDocument } from "src/urls-handle/schemas/url.schema"

@Injectable()
export class UserAnalyticsService {
  constructor(private readonly urlsHandleService: UrlsHandleService) {}

  async getRawMetrics(payload: TokenPayload): Promise<UrlDocument[] | null> {
    const metrics = await this.urlsHandleService.findMetricsByUsername(
      payload.username,
    )

    if (metrics && metrics.length) return metrics

    throw new NotFoundException()
  }

  async getStatisticByParam(
    payload: TokenPayload,
    param: string,
  ): Promise<StatisticByParam | null> {
    // db request for metrics
    const metrics = await this.urlsHandleService.findMetricsByUsername(
      payload.username,
    )

    // pick certain param from metrics and count it
    if (metrics && metrics.length) {
      return pickMetric(structMetrics(metrics), param)
    }

    throw new NotFoundException()
  }

  async getUsages(payload: TokenPayload) {
    // db request for metrics
    const metrics = await this.urlsHandleService.findMetricsByUsername(
      payload.username,
    )

    // struct metrics and count it
    if (metrics && metrics.length) {
      const structedMetrics = structMetrics(metrics)
      const result = {}
      for (const key in structedMetrics) {
        result[key] = structedMetrics[key].length
      }
      return result
    }

    throw new NotFoundException()
  }

  async getStatistics(payload: TokenPayload): Promise<MetricStatistic> {
    const metrics = await this.urlsHandleService.findMetricsByUsername(
      payload.username,
    )

    if (metrics && metrics.length) {
      const structedMetrics = structMetrics(metrics)
      return aggregateMetrics(structedMetrics)
    }

    throw new NotFoundException()
  }
}

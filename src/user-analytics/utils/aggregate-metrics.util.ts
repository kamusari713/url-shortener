import { Metric } from "src/urls-handle/types/metric.type"
import { MetricAggregate } from "../types/aggregate.type"
import { MetricStatistic } from "../types/metric-statistic.type"
import { StructedMetrics } from "../types/structed-metrics.type"
import { incrementCount } from "./increment-count.util"

export function aggregateMetrics(
  structedMetrics: StructedMetrics,
): MetricStatistic {
  // result object
  const result: MetricStatistic = {}

  // walk through every origin and aggregate it's metrics
  for (const origin in structedMetrics) {
    const aggregate: MetricAggregate = {
      usage: 0,
      browser: {},
      os: {},
      ip: {},
      county: {},
      region: {},
      timezone: {},
    }

    const metrics = structedMetrics[origin]

    metrics.forEach((metric: Metric) => {
      incrementCount(aggregate.browser, metric.browser)
      incrementCount(aggregate.os, metric.os)
      incrementCount(aggregate.ip, metric.ip)
      if (metric.country) {
        incrementCount(aggregate.county, metric.country)
      }
      if (metric.region) {
        incrementCount(aggregate.region, metric.region)
      }
      if (metric.timezone) {
        incrementCount(aggregate.timezone, metric.timezone)
      }
      aggregate.usage++
    })

    result[origin] = aggregate
  }

  return result
}

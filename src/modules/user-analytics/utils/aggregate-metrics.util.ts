import { Metric } from 'src/modules/urls-handle/types/metric.type';
import { MetricAggregate } from '../types/aggregate.type';
import { MetricStatistic } from '../types/metric-statistic.type';
import { StructedMetrics } from '../types/structed-metrics.type';

export function aggregateMetrics(
  structedMetrics: StructedMetrics,
): MetricStatistic {
  // result object
  const result: MetricStatistic = {};

  // walk through every origin and aggregate it's metrics
  for (const origin in structedMetrics) {
    const aggregate: MetricAggregate = {
      usage: 0,
      browser: {},
      os: {},
      ip: {},
      country: {},
      region: {},
      timezone: {},
      city: {},
    };

    const metrics = structedMetrics[origin];

    metrics.forEach((metric: Metric) => {
      incrementCount(aggregate.browser, metric.browser);
      incrementCount(aggregate.os, metric.os);
      incrementCount(aggregate.ip, metric.ip);
      if (metric.country) {
        incrementCount(aggregate.country, metric.country);
      }
      if (metric.region) {
        incrementCount(aggregate.region, metric.region);
      }
      if (metric.timezone) {
        incrementCount(aggregate.timezone, metric.timezone);
      }
      if (metric.city) {
        incrementCount(aggregate.city, metric.city);
      }
      aggregate.usage++;
    });

    result[origin] = aggregate;
  }

  return result;
}

function incrementCount(map: Record<string, number>, key?: string): void {
  if (!key) return;
  map[key] = (map[key] ?? 0) + 1;
}

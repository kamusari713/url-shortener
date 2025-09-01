import { NotFoundException } from '@nestjs/common';
import { Metric } from 'src/modules/urls-handle/types/metric.type';
import { StatisticByParam } from '../types/statisctic-by-param.type';
import { StructedMetrics } from '../types/structed-metrics.type';
import { MetricAnalyticParam } from '../types/metric-analytic-param.type';

export function pickMetric(
  metrics: StructedMetrics,
  param: MetricAnalyticParam,
): StatisticByParam | null {
  const result = {};
  for (const origin in metrics) {
    const filtered = metrics[origin].map((metric: Metric) => {
      if (metric) {
        return metric[param];
      }
      throw new NotFoundException();
    });

    const counted = countMetrics(filtered);

    if (counted && Object.keys(counted).length) {
      result[origin] = counted;
    }
  }

  return (Object.keys(result).length && result) || null;
}

function countMetrics(
  metrics?: Metric[MetricAnalyticParam][],
): StatisticByParam | null {
  if (!metrics || metrics.length === 0) return null;
  return metrics.reduce<StatisticByParam>((acc, currentMetric: string) => {
    if (acc && currentMetric) {
      acc[currentMetric] = (acc[currentMetric] || 0) + 1;
    }
    return acc;
  }, {});
}

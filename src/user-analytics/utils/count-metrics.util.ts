import { StatisticByParam } from "../types/statisctic-by-param.type"

export function countMetrics(metrics: string[]): StatisticByParam {
  return metrics.reduce((acc: StatisticByParam, currentMetric: string) => {
    if (acc && currentMetric) {
      acc[currentMetric] = (acc[currentMetric] || 0) + 1
    }
    return acc
  }, {})
}

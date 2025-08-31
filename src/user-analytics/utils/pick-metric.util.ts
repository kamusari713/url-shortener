import { Metric } from "src/urls-handle/types/metric.type"
import { StructedMetrics } from "../types/structed-metrics.type"
import { countMetrics } from "./count-metrics.util"
import { StatisticByParam } from "../types/statisctic-by-param.type"

export function pickMetric(
  metrics: StructedMetrics,
  param: string,
): StatisticByParam | null {
  const result = {}
  for (const origin in metrics) {
    const filtered = metrics[origin].map((metric: Metric) => {
      if (metric) {
        // FIX:
        return metric[param]
      }
    })

    // FIX:
    const counted = countMetrics(filtered)

    if (Object.keys(counted).length) {
      result[origin] = counted
    }
  }

  return (Object.keys(result).length && result) || null
}

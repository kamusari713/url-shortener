import { MetricField } from "./metric-field.type"

export type MetricAggregate = Record<MetricField, Record<string, number>> & {
  usage: number
}

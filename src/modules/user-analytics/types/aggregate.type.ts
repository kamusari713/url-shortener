import { MetricAnalyticParam } from './metric-analytic-param.type';

export type MetricAggregate = Record<
  MetricAnalyticParam,
  Record<string, number>
> & {
  usage: number;
};

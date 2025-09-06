import { Metric } from 'src/modules/urls-handle/types/metric.type';

export type MetricAnalyticParam = keyof Omit<Metric, 'createdAt'>;

import { UrlDocument } from 'src/modules/urls-handle/schemas/url.schema';
import { StructedMetrics } from '../types/structed-metrics.type';

export function structMetrics(urls: UrlDocument[]): StructedMetrics {
  return urls.reduce((acc: StructedMetrics, url) => {
    acc[url.origin] = url.metrics;
    return acc;
  }, {});
}

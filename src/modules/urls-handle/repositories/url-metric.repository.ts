import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestMetricsDto } from '../dto/request-metric.dto';
import { UrlMetric, UrlMetricDocument } from '../schemas/url-metric.schema';

@Injectable()
export class UrlMetricRepository {
  constructor(
    @InjectModel(UrlMetric.name)
    private readonly urlMetricModel: Model<UrlMetric>,
  ) {}

  async create(hash: string, metrics: RequestMetricsDto): Promise<void> {
    await this.urlMetricModel.create({
      hash,
      browser: metrics.browser,
      os: metrics.os,
      ip: metrics.ip,
      city: metrics.city,
      country: metrics.country,
      region: metrics.region,
      timezone: metrics.timezone,
    });
  }

  async aggregateByParam(
    hash: string,
    param: string,
  ): Promise<{ _id: string; count: number }[]> {
    const result = await this.urlMetricModel.aggregate([
      { $match: { hash } },
      {
        $group: {
          _id: `$${param}`,
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 100 },
    ]);

    return result;
  }

  async aggregateAll(
    hash: string,
  ): Promise<Record<string, Record<string, number>>> {
    const result = await this.urlMetricModel.aggregate([
      { $match: { hash } },
      {
        $facet: {
          browser: [
            { $group: { _id: '$browser', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          os: [
            { $group: { _id: '$os', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          ip: [
            { $group: { _id: '$ip', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 100 },
          ],
          country: [
            { $group: { _id: '$country', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          region: [
            { $group: { _id: '$region', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          city: [
            { $group: { _id: '$city', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          timezone: [
            { $group: { _id: '$timezone', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
        },
      },
    ]);

    const facet = result[0];
    return {
      browser: this.formatFacet(facet.browser),
      os: this.formatFacet(facet.os),
      ip: this.formatFacet(facet.ip),
      country: this.formatFacet(facet.country),
      region: this.formatFacet(facet.region),
      city: this.formatFacet(facet.city),
      timezone: this.formatFacet(facet.timezone),
    };
  }

  private formatFacet(
    data: { _id: string; count: number }[],
  ): Record<string, number> {
    return data.reduce(
      (acc, item) => {
        if (item._id) {
          acc[item._id] = item.count;
        }
        return acc;
      },
      {} as Record<string, number>,
    );
  }
}

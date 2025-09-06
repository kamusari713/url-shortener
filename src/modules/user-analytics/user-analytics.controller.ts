import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from 'src/modules/auth/decorators/user.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { TokenPayload } from 'src/modules/auth/types/token-payload.type';
import { MetricStatistic } from './types/metric-statistic.type';
import { StatisticByParam } from './types/statisctic-by-param.type';
import { UserAnalyticsService } from './user-analytics.service';

@UseGuards(AuthGuard)
@Controller('metrics')
export class UserAnalyticsController {
  constructor(private readonly metricService: UserAnalyticsService) {}

  @Get('/browsers')
  async getBrowsers(
    @User() payload: TokenPayload,
  ): Promise<StatisticByParam | null> {
    return this.metricService.getStatisticByParam(payload, 'browser');
  }

  @Get('/os')
  async getOs(@User() payload: TokenPayload): Promise<StatisticByParam | null> {
    return this.metricService.getStatisticByParam(payload, 'os');
  }

  @Get('/ips')
  async getIps(
    @User() payload: TokenPayload,
  ): Promise<StatisticByParam | null> {
    return this.metricService.getStatisticByParam(payload, 'ip');
  }

  @Get('/countries')
  async getCountries(@User() payload: TokenPayload) {
    return this.metricService.getStatisticByParam(payload, 'country');
  }

  @Get('/regions')
  async getRegions(@User() payload: TokenPayload) {
    return this.metricService.getStatisticByParam(payload, 'region');
  }

  @Get('/timezones')
  async getTimezones(@User() payload: TokenPayload) {
    return this.metricService.getStatisticByParam(payload, 'timezone');
  }

  @Get('/cities')
  async getCities(@User() payload: TokenPayload) {
    return this.metricService.getStatisticByParam(payload, 'city');
  }

  @Get('/statistics')
  async getStatistics(@User() payload: TokenPayload): Promise<MetricStatistic> {
    return this.metricService.getStatistics(payload);
  }
}

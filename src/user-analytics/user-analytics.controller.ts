import { Controller, Get, UseGuards } from "@nestjs/common"
import { User } from "src/auth/decorators/user.decorator"
import { AuthGuard } from "src/auth/guards/auth.guard"
import { TokenPayload } from "src/auth/types/token-payload.type"
import { UserAnalyticsService } from "./user-analytics.serice"
import { StatisticByParam } from "./types/statisctic-by-param.type"
import { MetricStatistic } from "./types/metric-statistic.type"

@Controller("metrics")
export class UserAnalyticsController {
  constructor(private readonly metricService: UserAnalyticsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getRawMetrics(@User() payload: TokenPayload) {
    return await this.metricService.getRawMetrics(payload)
  }

  @UseGuards(AuthGuard)
  @Get("/browsers")
  async getBrowsers(
    @User() payload: TokenPayload,
  ): Promise<StatisticByParam | null> {
    return await this.metricService.getStatisticByParam(payload, "browser")
  }

  @UseGuards(AuthGuard)
  @Get("/os")
  async getOs(@User() payload: TokenPayload): Promise<StatisticByParam | null> {
    return await this.metricService.getStatisticByParam(payload, "os")
  }

  @UseGuards(AuthGuard)
  @Get("/ips")
  async getIps(
    @User() payload: TokenPayload,
  ): Promise<StatisticByParam | null> {
    return await this.metricService.getStatisticByParam(payload, "ip")
  }

  @UseGuards(AuthGuard)
  @Get("/countries")
  async getCountries(@User() payload: TokenPayload) {
    return await this.metricService.getStatisticByParam(payload, "country")
  }

  @UseGuards(AuthGuard)
  @Get("/regions")
  async getRegions(@User() payload: TokenPayload) {
    return await this.metricService.getStatisticByParam(payload, "regions")
  }

  @UseGuards(AuthGuard)
  @Get("/timezones")
  async getTimezones(@User() payload: TokenPayload) {
    return await this.metricService.getStatisticByParam(payload, "timezones")
  }

  @UseGuards(AuthGuard)
  @Get("/statistics")
  async getStatistics(@User() payload: TokenPayload): Promise<MetricStatistic> {
    return await this.metricService.getStatistics(payload)
  }
}

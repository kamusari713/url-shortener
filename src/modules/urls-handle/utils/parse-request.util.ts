import geoip from 'geoip-lite';
import { getClientIp } from 'request-ip';
import type { Request } from 'src/modules/auth/types/request.type';
import userAgent from 'useragent';
import { RequestMetricsDto } from '../dto/request-metric.dto';

export function parseRequest(req: Request): RequestMetricsDto {
  const clientIp = getClientIp(req) || '127.0.0.1';
  const ipInfo = geoip.lookup(clientIp);
  const agent = userAgent.parse(req.headers['user-agent'] || '');
  const os = agent.os.family;
  const browser = agent.source;
  return {
    createdAt: new Date(Date.now()),
    browser: browser,
    os: os,
    ip: clientIp,
    city: ipInfo?.city || undefined,
    country: ipInfo?.country || undefined,
    region: ipInfo?.region || undefined,
    timezone: ipInfo?.timezone || undefined,
  };
}

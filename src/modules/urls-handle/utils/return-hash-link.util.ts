import { ConfigService } from '@nestjs/config';

export function returnHashLink(
  hash: string,
  configService: ConfigService,
): string {
  return `${configService.get<string>('APP_HOST')}:${configService.get<string>('APP_PORT')}/urls/${hash}`;
}

import { IsDate, IsOptional, IsString } from 'class-validator';

export class RequestMetricsDto {
  @IsDate()
  createdAt: Date;

  @IsString()
  browser: string;

  @IsString()
  os: string;

  @IsString()
  ip: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  timezone?: string;
}

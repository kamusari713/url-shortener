import { IsOptional, IsString } from "class-validator"

export class Metric {
  @IsOptional()
  @IsString()
  createdAt: Date

  @IsString()
  browser: string

  @IsString()
  os: string

  @IsString()
  ip: string

  @IsOptional()
  @IsString()
  city?: string

  @IsOptional()
  @IsString()
  country?: string

  @IsOptional()
  @IsString()
  region?: string

  @IsOptional()
  @IsString()
  timezone?: string
}

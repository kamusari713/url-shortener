import { IsString, IsUrl } from "class-validator"

export class AddOriginDto {
  @IsUrl()
  @IsString()
  origin: string
}

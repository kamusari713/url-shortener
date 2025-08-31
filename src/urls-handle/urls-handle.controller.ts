import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request as Req,
  Response as Res,
  UseGuards,
} from "@nestjs/common"
import type { Request, Response } from "express"
import { User } from "src/auth/decorators/user.decorator"
import { AuthGuard } from "src/auth/guards/auth.guard"
import { TokenPayload } from "src/auth/types/token-payload.type"
import { AddOriginDto } from "./dto/add-origin.dto"
import { UrlQueriesDto } from "./dto/url-queries.dto"
import { UrlsHandleService } from "./urls-handle.service"

@Controller("urls")
export class UrlsHandleController {
  constructor(private readonly urlsHandleService: UrlsHandleService) {}

  @UseGuards(AuthGuard)
  @Post()
  async getHashUrl(
    @Body() addOriginDto: AddOriginDto,
    @User() payload: TokenPayload,
    @Query() queryParamsDto?: UrlQueriesDto,
  ): Promise<string> {
    return await this.urlsHandleService.getOriginHash(
      addOriginDto,
      payload,
      queryParamsDto,
    )
  }

  @Get(":hash")
  async getOriginByHash(
    @Param("hash") hash: string,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    return response.redirect(
      await this.urlsHandleService.getOriginByHash(hash, request),
    )
  }
}

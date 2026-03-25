import { User } from 'src/modules/auth/decorators/user.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import type { Request } from 'src/modules/auth/types/request.type';
import { TokenPayload } from 'src/modules/auth/types/token-payload.type';
import { AddOriginDto } from './dto/add-origin.dto';
import { UrlQueriesDto } from './dto/url-queries.dto';
import { UrlsHandleService } from './urls-handle.service';
import { parseRequest } from './utils/parse-request.util';

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
} from '@nestjs/common';
import type { Response } from 'express';

@Controller('urls')
export class UrlsHandleController {
  constructor(private readonly urlsHandleService: UrlsHandleService) {}

  @UseGuards(AuthGuard)
  @Post()
  async getHashUrl(
    @Body() addOriginDto: AddOriginDto,
    @User() payload: TokenPayload,
    @Query() queryParamsDto?: UrlQueriesDto,
  ): Promise<string> {
    return this.urlsHandleService.getOriginHash(
      addOriginDto.origin,
      payload.username,
      payload.sub,
      queryParamsDto?.lifetime,
      queryParamsDto?.length,
    );
  }

  @Get(':hash')
  async getOriginByHash(
    @Param('hash') hash: string,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    const requestMetrics = parseRequest(request);
    return response.redirect(
      await this.urlsHandleService.getOriginByHash(hash, requestMetrics),
    );
  }
}

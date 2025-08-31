import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Request } from "express"
import { Model } from "mongoose"
import { TokenPayload } from "src/auth/types/token-payload.type"
import { AddOriginDto } from "./dto/add-origin.dto"
import { UrlQueriesDto } from "./dto/url-queries.dto"
import { Url, UrlDocument } from "./schemas/url.schema"
import { createNewUrl } from "./utils/create-new-url.util"
import { generateHashByUrl } from "./utils/generate-hash-by-url.util"
import { parseRequest } from "./utils/parse-request.util"

@Injectable()
export class UrlsHandleService {
  constructor(@InjectModel(Url.name) private readonly urlModel: Model<Url>) {}

  async getOriginHash(
    addOriginDto: AddOriginDto,
    payload: TokenPayload,
    queryParamsDto?: UrlQueriesDto,
  ): Promise<string> {
    // parse values
    const origin = addOriginDto.origin
    const { sub, username } = payload

    // if exist return existing
    const url = await this.urlModel
      .findOne({ origin: origin, username: username })
      .exec()
    if (url) {
      // return if not expired
      if (
        url.expiredAt.getTime() != 0 &&
        Date.now() > url.expiredAt.getTime()
      ) {
        return `${process.env.APP_HOST}:${process.env.APP_PORT}/urls/${url.hash}`
      } else {
        // delete if expired and throw exception
        await this.urlModel.findOneAndDelete({ hash: url.hash }).exec()
        throw new NotFoundException()
      }
    }

    // if not exist create and return new
    const hash = generateHashByUrl(origin, sub, queryParamsDto)
    const newUrl = createNewUrl(origin, username, hash, queryParamsDto)
    const createdUrl = new this.urlModel(newUrl)
    return await createdUrl.save().then((url) => {
      return `${process.env.APP_HOST}:${process.env.APP_PORT}/urls/${url.hash}`
    })
  }

  async getOriginByHash(hash: string, req: Request): Promise<string> {
    // grab metrics
    const requestMetrics = parseRequest(req)

    // find origin
    const url = await this.urlModel
      .findOne({ hash: hash })
      .exec()
      .then((url) => {
        if (url) {
          return url
        }
        throw new NotFoundException()
      })

    // save metrics and return origin
    url.metrics.push(requestMetrics)
    return await this.urlModel
      .findOneAndUpdate({ hash: hash }, url)
      .exec()
      .then(() => {
        return url.origin
      })
  }

  async findMetricsByUsername(username: string): Promise<UrlDocument[] | null> {
    return await this.urlModel.find({ username: username })
  }
}

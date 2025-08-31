import { UrlQueriesDto } from "../dto/url-queries.dto"

export function createNewUrl(
  origin: string,
  username: string,
  hash: string,
  queryParamsDto?: UrlQueriesDto,
) {
  const createdAt = Date.now()
  let expiredAt = 0
  if (queryParamsDto && queryParamsDto.lifetime) {
    expiredAt = createdAt + +queryParamsDto.lifetime * 1000
  }

  return {
    username: username,
    origin: origin,
    hash: hash,
    createdAt: new Date(createdAt),
    expiredAt: new Date(expiredAt),
  }
}

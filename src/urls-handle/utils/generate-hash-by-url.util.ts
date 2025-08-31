import { createHash } from "crypto"
import { UrlQueriesDto } from "src/urls-handle/dto/url-queries.dto"

export function generateHashByUrl(
  origin: string,
  userId: string,
  queryParamsDto?: UrlQueriesDto,
): string {
  const hash = String(
    createHash("sha256").update(`${origin}+${userId}`).digest("hex"),
  )

  if (queryParamsDto && queryParamsDto.length) {
    return hash.slice(0, queryParamsDto.length)
  }

  return hash.slice(0, origin.length - 1)
}

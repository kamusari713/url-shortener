import { TokenPayload } from 'src/modules/auth/types/token-payload.type';

import { Request as BaseRequest } from 'express';

export type Request = BaseRequest & {
  user: TokenPayload;
};

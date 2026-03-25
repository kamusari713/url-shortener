import type { Request } from 'src/modules/auth/types/request.type';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest<Request>().user;
  },
);

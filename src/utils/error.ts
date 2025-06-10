import { TRPCClientError } from '@trpc/client';

import { AppRouter } from '~trpc/router/root';

export function isTRPCClientError(
  cause: unknown
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}
